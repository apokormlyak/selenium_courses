const { Browser, By, Key, until } = require('selenium-webdriver');
const {} = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');


    describe('Litecart', function(){
        let driver;
        var options = new chrome.Options();
        options.setChromeBinaryPath('C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe');
        options.addArguments(['start-maximized']);
        

        before(async function () {
            //driver = await env.builder().build()
            driver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities({'browserName':'chrome'})
            .build();
          })

        it ('Litecart', async function(){
            await driver.get('http://localhost/litecart/admin/');
            await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
            await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
            await driver.findElement(By.css("button[type='submit']")).click();
        });

        after (() => driver && driver.quit())
    });
