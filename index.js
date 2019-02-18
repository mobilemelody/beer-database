const express = require('express');
const request = require('request');
const handlebars = require('express-handlebars').create({defaultLayout:'main'});

const app = express();

const PORT = process.env.PORT || 3000;

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', PORT);

app.use(express.static('public'));

app.get('/',function(req,res,next) {
	res.render('home');
});

/* Routes for beer pages */
app.get('/beers',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('beer', context);
});

app.get('/beers/add',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('beer_form', context);
});

app.get('/beers/search',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.q = req.query.q;
  res.render('beer', context);
});

app.get('/beers/:id',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.id = req.params.id;
  res.render('beer', context);
});

app.get('/beers/:id/edit',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  context.id = req.params.id;
  // TEST DATA
  context.name = "Beer name";
  context.brewery = "Brewery name";
  context.abv = 0.0;
  context.ibu = 0;
  res.render('beer_form', context);
});

app.get('/beers/:id/reviews/add',function(req,res,next) {
  let context = {};
  context.beer_active = true;
  res.render('review_form', context);
});

/* Routes for style pages */
app.get('/styles',function(req,res,next) {
  let context = {};
  context.style_active = true;
  res.render('style', context);
});

app.get('/styles/add',function(req,res,next) {
  let context = {};
  context.style_active = true;
  res.render('style_form', context);
});

app.get('/styles/:id',function(req,res,next) {
  let context = {};
  context.style_active = true;
  context.id = req.params.id;
  res.render('style', context);
});

app.get('/styles/:id/edit',function(req,res,next) {
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

/* Routes for brewery pages */
app.get('/breweries',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  res.render('brewery', context);
});

app.get('/breweries/add',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  res.render('brewery_form', context);
});

app.get('/breweries/:id',function(req,res,next) {
  let context = {};
  context.brewery_active = true;
  context.id = req.params.id;
  res.render('brewery', context);
});

app.get('/breweries/:id/edit',function(req,res,next) {
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

/* Routes for venue pages */
app.get('/venues',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  res.render('venue', context);
});

app.get('/venues/add',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  res.render('venue_form', context);
});

app.get('/venues/state/:state',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.state = req.params.state;
  res.render('venue', context);
});

app.get('/venues/state/:state/city/:city',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.city = req.params.city;
  context.state = req.params.state;
  res.render('venue', context);
});

app.get('/venues/:id',function(req,res,next) {
  let context = {};
  context.venue_active = true;
  context.id = req.params.id;
  res.render('venue', context);
});

app.get('/venues/:id/edit',function(req,res,next) {
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

/* Routes for reviews page */
app.get('/reviews',function(req,res,next) {
  let context = {};
  context.review_active = true;
  res.render('review', context);
});

/* Routes for user pages */
app.get('/users',function(req,res,next) {
  let context = {};
  context.user_active = true;
  res.render('user', context);
});

app.get('/users/add',function(req,res,next) {
  let context = {};
  context.user_active = true;
  res.render('user_form', context);
});

app.get('/users/:id',function(req,res,next) {
  let context = {};
  context.user_active = true;
  context.id = req.params.id;
  res.render('user', context);
});

/* Routes for error handling */
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});