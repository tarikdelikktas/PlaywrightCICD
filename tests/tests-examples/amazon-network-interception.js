const { chromium, request } = require("@playwright/test");

(async() => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    const page = await context.newPage();

    await page.route('**\/*.{png, jpg, jpeg, svg}', (request) => {
        
        if(request.request().resourceType() === 'image') {
            request.abort();
        }
        else {
            request.continue();
        }
    });

    await page.goto('https://www.amazon.com/');
    
    // await browser.close();
})();
