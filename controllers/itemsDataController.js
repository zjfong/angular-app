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



module.exports = {
  index: index,
  create: create,
  destroy: destroy
};
