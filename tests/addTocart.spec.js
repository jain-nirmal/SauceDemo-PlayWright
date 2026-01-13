import { test, expect } from '@playwright/test';
import { loginPage } from '../pages/loginPage';
import { productPage } from '../pages/productPage';
import { cartPage } from '../pages/CartPage';
import { BaseURL, Username, Password } from '../utils/envConfig';

test.beforeEach(async ({ page }) => {
    console.log("=== Test setup: beforeEach ===");
    const login = new loginPage(page);
    await page.goto(BaseURL);
    console.log("Navigated to: " + BaseURL);
    await login.loginToApplication(Username, Password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log("=== Test setup completed ===");
})

test('@addToCart @Sanity Add single product to cart and verify in cart page', async ({ page }) => {
    console.log("=== Starting Add to Cart test ===");
    const ProductName = "Sauce Labs Backpack";
    const product = new productPage(page);
    const cart = new cartPage(page);
    await product.addProductToCart(ProductName);
    const cartCount = await product.getShoppingCartProductCount();
    expect(cartCount).toBeGreaterThan(0);
    console.log("Product added to cart successfully");
    await product.shoppingCartLink.click();
    console.log("Shopping cart link clicked");
    const isProductInCart = await cart.validateProducInCart(ProductName);
    expect(isProductInCart).toBeTruthy();
    console.log("=== Add to Cart test completed ===");

})


test.afterEach(async ({ page }) => {
    console.log("=== Test cleanup: afterEach ===");

      const cart = new cartPage(page);

    await cart.removeProductFromCart();
})
