# Beer Database
Final project for OSU CS340 built by Melody Reebs and Brian Sprague

See a live version here: <https://beer-database.herokuapp.com/>
## Getting Started
Follow these instructions to get a copy of this project up and running on your local machine for testing and development purposes.
### Requirements
- [Node.js](https://nodejs.org)
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/) database
### Installing
1. Clone the repo to your local machine: `git clone https://github.com/mobilemelody/beer-database.git`
2. Install node modules: `npm install`
3. Import the Data Definition Queries: `mysql -u username -p -h host database < beer_db_DDL.sql`
4. Update `.env.template` with your databse URL and rename the file to `.env`
5. Run the node server using `node index.js`

The project should now be running on http://localhost:3000
## Built With
- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com/)
- [Handlebars](https://handlebarsjs.com/)
- [Bootstrap](http://getbootstrap.com/)
- [Bootswatch](https://bootswatch.com/)

Live version deployed using:
- [Heroku](https://www.heroku.com/)
- [JawsDB Maria](https://elements.heroku.com/addons/jawsdb-maria)
