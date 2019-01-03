var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
router.get('/info', function (req, res) { // 从此路径检测到post方式则进行post数据的处理操作
    let {token} = req.query
    var decoded = jwt.decode(token, global.secret);
    res.send({code: 20000, roles: [decoded.roles], avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', name: 's', introduction: '我是编辑'})
})
module.exports = router;
