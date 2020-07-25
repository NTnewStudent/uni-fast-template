const install = (Vue, vm) => {

	// 此为自定义配置参数
	Vue.prototype.$u.http.setConfig({
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {


		//过滤api 如果当前接口与过滤器的API一致则退出拦截
		for (let i = 0; i < vm.$u.http.config.filter.length; i++) {
			if (config.url.indexOf(vm.$u.http.config.filter[i]) != -1) {
				// config.data.token = token;
				// config.data.platform_id = config.data.platform_id || 1
				return config
			}
		}

		//是否开启鉴权模块
		if (vm.$u.http.config.authentication == false) {
			return config
		}

		const token = vm.CacheManagement.get(vm.constCacheKey.token)
		const taburl = vm.$u.http.jumpPath.page
		let pages = getCurrentPages();
		let currPage = null;
		if (pages.length) {
			currPage = pages[pages.length - 1]
		}
		let route = currPage.route
		/**
		 * 当前页面是登录页面并且token为空
		 */
		if (token == '' && (taburl.indexOf(route) != -1)) {
			vm.$u.toast('您还未登录，请登录');
			return
		}
		/**
		 * 当前不是登录页面并且没有登录显示提示框
		 */
		if (token == '' && taburl.indexOf(route) == -1) {
			vm.$u.toast('您还未登录，请登录');
			vm.CacheManagement.cleanAll()
			setTimeout(() => {
				vm.$u.route({
					type: vm.$u.http.jumpPath.type,
					url: vm.$u.http.jumpPath.page[vm.$u.http.jumpPath.index]
				})
			}, 1500)
			return ''
		}
		config.data.token = token;
		console.log(config)
		return config;
	}

	/**
	 * 拦截响应
	 */
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if (res.code == 1) {
			return res;
		} else if (res.code == 0) {

			/**
			 * 没有开启鉴权模块直接退出
			 */
			if (vm.$u.http.config.authentication == false) {
				return res
			}

			//token失效
			if (res.data.code != undefined) {
				if (res.data.code == 'token_is_invalid' || res.data.code == 'token_in_blacklisted') {
					//跳转
					vm.$u.route({
						type: 'switchTab',
						url: '/pages/user/user'
					})

				} else if (res.data.code == 'token_has_expired') {
					/**
					 * 刷新token 保存token
					 */
					vm.$u.http.tokenRefresh()
				} else if (res.data.code == 'refresh_token_has_expired') {
					//跳转
					vm.$u.route({
						type: 'switchTab',
						url: '/pages/user/user'
					})
				}
				return res
			}
		} else {
			return res
		}
	}


}

export default {
	install
}
