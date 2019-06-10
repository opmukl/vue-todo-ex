const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const bodyParser = require('body-parser'); //post방식 파서
// const port = 3000;
app.set('port', 3000);

app.use(bodyParser.json());

app.use(cookieParser()); //쿠키와 세션을 미들웨어로 등록
app.use(
  expressSession({
    secret: 'my key',
    cookie: {
      maxAge: 1000 * 60 * 60
    },
    resave: true,
    saveUninitialized: true
  })
);
// app.use(
//   express.session({
//     key: 'sid',
//     secret: 'secret',
//     cookie: {
//       maxAge: 1000 * 60 * 60
//     }
//   })
// );

const todos = require('./routes/todos.js');
app.use('/api/todos', todos);

const memos = require('./routes/memos.js');
app.use('/api/memos', memos);

app.listen(port, function() {
  console.log('connected');
});

module.exports = app;
