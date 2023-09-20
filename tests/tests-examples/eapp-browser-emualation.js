const { chromium , devices} = require("@playwright/test");

(async() => {
    const iPhone = devices['iPhone 13 Pro Max'] // you need to set it on context level, not on browser leve
    const browser = await chromium.launch({ 
        headless: false
       });

    const context = await browser.newContext({      // Emulation of the browser page based on the device landscape
       ...iPhone,
    //    viewport: { width: 1280, height: 1024},
       videPath: 'videos/',
       locale: 'us-US', 
       timezoneId: 'America/Los_Angeles'
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
    
    await browser.close();
})();
