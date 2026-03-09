# Test Cases for Scenario C: Dynamic ID and Overlapped Elements Testing

## Overview
This document contains comprehensive test cases for testing dynamic element IDs and overlapped/hidden elements on the UITestingPlayground pages.

---

## Test Case 1: Click Button with Dynamic ID

**Test Case ID:** TC-DYNAMIC-001

**Test Case Description:**  
Verify that a button with a dynamically changing ID can be successfully clicked regardless of the changing ID attribute.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is not on the Dynamic ID page (fresh navigation required)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/dynamicid page
2. Wait for the page to fully load
3. Verify a button element is visible on the page
4. Inspect the button element to note its current ID attribute
5. Click the button on the page
6. Wait for the action/response to complete
7. Verify the button click was registered/successful
8. Document the resulting page state or confirmation

**Test Data:**
- URL: http://uitestingplayground.com/dynamicid
- Button Location: Visible on the page
- Button ID: Dynamic (changes on each page load)
- Button Text/Label: Should be visible to user

**Expected Result:**
- Button is located and visible on the page
- Button click is successfully registered
- No errors occur due to dynamic ID
- Page responds to button click appropriately
- User can interact with button without hardcoding specific ID
- Action completes as intended

---

## Test Case 2: Dynamic ID Changes on Page Reload

**Test Case ID:** TC-DYNAMIC-002

**Test Case Description:**  
Verify that the button ID changes on each page reload, confirming the ID is truly dynamic.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- Browser developer tools available for inspection

**Test Steps:**
1. Navigate to http://uitestingplayground.com/dynamicid page
2. Wait for page to fully load
3. Inspect the button element using browser DevTools
4. Document the button's current ID attribute (e.g., "button-abc123")
5. Take note of the ID value
6. Refresh the page (F5 or Ctrl+R)
7. Wait for page to fully reload
8. Inspect the button element again using DevTools
9. Document the new ID attribute
10. Compare the old ID with the new ID
11. Refresh the page a second time
12. Repeat steps 8-10 and document third ID

**Test Data:**
- URL: http://uitestingplayground.com/dynamicid
- Button Element: Same button element on page
- ID Format: Dynamic values (changes each reload)
- Sample IDs: "button-abc123", "button-xyz789", "button-def456"

**Expected Result:**
- First page load: Button has ID "abc123" (or similar dynamic value)
- After first refresh: Button has ID "xyz789" (different from first)
- After second refresh: Button has ID "def456" (different from previous)
- Each reload generates a unique, different ID
- Button element itself remains in same location
- Button functionality remains consistent

---

## Test Case 3: Multiple Button Clicks with Changing IDs

**Test Case ID:** TC-DYNAMIC-003

**Test Case Description:**  
Verify that the button can be clicked multiple times across page reloads despite ID changing each time.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible

**Test Steps:**
1. Navigate to http://uitestingplayground.com/dynamicid page
2. Wait for page to fully load
3. Click the button (First click with original ID)
4. Note the response/result from first button click
5. Refresh the page (F5 or Ctrl+R)
6. Wait for page to fully reload
7. Verify button is still present with new ID
8. Click the button (Second click with new ID)
9. Note the response/result from second button click
10. Repeat refresh process one more time
11. Click the button (Third click with different new ID)
12. Note the response/result from third button click

**Test Data:**
- URL: http://uitestingplayground.com/dynamicid
- Number of Clicks: 3
- Button IDs: Different each time (dynamic)
- Expected Results: Consistent behavior across all clicks

**Expected Result:**
- First button click succeeds (ID: dynamic-1)
- Page refreshes and ID changes
- Second button click succeeds with new ID (ID: dynamic-2)
- Third button click succeeds with different ID (ID: dynamic-3)
- All three clicks produce consistent results
- No errors occur due to ID changes
- Button remains functional across multiple reloads

---

## Test Case 4: Navigate to Overlapped Elements Page

**Test Case ID:** TC-OVERLAP-001

**Test Case Description:**  
Verify successful navigation to the overlapped elements test page.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible

**Test Steps:**
1. Open browser and ensure it's ready
2. Navigate to http://uitestingplayground.com/overlapped page
3. Wait for the page to fully load
4. Verify the page title or header indicates overlapped elements testing
5. Verify page content is visible
6. Verify form elements are present on the page
7. Locate the Name input field
8. Document the page layout and element positions

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Expected Page Title: Related to overlapped elements
- Form Elements: Should be visible on the page
- Target Element: Name input field

