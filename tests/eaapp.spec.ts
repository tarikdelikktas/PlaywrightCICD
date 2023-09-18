import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  // Go to http://eaapp.somee.com/
  await page.goto('/');

  // Click text=Login
  await page.locator('text=Login').click();
  await expect(page).toHaveURL('/Account/Login');

  // Fill input[name="UserName"]
  await page.locator('input[name="UserName"]').fill('admin');

  // Fill input[name="Password"]
  await page.locator('input[name="Password"]').fill('password');

  // Click text=Log in
  await page.locator('text=Log in').click();
  await expect(page).toHaveURL('/');

  // Click text=Employee List
  await page.locator('text=Employee List').click();
  await expect(page).toHaveURL('/Employee');

  // Click text=Edit >> nth=0
  await page.locator('text=Edit').nth(3).click();
  await expect(page).toHaveURL('/Employee/Edit/4');

  // Fill input[name="Salary"]
  await page.locator('input[name="Salary"]').fill('18000');

  // Click text=Save
  await page.locator('text=Save').click();
  await expect(page).toHaveURL('/Employee/Index/1');

  // Click text=Log off
  await page.locator('text=Log off').click();
  await expect(page).toHaveURL('/');

});