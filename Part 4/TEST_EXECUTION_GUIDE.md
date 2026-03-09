# Playwright QA Automation - Test Suite

## Overview

This comprehensive test suite implements **Page Object Model (POM)** pattern for Playwright-based E2E testing across three critical web application scenarios:

1. **AJAX Data Loading** - Testing asynchronous data loading with explicit condition-based waiting
2. **Login Form Validation** - Testing form interactions with resilient element selection
3. **Dynamic Elements & Overlapped UI** - Testing resilient selectors that handle dynamic ID changes and overlapped elements

### Key Architecture Principles

✅ **Page Object Model** - Separation of page interaction logic from test logic  
✅ **Explicit Condition-Based Waiting** - No hardcoded sleep() or arbitrary timeouts  
✅ **Meaningful Assertions** - Verifies actual application state, not just "no errors"  
✅ **Resilient Selectors** - Tests pass across multiple runs with dynamic IDs and hidden elements  

---

## Project Structure

```
Part 4/
├── pages/
│   ├── AjaxPage.js                 # AJAX page interactions
│   ├── LoginPage.js                # Login form interactions
│   └── DynamicElementsPage.js      # Dynamic IDs and overlapped elements
├── tests/
│   ├── ajax.spec.js                # 5 AJAX test cases
│   ├── login.spec.js               # 10 login test cases
│   └── dynamic-elements.spec.js    # 13 dynamic element test cases
├── package.json                    # Dependencies and scripts
├── playwright.config.js            # Playwright configuration
└── TEST_EXECUTION_GUIDE.md        # This file
```

---

## Installation

### Prerequisites
- Node.js v14 or higher
- npm or yarn package manager

### Setup Steps

```bash
# Navigate to Part 4 directory
cd Part\ 4

# Install dependencies
npm install

# Verify installation
npx playwright --version
```

---

## Running Tests

### Run All Tests (Headless)
```bash
npm test
```

### Run Tests with Browser Visible
```bash
npm run test:headed
```

### Run Specific Test Suite

```bash
# AJAX tests only
npm run test:ajax

# Login tests only
npm run test:login

# Dynamic elements tests only
npm run test:dynamic
```

### Debug Mode (Interactive)
```bash
npm run test:debug
```

### UI Mode (Visual Test Runner)
```bash
npm run test:ui
```

### View Test Report
```bash
npm run report
```

---

## Test Suite Details

### Scenario A: AJAX Data Loading (5 Tests)

**File:** `tests/ajax.spec.js`

**Purpose:** Test asynchronous AJAX data loading with explicit condition-based waiting

| Test Case | Description |
|-----------|-------------|
| `TC-AJAX-001` | Successful AJAX Data Load - Verifies data loads within expected timeframe |
| `TC-AJAX-002` | AJAX Data Load with Timeout Verification - Measures and validates exact load time |
| `TC-AJAX-003` | Verify Exact Label Text Content - Confirms success message text |
| `TC-AJAX-004` | Multiple Sequential AJAX Requests - Tests repeated AJAX calls |
| `TC-AJAX-005` | AJAX Response Text Verification - Validates complete response content |

**Key Features:**
- Uses `page.waitForFunction()` for condition-based waiting (not time-based)
- Measures actual load time (typically 15 seconds for the test page)
- Verifies exact message text: "Data loaded with AJAX get request"
- Multiple selector strategies for resilience

**Test Page:** http://uitestingplayground.com/ajax

---

### Scenario B: Login Form Testing (10 Tests)

**File:** `tests/login.spec.js`

**Purpose:** Test login form interactions with resilient element finding and state verification

| Test Case | Description |
|-----------|-------------|
| `TC-LOGIN-001` | Successful Login - Complete login flow with credential entry |
| `TC-LOGIN-002` | Login with Valid Credentials - Verifies logout button appears |
| `TC-LOGIN-003` | Invalid Credentials Display Error - Tests error handling |
| `TC-LOGIN-004` | Login Button Exists on Page Load - Verifies button visibility |
| `TC-LOGIN-005` | Password Field Accepts Input - Tests password entry |
| `TC-LOGIN-006` | Username and Password Fields Are Distinct - Verifies field separation |
| `TC-LOGIN-007` | Clear Fields Functionality - Tests field clearing |
| `TC-LOGIN-008` | Logout Returns to Login Form - Verifies logout flow |
| `TC-LOGIN-009` | Multiple Login Attempts - Tests repeated login/logout cycles |
| `TC-LOGIN-010` | Login Session Persistence - Verifies session handling |

**Key Features:**
- Multi-selector fallback strategy (tries 5-6 different selectors per element)
- **MEANINGFUL ASSERTIONS**: Enters credential and verifies value was actually entered
- Handles both visible and hidden form states
- Tests complete login/logout cycle

