/*
 * Jest to przykładowa strona logowania wykorzystująca komponent ExampleComponent z /components.
 * Zobacz jak definiujemy komponenty jako atrybuty strony i inicjalizujemy je w konstruktorze. /
 * This is an example page using the ExampleComponent from /components.
 * See how we define components as page attributes and initialize them in the constructor.
 */

import { BasePage } from '../BasePage';
import { Button } from '../components/Button'; // Importujemy klasę komponentu
import { Page } from '@playwright/test';
import { ExampleComponent } from '../components/ExampleComponent';

export class ExamplePage extends BasePage {
  // Deklarujemy komponenty jako publiczne atrybuty strony. / Declare components as public attributes of the page.
  protected readonly path = 'NOT_A_REAL_PAGE'; // Definiujemy ścieżkę do tej strony. / Define the path to this page.
  public readonly component: ExampleComponent;

  constructor(page: Page) {
    super(page);
    // Inicjalizujemy komponenty w konstruktorze strony! / Initialize components in the page constructor!
    // Tutaj wpisujemy ich konkretne selektory dla TEJ strony. / This is where we provide their specific selectors for THIS page.
    this.component = new ExampleComponent(page, { root: 'button[type="submit"]' });
  }

  async doSomething(): Promise<void> {
    await this.exampleMethod();
  }

  private async exampleMethod() {
    // Przykładowa metoda strony, która korzysta z komponentu. / An example page method that uses the component.
    await this.component.doSomething('Hello from ExamplePage!');
  }
}

/*
 * ALTERNATYWA - jeśli chcemy mieć komponenty jako prywatne atrybuty, możemy zrobić to tak: /
 * ALTERNATIVE - if we want to have components as private attributes, we can do it like this:
 */

// import { BasePage } from '../basePage';
// import { Button } from '../components/button';

// export class ExamplePage extends BasePage {
//   protected readonly path = 'NOT_A_REAL_PAGE';
//   private readonly component: ExampleComponent;

//   async doSomething(): Promise<void> {
//     await this.exampleMethod();
//   }

//   private async exampleMethod() {
//     await this.component.doSomething('Hello from ExamplePage!');
//   }

/**
 * Jest to lepsze rozwiązanie, jeśli komponenty są tylko częścią implementacji strony i nie chcemy, aby były dostępne na zewnątrz.
 * Sprawdza się również lepiej, jeśli testujemy małe strony, dla których nie warto tworzyć osobnych klas komponentów. /
 * This is a better solution if the components are just part of the page implementation and we don't want them to be accessible from outside.
 * It also works better when testing small pages for which it's not worth creating separate component classes.
 */
