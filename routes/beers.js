const express = require('express');
const router = express.Router();

/* Queries for beer pages */
function getBeers(res, mysql, context, complete) {
  mysql.pool.query("SELECT beer.id AS beer_id, beer.name AS name, brewery.id AS brewery_id, brewery.name AS brewery, style.id AS style_id, style.name AS style, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN brewery ON beer.brewery=brewery.id INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer GROUP BY beer.id ORDER BY avg_rating DESC", function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.beers = results;
    complete();
  });
}

/* Routes for beer pages */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  getBeers(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('beer', context);
    }
  }
});

router.get('/add',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('beer_form', context);
});

router.get('/search',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.q = req.query.q;
  res.render('beer', context);
});

router.get('/:id',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.id = req.params.id;
  res.render('beer', context);
});

router.get('/:id/edit',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.id = req.params.id;
  // TEST DATA
  context.name = "Beer name";
  context.brewery = "Brewery name";
  context.abv = 0.0;
  context.ibu = 0;
  res.render('beer_form', context);
});

router.get('/:id/reviews/add',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('review_form', context);
});

module.exports = router;