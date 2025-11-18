# Improvement Suggestions

- Add data-test-id attributes for stable automation
Add stable test hooks (data-test-id attributes) on listing cards and filter controls (e.g., data-test="listing-card", data-test="filter-min-price") — greatly improves test stability and reduces flakiness.

- Provide staging environment with seeded listings
Provide a test/staging API or read-only test DB snapshot and endpoints to seed deterministic data for automation (so tests can avoid brittle network stubbing and can validate real backend behavior).

- Implement nightly data integrity checks and search API monitoring
Monitoring & alerting on search correctness (data drift checks): implement a nightly job that runs sanity SQL checks (missing mandatory fields, price outliers) and smoke API tests (response time, sample query correctness) to detect data regressions early.
