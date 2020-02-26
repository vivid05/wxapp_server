var express=require('express');
const router=express.Router();
const sql=require('./sql.js');
//select a.*,b.imgPath from playlist a left outer join imgpath b on a.guid=b.guid
router.get('/getplay',(req,res)=>{
    let num=req.query.redio
    let redio=num== 'undefined' ? '%' : num
    sql.sqlQuery(`select a.*,b.imgPath from playlist a left outer join imgpath b on a.guid=b.guid
                 where redio like ?`,[redio])
    .then(data=>{
        
        res.send(JSON.stringify(data))
    })
    .catch(err=>{
        console.log(err)
    })

})
module.exports=router;