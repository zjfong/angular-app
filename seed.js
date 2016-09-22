
var db = require("./models");

var itemsList = [];

itemsList.push({
      name: 'Dunder Mifflin Paper',
      condition: 'new',
      price: '50'
    });
itemsList.push({
      name: 'Yellow Umbrella',
      condition: 'used',
      price: '5'
    });



db.Item.remove({}, function(err, items){

  db.Item.create(itemsList, function(err, items){
    if (err) { return console.log('ERROR', err); }
    console.log("all items:", items);
    console.log("created", items.length, "items");
    process.exit();
  });

});
