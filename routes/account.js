const express = require('express');
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
  console.log('load');
  console.log('/////////////////////');
  res.json(memosAll);
});
