import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Smoke - Perform basic search from homepage', async ({ page }) => {
  // Initialize pages objects for interactions structure
  const home = new HomePage(page);
  const results = new SearchResultsPage(page);

  // Navigate to homepage as starting point
  await home.goto();

  // Enter a search term into the search field
  await home.typeSearch('Vancouver');

  // Click on the Search button to submit search request and navigate to Search Results Page
  await home.submitSearch();

  // Wait for the search results from Search Results Page to load and stabilize
  await results.waitForResults();

  // Retrieve all visible listing cards displayed after search
  const cards = await results.getListingCards();

  // Ensure at least one result exists to confirm search worked
  expect(cards.length).toBeGreaterThan(0);

  // Retrieve first listing card now search worked
  const firstCard = cards[0];

  // Single validation to verify the respective mandatory fields for first result/card
  await results.verifyMandatoryFields(firstCard, expect);








  



  // Check for Home Name (property title or community name).
  await expect(firstCard.getByRole('heading')).toBeVisible();

  // Check for Thumbnail Image (visual representation of the home).
  await expect(firstCard.locator('img')).toBeVisible();

  // Check for Home Type (e.g., Condo, Townhome, Single-Family).
  await expect(firstCard.getByText(/condo|town|home|apartment|suite|unit/i)).toBeVisible();

  // Check for Address (street + city or location).
  await expect(firstCard.getByText(/st|ave|road|rd|drive|dr|blvd|street|avenue|way/i)).toBeVisible();
});