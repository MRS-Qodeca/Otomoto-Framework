import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { Given, When, Then } = createBdd(test);

// tylko page

Given('The user is on the Otomoto homepage', async ({ homePage }) => {
  await homePage.open();
});

When('The user accepts the cookies policy', async ({ homePage }) => {
  await homePage.acceptCookies();
});

When('The user selects the make {string}', async ({ homePage }, make: string) => {
  await homePage.selectMake(make);
});

When('The user selects the model {string}', async ({ homePage }, model: string) => {
  await homePage.selectModel(model);
});

// dodanie komponentu SearchFilters

When(
  'The user sets minimum production year to {string}',
  async ({ searchFilters }, year: string) => {
    await searchFilters.setYearFrom(year);
  },
);

When('The user selects fuel type as {string}', async ({ searchFilters }, fuelType: string) => {
  await searchFilters.selectFuelType(fuelType);
});

When(
  'The user selects country of origin as {string}',
  async ({ searchFilters }, country: string) => {
    await searchFilters.selectCountryOfOrigin(country);
  },
);

When('The user clicks the search button', async ({ homePage }) => {
  await homePage.clickSearch();
});

// asercja - dochodzi results page

Then(
  'The search results should only display valid vehicles matching the criteria',
  async ({ searchResultsPage, page }) => {
    await searchResultsPage.waitForResultsPage();

    // czy są wyniki
    const titles = await searchResultsPage.getAllResultTitles();
    expect(titles.length).toBeGreaterThan(0);

    // pobieramy parametry z wyników
    const parameterLists = page.locator('main article ul');
    const count = await parameterLists.count();

    console.log(`📊 Analiza miarodajności dla ${count} znalezionych pojazdów...`);

    for (let i = 0; i < count; i++) {
      const textContent = await parameterLists.nth(i).innerText();

      // sprwadzamy rok produkcji - czy jest >= 2020
      const yearMatch = textContent.match(/\b(20\d{2})\b/);
      if (yearMatch) {
        const vehicleYear = parseInt(yearMatch[1], 10);
        expect(vehicleYear).toBeGreaterThanOrEqual(2020);
      }

      // sprawdzamy typ paliwa - czy zawiera "benzyna"
      expect(textContent.toLowerCase()).toContain('benzyna');
    }

    console.log(
      '✅ Sukces! Wszystkie widoczne pojazdy spełniają zaawansowane kryteria (Rok >= 2020 oraz Paliwo = Benzyna).',
    );
  },
);
