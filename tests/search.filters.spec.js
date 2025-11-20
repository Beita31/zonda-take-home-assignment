import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import fs from 'fs';
import path from 'path';

// I load JSON fixture safely using fs
const mockSearchResponsePath = path.resolve('tests/fixtures/mockSearchResponse.json');
const mockSearchResponse = JSON.parse(fs.readFileSync(mockSearchResponsePath, 'utf8'));

test.describe('Listing Search – Filter Behaviors with Mocked API', () => {
  test('Applies filters and verifies filtered results (mocked)', async ({ page }) => {
    
    // --- Page Object Setup ---
    const home = new HomePage(page);
    const results = new SearchResultsPage(page);

    // --- Step 1: Mock network response (stub) ---
    // --- Setting up API stube before navigation ---
    await page.route('**/api/search**', async route => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockSearchResponse)
        });
      });

    // --- Step 2: Go to Homepage ---
    await home.goto();

    // --- Step 3: Type a search term + submit ---
    await home.typeSearch('Vancouver');
    await home.submitSearch();

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