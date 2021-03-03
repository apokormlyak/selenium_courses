const {Key, until, Browser, By} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

// async function isElementPresent(el){
//     try{
//         await 
//     } catch{}
      
// }

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
        await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
        await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
        await driver.findElement(By.css("div.footer button[type='submit']")).click();
        
        await driver.wait(() => {
            until.elementLocated(By.css("div#box-apps-menu-wrapper"));
            console.log(5, By.css("div#box-apps-menu-wrapper"));
        }, 50000);

        //await driver.manage().timeouts().pageLoadTimeout(20000, timeUnit.Seconds);
        
        let rows = driver.findElements(By.css("ul#box-apps-menu li#app-"));

        for (row in rows){
            console.log(row);
            let element = row.findElement(By.id('#app-'));
            element.click();

            //cdriver.manage().timeouts().implicityWait(20000);
                let elmsChld = element.findElements(By.css('ul.docs'));

            if(elmsChld.length>0){
                for (elmChld in elmsChld){
                    elmChld.findElements(By.css('ul.docs')).click();
                    const el = elmChld.findElement(By.css('h1'));
                    isElementPresent(el);
                };

            };

        };

     });

    after( ()=> driver && driver.quit());

});