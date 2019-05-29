const express = require('express');
// const router = express();
const router = express.Router();

let memosAll = [];

router.get('', (req, res) => {
  if (memosAll.length <= 0) {
    memosAll = [
      {
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
  }
  console.log('다시로드해');
  console.log('/////////////////////');
  res.json(memosAll);
});

router.patch('/:id', (req, res) => {
  const memo = memosAll.filter(t => t.id === parseInt(req.params.id))[0];
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
      console.log('inner');
      console.log(x);
    }
    return x;
  });
  console.log('업데이트!!!!!');
  res.end();
});

router.post('', function(req, res) {
  let memoIds = memosAll.map(memo => {
    return memo.id;
  });
  if (memosAll.length <= 0) memoIds = [0];
  let maxId = Math.max(...memoIds) + 1;
  let newTodo = { ...req.body, id: maxId };
  memosAll.push(newTodo);

  console.log('추가하는거고');
  console.log(newTodo);
  res.end();
});

router.delete('/:id', (req, res) => {
  const selectedIdx = memosAll.findIndex(t => t.id === parseInt(req.params.id));
  memosAll.splice(selectedIdx, 1);
  console.log('삭제해요');
  res.end();
});

module.exports = router;
