const { chromium } = require('playwright');

const mockResponseObject = {
    "home_page_data": {
        "learning_path_categories": [
            {
                "slug": "ui",
                "title": "UserInterface",
                "position": "1"
            },
            {
                "slug": "api",
                "title": "API Testing",
                "position": "2"
            },
            {
                "slug": "ci-cd",
                "title": "CI/CD Testing",
                "position": "3"
            }
        ]
    }
};


(async () => {
    const browser = await chromium.launch({
        headless: false
    });

    const context = await browser.newContext();

    // Open new page
    const page = await context.newPage();

    await page.route('**/api/data-bundle/home-page', (route) => route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponseObject)
    }));

    await page.goto('https://executeautomation.com');


    //await browser.close();

})();