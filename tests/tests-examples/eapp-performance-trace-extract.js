const { chromium } = require("@playwright/test");
const  fs = require('fs');

(async() => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    // Go to http://eaapp.somee.com/
    await page.goto('http://eaapp.somee.com/');

    // If you want to generate trace informtion only for Login operations based on tha categories
    await browser.startTracing(page, {path:`trace.json`, screenshots: true, categories: ['devtools.timeline']});

    // Click text=Login
    await page.click('text=Login');

    // Click input[name="UserName"]
    await page.click('#UserName');

    // Fill input[name="UserName"]
    await page.fill('input[name="UserName"]', 'admin');

    // Click input[name="Password"]
    await page.click('input[name="Password"]');

    // Fill input[name="Password"]
    await page.fill('input[name="Password"]', 'password');

    await browser.stopTracing();

    // Click text=Log in
    await page.click("input:text('Log in')");

    // Click text=Employee List
    await page.click('text=Employee List');
    
    // Extracting trace information (can get these infos from developers to put more performance informations)
    const traceInfo = JSON.parse(fs.readFileSync('./trace.json', 'utf8'));
    const traceData = traceInfo.traceEvents.filter(x => (
        x.cat === 'diabled-by-default-devtools.screenhot' &&
        x.name === 'Screenshot' &&
        typeof x.args !== 'undefined' &&
        typeof x.args.screenhot !== 'undefined'
    ));

    // Extract the infos and create screenhots
    traceData.forEach(function(snap, index) {
        fs.writeFile(`trace-screenshot-${index}.png`, snap.args.screenhot, 'base64', function(err) {
            if (err) {
                console.log('write errpr', err);
            }
        });
    });

    await browser.close();
})();
