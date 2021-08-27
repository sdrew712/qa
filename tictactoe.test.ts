import { Builder, Capabilities, By, WebDriver } from "selenium-webdriver"

const chromedriver = require('chromedriver')

const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

beforeAll(async () => {
    await driver.get('http://localhost:4000')
})

afterAll(async () => {
    await driver.quit()
})

test('I can start a game', async () => {

    let button = await (await driver).findElement(By.id('start-game'));
    await button.click();
    
});

test('I can click the upper left square', async () => {
    let upperLeftSquare = await driver.findElement(By.id('cell-0'))
    await upperLeftSquare.click();

    let upperLeftSquareSymbol = await driver.wait(driver.findElement(By.id('cell-0')).getAttribute("textContent"))

    expect(upperLeftSquareSymbol).toEqual('X')
})

test("I can click the middle row", async () => {
    let upperMiddleSquare = await driver.findElement(By.id('cell-1'))
    let middleSquare = await driver.findElement(By.id('cell-4'))
    let bottomMiddleSquare = await driver.findElement(By.id('cell-7'))

    await upperMiddleSquare.click();
    await middleSquare.click();
    await bottomMiddleSquare.click();

    let upperMiddleSquareSymbol = await driver.wait(driver.findElement(By.id('cell-1')).getAttribute("textContent"))
    let middleSquareSymbol = await driver.wait(driver.findElement(By.id('cell-4')).getAttribute("textContent"))
    let bottomMiddleSquareSymbol = await driver.wait(driver.findElement(By.id('cell-7')).getAttribute("textContent"))

    expect(upperMiddleSquareSymbol).toEqual('X')
    expect(middleSquareSymbol).toEqual('X')
    expect(bottomMiddleSquareSymbol).toEqual('X')

    await driver.sleep(5000)
})

test("game displays correct winner", async () => {
    
    let winner = await driver.wait(driver.findElement(By.xpath("/html/body/h1")).getAttribute("textContent"))
    
    expect(winner).toEqual("X won")
})