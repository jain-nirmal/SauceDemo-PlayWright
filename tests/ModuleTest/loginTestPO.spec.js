import {test,expect} from '@playwright/test';
const {LoginPage} = require('../../pages/HomePage');
import { BaseURL, Username, Password } from '../../utils/envConfig';

// ================== POSITIVE TEST SCENARIOS ==================


test.describe('@Login Login Page Tests',()=>{

    let login
    test.beforeEach(async ({page})=>{
        login= new LoginPage(page);
        login.navigateToLoginPage(BaseURL);
        console.log("=== Page launched sucessfully===");
        console.log("=== Test setup: beforeEach ===");

    })


test('@SmokeTesting @Login-Positive-01 Login with valid credentials (standard_user)',async ({page})=>
        
{
        await test.step('Prepare test - Login with valid credentials', async () => {
                console.log("=== Test: Login with valid credentials (standard_user) ===")
        });

        await test.step('Enter valid credentials and login', async () => {
                await login.loginToApplication(Username,Password);
                console.log("Login completed");
        });

        await test.step('Verify redirect to inventory page', async () => {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
        });
})



test('@Login-Positive-06 Session persists across page refresh',async ({page})=>
{
        await test.step('Login with valid credentials', async () => {
                console.log("=== Test: Session persists across page refresh ===");
                await login.loginToApplication(Username,Password);
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                console.log("Logged in successfully");
        });

        await test.step('Refresh the page', async () => {
                await page.reload();
                console.log("Page refreshed");
        });

        await test.step('Verify session persists after refresh', async () => {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                console.log("=== Test PASSED: Session persists after page refresh ===");
        });
})

// ================== NEGATIVE TEST SCENARIOS ==================

test('@Login-Negative-01 Login with invalid username',async ({page})=>
{
        await test.step('Enter invalid username with valid password', async () => {
                console.log("=== Test: Login with invalid username ===");
                await login.loginToApplication('Username',Password);
        });

        await test.step('Verify error message is visible', async () => {
                const isErrorVisible = await login.isErrorMessageVisible();
                await expect(isErrorVisible).toBeTruthy();
                console.log("=== Test PASSED: Error message displayed for invalid username ===");
        });
})

test('@Login-Negative-02 Login with invalid password',async ({page})=>
{
        await test.step('Enter valid username with invalid password', async () => {
                console.log("=== Test: Login with invalid password ===");
                await login.loginToApplication(Username,'Test1234');
        });

        await test.step('Verify error message is visible and contains expected text', async () => {
                const isErrorVisible = await login.isErrorMessageVisible();
                await expect(isErrorVisible).toBeTruthy();
                const errorMessage = await login.getErrorMessage();
                await expect(errorMessage).toContain('do not match');
                console.log("=== Test PASSED: Error message displayed for invalid password ===");
        });
})

test('@Login-Negative-03 Login with empty username field',async ({page})=>
{
        await test.step('Leave username empty and enter password', async () => {
                console.log("=== Test: Login with empty username field ===");
                await login.enterUsername('');
                await login.enterPassword(Password);
        });

        await test.step('Click login button', async () => {
                await login.clickLoginButton();
        });

        await test.step('Verify error message for empty username', async () => {
                const isErrorVisible = await login.isErrorMessageVisible();
                await expect(isErrorVisible).toBeTruthy();
                const errorMessage = await login.getErrorMessage();
                await expect(errorMessage).toContain('Username is required');
                console.log("=== Test PASSED: Error message displayed for empty username ===");
        });
})


test('@Login-Negative-07 Verify error message is displayed for invalid credentials',async ({page})=>
{
        await test.step('Login with random invalid credentials', async () => {
                console.log("=== Test: Verify error message is displayed for invalid credentials ===");
                await login.loginToApplication('random_user','random_pass');
        });

        await test.step('Verify error message is clearly visible', async () => {
                const isErrorVisible = await login.isErrorMessageVisible();
                await expect(isErrorVisible).toBeTruthy();
                console.log("=== Test PASSED: Error message is clearly visible ===");
        });
})



});

