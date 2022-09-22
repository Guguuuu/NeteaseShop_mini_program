import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import cart from './modules/cart.js'

// 安装插件
Vue.use(Vuex);

// 创建仓库
const store = new Vuex.Store({
	modules: {
		home,
		cart
	}
})

export default store
