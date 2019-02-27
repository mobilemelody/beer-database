/****************************************************************
DATA DEFINITION LAGUAGE FOR BEER DATABASE
****************************************************************/

/* DROP EXISTING TABLES */
DROP TABLE IF EXISTS `beer_venue`;
DROP TABLE IF EXISTS `review`;
DROP TABLE IF EXISTS `db_user`;
DROP TABLE IF EXISTS `venue`;
DROP TABLE IF EXISTS `beer`;
DROP TABLE IF EXISTS `style`;
DROP TABLE IF EXISTS `brewery`;
DROP TABLE IF EXISTS `country`;

/*CREATE THE TABLES*/

/*CREATE COUNTRY TABLE*/
CREATE TABLE country (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

/*CREATE BREWERY TABLE*/
CREATE TABLE brewery (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    country INTEGER NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (country) REFERENCES country (id) ON DELETE CASCADE
);

/*CREATE STYLE TABLE*/
CREATE TABLE style (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(300),
    abv_range VARCHAR(20),
    ibu_range VARCHAR(20),
    PRIMARY KEY (id) 
);

/*CREATE BEER TABLE*/
CREATE TABLE beer (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    brewery INTEGER NOT NULL,
    style INTEGER NOT NULL,
    abv FLOAT,
    ibu INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (brewery) REFERENCES brewery (id) ON DELETE CASCADE,                   /*Review specific needs for each entitiy*/
    FOREIGN KEY (style) REFERENCES style (id) ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
);

/*CREATE VENUE TABLE*/
CREATE TABLE venue (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    PRIMARY KEY (id) 
);

/*CREATE USER TABLE*/
CREATE TABLE db_user (
    id INTEGER AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100),
    PRIMARY KEY (id) 
);

/*CREATE REVIEW TABLE*/
CREATE TABLE review (
    id INTEGER AUTO_INCREMENT,
    user_name INTEGER,
    beer INTEGER NOT NULL,
    rev_date DATE,
    rating INTEGER NOT NULL,
    comments VARCHAR(500),
    PRIMARY KEY (id),
    FOREIGN KEY (beer) REFERENCES beer (id) ON DELETE CASCADE, /*Review specific needs for each entitiy*/
    FOREIGN KEY (user_name) REFERENCES db_user (id) ON DELETE SET NULL
);

/*CREATE BEER_VENUE TABLE*/
CREATE TABLE beer_venue (
    beer INTEGER,
    venue INTEGER, 
    PRIMARY KEY (beer, venue),
    FOREIGN KEY (beer) REFERENCES beer (id) ON DELETE CASCADE, /*Review specific needs for each entitiy*/
    FOREIGN KEY (venue) REFERENCES venue (id) ON DELETE CASCADE /*Review specific needs for each entitiy*/
);

/* ADD SAMPLE DATA */
INSERT INTO country VALUES (1, 'United States');
INSERT INTO db_user VALUES (1, 'Melody', 'reebsm@oregonstate.edu'), (2, 'Brian', 'spragubr@oregonstate.edu');
INSERT INTO style VALUES (1, 'Pilsner', 'Pilsner (also pilsener or simply pils) is a type of pale lager. It takes its name from the Czech city of Pilsen, where it was first produced in 1842.', '4.2% - 5.4%', '35 - 45'), (2, 'IPA', 'India pale ale (IPA) is a hoppy beer style within the broader category of pale ale.', '5.0% - 9.7%', '40 - 120');
INSERT INTO brewery VALUES (1, 'Trumer Brauerei', 1, 'Berkeley', 'California'), (2, 'Modern Times Beer', 1, 'San Diego', 'California'), (3, 'Berryessa Brewing Co', 1, 'Winters', 'California');
INSERT INTO venue VALUES (1, 'Cato''s Ale House', '3891 Piedmont Ave', 'Oakland', 'California');
INSERT INTO beer VALUES (1, 'Trumer Pils', 1, 1, 4.9, 26), (2, 'Orderville', 2, 2, 7.2, 75), (3, 'Propaganda Pils', 3, 1, 6.0, 60);
INSERT INTO review VALUES (1, 1, 1, '2019-02-10', 5, 'Crisp and refreshing!');
INSERT INTO beer_venue VALUES (1, 1), (3, 1);