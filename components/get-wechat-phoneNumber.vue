<!-- 不要使用open-type 会发生解密失败使用login 在内联getUserInfo可以避免 -->
<template>
	<view>

		<button open-type="getPhoneNumber" @getphonenumber="handle">获取手机号</button>
	</view>
</template>

<script>
	export default {
		name: 'get-wechat-phone-number',
		props: {},
		data() {
			return {
				status: false,
				texttemp: '获取'
			};
		},
		methods: {
			handle(info) {
				var self = this
				console.log(info)
				uni.login({
					provider: 'weixin',
					success(res) {
						self.$u.api.getPhoneNumber({
							code: res.code,
							iv: info.detail.iv,
							encryptedData: info.detail.encryptedData
						}).then(res => {
							console.log(res)
							self.$emit('get',res.data.phoneNumber)
						})

					}
				})


			}
		}
	}
</script>

<style>

</style>
