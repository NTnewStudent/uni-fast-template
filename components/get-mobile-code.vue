<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎使用XXX</view>
			<input class="u-border-bottom" type="number" v-model="tel" placeholder="请输入手机号" />
			<view class="tips">提示</view>
			<button @tap="submit" class="getCaptcha">{{btnText}}</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'getmobilecode',
		props: {
			tel: {
				type: String,
				default: ''
			}

		},
		data() {
			return {
				btnText: '获取短信验证码',
				timerTask: null,
				step: 60
			}

		},
		computed: {},
		destroyed() {
			console.log('asdasdasdas')
			if (this.timerTask != null) {
				clearInterval(this.timerTask)
			}
		},
		methods: {
			submit() {
				var self = this
				if (this.timerTask != null) {
					return
				}
				this.timerTask = setInterval(function() {
					console.log('run')
					if (self.step > 0) {
						self.step--;
						self.btnText = self.step
					} else {

						clearInterval(self.timerTask)
						self.timerTask = null
						self.btnText = '获取短信验证码'
						self.step = 60
					}
				}, 1000)

				this.getCode()

			},
			/**
			 * 此代码为示例代码,具体参数需要根据实际情况替换
			 */
			getCode() {
				var self = this
				/**
				 * 在这里更换你的API接口
				 */
				this.$u.api.getPhoneCode({
					mobile: this.tel,
					type: 'bind_mobile'
				}).then(res => {
					self.$emit('getCode', '199812')
				})

			}
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>
