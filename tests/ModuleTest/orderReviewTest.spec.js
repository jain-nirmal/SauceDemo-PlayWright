import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {ProductPage} from '../../pages/productPage';
import {CartPage} from '../../pages/CartPage';
import {OrderProcess} from '../../pages/OrderProcess';
import {OrderReviewPage} from '../../pages/OrderReview';


import { BaseURL, Username, Password } from '../../utils/envConfig';
const testData = require('../../testdata/checkOutTestData.json')

test.describe('@OrderReview  Order Review Page Tests validation', () => {
    let productPage;
    let cartPage;
    let loginPage;
    let orderProcess;
    let orderReviewPage;    

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);    
        cartPage = new CartPage(page);    
        orderProcess = new OrderProcess(page);
        orderReviewPage = new OrderReviewPage(page);  
        
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
        console.log("=== Test setup completed ===");

    })

    test('@Smoke @OrderReview Validate Order Review Page Title , Finish , Cancel Button ', async ({ page }) => {
        console.log("=== Starting Order Review Page UI Validation test ===");   
        expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        const allElements=await orderReviewPage.getAllElements();
        expect(allElements.pageTitle).toBeVisible();
        expect(allElements.finishButton).toBeVisible();
        expect(allElements.cancelButton).toBeVisible();
        console.log("=== Order Review Page UI Validation test completed ===");
    })


    test('@Smoke @OrderReview Validate cancel button navigated to product home page  ', async ({ page }) => {
        console.log("=== Starting Order Review Page Cancel Button test ===");   
        await orderReviewPage.clickCancelButton();
        await orderReviewPage.page.waitForLoadState('networkidle');
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        expect(productPage.pageTitle).toBeVisible();
        console.log("=== Order Review Page Cancel Button test completed ===");

    })

    test('@Smoke @OrderReview Validate item subtotal amount   ', async ({ page }) => 
        {
        console.log("=== Starting Item subtotal amount  on order review page Validation test ===");
        const productDetails=await orderReviewPage.getProuctDetails();
        console.log("Product Prices fetched from order review page: ", productDetails.prices);
        const actualItemSubTotal=await orderReviewPage.getItemSubTotal();
        console.log("Actual Item Subtotal amount on order review page: " + actualItemSubTotal);
        const expectedItemSubtotal=productDetails.reduce((total, {prices}) => total + parseFloat(prices.replace('$', '').trim()), 0);
        console.log("Expected Item Subtotal amount: " + expectedItemSubtotal);
        expect(actualItemSubTotal).toBeCloseTo(expectedItemSubtotal,2);
        console.log("=== Item subtotal amount  on order review page Validation test completed ===");

        })

    test('@Smoke @OrderReview Validate tax amount and total amount  ', async ({ page }) => 
        {
        console.log("=== Starting Tax amount and Total amount  on order review page Validation test ==="); 
        const actualTotalAmount=await orderReviewPage.getTotalAmount();
        console.log("Actual Total amount on order review page: " + actualTotalAmount);
        const actualItemSubTotal=await orderReviewPage.getItemSubTotal();
        const actualTaxAmount=await orderReviewPage.getTaxAmount();
        const expectedTotalAmount=actualItemSubTotal + actualTaxAmount;
        
        console.log("Expected Total amount on order review page: " + expectedTotalAmount);
        expect(actualTotalAmount).toBeCloseTo(expectedTotalAmount,2);
        console.log("=== Tax amount and Total amount  on order review page Validation test completed ===");
    
    })
})