**Expected Result:**
- Page loads successfully
- Page title confirms correct page (overlapped elements)
- Form/input fields are visible on page
- Page content renders without errors
- Name input field is identifiable on the page
- No browser errors in console

---

## Test Case 5: Scroll Name Input Field Into View

**Test Case ID:** TC-OVERLAP-002

**Test Case Description:**  
Verify that the Name input field can be scrolled into view when it's overlapped or hidden by other elements.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Name input field is partially or completely overlapped/hidden

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Wait for page to fully load
3. Verify the Name input field is partially hidden or overlapped
4. Note the current position of the Name field
5. Scroll the page to bring the Name input field fully into view
6. Verify the Name input field is no longer overlapped
7. Verify the field is clearly visible and accessible
8. Verify the field is clickable and ready for input
9. Note the scrolled position

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Target Element: Name input field
- Initial State: Overlapped/hidden by other elements
- Final State: Fully visible and accessible

**Expected Result:**
- Name input field is initially overlapped or partially hidden
- Scrolling reveals the complete input field
- Field becomes fully visible without obstruction
- Field is in correct position for user interaction
- No scrolling errors occur
- Page layout remains intact after scrolling

---

## Test Case 6: Enter Text in Overlapped Name Field

**Test Case ID:** TC-OVERLAP-003

**Test Case Description:**  
Verify that text can be successfully entered into the Name input field after scrolling it into view.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Name input field has been scrolled into view
- Field is visible and accessible

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Wait for page to fully load
3. Scroll the Name input field into view
4. Verify the field is fully visible and not overlapped
5. Click on the Name input field to focus it
6. Type a test name (e.g., "John Doe")
7. Verify the text appears in the input field as you type
8. Verify the text is correctly entered character-by-character
9. Document the entered text exactly

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Target Element: Name input field
- Test Input: "John Doe"
- Input Type: Text characters

**Expected Result:**
- Name input field receives focus when clicked
- Text entry begins immediately after click
- Characters appear in input field as typed
- All characters are correctly entered ("John Doe")
- Text is visible in the field
- No input errors or character loss
- Field handles the text input correctly

---

## Test Case 7: Verify Text Correctly Entered in Name Field

**Test Case ID:** TC-OVERLAP-004

**Test Case Description:**  
Verify that the text entered in the Name field is correctly stored and displays exactly as entered.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Text has been entered in the Name field
- Page element inspection tools available

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Scroll Name input field into view
3. Enter text: "TestUser123"
4. Wait briefly for any processing
5. Verify the text appears in the field visually
6. Inspect the input field element using DevTools
7. Check the "value" attribute of the input element
8. Verify the value attribute contains "TestUser123"
9. Clear the field and enter different text "Alice@Example"
10. Verify the new text is correctly stored as well

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- First Test Input: "TestUser123"
- Second Test Input: "Alice@Example"
- Field Element: Name input field
- Verification Method: Visual inspection + DOM inspection

**Expected Result:**
- Text "TestUser123" entered and visible in field
- Input element's value attribute shows "TestUser123"
- Text matches exactly (case-sensitive, including numbers)
- Field updates correctly when new text entered
- Text "Alice@Example" also stored correctly
- No character loss or corruption
- Special characters (@) handled correctly

---

## Test Case 8: Text Entry with Various Character Types

**Test Case ID:** TC-OVERLAP-005

**Test Case Description:**  
Verify that the Name field accepts various types of text characters (letters, numbers, special characters, spaces).

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Name input field is scrolled into view

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Scroll Name input field into view
3. **Test 1 - Alphabetic characters:**
   - Enter: "abcDEF"
   - Verify text appears correctly
4. **Test 2 - Numeric characters:**
   - Clear field, enter: "12345"
   - Verify numbers appear correctly
5. **Test 3 - Special characters:**
   - Clear field, enter: "user@email.com"
   - Verify special chars (@, .) appear correctly
6. **Test 4 - Mixed with spaces:**
   - Clear field, enter: "John Doe 2024"
   - Verify spaces are preserved
