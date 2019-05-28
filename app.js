var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var todos = [];

app.get('/api/todos', (req, res) => {
  if (todos.length <= 0) {
    todos = [
      {
        id: 1,
        text: 'api만들어보기이게 찍히고있는데',
        done: false
      },
      {
        id: 2,
        text: '메모 업데이트 하기',
        done: false
      },
      {
        id: 3,
        text: '공부하기',
        done: false
      }
    ];
  }
  res.json(todos);
});

// app.get('/api/todos/:id', function(req, res) {
//   console.log('????');
//   var todo = todos.filter(t => t.id === parseInt(req.params.id))[0];
//   if (!todo) {
//     res.status(404);
//     res.end();
//     return;
//   }
//   res.json(todo);
// });

app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.filter(t => t.id === parseInt(req.params.id))[0];
  if (!todo) {
    res.status(404);
    res.end();
    return;
  }

  todos = todos.map(x => {
    if (x.id == req.params.id) {
      if (req.body.done != null) req.body.done = !req.body.done;
      updateTodo = {
        ...todo,
        ...req.body
      };
      x = updateTodo;
      console.log('inner');
      console.log(x);
    }
    return x;
  });

  res.end();
});

app.post('/api/todos', function(req, res) {
  const todoIds = todos.map(todo => {
    return todo.id;
  });
  const maxId = Math.max(...todoIds) + 1;
  const newTodo = { ...req.body, id: maxId };

  todos.push(newTodo);
  res.send(newTodo);
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
