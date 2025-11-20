export class HomePage {
    constructor(page) {
      this.page = page;
  
      // Search input on homepage
      // Robust locator: try ARIA role with accesible name, fallback to placeholder, fallback to generic input (last resort)
      this.searchInput = page.getByRole('textbox', { name: /Enter community, location or company/i })
      .or(page.getByPlaceholder('City, Neighborhood, Community, etc'))
      .or(page.locator('input[type="text"]'));

      // Submit button on homepage
      this.searchButton = page.getByRole('button', { name: /Search/i });
    }
  
    /**
     * Navigates to the homepage.
     * This is the entry point of the test and ensures we start from a clean page.
     */
     async goto() {
      await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    }
  
    // Types a search term into the search box.
    async typeSearch(term) {
      await this.searchInput.fill(term);
    }
  
    // Submits the search request by clicking the Search button and navigating to the results page
    async submitSearch() {
      await this.searchButton.click();
    }
  }