const { chromium } = require('playwright');

const mockResponseObject = {
    "posts": [
        { "id": 1, "title": "E2E Automation Testing with Playwright", "author": "Tarik Deliktas" }
    ],
    "comments": [
        { "id": 1, "body": "Test Release Cycle", "postId": 1 }
    ],
    "profile": { "name": "regression-testing" }
};


(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    await page.route('**/db', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponseObject)
    }));

    await page.goto('http://localhost:3000/posts');


    //await browser.close();

})();