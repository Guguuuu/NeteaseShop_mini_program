import request from '../../utils/request.js'

const state={
	test:'测试数据',
	indexData: {}, //首页数据
}
const mutations={
	// 修改首页数据
	changeIndexDataMutations(state,indexData){
		state.indexData=indexData;
	}
	
}

const actions={
	// 发送网络请求，拿首页数据
	async getIndexDataActions({commit}){
		// 1、执行异步任务，发送网络请求
		const res=await request('/getIndexData'); //小程序
		// 2、commit 触发 mutation，
		commit('changeIndexDataMutations',res.indexData)
		
	}
}

const getters={
	
}

export default {
	namespaced:true,
	state,
	mutations,
	actions,
	getters
}