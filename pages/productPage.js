const { expect } = require("../playwright.config");

class ProductPage {
    constructor(page) {
        console.log("=== Initializing productPage ===");
        this.page = page;
        this.menuIcon = page.locator('#react-burger-menu-btn');
        this.logOutLink = page.locator('#logout_sidebar_link');
        this.AboutLink = page.locator('#about_sidebar_link');
        this.requestDemoButton = page.locator('button:has-text("Request a demo")');
        this.tryFreebutton = page.locator('button:has-text("Try it free")');
        this.productCard = page.locator('.inventory_item');
        this.productName = page.locator('.inventory_item_name');
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.SortDropdown = page.locator('.product_sort_container');
        this.productDescription = page.locator('.inventory_item_desc');
        this.productPrice = page.locator('.inventory_item_price');
        this.pageTitle = page.locator('.title');
        this.removeButton = page.locator('button:has-text("Remove")');
        this.shoppingCartCountBadge = page.locator('.shopping_cart_badge');
        console.log("productPage initialized successfully");
    }
    async logOutFromApplication() {
        console.log("=== Logging out from application ===");
        await this.menuIcon.click();
        console.log("Menu icon clicked");
        await this.logOutLink.click();
        console.log("Logout link clicked");
        await this.page.waitForLoadState('networkidle');
        console.log("Logged out successfully");


    }
    async navigateToAboutPage() {
        console.log("=== Navigating to About page ===");
        await this.menuIcon.click();
        console.log("Menu icon clicked");
        await this.AboutLink.click();
        console.log("About link clicked");

    }

    getRequestDemoButton() {
        return this.requestDemoButton;
    }

    getFreeTryButton() {
        return this.tryFreebutton;
    }

    async addProductToCart(productName) {
        console.log("=== Adding product to cart: " + productName + " ===");
        const productCount = await this.productCard.count();
        console.log("Total products on page: " + productCount);
        for (let i = 0; i < productCount; i++) {
            const prodName = await this.productName.nth(i).textContent();
            if (prodName.trim() === productName) {
                console.log("Product found at index: " + i);
                await this.productCard.nth(i).locator('button:has-text("Add to cart")').click();
                console.log("Product added to cart successfully");
                break;
            }
        }
    }

    async addFirstNProductsToCart() {
        console.log("=== Adding first two products to cart ===");
        const firstProduct = await this.productName.first().textContent;
        console.log("First product name: " + firstProduct);
        await this.productCard.first().locator('button:has-text("Add to cart")').click();
        console.log("Product added to cart successfully");
    }

    async getShoppingCartProductCount() {
        console.log("=== Getting shopping cart product count ===");
        const count = parseInt(await this.shoppingCartLink.locator('.shopping_cart_badge').textContent());
        console.log("Products in cart: " + count);
        return count;
    }

    async clickOnShoppingCartLink() {
        console.log("=== Clicking on shopping cart link ===");
        await this.shoppingCartLink.click();
        console.log("Shopping cart link clicked successfully");
    }

    async sortProductBy(optionText) {
        console.log("Sorting products by :" + optionText);
        await this.SortDropdown.selectOption({ label: optionText });
    }
    async geteProductNamesList() {
        return await this.productName.allTextContents();
    }

    async getFirstProductDetails() {
        const name = await this.productName.first().textContent();
        const description = await this.productDescription.first().textContent();
        const price = await this.productPrice.first().textContent();
        return { name: name?.trim(), description: description?.trim(), price: price?.trim() };

    }

    async getAllProductDetails() {
        const allNames = await this.productName.allTextContents();
        const allDescriptions = await this.productDescription.allTextContents();
        const allprices = await this.productPrice.allTextContents();

        const allproducts = [];
        for (let i = 0; i < allNames.length; i++) {
            allproducts.push({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allprices[i].trim()
            });
        }

        return allproducts;

    }

    async getSpecificProductDetails(productName) {

        const allNames = await this.productName.allTextContents();
        const allDescriptions = await this.productDescription.allTextContents();
        const allprices = await this.productPrice.allTextContents();

        const allproducts = [];
        for (let i = 0; i < allNames.length; i++) {
            allproducts.push({
                name: allNames[i].trim(),
                description: allDescriptions[i].trim(),
                price: allprices[i].trim()
            });
        }

        return allproducts.filter(product => product.name.includes(productName));
    }

    async getProductTitle() {
        console.log("=== Getting Product Page title ===");
        const titleText = await this.pageTitle.textContent();
        console.log("Product Page title: " + titleText);
        return titleText;

    }

    async addNthProductToCart(n) {
        console.log("=== Adding product at index " + n + " to cart ===");
        const productCount = await this.productCard.count();
        console.log("Total products on page: " + productCount);
        if (n < productCount) {
            await this.productCard.nth(n).locator('button:has-text("Add to cart")').click();
            console.log("Product added to cart successfully");
        } else {
            console.log("Invalid product index: " + n);
        }
    }

    async removeProductFromProductPage() {
        console.log("=== Removing all products from product page ===");
        const cartCount = await this.getShoppingCartProductCount();
        for (let i = 0; i < cartCount; i++) {
            await this.removeButton.nth(i).click();

        }
    }


    async addAllProductsToCart() {

    //  console.log("=== Adding product to cart: " + productName + " ===");
        const productCount = await this.productCard.count();
        console.log("Total products on page: " + productCount);
        for (let i = 0; i < productCount; i++) {
            const prodName = await this.productName.nth(i).textContent();

            console.log("Product found at index: " + i);
            await this.productCard.nth(i).locator('button:has-text("Add to cart")').click();
            console.log(prodName+'Product added to cart successfully');
          

        }


    }

}

module.exports = { ProductPage };
