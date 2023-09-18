import { test, expect }  from '@playwright/test';

//writing code with test block

test.beforeEach(async ({page}) => {
    await page.goto("https://www.thewarehouse.co.nz", {waitUntil: 'domcontentloaded'});
    await expect(page).toHaveURL("https://www.thewarehouse.co.nz");
});

test('Navigate to Launge of Warehouse website', async ({page}) => {
    //navigate thewarehouse.co.nz

    //hover
    var catagoty = await page.locator("data-test-id=category-root");
    catagoty.hover();

    //verify if category is visibile or not
    await expect(catagoty).toBeVisible();

    // hover the category
    await page.locator('.mega-menu-root-list > li > #category-homegarden').hover(); // use chain operation
    
    // click the category
    await page.locator('a[role="menuitem"]:has-text("Lounge")').click();  // click operation

    //Verify the Launge Header text after click on the locater
    var title = await page.locator("h1.title").textContent();

    expect(title).toBe("Lounge");
    await expect(page.locator("h1.title")).toHaveText("Lounge");
    await expect(page).toHaveTitle("Lounge Suite - Lounge Couches | The Warehouse");
});

test('Verify the identifieries for "#mega-menu-category-homegarden" and category-id attr', async ({page}) => {
    // what if the team added those two attr into the mega-menu parent and you need to verify them..
    await page.locator("data-test-id=category-root").hover();
    await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).toHaveAttribute("data-target", "#mega-menu-category-homegarden");
    await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).toHaveId("category-homegarden");

}); 

test('Negative test case for mega-menu-list is not visible when clicks on menuitem', async ({page}) => {
    // what if we want to a negative test case scenior; for example, 
    // once I click on home-category menu, then I want to mega-menu-list to be not available or not visible..
        // there are 2 ways to do it.. 
    await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).not.toBeVisible();
    await expect(page.locator('.mega-menu-root-list > li > #category-homegarden')).toBeHidden();
});

test('Add soft assertipm to verify errors are captured by screenshot and video recording', async ({page}) => {
    await page.locator("data-test-id=category-root").hover();
    await expect.soft(page.locator('.mega-menu-root-list > li > #category-homegarden')).toHaveAttribute("data-targets", "#mega-menu-category-homegarden"); 
});

test.afterEach(async ({page}) => {
    await page.screenshot({path: 'screenshot/warehouse.png'});
});