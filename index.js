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

app.get('/beers',function(req,res,next) {
  res.render('beers');
});

app.get('/beers/add',function(req,res,next) {
  res.render('add_beer');
});

app.get('/beers/:id',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  res.render('beers', context);
});

app.get('/beers/:id/edit',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  context.name = "Beer name";
  context.brewery = "Brewery name";
  context.abv = 0.0;
  context.ibu = 0;
  res.render('add_beer', context);
});

app.get('/beers/:id/reviews/add',function(req,res,next) {
  res.render('add_review');
});

app.get('/styles',function(req,res,next) {
  res.render('styles');
});

app.get('/styles/add',function(req,res,next) {
  res.render('add_style');
});

app.get('/styles/:id',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  res.render('styles', context);
});

app.get('/styles/:id/edit',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  context.name = "Style name";
  context.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet hendrerit arcu. Quisque in ex faucibus, imperdiet orci in, condimentum ex. Phasellus arcu massa, accumsan sed nunc at, mattis ultrices orci.";
  context.abv = "0.0% - 0.0%";
  context.ibu = "0 - 0";
  res.render('add_style', context);
});

app.get('/breweries',function(req,res,next) {
  res.render('breweries');
});

app.get('/breweries/:id',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  res.render('breweries', context);
});


app.get('/venues',function(req,res,next) {
  res.render('venues');
});

app.get('/venues/:id',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  res.render('venues', context);
});

app.get('/users',function(req,res,next) {
  res.render('users');
});

app.get('/users/:id',function(req,res,next) {
  let context = {};
  context.id = req.params.id;
  res.render('users', context);
});

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