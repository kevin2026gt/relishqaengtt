/**
 * Dynamic Elements Page Object Model
 * Encapsulates interactions with pages containing dynamic IDs and overlapped elements
 */
class DynamicElementsPage {
  constructor(page) {
    this.page = page;
    this.dynamicIdUrl = 'http://uitestingplayground.com/dynamicid';
    this.overlappedUrl = 'http://uitestingplayground.com/overlapped';
  }

  /**
   * Navigate to the Dynamic ID page
   * @returns {Promise<void>}
   */
  async navigateToDynamicId() {
    await this.page.goto(this.dynamicIdUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  }

  /**
   * Navigate to the Overlapped Elements page
   * @returns {Promise<void>}
   */
  async navigateToOverlapped() {
    await this.page.goto(this.overlappedUrl, { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
  }

  /**
   * Get the current button ID (for verification that it's dynamic)
   * Uses resilient selectors that don't depend on ID
   * @returns {Promise<string>} - The button's ID attribute
   */
  async getDynamicButtonId() {
    // Use button locator that doesn't depend on ID
    const button = this.page.locator('button').first();
    const buttonId = await button.getAttribute('id');
    return buttonId;
  }

  /**
   * Click the dynamic button using resilient selector
   * This selector strategy doesn't depend on the changing ID
   * @returns {Promise<void>}
   */
  async clickDynamicButton() {
    // Use tag selector instead of ID - works regardless of ID changes
    const button = this.page.locator('button').first();
    
    // Wait for button to be ready (not just present, but interactive)
    await button.waitFor({ state: 'visible', timeout: 5000 });
    await button.isEnabled({ timeout: 5000 });
    
    // Click the button
    await button.click({ timeout: 5000 });
  }

  /**
   * Verify button exists and is clickable
   * @returns {Promise<boolean>}
   */
  async isDynamicButtonPresent() {
    try {
      const button = this.page.locator('button').first();
      return await button.isVisible({ timeout: 5000 });
    } catch (error) {
      return false;
    }
  }

  /**
   * Find the Name input field using resilient selectors
   * @returns {Promise<Locator>} - The name input locator
   */
  async findNameInputField() {
    const selectors = [
      'input[id*="name"]',
      'input[name*="name"]',
      'input[placeholder*="name"]',
      'input[type="text"]',
      'input:first-of-type'
    ];

    for (const selector of selectors) {
      try {
        const input = this.page.locator(selector);
        const isVisible = await input.isVisible({ timeout: 2000 }).catch(() => false);
        if (isVisible) {
          return input;
        }
      } catch (error) {
        continue;
      }
    }
    throw new Error('Could not find Name input field');
  }

  /**
   * Scroll the Name input field into view
   * Uses Playwright's built-in scroll handling which is resilient
   * @returns {Promise<void>}
   */
  async scrollNameInputIntoView() {
    const nameInput = await this.findNameInputField();
    
    // Wait for the element to be in the viewport
    await nameInput.scrollIntoViewIfNeeded();
    
    // Additional wait to ensure it's fully visible
    await this.page.waitForTimeout(500);
  }

  /**
   * Enter name in the overlapped input field
   * @param {string} name - Name to enter
   * @returns {Promise<void>}
   */
  async enterNameInOverlappedField(name) {
    const nameInput = await this.findNameInputField();
    
    // Ensure field is scrolled into view
    await nameInput.scrollIntoViewIfNeeded();
    
    // Click to focus the field
    await nameInput.click({ force: true });
    
    // Clear any existing content
    await nameInput.fill('');
    
    // Enter the name
    await nameInput.fill(name);
    
    // Verify the text was entered correctly
    const enteredValue = await nameInput.inputValue();
    if (enteredValue !== name) {
      throw new Error(`Failed to enter name. Expected: "${name}", Got: "${enteredValue}"`);
    }
  }

  /**
   * Get the value of the Name input field
   * @returns {Promise<string>} - The input field value
   */
  async getNameInputValue() {
    const nameInput = await this.findNameInputField();
    return await nameInput.inputValue();
  }

  /**
   * Verify that the Name field is fully visible and not overlapped
   * @returns {Promise<boolean>}
   */
  async isNameFieldFullyVisible() {
    const nameInput = await this.findNameInputField();
    
    // Get bounding box to verify visibility
    const boundingBox = await nameInput.boundingBox();
    
    if (!boundingBox) {
      return false;
    }

    // Check if the field is within the viewport
    const isInViewport = await this.page.evaluate(
      (box) => {
        return box.y >= 0 && box.x >= 0 && 
               box.y + box.height <= window.innerHeight &&
               box.x + box.width <= window.innerWidth;
      },
      boundingBox
    );

    return isInViewport;
  }

  /**
   * Wait for the Name field to be fully visible and accessible
   * @param {number} timeout - Maximum time to wait
   * @returns {Promise<void>}
   */
  async waitForNameFieldAccessible(timeout = 10000) {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      try {
        const isVisible = await this.isNameFieldFullyVisible();
        if (isVisible) {
          return;
        }
      } catch (error) {
        // Continue waiting
      }
      await this.page.waitForTimeout(100);
    }
    
    throw new Error('Name field did not become fully accessible within timeout');
  }

  /**
   * Clear the Name field
   * @returns {Promise<void>}
   */
  async clearNameField() {
    const nameInput = await this.findNameInputField();
    await nameInput.fill('');
  }

  /**
   * Focus on the Name field
   * @returns {Promise<void>}
   */
  async focusNameField() {
    const nameInput = await this.findNameInputField();
    await nameInput.focus();
  }

  /**
   * Blur (unfocus) from the Name field
   * @returns {Promise<void>}
   */
  async blurNameField() {
    const nameInput = await this.findNameInputField();
    await nameInput.blur();
  }

  /**
   * Get the current page title
   * @returns {Promise<string>}
   */
  async getPageTitle() {
    return await this.page.title();
  }
}

module.exports = DynamicElementsPage;
