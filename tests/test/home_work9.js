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
        let list2 = await driver.findElements(By.xpath("//tr[@class='row']/td[6]"))
        let alpha1=[], beta1=[];
        let listSize1 = list1.length;
        let alpha2=[];
        let listSize2 = list2.length;

        for( let i = 0; i < listSize1; i++){
            list1 = await driver.findElements(By.xpath("//tr[@class='row']/td[5]/a"));
            listItem = list1[i].getAttribute('textContent')
                .then(listItem => {
                    alpha1.push(listItem);
                    beta1.push(listItem);
                });
        }
//ищем строки, где зоны > 0, добавляем в массив alpha2
        for (let i = 0; i < listSize2; i++){
            let list3;
            list2 = await driver.findElements(By.xpath("//tr[@class='row']/td[6]"));
            listItem = list2[i].getAttribute('textContent')
                .then(listItem => {
                    if(listItem > 0){
                        list3 = driver.findElement(By.xpath("//tr[@class='row'][i]/td[5]/a"))
                        alpha2.push(list3);
                    }
                });
        }
//провека сортировки стран по алфавиту,
 alpha1.sort();
 checkAlph(alpha1, beta1);
//в массиве alpha2 переходим в каждый элемент, кликаем, ждем загрузку страницы после клика по ссылке
    let sizeAlpha2 = alpha2.length;
    let zones1 = [], zones2 = [];
    
    for (let i = 0; i < sizeAlpha2; i++){
        await alpha2[i].click();
        await driver.wait(until.elementLocated(By.css('table#table-zones')),20000);
//на новой открытой странице собираем новый массив из зон listZones
        let listZones = await driver.findElements(By.xpath("//tr[@class='row']/td[5]/a"));
        let listSizeZones = listZones.length;
//выбираем все значения textContent из списка зон, помещаем в тестовые массивы zones1 и zones2
        for(let i = 0; i < listSizeZones; i++){
            listZones = await driver.findElements(By.xpath("//tr[@class='row']/td[5]/a"));
            listItem = listZones[i].getAttribute('textContent')
            .then(listItem => {
                zones1.push(listItem);
                zones2.push(listItem);
            });
        }
       // провека сортировки зон по алфавиту
        zones1.sort();
        checkAlph(zones1, zones2);
        
    }
})


    after(() => driver && driver.quit());

})