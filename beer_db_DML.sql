/****************************************************************
DATA MANIPULATION LAGUAGE FOR BEER DATABASE
****************************************************************/

--Add a beer
INSERT INTO beer (name, brewery, style, abv, ibu)
VALUES (:nameInput, :breweryInput, :styleInput, :abvInput, :ibuInput)

--Add a brewery
INSERT INTO brewery (name, country, state, city)
VALUES (:nameInput, :countryInput, :stateInput, :cityInput)

--Add a style
INSERT INTO style (name, description, abv_range, ibu_range)
VALUES (:nameInput, :descriptionInput, :abv_rangeInput, :ibu_rangeInput)

--Add a venue
INSERT INTO venue (name, address, city, state)
VALUES (:nameInput, :addressInput, :cityInput, :stateInput)

--Add a review
INSERT INTO review (user_name, beer, rev_date, rating, comments)
VALUES (:user_nameInput, :beerInput, :rev_dateInput, :ratingInput, :commentsInput)

--Add a user
INSERT INTO db_user (user_name, email)
VALUES (:user_nameInput, :emailInput)

--Add a beer to  a venue's tap list
INSERT INTO beer_venue (beer, venue)
VALUES (:beerInput, :venueInput)

--Search for beers matching criteria
SELECT id, beer.name, brewery.name, style.name, beer.abv, beer.ibu AVG(review.rating) FROM beer 
INNER JOIN brewery ON beer.brewery=brewery.id
INNER JOIN style ON beer.style=style.id 
LEFT JOIN review ON beer.id=review.beer
WHERE name LIKE '%'+:searchInput+'%' 
    OR brewery.name LIKE '%'+:searchInput+'%' 
    OR style.name LIKE '%'+:searchInput+'%'
GROUP BY beer.id 

--Show beers in descending order based on average rating
SELECT beer.id, beer.name, brewery.name, style.name, beer.abv, beer.ibu, AVG(review.rating) FROM beer
INNER JOIN  brewery ON beer.brewery=brewery.id
INNER JOIN  style ON beer.style=style.id
LEFT JOIN review ON beer.id=review.beer
GROUP BY beer.id 
ORDER BY review.rating DESC

--Select all breweries
SELECT id, name, country, state, city FROM brewery 

--Select all styles, list alphabetically and show number of beers per style
SELECT style.id, style.name, COUNT(beer.id) FROM style 
INNER JOIN beer ON style.id=beer.style
GROUP BY style.id
ORDER BY style.name ASC

--Select all beers for a single brewery
SELECT id, name, brewery, style FROM beer WHERE brewery = :breweryInput

--Select all beers for a single style
SELECT id, name, brewery, style FROM beer WHERE style = :styleInput

--Select all beers for a single venue
SELECT id, name, brewery, style FROM beer 
INNER JOIN beer_venue ON beer.id=beer_venue.beer WHERE beer_venue.venue=:venueInput

--Select all venues for venue page
SELECT id, name, city, state FROM venue

--Select a single venue
SELECT id, name, address, city, state FROM venue 

--Select all reviews for a beer
SELECT id, user_name, rev_date, rating, comments FROM review 
INNER JOIN beer ON review.beer=beer.id WHERE review.beer=:beerInput

--Update a beer
UPDATE beer SET name=:nameInput, 
                brewery=:breweryInput, 
                style=:styleInput, 
                abv=:abvInput, 
                ibu=ibuInput
    WHERE id=:idInput

--Update a brewery
UPDATE brewery SET name=:nameInput, 
                description=:descriptionInput, 
                country=countryInput,
                city=:cityInput, 
                state=:stateInput
    WHERE id=:idInput

--Update a style
UPDATE style SET name=:nameInput, 
                address=:addressInput, 
                abv_range=:abv_rangeInput, 
                ibu_range=:ibu_rangeInput 
    WHERE id=:idInput

--Update a venue
UPDATE venue SET name=:nameInput, 
                address=:addressInput, 
                city=:cityInput, 
                state=:stateInput
    WHERE id=:idInput

--Update a review's rating, comments, and date
UPDATE review SET rev_date=:rev_dateInput, 
                rating=:ratingInput, 
                comments=:commentsInput  
    WHERE id=:idInput

--Update a user's email address
UPDATE db_user SET email=:emailInput 
    WHERE id=:idInput

--Remove a beer from the db
DELETE FROM beer WHERE id=:idInpupt

--Remove a style from the db
DELETE FROM style WHERE id=:idInpupt

--Remove a brewery from the db
DELETE FROM brewery WHERE id=:idInpupt

--Remove a venue from the db
DELETE FROM venue WHERE id=:idInpupt

--Remove a review from the dp
DELETE FROM review WHERE id=:idInpupt

--Remove a user from the db
DELETE FROM db_user WHERE id=:idInpupt

--Remove a beer from a venue
DELETE FROM beer_venue WHERE id=:idInpupt