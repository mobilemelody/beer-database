const express = require('express');
const router = express.Router();

/*****************************/
/* QUERIES FOR REVIEWS PAGES */
/*****************************/

/* Get 10 most recent reviews */
function getRecentReviews(res, mysql, context, complete) {
  let sql = "SELECT beer.id AS beer_id, beer.name AS beer, db_user.id AS user_id, db_user.user_name AS username, review.rev_date AS rev_date, review.rating AS rating, review.comments AS comments FROM review INNER JOIN beer ON review.beer=beer.id LEFT JOIN db_user ON review.user_name=db_user.id ORDER BY rev_date DESC LIMIT 10";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.reviews = results;
    complete();
  });
}

/****************************/
/* ROUTES FOR REVIEWS PAGES */
/****************************/

/* Route for showing recent reviews */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.review_active = true;
  getRecentReviews(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
  		res.render('review', context);
  	}
  }
});

/*Route for deleting a review*/
router.delete('/:id',function(req,res,next) {
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM review WHERE id=?";
  var inserts = [req.params.id];
  sql=mysql.pool.query(sql, inserts, function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.status(400);
      res.end();
    }
  })
});

module.exports = router;