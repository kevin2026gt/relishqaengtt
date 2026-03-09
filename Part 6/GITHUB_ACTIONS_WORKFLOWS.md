# GitHub Actions CI/CD Workflows

This repository includes automated testing workflows using GitHub Actions to ensure code quality and test coverage.

## Workflows Overview

### 1. Jest Unit Tests Workflow
**File:** `.github/workflows/jest-tests.yml`

Automatically runs Jest unit tests for the OrderProcessor module whenever code changes are pushed or a pull request is submitted.

#### Triggers
- **Push**: To `main` or `develop` branches
- **Pull Request**: To `main` or `develop` branches  
- **Manual**: Via GitHub Actions "Run workflow" button
- **Path-based**: Only when `order-processor*.js`, `package.json`, or this workflow file changes

#### What It Does
1. ✅ Checks out the code
2. ✅ Sets up Node.js (18.x and 20.x versions)
3. ✅ Installs dependencies via `npm ci`
4. ✅ Runs Jest tests: `npm test -- order-processor.fixed.test.js --verbose`
5. ✅ Generates code coverage report
6. ✅ Uploads coverage to Codecov
7. ✅ Archives test results as artifacts (30-day retention)
8. ✅ Comments on PRs with test results

#### Test Execution
```bash
npm test -- order-processor.fixed.test.js --verbose
```

#### Coverage Report
- Automatically generated during workflow
- Uploaded to Codecov for trend analysis
- Available in artifacts for download

#### Matrix Strategy
Tests run against multiple Node.js versions:
- Node 18.x
- Node 20.x

---

### 2. Playwright E2E Tests Workflow
**File:** `.github/workflows/playwright-tests.yml`

Automatically runs Playwright end-to-end tests for all three test scenarios (AJAX, Login, Dynamic Elements).

#### Triggers
- **Push**: To `main` or `develop` branches
- **Pull Request**: To `main` or `develop` branches
- **Manual**: Via GitHub Actions "Run workflow" button
- **Scheduled**: Daily at 2:00 AM UTC
- **Path-based**: Only when `Part 4/**` files or this workflow file changes

#### What It Does
1. ✅ Checks out the code
2. ✅ Sets up Node.js 18
3. ✅ Installs root and Part 4 dependencies
4. ✅ Installs Playwright browsers and dependencies
5. ✅ Runs Scenario A (AJAX) tests: `npm run test:ajax`
6. ✅ Runs Scenario B (Login) tests: `npm run test:login`
7. ✅ Runs Scenario C (Dynamic Elements) tests: `npm run test:dynamic`
8. ✅ Generates consolidated HTML report
9. ✅ Uploads Playwright report (30-day retention)
10. ✅ Uploads JUnit test results
11. ✅ Publishes results to GitHub Actions
12. ✅ Comments on PRs with summary

#### Test Suites
- **Scenario A**: 5 AJAX data load tests (~85 seconds)
- **Scenario B**: 12 Login form tests (~90 seconds)
- **Scenario C**: 13 Dynamic elements tests (experimental)

#### Artifacts Generated
- `playwright-report/`: Interactive HTML report (viewable online)
- `test-results/junit.xml`: Test results in JUnit format
- Screenshots and videos of failures

---

## Running Tests Locally

### Jest Unit Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test -- order-processor.fixed.test.js

# Run with coverage
npm test -- order-processor.fixed.test.js --coverage

# Run in watch mode
npm test -- --watch
```

### Playwright E2E Tests
```bash
cd Part\ 4

# Run all tests
npm run test

# Run specific scenario
npm run test:ajax
npm run test:login
npm run test:dynamic

# Run with UI mode
npm run test:ui

# View HTML report
npm run report
```

---

## GitHub Actions Status

### Check Workflow Status
1. Go to your GitHub repository
2. Click **Actions** tab
3. View workflow runs with status indicators:
   - ✅ **Pass**: All tests passed
   - ❌ **Fail**: One or more tests failed
   - ⏳ **In Progress**: Workflow is running
   - ⊘ **Cancelled**: Workflow was stopped

### View Test Results

#### For Jest Tests
- Click on the workflow run
- Scroll through logs to see test output
- Download "jest-results-node-*" artifact to view coverage

#### For Playwright Tests
- Click on the workflow run
- Download "playwright-report" artifact
- Extract and open `index.html` in a browser for interactive report
- View JUnit results using EnricoMi publish action

### PR Comments
When tests run on pull requests, GitHub will:
1. Add a comment with test results summary
2. Display pass/fail status
3. Link to full reports in artifacts

---

## Workflow Configuration Details

### Environment / Secrets
No secrets required for these workflows as they only interact with public repositories and artifacts.

### Node Cache
Workflows use GitHub's npm cache action to speed up dependency installation:
```yaml
cache: 'npm'
```

### Continue on Error
Some steps use `continue-on-error: true` to ensure:
- Coverage upload failures don't fail the build
- Coverage report generation doesn't block results
- All test scenarios run even if one fails

### Timeout
- Jest workflow: No specific timeout (typically <5 minutes)
- Playwright workflow: 60 minutes (allows for slow external site responses)

---

## Test Results Interpretation

### Jest Tests
**Pass Criteria:**
- All unit tests pass
- 0 failures
- Code coverage maintained

**Example Output:**
```
PASS order-processor.fixed.test.js
  OrderProcessor - Fixed Version
    ✓ Rule 1: Line items with prices, quantities, and tax rates
    ✓ Rule 2: Volume discounts (5-20% based on quantity)
    ...
    
Test Suites: 1 passed, 1 total
Tests: 45 passed, 45 total
```

### Playwright Tests
**Expected Results:**
- Scenario A (AJAX): 5 tests passing
- Scenario B (Login): 12 tests passing  
- Scenario C (Dynamic): 5+ tests passing (some experimental)

**Example Summary:**
```
Running 30 tests using 1 worker
  ✓ 22 tests passing
  ✘ 8 tests failing (known Scenario C selector issues)
```

---

## Troubleshooting

### Workflow Not Running
**Check:**
1. Workflow file syntax (use YAML validator)
2. Branch protection rules allow workflows
3. Commit touches a file matching path filters
4. Workflow is enabled in Actions settings

### Tests Failing in CI but Passing Locally
**Common Causes:**
1. Node version mismatch (check matrix versions)
2. Missing environment variables
3. External service (uitestingplayground.com) unavailable
4. Timing issues with timeouts (cloud runners can be slower)

**Solutions:**
- Run tests locally with same Node version as CI
- Check network connectivity to external test sites
- Increase timeouts if needed in `playwright.config.js`
- Review artifacts (screenshots/videos) for what actually happened

### Coverage Report Not Uploading
- Ensure `coverage-final.json` is generated
- Check Codecov integration settings
- Running with `--coverage` flag generates the report

---

## Best Practices

1. **Keep workflows updated**: Review annually for new GitHub Actions versions
2. **Monitor build status**: Set up Slack/email notifications for failures
3. **Archive artifacts**: Downloaded artifacts are kept for 30 days
4. **Test on multiple Node versions**: Catch compatibility issues early
5. **Review PR comments**: CI comments provide quick feedback before merging
6. **Regenerate browsers**: Periodically update Playwright browsers in workflow

---

## Future Enhancements

Potential improvements:
- [ ] Add performance benchmarking for tests
- [ ] Generate test reports in additional formats (HTML, PDF)
- [ ] Integrate with test management tools
- [ ] Add slack notifications for failures
- [ ] Create per-branch test result tracking
- [ ] Add automated release notes based on test coverage
