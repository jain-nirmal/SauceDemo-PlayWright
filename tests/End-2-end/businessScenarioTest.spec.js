import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/productPage';
import { CartPage } from '../../pages/CartPage';
import { OrderProcess } from '../../pages/OrderProcess';
import { OrderReviewPage } from '../../pages/OrderReview';
import { OrderConfirmationPage } from '../../pages/OrderConfirmation';
import { BaseURL, Username, Password } from '../../utils/envConfig';

const testData = require('../../testdata/checkOutTestData.json')



test('@end-2-end Place an order for sigle product from prodcuct catalgo page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const orderProcess = new OrderProcess(page);
    const orderReviewPage = new OrderReviewPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    await page.goto(BaseURL);
    console.log("Navigated to: " + BaseURL);
    await loginPage.loginToApplication(Username, Password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const productName = "Sauce Labs Backpack"
    await productPage.addProductToCart(productName);

    await productPage.shoppingCartLink.click();
    await cartPage.page.waitForLoadState('networkidle');
    await cartPage.clickOnCheckout();
    await orderProcess.page.waitForLoadState('networkidle');
    await orderProcess.enterCheckOutInformation(testData.firstname, testData.lastname, testData.postalCode);
    await orderProcess.clickContinueButton();
    await orderReviewPage.page.waitForLoadState('networkidle');
    await orderReviewPage.clickFinishButton();
    await orderConfirmationPage.page.waitForLoadState('networkidle');
    expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    const allElements = await orderConfirmationPage.getAllElements();
    expect(allElements.pageTitle).toBeVisible();
    expect(allElements.confirmationText).toBeVisible();
    expect(allElements.backHomeButton).toBeVisible();
    console.log("=== Order Confirmation Page UI Validation test completed ===");



})


test('@end-2-end Place an order for all product from prodcuct catalgo page', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const orderProcess = new OrderProcess(page);
    const orderReviewPage = new OrderReviewPage(page);
    const orderConfirmationPage = new OrderConfirmationPage(page);

    await page.goto(BaseURL);
    console.log("Navigated to: " + BaseURL);
    await loginPage.loginToApplication(Username, Password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const productName = "Sauce Labs Backpack"
    // await productPage.addProductToCart(productName);

    await productPage.addAllProductsToCart();

    await productPage.shoppingCartLink.click();
    await cartPage.page.waitForLoadState('networkidle');
    await cartPage.clickOnCheckout();
    await orderProcess.page.waitForLoadState('networkidle');
    await orderProcess.enterCheckOutInformation(testData.firstname, testData.lastname, testData.postalCode);
    await orderProcess.clickContinueButton();
    await orderReviewPage.page.waitForLoadState('networkidle');
    console.log("=== Starting Item subtotal amount  on order review page Validation test ===");
    const productDetails = await orderReviewPage.getProuctDetails();
    console.log("Product Prices fetched from order review page: ", productDetails.prices);
    const actualItemSubTotal = await orderReviewPage.getItemSubTotal();
    console.log("Actual Item Subtotal amount on order review page: " + actualItemSubTotal);
    const expectedItemSubtotal = productDetails.reduce((total, { prices }) => total + parseFloat(prices.replace('$', '').trim()), 0);
    console.log("Expected Item Subtotal amount: " + expectedItemSubtotal);
    expect(actualItemSubTotal).toBeCloseTo(expectedItemSubtotal, 2);
    console.log("=== Item subtotal amount  on order review page Validation test completed ===");

    await orderReviewPage.clickFinishButton();
    await orderConfirmationPage.page.waitForLoadState('networkidle');
    expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    const allElements = await orderConfirmationPage.getAllElements();
    expect(allElements.pageTitle).toBeVisible();
    expect(allElements.confirmationText).toBeVisible();
    expect(allElements.backHomeButton).toBeVisible();
    console.log("=== Order Confirmation Page UI Validation test completed ===");



})
