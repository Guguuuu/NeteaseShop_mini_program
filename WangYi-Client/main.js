import App from './App'


import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 引入仓库
import store from './store/index'


const app = new Vue({
    ...App,
	store
})
app.$mount()
