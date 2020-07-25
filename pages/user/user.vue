<template>
	<view>
		<!-- 用户微信获取数据 -->
		<getuserinfo :loginType="weixin" @getInfo="wxLogin"></getuserinfo>
	</view>
</template>

<script>
	import getuserinfo from '../../components/get-user-info.vue';
	export default {
		components: {
			getuserinfo
		},
		data() {
			return {
				status: false,
			}
		},
		onLoad() {
		},
		methods: {
			/**
			 * 微信登录获取用户信息实际开发请更改API路径
			 * @param {Object} result
			 */
			wxLogin(result) {
				/**
				 * 用户信息解密并且返回
				 * @param {Object} res
				 * @return {userInfo}
				 */
				//api登录
				this.$u.api.wxlogin(result).then(res => {
					/**
					 * 设置userInfo缓存
					 */
					console.log(res.data.token)
					this.CacheManagement.set(this.constCacheKey.token, res.data.token.token)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #14162d;
	}
</style>
