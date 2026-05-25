import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  protected readonly path = '/basic_auth'; // Definiujemy ścieżkę do tej strony. / Define the path to this page.
  private readonly successMessageLocator = 'p'; //Komunikat sukcesu jako <p> / Success message as <p>
  private readonly headerLocator = 'h3'; // Nagłówek strony jako <h3> / Page header as <h3>

  /**
   * Wykonuje logowanie z użyciem danych z configu. /
   * Performs login using credentials from the config.
   */
  async login() {
    await this.actions.enterValue('#username', this.config.username);
    await this.actions.enterValue('#password', this.config.password);
    await this.actions.clickElement('#login-button');
  }

  /**
   * Pobiera tekst komunikatu sukcesu (WebActions). /
   * Retrieves the text of the success message (WebActions).
   */
  async getSuccessText() {
    return await this.actions.getElementText(this.successMessageLocator);
  }

  /**
   * Pobiera tekst nagłówka strony (WebActions). /
   * Retrieves the text of the page header (WebActions).
   */
  async getHeaderText(): Promise<string | null> {
    return await this.actions.getElementText(this.headerLocator);
  }
}
