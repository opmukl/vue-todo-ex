var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

let todos = [];

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
  console.log('다시로드해');
  console.log('/////////////////////');
  res.json(todos);
});

app.post('/api/todos', function(req, res) {
  let todoIds = todos.map(todo => {
    return todo.id;
  });
  if (todos.length <= 0) todoIds = [0];
  let maxId = Math.max(...todoIds) + 1;
  let newTodo = { ...req.body, id: maxId };
  todos.push(newTodo);

  console.log('추가하는거고');
  console.log(newTodo);
  res.end();
});

app.delete('/api/todos/:id', (req, res) => {
  const selectedIdx = todos.findIndex(t => t.id === parseInt(req.params.id));
  todos.splice(selectedIdx, 1);
  console.log('삭제해요');
  res.end();
});

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
  console.log('업데이트!!!!!');
  res.end();
});

app.put('/api/todos', (req, res) => {
  const haveTodoTodos = todos.filter(t => !t.done);
  todos = haveTodoTodos;
  res.end();
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
