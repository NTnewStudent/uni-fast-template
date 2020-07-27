<template>
	<view>
	<!-- 获取手机验证码 -->
		<getmobilecode :tel="mobile" @getCode="getCodeFun">获取手机号</getmobilecode>
		
	</view>
</template>

<script>
	//获取手机验证码
	import getmobilecode from '@/components/get-mobile-code.vue';
	export default {
		components:{
			getmobilecode
		},
		data() {
			return {
				mobile:'15338503994'
			}
		},
		methods: {
			/**
			 * 返回手机验证码
			 * @param {Object} code
			 */
			getCodeFun(code) {
				this.$u.toast('你的验证码:'+code)
			}
		}
	}
</script>

<style>

</style>
