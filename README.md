# zonda-take-home-assignment
QA Take-Home Assessment for Livabl.com’s Listing Search. Includes test plan, 8–10 structured test cases, exploratory charter, Playwright automation (smoke + filter tests), example SQL queries on an assumed logical schema, a sample defect report, and recommendations to improve search feature quality.

## Livabl QA Automation – Search Filtering Suite

This test suite validates core search behavior on Livabl.com using Playwright.
It includes:
- Smoke tests
- Filter behavior (price range + bedrooms)
- Network interception to stabilize dynamic data
- Page Object Model structure

## Assumptions

1. **Environment & Data Variability**
   - Livabl production data is dynamic and may change between runs.
   - Listing counts, filters, and card fields may vary based on real-time backend content.
   - Tests may use network interception or fallbacks to stabilize verification where needed.

2. **Page Navigation Flow**
   - All searches begin from the Homepage (https://www.livabl.com/), not from a dedicated search page.
   - Filters (Price Range, Bedrooms) are located only on the Search Results page.

3. **Mandatory Listing Card Fields**
   - A valid listing card must include, at minimum:
     - Home Name (title)
     - Thumbnail Image
     - Home Type information
     - Address (street + city/state)
     - "Price" and "Bedrooms" are **not mandatory**, because:
     - Some listings intentionally show "Pending", "Coming Soon" or similar placeholders.
     - Some cards hide placeholder price with CSS (`display: none`).
     - "Studio" units appear without numeric bedroom count; these are **not equivalent to “0 bedrooms”** then assummed it is for 0 bedrooms.

4. **UI Structure & Locators**
   - Listing cards always appear as `<a class="card">` inside `<div class="results">`.
   - Search input is located by placeholder “Enter community, location or company”.
   - Search button is located by accessible name “Search”.
   - Filters are accessed using stable labels (e.g., `getByLabel(/min price/i)`).

5. **Selectors / Accessibility Assumptions**
   - ARIA attributes, labels, and placeholders are assumed stable for locator reliability.
   - `getByRole` or `getByLabel` is preferred when available; fallback CSS used only when necessary.

6. **Bedroom Filter Semantics**
   - "Studio" does not always map to numeric bedrooms; UI does not present a “0 Bedroom” filter option.
   - Bedroom filter values (e.g., “2+”) follow Livabl’s existing internal logic.

7. **Pagination & Load Behavior**
   - Search Results use pagination (page numbers, forward/back arrows).
   - There is *no* “Load More” button.
   - "More" filter section is excluded from scope per requirements.

8. **Mock / Stub Usage**
   - Since backend data is unpredictable, the filter test verifies network calls contain the expected parameters (e.g., `min_price=500000`), serving as a stable assertion.
   - No sensitive or private endpoints are logged.

9. **Test Execution & Environment**
   - Tests run using Node.js v18+.
   - Playwright Test Runner is used with configuration declared on respective playwright.config.js file.
   - baseURL is set to the production site; no staging environment was provided.

10. **Database Schema Assumptions**
    - No real DB was provided, so a logical schema was assumed for SQL examples.
    - Fields assumed: id, title, price, bedrooms, home_type, street, city, state, thumbnail_url, status.
    - `state` is a 2-char code (e.g., “CA”), and `street` is a standard VARCHAR.

11. **Scope Exclusions**
    - Builder details, saving favorites, map interactions, lead forms, navigation menus, and “More” filters are not tested.
    - Non-functional tests (performance, SEO, accessibility audit) are noted but not executed.

## 🧩 Requirements
- Node.js v18+
- Playwright

## 📦 Install Dependencies
npm install
npm run install:deps

## ▶ Run All Tests
npx playwright test

## ▶ Run UI Mode
npx playwright test --ui

## 📂 Project Structure
/docs
  - data-sql-component.md
  - defect-report.md
  - exploratory-testing-charter.md
  - improvement-suggestions.md
  - screenshot-2025-11-17-12-36.png
  - test-cases.md
  - test-plan.md
/tests
  - search.smoke.spec.js
  - search.filter.spec.js
/pages
  - HomePage.js
  - SearchResultsPage.js
package.json
playwright.config.js
README.md