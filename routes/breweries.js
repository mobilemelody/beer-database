const express = require('express');
const router = express.Router();

/* Queries for beer pages */
function getBreweries(res, mysql, context, complete) {
  mysql.pool.query("SELECT brewery.id AS id, brewery.name AS name, AVG(review.rating) AS avg_rating, COUNT(beer.id) AS num_beers FROM brewery LEFT JOIN beer ON brewery.id=beer.brewery LEFT JOIN review ON beer.id=review.beer GROUP BY brewery.id ORDER BY avg_rating DESC", function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.breweries = results;
    complete();
  });
}

function getCountries(res, mysql, context, complete) {
  mysql.pool.query("SELECT country.id AS country_id, country.name AS country_name FROM country", function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.country = results;
    complete();
  });
}

/* Routes for brewery pages */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.brewery_active = true;
  getBreweries(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('brewery', context);
    }
  }
});

router.get('/add',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.brewery_active = true;
  getCountries(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('brewery_form', context);
    }
  }
});

router.get('/:id',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  context.id = req.params.id;
  res.render('brewery', context);
});

router.get('/:id/edit',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  context.id = req.params.id;
  // TEST DATA
  context.name = "Brewery name";
  context.country = "Country name";
  context.city = "City name";
  context.state = "State name";
  res.render('brewery_form', context);
});

router.post('/', function(req,res) {
  console.log(req.body);
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO brewery (name, country, city, state) VALUES (?,?,?,?)";
  var inserts = [req.body.breweryName, req.body.country, req.body.city, req.body.state];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          console.log(JSON.stringify(error))
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.redirect('/breweries');
      }
  });
});

module.exports = router;