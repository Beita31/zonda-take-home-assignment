```sql

Assumed Logical Schema

TABLE listings (
  id              UUID PRIMARY KEY,
  title           VARCHAR(255),     -- home name 
  price           DECIMAL(10,2),    -- stored in whole dollars
  bedrooms        INTEGER,          -- number of bedrooms
  home_type       ENUM('Condo', 'Townhouse', 'Single-Family-Home') NOT NULL, -- restricted list values
  street          VARCHAR(255),     -- street location
  city            VARCHAR(100),     -- city location
  state           CHAR(2),          -- state location
  thumbnail_url   VARCHAR(500),     -- URL to the listing image
  status          VARCHAR(20)       -- e.g., 'active', 'draft', 'sold'
);

# SQL Queries
1. Validate Price Range Boundary Correctness

Confirms listings fall within an applied filter range (e.g., 500k–800k), detecting out-of-range anomalies.

SELECT id, title, price
FROM listings
WHERE price < 500000
   OR price > 800000;

2. Find Listings Missing Critical Metadata

Checks for missing or null values based on logical “must-have” fields (e.g., title OR home_type OR street OR city OR State OR thumbnail_url).

SELECT id, title, home_type, street, city, state, price, bedrooms, city, thumbnail
FROM listings
WHERE title IS NULL
   OR home_type IS NULL
   OR street IS NULL
   OR city IS NULL
   OR state IS NULL
   OR thumbnail_url IS NULL;

3. Detect Invalid Bedroom Values (Studio as 0 Bedrooms)

Validates bedroom values are within acceptable domain limits.

SELECT id, title, bedrooms
FROM listings
WHERE bedrooms < 0;

```
