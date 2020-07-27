<template>
	<view>
		<view v-for="(item,index) in templateUrl" :key="index">

			<button @click="toPage(item.path)">{{item.name}}</button>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				templateUrl: [, {
					"path": "/pages/componetsDemo/getUserInfoDemo/getUserInfoDemo",
					"name": '获取微信用户授权'
				}, {
					"path": "/pages/componetsDemo/getMobileCode/getMobileCode",
					"name": '获取短信验证码'
				}, , {
					"path": "/pages/componetsDemo/getWechatPhone/getWechatPhone",
					'name': '获取微信手机号'
				}]
			}
		},
		onLoad() {},
		methods: {
			toPage(path) {
				console.log(path)
				uni.navigateTo({
					url: path,
					fail(res) {
						console.log(res)
					}
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
