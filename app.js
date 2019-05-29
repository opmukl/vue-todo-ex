const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

const todos = require('./routes/todos.js');
app.use('/api/todos', todos);

const memos = require('./routes/memos.js');
app.use('/api/memos', memos);

app.listen(port, function() {
  console.log('connected');
});

module.exports = app;
