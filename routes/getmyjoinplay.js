var express=require('express');
const router=express.Router();
const sql=require('./sql.js')
router.get('/getmyjoinplay',(req,res)=>{
    sql.sqlQuery(`select a.*,b.imgPath from joinplay a left outer join imgpath b on a.guid=b.guid
                where a.userid=?`,req.query.userid)
        .then(data=>{
            console.log(data)
            res.send(data)
        })
        .catch(err=>{
            console.log(err)
            res.send({status:0,msg:'获取失败'})
        })       
})


module.exports=router