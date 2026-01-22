// @ts-check
const { devices } = require('@playwright/test');
const { worker } = require('node:cluster');
const { permission } = require('node:process');

const config = {
  testDir: './tests',
  workers: 1,
 

  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
 // Add Allure reporter configuration
  reporter: [
    ['html'],
    ['allure-playwright']
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects :[
    {
      name: 'Chrome',
      use: { browserName : 'chromium',
        headless: false,
        screenshot : 'on',
        trace : 'on',//off,on  
        ignoreHTTPSErrors: true,
        worker:1
      
       
      }
       }]


};

module.exports = config;

