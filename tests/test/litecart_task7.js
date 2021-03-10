const {Key, until, Browser, By} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome')

// async function isElementPresent(el){
//     try{
//         return el;
//     }catch(NoSuchElementError) {
//         console.log("There is no h1 tag");
//     };
// }

async function isElementPresent(el){
    if(el){
        console.log("There is h1 tag");
        return true;
    }else {
        console.log("There is no h1 tag");
    };
}

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
        await driver.findElement(By.name('username')).sendKeys("admin");
        await driver.findElement(By.name('password')).sendKeys("admin", Key.ENTER);
        await driver.wait(until.elementLocated({'css':'ul#box-apps-menu'}), 20000);

        let rows = await driver.findElements(By.css("ul#box-apps-menu li#app-"));
        const listSize = rows.length;

        for (let i = 0; i < listSize; i++){

            rows = await driver.findElements(By.css("ul#box-apps-menu li#app-"));

            let el = await driver.findElements(By.css('h1'));
            isElementPresent(el);
            //isElementPresent(await driver.findElements(By.css('h1')));
             await rows[i].click();

             driver.manage().setTimeouts({'pageLoad' : 10000});
                let elmsChld =  await driver.findElements(By.css('ul.docs li'));
                const listSize2 = elmsChld.length;

                if (listSize2 > 0) {
                    for (let i = 0; i < listSize2; i++){
                        let el = await driver.findElements(By.css('h1'));
                        isElementPresent(el);
                        //isElementPresent(await driver.findElement(By.css('h1')));

                        elmsChld = await driver.findElements(By.css('ul.docs li'));
                        await elmsChld[i].click();
                    }
                }else continue;

        }
    });
            
    after( ()=> driver && driver.quit());

});