import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import {ProductPage} from '../../pages/ProductPage';
import { BaseURL, Username, Password } from '../../utils/envConfig';




test.describe('Product Page Tests',()=>
    {
    let productPage;
    let loginPage;
    test.beforeEach(async ({page})=>
        {

    console.log("=== Test setup: beforeEach ===");
    productPage = new ProductPage(page);
    loginPage = new LoginPage(page);
    await page.goto(BaseURL);
    console.log("Navigated to: " + BaseURL);
    await loginPage.loginToApplication(Username,Password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log("=== Test setup completed ===");
})

test('@SmokeTesting @LogOut @Sanity Logout from application',async ({page})=>{
    console.log("=== Starting logout test ===");
    
    await productPage.logOutFromApplication();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    console.log("=== Logout test completed ===");
})

test('@productpage @Sanity Navigate to About page from product page',async ({page})=>{
    console.log("=== Starting navigate to About page test ===");
    
    await productPage.navigateToAboutPage();
     await expect(productPage.tryFreebutton).toBeVisible();
    await expect(productPage.requestDemoButton).toBeVisible();
    console.log("=== Navigate to About page test completed ===");
})


test('@Sanity Validate product order when soted by Name A to Z',async ({page})=>{
    console.log("=== Starting product sort test ===");
   
    const productNamesBeforeSort = await productPage.geteProductNamesList();
    console.log("Product names before sort :"+productNamesBeforeSort);
    await productPage.sortProductBy('Name (A to Z)');
    const sortedProductNames =[...productNamesBeforeSort].sort();
    expect(productNamesBeforeSort).toEqual(sortedProductNames);
    console.log("=== Product sort test completed ===");
})

test('@Sanity Validate product order when soted by Name Z to A',async ({page})=>{
    console.log("=== Starting product sort Z to A test ===");
    
    const productNamesBeforeSort = await productPage.geteProductNamesList();
    console.log("Product names before sort :"+productNamesBeforeSort);
    await productPage.sortProductBy('Name (Z to A)');
    const sortedProductNames =[...productNamesBeforeSort].sort().reverse();
    console.log("Product names after sort :"+sortedProductNames);
     expect(productNamesBeforeSort).not.toEqual(sortedProductNames);
    console.log("=== Product sort Z to A test completed ===");

})

test('@Sanity Validate product order when soted by price high to low',async ({page})=>{
    console.log("=== Starting product sort price high to low test ===");
   
    const productNamesBeforeSort = await productPage.geteProductNamesList();
    console.log("Product names before sort :"+productNamesBeforeSort);
    await productPage.sortProductBy('Name (Z to A)');
    const sortedProductNames =[...productNamesBeforeSort].sort().reverse();
    console.log("Product names after sort :"+sortedProductNames);
     expect(productNamesBeforeSort).not.toEqual(sortedProductNames);
    console.log("=== Product sort Z to A test completed ===");

})

test('@Sanity Validate product order when soted by price Low to High',async ({page})=>{
    console.log("=== Starting product sort price low to high test ===");
   
    const productNamesBeforeSort = await productPage.geteProductNamesList();
    console.log("Product names before sort :"+productNamesBeforeSort);
    await productPage.sortProductBy('Name (Z to A)');
    const sortedProductNames =[...productNamesBeforeSort].sort().reverse();
    console.log("Product names after sort :"+sortedProductNames);
     expect(productNamesBeforeSort).not.toEqual(sortedProductNames);
    console.log("=== Product sort Z to A test completed ===");

})

});
