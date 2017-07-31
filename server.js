// grab the dependencies
const express= require('express'),
      app=express(),
      port=process.env.PORT || 7000,
      expressLayouts=require('express-ejs-layouts');
 
// configure our app
// tell express where to look for static assets
app.use(express.static(__dirname+'/public'));

// set ejs as our templating engine
app.set('view engine','ejs');
app.use(expressLayouts);

// set the routes
app.use(require('./app/routes'));

// start our server
app.listen(port, ()=>{
  console.log(`App listening on http://localhost:${port}`);
});
