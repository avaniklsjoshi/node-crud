module.exports={

  // show all events
  showEvents:(req,res)=>{
    //dummy events
    const events=[
      {name:'Basketball', slug:'basketball',description:'Throwing into a basket.'},
      {name:'Swimming', slug:'swimming',description:'Avani is the fast fish.'},
      {name:'WeightLifting', slug:'weightLifting',description:'Lifting heavy things up.'},
      {name:'Basketball', slug:'basketball',description:'Throwing into a basket.'},
    ];
    res.render('pages/events',{events:events});
  },

  showSingle:(req, res)=>{
    const event= {name:'Basketball', slug:'basketball',description:'Throwing into a basket.'};
    res.render('pages/single',{event:event});
  }

};