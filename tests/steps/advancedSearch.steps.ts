import { createBdd } from 'playwright-bdd';
import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

const { When, Then } = createBdd(test);

When(
  'The user sets minimum production year to {string}',
  async ({ searchFilters }, year: string) => {
    await searchFilters.setYearFrom(year);
  },
);

When('The user sets maximum price to {string}', async ({ searchFilters }, price: string) => {
  await searchFilters.setPriceTo(price);
});

Then(
  'The search results should only display valid vehicles matching year {string} and price {string}',
  async ({ searchResultsPage, page }, expectedYear: string, expectedPrice: string) => {
    // Czekamy na stabilne załadowanie wyników i asercję tytułów
    await searchResultsPage.waitForResultsPage();
    const titles = await searchResultsPage.getAllResultTitles();
    expect(titles.length).toBeGreaterThan(0);

    const minYear = parseInt(expectedYear, 10);
    const maxPrice = parseInt(expectedPrice, 10);

    // Pobieramy lokator wszystkich głównych artykułów i ich liczbę
    const articles = page.locator('main article');
    const actualCount = await articles.count();

    // Sprawdzamy pierwsze 20 ogłoszeń, ale jeśli jest ich mniej (np. 1), sprawdzamy tylko tyle, ile jest
    const itemsToCheck = Math.min(actualCount, 20);

    // Jeśli na stronie nie ma artykułów, przerywamy, żeby nie kręcić pustej pętli
    if (itemsToCheck === 0) {
      throw new Error('No articles found');
    }

    for (let i = 0; i < itemsToCheck; i++) {
      const currentArticle = articles.nth(i);
      const textContent = await currentArticle.innerText().catch(() => '');
      if (!textContent) continue;

      // Odrzucamy kafelki promocyjne, które Otomoto wciska poza kryteriami
      if (textContent.includes('Wyróżnione') || textContent.includes('Wyróżniony Sprzedawca')) {
        continue;
      }

      // // Upewniamy się, że sprawdzamy tylko "Serię 5"
      // const titleLocator = currentArticle.locator('h2, h3').first();
      // const titleText = (await titleLocator.count()) > 0 ? await titleLocator.innerText() : '';
      // if (titleText && !titleText.toLowerCase().includes('seria 5')) {
      //   continue;
      // }

      // 1. Walidacja Roku (Wyszukanie roku 202X z pominięciem przebiegu i PLN)
      const yearMatches = textContent.match(/\b(19|20)\d{2}\b/g);
      if (yearMatches) {
        const validYears = yearMatches.filter((year) => {
          const index = textContent.indexOf(year);
          const textAfter = textContent.substring(index, index + 15);
          return (
            !textAfter.includes('cm³') &&
            !textAfter.includes('cm3') &&
            !textAfter.includes('km') &&
            !textAfter.includes('PLN')
          );
        });
        if (validYears.length > 0) {
          const vehicleYear = parseInt(validYears[0], 10);
          expect(vehicleYear).toBeGreaterThanOrEqual(minYear);
        }
      }

      // 2. Walidacja Ceny (Pobranie ostatniej, czyli aktualnej ceny z kafelka)
      const allPrices = textContent.replace(/\s/g, '').match(/\d+(?=PLN)/g);
      if (allPrices && allPrices.length > 0) {
        const currentPriceText = allPrices[allPrices.length - 1];
        const vehiclePrice = parseInt(currentPriceText, 10);
        expect(vehiclePrice).toBeLessThanOrEqual(maxPrice);
      }
    }
  },
);
