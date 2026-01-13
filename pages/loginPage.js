class loginPage{
    constructor(page){
        console.log("=== Initializing loginPage ===");
        this.page=page;
        this.userNameInput=page.locator('#user-name');
        this.passwordInput=page.locator('#password');
        this.loginButton=page.locator('#login-button');
        console.log("loginPage initialized successfully");
    }   


    async loginToApplication(username,password){
        console.log("=== Starting login process ===");
        console.log("Username: " + username);
        await this.userNameInput.fill(username);
        console.log("Username filled successfully");
        await this.passwordInput.fill(password);
        console.log("Password filled successfully");
        await this.loginButton.click();
        console.log("Login button clicked");
        await this.page.waitForLoadState('networkidle');
        console.log("Page loaded successfully after login");
    }

}
module.exports={loginPage};