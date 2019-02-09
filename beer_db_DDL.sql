/****************************************************************
DATA DEFINITION LAGUAGE FOR BEER DATABASE
****************************************************************/

/* CREATE THE DATABASE */
CREATE DATABASE beer_db;

/*CREATE THE TABLES*/

/*CREATE BREWERY TABLE*/
CREATE TABLE brewery (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),                     /*May need to be VARCHAR(2) like state attribute in venue*/
    PRIMARY KEY (id) 
);

/*CREATE STYLE TABLE*/
CREATE TABLE style (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    abv_range VARCHAR(10),
    ibu_range VARCHAR(10),
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
    state VARCHAR(100) NOT NULL,        /*Updated character count*/
    PRIMARY KEY (id) 
);

/*CREATE USER TABLE*/
CREATE TABLE db_user (
    id INT AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (id) 
);

/*CREATE REVIEW TABLE*/
CREATE TABLE review (
    id INT AUTO_INCREMENT,
    user_name INTEGER,             /*Might need to change in Schema from "user*/
    beer INTEGER,
    rev_date DATE, /*Might need to change in Schema from "date*, as date is a keyword*/
    rating INTEGER NOT NULL,            /*Should be NOT NULL in schema*/
    comments VARCHAR(2),
    PRIMARY KEY (id),
    FOREIGN KEY (beer) REFERENCES beer (id) ON DELETE CASCADE, /*Review specific needs for each entitiy*/
    FOREIGN KEY (user_name) REFERENCES db_user (id) ON DELETE CASCADE /*Review specific needs for each entitiy*/
);

/*CREATE BEER_VENUE TABLE*/
CREATE TABLE beer_venue (
    beer INTEGER,
    venue INTEGER, 
    PRIMARY KEY (beer, venue),
    FOREIGN KEY (beer) REFERENCES beer (id) ON DELETE CASCADE, /*Review specific needs for each entitiy*/
    FOREIGN KEY (venue) REFERENCES venue (id) ON DELETE CASCADE /*Review specific needs for each entitiy*/
);