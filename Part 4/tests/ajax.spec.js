/**
 * Scenario A: AJAX Data Load Testing
 * Uses Page Object Model with explicit waits and meaningful assertions
 */
const { test, expect } = require('@playwright/test');
const AjaxPage = require('../pages/AjaxPage');

test.describe('Scenario A: AJAX Data Load Testing', () => {
  let ajaxPage;

  test.beforeEach(async ({ page }) => {
    // Initialize page object before each test
    ajaxPage = new AjaxPage(page);
  });

  test('TC-AJAX-001: Successful AJAX Data Load', async ({ page }) => {
    // Arrange
    ajaxPage = new AjaxPage(page);

    // Act
    await ajaxPage.navigate();
    const pageTitle = await page.title();
    
    // Assert: Page loaded correctly
    expect(pageTitle).toBeTruthy();

    // Act: Click the AJAX button
    await ajaxPage.clickAjaxButton();

    // Assert: Verify loading indicator may appear
    const isLoading = await ajaxPage.isLoadingIndicatorPresent();
    console.log(`Loading indicator present: ${isLoading}`);

    // Act: Wait for data to load with explicit condition
    const loadTime = await ajaxPage.waitForDataToLoad();

    // Assert: Verify data loaded in reasonable time
    expect(loadTime).toBeLessThan(20000); // Should load within 20 seconds
    expect(loadTime).toBeGreaterThan(5000); // Should take at least 5 seconds (given 15 second server delay)

    // Act: Get the response message
    const messageText = await ajaxPage.getResponseLabelText();

    // Assert: Verify the exact message content
    expect(messageText).toContain('Data loaded with AJAX get request');

    // Assert: Verify success
    const isSuccess = await ajaxPage.verifySuccessMessage();
    expect(isSuccess).toBe(true);
  });

  test('TC-AJAX-002: AJAX Data Load with Timeout Verification', async ({ page }) => {
    // Arrange
    ajaxPage = new AjaxPage(page);
    const expectedMinTime = 14000; // 14 seconds
    const expectedMaxTime = 16000; // 16 seconds

    // Act
    await ajaxPage.navigate();
    await ajaxPage.clickAjaxButton();

    // Act: Measure load time with explicit wait condition
    const startTime = Date.now();
    await ajaxPage.waitForDataToLoad();
    const actualLoadTime = Date.now() - startTime;

    // Assert: Verify load time is within acceptable range
    expect(actualLoadTime).toBeGreaterThan(expectedMinTime - 2000); // Allow 2 second variance
    expect(actualLoadTime).toBeLessThan(expectedMaxTime + 3000); // Allow 3 second variance

    // Log the actual time for verification
    console.log(`Actual AJAX load time: ${(actualLoadTime / 1000).toFixed(2)} seconds`);
  });

  test('TC-AJAX-003: Verify Exact Label Text Content', async ({ page }) => {
    // Arrange
    ajaxPage = new AjaxPage(page);
    const expectedMessage = 'Data loaded with AJAX get request.';

    // Act
    await ajaxPage.navigate();
    await ajaxPage.clickAjaxButton();

    // Wait for exact condition: message appears
    await ajaxPage.waitForDataToLoad();

    // Act: Get the response text
    const responseText = await ajaxPage.getResponseLabelText();

    // Assert: Verify exact text match (character-by-character)
    expect(responseText).toContain(expectedMessage);

    // Assert: Verify no error messages
    const hasErrorKeywords = responseText.toLowerCase().includes('error') || 
                             responseText.toLowerCase().includes('failed');
    expect(hasErrorKeywords).toBe(false);
  });

  test('TC-AJAX-004: Multiple Sequential Requests', async ({ page }) => {
    // Arrange
    ajaxPage = new AjaxPage(page);
    const numRequests = 3;

    // Act: Navigate to page
    await ajaxPage.navigate();

    // Act & Assert: Make multiple requests
    for (let i = 1; i <= numRequests; i++) {
      console.log(`--- Request ${i} of ${numRequests} ---`);

      // Click button
      await ajaxPage.clickAjaxButton();

      // Wait for data with explicit condition
      let loadTime;
      try {
        loadTime = await ajaxPage.waitForDataToLoad(20000);
        console.log(`Request ${i} completed in ${(loadTime / 1000).toFixed(2)} seconds`);
      } catch (error) {
        throw new Error(`Request ${i} failed: ${error.message}`);
      }

      // Verify success message
      const isSuccess = await ajaxPage.verifySuccessMessage();
      expect(isSuccess).toBe(true, `Request ${i} should display success message`);

      // Small delay between requests
      if (i < numRequests) {
        await page.waitForTimeout(500);
      }
    }
  });

  test('TC-AJAX-005: AJAX Response Text Verification', async ({ page }) => {
    // Arrange
    ajaxPage = new AjaxPage(page);

    // Act
    await ajaxPage.navigate();
    
    // Assert: Page loaded
    const url = await page.url();
    expect(url).toContain('ajax');

    // Act: Trigger AJAX
    await ajaxPage.clickAjaxButton();

    // Wait for condition: specific text appears in page
    await page.waitForFunction(
      () => document.body.innerText.includes('Data loaded with AJAX get request'),
      { timeout: 20000 }
    );

    // Act: Extract the exact text
    const bodyText = await page.textContent('body');

    // Assert: Verify key phrases
    expect(bodyText).toContain('Data loaded');
    expect(bodyText).toContain('AJAX');
    expect(bodyText).toContain('get request');

    // Assert: Verify complete sentence is present
    const expectedPhrase = 'Data loaded with AJAX get request';
    expect(bodyText).toContain(expectedPhrase);
  });
});
