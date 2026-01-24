class CheckOutPage{


 constructor(page) {

    console.log("=== Initializing CheckOutPage ===");
    this.page = page;
    this.title = this.page.locator('.title');
    this.firstNameInput = this.page.locator('#first-name');
    this.lastNameInput = this.page.locator('#last-name');
    this.postalCodeInput = this.page.locator('#postal-code');
    this.continueButton = this.page.locator('#continue');
    this.cancelButton = this.page.locator('#cancel');




}

  async clickCancelButton() {
    console.log("=== Clicking Cancel button on Checkout Page ===");
    await this.cancelButton.click();
    console.log("Cancel button clicked successfully");
}
 

 async clickContinueButton() {
    console.log("=== Clicking Continue button on Checkout Page ===");
    await this.continueButton.click();
    console.log("Continue button clicked successfully");
}

async enterCheckOutInformation(firstName, lastName, postalCode) {
    console.log("=== Entering checkout information ===");
    console.log("First Name: " + firstName);
    console.log("Last Name: " + lastName);
    console.log("Postal Code: " + postalCode);
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    console.log("Checkout information entered successfully");



}

async getCheckOutPageTitle() {
    console.log("=== Getting Checkout Page title ===");
    const titleText = await this.title.textContent();
    console.log("Checkout Page title: " + titleText);
    return titleText;


}

async getCheckOutElement(){

    return{
        pageTitle:this.title,
        cancelButton:this.cancelButton,
        continueButton:this.continueButton
    }
}

}



module.exports={CheckOutPage};
