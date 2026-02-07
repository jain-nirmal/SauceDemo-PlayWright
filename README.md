# SauceDemo-PlayWright

A comprehensive end-to-end test automation framework for the [SauceDemo](https://www.saucedemo.com) web application built using Playwright and JavaScript. This project demonstrates best practices in test automation using the Page Object Model (POM) design pattern.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Reporting](#test-reporting)
- [Page Object Model](#page-object-model)
- [Test Categories](#test-categories)
- [Contributing](#contributing)

## 🎯 Overview

This project provides automated testing for the SauceDemo e-commerce application, covering various user flows including:
- User authentication
- Product browsing and filtering
- Shopping cart management
- Checkout process
- Order confirmation

## ✨ Features

- **Page Object Model (POM)**: Clean separation of test logic and page interactions
- **Modular Test Structure**: Organized tests by feature modules
- **End-to-End Testing**: Complete user journey validation
- **Allure Reporting**: Beautiful and detailed test reports
- **Playwright Configuration**: Customizable browser settings and test execution
- **Data-Driven Testing**: External test data management using JSON files
- **Environment Configuration**: Centralized configuration management
- **Comprehensive Logging**: Detailed console logs for debugging

## 📁 Project Structure

```
SauceDemo-PlayWright/
├── pages/                      # Page Object Model classes
│   ├── loginPage.js           # Login page interactions
│   ├── productPage.js         # Product catalog page
│   ├── CartPage.js            # Shopping cart page
│   ├── OrderProcess.js        # Checkout information page
│   ├── OrderReview.js         # Order review page
│   └── OrderConfirmation.js   # Order confirmation page
├── tests/                      # Test specifications
│   ├── ModuleTest/            # Module-specific tests
│   │   ├── loginTest.spec.js
│   │   ├── loginTestPO.spec.js
│   │   ├── productpage.spec.js
│   │   ├── cartPageTest.spec.js
│   │   ├── checkOutPageTest.spec.js
│   │   ├── orderReviewTest.spec.js
│   │   └── orderConfirmationTest.spec.js
│   ├── End-2-end/             # End-to-end test scenarios
│   │   └── businessScenarioTest.spec.js
│   └── fixtureTest/           # Fixture-based tests
│       └── fixtureTest.spec.js
├── fixture/                    # Test fixtures
│   └── MyFixture.js
├── testdata/                   # Test data files
│   └── checkOutTestData.json
├── utils/                      # Utility functions
│   └── envConfig.js           # Environment configuration
├── allure-results/            # Allure test results
├── playwright-report/         # Playwright HTML reports
├── test-results/              # Test execution results
├── playwright.config.js       # Playwright configuration
└── package.json               # Project dependencies

```

## 🔧 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Git**

## 📥 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jain-nirmal/SauceDemo-PlayWright.git
   cd SauceDemo-PlayWright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

## ⚙️ Configuration

### Playwright Configuration

The `playwright.config.js` file contains:
- Test directory configuration
- Browser settings (Chromium by default)
- Screenshot and trace options
- Allure reporter configuration
- Timeout settings

### Environment Configuration

Update `utils/envConfig.js` with your test environment settings:
```javascript
export const BaseURL = 'https://www.saucedemo.com';
export const Username = 'standard_user';
export const Password = 'secret_sauce';
```

## 🚀 Running Tests

### Run all tests
```bash
npm test
```

### Run tests with Allure report generation
```bash
npm run test:allure
```

### Open Allure report
```bash
npm run allure:report
```

### Run specific test file
```bash
npx playwright test tests/ModuleTest/loginTest.spec.js
```

### Run tests with specific tag
```bash
npx playwright test --grep @SmokeTesting
npx playwright test --grep @end-2-end
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run tests in debug mode
```bash
npx playwright test --debug
```

## 📊 Test Reporting

This project uses multiple reporting mechanisms:

### 1. Allure Reports
- Detailed test execution reports with screenshots
- Test history and trends
- Step-by-step execution details

### 2. Playwright HTML Report
- Built-in Playwright reporter
- Trace viewer for debugging
- Screenshots and videos on failure

### 3. Console Logs
- Comprehensive logging throughout test execution
- Helps in debugging and understanding test flow

## 📄 Page Object Model

### Page Objects

#### LoginPage
- `navigateToLoginPage(url)` - Navigate to login page
- `loginToApplication(username, password)` - Complete login flow
- `getErrorMessage()` - Retrieve error messages
- `isErrorMessageVisible()` - Check error visibility

#### ProductPage
- `addProductToCart(productName)` - Add specific product to cart
- `addAllProductsToCart()` - Add all products to cart
- `logOutFromApplication()` - Logout functionality
- `sortProductBy(optionText)` - Sort products
- `getShoppingCartProductCount()` - Get cart item count

#### CartPage
- `validateProductInCart(productName)` - Verify product in cart
- `clickOnCheckout()` - Proceed to checkout
- `removeButtonFromCart()` - Remove products from cart
- `clickOnContinueShopping()` - Return to shopping

#### OrderProcess
- `enterCheckOutInformation(firstName, lastName, postalCode)` - Fill checkout form
- `clickContinueButton()` - Continue to review
- `clickCancelButton()` - Cancel checkout

#### OrderReviewPage
- `getProuctDetails()` - Get product details
- `getItemSubTotal()` - Get subtotal amount
- `clickFinishButton()` - Complete order
- `clickCancelButton()` - Cancel order

#### OrderConfirmationPage
- `getAllElements()` - Get all page elements
- `clickBackHomeButton()` - Return to home page

## 🏷️ Test Categories

Tests are organized with tags for easy filtering:

- `@SmokeTesting` - Critical path smoke tests
- `@Sanity` - Sanity tests for basic functionality
- `@Login` - Login-related tests
- `@productpage` - Product page tests
- `@CartPage` - Shopping cart tests
- `@Checkout` - Checkout process tests
- `@OrderReview` - Order review tests
- `@OrderConfirmation` - Order confirmation tests
- `@end-2-end` - Complete end-to-end scenarios

## 🧪 Test Coverage

### Login Tests
- Valid/invalid credentials
- Empty field validation
- Session persistence
- Error message validation

### Product Page Tests
- Product sorting (A-Z, Z-A, price)
- Add to cart functionality
- Logout functionality
- Navigation tests

### Cart Page Tests
- Product validation in cart
- Remove from cart
- Continue shopping
- Checkout navigation

### Checkout Tests
- Form field validation
- Cancel functionality
- Continue to review
- Mandatory field validation

### Order Review Tests
- Price calculation validation
- Finish order functionality
- Cancel functionality

### Order Confirmation Tests
- Confirmation message validation
- Back to home navigation

### End-to-End Tests
- Complete purchase flow for single product
- Complete purchase flow for multiple products

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Nirmal Jain**
- GitHub: [@jain-nirmal](https://github.com/jain-nirmal)

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Modern web testing framework
- [Allure](https://docs.qameta.io/allure/) - Test reporting tool
- [SauceDemo](https://www.saucedemo.com) - Test application

---

**Happy Testing! 🎭**