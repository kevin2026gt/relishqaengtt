# Test Cases for Scenario B: Login Functionality Testing

## Overview
This document contains comprehensive test cases for testing login functionality on the UITestingPlayground Sample App page.

---

## Test Case 1: Login with Empty Username

**Test Case ID:** TC-LOGIN-001

**Test Case Description:**  
Verify that attempting to login with empty username field displays appropriate error message/state.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Verify the login form is visible
4. Verify the username field is empty
5. Click on the password field and input "pwd"
6. Click the "Log In" button
7. Observe the page for error messages or error state
8. Verify the login was not processed

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: (empty/blank)
- Password: ("pwd")
- Expected Button Text (before): "Log In"

**Expected Result:**
- Error message is displayed indicating missing username
- Form validation prevents login with empty credentials
- User is not logged in
- "Log In" button remains visible (does not change to "Log Out")
- Page remains on login form or displays error feedback
- No unauthorized access is granted

---

## Test Case 2: Login with Empty Password

**Test Case ID:** TC-LOGIN-002

**Test Case Description:**  
Verify that attempting to login with empty password field displays appropriate error message/state.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Verify the login form is visible
4. Enter a valid username in the username field (e.g., "testuser")
5. Verify the password field is empty
6. Click the "Log In" button
7. Observe the page for error messages or error state
8. Verify the login was not processed

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "testuser"
- Password: (empty/blank)
- Expected Button Text (before): "Log In"

**Expected Result:**
- Error message is displayed indicating missing password
- Form validation prevents login with empty password
- User is not logged in
- "Log In" button remains visible (does not change to "Log Out")
- Page remains on login form or displays error feedback
- No unauthorized access is granted

---

## Test Case 3: Login with Both Fields Empty

**Test Case ID:** TC-LOGIN-003

**Test Case Description:**  
Verify that attempting to login with both username and password fields empty displays appropriate error message/state.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Verify the login form is visible
4. Verify both username and password fields are empty
5. Click the "Log In" button
6. Observe the page for error messages or error state
7. Verify the login was not processed
8. Document which field error is prioritized (if multiple errors shown)

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: (empty/blank)
- Password: (empty/blank)
- Expected Button Text (before): "Log In"

**Expected Result:**
- Error message(s) displayed indicating missing fields
- Form validation prevents login with empty credentials
- User is not logged in
- "Log In" button remains visible and unchanged
- Page remains on login form with error feedback
- At least one error message is visible

---

## Test Case 4: Successful Login with Valid Credentials

**Test Case ID:** TC-LOGIN-004

**Test Case Description:**  
Verify that login with valid non-empty username and password (pwd) successfully logs in the user.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded
- Valid username and password are known (password: pwd)

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Verify the login form is visible
4. Enter a valid non-empty username (e.g., "student")
5. Enter the correct password "pwd"
6. Click the "Log In" button
7. Wait for login processing to complete
8. Observe the page for success message and state changes
9. Verify the success message is displayed
10. Verify the button text has changed

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "student" (or any non-empty value)
- Password: "pwd"
- Expected Button Text (before): "Log In"
- Expected Button Text (after): "Log Out"

**Expected Result:**
- Login is processed successfully
- User is logged in
- Success message is displayed on the page
- "Log In" button changes to "Log Out" button
- Username from login form appears in the success message
- Page navigates to logged-in state or displays success confirmation

---

## Test Case 5: Verify Success Message Contains Username

**Test Case ID:** TC-LOGIN-005

**Test Case Description:**  
Verify that the success message after login displays the exact username that was entered in the login form.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Enter a specific username (e.g., "john_doe")
4. Enter the password "pwd"
5. Click the "Log In" button
6. Wait for login processing to complete
7. Verify success message appears
8. Read and document the exact success message
9. Verify the username "john_doe" is displayed in the message
10. Check that the correct username (not a generic name) is shown

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "john_doe"
- Password: "pwd"
- Expected Message Format: Should contain "john_doe" in the success message
- Expected Button Text (after): "Log Out"

**Expected Result:**
- Success message is displayed
- Username "john_doe" appears in the success message
- Message confirms login with the specific username provided
- No generic or hardcoded username is shown
- Message is user-specific based on input

---

## Test Case 6: Verify Button Text Change from "Log In" to "Log Out"

**Test Case ID:** TC-LOGIN-006

