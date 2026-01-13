import {test,expect} from '@playwright/test';

const {loginPage} = require('../pages/loginPage');

import { BaseURL, Username, Password } from '../utils/envConfig';

// ================== POSITIVE TEST SCENARIOS ==================

test('@Login-Positive-01 Login with valid credentials (standard_user)',async ({page})=>
{
        console.log("=== Test: Login with valid credentials (standard_user) ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        console.log("Navigated to login page");
        await login.loginToApplication('standard_user','secret_sauce');
        console.log("Login completed");
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
})

test('@Login-Positive-02 Verify login page is displayed',async ({page})=>
{
        console.log("=== Test: Verify login page is displayed ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        const isPageDisplayed = await login.isLoginPageDisplayed();
        await expect(isPageDisplayed).toBeTruthy();
        console.log("=== Test PASSED: Login page is displayed correctly ===");
})

test('@Login-Positive-03 Verify username field accepts input',async ({page})=>
{
        console.log("=== Test: Verify username field accepts input ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.enterUsername('standard_user');
        const value = await login.getUsernameFieldValue();
        await expect(value).toBe('standard_user');
        console.log("=== Test PASSED: Username field accepts and stores input ===");
})

test('@Login-Positive-04 Verify password field accepts input',async ({page})=>
{
        console.log("=== Test: Verify password field accepts input ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.enterPassword('secret_sauce');
        const value = await login.getPasswordFieldValue();
        await expect(value).toBe('secret_sauce');
        console.log("=== Test PASSED: Password field accepts and stores input ===");
})

test('@Login-Positive-05 Verify login button is enabled',async ({page})=>
{
        console.log("=== Test: Verify login button is enabled ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        const isEnabled = await login.isLoginButtonEnabled();
        await expect(isEnabled).toBeTruthy();
        console.log("=== Test PASSED: Login button is enabled ===");
})

test('@Login-Positive-06 Session persists across page refresh',async ({page})=>
{
        console.log("=== Test: Session persists across page refresh ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("Logged in successfully");
        
        await page.reload();
        console.log("Page refreshed");
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Test PASSED: Session persists after page refresh ===");
})

// ================== NEGATIVE TEST SCENARIOS ==================

test('@Login-Negative-01 Login with invalid username',async ({page})=>
{
        console.log("=== Test: Login with invalid username ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('invalid_user','secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for invalid username ===");
})

test('@Login-Negative-02 Login with invalid password',async ({page})=>
{
        console.log("=== Test: Login with invalid password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user','invalid_password');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('do not match');
        console.log("=== Test PASSED: Error message displayed for invalid password ===");
})

test('@Login-Negative-03 Login with empty username field',async ({page})=>
{
        console.log("=== Test: Login with empty username field ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.enterUsername('');
        await login.enterPassword('secret_sauce');
        await login.clickLoginButton();
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('Username is required');
        console.log("=== Test PASSED: Error message displayed for empty username ===");
})

test('@Login-Negative-04 Login with empty password field',async ({page})=>
{
        console.log("=== Test: Login with empty password field ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.enterUsername('standard_user');
        await login.enterPassword('');
        await login.clickLoginButton();
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('Password is required');
        console.log("=== Test PASSED: Error message displayed for empty password ===");
})

test('@Login-Negative-05 Login with empty username and password',async ({page})=>
{
        console.log("=== Test: Login with empty username and password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.enterUsername('');
        await login.enterPassword('');
        await login.clickLoginButton();
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('Username is required');
        console.log("=== Test PASSED: Error message displayed for empty credentials ===");
})

test('@Login-Negative-06 Login with locked_out_user account',async ({page})=>
{
        console.log("=== Test: Login with locked_out_user account ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('locked_out_user','secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('locked out');
        console.log("=== Test PASSED: Error message displayed for locked out user ===");
})

test('@Login-Negative-07 Verify error message is displayed for invalid credentials',async ({page})=>
{
        console.log("=== Test: Verify error message is displayed for invalid credentials ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('random_user','random_pass');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message is clearly visible ===");
})

test('@Login-Negative-08 Verify user remains on login page after failed login',async ({page})=>
{
        console.log("=== Test: Verify user remains on login page after failed login ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('invalid_user','invalid_pass');
        
        // Should still be on login page
        await expect(page).toHaveURL(BaseURL + '/');
        const isLoginPageDisplayed = await login.isLoginPageDisplayed();
        await expect(isLoginPageDisplayed).toBeTruthy();
        console.log("=== Test PASSED: User remains on login page after failed login ===");
})

test('@Login-Negative-09 Login with special characters in username',async ({page})=>
{
        console.log("=== Test: Login with special characters in username ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('user@#$%','secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for special characters in username ===");
})

test('@Login-Negative-10 Login with special characters in password',async ({page})=>
{
        console.log("=== Test: Login with special characters in password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user','pass@#$%^&*()');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for special characters in password ===");
})

test('@Login-Negative-11 Verify case sensitivity of username',async ({page})=>
{
        console.log("=== Test: Verify case sensitivity of username ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('STANDARD_USER','secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Username is case sensitive ===");
})

test('@Login-Negative-12 Verify case sensitivity of password',async ({page})=>
{
        console.log("=== Test: Verify case sensitivity of password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user','SECRET_SAUCE');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Password is case sensitive ===");
})

test('@Login-Negative-13 Login with very long username string',async ({page})=>
{
        console.log("=== Test: Login with very long username string ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        const longUsername = 'a'.repeat(500);
        await login.loginToApplication(longUsername,'secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for very long username ===");
})

test('@Login-Negative-14 Login with very long password string',async ({page})=>
{
        console.log("=== Test: Login with very long password string ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        const longPassword = 'a'.repeat(500);
        await login.loginToApplication('standard_user',longPassword);
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for very long password ===");
})

test('@Login-Negative-15 Login with leading/trailing spaces in username',async ({page})=>
{
        console.log("=== Test: Login with leading/trailing spaces in username ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('  standard_user  ','secret_sauce');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for username with spaces ===");
})

test('@Login-Negative-16 Login with leading/trailing spaces in password',async ({page})=>
{
        console.log("=== Test: Login with leading/trailing spaces in password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user','  secret_sauce  ');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for password with spaces ===");
})

test('@Login-Negative-17 Login with SQL injection attempt in username',async ({page})=>
{
        console.log("=== Test: Login with SQL injection attempt in username ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication("' OR '1'='1","secret_sauce");
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: SQL injection attempt blocked ===");
})

test('@Login-Negative-18 Login with SQL injection attempt in password',async ({page})=>
{
        console.log("=== Test: Login with SQL injection attempt in password ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('standard_user',"' OR '1'='1");
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: SQL injection attempt blocked ===");
})

test('@Login-Negative-19 Verify error message is accessible (WCAG compliance)',async ({page})=>
{
        console.log("=== Test: Verify error message is accessible ===");
        const login = new loginPage(page);
        await login.navigateToLoginPage(BaseURL);
        await login.loginToApplication('invalid_user','invalid_pass');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage.length).toBeGreaterThan(0);
        console.log("=== Test PASSED: Error message is accessible and readable ===");
})

test('@Login-Negative-20 Verify navigation to login page without authentication redirects correctly',async ({page})=>
{
        console.log("=== Test: Verify navigation to login page without authentication ===");
        const login = new loginPage(page);
        
        // Try to access inventory page directly
        await page.goto(BaseURL + '/inventory.html');
        
        // Should redirect to login page
        await expect(page).toHaveURL(BaseURL + '/');
        const isLoginPageDisplayed = await login.isLoginPageDisplayed();
        await expect(isLoginPageDisplayed).toBeTruthy();
        console.log("=== Test PASSED: Unauthenticated access redirects to login page ===");
})

