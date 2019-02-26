const express = require('express');
const router = express.Router();

/* Routes for venue pages */
router.get('/',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  res.render('venue', context);
});

router.get('/add',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  res.render('venue_form', context);
});

router.get('/state/:state',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.state = req.params.state;
  res.render('venue', context);
});

router.get('/state/:state/city/:city',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.city = req.params.city;
  context.state = req.params.state;
  res.render('venue', context);
});

router.get('/:id',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.id = req.params.id;
  res.render('venue', context);
});

router.get('/:id/edit',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.id = req.params.id;
  // TEST DATA
  context.name = "Venue name";
  context.address = "Address";
  context.city = "City name";
  context.state = "State name";
  res.render('venue_form', context);
});

module.exports = router;