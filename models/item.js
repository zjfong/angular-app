var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  condition: String,
  price: Number
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
