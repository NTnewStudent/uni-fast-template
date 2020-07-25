<!-- 不要使用open-type 会发生解密失败使用login 在内联getUserInfo可以避免 -->
<template>
	<view>
		<button open-type="getUserInfo" @click="handle">{{texttemp}}</button>
	</view>
</template>

<script>
	export default {
		name: 'get-user-info',
		props: {
			//登录类型
			loginType: {
				type: String,
				default: 'weixin'
			}
		},
		data() {
			return {
				status: false,
				texttemp: '登录'
			};
		},
		methods: {
			handle(userInfo) {
				var self = this
				uni.login({
					provider: this.type,
					success(res) {
						uni.getUserInfo({
							provider: 'weixin',
							success(userInfo) {
								console.log(userInfo)
								self.$emit('getInfo', {
									code: res.code,
									iv: userInfo.iv,
									encryptedData: userInfo.encryptedData
								})

							}
						})
					}
				})

			}
		}
	}
</script>

<style>

</style>
