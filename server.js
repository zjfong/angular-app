
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/vendor', express.static(__dirname + '/bower_components'));


app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/templates/:name', function templates(req, res) {
  var name = req.params.name;
  res.sendFile(__dirname + '/views/templates/' + name + '.html');
});


var controllers = require('./controllers');
app.get('/api', controllers.api.index);

var itemsList = [
    {
      name: 'Dunder Mifflin Paper',
      condition: 'new',
      price: '50'
    },
    {
      name: 'Yellow Umbrella',
      condition: 'used',
      price: '5'
    }
  ]


app.get('/api/items', function (req, res){
  res.json(itemsList);
})




app.get('*', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
