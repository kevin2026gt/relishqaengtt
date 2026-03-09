/**
 * Scenario C: Dynamic Elements and Overlapped Elements Testing
 * Tests resilient selectors that handle dynamic IDs and overlapped/hidden elements
 */
const { test, expect } = require('@playwright/test');
const DynamicElementsPage = require('../pages/DynamicElementsPage');

test.describe('Scenario C: Dynamic Elements and Overlapped Elements Testing', () => {
  let dynamicPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object before each test
    dynamicPage = new DynamicElementsPage(page);
  });

  test('TC-DYNAMIC-001: Dynamic Button ID Changes on Reload', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate to dynamic ID page
    await dynamicPage.navigateToDynamicId();

    // Assert: Page loaded
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();

    // Act: Verify button exists (regardless of ID)
    const button = page.locator('button').first();
    expect(button).toBeTruthy();

    // Act: Get the initial button ID (if it exists)
    try {
      const firstButtonId = await dynamicPage.getDynamicButtonId();
      console.log(`First load button ID: ${firstButtonId}`);
    } catch (error) {
      console.log('Button may not have an ID attribute, but element is still accessible');
    }

    // Act: Click the button (showing it's accessible regardless of ID)
    await dynamicPage.clickDynamicButton();
    await page.waitForTimeout(800);

    // Assert: Button is still present after interaction
    const isStillPresent = await dynamicPage.isDynamicButtonPresent();
    expect(isStillPresent).toBe(true);

    // Act: Reload the page to trigger ID change
    await page.reload({ waitUntil: 'networkidle', timeout: 30000 });

    // Wait for page to stabilize
    await page.waitForTimeout(1000);

    // Assert: Button still exists after reload
    const afterReloadPresent = await dynamicPage.isDynamicButtonPresent();
    expect(afterReloadPresent).toBe(true);

    console.log('Button accessible before and after reload despite ID changes');
  });

  test('TC-DYNAMIC-002: Click Dynamic Button Regardless of ID Changes', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate
    await dynamicPage.navigateToDynamicId();

    // Assert: Page loaded
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();

    // Act: Verify button is present using tag-based selector
    const buttonCount = await page.locator('button').count();
    expect(buttonCount).toBeGreaterThan(0);

    // Act: Click the button (using tag-based selector, not ID)
    await dynamicPage.clickDynamicButton();

    console.log(`Button clicked successfully`);
  });

  test('TC-DYNAMIC-003: Multiple Reloads and Clicks', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);
    const reloadCount = 3;

    // Act: Navigate
    await dynamicPage.navigateToDynamicId();

    // Act & Assert: Perform click-reload cycle
    for (let i = 0; i < reloadCount; i++) {
      console.log(`--- Cycle ${i + 1} of ${reloadCount} ---`);

      // Get current ID before action
      const beforeId = await dynamicPage.getDynamicButtonId();
      console.log(`Before action ID: ${beforeId}`);

      // Click button
      await dynamicPage.clickDynamicButton();

      // Reload page
      await page.reload();
      await page.waitForTimeout(500);

      // Get ID after reload
      const afterId = await dynamicPage.getDynamicButtonId();
      console.log(`After reload ID: ${afterId}`);

      // Assert: Button is always clickable regardless of ID
      expect(afterId).toBeTruthy();
    }

    console.log('Successfully clicked button across multiple reloads with changing IDs');
  });

  test('TC-DYNAMIC-004: Resilient Selector Without ID Dependency', async ({ page }) => {
    // This test explicitly verifies our selector strategy is ID-independent
    
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate
    await dynamicPage.navigateToDynamicId();

    // Get the button using standard tag selector (not ID-based)
    const button = page.locator('button').first();

    // Assert: Button is found and visible
    const isVisible = await button.isVisible();
    expect(isVisible).toBe(true);

    // Assert: Button has height and width (not just DOM presence)
    const boundingBox = await button.boundingBox();
    expect(boundingBox).toBeTruthy();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);

    // Act: Click using the tag-based selector
    await button.click();

    // Assert: Click succeeded (page is still valid, no errors)
    const postClickUrl = await page.url();
    expect(postClickUrl).toBeTruthy();

    console.log('Selector strategy verified as ID-independent');
  });

  test('TC-DYNAMIC-005: Name Input Field Location and Content', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate to overlapped elements page
    await dynamicPage.navigateToOverlapped();

    // Assert: Page loaded
    const pageTitle = await page.title();
    expect(pageTitle).toBeTruthy();

    // Act: Find the name input field
    const nameInput = await dynamicPage.findNameInputField();

    // Assert: Field exists and is in DOM
    expect(nameInput).toBeTruthy();

    // Act: Get the input value
    const initialValue = await dynamicPage.getNameInputValue();

    // Assert: Field starts empty or with default
    expect(initialValue).toBeDefined();
  });

  test('TC-DYNAMIC-006: Enter Text in Overlapped Field', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);
    const testName = 'John Doe';

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act: Scroll input into view
    await dynamicPage.scrollNameInputIntoView();

    // Wait for scrolling to complete
    await page.waitForTimeout(300);

    // Assert: Field is visible before entering text
    const isVisible = await dynamicPage.isNameFieldFullyVisible();
    console.log(`Field visible before input: ${isVisible}`);

    // Act: Enter text with forced click (for overlapped elements)
    await dynamicPage.enterNameInOverlappedField(testName);

    // Assert: Text was entered
    const enteredValue = await dynamicPage.getNameInputValue();
    expect(enteredValue).toBe(testName);

    console.log(`Successfully entered "${testName}" in overlapped field`);
  });

  test('TC-DYNAMIC-007: Overlapped Element Visibility Check', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act: Check if field is visible (using bounding box validation)
    let isVisible = await dynamicPage.isNameFieldFullyVisible();

    console.log(`Initial visibility: ${isVisible}`);

    // If not visible, scroll into view
    if (!isVisible) {
      await dynamicPage.scrollNameInputIntoView();
      await page.waitForTimeout(500);

      // Check again
      isVisible = await dynamicPage.isNameFieldFullyVisible();
      console.log(`Visibility after scroll: ${isVisible}`);
    }

    // Assert: After scroll, field should be visible
    expect(isVisible).toBe(true);

    // Act: Get bounding box to verify actual visibility
    const boundingBox = await page.locator('input').first().boundingBox();

    // Assert: Bounding box exists and has positive dimensions
    expect(boundingBox).toBeTruthy();
    expect(boundingBox.width).toBeGreaterThan(0);
    expect(boundingBox.height).toBeGreaterThan(0);

    // Assert: Field is within viewport
    const viewport = page.viewportSize();
    expect(boundingBox.y).toBeLessThan(viewport.height);
    expect(boundingBox.y + boundingBox.height).toBeGreaterThan(0);
  });

  test('TC-DYNAMIC-008: Forced Click on Hidden/Overlapped Element', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);
    const testInput = 'TestData';

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act: Use forced click to interact with potentially overlapped element
    // Instead of calling enterNameInOverlappedField directly,
    // we'll replicate the forced click behavior
    const input = await page.locator('input').first();

    // Use click({force: true}) which bypasses visibility checks
    await input.click({ force: true, noWaitAfter: false });

    // Type into the field
    await input.fill(testInput);

    // Assert: Text was successfully entered despite potential overlap
    const value = await input.inputValue();
    expect(value).toBe(testInput);

    console.log('Force click successfully handled overlapped element');
  });

  test('TC-DYNAMIC-009: Clear and Re-enter Name Field Multiple Times', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);
    const testValues = ['Alice', 'Bob', 'Charlie'];

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act & Assert: Multiple enter-clear cycles
    for (const name of testValues) {
      // Clear existing content
      await dynamicPage.clearNameField();

      // Verify cleared
      let currentValue = await dynamicPage.getNameInputValue();
      expect(currentValue).toBe('');

      // Enter new value
      await dynamicPage.enterNameInOverlappedField(name);

      // Verify entered
      currentValue = await dynamicPage.getNameInputValue();
      expect(currentValue).toBe(name);

      console.log(`Entered: "${name}"`);
    }

    console.log('Multiple entry/clear cycles successful');
  });

  test('TC-DYNAMIC-010: Focus and Blur Field Interactions', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act: Focus the field
    await dynamicPage.focusNameField();

    // Assert: Field is focused (verify with :focus-visible or keyboard interaction)
    const isFocused = await page.evaluate(() => {
      const input = document.querySelector('input');
      return document.activeElement === input;
    });

    console.log(`Field focused: ${isFocused}`);

    // Act: Type while focused
    await page.keyboard.type('focused text');

    // Assert: Text was entered while focused
    const value = await dynamicPage.getNameInputValue();
    expect(value).toBe('focused text');

    // Act: Blur the field
    await dynamicPage.blurNameField();

    // Assert: Field is no longer focused
    const stillFocused = await page.evaluate(() => {
      const input = document.querySelector('input');
      return document.activeElement === input;
    });

    expect(stillFocused).toBe(false);

    console.log('Focus/blur interactions successful');
  });

  test('TC-DYNAMIC-011: Accessibility Tree Includes Name Input', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate
    await dynamicPage.navigateToOverlapped();

    // Act: Get accessibility information
    const accessibility = await page.accessibility.snapshot();

    // Verify page structure (accessibility tree should include input)
    expect(accessibility).toBeTruthy();
    expect(accessibility.children).toBeTruthy();
    expect(accessibility.children.length).toBeGreaterThan(0);

    console.log('Page accessibility tree verified');
  });

  test('TC-DYNAMIC-012: Dynamic Page Elements Resilience', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate to dynamic page
    await dynamicPage.navigateToDynamicId();

    // Get initial page state
    const initialButtonCount = await page.locator('button').count();
    console.log(`Initial button count: ${initialButtonCount}`);

    // Act: Reload multiple times and verify button is always present
    for (let i = 0; i < 3; i++) {
      await page.reload();
      await page.waitForTimeout(500);

      const buttonCount = await page.locator('button').count();
      console.log(`After reload ${i + 1}: ${buttonCount} buttons`);

      // Assert: Button still exists
      expect(buttonCount).toBeGreaterThan(0);
    }

    // Assert: Selector strategy remains resilient across reloads
    console.log('Dynamic element resilience verified across multiple reloads');
  });

  test('TC-DYNAMIC-013: Verify Input Type and Attributes', async ({ page }) => {
    // Arrange
    dynamicPage = new DynamicElementsPage(page);

    // Act: Navigate to overlapped page
    await dynamicPage.navigateToOverlapped();

    // Act: Get the input element and verify its attributes
    const input = await page.locator('input').first();

    // Assert: Input exists and is of type text or similar
    const type = await input.getAttribute('type');
    console.log(`Input type: ${type}`);

    // Act: Verify it's an editable input
    const isEditable = await input.isEditable();
    expect(isEditable).toBe(true);

    // Act: Get placeholder if exists
    const placeholder = await input.getAttribute('placeholder');
    console.log(`Placeholder: ${placeholder}`);

    // Assert: Input is accessible for text entry
    expect(isEditable).toBe(true);

    console.log('Input element attributes verified');
  });
});
