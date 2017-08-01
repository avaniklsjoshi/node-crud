const Event=require('../models/event');

module.exports={
  showEvents:showEvents,
  showSingle:showSingle,
  seedEvents:seedEvents,
  showCreate:showCreate,
  processCreate:processCreate
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
    res.render('pages/single',{event:event});
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
  res.render('pages/create');
}

/**
 * processCreate
 */
function processCreate(req, res){
  // create a new event
  const event=new Event({
    name:req.body.name,   //bcoz of bodyparser we are able access this here
    description:req.body.description
  });

  // save event
  event.save((err)=>{
    if(err)
      throw err;
    //redirect to the newly created form
    res.redirect(`/events/${event.slug}`);
  });
}