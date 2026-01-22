import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckOutProcessPage } from '../../pages/CheckOutProcessPage';
import { BaseURL, Username, Password } from '../../utils/envConfig';
const testData = require('../../testdata/checkOutTestData.json')



test.describe('@Checkout  Checkout Page Tests validation', () => {
    let productPage;
    let cartPage;
    let loginPage;
    let checkoutPage;
    let checkOutProcessPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        checkOutProcessPage = new CheckOutProcessPage(page);
        console.log("=== Test setup: beforeEach ===");
        await page.goto(BaseURL);
        console.log("Navigated to: " + BaseURL);
        await loginPage.loginToApplication(Username, Password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstNProductsToCart();
        await productPage.shoppingCartLink.click();
        await cartPage.page.waitForLoadState('networkidle');
        console.log("=== Test setup completed ===");
    })

    test.only('@Sanity @Checkout Validate Checkout Page Title , Continue , Cancel Button ', async ({ page }) => {
        console.log("=== Starting Checkout Page UI Validation test ===");

        await cartPage.checkoutButton.click();
        await checkOutProcessPage.page.waitForLoadState('networkidle');
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        const actualTitle = await checkOutProcessPage.getCheckOutPageTitle();
        expect(actualTitle).toBe("Checkout: Your Information");
        expect(checkOutProcessPage.continueButton).toBeVisible();
        expect(checkOutProcessPage.cancelButton).toBeVisible();
        console.log("=== Checkout Page UI Validation test completed ===");
    })

    test('@SmokeTesting @Checkout Validate Cancel Button functionality', async ({ page }) => {
        console.log("=== Starting Cancel Button Functionality test ===");
        await cartPage.checkoutButton.click();
        await checkOutProcessPage.page.waitForLoadState('networkidle');
        await checkOutProcessPage.clickCancelButton();
        await page.waitForTimeout(5000);
        expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        expect(cartPage.yourCartTitle).toBeVisible();
        expect(cartPage.continueShoppingButton).toBeVisible();
        expect(cartPage.checkoutButton).toBeVisible();
        console.log("=== Cancel Button Functionality test completed ===");
    })


    test('@SmokeTesting @Checkout Validate Continue Button functionality', async ({ page }) => {
        await cartPage.checkoutButton.click();
        await checkOutProcessPage.page.waitForLoadState('networkidle');
        console.log("=== Starting Continue Button Functionality test ===");
        console.log("Mytest Data firstName: " + JSON.stringify(testData.firstname));
        console.log("Mytest Data lastName: " + JSON.stringify(testData.lastname));
        console.log("Mytest Data postalCode: " + JSON.stringify(testData.postalCode));
        await checkOutProcessPage.enterCheckOutInformation(testData.firstname, testData.lastname, testData.postalCode);
        await checkOutProcessPage.clickContinueButton();
        await page.waitForLoadState('networkidle');
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        console.log("=== Continue Button Functionality test completed ===");
    })

})