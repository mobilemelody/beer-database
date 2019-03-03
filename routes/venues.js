const express = require('express');
const router = express.Router();

/***************************/
/* QUERIES FOR VENUE PAGES */
/***************************/

/* Get unique cities and states for venues */
function getCities(res, mysql, context, complete) {
  let sql = "SELECT DISTINCT state FROM venue ORDER BY state";
  mysql.pool.query(sql, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.states = results;
    sql = "SELECT DISTINCT city FROM venue WHERE state=? ORDER BY city";
    let localCallbackCount = 0;
    for (let i in context.states) {
      let inserts = [context.states[i].state];
      mysql.pool.query(sql, inserts, function(error, results, fields) { if(error) {   res.write(JSON.stringify(error));   res.end(); } context.states[i].cities = results; localComplete();
      }); }
    function localComplete() {
      localCallbackCount++;
      if (localCallbackCount >= context.states.length) { complete();
      } }
  });
}

/* Get venues for given state */
function getVenuesInState(req, res, mysql, context, complete) {
  let sql = "SELECT venue.id AS venue_id, venue.name AS venue_name, venue.city AS city, COUNT(beer_venue.beer) AS num_beers FROM venue LEFT JOIN beer_venue ON venue.id=beer_venue.venue WHERE venue.state=? GROUP BY venue.id ORDER BY venue.name ASC";
  let inserts = [req.params.state];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.venues = results;
    complete();
  });
}

/* Get venues for given city */
function getVenuesInCity(req, res, mysql, context, complete) {
  let sql = "SELECT venue.id AS venue_id, venue.name AS venue_name, venue.address AS address, COUNT(beer_venue.beer) AS num_beers FROM venue LEFT JOIN beer_venue ON venue.id=beer_venue.venue WHERE venue.city=? GROUP BY venue.id ORDER BY venue.name ASC";
  let inserts = [req.params.city];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.venues = results;
    complete();
  });
}

/* Get info for an individual venue */
function getVenue(req, res, mysql, context, complete) {
  let sql = "SELECT * FROM venue WHERE id=?";
  let inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.venue = results[0];
    complete();
  });
}

/* Get venue taplist and beers for dropdown */
function getVenueTaplist(req, res, mysql, context, complete) {
  let sql = "SELECT beer.id AS beer_id, beer.name AS beer, brewery.id AS brewery_id, brewery.name AS brewery, style.id AS style_id, style.name AS style, AVG(review.rating) AS avg_rating, COUNT(review.rating) AS num_reviews FROM beer INNER JOIN beer_venue ON beer.id=beer_venue.beer INNER JOIN brewery ON beer.brewery=brewery.id INNER JOIN style ON beer.style=style.id LEFT JOIN review ON beer.id=review.beer WHERE beer_venue.venue=? GROUP BY beer.id ORDER BY beer.name ASC";
  let inserts = [req.params.id];
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.taplist = results;
    complete();
  });

  sql = "SELECT * FROM beer WHERE id NOT IN (SELECT beer FROM beer_venue WHERE venue=?) ORDER BY name ASC";
  mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    context.beers = results;
    complete();
  });
}

