<template>
	<view>
		<getwechatphonenumber @get="handle"></getwechatphonenumber>
	</view>
</template>

<script>
	import getwechatphonenumber from '@/components/get-wechat-phoneNumber.vue'
	export default {
		components: {
			getwechatphonenumber
		},
		data() {
			return {

			}
		},
		methods: {
			handle(phoneNumber) {
				this.$u.toast('你的手机号为'+phoneNumber)
			}
		}
	}
</script>

<style>

</style>
