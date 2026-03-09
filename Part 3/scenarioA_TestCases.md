# Test Cases for Scenario A: AJAX Data Load Testing

## Overview
This document contains comprehensive test cases for testing AJAX functionality on the UITestingPlayground AJAX page.

---

## Test Case 1: Successful AJAX Data Load

**Test Case ID:** TC-AJAX-001

**Test Case Description:**  
Verify that clicking the AJAX trigger button successfully loads data and displays the correct confirmation message.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is not on the AJAX test page (fresh navigation required)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for the page to fully load (verify page title and layout are visible)
3. Locate the button that triggers the AJAX request
4. Click the AJAX trigger button
5. Wait for the server response (approximately 15 seconds)
6. Observe the label element where data should be displayed
7. Verify the label text content

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected Button Text: "Button Triggering AJAX Request" (or similar)
- Expected Response Time: ~15 seconds
- Expected Label Message: "Data loaded with AJAX get request."

**Expected Result:**
- Button click is registered
- Page shows loading indicator or placeholder text during the 15-second wait
- After ~15 seconds, the label displays "Data loaded with AJAX get request."
- No error messages are displayed
- Browser console shows no JavaScript errors

---

## Test Case 2: AJAX Data Load with Timeout Verification

**Test Case ID:** TC-AJAX-002

**Test Case Description:**  
Verify that the AJAX request takes approximately 15 seconds to complete and that the wait mechanism is working correctly.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- System time is synchronized
- User has access to browser developer tools (optional, for timing verification)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Note the current time (in seconds) or start a stopwatch
4. Click the AJAX trigger button
5. Wait and observe the loading state
6. Note the time when the data appears in the label
7. Calculate the total wait time (end time - start time)
8. Verify the wait time is approximately 15 seconds

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected Response Time: ~15 seconds (acceptable range: 14-16 seconds)
- Minimum Load Time: 14 seconds
- Maximum Load Time: 16 seconds

**Expected Result:**
- Total elapsed time between button click and data display is approximately 15 seconds
- Data appears within the acceptable time range (14-16 seconds)
- No timeout errors occur during the wait
- Response completes successfully within the expected timeframe

---

## Test Case 3: Verify Exact Label Text Content

**Test Case ID:** TC-AJAX-003

**Test Case Description:**  
Verify that the loaded data contains the exact expected message without typos or variations.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- Previous AJAX load attempt has completed (or test runs independently)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Click the AJAX trigger button
4. Wait for the data to load (approximately 15 seconds)
5. Once data appears, capture the exact text in the label element
6. Compare the captured text character-by-character with the expected message
7. Verify case sensitivity (uppercase/lowercase)
8. Verify there are no extra spaces or special characters

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected Label Text (EXACT): "Data loaded with AJAX get request."
- Text should include the period (.) at the end
- No extra spaces before or after text
- Case-sensitive match required

**Expected Result:**
- Loaded label text is: "Data loaded with AJAX get request."
- Text matches exactly including punctuation
- Text contains no typos or extra characters
- Text is properly formatted with appropriate casing
- Period is present at the end of the message

---

## Test Case 4: Multiple Sequential AJAX Requests

**Test Case ID:** TC-AJAX-004

**Test Case Description:**  
Verify that the AJAX button can be clicked multiple times and loads data correctly each time.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- First AJAX request has completed successfully

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Click the AJAX trigger button (First Request)
4. Wait for data to load (~15 seconds)
5. Verify the label displays the expected message
6. Click the AJAX trigger button again (Second Request)
7. Wait for new data to load (~15 seconds)
8. Verify the label displays the expected message again
9. Click the AJAX trigger button a third time (Third Request)
10. Wait for data to load (~15 seconds)
11. Verify the label displays the expected message

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Number of Requests: 3
- Time between requests: Immediate (no delay)
- Expected message for each request: "Data loaded with AJAX get request."

