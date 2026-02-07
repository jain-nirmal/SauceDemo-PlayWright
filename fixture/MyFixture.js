const base = require('@playwright/test')
const {LoginPage} = require('../pages/LoginPage')
const {ProductPage} = require('../pages/ProductPage')
const {CartPage}=require('../pages/CartPage')


exports.test=base.test.extend({

    loginPage:async({page},use)=>{

        const loginPage=new LoginPage(page)
        await use(loginPage);
    } ,

    productPage:async({page},use)=>{

        const productPage=new ProductPage(page)
        await use(productPage);
    },
       
    cartPage:async({page},use)=>{

        const cartPage=new CartPage(page)
        await use(cartPage);
    }







})
exports.expect = base.expect;
