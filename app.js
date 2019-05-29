const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const todos = require('./routes/todos.js');

app.use(bodyParser.json());

app.use('/todo', todos);

app.listen(port, function() {
  console.log('connected');
});

module.exports = app;
