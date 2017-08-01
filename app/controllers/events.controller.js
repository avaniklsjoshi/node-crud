const Event=require('../models/event');

module.exports={
  showEvents:showEvents,
  showSingle:showSingle,
  seedEvents:seedEvents,
  showCreate:showCreate,
  processCreate:processCreate,
  showEdit:showEdit,
  processEdit:processEdit
};

/**
 * show single event
 */
function showSingle(req, res){
  Event.findOne({slug:req.params.slug},(err,event)=>{
    if(err){
        res.status(404);
        res.send('Event not found');
      }
    res.render('pages/single',{
      event:event,
      success:req.flash('success')    //comming from session
    });
  });
}

/**
 * show all events
 */
function showEvents(req,res){
     
    // get all events
    Event.find({},(err,events)=>{
      if(err){
        res.status(404);
        res.send('Events not found');
      }

       // return a view with data
      res.render('pages/events',{events:events});
    });   
}
/**
 * seed our db
 */
function seedEvents(req,res){
  // create some events
  const events        = [
    {name:              'Basketball',description:    'Throwing into a basket.'},
    {name:              'Swimming', description:     'Avani is the fast fish.'},
    {name:              'WeightLifting',description: 'Lifting heavy things up.'},
    {name:              'Ping Pong',description:     'super fast ball.'}

  ];

  // use the event model to insert/save, but firt empty it.
  Event.remove({},() => {
    // use the event model to insert/save
    for(event of events){
      var newEvent    = new Event(event);
      newEvent.save();
    }
  }); 

  //seeded!
  res.send('db seeded!')
}

/**
 * ShowCreate
 */
function showCreate(req, res){
  res.render('pages/create',{
    errors:req.flash('errors')
  });
}

/**
 * processCreate
 */
function processCreate(req, res){
  // validate info
  req.checkBody('name', 'Name is required.').notEmpty();  //you can also use req.checkParam() if data is coming from url
  req.checkBody('Description', 'Description is required.').notEmpty(); 

  //if there are errors, redirect and save errors to flash
  const errors=req.validationErrors();
  if(errors){
    req.flash('errors', errors.map(err=>err.msg));
    return res.redirect('/events/create');
  }
  
  // create a new event
  const event=new Event({
    name:req.body.name,   //bcoz of bodyparser we are able access this here
    description:req.body.description
  });

  // save event
  event.save((err)=>{
    if(err)
      throw err;
    //set a suucessful flash message
    req.flash('success', 'Successfully created the event!');    //added to session
    //redirect to the newly created form
    res.redirect(`/events/${event.slug}`);
  });
}

/**
 * showEdit
 */
function showEdit(req, res) {
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    res.render('pages/edit', {
      event: event,
      errors: req.flash('errors')
    });
  });
}

/**
 * processEdit
 */
 
function processEdit(req, res) {
  // validate information
  req.checkBody('name', 'Name is required.').notEmpty();
  req.checkBody('description', 'Description is required.').notEmpty();

  // if there are errors, redirect and save errors to flash
  const errors = req.validationErrors();
  if (errors) {
    req.flash('errors', errors.map(err => err.msg));
    return res.redirect(`/events/${req.params.slug}/edit`);
  }

  // finding a current event
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    // updating that event
    event.name        = req.body.name;
    event.description = req.body.description;

    event.save((err) => {
      if (err)
        throw err;

      // success flash message
      // redirect back to the /events
      req.flash('success', 'Successfully updated event.');
      res.redirect('/events');
    });
  });

}
