const {Key, until, Browser, By} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

describe('test7', function(){

    let driver;
    let options = new chrome.Options();
    options.setChromeBinaryPath('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
    options.addArguments(['start-maximixed']);

    before( async function(){
            driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities({'browserName': 'chrome'})
            .build();
        });

    it('test7', async function(){
        await driver.get('http://localhost/litecart/admin/');
        await driver.findElement(By.name('username'));
        await driver.findElement(By.name('password'));
        await driver.findElement(By.css("button[type='submit']")).click();

        driver.wait(until.elementLocated(By.css("div#box-apps-menu-wrapper")), 20000);
        //await driver.manage().timeouts().pageLoadTimeout(20000, timeUnit.Seconds);

        let rows = driver.findElements(By.css("div#box-apps-menu-wrapper li#app-"));

        for (row in rows){
            await row.findElement(By.id('#app-'), 10000).click();
        };

     });

    after( ()=> driver && driver.quit());

});