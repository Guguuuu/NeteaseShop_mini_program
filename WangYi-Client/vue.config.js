//小程序本身不会有跨域问题，但是项目在浏览器中运行时存在跨域，所以配置代理服务器
 module.exports = {
	 devServer: {
		 proxy: {
			 '/api': {
				 target: 'http://localhost:5000',
				 ws: true,
				 changeOrigin: true,
				 pathRewrite: {
					 '^/api':''
				 }
			 }
		 }
	 }
 }