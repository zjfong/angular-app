
var db = require("./models");

var itemsList = [];

itemsList.push({
      name: 'Dunder Mifflin Paper',
      description: 'new',
      price: '50',
      increment: '50',
      time: '3'
    });
itemsList.push({
      name: 'Yellow Umbrella',
      description: 'used',
      price: '5.5',
      increment: '0.5',
      time: '5'
    });



db.Item.remove({}, function(err, items){

  db.Item.create(itemsList, function(err, items){
    if (err) { return console.log('ERROR', err); }
    console.log("all items:", items);
    console.log("created", items.length, "items");
    process.exit();
  });

});
