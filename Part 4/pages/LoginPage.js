/**
 * Sample App Page Object Model
 * Encapsulates interactions with the UITestingPlayground Sample App login page
 * URL: http://uitestingplayground.com/sampleapp
 */
class SampleAppPage {
  constructor(page) {
    this.page = page;
    this.url = 'http://uitestingplayground.com/sampleapp';
    
    // Primary selectors based on actual page structure
    this.usernameInputSelector = 'input[placeholder="User name"]';
    this.passwordInputSelector = 'input[placeholder="Password"]';
    this.loginButtonSelector = 'button[id="login"]';
    this.logoutButtonSelector = 'button[id="logout"]';
    this.successMessageSelector = '#loggedInAs';
    this.pageTitleSelector = 'h1';
    
    // Fallback selectors for resilience
    this.usernameInputFallbacks = [
      'input[placeholder="User name"]',
      'input[type="text"]:first-of-type',
      'input:nth-of-type(1)',
      'input'
    ];
    
    this.passwordInputFallbacks = [
      'input[placeholder="Password"]',
      'input[type="password"]',
      'input:nth-of-type(2)'
    ];
    
    this.loginButtonFallbacks = [
      'button[id="login"]',
      'button:has-text("Log In")',
      'button:first-of-type'
    ];
    
    this.logoutButtonFallbacks = [
      'button[id="logout"]',
      'button:has-text("Log Out")'
    ];
  }

  /**
   * Navigate to the Sample App page
   */
  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Find element using primary selector and fallbacks
   */
  async findElement(selectors) {
    for (const selector of selectors) {
      try {
        const element = this.page.locator(selector).first();
        await element.waitFor({ state: 'visible', timeout: 2000 });
        return element;
      } catch (error) {
        // Try next selector
        continue;
      }
    }
    throw new Error(`Could not find element with selectors: ${selectors.join(', ')}`);
  }

  /**
   * Get the username input field
   */
  async getUsernameInput() {
    return this.findElement(this.usernameInputFallbacks);
  }

  /**
   * Get the password input field
   */
  async getPasswordInput() {
    return this.findElement(this.passwordInputFallbacks);
  }

  /**
   * Get the login button
   */
  async getLoginButton() {
    return this.findElement(this.loginButtonFallbacks);
  }

  /**
   * Get the logout button
   */
  async getLogoutButton() {
    return this.findElement(this.logoutButtonFallbacks);
  }

  /**
   * Enter username
   * @param {string} username - The username to enter
   */
  async enterUsername(username) {
    const input = await this.getUsernameInput();
    await input.clear();
    await input.fill(username);
    
    // Verify the value was entered
    const value = await input.inputValue();
    if (value !== username) {
      throw new Error(`Failed to enter username. Expected: "${username}", Got: "${value}"`);
    }
  }

  /**
   * Enter password
   * @param {string} password - The password to enter
   */
  async enterPassword(password) {
    const input = await this.getPasswordInput();
    await input.clear();
    await input.fill(password);
    
    // Verify length (cannot read password value for security)
    const value = await input.inputValue();
    if (value.length !== password.length) {
      throw new Error(`Failed to enter password. Expected length: ${password.length}, Got: ${value.length}`);
    }
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    const button = await this.getLoginButton();
    await button.click();
  }

  /**
   * Click the logout button
   */
  async clickLogoutButton() {
    const button = await this.getLogoutButton();
    await button.click();
  }

  /**
   * Get the login button text
   */
  async getLoginButtonText() {
    const button = await this.getLoginButton();
    return await button.textContent();
  }

  /**
   * Get the logout button text
   */
  async getLogoutButtonText() {
    const button = await this.getLogoutButton();
    return await button.textContent();
  }

