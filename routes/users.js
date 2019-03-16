const express = require('express');
const router = express.Router();

/***************************/
/* QUERIES FOR USERS PAGES */
/***************************/

/* Get all users sorted by number of reviews */
function getUsers(res, mysql, context, complete) {
  let sql = "SELECT db_user.id AS user_id, db_user.user_name AS user_name, COUNT(review.id) AS num_reviews FROM db_user LEFT JOIN review ON db_user.id=review.user_name GROUP BY db_user.id ORDER BY num_reviews DESC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.users = results;
    complete();
  });
}

/* Get individual user */
function getUser(req, res, mysql, context, complete) {
  let sql = "SELECT * FROM db_user WHERE id=?";
  let inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.user = results[0];
    complete();
  });
}

/* Get all reviews for user */
function getUserReviews(req, res, mysql, context, complete) {
  let sql = "SELECT beer.id AS beer_id, beer.name AS beer_name, review.rev_date AS rev_date, review.rating AS rating, review.comments AS comments FROM review INNER JOIN beer ON review.beer=beer.id WHERE review.user_name=? ORDER BY rev_date DESC";
  let inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.reviews = results;
    complete();
  })
}

/**************************/
/* ROUTES FOR USERS PAGES */
/**************************/

/* Route to show all users */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.user_active = true;
  getUsers(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('user', context);
    }
  }
});

/* Route to show form to add a user */
router.get('/add',function(req,res,next) {
  let context = {};
  context.user_active = true;
  res.render('user_form', context);
});

/* Route to add a user */
router.post('/add',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "INSERT INTO db_user (user_name, email) VALUES (?,?)";
  let inserts = [req.body.username, req.body.email];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      let context = {};
      context.error = error;
      res.render('error', context);
    }
    else {
      res.redirect('/users');
    }
  });
});

/* Route to show individual user */
router.get('/:id',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.user_active = true;
  context.id = req.params.id;
  getUser(req, res, mysql, context, complete);
  getUserReviews(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('user', context);
    }
  }
});

module.exports = router;