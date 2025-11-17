# Test Plan — Listing Search (Livabl.com)

## 1. Feature Under Test
Listing Search functionality including:
- Search input (city/location)
- Price range filters
- Bedroom filters
- Listing results rendering
- Pagination
- Load More behavior

---

## 2. Objectives
- Validate that search returns accurate and relevant listings.
- Ensure filters apply correctly and consistently according to filter criteria (individually and combined).
- Confirm listing cards display all mandatory fields (title, price, bedrooms, location, thumbnail).
- Verify boundary conditions (minimum, maximum, input/output range exact values, transitions) and basic error behavior/handling (empty states, invalid inputs).
- Identify high-value automation candidates and design reliable automated data checks to verify backend correctness.

---

## 3. In Scope
- Search input behavior (city/location)
- Price min/max/input-output range exact values/transitions filtering
- Bedroom filtering
- Combined filter conditions for previous filters (price and bedroom)
- Listing card validation
- Pagination
- Load More behavior
- API error fallback behavior related to listings
- Basic data validation (SQL assumptions) related to listings
- Network responses (mocking for automation when data unstable).

## 4. Out of Scope
- Account or user profile features (Authentication, Log in, Sign up, Saved searches)
- Sorting options (price, square feet, relevance, etc.)
- Map-based search or map interactions (panning, zooming, pin clustering)
- Detailed listing pages (gallery, floorplans, contact forms)
- Comparisons of listings
- External integrations (external APIs not related to listings)
- Internationalization or localization testing (language/currency variations)
- Mobile responsiveness testing across device matrix
- Deep accessibility audit
- Performance or load testing beyond basic responsiveness
- Security testing beyond basic input validation (penetration testing, auth bypass)
- Extensive testing beyond basic regression checks on other listing filters (For sale, Home type) 

---

## 5. Assumptions
- Data on the live site is dynamic; automated filter tests may use network stubbing for determinism.
- No dedicated staging or seeded test environment is provided.
- API endpoints are undocumented; wildcard interception (`**/listings**`) will be used where needed as if Search API endpoint exists.
- DB schema unknown. Logical DB schema assumed for SQL validation examples.
- No proprietary or internal system details are accessed.
- Listing card fields are assumed stable - mandatory (title, price, bedrooms, city, thumbnail).
- Pagination implemented as either numbered pages or "Load more" button.
- User persona is a general homebuyer performing searches.

---

## 6. Risks & Mitigation
### Risks
- Dynamic real time data causing inconsistent automation results (data volatility)
- Unstable CSS selectors
- Pagination behavior tied to real-time backend data
- Filter logic dependent on API response anomalies

### Mitigations
- Use of network stubbing for deterministic tests
- Preferance ARIA or 'data-test-id' locators
- Page Object pattern to isolate UI changes
- Test critical flows first (risk-based prioritization)

---

## 7. High Level Test Types
### Manual
- Manual exploratory for UX issues
- Unexpected results
- Filter persistence
- Unstructured edge cases

### Automation (Playwright)
- Smoke test: basic search (city/location) and listing rendering with mandatory fields (title, price, bedrooms, city, thumbnail)
- Filter test: filtering using network mocking for reliable assertions (price range & bedrooms filter)
- Regression test: other basic filtering still works (For sale, Home type)

### Data Validation (SQL)
- Boundary price queries
- Listings missing mandatory fields
- Listings with incorrect metadata

### Non-functional (light)
- Basic responsiveness
- Handling of missing/slow API responses
- Basic performance smoke (e.g., search should respond < 2s)
- Accessibility spot-check (keyboard, ARIA labels)

---

## 8. Environment & Test Data Approach
- Environment: Live production site
- Data: Dynamic data; mock/stub responses for critical automated checks
- Sample JSON mocks stored under '/tests/fixtures/'
- Logical DB schema assumed for SQL validation examples

---

## 9. Prioritization Strategy
### Priority 1 — Critical
- Basic search flow & matching results (correctness)
- Mandatory listing fields

### Priority 2 — High
- Price and bedroom filters & matching results (individually and combined behaviors)
- Pagination consistency

### Priority 3 — Medium
- Boundary cases
- Empty states
- Input validation

### Priority 4 — Low
- API visual error handling
- Minor UX behaviors
- Basic performance responsiveness
- Accesibility

---

## 10. Exit Criteria
- All Priority 1 and 2 tests executed
- Automated smoke and filter suite passing
- No critical and high defects open
- Assumptions and risks documented
- README file includes clear run instructions

---

## 11. Deliverables
- Test Plan (test-plan.md - this document)
- Structured Test Cases ('/docs/test-cases.md')
- Exploratory Charter ('/docs/exploratory-testing-charter.md')
- Playwright automation suite ('/tests')
- SQL data validation queries ('/docs/data-sql-component.md')
- Defect report ('/docs/defect-report.md')
- Improvement suggestions ('/docs/improvement-suggestions.md')
