import {test,expect} from '@playwright/test';

test('@Login Login to Sauce Demo application with credentials',async ({page})=>
{
        console.log("=== Starting login test (loginTest.spec.js) ===");
        await page.goto('https://www.saucedemo.com');
        console.log("Navigated to login page");
        await page.locator('#user-name').fill('standard_user');
        console.log("Username filled");
        await page.locator('#password').fill('secret_sauce');
        console.log("Password filled");
        await page.locator('#login-button').click();
        console.log("Login button clicked");
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Login test completed successfully ===");

})