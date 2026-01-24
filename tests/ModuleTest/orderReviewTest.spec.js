import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { CheckOutProcessPage } from '../../pages/OrderProces';
import { OrderReviewPage } from '../../pages/OrderReviewPage';

import { BaseURL, Username, Password } from '../../utils/envConfig';
const testData = require('../../testdata/checkOutTestData.json')


test.describe('@Checkout Order Review Page Tests validation', () => {

    let loginPage;
    let productPage;
    let cartPage;
    let checkOutProcessPage;
    let orderReviewPage;
    

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutProcessPage = new CheckOutProcessPage(page);
        orderReviewPage = new OrderReviewPage(page);

        console.log("=== Test setup: beforeEach ===");
        await page.goto(BaseURL);
        console.log("Navigated to: " + BaseURL);
        await loginPage.loginToApplication(Username, Password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstNProductsToCart();
        await productPage.shoppingCartLink.click();
        await cartPage.page.waitForLoadState('networkidle');
        await cartPage.checkoutButton.click();
        await checkOutProcessPage.page.waitForLoadState('networkidle');
        await checkOutProcessPage.enterCheckOutInformation(testData.firstname, testData.lastname, testData.postalCode);
        await checkOutProcessPage.continueButton.click();
        await orderReviewPage.page.waitForLoadState('networkidle');

        console.log("=== Test setup completed ===");
    })

    test('@SmokeTesting @Checkout Validate Order Review Page Title , Finish , Cancel Button ', async ({ page }) => {
        console.log("=== Starting Checkout Order Review Page UI Validation test ===");
        
       

    })

    test('@SmokeTesting @Checkout Validate Cancel functionality  ', async ({ page }) => {

        console.log("=== Starting Cancel Button Functionality test ===");
        await orderReviewPage.clickCancelButton();
        await page.waitForTimeout(5000);
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        // expect(productPage.getProductTitle()).toBeVisible();
        console.log("=== Product Page title is visible ===");
        console.log("=== Product Page title: " + await productPage.getProductTitle());
        expect(productPage.shoppingCartLink).toBeVisible();
        expect(productPage.SortDropdown).toBeVisible();
        expect(await productPage.getProductTitle()).toBe("Products");
        console.log("=== Product Page UI elements are visible after cancelling from Overview Page ===");

        console.log("=== Cancel Button Functionality test completed ===");


    })

    test.only('@SmokeTesting @Checkout Validate Item total on order review page ', async ({ page }) => {



        
    })


});