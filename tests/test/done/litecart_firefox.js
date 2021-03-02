const {Browser, By, until, Key} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

describe('firefox opening', function(){

    let driver;
    var options = new firefox.Options().setBinary('C:\\Users\\Extensa\\AppData\\Local\\Mozilla Firefox\\firefox.exe');

    before(async function(){
        driver = new webdriver.Builder()
        .forBrowser('firefox')
        .setFirefoxOptions(options)
        .build();
    });

    it('firefox opening', async function(){
        await driver.get('http://localhost/litecart/admin/');
    });

    after(() => driver && driver.quit());
});