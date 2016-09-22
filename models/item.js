var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  increment: Number,
  time: Number
});

var Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
