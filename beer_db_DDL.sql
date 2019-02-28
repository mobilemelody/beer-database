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
/* Modified from https://github.com/raramuridesign/mysql-country-list/blob/master/mysql-country-list.sql */
INSERT INTO country (name) VALUES ('Afghanistan'),('Albania'),('Algeria'),('American Samoa'),('Andorra'),('Angola'),('Anguilla'),('Antarctica'),('Antigua and Barbuda'),('Argentina'),('Armenia'),('Aruba'),('Australia'),('Austria'),('Azerbaijan'),('Bahamas'),('Bahrain'),('Bangladesh'),('Barbados'),('Belarus'),('Belgium'),('Belize'),('Benin'),('Bermuda'),('Bhutan'),('Bolivia'),('Bosnia and Herzegovina'),('Botswana'),('Bouvet Island'),('Brazil'),('British Indian Ocean Territory'),('Brunei Darussalam'),('Bulgaria'),('Burkina Faso'),('Burundi'),('Cambodia'),('Cameroon'),('Canada'),('Cape Verde'),('Cayman Islands'),('Central African Republic'),('Chad'),('Chile'),('China'),('Christmas Island'),('Cocos (Keeling) Islands'),('Colombia'),('Comoros'),('Congo'),('Cook Islands'),('Costa Rica'),('Croatia (Hrvatska)'),('Cuba'),('Cyprus'),('Czech Republic'),('Denmark'),('Djibouti'),('Dominica'),('Dominican Republic'),('East Timor'),('Ecuador'),('Egypt'),('El Salvador'),('Equatorial Guinea'),('Eritrea'),('Estonia'),('Ethiopia'),('Falkland Islands (Malvinas)'),('Faroe Islands'),('Fiji'),('Finland'),('France'),('France, Metropolitan'),('French Guiana'),('French Polynesia'),('French Southern Territories'),('Gabon'),('Gambia'),('Georgia'),('Germany'),('Ghana'),('Gibraltar'),('Guernsey'),('Greece'),('Greenland'),('Grenada'),('Guadeloupe'),('Guam'),('Guatemala'),('Guinea'),('Guinea-Bissau'),('Guyana'),('Haiti'),('Heard and Mc Donald Islands'),('Honduras'),('Hong Kong'),('Hungary'),('Iceland'),('India'),('Isle of Man'),('Indonesia'),('Iran (Islamic Republic of)'),('Iraq'),('Ireland'),('Israel'),('Italy'),('Ivory Coast'),('Jersey'),('Jamaica'),('Japan'),('Jordan'),('Kazakhstan'),('Kenya'),('Kiribati'),('Korea, Democratic People''s Republic of'),('Korea, Republic of'),('Kosovo'),('Kuwait'),('Kyrgyzstan'),('Lao People''s Democratic Republic'),('Latvia'),('Lebanon'),('Lesotho'),('Liberia'),('Libyan Arab Jamahiriya'),('Liechtenstein'),('Lithuania'),('Luxembourg'),('Macau'),('Macedonia'),('Madagascar'),('Malawi'),('Malaysia'),('Maldives'),('Mali'),('Malta'),('Marshall Islands'),('Martinique'),('Mauritania'),('Mauritius'),('Mayotte'),('Mexico'),('Micronesia, Federated States of'),('Moldova, Republic of'),('Monaco'),('Mongolia'),('Montenegro'),('Montserrat'),('Morocco'),('Mozambique'),('Myanmar'),('Namibia'),('Nauru'),('Nepal'),('Netherlands'),('Netherlands Antilles'),('New Caledonia'),('New Zealand'),('Nicaragua'),('Niger'),('Nigeria'),('Niue'),('Norfolk Island'),('Northern Mariana Islands'),('Norway'),('Oman'),('Pakistan'),('Palau'),('Palestine'),('Panama'),('Papua New Guinea'),('Paraguay'),('Peru'),('Philippines'),('Pitcairn'),('Poland'),('Portugal'),('Puerto Rico'),('Qatar'),('Reunion'),('Romania'),('Russian Federation'),('Rwanda'),('Saint Kitts and Nevis'),('Saint Lucia'),('Saint Vincent and the Grenadines'),('Samoa'),('San Marino'),('Sao Tome and Principe'),('Saudi Arabia'),('Senegal'),('Serbia'),('Seychelles'),('Sierra Leone'),('Singapore'),('Slovakia'),('Slovenia'),('Solomon Islands'),('Somalia'),('South Africa'),('South Georgia South Sandwich Islands'),('South Sudan'),('Spain'),('Sri Lanka'),('St. Helena'),('St. Pierre and Miquelon'),('Sudan'),('Suriname'),('Svalbard and Jan Mayen Islands'),('Swaziland'),('Sweden'),('Switzerland'),('Syrian Arab Republic'),('Taiwan'),('Tajikistan'),('Tanzania, United Republic of'),('Thailand'),('Togo'),('Tokelau'),('Tonga'),('Trinidad and Tobago'),('Tunisia'),('Turkey'),('Turkmenistan'),('Turks and Caicos Islands'),('Tuvalu'),('Uganda'),('Ukraine'),('United Arab Emirates'),('United Kingdom'),('United States'),('United States minor outlying islands'),('Uruguay'),('Uzbekistan'),('Vanuatu'),('Vatican City State'),('Venezuela'),('Vietnam'),('Virgin Islands (British)'),('Virgin Islands (U.S.)'),('Wallis and Futuna Islands'),('Western Sahara'),('Yemen'),('Zaire'),('Zambia'),('Zimbabwe');
INSERT INTO db_user VALUES (1, 'Melody', 'reebsm@oregonstate.edu'), (2, 'Brian', 'spragubr@oregonstate.edu');
INSERT INTO style VALUES (1, 'Pilsner', 'Pilsner (also pilsener or simply pils) is a type of pale lager. It takes its name from the Czech city of Pilsen, where it was first produced in 1842.', '4.2% - 5.4%', '35 - 45'), (2, 'IPA', 'India pale ale (IPA) is a hoppy beer style within the broader category of pale ale.', '5.0% - 9.7%', '40 - 120');
INSERT INTO brewery VALUES (1, 'Trumer Brauerei', (SELECT id FROM country WHERE name='United States'), 'Berkeley', 'California'), (2, 'Modern Times Beer', (SELECT id FROM country WHERE name='United States'), 'San Diego', 'California'), (3, 'Berryessa Brewing Co', (SELECT id FROM country WHERE name='United States'), 'Winters', 'California');
INSERT INTO venue VALUES (1, 'Cato''s Ale House', '3891 Piedmont Ave', 'Oakland', 'California');
INSERT INTO beer VALUES (1, 'Trumer Pils', 1, 1, 4.9, 26), (2, 'Orderville', 2, 2, 7.2, 75), (3, 'Propaganda Pils', 3, 1, 6.0, 60);
INSERT INTO review VALUES (1, 1, 1, '2019-02-10', 5, 'Crisp and refreshing!');
INSERT INTO beer_venue VALUES (1, 1), (3, 1);