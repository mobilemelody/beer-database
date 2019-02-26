const express = require('express');
const router = express.Router();

/* Routes for user pages */
router.get('/',function(req,res,next) {
  let context = {};
  context.user_active = true;
  res.render('user', context);
});

router.get('/add',function(req,res,next) {
  let context = {};
  context.user_active = true;
  res.render('user_form', context);
});

router.get('/:id',function(req,res,next) {
  let context = {};
  context.user_active = true;
  context.id = req.params.id;
  res.render('user', context);
});

module.exports = router;