**Expected Result:**
- First AJAX request completes successfully with correct message
- Second AJAX request completes successfully with correct message
- Third AJAX request completes successfully with correct message
- No errors or timeouts occur on any request
- Each request takes approximately 15 seconds
- Label updates correctly for each new request

---

## Test Case 5: AJAX Request with Network Error Simulation

**Test Case ID:** TC-AJAX-005

**Test Case Description:**  
Verify the application's behavior when network connectivity is lost during AJAX request.

**Preconditions:**
- Browser is open and functional
- Internet connection is initially available
- UITestingPlayground website is accessible
- Ability to control network connectivity (or use browser devtools to simulate offline)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Disable network connectivity or simulate offline mode
4. Click the AJAX trigger button
5. Wait to see how the application responds
6. Observe the label element for any error messages
7. Observe browser console for error logs
8. Re-enable network connectivity
9. Verify page state after network restoration

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Network State: Offline/Disabled
- Expected Error Behavior: Error message or graceful failure handling
- Expected Timeout: 30+ seconds (or application-specific timeout)

**Expected Result:**
- Application handles network error gracefully
- No JavaScript exceptions in console
- Error message is displayed (if applicable)
- Application remains functional after network restoration
- No page crash or freeze occurs

---

## Test Case 6: AJAX Label Element Visibility Check

**Test Case ID:** TC-AJAX-006

**Test Case Description:**  
Verify that the label element where AJAX data is displayed is visible and properly formatted.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- Browser window is at standard resolution

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Verify the label element is visible on the page
4. Note the label's position and styling
5. Click the AJAX trigger button
6. Wait for data to load (~15 seconds)
7. Verify the label remains visible after data load
8. Verify the label text is readable and properly formatted
9. Check that text is not cut off or hidden
10. Verify label background and text colors provide adequate contrast

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected Label Visibility: Visible before and after AJAX call
- Expected Text Color: Should be readable against background
- Expected Element: HTML label or div element

**Expected Result:**
- Label element is visible and properly positioned
- Label is not hidden or off-screen
- Text is fully readable with good contrast
- No CSS overflow or text-truncation issues
- Label remains visible and properly formatted after data loads

---

## Test Case 7: Browser Compatibility Check

**Test Case ID:** TC-AJAX-007

**Test Case Description:**  
Verify that AJAX functionality works correctly across different web browsers.

**Preconditions:**
- Multiple browsers are installed and accessible (Chrome, Firefox, Safari, Edge)
- Internet connection is available
- UITestingPlayground website is accessible from all browsers

**Test Steps:**
1. **Chrome Browser:**
   - Navigate to http://uitestingplayground.com/ajax
   - Click AJAX trigger button
   - Wait for data load (~15 seconds)
   - Verify success message appears

2. **Firefox Browser:**
   - Navigate to http://uitestingplayground.com/ajax
   - Click AJAX trigger button
   - Wait for data load (~15 seconds)
   - Verify success message appears

3. **Safari Browser:**
   - Navigate to http://uitestingplayground.com/ajax
   - Click AJAX trigger button
   - Wait for data load (~15 seconds)
   - Verify success message appears

4. **Edge Browser:**
   - Navigate to http://uitestingplayground.com/ajax
   - Click AJAX trigger button
   - Wait for data load (~15 seconds)
   - Verify success message appears

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Browsers: Chrome, Firefox, Safari, Edge
- Expected message: "Data loaded with AJAX get request."

**Expected Result:**
- AJAX functionality works in Chrome
- AJAX functionality works in Firefox
- AJAX functionality works in Safari
- AJAX functionality works in Edge
- All browsers display the same success message
- No browser-specific errors or issues

---

## Test Case 8: Page Refresh After AJAX Load

**Test Case ID:** TC-AJAX-008

**Test Case Description:**  
Verify that refreshing the page after a successful AJAX load clears the data and resets the page state.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Click the AJAX trigger button
4. Wait for data to load (~15 seconds)
5. Verify the label displays "Data loaded with AJAX get request."
6. Press F5 or Ctrl+R to refresh the page
7. Wait for page to reload
8. Verify the label is empty or reset to initial state
9. Verify the AJAX button is still functional

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected message before refresh: "Data loaded with AJAX get request."
- Expected state after refresh: Label should be empty or reset

