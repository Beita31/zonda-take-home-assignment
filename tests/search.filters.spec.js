import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage.js';
import SearchResultsPage from '../pages/SearchResultsPage.js';

test.describe('Search Filters – Price & Bedrooms', () => {
  test('applies filters and verifies filtered results (mocked)', async ({ page }) => {
    // --- Page Object Setup ---
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    // --- Step 1: Go to Homepage ---
    await home.goto();

    // --- Step 2: Type a search term + submit ---
    await home.typeSearch('Vancouver');
    await home.submitSearch();

    // --- Step 3: Mock network response (stub) ---
    await page.route('**/api/search**', async route => {
      const fakeResponse = {
        listings: [
          {
            id: 1,
            name: "Mock Condo",
            home_type: "Condo",
            address: "100 Mock St, Vancouver",
            bedrooms: 2,
            price: 500000,
            thumbnail: "mock.jpg"
          }
        ]
      };
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeResponse),
      });
    });

    // --- Step 4: Apply price filter ---
    await results.selectMinPrice('$300,000');
    await results.selectMaxPrice('$800,000');

    // --- Step 5: Apply bedrooms filter ---
    await results.selectBedrooms('2');

    // --- Step 6: Get listings from the page ---
    const cards = await results.getListingCards();

    // --- Step 7: Expect at least one result (because mocking was done) ---
    expect(cards.length).toBeGreaterThan(0);

    // --- STEP 8: Verify mandatory fields for first card ---
    const firstCard = cards[0];
    // Single validation to verify the respective mandatory fields for first result/card
    await results.verifyMandatoryFields(firstCard, expect);

  });
});