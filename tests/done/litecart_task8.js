const {Key, until, By, Browser} = require ('selenium-webdriver');
const webdrver = require ('selenium-webdriver');
const chrome = require ('selenium-webdriver/chrome');
const { get } = require('selenium-webdriver/http');

async function isElementPresent(el){
    if(el.length == 1){
        console.log("There is one sticker ");
        return true;
    }else if (el.length > 1){
        console.log("There is more then one sticker");
    }else if(el.length == 0){
        console.log("There is no sticker ");
    }else console.log("There is no sticker ");
}

describe('looking for stikers', function(){
    let driver;
    let options = new chrome.Options();
    options.setChromeBinaryPath('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
    options.addArguments(['start-maximized']);

    before(async function(){
        driver = new webdrver.Builder()
            .forBrowser(chrome)
            .withCapabilities({'browserName':'chrome'})
            .build();
    })

    it('looking for stikers', async function(){
        await driver.get('http://localhost/litecart/admin/');
        await driver.findElement(By.name('username')).sendKeys('admin');
        await driver.findElement(By.name('password')).sendKeys('admin', Key.ENTER);

        driver.manage().setTimeouts({'pageLoad': 10000});

        await driver.get('http://localhost/litecart/en/rubber-ducks-c-1/');

        let products = await driver.findElements(By.css("ul.listing-wrapper.products li.product.column"));
        let listSize = products.length;

        console.log(listSize);

        for(let i = 0; i < listSize; i++){
            products = await driver.findElements(By.css("ul.listing-wrapper.products li.product.column"));
            isElementPresent(await products[i].findElements(By.css('div.sticker')));
        }

    })

    after( () => driver && driver.quit());

})