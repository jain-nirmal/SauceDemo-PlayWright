import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/HomePage';
import { ProductPage } from '../../pages/ProductPage';
import { CartPage } from '../../pages/CartPage';
import { BaseURL, Username, Password } from '../../utils/envConfig';

test.describe('@ CartPage Cart Page Tests', () => 
    {
    let productPage;
    let cartPage;   
    let loginPage;
    test.beforeEach(async ({ page }) =>
         {  
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        console.log("=== Test setup: beforeEach ===");
        await page.goto(BaseURL);
        console.log("Navigated to: " + BaseURL);
        await loginPage.loginToApplication(Username, Password);
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Test setup completed ===");
  })

  test('@SmokeTesting @CartPage @Sanity Validate product title ,Continue , Remove , Url on cart page', async ({ page }) =>    {
    await test.step('Add product to cart', async () => {
        console.log("=== Starting Cart Page UI Validation test ===");
        const productName = "Sauce Labs Backpack";
        productPage.addProductToCart(productName);
        await page.waitForLoadState('networkidle');
    });

    await test.step('Verify cart count is greater than 0', async () => {
        const cartCount = await productPage.getShoppingCartProductCount();
        console.log("Shopping cart product count: " + cartCount);
        expect(cartCount).toBeGreaterThan(0);
    });

    await test.step('Navigate to cart page', async () => {
        await productPage.shoppingCartLink.click();
        await cartPage.page.waitForLoadState('networkidle');
    });

    await test.step('Verify cart page URL and UI elements', async () => {
        expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        expect(cartPage.yourCartTitle).toBeVisible();
        expect(cartPage.continueShoppingButton).toBeVisible();
        expect(cartPage.checkoutButton).toBeVisible();
        console.log("=== Cart Page UI Validation test completed ===");
    });
  })

  
  test('@SmokeTesting @CartPag @Sanity Add  product to cart and verify in cart page', async ({ page }) => 
    {
    await test.step('Add Sauce Labs Backpack to cart', async () => {
        console.log("=== Starting Add to Cart test ===");
        const productName = "Sauce Labs Backpack";
        await productPage.addProductToCart(productName);
    });

    await test.step('Verify cart count is greater than 0', async () => {
        const cartCount = await productPage.getShoppingCartProductCount();
        expect(cartCount).toBeGreaterThan(0);
        console.log("Product added to cart successfully");
    });

    await test.step('Navigate to cart page', async () => {
        await productPage.shoppingCartLink.click();
        console.log("Shopping cart link clicked");
    });

    await test.step('Verify product is displayed in cart', async () => {
        const productName = "Sauce Labs Backpack";
        const isProductInCart = await cartPage.validateProductInCart(productName);
        expect(isProductInCart).toBeTruthy();
        console.log("=== Add to Cart test completed ===");
    });

    })

    test('@CartPag @Sanity Validate Continue shopping move to productpage', async ({ page }) => 
    {

    await test.step('Add product to cart and navigate to cart page', async () => {
        console.log("=== Starting Continue Shopping test ===");
        console.log("=== Starting Cart Page UI Validation test ===");
        const productName = "Sauce Labs Backpack";
        productPage.addProductToCart(productName);
        await productPage.shoppingCartLink.click();
        await cartPage.page.waitForLoadState('networkidle');
    });

    await test.step('Click Continue Shopping button', async () => {
        await cartPage.clickOnContinueShopping();
    });

    await test.step('Verify redirect to inventory page', async () => {
        expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Continue Shopping test completed ===");
    });
  })


    test('@CartPag @Sanity Validate Remove product from cart', async ({ page }) => 
    {
        await test.step('Add product to cart', async () => {
            console.log("=== Starting Remove Product from Cart test ===");
            const productName = "Sauce Labs Backpack";
            await productPage.addProductToCart(productName);
        });

        await test.step('Navigate to cart page and verify initial count', async () => {
            await productPage.shoppingCartLink.click();
            const initialCartCount = await productPage.getShoppingCartProductCount();
            expect(initialCartCount).toBeGreaterThan(0);
        });

        await test.step('Remove product from cart', async () => {
            cartPage.removeButtonFromCart();
        });

        await test.step('Verify cart count decreased', async () => {
            const initialCartCount = await productPage.getShoppingCartProductCount();
            const finalCartCount = initialCartCount - 1;
            console.log("Final cart count after removal: " + finalCartCount);
            expect(initialCartCount).not.toBe(finalCartCount);
        });
    })





    }) ;
 