**Test Page:** http://uitestingplayground.com/sampleapp

**Test Credentials:**
- Username: `paulaperalta`
- Password: `pwd123`

---

### Scenario C: Dynamic Elements & Overlapped UI (13 Tests)

**File:** `tests/dynamic-elements.spec.js`

**Purpose:** Test resilient element interaction with dynamic IDs and hidden/overlapped elements

| Test Case | Description |
|-----------|-------------|
| `TC-DYNAMIC-001` | Dynamic Button ID Changes on Reload - Verifies ID changes each reload |
| `TC-DYNAMIC-002` | Click Dynamic Button Regardless of ID - Tests tag-based selector |
| `TC-DYNAMIC-003` | Multiple Reloads and Clicks - Repeated click-reload cycles |
| `TC-DYNAMIC-004` | Resilient Selector Without ID Dependency - Validates selector strategy |
| `TC-DYNAMIC-005` | Name Input Field Location and Content - Finds overlapped input |
| `TC-DYNAMIC-006` | Enter Text in Overlapped Field - Tests forced click on hidden element |
| `TC-DYNAMIC-007` | Overlapped Element Visibility Check - Bounding box validation |
| `TC-DYNAMIC-008` | Forced Click on Hidden/Overlapped Element - Tests force click |
| `TC-DYNAMIC-009` | Clear and Re-enter Name Field Multiple Times - Repeated entry cycles |
| `TC-DYNAMIC-010` | Focus and Blur Field Interactions - Tests field focus/blur |
| `TC-DYNAMIC-011` | Accessibility Tree Includes Name Input - Validates accessibility |
| `TC-DYNAMIC-012` | Dynamic Page Elements Resilience - Multi-reload validation |
| `TC-DYNAMIC-013` | Verify Input Type and Attributes - Validates input properties |

**Key Features:**
- **ID-Independent Selectors**: Uses tag selectors (`button`, `input`) not IDs
- **Bounding Box Validation**: Verifies elements are truly visible, not just DOM-present
- **Forced Clicks**: Handles overlapped/hidden elements with `click({force: true})`
- **Scroll Management**: Uses `scrollIntoViewIfNeeded()` for partially hidden elements

**Test Pages:**
- Dynamic ID: http://uitestingplayground.com/dynamicid
- Overlapped Elements: http://uitestingplayground.com/overlapped

---

## Page Object Model Details

### AjaxPage.js

```javascript
const ajaxPage = new AjaxPage(page);

// Navigate to AJAX test page
await ajaxPage.navigate();

// Click the AJAX trigger button
await ajaxPage.clickAjaxButton();

// Wait for data to load with condition (not hardcoded timeout)
const loadTime = await ajaxPage.waitForDataToLoad();

// Get the response message text
const message = await ajaxPage.getResponseLabelText();

// Verify success state
const isSuccess = await ajaxPage.verifySuccessMessage();
```

**Key Methods:**
- `navigate()` - Opens the AJAX test page
- `clickAjaxButton()` - Clicks the button that triggers AJAX request
- `waitForDataToLoad(timeout)` - **Condition-based waiting** for text "Data loaded with AJAX get request"
- `getResponseLabelText()` - Returns the response message
- `verifySuccessMessage()` - Returns true if success text is present
- `waitForLoadingComplete()` - Waits for loading indicators to vanish

---

### LoginPage.js

```javascript
const loginPage = new LoginPage(page);

// Navigate to login page
await loginPage.navigate();

// Enter credentials (verifies text was entered)
await loginPage.enterUsername('paulaperalta');
await loginPage.enterPassword('pwd123');

// Submit login form
await loginPage.clickLoginButton();

// Wait for login to complete
await loginPage.waitForLoginCompletion();

// Verify logged in state
const isLoggedIn = await loginPage.isLoggedIn();

// Logout
await loginPage.clickLogoutButton();
```

**Key Methods:**
- `navigate()` - Opens the login page
- `enterUsername(text)` - Enters username and **verifies it was entered**
- `enterPassword(text)` - Enters password and **verifies length**
- `clickLoginButton()` - Clicks the Log In button
- `clickLogoutButton()` - Clicks the Log Out button
- `waitForLoginCompletion()` - Waits for "Log Out" button to appear
- `isLoggedIn()` - Returns true if Log Out button is visible
- `waitForErrorMessage(timeout)` - Waits for error message to appear
- `findElement(selectorArray)` - Finds element using multiple selector strategies

