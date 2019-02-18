/****************************************************************
DATA MANIPULATION LAGUAGE FOR BEER DATABASE
****************************************************************/

/* ADD QUERIES */
-- Add a beer
INSERT INTO beer (name, brewery, style, abv, ibu)
VALUES (:nameInput, :breweryInput, :styleInput, :abvInput, :ibuInput)

-- Add a brewery
INSERT INTO brewery (name, country, state, city)
VALUES (:nameInput, :countryInput, :stateInput, :cityInput)

-- Add a style
INSERT INTO style (name, description, abv_range, ibu_range)
VALUES (:nameInput, :descriptionInput, :abv_rangeInput, :ibu_rangeInput)

-- Add a venue
INSERT INTO venue (name, address, city, state)
VALUES (:nameInput, :addressInput, :cityInput, :stateInput)

-- Add a review
INSERT INTO review (user_name, beer, rev_date, rating, comments)
VALUES (:user_nameInput, :beerInput, :rev_dateInput, :ratingInput, :commentsInput)

-- Add a user
INSERT INTO db_user (user_name, email)
VALUES (:user_nameInput, :emailInput)

-- Add a beer to  a venue's tap list
INSERT INTO beer_venue (beer, venue)
VALUES (:beerInput, :venueInput)

/* SEARCH PAGE */
-- Search for beers matching criteria
SELECT beer.id, beer.name, brewery.id, brewery.name, style.id, style.name, AVG(review.rating) AS avg_rating
FROM beer 
INNER JOIN brewery ON beer.brewery=brewery.id
INNER JOIN style ON beer.style=style.id 
LEFT JOIN review ON beer.id=review.beer
WHERE beer.name LIKE CONCAT('%', :searchInput, '%') 
    OR brewery.name LIKE CONCAT('%', :searchInput, '%') 
    OR style.name LIKE CONCAT('%', :searchInput, '%') 
GROUP BY beer.id 

/* BEER PAGES */
-- Show beers in descending order based on average rating
SELECT beer.id, beer.name, brewery.id, brewery.name, style.id, style.name, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews
FROM beer
INNER JOIN brewery ON beer.brewery=brewery.id
INNER JOIN style ON beer.style=style.id
LEFT JOIN review ON beer.id=review.beer
GROUP BY beer.id 
ORDER BY avg_rating DESC

-- Select individual beer
SELECT * FROM beer WHERE id=:idInput

-- Select reviews for individual beer
SELECT * FROM review WHERE beer=:beerInput

-- Select all users sorted alphabetically for dropdown in reviews form
SELECT id, user_name FROM db_user ORDER BY user_name ASC

-- Select all breweries sorted alphabetically for dropdown in beer form
SELECT id, name FROM brewery ORDER BY name ASC

-- Select all styles sorted alphabetically for dropdown in beer form
SELECT id, name FROM style ORDER BY name ASC

/* STYLE PAGES */
-- Select all styles, list alphabetically and show number of beers per style
SELECT style.id, style.name, COUNT(beer.id)
FROM style 
LEFT JOIN beer ON style.id=beer.style
GROUP BY style.id
ORDER BY style.name ASC

-- Select individual style
SELECT * FROM style WHERE id=:idInput

-- Select all beers for a single style sorted by average rating
SELECT beer.id, beer.name, brewery.id, brewery.name, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews
FROM beer
INNER JOIN brewery ON beer.brewery=brewery.id
LEFT JOIN review ON beer.id=review.beer
WHERE beer.style=:styleInput
GROUP BY beer.id
ORDER BY avg_rating DESC

/* BREWERY PAGES */
-- Select all breweries sorted by average beer rating
SELECT brewery.id, brewery.name, AVG(review.rating) AS avg_rating, COUNT(beer.id) AS num_reviews
FROM brewery
LEFT JOIN beer ON brewery.id=beer.brewery
LEFT JOIN review ON beer.id=review.beer
GROUP BY brewery.id
ORDER BY avg_rating DESC

-- Select individual brewery
SELECT brewery.id, brewery.name, brewery.city, brewery.state, country.name 
FROM brewery
INNER JOIN country ON brewery.country=country.id
WHERE brewery.id=:idInput

-- Select all beers for a single brewery sorted by average rating
SELECT beer.id, beer.name, style.id, style.name, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews
FROM beer
INNER JOIN style ON beer.style=style.id
LEFT JOIN review ON beer.id=review.beer
WHERE beer.brewery=:breweryInput
GROUP BY beer.id
ORDER BY avg_rating DESC

-- Select all countries sorted alphabetically for dropdown in brewery form
SELECT * FROM country

/* VENUE PAGES */
-- Select all cities and states
SELECT DISTINCT state, city FROM venue ORDER BY state, city

-- Select all venues for single state
SELECT venue.id, venue.name, venue.city, COUNT(beer_venue.beer) AS num_beers
FROM venue
LEFT JOIN beer_venue ON venue.id=beer_venue.venue
WHERE venue.state=:stateInput
GROUP BY venue.id
ORDER BY venue.name ASC

-- Select all venues for single city
SELECT venue.id, venue.name, venue.address, COUNT(beer_venue.beer) AS num_beers
FROM venue
LEFT JOIN beer_venue ON venue.id=beer_venue.venue
WHERE venue.city=:cityInput
GROUP BY venue.id
ORDER BY venue.name ASC

-- Select a single venue
SELECT * FROM venue 

-- Select all beers for a single venue sorted alphabetically
SELECT beer.id, beer.name, brewery.id, brewery.name, style.id, style.name, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews
FROM beer 
INNER JOIN beer_venue ON beer.id=beer_venue.beer
INNER JOIN brewery ON beer.brewery=brewery.id
INNER JOIN style ON beer.style=style.id 
LEFT JOIN review ON beer.id=review.beer
WHERE beer_venue.venue=:venueInput
GROUP BY beer.id
ORDER BY beer.name ASC

/* REVIEW PAGE */
-- Selects 10 most recent reviews
SELECT * FROM review ORDER BY rev_date DESC LIMIT 10

/* USER PAGES */
-- Select all users sorted by number of reviews
SELECT db_user.id, db_user.user_name, COUNT(review.id) AS num_reviews
FROM db_user
LEFT JOIN review ON db_user.id=review.user_name
GROUP BY db_user.id
ORDER BY num_reviews DESC

-- Select all reviews by user sorted by most recent
SELECT *
FROM review
WHERE user_name=:userInput
ORDER BY rev_date DESC

/* UPDATE QUERIES */
-- Update a beer
UPDATE beer SET name=:nameInput, 
                brewery=:breweryInput, 
                style=:styleInput, 
                abv=:abvInput, 
                ibu=ibuInput
    WHERE id=:idInput

-- Update a brewery
UPDATE brewery SET name=:nameInput, 
                description=:descriptionInput, 
                country=countryInput,
                city=:cityInput, 
                state=:stateInput
    WHERE id=:idInput

-- Update a style
UPDATE style SET name=:nameInput, 
                address=:addressInput, 
                abv_range=:abv_rangeInput, 
                ibu_range=:ibu_rangeInput 
    WHERE id=:idInput

-- Update a venue
UPDATE venue SET name=:nameInput, 
                address=:addressInput, 
                city=:cityInput, 
                state=:stateInput
    WHERE id=:idInput

/* DELETE QUERIES */
-- Remove a beer from the db
DELETE FROM beer WHERE id=:idInput

-- Remove a venue from the db
DELETE FROM venue WHERE id=:idInput

-- Remove a beer from a venue
DELETE FROM beer_venue WHERE beer=:beerInput AND venue=:venueInput