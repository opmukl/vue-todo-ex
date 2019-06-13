const express = require('express');
const router = express.Router();

let todos = [
  {
    uid: 'opmiuo',
    id: 1,
    text: 'api만들어보기이게 찍히고있는데',
    done: false
  },
  {
    uid: 'opmiuo',
    id: 2,
    text: '메모 업데이트 하기',
    done: false
  },
  {
    uid: 'user2222',
    id: 3,
    text: '사용자2222',
    done: false
  }
];

router.get('', (req, res) => {
  res.json(todos.filter(todo => todo.uid == req.session.uid));
});

router.post('', (req, res) => {
  let todoIds = todos.map(todo => todo.id);
  if (todos.length <= 0) todoIds = [0];

  let maxId = Math.max(...todoIds) + 1;
  let newTodo = { ...req.body, id: maxId, uid: req.session.uid };
  todos.push(newTodo);

  res.end();
});

router.delete('/:id', (req, res) => {
  const selectedIdx = todos.findIndex(t => t.id === parseInt(req.params.id));
  todos.splice(selectedIdx, 1);

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
  res.end();
});

router.put('', (req, res) => {
  const haveTodoTodos = todos.filter(t => !t.done);
  todos = haveTodoTodos;
  res.end();
});

module.exports = router;
