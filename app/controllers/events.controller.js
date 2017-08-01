const Event=require('../models/event');

module.exports={
  showEvents:showEvents,
  showSingle:showSingle,
  seedEvents:seedEvents
};

/**
 * show single event
 */
function showSingle(req, res){
  const event= {name:'Basketball', slug:'basketball',description:'Throwing into a basket.'};
  res.render('pages/single',{event:event});
}

/**
 * show all events
 */
function showEvents(req,res){
     
    // get all events
    
    // return a view with data
    res.render('pages/events',{events:events});
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