const {By, Key, until, Browser} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function checkAlph(a,b){
    for (let i = 0; i < a.length; i++){
        if(b[i] != a[i]){
            return console.log(b[i], a[i], 'not alphabetical text');
        }else continue;
    }
return console.log('alphabetical text');
}

describe('task9', function(){

    let driver;
    let options = new chrome.Options();
    options.addArguments(['start-maximized']);
    options.setChromeBinaryPath('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');

    before(async function(){
        driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities({'browserName':'chrome'})
            .build();
    });
    it('task9', async function(){
        await driver.get('http://localhost/litecart/admin/');
        await driver.findElement(By.name('username')).sendKeys('admin');
        await driver.findElement(By.name('password')).sendKeys('admin', Key.ENTER);
        await driver.manage().setTimeouts({'pageLoad':10000});

        await driver.get('http://localhost/litecart/admin/?app=countries&doc=countries');
        await driver.wait(until.elementLocated(By.css('tr.row')), 20000);
        let list1 = await driver.findElements(By.xpath("//tr[@class='row']/td[5]/a"));
        let alpha=[];
        let beta=[];
        let listSize = list1.length;

        for( let i = 0; i < listSize; i++){
            list1 = await driver.findElements(By.xpath("//tr[@class='row']/td[5]/a"));
            listItem = list1[i].getAttribute('textContent')
                .then(listItem => {
                    alpha.push(listItem);
                    beta.push(listItem);
                });
        }
 alpha.sort();
 checkAlph(alpha, beta);

    })
    after(() => driver && driver.quit());

})