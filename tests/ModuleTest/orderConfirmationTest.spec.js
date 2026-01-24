import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {ProductPage} from '../../pages/productPage';
import {CartPage} from '../../pages/CartPage';
import {OrderProcess} from '../../pages/OrderProcess';
import {OrderReviewPage} from '../../pages/OrderReview';
import {OrderConfirmationPage} from '../../pages/OrderConfirmation';

import { BaseURL, Username, Password } from '../../utils/envConfig';
const testData = require('../../testdata/checkOutTestData.json')

test.describe('@OrderReview Order Confirmation Page Tests validation', () => {
    let productPage;
    let cartPage;
    let loginPage;
    let orderProcess;
    let orderReviewPage;    
    let orderConfirmationPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);    
        cartPage = new CartPage(page);  
        orderProcess = new OrderProcess(page);
        orderReviewPage = new OrderReviewPage(page);  
        orderConfirmationPage = new OrderConfirmationPage(page);  
        console.log("=== Test setup: beforeEach ===");
        await page.goto(BaseURL);
        console.log("Navigated to: " + BaseURL);
        await loginPage.loginToApplication(Username, Password);  
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await productPage.addFirstNProductsToCart();
        await productPage.shoppingCartLink.click(); 
        await cartPage.page.waitForLoadState('networkidle');
        await cartPage.clickOnCheckout();
        await orderProcess.page.waitForLoadState('networkidle');
        await orderProcess.enterCheckOutInformation(testData.firstname, testData.lastname, testData.postalCode);
        await orderProcess.clickContinueButton();
        await orderReviewPage.page.waitForLoadState('networkidle');
        await orderReviewPage.clickFinishButton();
        await orderConfirmationPage.page.waitForLoadState('networkidle');
        console.log("=== Test setup completed ===");    

    })

    test('@Smoke @OrderConfirmation Validate Order Confirmation Page Title , Confirmation Text , Back Home Button ', async ({ page }) => {
        console.log("=== Starting Order Confirmation Page UI Validation test ===");   
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        const allElements=await orderConfirmationPage.getAllElements();
        expect(allElements.pageTitle).toBeVisible();
        expect(allElements.confirmationText).toBeVisible();
        expect(allElements.backHomeButton).toBeVisible();
        console.log("=== Order Confirmation Page UI Validation test completed ===");
    })

    test('@Smoke @OrderConfirmation Validate Back Home button navigated to product home page  ', async ({ page }) => {
        console.log("=== Starting Order Confirmation Page Back Home Button test ===");   
        await orderConfirmationPage.clickBackHomeButton();
        await page.waitForTimeout(5000)
        await orderConfirmationPage.page.waitForLoadState('networkidle');
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        expect(productPage.pageTitle).toBeVisible();
        console.log("=== Order Confirmation Page Back Home Button test completed ===");


    })

})
