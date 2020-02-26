const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const app = express()
const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/static', express.static(path.join(__dirname, 'static')))
const upload=require('./routes/upload.js')
const login=require('./routes/login.js')
const creatplay=require('./routes/creatplay.js')
const getplay=require('./routes/getplay.js')
const like=require('./routes/like.js')
const joinplay=require('./routes/joinplay.js')
const myplay=require('./routes/myplay.js')
const myjoinplay=require('./routes/getmyjoinplay.js')
app.use('/upload',upload)
app.use('/login',login)
app.use('/creatplay',creatplay)
app.use('/getplay',getplay)
app.use('/like',like)
app.use('/joinplay',joinplay)
app.use('/getmyplay',myplay)
app.use('/getmyjoinplay',myjoinplay)
app.listen(8000,'192.168.1.105', () => {
    console.log(`服务器开启`)
  })
