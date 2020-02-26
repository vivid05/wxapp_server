var express=require('express');
const router=express.Router();
const sql=require('./sql.js');

router.post('/joinplay',(req,res)=>{
    sql.sqlQuery('UPDATE playlist SET joinNum=joinNum+1 WHERE guid=?',req.body.guid)
        .then(data=>{
            sql.sqlQuery('insert into joinplay values(?,?,?)',[req.body.guid,req.body.userid,req.body.time])
                .then(data=>{
                    res.send({status:200,msg:'加入成功'})
                })
                .catch(err=>{
                    res.send({status:0,msg:'加入失败'})
                    console.log(err)
                })           
        })
        .catch(err=>{
            console.log(err)
        })
    
})

module.exports=router;