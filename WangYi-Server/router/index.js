const express = require('express')
const router = express.Router()

router.get('/test',(req,res)=>{
	res.send('测试成功')
})


//加载首页分类数据 -- 滑块
const indexData = require('../datas/index.json')
//请求滑块数据接口，返回数据
router.get('/getIndexData',(req,res)=>{
	res.send({
		status:200,
		indexData
	})
})

//加载首页里的分类数据
const indexCateList = require('../datas/indexCateList.json')
//请求分类数据的接口
router.get('/getIndexCateList',(req,res)=>{
	res.send({
		status:200,
		indexCateList
	})
})

module.exports = router