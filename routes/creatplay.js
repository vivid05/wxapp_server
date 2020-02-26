var express=require('express');
const router=express.Router();
const sql=require('./sql.js')
router.post('/creatplay',(req,res)=>{
    console.log('成功接收发起请求');
    sql.sqlQuery(
        `insert into playList(guid,userid,username,userimg,redio,theme,time,place,wechat,personNum,likeNum)
         values(?,?,?,?,?,?,?,?,?,?,?)`,
         [req.body.guid,req.body.userid,req.body.username,req.body.userimg,req.body.redio,req.body.theme,req.body.time,req.body.place,req.body.wechat,req.body.personNum,0]
        )
    .then(data=>{
        console.log('插入成功')
        res.send({status:200,msg:'提交成功'})
    })
    .catch(err=>{
        console.log(err)
        res.send({status:0,msg:'提交失败'})
    })
    //console.log(req.body)
    
})
module.exports=router;