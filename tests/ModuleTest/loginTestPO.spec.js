import {test,expect} from '@playwright/test';
const {LoginPage} = require('../../pages/LoginPage');
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
        console.log("=== Test: Login with valid credentials (standard_user) ===");
       

        await login.loginToApplication(Username,Password);
        console.log("Login completed");
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Test PASSED: Successfully logged in and redirected to inventory page ===");
})



test('@Login-Positive-06 Session persists across page refresh',async ({page})=>
{
        console.log("=== Test: Session persists across page refresh ===");
      //  const login = new loginPage(page);
      
        await login.loginToApplication(Username,Password);
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
        //const login = new loginPage(page);
      
        await login.loginToApplication('Username',Password);
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message displayed for invalid username ===");
})

test('@Login-Negative-02 Login with invalid password',async ({page})=>
{
        console.log("=== Test: Login with invalid password ===");
        //const login = new loginPage(page);
     
        await login.loginToApplication(Username,'Test1234');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('do not match');
        console.log("=== Test PASSED: Error message displayed for invalid password ===");
})

test('@Login-Negative-03 Login with empty username field',async ({page})=>
{
        console.log("=== Test: Login with empty username field ===");
        //const login = new loginPage(page);
        
        await login.enterUsername('');
        await login.enterPassword(Password);
        await login.clickLoginButton();
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        const errorMessage = await login.getErrorMessage();
        await expect(errorMessage).toContain('Username is required');
        console.log("=== Test PASSED: Error message displayed for empty username ===");
})


test('@Login-Negative-07 Verify error message is displayed for invalid credentials',async ({page})=>
{
        console.log("=== Test: Verify error message is displayed for invalid credentials ===");
      //  const login = new loginPage(page);
       
        await login.loginToApplication('random_user','random_pass');
        
        const isErrorVisible = await login.isErrorMessageVisible();
        await expect(isErrorVisible).toBeTruthy();
        console.log("=== Test PASSED: Error message is clearly visible ===");
})



});

