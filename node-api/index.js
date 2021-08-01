var express = require('express');
var morgan = require('morgan');
// var bodyParser = require('body-parser');
var app = express();

var users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'beck' },
  { id: 3, name: 'chris' },
];

let count = users.length;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', function (req, res) {
  // console.log(':getlist:users, ', users);
  const limit = parseInt(req.query.limit || 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  return res.json(users.slice(0, limit));
});

app.get('/users/:id', (req, res) => {
  // console.log(':getone:users, ', users);
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  // const result = users.filter((user) => { return user.id == id });
  // console.log('result', result);
  const user = users.filter((user) => {
    return user.id == id;
  })[0];
  // console.log('1111', user)
  if (!user) {
    return res.status(400).end();
  }
  return res.json(user);
});

app.delete('/users/:id', (req, res) => {
  // console.log(':delete:users, ', users);
  const id = parseInt(req.params.id, 10);
  // console.log('id', id);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  users = users.filter((user) => {
    // console.log(user);
    return user.id !== id;
  });
  // console.log(':delete:users:result, ', users);
  res.status(204).end();
});

app.post('/users', (req, res) => {
  // console.log(':post:users, ', users);
  const name = req.body.name;
  if (!name) {
    return res.status(400).end();
  }

  const checkName = users.filter((user) => {
    return user.name == name;
  })[0];
  // console.log('checkName', checkName);
  if (checkName) {
    return res.status(409).end();
  }
  count++;
  const id = count;
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
  const name = req.body.name;
  const id = parseInt(req.params.id, 10);
  if (!name) {
    return res.status(400).end();
  }
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const userByName = users.filter((user) => {
    return user.name === name;
  })[0];
  if (userByName) {
    return res.status(409).end();
  }
  const user = users.filter((user) => {
    return user.id === id;
  })[0];
  if (!user) {
    return res.status(404).end();
  }

  user.name = name;
  res.json(user);
});

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

module.exports = app;