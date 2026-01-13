// @ts-check
const { devices } = require('@playwright/test');
const { worker } = require('node:cluster');
const { permission } = require('node:process');

const config = {
  testDir: './tests',
 

  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects :[
    {
      name: 'chrome',
      use: { browserName : 'chromium',
        headless: false,
        screenshot : 'on',
        trace : 'on',//off,on  
        ignoreHTTPSErrors: true,
        worker:1
      
       
      }
       },
    
    {
      name: 'firefox',
      use: { browserName : 'firefox',
        headless: true,
        screenshot : 'on',
        trace : 'on',//off,on  
      } },
    
    {
      name: 'Safari',
      use: { browserName : 'webkit',
        headless: false,
        screenshot : 'on',
        trace : 'off',//off,on  
        ...devices['iPhone 13']
      } },
    
  ]
  


};

module.exports = config;

