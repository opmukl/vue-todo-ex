const express = require('express');
const router = express.Router();

let users = [
  {
    uid: 'opmiuo',
    password: '1234' //비밀번호 암호화.....해서 저장해야한다 나중엔
  }
];
router.get('/login', (req, res) => {
  console.log('dddd');
});

router.post('/login', (req, res) => {
  let body = req.body;
  let user = users.find(u => u.uid === req.body.uid);
  console.log(req.body.uid);
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
  // req.session.is_logined = true; //이거 아직 의미가 없음

  req.session.uid = user.uid;
  // res.render('logout', { id: req.session.user_id });
  res.cookie('user', body.uid, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });
  return res
    .status(200)
    .json({ result: true, message: '정상적으로 로그인되었습니다.' });
});

router.post('/logout', (req, res) => {
  // let body = req.body;
  // let user = users.find(state.authenticatedUserId);
  console.log('ddddddd');
  console.log(req.body);

  // router.
  // req.session.destory();  // 세션 삭제
  // res.clearCookie(‘sid’); // 세션 쿠키 삭제
});

module.exports = router;
