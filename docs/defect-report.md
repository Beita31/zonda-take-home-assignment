# Defect Report (one real from exploratory session)

## Title 
Incorrect Price Range Text Display when Max Price set to "Any Price"

## Environment 
- URL: https://www.livabl.com
- Browser version: Chrome 117
- Operating System: Windows 10
- Device: Desktop
- Environment: Live production site

## Steps to Reproduce
- Go to Search page
- Enter a specific city or location (knowing beforehand results will be retrieved) in search box and submit OR just leave search box empty and submit.
- Open the Price filter.
- Set Min Price to any value but "Any Price" (e.g., $400,000).
- Set Max Price by selecting "Any Price".
- Apply filters.
- Observe the parsed price range text displayed on the filter header.

## Expected
Parsed price range text should represent the correct values for the user to understand the range selected after choosing "Any Price" for max price. Since no specific requirement or specification documented or known, expected a text similar to: 
- "starting from 'min price'"
- "from 'min price'"
- "'min price' - Any Price"
- "'min price'+"

## Actual
Price range text shows incorrect and misleading value including "$NaN" after selecting "Any Price" as max price: "'min price' - $NaN".

## Evidence
Screenshot-2025-11-17-12-36.png — shows price range filter header with incorrect parsed price range text at max price after selection.

## Severity
Medium (wrong parsing value on price range text display)
- Filtering UX could become confusing after particular selection
- Search accuracy affectation
- Misleading or unclear price range feedback to users

## Suggested fix hint
- Ensure the price-range parsing logic handles cases where Max Price = "Any Price"
- Implement standardized display logic for said cases where Max Price = "Any Price" following examples mentioned above:
  - "starting from 'min price'"
  - "from 'min price'"
  - "'min price' - Any Price"
  - "'min price'+"
- Validate backend and frontend formatting align on empty or null max price values.
