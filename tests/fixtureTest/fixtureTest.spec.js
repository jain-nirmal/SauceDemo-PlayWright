const {test} = require('../../fixture/MyFixture.js')
const {expect} = require('@playwright/test')

test.describe('Login and cart feature test',()=>{

    test('Successful login validation ',async({loginPage,page})=>{
     await loginPage.navigateToLoginPage('https://www.saucedemo.com');
     await loginPage.loginToApplication('standard_user','secret_sauce')
     console.log("Login completed");
     await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
     console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
    

    })


test('Login and clicko on checkout form cart page',async({loginPage,productPage,cartPage,page})=>{
    await loginPage.navigateToLoginPage('https://www.saucedemo.com');
    await loginPage.loginToApplication('standard_user','secret_sauce')
    console.log("Login completed");
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
    const productName = "Sauce Labs Backpack"
    productPage.addProductToCart(productName);
    await page.waitForLoadState('networkidle');
    const cartCount = await productPage.getShoppingCartProductCount();
    console.log("Shopping cart product count: " + cartCount);
    expect(cartCount).toBeGreaterThan(0);
    await productPage.shoppingCartLink.click();
    await cartPage.page.waitForLoadState('networkidle');
    expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    expect(cartPage.yourCartTitle).toBeVisible();
    expect(cartPage.continueShoppingButton).toBeVisible();
    expect(cartPage.checkoutButton).toBeVisible();
    console.log("=== Cart Page UI Validation test complete")
})

});




