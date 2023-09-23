const { chromium } = require('playwright');
const data = require("./data/testdata.json");
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to http://eaapp.somee.com/
  await page.goto('http://eaapp.somee.com/');

  // Click text="Login"
  await page.click('text="Login"');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Account/Login');

  // Click input[name="UserName"]
  await page.click('#UserName');

  // Fill input[name="UserName"]
  await page.fill('#UserName:visible', data.Login.userName);

  // Click input[name="Password"]
  await page.click('input[name="Password"]');

  // Fill input[name="Password"]
  await page.fill('input[name="Password"]', data.Login.password);

  // Click input[type="submit"]
  await page.click("input:text('Log in')");
  // assert.equal(page.url(), 'http://eaapp.somee.com/');

  // Click text="Employee List"
  await page.click('text="Employee List"');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Employee');

  // Click text="Create New"
  await page.click('text="Create New"', );
  // assert.equal(page.url(), 'http://eaapp.somee.com/Employee/Create');

  // Click input[name="Name"]
  await page.click('input[name="Name"]');

  // Fill input[name="Name"]
  await page.fill('input[name="Name"]', data.User.Name);

  // Click input[name="Salary"]
  await page.click('input[name="Salary"]');

  // Fill input[name="Salary"]
  await page.fill('input[name="Salary"]', data.User.Salary);

  // Click input[name="DurationWorked"]
  await page.click('input[name="DurationWorked"]');

  // Fill input[name="DurationWorked"]
  await page.fill('input[name="DurationWorked"]', data.User.DurationWorked);


  // Click input[name="Grade"]
  await page.click('input[name="Grade"]');

  // Fill input[name="Grade"]
  await page.fill('input[name="Grade"]', data.User.Grade);

  // Click input[name="Email"]
  await page.click('input[name="Email"]');

  // Fill input[name="Email"]
  await page.fill('input[name="Email"]', data.User.Email);

  // Click input[type="submit"]
  await page.click('input[type="submit"]');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Employee/Index/79');

  //Two dimentional array of data
  const gridTableResult = await page.$$eval('.table tr', rows => {
    return Array.from(rows, row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText)
    });
  });


  //Write on the JSON file
  const gridData = JSON.stringify(gridTableResult);
  fs.writeFileSync('gridTableData.json', gridData);

  // Click //tr[9]/td[8]/a[normalize-space(.)='Delete']
  await page.click(`//td[normalize-space(.)=\'${data.User.Name}\']/parent::tr//td[normalize-space(.)='Delete']`);

  // Click input[type="submit"]
  await page.click('input[type="submit"]');
  // assert.equal(page.url(), 'http://eaapp.somee.com/Employee/Index/79');

  // Click text="Log off"
  await page.click('text="Log off"');
  // assert.equal(page.url(), 'http://eaapp.somee.com/');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();