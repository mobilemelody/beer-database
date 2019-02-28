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

function selectBrewery(res, mysql, context, id, complete) {
  var sql = "SELECT brewery.id AS id, brewery.name AS name, brewery.city AS city, brewery.state AS state, country.id AS c_id, country.name AS country FROM brewery INNER JOIN country ON brewery.country=country.id WHERE brewery.id=?";
  var inserts = [id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.brewery = results[0];
    complete();
  });
}

function getBeers(res, mysql, context, id, complete) {
  var sql = "SELECT beer.id AS id, beer.name AS name, style.name AS style, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer WHERE beer.brewery=? GROUP BY beer.id ORDER BY avg_rating DESC";
  var inserts = [id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.beers = results;
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
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.brewery_active = true;
  context.id = req.params.id;
  selectBrewery(res, mysql, context, context.id, complete);
  getBeers(res, mysql, context, context.id, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('brewery', context);
    }
  }
});

router.get('/:id/edit',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.brewery_active = true;
  context.id = req.params.id;
  selectBrewery(res, mysql, context, context.id, complete);
  getCountries(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('brewery_form', context);
    }
  }
});

router.post('/', function(req,res) {
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO brewery (name, country, city, state) VALUES (?,?,?,?)";
  var inserts = [req.body.breweryName, req.body.country, req.body.city, req.body.state];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error));
        res.end();
      }else{
        res.redirect('/breweries');
      }
  });
});

router.post('/:id', function(req,res) {
  var mysql = req.app.get('mysql');
  var sql = "UPDATE brewery SET name=?, country=?, city=?, state=? WHERE id=?";
  var inserts = [req.body.breweryName, req.body.country, req.body.city, req.body.state, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.redirect('/breweries');
      }
  });
});

module.exports = router;