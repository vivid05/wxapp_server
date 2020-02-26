var express=require('express');
const router=express.Router();
const sql=require('./sql.js')
var request = require('request');
router.get('/login',(req,res)=>{
    var code=req.query.code;
    var appid=req.query.Appid;
    var appSecret=req.query.AppSecret;
    console.log('成功接收登录请求')
    request(`https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`, function (error, response, body) {
        var data=JSON.parse(body)
        res.send(data.openid)
    });
})
module.exports=router;
