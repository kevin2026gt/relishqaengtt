// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 * Configures test execution with proper timeouts and reporting
 */
const config = defineConfig({
  testDir: './tests',
  
  // Maximum time one test can run
  timeout: 120 * 1000, // 120 seconds (increased from 60 to handle dynamic element tests)

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'], // Console output
  ],

  // Shared settings for all tests
  use: {
    // Base URL for all tests
    baseURL: 'http://uitestingplayground.com',

    // Browser action timeout
    actionTimeout: 30000,

    // Navigation timeout
    navigationTimeout: 30000,

    // Screenshots and videos
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  // Browser configurations
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
  ],

  // Web server configuration (if needed for local development)
  webServer: undefined, // Not required for UITestingPlayground (external site)

  // Global setup/teardown
  globalSetup: undefined,
  globalTeardown: undefined,
});

module.exports = config;
