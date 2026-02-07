// @ts-check
const { devices } = require('@playwright/test');
const { worker } = require('node:cluster');
const { permission } = require('node:process');

const config = {
  testDir: './tests',
  workers: 1,
  fullyParallel: true,
  screenshot: 'only-on-failure',
  trace: 'on',
  video: 'on-failure', // or 'retain-on-failure'
  
 

  
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
 // Add Allure reporter configuration
   reporter: [
    ['html'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
      categories: [
        {
          name: "Smoke Tests",
          matchedStatuses: ["failed", "broken"]
        },
        {
          name: "Login Tests",
          matchedStatuses: ["failed"]
        }
      ],
      environmentInfo: {
        Project: 'SauceDemo Automation',
        E2E_NODE_VERSION: process.version,
        E2E_OS: process.platform
      }
    }]
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
        worker:4,
        retries:1
      
       
      }
       }
    /*   {
      name: 'Firefox',
      use: { browserName : 'firefox',
        headless: false,
        screenshot : 'on',
        trace : 'on',//off,on  
        ignoreHTTPSErrors: true,
        worker:4
      
       
      }
       } */]


};

module.exports = config;

