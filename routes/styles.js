const express = require('express');
const router = express.Router();

/* Routes for style pages */
router.get('/',function(req,res,next) {
  let context = {};
  context.style_active = true;
  res.render('style', context);
});

router.get('/add',function(req,res,next) {
  let context = {};
  context.style_active = true;
  res.render('style_form', context);
});

router.get('/:id',function(req,res,next) {
  let context = {};
  context.style_active = true;
  context.id = req.params.id;
  res.render('style', context);
});

router.get('/:id/edit',function(req,res,next) {
  let context = {};
  context.style_active = true;
  context.id = req.params.id;
  // TEST DATA
  context.name = "Style name";
  context.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet hendrerit arcu. Quisque in ex faucibus, imperdiet orci in, condimentum ex. Phasellus arcu massa, accumsan sed nunc at, mattis ultrices orci.";
  context.abv = "0.0% - 0.0%";
  context.ibu = "0 - 0";
  res.render('style_form', context);
});

module.exports = router;