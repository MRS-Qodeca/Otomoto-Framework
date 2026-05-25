import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { Given, When, Then } = createBdd(test);

// STEP 1: Given - Stan początkowy / Initial state
Given('I am on Example Page', async ({ examplePage }) => {
  await examplePage.open();
});

// STEP 2: When - Akcja użytkownika / User action
When('I do something', async ({ exampleOnMainPage }) => {
  await exampleOnMainPage.doSomething('Magnus Test');
});

// STEP 3: Then - Weryfikacja / Verification
Then('Expected result happens', async ({ exampleOnMainPage }) => {
  const value = await exampleOnMainPage.getValue();
  expect(value).toBe('Magnus Test');
});

// STEP 4: AND - Test dostępności / Accessibility check
// Then('The page should be accessible according to WCAG standards', async ({ examplePage }) => {
//   await examplePage.verifyAccessibility('Example Page Audit');
// });
