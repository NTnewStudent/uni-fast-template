<template>
	<view>
		<button @click="refreshToken()">测试token刷新</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			// this.decodeUrlTest()
			// this.decodeTests()
		},
		methods: {
			/**
			 * 编码获取参数测试
			 */
			decodeUrlTest() {
				console.log(this.$u.url.getDecodeUrlParams('t%3Diagsro%26q%3D17'))
			},

			/**
			 * 加解密测试
			 */
			decodeTests() {
				var formdata = {
					code: 200,
					data: [
						1, 2, 4, 6, 7
					],
					ids: '1,2,3,5,76,9',
					obj: {
						name: 'abc'
					}
				}

				this.$u.api.decodeTest(formdata).then(res => {
					console.log(res.data)
				})
			},

			refreshToken() {
				console.log(this.$u.api)
				this.$u.api.getUserInfos({}).then(res => {
					console.log(res)
				}).catch(e => {
					console.log(e)
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
