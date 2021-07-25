var express = require('express');
var morgan = require('morgan');
var app = express();

var users = [
  {id: 1, name: 'alice'},
  {id: 2, name: 'beck'},
  {id: 3, name: 'chris'},
];

app.use(morgan('dev'));

app.get('/users', function(req, res) {
  res.json(users);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
})

module.exports = app;