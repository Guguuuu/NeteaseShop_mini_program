import request from '../../utils/request.js'

const state = {
	indexData: {}, //首页数据
	CateList:{} //推荐模块之外，其他所有模块的数据
}

const mutations = {
	//修改首页数据
	changeIndexDataMutations(state,indexData){
		state.indexData = indexData
	}
}

const actions = {
	// 发送网络请求，拿首页数据
	async getIndexDataActions({commit}){
		// 1、执行异步任务，发送网络请求
		const res = await request('/getIndexData')
		// 2、触发mutation
		commit('changeIndexDataMutations',res.indexData)
	}
}

const getters = {
	
}

export default {
	namespaced: true,//如果不开启命名空间，则只有state会分模块，后面的都不会分。开启之后，那么都会分模块
	state,
	mutations,
	actions,
	getters
}