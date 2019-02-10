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

--Add a beer to  a venue's tap list
INSERT INTO beer_venue (beer, venue)
VALUES (:beerInput, :venueInput)

--Select all beers from the db
SELECT id, name, brwery, style, abv, ibu FROM beer 

--Select all beers for a single brewery
SELECT id, name, brewery, style FROM beer WHERE brewery = :breweryInput

--Select all beers for a single style
SELECT id, name, brewery, style FROM beer WHERE style = :styleInput

--Select all beers for a single venue
SELECT id, name, brewery, style FROM beer INNER JOIN beer_venue ON beer.id=beer_venue.beer WHERE beer_venue.venue=:venueInput

--Select all venues for venue page
SELECT id, name, city, state FROM venue

--Select a single venue
SELECT id, name, address, city, state FROM venue 

--Select all reviews for a beer
SELECT id, user_name, rev_date, rating, comments FROM review INNER JOIN beer ON review.beer=beer.id WHERE review.beer=:beerInput

--Update a beer in the db
UPDATE beer SET name=:nameInput, 
                brewery=:breweryInput, 
                style=:styleInput, 
                abv=:abvInput, 
                ibu=ibuInput
    WHERE id=:idInput

--Update a brewery
UPDATE brewery SET name=:nameInput, 
                country=:countryInput, 
                city=:cityInput, 
                state=:stateInput, 
    WHERE id=:idInput

--Remove a beer from the db
DELETE FROM beer WHERE id=:idInpupt