var db = require('../models');



function index(req, res) {
  db.Item.find({}, function(err, allItems) {
    res.json(allItems);
  });
}

function create(req, res) {
  console.log('body', req.body);

  db.Item.create(req.body, function(err, item) {
    if (err) { console.log('error', err); }
    console.log(item);
    res.json(item);
  });
}

function destroy(req, res) {
  db.Item.findOneAndRemove({ _id: req.params.itemId }, function(err, item){
    res.json(item);
  });
}

function update(req, res) {
  db.Item.findOneAndUpdate({ _id: req.params.itemId }, {$set: {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    increment: req.body.increment,
    time: req.body.time
  }}, {new:true}).exec(function (error,editItem){
    if(error){
      res.status(500).send(err);
    }
    res.json(editItem)
  })
}


module.exports = {
  index: index,
  create: create,
  destroy: destroy,
  update: update
};
