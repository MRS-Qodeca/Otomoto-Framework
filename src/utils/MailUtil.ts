/**
 * [PL] UTIL DO OBSŁUGI POCZTY ELEKTRONICZNEJ
 * Ten moduł jest przygotowany do integracji z zewnętrznymi serwisami e-mail.
 * Planowane ścieżki integracji:
 * 1. Mailosaur (Płatne API) - Najwyższa stabilność, dedykowany do testów Enterprise.
 * 2. Darmowy protokół IMAP (np. imap-simple) - Rozwiązanie bezkosztowe dla standardowych skrzynek. /
 * * [EN] MAIL UTILITY
 * This module is designed to be integrated with e-mail services.
 * Planned integration paths:
 * 1. Mailosaur (Paid API) - Best stability, dedicated for Enterprise testing.
 * 2. Free IMAP protocol (e.g., imap-simple) - Cost-free solution for standard mailboxes.
 */

import { testConfig } from '../testConfig';

export class MailUtil {
  /**
   * Pobiera ostatnią wiadomość e-mail dla danego odbiorcy.
   * Tutaj docelowo znajdzie się integracja z API (np. Mailosaur). /
   * Fetches the latest email for a given recipient.
   * Here, the integration with the API (e.g., Mailosaur) will eventually be implemented.
   */
  async getLatestEmail(recipient: string) {
    console.log(`[MailUtil] Searching for mail to: ${recipient}`);
    // Tutaj wleci kod od wybranego dostawcy API / Here will be the code from the chosen API provider
    // Przykład: return await mailosaur.messages.get(serverDomain, { sentTo: recipient }); / Example: return await mailosaur.messages.get(serverDomain, { sentTo: recipient });
  }

  /**
   * Wyciąga kod weryfikacyjny z treści maila za pomocą wyrażenia regularnego (RegEx). /
   * Extracts the verification code from the email body using a regular expression (RegEx).
   */
  async extractVerificationCode(emailBody: string): Promise<string | null> {
    const codePattern = /\b\d{6}\b/; // Szuka ciągu 6 cyfr / Looks for a sequence of 6 digits
    const match = emailBody.match(codePattern);
    return match ? match[0] : null;
  }
}
