const express = require('express');
const router = express.Router();

let memosAll = [
  {
    uid: 'opmiuo',
    x: 0,
    y: 0,
    w: 1,
    h: 3,
    i: 0,
    text: '-',
    date: '2019-05-21T12:53:41.315Z',
    id: 1,
    moved: false,
    static: true
  },
  {
    uid: 'user2222',
    x: 0,
    y: 6,
    w: 1,
    h: 3,
    i: 1,
    text: '이벤트를 빼건 아니고....\n아무튼',
    date: '2019-05-21T12:20:37.351Z',
    id: 2,
    moved: false,
    static: false
  },
  {
    uid: 'user2222',
    x: 2,
    y: 0,
    w: 1,
    h: 3,
    i: 3,
    text: '음.......',
    date: '2019-05-22T05:21:12.494Z',
    id: 4,
    moved: false,
    static: true
  }
];
router.get('', (req, res) => {
  res.json(memosAll.filter(memo => memo.uid == req.session.uid));
});

router.patch('/:id', (req, res) => {
  const memo = memosAll.find(t => t.id === parseInt(req.params.id));
  if (!memo) {
    res.status(404);
    res.end();
    return;
  }

  memosAll = memosAll.map(x => {
    if (x.id == req.params.id) {
      if (req.body.static != null) req.body.static = !req.body.static;
      updateMemo = {
        ...memo,
        ...req.body
      };
      x = updateMemo;
    }
    return x;
  });
  // console.log('update');
  res.end();
});

router.post('', (req, res) => {
  let memoIds = memosAll.map(memo => {
    return memo.id;
  });
  if (memosAll.length <= 0) memoIds = [0];

  let maxId = Math.max(...memoIds) + 1;
  let newTodo = { ...req.body, id: maxId, uid: req.session.uid };
  memosAll.push(newTodo);

  // console.log('add');
  // console.log(newTodo);
  res.end();
});

router.delete('/:id', (req, res) => {
  const selectedIdx = memosAll.findIndex(t => t.id === parseInt(req.params.id));
  memosAll.splice(selectedIdx, 1);
  // console.log('delete');
  res.end();
});

module.exports = router;