**Test Case Description:**  
Verify that the login button text changes from "Log In" to "Log Out" after successful authentication.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for the page to fully load
3. Verify the button text is "Log In" (before login)
4. Note the button element's current state
5. Enter a valid username (e.g., "testuser")
6. Enter the password "pwd"
7. Click the "Log In" button
8. Wait for login processing to complete
9. Verify the button text has changed
10. Compare the new button text with "Log Out"

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "testuser"
- Password: "pwd"
- Button Text (before login): "Log In"
- Button Text (after login): "Log Out"

**Expected Result:**
- Button text changes from "Log In" to "Log Out"
- Button remains clickable and functional
- Button styling may change to reflect logged-out state
- Button is clearly distinguishable as "Log Out"
- Text change is immediate after successful login

---

## Test Case 7: Multiple Login Attempts with Different Usernames

**Test Case ID:** TC-LOGIN-007

**Test Case Description:**  
Verify that login works correctly with multiple different usernames using the same password.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for page to fully load
3. **First Login:**
   - Enter username: "user1"
   - Enter password: "pwd"
   - Click "Log In" button
   - Verify success message shows "user1"
   - Verify button shows "Log Out"
4. **Log Out:**
   - Click the "Log Out" button
   - Verify page returns to login form
   - Verify button text returns to "Log In"
5. **Second Login:**
   - Enter username: "user2"
   - Enter password: "pwd"
   - Click "Log In" button
   - Verify success message shows "user2"
   - Verify button shows "Log Out"
6. **Log Out Again:**
   - Click "Log Out" button
   - Verify page returns to login form
7. **Third Login:**
   - Enter username: "admin"
   - Enter password: "pwd"
   - Click "Log In" button
   - Verify success message shows "admin"

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username 1: "user1"
- Username 2: "user2"
- Username 3: "admin"
- Password: "pwd" (same for all)

**Expected Result:**
- First login successful with "user1" in success message
- Log Out works and returns to login form
- Second login successful with "user2" in success message
- Log Out works again
- Third login successful with "admin" in success message
- Each login displays the correct corresponding username
- Button transitions work correctly each time

---

## Test Case 8: Login with Special Characters in Username

**Test Case ID:** TC-LOGIN-008

**Test Case Description:**  
Verify that login works correctly with usernames containing special characters.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is acceptable
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for page to fully load
3. Enter a username with special characters (e.g., "user@domain.com")
4. Enter the password "pwd"
5. Click the "Log In" button
6. Wait for login processing to complete
7. Verify success message appears (or error if special chars not allowed)
8. If successful, verify username is displayed correctly in message
9. Verify button text shows "Log Out"

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "user@domain.com" (or "john.doe" or "test_user")
- Password: "pwd"
- Special Characters: @, _, ., - (various options to test)

**Expected Result:**
- Login processes successfully with special character username
- Success message is displayed
- Username with special characters is shown correctly in message
- Button changes to "Log Out"
- No encoding or escaping issues with special characters
- Username is displayed exactly as entered

---

## Test Case 9: Login Error Handling and Recovery

**Test Case ID:** TC-LOGIN-009

**Test Case Description:**  
Verify that after receiving a login error (empty fields), the form can still be filled and login can succeed.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for page to fully load
3. Click "Log In" with empty fields
4. Verify error message is displayed
5. Now enter a valid username (e.g., "testuser")
6. Enter the password "pwd"
7. Click "Log In" button again
8. Verify login succeeds despite previous error
9. Verify success message displays username
10. Verify button changes to "Log Out"

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- First Attempt Username: (empty)
- First Attempt Password: (empty)
- Second Attempt Username: "testuser"
- Second Attempt Password: "pwd"

**Expected Result:**
- First attempt shows error (empty field validation)
- Error message is clear and actionable
- Form remains usable after error
- Second login attempt succeeds
- Success message is displayed with username
- Button changes to "Log Out"
- No lingering errors or state issues

---

## Test Case 10: Button Functionality After Login

**Test Case ID:** TC-LOGIN-010

**Test Case Description:**  
Verify that the button is clickable and functional in both "Log In" and "Log Out" states.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- Page has fully loaded

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Wait for page to fully load
3. Verify "Log In" button is visible and clickable
4. Try to hover over the button (observe styling)
5. Click the button to log in (with empty fields first to trigger error)
6. Verify error message appears
7. Fill in valid credentials and click again
8. Wait for successful login
9. Verify "Log Out" button is now visible
10. Verify "Log Out" button is clickable
11. Hover over "Log Out" button (observe styling)
12. Click "Log Out" button
13. Verify page returns to login form with "Log In" button
14. Verify button is responsive in both states

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "testuser"
- Password: "pwd"
- Button States: "Log In" and "Log Out"

