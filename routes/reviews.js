const express = require('express');
const router = express.Router();

/* Routes for reviews page */
router.get('/',function(req,res,next) {
  let context = {};
  context.review_active = true;
  res.render('review', context);
});

module.exports = router;