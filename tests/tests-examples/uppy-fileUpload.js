const { firefox } = require("@playwright/test");

//writing code with async block

(async () => {
    //Creating the browaser instance
    const browser = await firefox.launch({
        headless: false
    });

    //Browser Instance
    const browaserInstance = await browser.newContext();

    //Page
    const page = await browaserInstance.newPage();

    //navigate 
    await page.goto('https://uppy.io/examples/', {"waitUntil": 'networkidle'});  // first, identify the control 
    const elementHandle = await page.$('.uppy-DashboardTab-inner > .uppy-DashboardTab-iconMyDevice'); // then perform the operation
    await elementHandle?.setInputFiles('/Users/hilalozakarli/Downloads/image.jpeg');
})();
