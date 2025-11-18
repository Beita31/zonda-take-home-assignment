# Feature: Listing Search on Livabl.com
Users are able to search for listings and retrieve results using specific filters.

  Scenario: Basic keyword search retrieves listings
    Given I am on the Livabl homepage
    When I enter "Vancouver" into the search field
    And I submit the search
    Then at least one listing card should be displayed
    And each listing card should display the following:
      | a visible image |
      | a visible title (home name) | 
      | a visible build (home type information) |
      | a visible address |
      | either a visible price (numeric or related text information) or a hidden price placeholder |
      | either a visible bedroom count/range and square feet dimensions, or related upcoming floor plans text information, or a hidden floor plans placeholder |

  Scenario: Search with a term that yields zero results on Homepage
    Given I am on the Livabl homepage
    When I enter "zzzzrandomtext" into the search field
    Then I should see a "No results found for zzzzrandomtext." message
    And no listings should be displayed

  Scenario: Search with a term that yields zero results on Search Results page
    Given I am on the Livabl homepage
    When I enter "zzzzrandomtext" into the search field
    And I submit the search
    Then I should see a "No results match your search criteria" message
    And no listing cards should be displayed

  Scenario: Searching using special characters on Homepage
    Given I am on the Livabl homepage
    When I enter "!@#$%^&()" into the search field
    Then I should see a "No results found for !@#$%^&()." message as a valid response
    And the UI should not error, crash, or display broken components
    And no listings should be displayed

  Scenario: Handling excessively long search input on Search Results page
    Given I am on the Livabl homepage
    When I enter a very long location string (e.g., 300+ characters) into the search field
    And I submit the search
    Then the application should not crash or freeze
    And listing cards, or no results found message, or graceful fallback should display
    And the UI should remain functional for a new valid search

  Scenario: Applying the minimum allowed price filter
    Given I am on the search results page
    When I set the minimum price to the lowest selectable value
    And I apply the filter
    Then only listings with a visible price greater than or equal to that value should be shown
    And listings with the price not displayed should be accepted as valid results

  Scenario: Applying the maximum allowed price filter
    Given I am on the search results page
    When I set the maximum price to the highest selectable value
    And I apply the filter
    Then only listings with a visible price less than or equal to that value should be displayed
    And listings with the price not displayed should remain allowed

  Scenario: Filtering listings with 0 bedrooms or studio unit
    Given I am on the search results page
    When I apply a filter for "0 beds"
    Then listings that show "Studio" for bedrooms should be displayed
    And listings with bedroom values not displayed should also remain valid

  Scenario: Applying price and bedroom filters together
    Given I am on the search results page
    When I filter price between "$400,000" and "$550,000"
    And I filter for "2,3,4+ beds"
    Then all visible price values should be within the range
    And all visible bedroom values should show 2 or more
    And listings with the price and/or bedroom values not displayed should be allowed

  Scenario: Pagination boundary behavior on first, intermediate and last pages
    Given I am on the search results page with multiple pages of results
    # First page boundary
    When I am on page "1"
    Then the left arrow should be disabled or not clickable
    And the right arrow should be enabled
    And the current page indicator should highlight page "1"

    # Navigate to last page
    When I click the right arrow until the last numeric page is active
    Then the right arrow should be disabled or not clickable
    And the left arrow should be enabled
    And the current page indicator should highlight the last page number

    # Selecting a numeric page directly
    When I click a numeric page (e.g., "2")
    Then the page indicator should highlight page "2"
    And both arrows should be enabled unless page "2" is the first or last page
