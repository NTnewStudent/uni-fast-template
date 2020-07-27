<template>
	<view>
		<!-- 用户微信获取数据 -->
		<getuserinfo :loginType="weixin" @getInfo="wxLogin"></getuserinfo>
	</view>
</template>

<script>
	//微信用户授权
	import getuserinfo from '@/components/get-user-info.vue';

	export default {
		components: {
			getuserinfo
		},
		data() {
			return {
				status: false,
			}
		},
		methods: {
			wxLogin(result) {
				/**
				 * 用户信息解密并且返回
				 * @param {Object} res
				 * @return {userInfo}
				 */
				//api登录
				this.$u.toast('你的登陆token:' + result)
				/**
				 * 获取token以后自定义逻辑
				 * 
				 */
				this.CacheManagement.set(this.constCacheKey.token, result)
			},
		}
	}
</script>

<style>

</style>
