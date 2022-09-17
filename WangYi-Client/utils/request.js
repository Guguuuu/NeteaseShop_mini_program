import base from './base'
//request封装一个用于异步请求的函数
export default (url,data={},method='GET')=>{
	return new Promise((resolve,rejects)=>{
		uni.request({
		    url:base.host+url, //此时url只需要和请求的接口的值保持一致即可,小程序的请求方式
		    //url, //H5的请求方式
		    data,
			method,
		    success: (res) => {
		        resolve(res.data)
		    },
			fail: (err) => {
				rejects(err.errMsg)
			}
		})
	})
}