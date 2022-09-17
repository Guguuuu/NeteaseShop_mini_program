const express = require("express")

//创建服务器
const app = express()
//引入路由
const router = require('./router/index')

app.use('/',router)

app.listen(5000,(req,res)=>{
	console.log('服务器启动成功！');
	console.log('http://localhost:5000');
})