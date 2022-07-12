import Vue from 'vue'
import Vuex from 'vuex'

// 引入词典仓库
import dictionary from '@/store/dictionary/index.js'

Vue.use(Vuex)

const store=new Vuex.Store({
	modules:{dictionary}
})

export default store