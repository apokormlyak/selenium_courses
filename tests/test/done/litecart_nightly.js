const {Browser, By, until, Key} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

describe('firefox nightly', function(){
    let driver;
    let options = new firefox.Options().setBinary('C:\\Program Files\\Firefox Nightly\\firefox.exe');

    before(async function(){
        driver = new webdriver.Builder().forBrowser('firefox')
            .setFirefoxOptions(options)
            .build();
    });

    it('firefox nightly', async function(){
        await driver.get('http://localhost/litecart/admin/');
    });

    after(() => driver && driver.quit());
});