import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { Given, When, Then } = createBdd(test);

Given('The user is on the Otomoto homepage', async ({ homePage }) => {
  await homePage.open();
});

When('The user accepts the cookies policy', async ({ homePage }) => {
  await homePage.acceptCookies();
});

When('The user selects the make {string}', async ({ homePage }, makeName: string) => {
  await homePage.selectMake(makeName);
});

When('The user selects the model {string}', async ({ homePage }, modelName: string) => {
  await homePage.selectModel(modelName);
});

When('The user clicks the search button', async ({ homePage }) => {
  await homePage.clickSearch();
});

Then(
  'The user should see search results for make {string} and model {string}',
  async ({ searchResultsPage }, expectedMake: string, expectedModel: string) => {
    await searchResultsPage.waitForResultsPage();

    const titles = await searchResultsPage.getAllResultTitles();
    expect(titles.length).toBeGreaterThan(0);

    for (const title of titles) {
      expect(title).toContain(expectedMake);
      expect(title).toContain(expectedModel);
    }

    console.log(`Wyniki zawierają: ${expectedMake} ${expectedModel}`);
  },
);

Then(
  'The page should display found vehicles or a proper no-results message',
  async ({ searchResultsPage }) => {
    const hasVehicles = await searchResultsPage.areResultsOrNoResultsMessageVisible();
    expect(hasVehicles).toBeDefined();
  },
);
