import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';
import path from 'path';
import { testConfig } from '././src/testConfig';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * BDD Configuration (Cucumber/Gherkin)
 */
const bddDir = defineBddConfig({
  features: 'tests/features/*.feature',
  steps: 'tests/steps/*.ts',
  importTestFrom: 'src/pageObjects/fixtures/appFixture.ts',
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 40000,
  // Using both standard test files and generated files from features
  // testDir: './',
  // testMatch: [
  //   'tests/specs/**/*.spec.ts', // Standard test files
  //   '.features-gen/**/*.spec.js', // Generated test files from features
  // ],
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* REPORTER CONFIGURATION (Allure + HTML) */
  reporter: [
    ['line'],
    ['html'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: false,
      },
    ],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    navigationTimeout: 15000,
    actionTimeout: 10000,
    baseURL: testConfig.baseURL,
    httpCredentials: {
      username: testConfig.username,
      password: testConfig.password,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    testIdAttribute: 'id',
  },

  /* Configure projects for major browsers and test types */
  projects: [
    /* --- 1. Group: Desktop Chromium (Chrome, Edge, Opera) --- */
    {
      name: '[SPEC] Chromium',
      testDir: './tests/specs',
      testMatch: '**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: '[BDD] Chromium',
      testDir: bddDir,
      testMatch: '**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
    },

    /* --- 2. Group: Desktop Firefox --- */
    {
      name: '[SPEC] Firefox',
      testDir: './tests/specs',
      testMatch: '**/*.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: '[BDD] Firefox',
      testDir: bddDir,
      testMatch: '**/*.spec.js',
      use: { ...devices['Desktop Firefox'] },
    },

    /* --- 3. Group: Desktop WebKit (Safari) --- */
    {
      name: '[SPEC] WebKit',
      testDir: './tests/specs',
      testMatch: '**/*.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: '[BDD] WebKit',
      testDir: bddDir,
      testMatch: '**/*.spec.js',
      use: { ...devices['Desktop Safari'] },
    },

    /* --- 4. Group: Branded Browsers  --- */
    // {
    //   name: '[SPEC] MS Edge',
    //   testDir: './tests/specs',
    //   testMatch: '**/*.spec.ts',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: '[SPEC] Google Chrome',
    //   testDir: './tests/specs',
    //   testMatch: '**/*.spec.ts',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
    // {
    //   name: '[BDD] MS Edge',
    //   testDir: bddDir,
    //   testMatch: '**/*.spec.js',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: '[BDD] Google Chrome',
    //   testDir: bddDir,
    //   testMatch: '**/*.spec.js',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    /* --- 5. Group: Mobile Browsers --- */
    // {
    //   name: '[SPEC] Mobile Chrome',
    //   testDir: './tests/specs',
    //   testMatch: '**/*.spec.ts',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: '[SPEC] Mobile Safari',
    //   testDir: './tests/specs',
    //   testMatch: '**/*.spec.ts',
    //   use: { ...devices['iPhone 16'] },
    // },
    // {
    //   name: '[BDD] Mobile Chrome',
    //   testDir: bddDir,
    //   testMatch: '**/*.spec.js',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: '[BDD] Mobile Safari',
    //   testDir: bddDir,
    //   testMatch: '**/*.spec.js',
    //   use: { ...devices['iPhone 16'] },
    // },

    /* Non-functional tests for performance auditing with Lighthouse. */
    // {
    //   name: '[Lighthouse] Desktop Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     launchOptions: {
    //       args: ['--remote-debugging-port=9222'],
    //     },
    //   },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
