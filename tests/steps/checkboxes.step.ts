import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { Given, When, Then } = createBdd(test);

// STEP 1: Given - Stan początkowy / Initial state
Given('I am on the checkboxes page', async ({ checkboxesPage }) => {
  await checkboxesPage.open();
});

// STEP 2: When - Akcja użytkownika / User action
When('I click on the first checkbox', async ({ checkboxesPage }) => {
  await checkboxesPage.checkFirst();
});

// STEP 3: Then - Weryfikacja / Verification
Then('the first checkbox should be checked', async ({ checkboxesPage }) => {
  const isChecked = await checkboxesPage.isFirstChecked();
  expect(isChecked).toBe(true);
});
