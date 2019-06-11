const express = require('express');
const router = express.Router();

let users = [
  {
    uid: 'opmiuo',
    password: '1234' //비밀번호 암호화.....해서 저장해야한다 나중엔
  }
];

router.get('/', (req, res) => {
  console.log('dddd');
});

router.post('/login', (req, res) => {
  let body = req.body;
  let user = users.find(u => u.uid === body.uid);
  if (!user)
    return res
      .status(401)
      .json({ result: false, message: '존재하지 않는 사용자 입니다.' });
  if (user.password != body.password)
    return res
      .status(400)
      .json({ result: false, message: '비밀번호가 틀렸습니다.' });

  //정상적으로 로그인 되었을 때의 처리
  console.log('정상적 로그인처리');
  req.session.is_logined = true;
  req.session.uid = user.uid;
  res.cookie('user', body.uid, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });
  res
    .status(200)
    .json({ result: true, message: '정상적으로 로그인되었습니다.' });
});

router.get('/:uid/:password', (req, res) => {
  const selectedUser = users.findIndex(t => t.id === parseInt(req.params.id));
  console.log('음....?');

  console.log(req.params.uid);
  console.log(req.params.password);

  if (selectedUser.password === req.params.password) res.end();
  else res.status(500);
});

module.exports = router;
