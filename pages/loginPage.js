class LoginPage{
    constructor(page){
        console.log("=== Initializing loginPage ===");
        this.page=page;
        this.userNameInput=page.locator('#user-name');
        this.passwordInput=page.locator('#password');
        this.loginButton=page.locator('#login-button');
        this.errorMessage=page.locator('[data-test="error"]');
        this.appLogo=page.locator('.login_logo');
        console.log("loginPage initialized successfully");
    }   

    // Navigate to login page
    async navigateToLoginPage(url){
        console.log("=== Navigating to login page ===");
        await this.page.goto(url);
        console.log("Navigated to: " + url);
    }

    // Enter username
    async enterUsername(username){
        console.log("=== Entering username ===");
        console.log("Username: " + username);
        await this.userNameInput.fill(username);
        console.log("Username filled successfully");
    }

    // Enter password
    async enterPassword(password){
        console.log("=== Entering password ===");
        await this.passwordInput.fill(password);
        console.log("Password filled successfully");
    }

    // Click login button
    async clickLoginButton(){
        console.log("=== Clicking login button ===");
        await this.loginButton.click();
        console.log("Login button clicked");
    }

    // Complete login process
    async loginToApplication(username,password){
        console.log("=== Starting login process ===");
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.page.waitForLoadState('networkidle');
        console.log("Page loaded successfully after login");
    }

    // Get error message text
    async getErrorMessage(){
        console.log("=== Getting error message ===");
        const errorText = await this.errorMessage.textContent();
        console.log("Error message: " + errorText);
        return errorText;
    }

    // Check if error message is visible
    async isErrorMessageVisible(){
        console.log("=== Checking if error message is visible ===");
        const isVisible = await this.errorMessage.isVisible();
        console.log("Error message visible: " + isVisible);
        return isVisible;
    }

    // Check if login page is displayed
    async isLoginPageDisplayed(){
        console.log("=== Checking if login page is displayed ===");
        const isVisible = await this.userNameInput.isVisible();
        console.log("Login page displayed: " + isVisible);
        return isVisible;
    }

    // Clear all input fields
    async clearAllFields(){
        console.log("=== Clearing all input fields ===");
        await this.userNameInput.clear();
        await this.passwordInput.clear();
        console.log("All fields cleared successfully");
    }

    // Check if username field has focus
    async isUsernameFocused(){
        console.log("=== Checking if username field is focused ===");
        const isFocused = await this.userNameInput.evaluate(el => el === document.activeElement);
        console.log("Username field focused: " + isFocused);
        return isFocused;
    }

    // Check if password field has focus
    async isPasswordFocused(){
        console.log("=== Checking if password field is focused ===");
        const isFocused = await this.passwordInput.evaluate(el => el === document.activeElement);
        console.log("Password field focused: " + isFocused);
        return isFocused;
    }

    // Get username field value
    async getUsernameFieldValue(){
        console.log("=== Getting username field value ===");
        const value = await this.userNameInput.inputValue();
        console.log("Username field value: " + value);
        return value;
    }

    // Get password field value
    async getPasswordFieldValue(){
        console.log("=== Getting password field value ===");
        const value = await this.passwordInput.inputValue();
        console.log("Password field value: " + value);
        return value;
    }

    // Check if login button is enabled
    async isLoginButtonEnabled(){
        console.log("=== Checking if login button is enabled ===");
        const isEnabled = await this.loginButton.isEnabled();
        console.log("Login button enabled: " + isEnabled);
        return isEnabled;
    }

}
module.exports={LoginPage};