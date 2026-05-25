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

Then('The user should see search results for {string}', async ({ searchResultsPage }, expectedHeader: string) => {
  const actualHeader = await searchResultsPage.getHeaderText();
  expect(actualHeader).toContain(expectedHeader);
});
