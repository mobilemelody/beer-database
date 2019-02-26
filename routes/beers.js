const express = require('express');
const router = express.Router();

/* Routes for beer pages */
router.get('/',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('beer', context);
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