**Expected Result:**
- Page refreshes successfully
- Label data is cleared after refresh
- Page returns to initial state
- AJAX button remains functional after refresh
- No errors occur during or after refresh

---

## Test Case 9: DevTools Console Check for Errors

**Test Case ID:** TC-AJAX-009

**Test Case Description:**  
Verify that no JavaScript errors or warnings appear in the browser console during AJAX operation.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- Browser Developer Tools (DevTools) can be opened

**Test Steps:**
1. Open browser Developer Tools (F12 or Right-click > Inspect)
2. Navigate to the Console tab
3. Clear any existing console messages
4. Navigate to http://uitestingplayground.com/ajax page
5. Wait for page to fully load
6. Check console for any errors or warnings
7. Click the AJAX trigger button
8. Wait for data to load (~15 seconds)
9. Check console for any new errors or warnings
10. Document any messages found

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Console Tab: Browser DevTools Console section
- Expected Errors: None (0 errors)
- Expected Warnings: Minimal or none

**Expected Result:**
- No JavaScript errors in console during page load
- No CORS errors during AJAX request
- No network errors logged
- No warning messages (or only standard browser warnings)
- Console remains clean throughout the test
- AJAX request completes successfully despite any non-critical warnings

---

## Test Case 10: AJAX Loading State Indication

**Test Case ID:** TC-AJAX-010

**Test Case Description:**  
Verify that the application provides visual feedback indicating when an AJAX request is in progress.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible

**Test Steps:**
1. Navigate to http://uitestingplayground.com/ajax page
2. Wait for page to fully load
3. Immediately observe the page as you click the AJAX trigger button
4. Watch for loading indicators (spinner, text, progress bar, etc.)
5. Note any visual feedback during the ~15 second wait period
6. Observe how the UI changes or updates
7. Document the loading state indicators
8. Wait for data to appear and loading state to end

**Test Data:**
- URL: http://uitestingplayground.com/ajax
- Expected Loading Indicators: Spinner, progress text, or similar visual feedback
- Expected Duration: ~15 seconds

**Expected Result:**
- Visual loading indicator appears after button click
- Loading state is visible to user during the ~15 second wait
- Loading indicator disappears when data is loaded
- Clear transition between loading and loaded states
- User receives clear feedback that a request is in progress

---

## Test Execution Summary

| Test Case ID | Test Title | Priority | Status |
|---|---|---|---|
| TC-AJAX-001 | Successful AJAX Data Load | High | Pending |
| TC-AJAX-002 | AJAX Data Load with Timeout Verification | High | Pending |
| TC-AJAX-003 | Verify Exact Label Text Content | High | Pending |
| TC-AJAX-004 | Multiple Sequential AJAX Requests | Medium | Pending |
| TC-AJAX-005 | AJAX Request with Network Error Simulation | Medium | Pending |
| TC-AJAX-006 | AJAX Label Element Visibility Check | Medium | Pending |
| TC-AJAX-007 | Browser Compatibility Check | Medium | Pending |
| TC-AJAX-008 | Page Refresh After AJAX Load | Medium | Pending |
| TC-AJAX-009 | DevTools Console Check for Errors | Low | Pending |
| TC-AJAX-010 | AJAX Loading State Indication | Medium | Pending |

---

## Notes for Test Execution

- All tests should be executed in a controlled environment
- Network connectivity must be stable for testing
- Allow sufficient time (15+ seconds) for each AJAX request to complete
- Document any deviations from expected results
- Take screenshots for failed tests
- Verify browser compatibility across major browsers
- Clear browser cache between test runs if needed
- Monitor browser console for errors during all tests

---

**Document Created:** March 9, 2026  
**Based on Scenario:** AJAX Data Load Testing (UITestingPlayground)  
**Total Test Cases:** 10  
**Test Case Format:** Follows genTestCases.md requirements