  /**
   * Check if currently logged in (button shows "Log Out")
   */
  async isLoggedIn() {
    try {
      const logoutBtn = await this.page.locator(this.logoutButtonSelector).first();
      return await logoutBtn.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Get the success message (contains username after login)
   */
  async getSuccessMessage() {
    try {
      const message = await this.page.locator(this.successMessageSelector).first();
      await message.waitFor({ state: 'visible', timeout: 5000 });
      return await message.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Wait for login to complete
   */
  async waitForLoginCompletion(timeout = 10000) {
    try {
      await this.page.waitForSelector(this.logoutButtonSelector, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for error message
   */
  async waitForErrorMessage(timeout = 5000) {
    // Common error message selectors
    const errorSelectors = [
      '[class*="error"]',
      '[class*="alert"]',
      '[role="alert"]',
      'p:has-text("error")',
      'span:has-text("error")'
    ];
    
    for (const selector of errorSelectors) {
      try {
        await this.page.waitForSelector(selector, { timeout: timeout / errorSelectors.length });
        return await this.page.textContent(selector);
      } catch {
        continue;
      }
    }
    
    throw new Error('No error message found within timeout');
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible() {
    try {
      const button = await this.getLoginButton();
      return await button.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if username field is visible
   */
  async isUsernameFieldVisible() {
    try {
      const input = await this.getUsernameInput();
      return await input.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Check if password field is visible
   */
  async isPasswordFieldVisible() {
    try {
      const input = await this.getPasswordInput();
      return await input.isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  /**
   * Get the current page title
   */
  async getPageTitle() {
    try {
      return await this.page.title();
    } catch {
      return null;
    }
  }

  /**
   * Get page heading
   */
  async getPageHeading() {
    try {
      const heading = await this.page.locator(this.pageTitleSelector).first();
      return await heading.textContent();
    } catch {
      return null;
    }
  }

  /**
   * Clear all form fields
   */
  async clearAllFields() {
    try {
      const username = await this.getUsernameInput();
      await username.clear();
    } catch {
      // Username field might not exist
    }
    
    try {
      const password = await this.getPasswordInput();
      await password.clear();
    } catch {
      // Password field might not exist
    }
  }

  /**
   * Login with username and password
   * @param {string} username - The username
   * @param {string} password - The password
   */
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify if username appears in success message
   * @param {string} username - The username to verify
   */
  async verifyUsernameInSuccessMessage(username) {
    const message = await this.getSuccessMessage();
    if (message) {
      return message.includes(username);
    }
    
    // Fallback: check page content
    const pageContent = await this.page.textContent('body');
    return pageContent.includes(username);
  }

  /**
   * Get all text content on the page
   */
  async getPageContent() {
    return await this.page.textContent('body');
  }

  /**
   * Check if specific text is visible on the page
   */
  async isTextVisible(text) {
    const content = await this.getPageContent();
    return content.includes(text);
  }

  /**
   * Focus on username field
   */
  async focusUsernameField() {
    const input = await this.getUsernameInput();
    await input.focus();
  }

  /**
   * Focus on password field
   */
  async focusPasswordField() {
    const input = await this.getPasswordInput();
    await input.focus();
  }

  /**
   * Get username field value
   */
  async getUsernameValue() {
    const input = await this.getUsernameInput();
    return await input.inputValue();
  }

  /**
   * Get password field value length (for verification)
   */
  async getPasswordValueLength() {
    const input = await this.getPasswordInput();
    const value = await input.inputValue();
    return value.length;
  }

  /**
   * Press Tab key to move focus
   */
  async pressTab() {
    await this.page.keyboard.press('Tab');
  }

  /**
   * Press Enter key (to submit form)
   */
  async pressEnter() {
    await this.page.keyboard.press('Enter');
  }

  /**
   * Get element bounding box for visibility checks
   */
  async getElementBoundingBox(selector) {
    return await this.page.locator(selector).first().boundingBox();
  }

  /**
   * Verify element is fully visible in viewport
   */
  async isElementFullyVisible(selector) {
    const box = await this.getElementBoundingBox(selector);
    if (!box) return false;
    
    const viewport = this.page.viewportSize();
    return box.y >= 0 && 
           (box.y + box.height) <= viewport.height &&
           box.x >= 0 &&
           (box.x + box.width) <= viewport.width;
  }

  /**
   * Scroll element into view
   */
  async scrollElementIntoView(selector) {
    await this.page.locator(selector).first().scrollIntoViewIfNeeded();
  }

  /**
   * Wait for element to be in DOM
   */
  async waitForElement(selector, timeout = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  /**
   * Get the current URL
   */
  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = SampleAppPage;
