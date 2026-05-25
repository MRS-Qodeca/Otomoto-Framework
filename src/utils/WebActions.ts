/* Metoda użycia: aby w testach wykorzystać funkcje z tej klasy, należy stworzyć jej instancję, przekazując aktualną stronę i kontekst przeglądarki, np. this.actions.getPDFText(kontekst strony) /
   Usage method: to use the functions from this class in tests, you need to create an instance of it, passing the current page and browser context, e.g., this.actions.getPDFText(browserContext) */

import fs from 'fs';
import type { Page, Locator } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import { Workbook } from 'exceljs';
import { testConfig } from '../testConfig';
import * as pdfjslib from 'pdfjs-dist-es5';

/* NOTE: BrowserContext zakomentowany do czasu implementacji testów multi-sesyjnych / 
NOTE: BrowserContext is commented out until the implementation of multi-session tests */
export class WebActions {
  readonly page: Page;
  /*readonly context: BrowserContext;*/

  constructor(page: Page /*context: BrowserContext*/) {
    this.page = page;
    /*this.context = context;*/
  }

  /**
   * Przechodzi do określonego URL. /
   * Navigates to a specified URL.
   * @param url - Adres URL, do którego ma nastąpić nawigacja / The URL to navigate to
   */
  async goToUrl(url: string) {
    // Tutaj możesz dodać stepy Allure, logi, lub specjalne warunki / Here you can add Allure steps, logs, or special conditions
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Wpisuje tekst w pole formularza. /
   * Enters text into a form field.
   */
  async enterValue(locator: string, value: string): Promise<void> {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    await element.fill('');
    await element.fill(value);
  }

  /**
   * Klika w element zdefiniowany przez lokator. /
   * Clicks on an element defined by the locator.
   */
  async clickElement(element: string | Locator): Promise<void> {
    if (typeof element === 'string') {
      await this.page.click(element);
    } else {
      await element.click();
    }
  }

  /**
   * Pobiera tekst z dowolnego elementu. /
   * Retrieves text from any element.
   */
  async getElementText(locator: string): Promise<string | null> {
    const element = this.page.locator(locator);
    await element.waitFor({ state: 'visible' });
    return await element.textContent();
  }

  /**
   * Lokalizuje element po dokładnej treści tekstu i wykonuje kliknięcie. /
   * Locates an element by exact text content and performs a click.
   */
  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  /**
   * Wykonuje kliknięcie bezpośrednio przez silnik JavaScript przeglądarki (omija ograniczenia UI Playwrighta). /
   * Performs a click directly through the browser's JavaScript engine (bypassing Playwright's UI constraints).
   */
  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  /**
   * Wpisuje tekst w określony element (input, textarea).
   * Metoda najpierw czyści pole, a następnie wprowadza nową wartość.
   * Wspiera zarówno selektory tekstowe (string), jak i gotowe obiekty Locator.
   * * @param element - Selektor string lub Locator Playwrighta
   * @param value - Tekst, który ma zostać wpisany /
   * Enters text into a specified element (input, textarea).
   * The method first clears the field and then inputs the new value.
   * Supports both string selectors and ready-made Locator objects.
   * @param element - String selector or Playwright Locator
   * @param value - Text to be entered
   */
  async typeElement(element: string | Locator, value: string): Promise<void> {
    if (typeof element === 'string') {
      await this.page.fill(element, value);
    } else {
      await element.fill(value);
    }
  }

  /**
   * Wstrzymuje wykonanie testu na określoną liczbę milisekund (używać tylko w ostateczności). /
   * Pauses the test execution for a specified number of milliseconds (use only as a last resort).
   */
  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  /**
   * Odczytuje wartość tekstową z konkretnej komórki pliku Excel (.xlsx). /
   * Reads a text value from a specific cell in an Excel file (.xlsx).
   */
  async readDataFromExcel(
    fileName: string,
    sheetName: string,
    rowNum: number,
    cellNum: number,
  ): Promise<string> {
    const workbook = new Workbook();
    await workbook.xlsx.readFile(`./Downloads/${fileName}`);
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      throw new Error(
        `[PL] Arkusz o nazwie "${sheetName}" nie został znaleziony w pliku "${fileName}". \n` +
          `[EN] Worksheet named "${sheetName}" was not found in the file "${fileName}".`,
      );
    }
    const cellValue = sheet.getRow(rowNum).getCell(cellNum).toString();
    return cellValue;
  }

  /**
   * Pobiera całą treść z pliku tekstowego o podanej ścieżce. /
   * Retrieves the entire content from a text file at the given path.
   */
  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  /**
   * Zapisuje podane dane do pliku tekstowego (nadpisuje istniejącą treść). /
   * Writes the given data to a text file (overwrites existing content).
   */
  async writeDataIntoTextFile(filePath: string, data: string): Promise<void> {
    fs.writeFile(filePath, data, (error: any) => {
      // Dodano : any
      if (error) throw error;
    });
  }

  /**
   * Metoda pomocnicza: Wyciąga tekst z pojedynczej strony obiektu PDF. /
   * Helper method: Extracts text from a single page of a PDF object.
   */
  async getPdfPageText(pdf: any, pageNo: number) {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map((token: any) => token.str).join('');
    return pageText;
  }

  /**
   * Odczytuje surowy tekst ze wszystkich stron wskazanego pliku PDF. /
   * Reads raw text from all pages of the specified PDF file.
   */
  async getPDFText(filePath: any): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const pdf = await pdfjslib.getDocument(dataBuffer).promise;
    const maxPages = pdf.numPages;
    const pageTextPromises = [];
    for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
      pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
    }
    const pageTexts = await Promise.all(pageTextPromises);
    return pageTexts.join(' ');
  }
}
