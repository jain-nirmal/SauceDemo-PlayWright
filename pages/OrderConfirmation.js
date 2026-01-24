class OrderConfirmationPage{

    constructor(page){
        this.page=page;
        this.pageTitle=this.page.locator('.title');
        this.confirmationText=this.page.locator('.complete-header');
        this.confirmationMessage=this.page.locator('.complete-text');
        this.backHomeButton=this.page.locator('#back-to-products');
        console.log("OrderConfirmation Page initialized successfully");
    }


    async clickBackHomeButton(){
        console.log("Clicking on Back Home Button");
        await this.backHomeButton.click();
    }

    async getAllElements(){
        return {
            pageTitle:this.pageTitle,
            confirmationText:this.confirmationText,
            backHomeButton:this.backHomeButton,
        }
    }
}

module.exports = { OrderConfirmationPage };