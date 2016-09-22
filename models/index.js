var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auction-app");

var Item = require('./item');

module.exports.Item = Item;