**Selector Fallback Strategy:**
| Element | Primary | Fallback 1 | Fallback 2 | Fallback 3 | Fallback 4 |
|---------|---------|-----------|-----------|-----------|-----------|
| Username | ID:username | name:username | placeholder | type:text | nth input |
| Password | ID:password | type:password | name:password | placeholder | nth hidden input |
| Login Button | text:"Log In" | ID:login | submit type | button:nth-of-type | data-test attribute |

---

### DynamicElementsPage.js

```javascript
const dynamicPage = new DynamicElementsPage(page);

// Navigate to dynamic ID test page
await dynamicPage.navigateToDynamicId();

// Get the dynamic button ID (changes on each reload)
const buttonId = await dynamicPage.getDynamicButtonId();

// Click button - selector works despite ID changes
await dynamicPage.clickDynamicButton();

// Navigate to overlapped elements page
await dynamicPage.navigateToOverlapped();

// Find the overlapped name input (multiple selector fallback)
const input = await dynamicPage.findNameInputField();

// Scroll into view if needed
await dynamicPage.scrollNameInputIntoView();

// Enter text with forced click (for overlapped elements)
await dynamicPage.enterNameInOverlappedField('John Doe');

// Verify text was entered
const value = await dynamicPage.getNameInputValue();
```

**Key Methods:**
- `navigateToDynamicId()` - Opens dynamic ID test page
- `navigateToOverlapped()` - Opens overlapped elements test page
- `getDynamicButtonId()` - Returns the current button ID
- `clickDynamicButton()` - **Uses tag selector (`button.first()`) not ID** - survives ID changes
- `findNameInputField()` - Finds input with multiple fallback selectors
- `scrollNameInputIntoView()` - Uses `scrollIntoViewIfNeeded()`
- `enterNameInOverlappedField(text)` - Uses `click({force: true})` for overlapped elements
- `getNameInputValue()` - Returns input value
- `isNameFieldFullyVisible()` - **Bounding box validation** (not just `isVisible()`)
- `waitForNameFieldAccessible()` - Condition-based loop waiting
- `focusNameField()` / `blurNameField()` - Focus management

**Resilience Strategies:**
1. **Tag-Based Selectors**: `page.locator('button')` instead of ID-based
2. **Bounding Box Validation**: Ensures element is in viewport, not just DOM-present
3. **Forced Clicks**: For hidden/overlapped elements with `click({force: true})`
4. **Scroll Management**: `scrollIntoViewIfNeeded()` before user interaction

---

## Waiting Strategies Explained

### ❌ BAD: Hardcoded Sleep
```javascript
await page.waitForTimeout(5000); // Arbitrary - prone to flakiness
```

### ✅ GOOD: Condition-Based Waiting (Used in This Suite)
```javascript
// AjaxPage: Wait for specific text to appear
await page.waitForFunction(
  () => document.body.innerText.includes('Data loaded with AJAX get request'),
  { timeout: 20000 }
);

// LoginPage: Wait for state change
await page.waitForSelector('button:has-text("Log Out")', { timeout: 10000 });

// DynamicElementsPage: Loop-based condition checking
await page.waitForFunction(
  () => {
    const box = document.querySelector('input').getBoundingClientRect();
    return box.y >= 0 && box.y < window.innerHeight;
  }
);
```

---

## Assertion Patterns

### ❌ BAD: Checking for No Errors
```javascript
const errors = await page.$$('.error');
expect(errors.length).toBe(0); // Doesn't verify correct behavior
```

### ✅ GOOD: Meaningful Assertions (Used in This Suite)
```javascript
// Verify value was actually entered
const username = await page.evaluate(() => {
  return document.querySelector('input[type="text"]').value;
});
expect(username).toBe('paulaperalta');

// Verify state changed
const logoutButton = await page.locator('button:has-text("Log Out")').isVisible();
expect(logoutButton).toBe(true);

// Verify exact content
expect(responseText).toContain('Data loaded with AJAX get request');
```

---

## Configuration Details

### playwright.config.js

**Key Settings:**
- **Timeout**: 60 seconds per test
- **Retries**: 2 retries in CI, 0 in local
- **Browsers**: Chrome, Firefox, Safari (all versions tested)
- **Screenshots & Videos**: Only on failure (reduces storage)
- **Trace**: Recorded on first retry for debugging
- **Base URL**: http://uitestingplayground.com

### Test Outputs
- **HTML Report**: `playwright-report/`
- **JSON Results**: `test-results/results.json`
- **JUnit XML**: `test-results/junit.xml`
- **Videos/Screenshots**: `test-results/`

---

## Troubleshooting

### Test Timeouts
**Problem:** Tests timeout waiting for elements

**Solutions:**
1. Check if selectors are valid: `npx playwright codegen http://uitestingplayground.com`
2. Verify internet connection (tests require external website access)
3. Increase timeout: `{ timeout: 30000 }` in page object methods

