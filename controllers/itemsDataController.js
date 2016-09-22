var db = require('../models');



function index(req, res) {
  db.Item.find({}, function(err, allItems) {
    res.json(allItems);
  });
}




module.exports = {
  index: index,
  // create: create,
};
