// /common/http.api.js

// var url = "http://www.lav.com/api/" 
var url = "https://dyapi.bianxianying.com/api/"

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex
const install = (Vue, vm) => {


	/************ 个人 ************/
	//登录
	let wxlogin = (params = {}) => vm.$u.post(url + 'a031/user/xiaochengxu_login', params)

	//测试个人信息
	let getUserInfos = (params = {}) => vm.$u.get(url + 'a031/user/info', params)

	//测试刷新token
	let refreshToken = (params = {}) => vm.$u.post(url + 'a031/user/refresh', params)

	//个人信息
	let userInfo = (params = {}) => vm.$u.get(url + 'user_info', params)

	//加解密测试
	let decodeTest = (params = {}) => vm.$u.get(url + 'index', params)

	//获取短信验证码测试
	let getPhoneCode = (params = {}) => vm.$u.get(url + 'a031/verify/mobile', params)

	//解密手机号测试
	let getPhoneNumber = (params = {}) => vm.$u.post(url + 'a031/user/get_mobile', params)


	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		wxlogin,
		refreshToken,
		getUserInfos,
		decodeTest,
		getPhoneCode,
		getPhoneNumber
	}
}

export default {
	install
}
