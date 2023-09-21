const {chromium} = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch({
        headless:false,
        devtools:true
    })
    const context = await browser.newContext();
    //await context.addCookies(cookie);
    const page = await context.newPage();
   // Go to http://eaapp.somee.com/
  await page.goto('http://eaapp.somee.com/');

  // Click text="Login"
  await page.click('text="Login"');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Account/Login');

  // Click input[name="UserName"]
  await page.click('#UserName');

  // Fill input[name="UserName"]
  await page.fill('#UserName:visible', 'admin');

  // Click input[name="Password"]
  await page.click('input[name="Password"]');

  // Fill input[name="Password"]
  await page.fill('input[name="Password"]', 'password');

  // Click input[type="submit"]
  await page.click("input:text('Log in')");
  // assert.equal(page.url(), 'http://eaapp.somee.com/');

  // Click text="Employee List"
  await page.click('text="Employee List"');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Employee');

  const cookie = await context.cookies();
  const cookieJSON = JSON.stringify(cookie);

  fs.writeFileSync('eacookie.json', cookieJSON);

  await browser.close()

})();