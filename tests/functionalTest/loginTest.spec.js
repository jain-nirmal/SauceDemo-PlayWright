import {test,expect} from '@playwright/test';

test('@Login Login to Sauce Demo application with credentials',async ({page})=>
{
        await test.step('Navigate to Sauce Demo login page', async () => {
                console.log("=== Starting login test (loginTest.spec.js) ===");
                await page.goto('https://www.saucedemo.com');
                console.log("Navigated to login page");
        });

        await test.step('Enter username', async () => {
                await page.locator('#user-name').fill('standard_user');
                console.log("Username filled");
        });

        await test.step('Enter password', async () => {
                await page.locator('#password').fill('secret_sauce');
                console.log("Password filled");
        });

        await test.step('Click login button', async () => {
                await page.locator('#login-button').click();
                console.log("Login button clicked");
        });

        await test.step('Verify successful login and redirection to inventory page', async () => {
                await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
                console.log("=== Login test completed successfully ===");
        });

})