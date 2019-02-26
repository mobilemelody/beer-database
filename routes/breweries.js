const express = require('express');
const router = express.Router();

/* Routes for brewery pages */
router.get('/',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  res.render('brewery', context);
});

router.get('/add',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  res.render('brewery_form', context);
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

module.exports = router;