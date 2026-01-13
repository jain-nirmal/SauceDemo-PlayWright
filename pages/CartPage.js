
class cartPage {
    constructor(page) {
        console.log("=== Initializing cartPage ===");
        this.page = page;

        this.productListItem = this.page.locator('.cart_item');
        this.continueShoppingButton = this.page.locator('#continue-shopping');
        this.checkoutButton = this.page.locator('#checkout');
        console.log("cartPage initialized successfully");
    }


    async validateProducInCart(productName) {
        console.log("=== Validating product in cart: " + productName + " ===");
        const productCount = await this.productListItem.count();
        console.log("Total products in cart: " + productCount);

        for (let i = 0; i < productCount; i++) {
            const prodName = await this.productListItem.nth(i).locator('.inventory_item_name').textContent();
            if (prodName === productName) {
                console.log("Product found in cart: " + prodName);
                return true;
            }
        }
        console.log("Product not found in cart");
        return false;
    }

    async clickOnContinueShopping() {
        console.log("=== Clicking Continue Shopping button ===");
        await this.continueShoppingButton.click();
        console.log("Continue Shopping clicked successfully");
    }

    async clickOnCheckout() {
        console.log("=== Clicking Checkout button ===");
        await this.checkoutButton.click();
        console.log("Checkout clicked successfully");
    }

    async removeProductFromCart() {
        console.log("=== Starting to remove products from cart ===");

        const productCount = await this.productListItem.count();
        if (productCount === 0) {

            console.log("Cart is empty, no product/s is present to remove");
            return;

        }

        else {
            const productCount = await this.productListItem.count();
            console.log("Removing " + productCount + " products from cart");

            for (let i = 0; i < productCount; i++) {
                console.log("Removing product at index: " + i);
                await this.productListItem.nth(i).locator('button:has-text("Remove")').click();
                console.log("Product at index " + i + " removed");
            }
        }
        console.log("All products removed from cart");
    }
}

module.exports = { cartPage };
  