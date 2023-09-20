import {chromium}  from '@playwright/test';

//writing code with async block

(async () => {
    //Creating the browaser instance
    const browser = await chromium.launch({
        headless: false,
        devtools: true
    });

    //Browser Instance
    const browaserInstance = await browser.newContext({
        recordVideo: {
            dir: 'video/'
        }
    });

    //Page
    const page = await browaserInstance.newPage();

    //navigate thewarehouse.co.nz
    await page.goto("https://www.thewarehouse.co.nz", {waitUntil: 'domcontentloaded'});

    //hover
    await page.locator("data-test-id=category-root").hover();
    await page.locator('.mega-menu-root-list > li > #category-homegarden').hover(); // use chain operation
    await page.locator('a[role="menuitem"]:has-text("Lounge")').click();  // click operation

    await browser.close();
})();
