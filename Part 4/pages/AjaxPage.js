/**
 * AJAX Page Object Model
 * Encapsulates all interactions with the AJAX test page
 */
class AjaxPage {
  constructor(page) {
    this.page = page;
    this.url = 'http://uitestingplayground.com/ajax';
    // Resilient selectors for finding the AJAX button
    this.ajaxButtonSelectors = [
      'button:has-text("Button Triggering AJAX Request")',
      'button:has-text("AJAX")',
      'button[id*="ajax"]',
      'button[class*="ajax"]',
      '#ajaxButton', // Fallback to direct ID if exists
      'button >> text=Button',
      'button'  // Last resort: just any button
    ];
  }

  /**
   * Navigate to the AJAX page
   * @returns {Promise<void>}
   */
  async navigate() {
    await this.page.goto(this.url, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  }

  /**
   * Click the AJAX trigger button with resilient selector strategy
   * @returns {Promise<void>}
   */
  async clickAjaxButton() {
    let buttonFound = false;
    
    for (const selector of this.ajaxButtonSelectors) {
      try {
        const locator = this.page.locator(selector);
        const count = await locator.count();
        if (count > 0) {
          await locator.first().click({ timeout: 10000 });
          buttonFound = true;
          break;
        }
      } catch (error) {
        // Try next selector
        continue;
      }
    }

    if (!buttonFound) {
      throw new Error('Could not find AJAX button with any selector strategy');
    }
  }

  /**
   * Wait for AJAX data to load with explicit condition
   * @param {number} maxWaitTime - Maximum time to wait in milliseconds
   * @returns {Promise<number>} - Time taken for data to load
   */
  async waitForDataToLoad(maxWaitTime = 20000) {
    const startTime = Date.now();
    
    // Wait for the success message to appear in the page
    // This is condition-based, not time-based
    try {
      await this.page.waitForFunction(
        () => {
          const bodyText = document.body.innerText;
          return bodyText.includes('Data loaded with AJAX get request');
        },
        { timeout: maxWaitTime }
      );
    } catch (error) {
      throw new Error(`AJAX data did not load within ${maxWaitTime}ms: ${error.message}`);
    }

    const loadTime = Date.now() - startTime;
    return loadTime;
  }

  /**
   * Get the label text that contains the AJAX response
   * @returns {Promise<string>} - The text content of the response label
   */
  async getResponseLabelText() {
    // Wait for the AJAX response to be in the DOM (we already verified this in waitForDataToLoad)
    // Get text from body and extract the relevant part
    await this.page.waitForTimeout(1000); // Brief wait to ensure DOM is updated
    
    const bodyText = await this.page.textContent('body');
    return bodyText.trim();
  }

  /**
   * Verify that the response message is correct
   * @returns {Promise<boolean>}
   */
  async verifySuccessMessage() {
    const text = await this.getResponseLabelText();
    return text.includes('Data loaded with AJAX get request');
  }

  /**
   * Check if loading indicator is present
   * @returns {Promise<boolean>}
   */
  async isLoadingIndicatorPresent() {
    const loadingElements = await this.page.$$('[class*="loading"], [id*="loading"], .spinner');
    return loadingElements.length > 0;
  }

  /**
   * Wait for loading indicator to disappear
   * @param {number} timeout - Maximum time to wait
   * @returns {Promise<void>}
   */
  async waitForLoadingComplete(timeout = 20000) {
    await this.page.waitForFunction(
      () => {
        const loadingElements = document.querySelectorAll('[class*="loading"], [id*="loading"], .spinner');
        return loadingElements.length === 0;
      },
      { timeout }
    );
  }

  /**
   * Get the console error count (for verification)
   * @returns {Promise<number>}
   */
  async getConsoleErrorCount() {
    const errors = await this.page.evaluate(() => {
      return window.console.errors ? window.console.errors.length : 0;
    });
    return errors;
  }
}

module.exports = AjaxPage;
