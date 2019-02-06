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

app.get('/beers/:id/reviews/add',function(req,res,next) {
  res.render('add_review');
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