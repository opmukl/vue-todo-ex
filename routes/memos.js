const express = require('express');
// const router = express();
const router = express.Router();

let memos = [];

router.get('/memos', (req, res) => {
  if (memos.length <= 0) {
    memos = [
      {
        id: 1,
        text: 'api만들어보기이게 찍히고있는데'
      },
      {
        id: 2,
        text: '메모 업데이트 하기'
      },
      {
        id: 3,
        text: '공부하기'
      }
    ];
  }
  console.log('다시로드해');
  console.log('/////////////////////');
  res.json(memos);
});

module.exports = router;
