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
							provider: self.type,
							success(userInfo) {

								/**
								 * 
								 * 请在这里自定义你的token
								 * 
								 */
								self.$u.api.wxlogin({
									code: res.code,
									iv: userInfo.iv,
									encryptedData: userInfo.encryptedData
								}).then(res => {
									/**
									 * 设置userInfo缓存
									 */
									console.log(res.data.token)
									self.$u.toast('你的登陆token:' + res.data.token)

									self.$emit('getInfo', res.data.token)

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
