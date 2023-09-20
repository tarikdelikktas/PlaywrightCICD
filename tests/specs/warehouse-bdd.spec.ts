import { test, expect }  from '@playwright/test';

//writing code with test block

test.beforeEach(async ({page}) => {
    await page.goto("https://www.thewarehouse.co.nz", {waitUntil: 'domcontentloaded'});
    await expect(page).toHaveURL("https://www.thewarehouse.co.nz");
});

test.describe.parallel("Test Navigatiom to Launge of Warehouse website",async () => {

    test('To Navigate Lounge page', async ({page, browserName}) => {

        test.skip(browserName === 'firefox', 'The firefox browser does not support the feature')

        await test.step("Hover over the Home Garden category root", async () => {

            await page.locator("data-test-id=category-root").hover();   //hover
            await expect(page.locator("data-test-id=category-root")).toBeVisible();     //verify if category is visibile or not

            await page.locator('.mega-menu-root-list > li > #category-homegarden').first().hover(); // use chain operation and hover the category

            // what if the team added those two attr into the mega-menu parent and you need to verify them..
            await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).toHaveAttribute("data-target", "#mega-menu-category-homegarden");
            await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).toHaveId("category-homegarden");
        });
        
        await test.step("Clicking on Launge Link", async () => {
     
            await page.locator('a[role="menuitem"]:has-text("Lounge")').click();  // click operation

            // what if we want to a negative test case scenior; for example, - once I click on home-category menu, then I want to mega-menu-list to be not available or not visible..
            await expect(page.locator('.mega-menu-root-list > li > #category-homegarden').first()).not.toBeVisible();
            await expect(page.locator('.mega-menu-root-list > li > #category-homegarden').first()).toBeHidden();
        
            await page.locator("h1.title").textContent(); //Verify the Launge Header text after click on the locater
        
            expect(page.locator("h1.title")).toBe("Lounge");
            await expect(page.locator("h1.title")).toHaveText("Lounge");
            await expect(page).toHaveTitle("Lounge Suite - Lounge Couches | The Warehouse");
        })
    });

    test("To Navigate to Car Electronics page", async ({ page, browserName }, testInfo) => {

        test.slow(browserName === 'webkit', 'The browser does not support the feature');

        await test.step("Hovering over category root", async () => {

            await page.locator("data-test-id=category-root").hover();
            await page.locator('.mega-menu-wrapper >> #category-autodiy').first().hover();
        });


        await test.step("Clicking on lounge link", async () => {
            await page.locator('a[role="menuitem"]:has-text("Car Electronics")').click();

            //slow test
            await expect(await page.locator(".title")).toHaveText("Car Electronics");
        });

    });
});

test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({path: `screenshot/${testInfo.title.trim()}.png`});
});