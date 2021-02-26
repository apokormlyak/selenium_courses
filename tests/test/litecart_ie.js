const {Browser, By, until, Key} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const ie = require('selenium-webdriver/ie');

describe('ie opening', function(){
    let driver;
    var options = new ie.Options();
options.requireWindowFocus(true)

    before( async function(){
        driver = new webdriver.Builder()
            .forBrowser('ie')
            .setIeOptions(options)
            .build();
    });

    it('ie openinig', async function(){
        await driver.get('http://localhost/litecart/admin/');
    });

    after (() => driver && driver.quit());
});
