const { Browser, By, Key, until } = require('selenium-webdriver');
const { ignore, suite } = require('selenium-webdriver/testing');

suite ( function(env) {
    describe('Litecart', function(){
        let driver;

        before (async function(){
            driver = await env.builder().build();
        });

        it ('Litecart', async function(){
            await driver.get('http://localhost/litecart/admin/login.php');
            await driver.findElement(By.name('username')).sendKeys('admin', Key.RETURN);
            await driver.findElement(By.name('password')).sendKeys('admin', Key.RETURN);
            await driver.findElement(By.name('button')).click();
        });

        after (() => driver && driver.quit())
    });
});