7. **Test 5 - Long text:**
   - Clear field, enter: "VeryLongNameWithManyCharactersForTesting"
   - Verify long text is accepted

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Test Input 1: "abcDEF" (letters, mixed case)
- Test Input 2: "12345" (numbers)
- Test Input 3: "user@email.com" (special characters)
- Test Input 4: "John Doe 2024" (spaces)
- Test Input 5: "VeryLongNameWithManyCharactersForTesting" (long text)

**Expected Result:**
- Alphabetic text entered and displayed correctly
- Numeric text entered and displayed correctly
- Special characters (@, .) entered and displayed correctly
- Spaces preserved and displayed correctly
- Long text accepted and displayed (verify field handles length)
- All character types handled without error
- No character loss or transformation

---

## Test Case 9: Clear and Re-enter Text in Name Field

**Test Case ID:** TC-OVERLAP-006

**Test Case Description:**  
Verify that the Name field can be cleared and new text can be entered multiple times.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Name input field is scrolled into view

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Scroll Name input field into view
3. Enter initial text: "FirstName"
4. Verify text appears in field
5. Select all text (Ctrl+A)
6. Delete the text (Delete or Backspace)
7. Verify field is now empty
8. Enter new text: "SecondName"
9. Verify new text appears correctly
10. Clear field again
11. Enter third text: "ThirdName"
12. Verify third text displays correctly

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Initial Text: "FirstName"
- Second Text: "SecondName"
- Third Text: "ThirdName"

**Expected Result:**
- Initial text "FirstName" entered successfully
- Text can be selected and deleted
- Field becomes empty after clearing
- New text "SecondName" entered after clear
- Field updates correctly with new text
- Second clear operation successful
- Third text "ThirdName" entered and displays correctly
- Field remains functional across multiple clear/enter cycles

---

## Test Case 10: Name Field Focus and Blur

**Test Case ID:** TC-OVERLAP-007

**Test Case Description:**  
Verify that the Name input field properly handles focus and blur events.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Name input field is scrolled into view

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Scroll Name input field into view
3. Click on the Name input field
4. Verify field receives focus (cursor visible, field highlighted)
5. Type text: "TestName"
6. Click outside the field (on a different element or empty space)
7. Verify field loses focus (blur event)
8. Verify text remains in field after blur
9. Click the field again
10. Verify field regains focus
11. Verify text is still present and can be edited

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Test Input: "TestName"
- Focus/Blur Interactions: 2 focus + 2 blur cycles

**Expected Result:**
- Field receives focus when clicked (visual indication)
- Cursor appears in field during focus
- Text entered while field has focus
- Field loses focus when clicked elsewhere
- Text persists after blur event
- Field can regain focus after blur
- Field remains editable after multiple focus/blur cycles
- No focus/blur errors

---

## Test Case 11: Overlapped Element Interaction Handling

**Test Case ID:** TC-OVERLAP-008

**Test Case Description:**  
Verify that overlay elements don't prevent interaction with the Name field after proper scrolling.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Overlapped page
- Elements are initially overlapped

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Wait for page to fully load
3. Observe any overlay or overlapping elements on the page
4. Attempt to interact with Name field before scrolling
5. Document whether field is accessible or blocked
6. Scroll the page to move overlapping elements
7. Verify overlapping element no longer obscures the Name field
8. Click on the Name field
9. Verify field is now accessible and accepts input
10. Enter text to confirm complete accessibility

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Overlapping Elements: Present on initial load
- Target Field: Name input
- Expected State After Scroll: Fully accessible

**Expected Result:**
- Overlapping elements initially block or partially obscure Name field
- Scrolling removes the overlap
- Name field becomes fully visible and accessible
- Field can be clicked without obstruction
- Text input works correctly after scrolling
- No JavaScript errors from overlap handling
- User can interact naturally with the field

---

## Test Case 12: Page Layout and Responsive Design

**Test Case ID:** TC-OVERLAP-009

**Test Case Description:**  
Verify that the overlapped elements page maintains proper layout across different browser window sizes.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- Browser can be resized

