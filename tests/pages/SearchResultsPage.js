export class SearchResultsPage {
  constructor(page) {
    this.page = page;

    // Filters

    /** 
     * Listing cards
     * No ARIA role exists, fallback to CSS cards
     * Returns all visible listing cards inside the results container.
     * The Livabl structure uses <a class="card"> elements nested within
     * <div class="results">
     */
    this.resultsSection = page.locator('div.results');
    this.cards = page.locator('div.results a.card');

    // Pagination
    
  }

  // Wait for the search results from page to load and stabilize
  async waitForResults() {
    await this.resultsSection.waitFor();
  }

  // Returns all visible listing cards inside the results container
  async getListingCards() {
    return this.cards.all();
  }

  // Helpers to get card sub-elements details on Search Results Page
  getCardName(card) {
    return card.locator('div.details div.name');
  }

  getCardThumbnail(card) {
    return card.locator('img.image.primary-image');
  }

  getCardHomeType(card) {
    return card.locator('div.details div.build');
  }

  getCardAddress(card) {
    return card.locator('div.details div.address');
  }

  // waits to perform all mandatory field checks (display) validation on card/result
  async verifyMandatoryFields(card, expect) {
    await expect(this.getCardName(card)).toBeVisible();
    await expect(this.getCardThumbnail(card)).toBeVisible();
    await expect(this.getCardHomeType(card)).toBeVisible();
    await expect(this.getCardAddress(card)).toBeVisible();
  }
}