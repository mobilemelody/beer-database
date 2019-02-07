/****************************************************************
DATA DEFINITION LAGUAGE FOR BEER DATABASE
****************************************************************/

/* CREATE THE DATABASE */
CREATE DATABASE beer_db;

/*CREATE THE TABLES*/

/*CREATE BEER TABLE*/
CREATE TABLE beer (
    id INTEGER primary key auto_increment,
    name VARCHAR(100) NOT NULL,
    brewery INTEGER UNSIGNED NOT NULL FOREIGN KEY,
    style INTEGER UNSIGNED NOT NULL,
    abv FLOAT,
    ibu INTEGER,
    PRIMARY KEY (id) 
    CONSTRAINT 'fk_beer_brewery'
        FOREIGN KEY (beer.brewery) REFERENCES brewery (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
    CONSTRAINT 'fk_beer_style'
        FOREIGN KEY (beer.style) REFERENCES style (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
)

/*CREATE BREWERY TABLE*/
CREATE TABLE brewery (
    id INTEGER primary key auto_increment,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),                     /*May need to be VARCHAR(2) like state attribute in venue*/
    PRIMARY KEY (id) 
)

/*CREATE STYLE TABLE*/
CREATE TABLE style (
    id INTEGER primary key auto_increment,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    abv_range VARCHAR(10),
    ibu_range VARCHAR(10),
    PRIMARY KEY (id) 
)

/*CREATE VENUE TABLE*/
CREATE TABLE venue (
    id INTEGER primary key auto_increment,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(2) NOT NULL,
    PRIMARY KEY (id) 
)

/*CREATE REVIEW TABLE*/
CREATE TABLE review (
    id INT primary key auto_increment,
    user_name VARCHAR(100),             /*Might need to change in Schema from "user*/
    beer INTEGER,
    rev_date DATE DEFAULT CURRENT_DATE, /*Might need to change in Schema from "date*, as date is a keyword*/
    rating INTEGER NOT NULL,            /*Should be NOT NULL in schema*/
    comments VARCHAR(2),
    PRIMARY KEY (id)
    CONSTRAINT 'fk_review_beer'
        FOREIGN KEY (beer) REFERENCES beer (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
    CONSTRAINT 'fk_review_user'
        FOREIGN KEY (user) REFERENCES user (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
)

/*CREATE USER TABLE*/
CREATE TABLE user (
    id INT primary key auto_increment,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (id) 
)

/*CREATE BEER_VENUE TABLE*/
CREATE TABLE beer_venue (
    beer INTEGER,
    venue INTEGER, 
    PRIMARY KEY (beer, venue)
    CONSTRAINT 'fk_beer_venue_beer'
        FOREIGN KEY (beer) REFERENCES beer (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
    CONSTRAINT 'fk_beer_venue_venue'
        FOREIGN KEY (venue) REFERENCES venue (id)
        ON DELETE CASCADE                   /*Review specific needs for each entitiy*/
        ON UPDATE RESTRICT                  /*Review specific needs for each entitiy*/
)