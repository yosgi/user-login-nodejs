var express = require('express');
var router = express.Router();
var dbhandler = require('../database/dbHandler');
var jwt = require('jwt-simple');
router.post('/login', function (req, res) { // 从此路径检测到post方式则进行post数据的处理操作
    // 这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = dbhandler.getModel('user');
    var {username} = req.body; // 获取post上来的 data数据中 username
    User.findOne({ username }, function (err, doc) { // 通过此model以用户名的条件 查询数据库中的匹配信息
        if (err) { // 错误就返回 状态码为500的错误
            res.send(500);
        } else if (!doc) { // 查询不到用户名匹配信息，则用户名不存在
            res.send({code: 400, message: '用户名不存在'}); //    状态码返回404
        } else {
            if (req.body.password != doc.password) { // 查询到匹配用户名的信息，但相应的password属性不匹配
                res.send({code: 400, message: '密码错误'});
            } else { // 信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                let token = jwt.encode(doc, global.secret);
                res.send({code: 20000, token});
            }
        }
    })
})
module.exports = router;
