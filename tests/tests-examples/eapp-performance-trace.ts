import { chromium } from '@playwright/test';

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

    await browser.stopTracing();

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
