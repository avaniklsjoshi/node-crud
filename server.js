//load env variables
require('dotenv').config();

// grab the dependencies
const express        = require('express'),
      app            = express(),
      port           = process.env.PORT || 7000,
      expressLayouts = require('express-ejs-layouts'),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser'),
      session        = require('express-session'),
      cookieParser   = require('cookie-parser'),
      flash          = require('connect-flash'),
      expressValidator= require('express-validator');

// configure our app
// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET,   //sign this session into cookie
  cookie:{maxAge:60000},    //1 hour
  resave:false,   //forces the session to be saved back to store
  saveUninitialized:false //dont save unmodified
}));
app.use(flash());   //gives ability to use flash data in app

// tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as our templating engine
app.set('view engine','ejs');
app.use(expressLayouts);

// connect to db
mongoose.connect(process.env.DB_URI);

//use body parser to grab info from form
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());  //it uses bodyparser to grab details from form and use thats y it is written here

// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, ()=>{
  console.log(`App listening on http://localhost:${port}`);
});
