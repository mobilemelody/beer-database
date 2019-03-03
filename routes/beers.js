const express = require('express');
const router = express.Router();

/**************************/
/* QUERIES FOR BEER PAGES */
/**************************/

/* Get all beers */
function getBeers(res, mysql, context, complete) {
  let sql = "SELECT beer.id AS beer_id, beer.name AS name, brewery.id AS brewery_id, brewery.name AS brewery, style.id AS style_id, style.name AS style, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN brewery ON beer.brewery=brewery.id INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer GROUP BY beer.id ORDER BY avg_rating DESC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.beers = results;
    complete();
  });
}

/* Get search results */
function getSearchResults(req, res, mysql, context, complete) {
  let sql = "SELECT beer.id AS id, beer.name AS name, brewery.id AS brewery_id, brewery.name AS brewery, style.id AS style_id, style.name AS style, AVG(review.rating) AS avg_rating FROM beer INNER JOIN brewery ON beer.brewery=brewery.id INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer WHERE beer.name LIKE '%" + req.query.q + "%' OR brewery.name LIKE '%" + req.query.q + "%' OR style.name LIKE '%" + req.query.q + "%' GROUP BY beer.id";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.results = results;
    complete();
  })
}

/* Get individual beer */
function getBeer(req, res, mysql, context, complete) {
  let sql = "SELECT beer.name AS name, brewery.id AS brewery_id, brewery.name AS brewery, country.name AS country, brewery.city AS city, brewery.state AS state, style.id AS style_id, style.name AS style, beer.abv AS abv, beer.ibu AS ibu, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN brewery ON beer.brewery=brewery.id INNER JOIN country ON brewery.country=country.id INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer WHERE beer.id = ? GROUP BY beer.id";
  let inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.beer = results[0];
    complete();
  })
}

/* Get reviews for a beer */
function getReviewsOfBeer(req, res, mysql, context, complete) {
  let sql = "SELECT review.user_name AS user_id, review.rev_date, review.rating, review.comments, db_user.user_name AS user_name FROM review LEFT JOIN db_user ON review.user_name=db_user.id WHERE beer = ?";
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

/* Get breweries for dropdown */
function getBreweries(res, mysql, context, complete) {
  let sql = "SELECT id, name FROM brewery ORDER BY name ASC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.breweries = results;
    complete();
  })
}

/* Get styles for dropdown */
function getStyles(res, mysql, context, complete) {
  let sql = "SELECT id, name FROM style ORDER BY name ASC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.styles = results;
    complete();
  })
}

/* Get users for dropdown */
function getUsers(res, mysql, context, complete) {
  let sql = "SELECT id, user_name FROM db_user ORDER BY user_name ASC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.users = results;
    complete();
  })
}

/*************************/
/* ROUTES FOR BEER PAGES */
/*************************/

/* Route for top beers page */
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

/* Route to show form to add beer */
router.get('/add',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  getBreweries(res, mysql, context, complete);
  getStyles(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('beer_form', context);
    }
  }
});

/* Route to add beer */
router.post('/add',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "INSERT INTO beer (name, brewery, style, abv, ibu) VALUES (?,?,?,?,?)";
  let inserts = [req.body.name, req.body.brewery, req.body.style, req.body.abv, req.body.ibu];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    else {
      res.redirect('/beers');
    }
  });
});

/* Route for searching for a beer */
router.get('/search',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  context.q = req.query.q;
  getSearchResults(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('beer', context);
    }
  }
});

/* Route for individual beer page */
router.get('/:id',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  context.id = req.params.id;
  getBeer(req, res, mysql, context, complete);
  getReviewsOfBeer(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('beer', context);
    }
  }
});

/* Route to show form to update a beer */
router.get('/:id/edit',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  context.id = req.params.id;
  getBeer(req, res, mysql, context, complete);
  getBreweries(res, mysql, context, complete);
  getStyles(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 3) {
      res.render('beer_form', context);
    }
  }
});

/* Route to update a beer */
router.post('/:id/edit',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "UPDATE beer SET name=?, brewery=?, style=?, abv=?, ibu=? WHERE id=?";
  let inserts = [req.body.name, req.body.brewery, req.body.style, req.body.abv, req.body.ibu, req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    else {
      res.redirect('/beers/' + req.params.id);
    }
  });
})

/* Route to show form for adding a review */
router.get('/:id/reviews/add',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.beer_active = true;
  context.id = req.params.id;
  getBeer(req, res, mysql, context, complete);
  getUsers(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('review_form', context);
    }
  }
});

/* Route to add a review */
router.post('/:id/reviews',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "INSERT INTO review (user_name, beer, rev_date, rating, comments) VALUES (?,?,?,?,?)";
  if(req.body.user == '') {
    req.body.user = null;
  }
  let inserts = [req.body.user, req.params.id, req.body.date, req.body.rating, req.body.comments];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    else {
      res.redirect('/beers/' + req.params.id);
    }
  });
});

/* Route to delete beer */
router.delete('/:id',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "DELETE FROM beer WHERE id=?";
  let inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    else {
      res.status(202).end();
    }
  });
});

module.exports = router;