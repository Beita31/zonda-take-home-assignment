export class SearchResultsPage {
  constructor(page) {
    this.page = page;

    // Filters
    this.priceFilter = page.getByLabel('select prices');
    this.bedroomsFilter = page.getByLabel('select bedrooms');


    /** 
     * Listing cards
     * No ARIA role exists, fallback to CSS cards
     * Returns all visible listing cards inside the results container.
     * The Livabl structure uses <a class="card"> elements nested within
     * <div class="results">
     */
    this.resultsSection = page.locator('div.results');
    this.cards = page.locator('div.results a.card');
    
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

  // Dropdowns / Filter selectors functions to select corresponding min price
  async selectMinPrice(value) {
    // Open the price dropdown
    await this.priceFilter.click();
  
    // Click the matching <li> under <ul id="minpricedw">
    const option = this.page.locator('#minpricedw li.minpricelist', { hasText: value });
    await option.waitFor(); // ensures dropdown rendered
    await option.click();
  }

  // Dropdowns / Filter selectors functions to select corresponding max price
  async selectMaxPrice(value) {
    // Open the price dropdown
    await this.priceFilter.click();
  
    // Click the matching <li> under <ul id="maxpricedw">
    const option = this.page.locator('#maxpricedw li.maxpricelist', { hasText: value });
    await option.waitFor(); // ensures dropdown rendered
    await option.click();
  }

  // Dropdowns / Filter selectors functions to select corresponding bedrooms
  async selectBedrooms(value) {
    // Open the bedrooms dropdown
    await this.bedroomsFilter.click();
  
    // Click the matching <label> under <div id="bd">
    const option = this.page.locator('#bd label.container.item', { hasText: value });
    await option.waitFor(); // ensures dropdown rendered
    await option.click();
  }
  
}