/* Get list of all states */
/* Modified from https://gist.github.com/mshafrir/2646763 */
function getStates(context) {
  context.states = [
    { "name": "Alabama", "abbreviation": "AL" },
    { "name": "Alaska", "abbreviation": "AK" },
    { "name": "Arizona", "abbreviation": "AZ" },
    { "name": "Arkansas", "abbreviation": "AR" },
    { "name": "California", "abbreviation": "CA" },
    { "name": "Colorado", "abbreviation": "CO" },
    { "name": "Connecticut", "abbreviation": "CT" },
    { "name": "Delaware", "abbreviation": "DE" },
    { "name": "Florida", "abbreviation": "FL" },
    { "name": "Georgia", "abbreviation": "GA" },
    { "name": "Hawaii", "abbreviation": "HI" },
    { "name": "Idaho", "abbreviation": "ID" },
    { "name": "Illinois", "abbreviation": "IL" },
    { "name": "Indiana", "abbreviation": "IN" },
    { "name": "Iowa", "abbreviation": "IA" },
    { "name": "Kansas", "abbreviation": "KS" },
    { "name": "Kentucky", "abbreviation": "KY" },
    { "name": "Louisiana", "abbreviation": "LA" },
    { "name": "Maine", "abbreviation": "ME" },
    { "name": "Maryland", "abbreviation": "MD" },
    { "name": "Massachusetts", "abbreviation": "MA" },
    { "name": "Michigan", "abbreviation": "MI" },
    { "name": "Minnesota", "abbreviation": "MN" },
    { "name": "Mississippi", "abbreviation": "MS" },
    { "name": "Missouri", "abbreviation": "MO" },
    { "name": "Montana", "abbreviation": "MT" },
    { "name": "Nebraska", "abbreviation": "NE" },
    { "name": "Nevada", "abbreviation": "NV" },
    { "name": "New Hampshire", "abbreviation": "NH" },
    { "name": "New Jersey", "abbreviation": "NJ" },
    { "name": "New Mexico", "abbreviation": "NM" },
    { "name": "New York", "abbreviation": "NY" },
    { "name": "North Carolina", "abbreviation": "NC" },
    { "name": "North Dakota", "abbreviation": "ND" },
    { "name": "Ohio", "abbreviation": "OH" },
    { "name": "Oklahoma", "abbreviation": "OK" },
    { "name": "Oregon", "abbreviation": "OR" },
    { "name": "Pennsylvania", "abbreviation": "PA" },
    { "name": "Rhode Island", "abbreviation": "RI" },
    { "name": "South Carolina", "abbreviation": "SC" },
    { "name": "South Dakota", "abbreviation": "SD" },
    { "name": "Tennessee", "abbreviation": "TN" },
    { "name": "Texas", "abbreviation": "TX" },
    { "name": "Utah", "abbreviation": "UT" },
    { "name": "Vermont", "abbreviation": "VT" },
    { "name": "Virginia", "abbreviation": "VA" },
    { "name": "Washington", "abbreviation": "WA" },
    { "name": "Washington D.C.", "abbreviation": "DC" },
    { "name": "West Virginia", "abbreviation": "WV" },
    { "name": "Wisconsin", "abbreviation": "WI" },
    { "name": "Wyoming", "abbreviation": "WY" }
  ];
  }

/**************************/
/* ROUTES FOR VENUE PAGES */
/**************************/

/* Route for main venues page */
router.get('/',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.venue_active = true;
  getCities(res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('venue', context); }
  }
});

/* Route to show form to add venue */
router.get('/add',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  getStates(context);
  res.render('venue_form', context);
});

/* Route to add a venue */
router.post('/add',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "INSERT INTO venue (name, address, city, state) VALUES (?,?,?,?)";
  let inserts = [req.body.name, req.body.address, req.body.city, req.body.state];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    else {
      res.redirect('/venues'); }
  });
});

/* Route to show venues for given state */
router.get('/state/:state',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.venue_active = true;
  context.state = req.params.state;
  getVenuesInState(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('venue', context); }
  }
});

/* Route to show venues by given city */
router.get('/state/:state/city/:city',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.venue_active = true;
  context.city = req.params.city;
  context.state = req.params.state;
  getVenuesInCity(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('venue', context); }
  }
});

/* Route to show individual venue */
router.get('/:id',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.venue_active = true;
  context.id = req.params.id;
  getVenue(req, res, mysql, context, complete);
  getVenueTaplist(req, res, mysql, context, complete);
  function complete() {
    callbackCount++;
    if(callbackCount >= 3) {
      res.render('venue', context); }
  }
});

/* Route to show form to edit venue */
router.get('/:id/edit',function(req,res,next) {
  let callbackCount = 0;
  let context = {};
  let mysql = req.app.get('mysql');
  context.venue_active = true;
  context.id = req.params.id;
  getVenue(req, res, mysql, context, complete);
  getStates(context);
  function complete() {
    callbackCount++;
    if(callbackCount >= 1) {
      res.render('venue_form', context); }
  }
});

/* Route to update a venue */
router.post('/:id/edit',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "UPDATE venue SET name=?, address=?, city=?, state=? WHERE id=?";
  let inserts = [req.body.name, req.body.address, req.body.city, req.body.state, req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    else {
      res.redirect('/venues/' + req.params.id); }
  });
});

/* Route to add a beer to a venue's taplist */
router.post('/:id/taplist/add',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "INSERT INTO beer_venue (beer, venue) VALUES (?,?)";
  let inserts = [req.body.beer, req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    else {
      res.redirect('/venues/' + req.params.id); }
  });
});

/* Route to remove a beer from a venue's taplist */
router.delete('/:id/tap/:beer',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "DELETE FROM beer_venue WHERE venue=? AND beer=?";
  let inserts = [req.params.id, req.params.beer];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    else {
      res.status(202).end(); }
  });
});

/* Route to delete a venue */
router.delete('/:id',function(req,res,next) {
  let mysql = req.app.get('mysql');
  let sql = "DELETE FROM venue WHERE id=?";
  let inserts = [req.params.id];
  sql = mysql.pool.query(sql, inserts, function(error, results, fields) {
    if(error) {
      res.write(JSON.stringify(error));
      res.end(); }
    else {
      res.status(202).end(); }
  });
});

module.exports = router;