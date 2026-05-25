# 🛡️ MAGNUS: The Test Automation Engine

> "Magnus" (łac. Wielki) – profesjonalny boilerplate oparty na Playwright,
> zaprojektowany z myślą o pancernej stabilności i nieograniczonej skalowalności.

## 🌟 I. Wprowadzenie

Witaj w **Magnus Framework** – nowoczesnym, hybrydowym szkielecie do testów automatycznych. Projekt ten powstał z połączenia trzech potężnych podejść do automatyzacji, biorąc z każdego to, co najlepsze:

- **Struktura i Mechanika (Angelo Loria - https://github.com/angelo-loria/playwright-boilerplate):** Solidny wzorzec POM z wykorzystaniem komponentów i fixtures.
- **Narzędzia i Stabilność (Akshayp7 - https://github.com/akshayp7/playwright-typescript-playwright-test):** Zaawansowane WebActions, rozbudowane raportowanie w Allure i obsługa plików (PDF/Excel).
- **Komunikacja Biznesowa (Vitalets - https://github.com/vitalets/playwright-bdd):** Pełne wsparcie dla BDD (Gherkin/Cucumber).

---

## 🛠️ II. Dlaczego Fixtures? (Modern Approach)

Nasz framework rezygnuje z tradycyjnego, manualnego tworzenia obiektów stron w każdym teście na rzecz mechanizmu **Fixtures**.

**Dlaczego to przełomowe rozwiązanie?**

- **Wstrzykiwanie Zależności (DI):** Nie musisz pisać `const loginPage = new LoginPage(page)`. Playwright sam dostarcza gotowy obiekt strony prosto do argumentów testu.
- **Leniwa Inicjalizacja:** Obiekty stron są tworzone tylko wtedy, gdy test faktycznie ich potrzebuje, co oszczędza zasoby.
- **Czystość Kodu:** Testy stają się krótkie i skupione wyłącznie na logice biznesowej.
- **Integracja BDD:** Fixtures stanowią naturalny pomost dla kroków w Gherkinie, pozwalając na łatwe współdzielenie stanu między krokami.

---

## 📂 III. Struktura folderu `src`

Cała inteligencja frameworka jest odseparowana od samych testów i znajduje się w katalogu `src`.

### 🧩 `pageObjects/`

Serce wzorca POM (Page Object Model). Tutaj mapujemy interfejs aplikacji na kod.

- **`pages/`**: Klasy reprezentujące pełne strony (np. `login.page.ts`). Odpowiadają za nawigację i główne akcje na danym adresie URL.
- **`components/`**: Reużywalne klasy reprezentujące fragmenty interfejsu (od prostych przycisków i pól wyboru, po złożone struktury jak tabele, menu nawigacyjne, widgety, czy okna modalne). Pozwalają na atomowe podejście do budowy Page Objectów.
- **`base.page.ts`**: Klasa abstrakcyjna, która stanowi fundament dla każdej strony. To tutaj "montujemy" wspólne elementy jak Header czy Footer.
- **`base.pageComponent.ts`**: Klasa bazowa dla wszystkich komponentów. Zawiera wspólny konstruktor i podstawowe metody, dzięki czemu każdy widget czy menu w Twoim frameworku ma natywny dostęp do tych samych narzędzi (np. WebActions) bez powielania kodu.

### 🔌 `fixtures/`

Warstwa wstrzykiwania zależności (Dependency Injection), która automatyzuje tworzenie instancji stron i komponentów. Dzięki strukturze modułowej, framework pozwala na błyskawiczne budowanie scenariuszy testowych bez ręcznej inicjalizacji obiektów.

- **`pageFixture.ts`**: Fabryka instancji Page Objectów (np. `loginPage`). Odpowiada za definiowanie i dostarczanie konkretnych stron aplikacji do testów.
- **`componentFixture.ts`**: "Szwalnia" uniwersalnych komponentów (np. `navBar`, `footer`). To tutaj łączymy uniwersalne szablony klas z konkretnymi selektorami (configami) dla danej aplikacji.
- **`appFixture.ts`**: **Centrum Dowodzenia.** Wykorzystuje funkcję `mergeTests`, aby scalić fixtury stron i komponentów w jeden potężny obiekt `test`.

> **Ważna zasada:** W plikach testowych `*.spec.ts` zawsze importujemy `test` oraz `expect` z `appFixture.ts`. Dzięki temu w argumentach testu mamy od razu dostęp do wszystkich zdefiniowanych stron i komponentów (np. `async ({ loginPage, navBar }) => { ... }`).

### 🛠️ `utils/`

Skrzynka z narzędziami zwiększającymi stabilność i możliwości frameworka.

- **`WebActions.ts`**: Silnik operacyjny frameworka. Rozszerza standardowe akcje w kontekście przeglądarki o dodatkowe metody, w tym:
  - **Smart Clicks**: Obsługa kliknięć przez tekst oraz "awaryjnych" kliknięć przez JS.
  - **File Management**: Wbudowane metody do odczytu/zapisu plików tekstowych.
  - **Advanced Data Verification**: Natywne wsparcie dla wyciągania treści z plików PDF oraz danych z arkuszy Excel (.xlsx).
- **`testConfig.ts`**: Zarządzanie środowiskami (DEV/STAGE/PROD) oraz danymi wrażliwymi poprzez pliki `.env`.
- **`PDFUtil.ts` / `ExcelUtil.ts`** – Zaawansowana weryfikacja oraz odczyt plików nie-webowych (zintegrowane z WebActions).
- **`MailUtil.ts`**: Moduł przygotowany do obsługi poczty elektronicznej (np. przechwytywanie kodów MFA, linków aktywacyjnych). Wspiera integrację z profesjonalnymi API (Mailosaur) oraz darmowymi protokołami (IMAP).
- **`DBUtil.ts`**: Uniwersalny moduł typu _Plug & Play_ do komunikacji z bazami SQL.
  - **Wsparcie Multi-Database**: Gotowa konfiguracja dla **PostgreSQL** oraz **MySQL** (wymaga jedynie odkomentowania odpowiedniego sterownika).
  - **Rozszerzalność**: Architektura pozwala na łatwe dodanie wsparcia dla MS SQL Server, Oracle czy SQLite.
  - **Zaawansowane Akcje**: Poza surowymi zapytaniami, oferuje gotowe metody do:
    - `isRecordPresent`: Szybka weryfikacja istnienia danych.
    - `getSingleValue`: Pobieranie konkretnych identyfikatorów (np. ID zamówienia).
    - `truncateTable`: Automatyczne czyszczenie środowiska przed/po testach.

---

## 🥒 IV. Behavior-Driven Development (BDD)

Magnus wspiera podejście BDD przy użyciu biblioteki `playwright-bdd`. Pozwala to na pisanie scenariuszy testowych w języku naturalnym (Gherkin), przy jednoczesnym zachowaniu pełnej mocy naszych Page Objectów i Fixtur.

### 🏗️ Architektura Rozwiązania

Aby uniknąć konfliktów między tradycyjnymi testami `.spec.ts` a generowanymi testami BDD, framework wykorzystuje **Playwright Projects**.

- **Projekt `specs`**: Przeznaczony dla klasycznych testów technicznych (`tests/specs/*.spec.ts`).
- **Projekt `bdd`**: Przeznaczony dla testów biznesowych, operujący na folderze `.features-gen`.

### 🚦 Cykl pracy z testem BDD (Step-by-Step)

1. **Stworzenie Scenariusza**
   - W folderze `tests/features/` utwórz plik `.feature`.
   - Przykład: `tests/features/login.feature`.

2. **Definicja Kroków (Step Definitions)**
   - W folderze `tests/steps/` utwórz plik `.steps.ts`.
   - **Ważne:** Zawsze importuj `test` z `src/pageObjects/fixtures/appFixture`, aby zachować logowanie Allure i dostęp do POM.
   - Przykład: `import { test } from '../../src/pageObjects/fixtures/appFixture';`

3. **Generowanie Kodu (Synchronizacja)**
   - Każda zmiana w pliku `.feature` wymaga odświeżenia ukrytego folderu `.features-gen`:
     npx bddgen

---

## 🧪 V. Organizacja Testów

Stosujemy hybrydowy podział testów, oddzielając formę techniczną od priorytetu biznesowego:

### 📁 Struktura plików

- `tests/specs/` – **Scripted Tests** – testy pisane bezpośrednio w TypeScript. To główne miejsce na testy E2E, integracyjne, API, bezpieczeństwa oraz wydajnościowe. Pozwalają na pełne wykorzystanie mocy frameworka i wzorca POM.
- `tests/features/` – **BDD Scenarios** – opisy zachowań systemu w języku naturalnym (Gherkin), skupione na procesach biznesowych i czytelne dla osób nietechnicznych.
- `tests/steps/` – **Step Definitions** – techniczna implementacja kroków Gherkin, łącząca język biznesowy z logiką zapisaną w Page Objectach.

### 🏗️ Projekty (Playwright Projects)

Framework wykorzystuje system projektów do separacji środowisk testowych i przeglądarek. Pozwala to na precyzyjne uruchamianie konkretnych zestawów testów:

- **[SPEC]** – Projekty dedykowane testom technicznym (TypeScript).
- **[BDD]** – Projekty dedykowane scenariuszom biznesowym (Gherkin/Cucumber).

W konfiguracji `playwright.config.ts` zdefiniowano następujące grupy:

1.  **Desktop Browsers**: Pełne wsparcie dla silników Chromium (Chrome, Edge), Firefox oraz WebKit (Safari).
2.  **Branded Browsers**: Opcjonalna weryfikacja na konkretnych dystrybucjach (Google Chrome, MS Edge).
3.  **Mobile Emulation**: Emulacja urządzeń mobilnych (np. iPhone 16, Pixel 5) dla testów responsywności.
4.  **Lighthouse (WIP)**: Audyty wydajnościowe i dostępnościowe (w trakcie implementacji).

### ⌨️ Skrypty uruchomieniowe (CLI)

W celu uproszczenia pracy z frameworkiem przygotowano dedykowane skrypty w `package.json`. Każdy skrypt BDD automatycznie wywołuje generator (`bdd:gen`), zapewniając aktualność kodu testowego.

#### Wykonanie według typu:

- `npm run test:specs` – Uruchamia wszystkie testy techniczne na 3 głównych przeglądarkach.
- `npm run test:bdd` – Uruchamia wszystkie scenariusze biznesowe na 3 głównych przeglądarkach.

#### Wykonanie według platformy:

- `npm run test:desktop` – Kompleksowy test regresyjny na wszystkich desktopowych przeglądarkach (Chrome, Firefox, Safari) dla obu warstw (SPEC + BDD).
- `npm run test:mobile` – Uruchamia testy responsywności na emulowanych urządzeniach mobilnych (Android/iOS).
- `npm run test:branded` – Weryfikacja na stabilnych wersjach przeglądarek komercyjnych (Google Chrome, Microsoft Edge).

> **⚠️ Uwaga dot. projektów opcjonalnych:** Projekty z grup **Mobile** oraz **Branded** są w `playwright.config.ts` domyślnie zakomentowane. Pozwala to na skrócenie czasu trwania testów w standardowej kolejce CI/CD oraz zapobiega błędom na środowiskach, które nie posiadają zainstalowanych przeglądarek komercyjnych. Aby z nich skorzystać, odkomentuj odpowiednie sekcje w tablicy `projects`.

#### Wykonanie według przeglądarki:

- `npm run test:chromium` – Odpala zestaw SPEC + BDD tylko na silniku Chromium.
- `npm run test:firefox` – Odpala zestaw SPEC + BDD tylko na silniku Firefox.
- `npm run test:webkit` – Odpala zestaw SPEC + BDD tylko na silniku Safari.

#### Tryby specjalne:

- `npm run test:all` – Pełne wykonanie regresji (wszystkie projekty).
- `npm run test:ui` – Otwiera interaktywny interfejs Playwright UI Mode.
- `npm run test:debug` – Uruchamia testy w trybie debugowania (Playwright Inspector).

> **Pro Tip:** Przed każdym testem skrypt `pretest` automatycznie czyści wiszące procesy przeglądarki Chrome, co zapobiega blokowaniu plików i zwiększa stabilność lokalnych uruchomień.

### 🏷️ Kategoryzacja (Tagowanie)

W naszych projektach nie stosujemy sztywnego podziału na foldery. Zamiast tego używamy wielowarstwowego systemu **tagów**, co pozwala na precyzyjne sterowanie kolejką testową w CI/CD:

#### 🚀 Poziomy Krytyczności (Business Priority)

- `@smoke` – Błyskawiczny "health check" (czy aplikacja żyje?).
- `@critical` – Kluczowe procesy biznesowe (Critical Path), których awaria oznacza "stop" dla biznesu.
- `@regression` – Pełny zakres weryfikacji stabilności systemu.

#### 🛠️ Typy i Warstwy (Testing Type)

- `@ui` – Testy funkcjonalne przeprowadzane przez interfejs użytkownika.
- `@api` – Testy warstwy integracyjnej i punktów końcowych (szybkie i stabilne).
- `@visual` – Testy regresji wizualnej (porównywanie screenshotów/pixel-match).
- `@performance` – Testy wydajnościowe (czasy odpowiedzi, obciążenie).
- `@security` – Testy pod kątem podatności i uprawnień.

#### 🔍 Perspektywa i Ścieżki (Test Perspective)

- `@functional` – Standardowe funkcje aplikacji (Happy Path) niebędące krytycznymi procesami.
- `@negative` – Scenariusze negatywne (walidacja błędów, nieprawidłowe dane, brak uprawnień).
- `@edge-case` – Testy warunków brzegowych i nietypowych zachowań.

#### 🧪 Status i Stabilność

- `@flaky` – Testy o niestabilnych wynikach, które wymagają naprawy (odizolowane od głównego raportu).
- `@wip` – Testy w trakcie pisania (Work In Progress).

---

## ⚙️ VI. Zarządzanie Konfiguracją (`.env` & `testConfig`)

Framework wykorzystuje bezpieczny i elastyczny system zarządzania danymi testowymi, oddzielając logikę testów od parametrów środowiskowych.

### 🔐 Plik `.env` (Sekrety i Zmienne)

Wszystkie dane wrażliwe oraz parametry zależne od środowiska przechowywane są w pliku `.env` w głównym katalogu projektu. Plik ten jest ignorowany przez Git, co gwarantuje bezpieczeństwo haseł i kluczy API.

- **Dynamiczne adresy URL:** Możliwość szybkiego przełączania między środowiskami (QA, DEV).
- **Zmienne czasowe:** Centralne sterowanie czasem oczekiwania (`WAIT_FOR_ELEMENT`).

### 📄 Szablon Konfiguracji (`.env.example`)

W repozytorium znajduje się plik `.env.example`, który służy jako wzorzec struktury zmiennych.

- **Zastosowanie:** Dokumentuje on wszystkie wymagane klucze konfiguracji bez ujawniania rzeczywistych danych (haseł, prywatnych URL-i).
- **Instrukcja:** Aby uruchomić framework, skopiuj ten plik, zmień jego nazwę na `.env` i uzupełnij wartości zgodnie z Twoim środowiskiem testowym.

### 🧩 `testConfig.ts` (Twój Kontroler)

Plik `src/utils/testConfig.ts` działa jako inteligentny łącznik. Odczytuje on wartości z `.env` za pomocą biblioteki `dotenv` i udostępnia je reszcie frameworka w sposób ustrukturyzowany:

- **Typowanie:** Konwertuje tekstowe dane z `.env` na liczby lub typy logiczne (np. `parseInt` dla timeoutów).
- **Bezpieczniki (Fail-safes):** Definiuje wartości domyślne, dzięki którym testy nie zostaną przerwane nawet w przypadku braku pojedynczej zmiennej w pliku `.env`.

---

## 🏗️ VII. Hierarchia i Architektura Frameworka

Poniższe zestawienie opisuje strukturę, odpowiedzialności plików oraz przepływ zależności w naszym boilerplate.

### ⚙️ 1. Warstwa Konfiguracji (Dane & Środowisko)

_Decyduje o tym, GDZIE i JAK uruchamiamy testy._

**| Plik | Odpowiedzialność | Zależności (Importy) | Dostęp do... |**
| `.env` | Przechowywanie haseł, loginów i adresów URL (niecommitowane). | Brak | System operacyjny |
| `testConfig.ts` | Mapowanie zmiennych z `.env` na obiekt TypeScript. | `dotenv`, `path` | `.env` |
| `playwright.config.ts` | Konfiguracja silnika: timeouty, przeglądarki, raporty (Allure). | `testConfig.ts` | Cały framework |

---

### 🛠️ 2. Warstwa Narzędziowa (Utils)

_Specjaliści od zadań technicznych. "Mięśnie" frameworka._

**| Plik | Odpowiedzialność | Zależności | Użycie |**
| `WebActions.ts` | Pancerne akcje UI (click, fill), obsługa PDF i Excel. | `playwright`, `fs`, `exceljs`, `pdfjs` | Wstrzykiwany do `BasePage` |
| `MailUtils.ts` | Integracja z API poczty (odbieranie linków/kodów). | Biblioteka HTTP/API | Wywoływany w testach (Fixtures) |
| `DbUtils.ts` | Komunikacja z bazą danych (SQL/NoSQL). | Sterownik DB | Wywoływany w testach (Fixtures) |

---

## 🧱 3. Warstwa Abstrakcji POM (Fundament)

_Standardy dla wszystkich obiektów stron i komponentów._

**| Plik | Odpowiedzialność | Kluczowe cechy |**
| `BasePage.ts` | Klasa nadrzędna dla Stron. Inicjalizuje `WebActions`. | Posiada chroniony dostęp do `this.page` i `this.actions`. |
| `BasePageComponent.ts` | Klasa nadrzędna dla Komponentów (np. Navbar). | Operuje na `rootLocator` (zakres wewnątrz komponentu). |

---

### 🔌 4. Warstwa Fixtur

_Odwzorowanie aplikacji i automatyzacja wstrzykiwania zależności._

**| Plik | Odpowiedzialność | Działa na... |**
| `pageFixture.ts` | Fabryka instancji Stron (np. `loginPage`). | Klasy dziedziczące po `BasePage`. |
| `componentFixture.ts` | Fabryka instancji Komponentów (np. `navBar`). | Klasy dziedziczące po `BasePageComponent`. |
| `appFixture.ts` | Centrum Dowodzenia. Łączy wszystkie fixtury i dodatkowo zarządza tagami Allure. | `mergeTests` (punkt wejścia dla testów). |

### 🏗️ 5. Warstwa Implementacji (Concrete POM)

_Najniższy poziom hierarchii logiki biznesowej – konkretne odwzorowanie UI._

| Rodzaj | Odpowiedzialność | Przykład użycia |
| **Page Classes** | Definiowanie lokatorów i metod dla całych stron (E2E). | `LoginPage`, `CheckoutPage.ts`, `AccountPage.ts` |
| **Component Classes** | Definiowanie reużywalnych fragmentów UI (widżety, menu). | `NavBar.ts`, `SearchModal.ts`, `ProductCard.ts` |

> **Zasada przepływu:** Klasy implementacyjne dziedziczą po Fundamencie (3), są instancjonowane w Fixturach (4), a ich metody są ostatecznie wywoływane w Testach (`specs`).

---

## 🛡️ VIII. Quality Gate & Standardy Kodu

Framework wymusza najwyższą jakość kodu dzięki automatycznym mechanizmom kontroli. To nie tylko testy, to czysty kod.

- **ESLint v9 (Flat Config):** Korzystamy z najnowszego standardu konfiguracji (`eslint.config.mjs`). Narzędzie to nie tylko wykrywa błędy składniowe, ale pilnuje dobrych praktyk specyficznych dla Playwrighta (plugin `eslint-plugin-playwright`), co zapobiega pisaniu niestabilnych testów.
- **Prettier:** Działa jako "strażnik estetyki". Automatycznie ujednolica formatowanie plików (wcięcia, średniki, typ cudzysłowu). Dzięki integracji z ESLintem (`eslint-config-prettier`), oba narzędzia współpracują w pełnej harmonii – Prettier dba o wygląd, a ESLint o logikę kodu.
- **Git Discipline:** Dzięki odpowiedniej konfiguracji `.gitignore`, repozytorium pozostaje lekkie i bezpieczne – dane wrażliwe (`.env`) oraz ciężkie zależności (`node_modules`) nigdy nie trafiają do kontroli wersji.

---

## 📊 IX. Raportowanie (Allure Report)

Framework integruje się z **Allure Report**, dostarczając szczegółowe, wizualne raporty z przebiegu testów.

### ⚙️ Funkcje raportu:

- **Artefakty z Silnika**: Dzięki integracji z Playwright, Allure automatycznie załącza screenshoty oraz nagrania wideo generowane przy błędach (`on-failure`).
- **Analiza Trace Viewer**: Raport zawiera odnośniki do śladów (traces), które można pobrać i otworzyć w Trace Viewerze dla szczegółowej analizy osi czasu.
- **Dynamiczna Kategoryzacja**: System automatycznie mapuje tagi `@` z nazwy testu na natywne metadane Allure (Tags, Severity). Dzięki temu raporty są przejrzyste i pozwalają na zaawansowane filtrowanie bez dodatkowego kodu w testach.

### 🚀 Jak przeglądać raporty?

Po zakończeniu testów wykonaj poniższą komendę, aby wygenerować i otworzyć interaktywny raport w przeglądarce:
`npx allure serve allure-results`

### Gotowe skrypty Allure:

- `npm run allure:clear` – Czyści stare wyniki testów.
- `npm run allure:report` – Generuje i otwiera lokalny serwer z raportem Allure.

---

## ♿ X. Testy Dostępności (A11y)

Magnus wykorzystuje potężny silnik **Axe-core** (poprzez bibliotekę `@axe-core/playwright`), który jest branżowym standardem w automatyzacji audytów dostępności. Testy te weryfikują, czy aplikacja jest użyteczna dla osób z niepełnosprawnościami, zgodnie z wytycznymi **WCAG 2.1**.

### 🔍 Jak to działa?

Silnik analizuje drzewo DOM w czasie rzeczywistym, sprawdzając reguły dostępności bez konieczności manualnego skanowania. W Magnusie weryfikacja obejmuje:

- **Zgodność ze standardami:** Automatycznie sprawdzamy poziomy **A** oraz **AA** (tagi `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`).
- **Analiza kontrastu:** Algorytmy obliczają współczynnik luminancji tekstu względem tła.
- **Struktura semantyczna:** Weryfikacja poprawności tagów HTML5 (np. czy przyciski są tagami `<button>`, a nie pustymi `<div>`).
- **Interaktywność:** Sprawdzanie, czy elementy sterujące mają odpowiednie etykiety (`aria-label`, `label`) dla czytników ekranu (Screen Readers).

### 🛠️ Wykorzystanie w projekcie

Dzięki integracji w `BasePage`, audyt dostępności jest dostępny dla każdego Page Objectu. Można go wywołać zarówno w testach funkcyjnych (Specs), jak i w scenariuszach biznesowych (BDD).

**Przykład w kodzie (.spec.ts):**
`await dropdownPage.verifyAccessibility('Dropdown Page Audit');`

---

# 🛡️ MAGNUS: Instrukcja Szybkiego Startu

Ta instrukcja została zaprojektowana tak, aby umożliwić uruchomienie frameworka w 5 minut, niezależnie od poziomu zaawansowania użytkownika.

---

## 📋 I. Wymagania wstępne

Zanim zaczniesz, upewnij się, że na Twoim komputerze zainstalowane są:

- **Node.js** (zalecana wersja LTS) – [Pobierz tutaj](https://nodejs.org/)
- **VS Code** (edytor tekstu) – [Pobierz tutaj](https://code.visualstudio.com/)
- **Git** – [Pobierz tutaj](https://git-scm.com/)

---

## 📥 II. Instalacja krok po kroku

Podążaj za poniższymi krokami, aby przygotować środowisko Magnus i uruchomić pierwsze testy.

### 1. Klonowanie repozytorium

Pobierz projekt na swój dysk lokalny:
`git clone https://github.com/MRS-Qodeca/Magnus-Framework.git`
Aby przejść do katalogu nowego projektu, wpisz w terminalu:
`cd Magnus-Framework`

### 2. Instalacja zależności

Wykonaj komendę `npm install`. Pobierze ona wszystkie potrzebne paczki i zależności.

### 3. Instalacja przeglądarek Playwright

Pobierz niezbędne silniki przeglądarek (Chromium, Firefox, WebKit):
`npx playwright install`

### 4. Konfiguracja zmiennych środowiskowych

Framework korzysta z pliku `.env` do przechowywania wrażliwych danych i konfiguracji.

- Zmień nazwę pliku `.env.example` na `.env` w głównym katalogu projektu
- Wprowadź w nim dane środowiskowe dla docelowego projektu

### 5. Przygotowanie testów BDD (opcjonalnie)

Ponieważ Magnus korzysta z playwright-bdd, przed pierwszym uruchomieniem (lub po każdej zmianie w plikach .feature) należy wygenerować pliki testowe:
`npm run bdd:gen`

### 6. Uruchamianie testów

Możesz korzystać z predefiniowanych skryptów w `package.json`:

- Wszystkie testy (Spec + BDD): `npm run test:all`
- Wyłącznie testu typu Spec: `npm run test:specs`
- Wyłącznie testy typu BDD: `npm run test:bdd`
- Testy na Chromium: `npm run test:chromium`
- Tryb UI (Interaktywny): `npm run test:ui`
- Testy krytyczne (Tag @critical): `npm run test:critical`

Pozostałe skrypty zostały opisane w odpowiedniej sekcji w pliku `package.json`.

### 7. Raporty (opcjonalnie raporty Allure)

Aby wygenerować i otworzyć czytelny raport graficzny po testach:

**Playwright Test Report:**

- Wygenerowanie standardowego raportu Playwright: `npm run report`

**Allure**

- Wyczyszczenie starych wyników: `npm run allure:clear`
- Wygenerowanie i otwarcie raportu `npm run allure:report`
