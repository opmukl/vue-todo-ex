const express = require('express');
const router = express.Router();

let todos = [];

router.get('', (req, res) => {
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
  // console.log('load');
  // console.log('/////////////////////');
  res.json(todos);
});

router.post('', (req, res) => {
  let todoIds = todos.map(todo => {
    return todo.id;
  });
  if (todos.length <= 0) todoIds = [0];
  let maxId = Math.max(...todoIds) + 1;
  let newTodo = { ...req.body, id: maxId };
  todos.push(newTodo);

  // console.log('add');
  // console.log(newTodo);
  res.end();
});

router.delete('/:id', (req, res) => {
  const selectedIdx = todos.findIndex(t => t.id === parseInt(req.params.id));
  todos.splice(selectedIdx, 1);
  // console.log('delete');
  res.end();
});

router.patch('/:id', (req, res) => {
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
    }
    return x;
  });
  // console.log('update');
  res.end();
});

router.put('', (req, res) => {
  const haveTodoTodos = todos.filter(t => !t.done);
  todos = haveTodoTodos;
  res.end();
});

module.exports = router;
