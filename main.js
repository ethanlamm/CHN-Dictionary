
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 引入store
import store from '@/store/index.js'


// 引入escook请求库
import {$http} from '@escook/request-miniprogram'
// 挂载到uni.$http上
uni.$http=$http
// 请求根路径
$http.baseUrl='https://api.jisuapi.com'
// 请求拦截器
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}
// 响应拦截器
$http.afterRequest=function(){
	uni.hideLoading()
}
// 封装弹窗函数
uni.$showMsg=function(title='数据请求失败'){
	uni.showToast({
		title,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	// 挂载
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif