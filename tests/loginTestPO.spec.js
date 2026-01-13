import {test,expect} from '@playwright/test';

const {loginPage} = require('../pages/loginPage');

import { BaseURL, Username, Password } from '../utils/envConfig';



test('@Login Login to Sauce Demo application with credentials',async ({page})=>
{
        console.log("=== Starting login test (loginTestPO.spec.js) with Page Objects ===");
        const login = new loginPage(page);
        await page.goto(BaseURL);
        console.log("Navigated to: " + BaseURL);
        await login.loginToApplication(Username,Password);
        console.log("Login application method called");
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        console.log("=== Login test completed successfully ===");

})

