export default {
	namespaced:true,
	
	state:()=>({
		history:JSON.parse(uni.getStorageSync('history') || '[]')
	}),
	
	getters:{},
	
	actions:{},
	
	mutations:{
		// 更新搜索历史
		updateHistory(state,keyword){
			// 去重
			let index=state.history.indexOf(keyword)
			if(index!=-1){
				state.history.splice(index,1)
			}
			state.history.unshift(keyword)
			// 存储到本地
			this.commit('dictionary/saveHistory')
		},
		// 清空搜索记录
		clear(state){
			state.history=[]
			uni.removeStorageSync('history')
		},
		// 将搜索历史存储到本地
		saveHistory(state){
			uni.setStorageSync('history',JSON.stringify(state.history))
		}
	}
}