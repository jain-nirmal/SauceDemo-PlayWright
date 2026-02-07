const {test} = require('../../fixture/MyFixture.js')
const {expect} = require('@playwright/test')

test.describe('Login and cart feature test',()=>{

    test('Successful login validation ',async({loginPage,page})=>{
        
        await test.step('Navigate to SauceDemo login page', async () => {
            await loginPage.navigateToLoginPage('https://www.saucedemo.com');
        });

        await test.step('Enter credentials and login', async () => {
            await loginPage.loginToApplication('standard_user','secret_sauce');
            console.log("Login completed");
        });

        await test.step('Verify successful login and redirection to inventory page', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
            console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
        });

    })


test('Login and clicko on checkout form cart page',async({loginPage,productPage,cartPage,page})=>{
    
    await test.step('Navigate to SauceDemo login page', async () => {
        await loginPage.navigateToLoginPage('https://www.saucedemo.com');
    });

    await test.step('Login with valid credentials', async () => {
        await loginPage.loginToApplication('standard_user','secret_sauce');
        console.log("Login completed");
    });

    await test.step('Verify successful login and redirection', async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
    });

    await test.step('Add product to cart and verify cart count', async () => {
        const productName = "Sauce Labs Backpack";
        productPage.addProductToCart(productName);
        await page.waitForLoadState('networkidle');
        const cartCount = await productPage.getShoppingCartProductCount();
        console.log("Shopping cart product count: " + cartCount);
        expect(cartCount).toBeGreaterThan(0);
    });

    await test.step('Navigate to shopping cart', async () => {
        await productPage.shoppingCartLink.click();
        await cartPage.page.waitForLoadState('networkidle');
    });

    await test.step('Verify cart page UI elements', async () => {
        expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        expect(cartPage.yourCartTitle).toBeVisible();
        expect(cartPage.continueShoppingButton).toBeVisible();
        expect(cartPage.checkoutButton).toBeVisible();
        console.log("=== Cart Page UI Validation test complete");
    });

})

});




