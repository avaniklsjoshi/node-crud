//load env variables
require('dotenv').config();

// grab the dependencies
const express        = require('express'),
      app            = express(),
      port           = process.env.PORT || 7000,
      expressLayouts = require('express-ejs-layouts'),
      mongoose       = require('mongoose'),
      bodyParser     = require('body-parser');
// configure our app
// tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as our templating engine
app.set('view engine','ejs');
app.use(expressLayouts);

// connect to db
mongoose.connect(process.env.DB_URI);

//use body parser to grab info from form
app.use(bodyParser.urlencoded({extended:true}));

// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, ()=>{
  console.log(`App listening on http://localhost:${port}`);
});