### Flaky Tests
**Problem:** Tests pass sometimes, fail other times

**Solutions:**
1. Ensure using explicit waits, not `waitForTimeout()`
2. Use condition-based waiting: `page.waitForFunction()` or `locator.waitFor()`
3. Verify selectors are resilient to DOM changes
4. Check for forced waits: `await page.waitForTimeout()` and replace with conditions

### Dynamic ID Issues
**Problem:** Tests fail because element IDs changed

**Solutions:**
1. Use tag selectors: `page.locator('button')` not `#buttonId`
2. Combine with other attributes: `page.locator('button:has-text("Click")')`
3. Use nth-child: `page.locator('button').first()`
4. Our DynamicElementsPage already handles this!

### Overlapped Element Issues
**Problem:** Cannot click element (hidden by overlay)

**Solutions:**
1. Use `click({force: true})` - our DynamicElementsPage does this
2. Scroll into view: `await element.scrollIntoViewIfNeeded()`
3. Check visibility: `await element.isVisible()` and `boundingBox()`
4. Wait for overlay to disappear: `await page.waitForSelector('.overlay', { state: 'hidden' })`

---

## Best Practices

### 1. Always Use Page Objects
```javascript
// ❌ Don't do this in test
await page.click('#username');
await page.fill('#username', 'test');

// ✅ Do this instead
const loginPage = new LoginPage(page);
await loginPage.enterUsername('test');
```

### 2. Use Meaningful Assertions
```javascript
// ❌ Just checking no errors
expect(await page.$$('.error')).toHaveLength(0);

// ✅ Verify actual behavior
const username = await loginPage.getUsername();
expect(username).toBe('paulaperalta');
```

### 3. Use Explicit Waits
```javascript
// ❌ Hardcoded wait
await page.waitForTimeout(5000);

// ✅ Condition-based wait
await page.waitForFunction(
  () => document.querySelector('.success-message') !== null
);
```

### 4. Document Complex Selectors
```javascript
// ✅ Explain why this selector works across UI changes
// Uses tag selector, not ID, because ID changes on page reload
// Locates first button element, which is the interactive button
const button = page.locator('button').first();
```

---

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Playwright Tests
  run: |
    npm ci
    npx playwright install
    npm test

- name: Upload Test Report
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

### Jenkins Pipeline
```groovy
stage('Test') {
  steps {
    sh 'npm ci'
    sh 'npx playwright install'
    sh 'npm test'
  }
}
```

---

## Test Report Interpretation

### Success Output
```
✓ 28 passed (8.2s)
```

All tests passed successfully!

### Failure Output
```
✗ 1 failed
  1) Login Form Testing > TC-LOGIN-001: Successful Login
```

Click the HTML report link to view detailed failure information:
```bash
npm run report
```

---

## Performance Metrics

**Expected Test Execution Times:**
- AJAX Tests (5 tests): ~75 seconds (15s wait × 5 tests)
- Login Tests (10 tests): ~20 seconds
- Dynamic Tests (13 tests): ~30 seconds
- **Total Runtime**: ~125 seconds (2+ minutes) in sequential mode

**Parallelization:**
- Default: Sequential (all 28 tests run one after another)
- Parallel: 3 workers × ~42 seconds = ~14 seconds total

---

## FAQ

**Q: Why do AJAX tests take so long?**  
A: The test page has a 15-second server delay. Tests measure actual wait time rather than using arbitrary timeouts.

**Q: Can tests run in parallel?**  
A: Yes! Set `fullyParallel: true` in `playwright.config.js`. Tests will run across multiple workers.

**Q: How do I debug a failing test?**  
A: Run `npm run test:debug` to pause at breakpoints. Or use `npm run test:ui` for visual debugging.

**Q: Do I need to install browsers?**  
A: `npm install` should handle it. If not: `npx playwright install`

**Q: Can I run tests against my own website?**  
A: Yes! Update the Base URL in `playwright.config.js` and adjust selectors in page objects.

---

## Contact & Support

For issues or questions about this test suite:
1. Check the Playwright documentation: https://playwright.dev
2. Review the page object implementations in `pages/`
3. Check test failure details in HTML report: `npm run report`

---

## Summary

This comprehensive test suite demonstrates enterprise-grade QA automation:

✅ **Architectural Excellence**: Page Object Model for maintainability  
✅ **Reliability**: Explicit condition-based waiting eliminates flakiness  
✅ **Resilience**: Selectors work across multiple runs with dynamic UI changes  
✅ **Meaningful Validation**: Tests verify actual behavior, not just "no errors"  
✅ **Comprehensive Coverage**: 28 test cases across 3 critical scenarios  

**Ready to execute powerful, reliable, maintainable automation tests!** 🚀