**Test Steps:**
1. Navigate to http://uitestingplayground.com/overlapped page
2. Verify page at standard resolution (1920x1080 or 1366x768)
3. Enter text in Name field: "TestResize1"
4. Document layout and element positions
5. Resize browser window to smaller size (1024x768)
6. Verify page layout adapts
7. Try to scroll and access Name field again
8. Enter additional text: "TestResize2"
9. Resize to very small (mobile size: 375x667)
10. Verify page is still functional
11. Verify Name field remains accessible

**Test Data:**
- URL: http://uitestingplayground.com/overlapped
- Viewport Sizes:
  - Desktop: 1920x1080
  - Laptop: 1366x768
  - Tablet: 1024x768
  - Mobile: 375x667
- Test Input: "TestResize1", "TestResize2"

**Expected Result:**
- Page displays correctly at desktop resolution
- Name field is accessible and functional
- Page layout adapts at smaller resolutions
- Elements remain properly positioned when resized
- Name field stays accessible across all viewport sizes
- Input functionality works at all resolution sizes
- No layout breaking or element misalignment
- Scrolling works properly at all sizes

---

## Test Case 13: Complete Scenario End-to-End

**Test Case ID:** TC-E2E-001

**Test Case Description:**  
Verify the complete scenario from Dynamic ID testing to Overlapped Elements name entry.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible

**Test Steps:**
1. Navigate to http://uitestingplayground.com/dynamicid page
2. Wait for page to fully load
3. Locate and click the button with dynamic ID
4. Verify button click succeeds
5. Navigate to http://uitestingplayground.com/overlapped page
6. Wait for page to fully load
7. Verify Name input field is present (may be overlapped)
8. Scroll the Name field into view
9. Click on the Name input field
10. Enter a test name: "CompleteTest"
11. Verify text appears in the field
12. Verify text is correctly stored in the field element

**Test Data:**
- URL 1: http://uitestingplayground.com/dynamicid
- URL 2: http://uitestingplayground.com/overlapped
- Button ID: Dynamic (changes with each load)
- Name Input: "CompleteTest"

**Expected Result:**
- Dynamic ID button located and clicked successfully
- No errors from changing button ID
- Navigation to overlapped page succeeds
- Name field found on overlapped page
- Scrolling correctly positions Name field
- Name field accepts focus and input
- Text "CompleteTest" entered and displayed
- Complete workflow executes without errors
- Both test scenarios pass successfully

---

## Test Execution Summary

| Test Case ID | Test Title | Priority | Status |
|---|---|---|---|
| TC-DYNAMIC-001 | Click Button with Dynamic ID | High | Pending |
| TC-DYNAMIC-002 | Dynamic ID Changes on Page Reload | High | Pending |
| TC-DYNAMIC-003 | Multiple Button Clicks with Changing IDs | Medium | Pending |
| TC-OVERLAP-001 | Navigate to Overlapped Elements Page | High | Pending |
| TC-OVERLAP-002 | Scroll Name Input Field Into View | High | Pending |
| TC-OVERLAP-003 | Enter Text in Overlapped Name Field | High | Pending |
| TC-OVERLAP-004 | Verify Text Correctly Entered in Name Field | High | Pending |
| TC-OVERLAP-005 | Text Entry with Various Character Types | Medium | Pending |
| TC-OVERLAP-006 | Clear and Re-enter Text in Name Field | Medium | Pending |
| TC-OVERLAP-007 | Name Field Focus and Blur | Medium | Pending |
| TC-OVERLAP-008 | Overlapped Element Interaction Handling | Medium | Pending |
| TC-OVERLAP-009 | Page Layout and Responsive Design | Low | Pending |
| TC-E2E-001 | Complete Scenario End-to-End | High | Pending |

---

## Notes for Test Execution

- Dynamic element IDs require XPath or CSS selectors instead of ID-based locators
- Overlapped elements may require explicit scrolling commands
- Verify browser console for errors during all interactions
- Document all ID values when testing dynamic IDs
- Test with different character sets and input lengths
- Verify field accepts various keyboard inputs (Tab, Enter, etc.)
- Note any accessibility issues with overlapped elements
- Test both mouse and keyboard navigation
- Use browser DevTools to inspect element properties
- Document visual appearance of overlapping elements

---

**Document Created:** March 9, 2026  
**Based on Scenario:** Dynamic ID and Overlapped Elements Testing (UITestingPlayground)  
**Total Test Cases:** 13  
**Test Case Format:** Follows genTestCases.md requirements
