const express=require('express');
const router=express.Router();
const fs=require('fs');
const path=require('path');
const sql=require('./sql.js');
//上传图片的模板
var multer=require('multer');
//生成的图片放入uploads文件夹下
var upload=multer({dest:'uploads/'})
//图片上传必须用post方法
router.post('/img',upload.single('test'),(req,res)=>{
    console.log('成功接收上传图片请求')
    //读取文件路径
    fs.readFile(req.file.path,(err,data)=>{
        //如果读取失败
    if(err){return res.send('上传失败')}
    //如果读取成功
    //声明图片名字为时间戳和随机数拼接成的，尽量确保唯一性
    let time=Date.now()+parseInt(Math.random()*999)+parseInt(Math.random()*2222);
    //拓展名
    let extname=req.file.mimetype.split('/')[1]
    //拼接成图片名
    let keepname=time+'.'+extname
    //三个参数
    //1.图片的绝对路径
    //2.写入的内容
    //3.回调函数
    fs.writeFile(path.join(__dirname,'../static/img/'+keepname),data,(err)=>{
        if(!err){
            sql.sqlQuery("insert into imgPath(guid,userid,imgPath) values(?,?,?)",
                        [req.body.guid,req.body.userid,`http://192.168.1.105:8000/static/img/${keepname}`]
                )
            .then(data=>{
                console.log('上传成功')
                res.send({status:200,msg:'上传成功'})
            })
            .catch(err=>{
                sql.sqlQuery("UPDATE imgpath SET imgPath=CONCAT(imgPath,?) WHERE guid=?",
                        [`-http://192.168.1.105:8000/static/img/${keepname}`,req.body.guid]
                )
                .then(data=>{
                    res.send({status:200,msg:'多张图片上传成功'})
                    console.log('多图拼接成功')
                })
                .catch(err=>{
                    console.log('多图拼接失败')
                })
            })
        }else{
            res.send({status:0,msg:'上传失败'})
        }
        
    });
 });
})
module.exports=router;