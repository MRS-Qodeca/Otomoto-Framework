import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { Given, When, Then } = createBdd(test);

// STEP 1: Given - Stan początkowy / Initial state
Given('The user navigates to the dropdown page', async ({ dropdownPage }) => {
  await dropdownPage.open();
});

// STEP 2: When - Akcja użytkownika / User action
When('The user selects option {string} from the dropdown', async ({ dropdown }, optionName) => {
  /**
   * Placeholder {string} zostanie zastąpiony rzeczywistą nazwą opcji w scenariuszu testowym. /
   * Placeholder {string} will be replaced with the actual option name in the test scenario.
   */
  await dropdown.selectByText(optionName);
});

// STEP 3: Then - Weryfikacja / Verification
Then(
  'The dropdown selected value should be {string}',
  async ({ dropdown, page }, expectedOptionName) => {
    const selectedValue = await dropdown.getSelectedOptionText();
    expect(selectedValue).toBe(expectedOptionName);
    await page.waitForLoadState('networkidle');
  },
);
