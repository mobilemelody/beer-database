require('dotenv').config();

const express = require('express');
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const moment = require('moment');
const modernizr = require("modernizr");
const handlebars = require('express-handlebars').create({
  defaultLayout:'main', 
  helpers: {
    inc: function(value) {
      return parseInt(value) + 1;
    },
    decimal: function(value) {
      if(value) {
        return value.toFixed(1);
      }
    },
    ifEq: function(val1, val2, options) {
      if (val1 == val2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    formatDate: function(value) {
      return moment(value).format("MMM D, YYYY");
    },
    inputDate: function(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    //Found below code at: https://stackoverflow.com/questions/26066768/how-to-set-the-selected-item-in-a-radio-button-group-in-handlebars-template
    //Causes the star radios to return the amount selected based off of the review rating for a beer
    setChecked: function (value, currentValue) {
      if ( value == currentValue ) {
         return "checked";
      } else {
         return "";
      }
    }
  }
});

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', PORT);
app.set('mysql', mysql);

app.use('/beers', require('./routes/beers.js'));
app.use('/styles', require('./routes/styles.js'));
app.use('/breweries', require('./routes/breweries.js'));
app.use('/venues', require('./routes/venues.js'));
app.use('/reviews', require('./routes/reviews.js'));
app.use('/users', require('./routes/users.js'));

app.use(express.static('public'));

app.get('/',function(req,res,next) {
	res.render('home');
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