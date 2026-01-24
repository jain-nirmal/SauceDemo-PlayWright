class OrderReviewPage {

    constructor(page) {
        this.page = page;
        this.pageTitle = this.page.locator('.title');
        this.finishButton = this.page.locator('#finish');
        this.cancelButton = this.page.locator('#cancel');
        this.productName = this.page.locator('.inventory_item_name');
        this.productPrice = this.page.locator('.inventory_item_price');
        this.productDescription = this.page.locator('.inventory_item_desc');
        this.itemSubTotal = this.page.locator('.summary_subtotal_label');
        this.taxAmount = this.page.locator('.summary_tax_label');
        this.totalAmount = this.page.locator('.summary_total_label');
        console.log("OrderReviewPage initialized successfully");
    }

    async getAllElements() {
        return {
            pageTitle: this.pageTitle,
            cancelButton: this.cancelButton,
            finishButton: this.finishButton,
        }
    }

    async clickFinishButton() {
        console.log("Clicking on Finish Button");
        await this.finishButton.click();
    }

    async clickCancelButton() {
        console.log("Clicking on Cancel Button");
        await this.cancelButton.click();
    }

    async getTaxAmount() {

        const taxText = await this.taxAmount.textContent();
        console.log("Tax amount text: " + taxText);
        const taxAmount = parseFloat(taxText.split('$')[1].trim());
        console.log("Tax amount: " + taxAmount);
        return taxAmount
    }
    async getTotalAmount() {
        const totalText = await this.totalAmount.textContent();
        console.log("Total amount text: " + totalText);
        const totalAmount = parseFloat(totalText.split('$')[1].trim());
        console.log("Total amount: " + totalAmount);
        return totalAmount;
    }

    async getItemSubTotal() {

        const subTotalText = await this.itemSubTotal.textContent();
        console.log("Item Subtotal text: " + subTotalText);
        const subTotalAmount = parseFloat(subTotalText.split('$')[1].trim());
        console.log("Item Subtotal amount: " + subTotalAmount);
        return subTotalAmount;
    }

    async getProuctDetails() {

        console.log("=== Getting all product details in Checkout Overview Page ===");
        const productNames = await this.productName.allTextContents();
        const productDescriptions = await this.productDescription.allTextContents();
        const productPrices = await this.productPrice.allTextContents();
        const allProducts = productNames.map((_, i) =>
        ({
            names: productNames[i].trim(),
            descriptions: productDescriptions[i].trim(),
            prices: productPrices[i].trim()
        }
        ))
        return allProducts;
    }
}


module.exports = { OrderReviewPage };