# Defect Report (one real from exploratory session)

## Title 
"Any Price" option is parsed incorrectly when selected at maximum price range

## Environment 
Live production site (https://livabl.com), Chrome 117 (Windows 10)

## Steps to Reproduce
- Go to Search page
- Enter a specific city or location (knowing beforehand results will be retrieved) in search box and submit OR just leave search box empty and submit.
- Set Min Price with any value but "Any Price".
- Set Max Price by selecting "Any Price".
- Observe results in price range parsed text.

## Expected
Price ranged text is parsed showing the correct values for the user to understand the range selected after selecting "Any Price" for max price. Since no specific requirement or acceptance criteria documented or known, expected a text similar to: "starting from 'min price'".

## Actual
Price range text is parsed incorrectly including "$NaN" as max price after selecting "Any Price".

## Evidence
(screenshot placeholder) screenshot-2025-11-17-12-36.png — shows filter settings with incorrect text parsing at max price after selection.

## Severity
Low (wrong parsing value on text display; user could confuse itself on price range text understanding after particular selection)

## Suggested fix hint
Investigate particular value selection translation on parsing — ensure filter that character parsing of selected max price range uses same value and not evaluate expecting a numeric selection for this case.
