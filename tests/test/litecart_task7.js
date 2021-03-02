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

        let rows = driver.findElements(By.css("ul#box-apps-menu li#app-"));

        for (row in rows){

            let element = row.findElement(By.id('#app-'));
            element.click();

            driver.manage().timeouts().implicityWait(20000);
                let elmsChld = element.findElements(By.css('ul.docs'));

            if(elmsChld.length>0){
                for (elmChld in elmsChld){
                    elmChld.findElements(By.css('ul.docs')).click();
                };

            };

        };

     });

    after( ()=> driver && driver.quit());

});