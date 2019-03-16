const express = require('express');
const router = express.Router();

/***************************/
/* QUERIES FOR STYLE PAGES */
/***************************/

/* Get all styles */
function getStyles(res, mysql, context, complete) {
  let sql = "SELECT style.id AS id, style.name AS name, COUNT(beer.id) AS count FROM style LEFT JOIN beer ON style.id=beer.style GROUP BY style.id ORDER BY style.name ASC";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.styles = results;
    complete();
  })
}

/* Get individual style */
function selectStyle(res, mysql, context, id, complete) {
  var sql = "SELECT style.id AS id, style.name AS name, style.abv_range AS abv_range, style.ibu_range AS ibu_range, style.description AS description FROM style WHERE id=?";
  var inserts = [id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.style = results[0];
    complete();
  });
}

/* Get beers for given style */
function getBeers(res, mysql, context, id, complete) {
  var sql = "SELECT beer.id AS id, beer.name AS name, brewery.id AS brewery_id, brewery.name AS brewery, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN brewery ON beer.brewery=brewery.id LEFT JOIN review ON beer.id=review.beer WHERE beer.style=? GROUP BY beer.id ORDER BY avg_rating DESC";
  var inserts = [id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end();
    }
    context.beers = results;
    complete();
  });
}

/**************************/
/* ROUTES FOR STYLE PAGES */
/**************************/

/* Route for all styles page */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.style_active = true;
  getStyles(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('style', context);
    }
  }
});

/* Route to form to add a style */
router.get('/add',function(req,res,next) {
  let context = {};
  context.style_active = true;
  res.render('style_form', context);
});

/* Route to show individual style */
router.get('/:id',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.style_active = true;
  context.id = req.params.id;
  selectStyle(res, mysql, context, context.id, complete);
  getBeers(res, mysql, context, context.id, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2) {
      res.render('style', context);
    }
  }
});

/* Route to form to edit style */
router.get('/:id/edit',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.style_active = true;
  context.id = req.params.id;
  selectStyle(res, mysql, context, context.id, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('style_form', context);
    }
  }
});

/* Route to add style */
router.post('/', function(req,res) {
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO style (name, description, abv_range, ibu_range) VALUES (?,?,?,?)";
  var inserts = [req.body.name, req.body.description, req.body.abv_range, req.body.ibu_range];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
        let context = {};
        context.error = error;
        res.render('error', context);
      }else{
        res.redirect('/styles');
      }
  });
});

/* Route to edit style */
router.post('/:id', function(req,res) {
  var mysql = req.app.get('mysql');
  var sql = "UPDATE style SET name=?, description=?, abv_range=?, ibu_range=? WHERE id=?";
  var inserts = [req.body.name, req.body.description, req.body.abv_range, req.body.ibu_range, req.params.id];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
        let context = {};
        context.error = error;
        res.render('error', context);
      }else{
          res.redirect('/styles');
      }
  });
});

module.exports = router;