**Expected Result:**
- "Log In" button is visible and clickable before login
- "Log In" button responds to clicks and form submission
- "Log Out" button appears after successful login
- "Log Out" button is visible, clickable, and functional
- Both buttons provide visual feedback (hover states)
- Button state transitions are immediate and reliable
- No disabled or non-responsive states

---

## Test Case 11: Page Refresh After Login

**Test Case ID:** TC-LOGIN-011

**Test Case Description:**  
Verify the page state when refreshed after successful login.

**Preconditions:**
- Browser is open and functional
- Internet connection is available
- UITestingPlayground website is accessible
- User is on the Sample App page
- User has successfully logged in

**Test Steps:**
1. Navigate to http://uitestingplayground.com/sampleapp page
2. Log in with valid credentials (username: "testuser", password: "pwd")
3. Verify login success message appears
4. Verify button shows "Log Out"
5. Press F5 or Ctrl+R to refresh the page
6. Wait for page to reload
7. Observe whether login state is preserved or lost
8. Document the page state after refresh

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "testuser"
- Password: "pwd"

**Expected Result:**
- Page refreshes successfully
- Either: Login state is preserved (button shows "Log Out", success message remains) OR
- Login state is cleared (page returns to login form, button shows "Log In")
- No errors occur during refresh
- Page is fully functional after refresh
- Consistent behavior on subsequent refresh attempts

---

## Test Case 12: Browser Compatibility for Login

**Test Case ID:** TC-LOGIN-012

**Test Case Description:**  
Verify that login functionality works correctly across different web browsers.

**Preconditions:**
- Multiple browsers installed (Chrome, Firefox, Safari, Edge)
- Internet connection is available
- UITestingPlayground website is accessible from all browsers

**Test Steps:**
1. **Chrome Browser:**
   - Navigate to http://uitestingplayground.com/sampleapp
   - Log in with username: "testuser", password: "pwd"
   - Verify success message and button change

2. **Firefox Browser:**
   - Navigate to http://uitestingplayground.com/sampleapp
   - Log in with username: "testuser", password: "pwd"
   - Verify success message and button change

3. **Safari Browser:**
   - Navigate to http://uitestingplayground.com/sampleapp
   - Log in with username: "testuser", password: "pwd"
   - Verify success message and button change

4. **Edge Browser:**
   - Navigate to http://uitestingplayground.com/sampleapp
   - Log in with username: "testuser", password: "pwd"
   - Verify success message and button change

**Test Data:**
- URL: http://uitestingplayground.com/sampleapp
- Username: "testuser"
- Password: "pwd"
- Browsers: Chrome, Firefox, Safari, Edge

**Expected Result:**
- Login works in Chrome
- Login works in Firefox
- Login works in Safari
- Login works in Edge
- All browsers display success message correctly
- All browsers show button change to "Log Out"
- No browser-specific issues or errors
- Consistent user experience across all browsers

---

## Test Execution Summary

| Test Case ID | Test Title | Priority | Status |
|---|---|---|---|
| TC-LOGIN-001 | Login with Empty Username | High | Pending |
| TC-LOGIN-002 | Login with Empty Password | High | Pending |
| TC-LOGIN-003 | Login with Both Fields Empty | High | Pending |
| TC-LOGIN-004 | Successful Login with Valid Credentials | High | Pending |
| TC-LOGIN-005 | Verify Success Message Contains Username | High | Pending |
| TC-LOGIN-006 | Verify Button Text Change "Log In" to "Log Out" | High | Pending |
| TC-LOGIN-007 | Multiple Login Attempts with Different Usernames | Medium | Pending |
| TC-LOGIN-008 | Login with Special Characters in Username | Medium | Pending |
| TC-LOGIN-009 | Login Error Handling and Recovery | Medium | Pending |
| TC-LOGIN-010 | Button Functionality After Login | Medium | Pending |
| TC-LOGIN-011 | Page Refresh After Login | Low | Pending |
| TC-LOGIN-012 | Browser Compatibility for Login | Low | Pending |

---

## Notes for Test Execution

- Valid password for all tests is: "pwd"
- Username field accepts any non-empty string for successful login
- Clear browser cache between browser compatibility tests
- Allow time for page load before attempting login
- Record error messages exactly as displayed
- Document any UI/UX inconsistencies
- Note button styling/CSS changes in both states
- Test with screen readers for accessibility (optional)
- Verify form validation behavior thoroughly

---

**Document Created:** March 9, 2026  
**Based on Scenario:** Login Functionality Testing (UITestingPlayground Sample App)  
**Total Test Cases:** 12  
**Test Case Format:** Follows genTestCases.md requirements
