const express = require('express');
const app = express();
const bodyParser = require('body-parser'); //post방식 파서
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  expressSession({
    secret: 'my key',
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
  })
);

app.get('/', function(req, res, next) {
  // console.log(req.session);
  console.log('Cookies: ', req.cookies);
  res.send('Hello session');
});

const auth = require('./routes/auth.js');
const todos = require('./routes/todos.js');
const memos = require('./routes/memos.js');

app.use('/api/auth', auth);
app.use('/api/todos', todos);
app.use('/api/memos', memos);

app.listen(port, function() {
  console.log('connected');
});

module.exports = app;
