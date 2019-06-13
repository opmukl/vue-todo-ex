const express = require('express');
const router = express.Router();

let users = [
  {
    uid: 'opmiuo',
    password: '1234' //비밀번호 암호화.....해서 저장해야한다 나중엔
  },
  {
    uid: 'user2222',
    password: '2222'
  }
];

router.post('/login', (req, res) => {
  let body = req.body;
  let user = users.find(u => u.uid === req.body.uid);
  if (!user)
    return res.json({ result: false, message: '존재하지 않는 사용자 입니다.' });
  if (user.password != body.password)
    return res.json({ result: false, message: '비밀번호가 틀렸습니다.' });

  //정상적으로 로그인 되었을 때의 처리
  console.log('정상적 로그인처리');

  req.session.uid = user.uid;

  return res
    .status(200)
    .json({ result: true, message: '정상적으로 로그인되었습니다.' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      return res.json({
        result: true,
        message: '정상적으로 로그아웃 되었습니다.'
      });
    }
  });
});

module.exports = router;
