var express=require('express');
const router=express.Router();
const sql=require('./sql.js')

router.post('/like',(req,res)=>{
    console.log('成功接收到点赞请求')
    let kind=req.body.kind
    if(kind==1){
      sql.sqlQuery('UPDATE playlist SET likeNum=likeNum+1 WHERE guid=?',req.body.guid)
        .then(data=>{
            sql.sqlQuery('insert into likeplay values(?,?,?)',[req.body.guid,req.body.userid,req.body.time])
                .then(data=>{
                    res.send({status:200,msg:'点赞成功'})
                })
                .catch(err=>{
                    console.log(err)
                })
        })
        .catch(err=>{
            console.log(err)
        })  
    }else if(kind==0){
        sql.sqlQuery('UPDATE playlist SET likeNum=likeNum-1 WHERE guid=?',req.body.guid)
            .then(data=>{
                sql.sqlQuery('delete from likeplay where guid=? and userid=?',[req.body.guid,req.body.userid])
                .then(data=>{
                    res.send({status:200,msg:'取消点赞成功'})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            .catch(err=>{
                console.log(err)
            })  
    }
    
})

module.exports=router;