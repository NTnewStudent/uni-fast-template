import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App
})

import httpInterceptor from '@/common/http.interceptor.js' //http拦截器
import httpApi from '@/common/http.api.js' //项目接口

Vue.use(httpApi, app)
Vue.use(httpInterceptor, app)
Vue.use(Vuex)

//token失效后跳转的路径 带路径名不需要 / 
/**
 * page为tab页面请配置上所有的tab页面和你需要跳转的登录页面
 * index:为token失效后需要跳转的页面索引,从0开始
 * type:为跳转类型tab跳转使用switchTab,其它页面使用redirectTo
 */
app.$u.http.jumpPath = {
	page: ['pages/index/index', 'pages/center/center', 'pages/user/user'],
	type: 'switchTab',
	index: 2
}
//token失效后刷新的方法
app.$u.http.tokenRefresh = function() {
	/*--------------------------------------------------*/
	Vue.prototype.$u.api.refreshToken({}).then(res => {
		app.$u.toast('已刷新')
		console.log(res)
		app.CacheManagement.set(app.constCacheKey.token, res.data)
	})
	/*--------------------------------------------------*/
}
//是否开启加密和解密
app.$u.http.config.encryption = false

//加密密码
app.$u.http.config.solt = 'ak#2@12345'

//是否开启token鉴权 默认是开启 
app.$u.http.config.authentication = true

//是否开启debug模式,默认开启,如果开启自动打印每次请求结果
app.$u.http.config.debug = true

//API过滤器,不执行拦截请求
app.$u.http.config.filter = ['/a031/user/xiaochengxu_login']

/**
 * 全局统一管理常驻缓存,使用key值明确获取,避免多人开发定义多个key
 */
Vue.prototype.constCacheKey = {
	token: 'token', //token缓存
	userinfo: 'userinfo' //用户信息缓存
}

/**
 * 统一使用同步方法避免缓存问题
 */
Vue.prototype.CacheManagement = {
	/**
	 * 获取指定缓存
	 * @param {Object} key
	 */
	get: function(key) {
		return uni.getStorageSync(key)
	},
	/**
	 * 删除指定缓存
	 * @param {Object} key
	 */
	clean: function(key) {
		uni.removeStorageSync(key)
	},
	/**
	 * 设置对应的key的缓存(value)
	 * @param {Object} key
	 */
	set: function(key, value) {
		uni.setStorageSync(key, value)
	},
	/**
	 * 删除所有缓存
	 */
	cleanAll: function() {
		uni.clearStorageSync()
	}
}



/**
 * 添加状态
 */
const store = new Vuex.Store({

})

app.$mount()
