const { chromium } = require("@playwright/test");

(async() => {
    const browser = await chromium.launch();

    const context = await browser.newContext({
       
    });

    const page = await context.newPage();

    // Go to http://eaapp.somee.com/
    await page.goto('http://eaapp.somee.com/');

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

    // Click text=Log in
    await page.click("input:text('Log in')");

    // Click text=Employee List
    await page.click('text=Employee List');

    // Generate a PDF 
    await page.pdf({path: 'fullpage.pdf'});
    
    await browser.close();
})();
