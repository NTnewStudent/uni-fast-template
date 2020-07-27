# uni-fast-template
集成加密解密请求过滤请求拦截一键引入微信功能等高级功能，让开发更快

<b>内置uview框架 文档:</b>
## uView UI，是[uni-app](https://uniapp.dcloud.io/)生态优秀的UI框架，全面的组件和便捷的工具会让您信手拈来，如鱼得水

##components
此目录为自定义组件目录，API接口层次在此调用,通过$emit()传递给上级页面
尽量每一个功能对应一个单一的组件,
父组件通过@event="handle" hande(res) 此res为$emit返回的值来进行其它业务逻辑处理

##pages/componetsDemo
此目录为组件测试目录,如有需要直接复制使用

##pages/pageteplatedemo
此目录为常用模板页面目录，如有需要直接复制使用

##全局配置
App.vue集成了 token鉴权以及全局加密配置,默认token鉴权开启,加密为关闭。
```
app.$u.http.config.encryption = false      			是否开启加密和解密

app.$u.http.config.solt = 'ak#2@12345'				加密密码

app.$u.http.config.authentication = true	 		是否开启token鉴权 默认是开启

app.$u.http.config.debug = true			      		是否开启debug模式,默认开启,如果开启自动打印每次请求结果

app.$u.http.config.filter = ['/a031/user/xiaochengxu_login',...]	API过滤器,不执行拦截请求
```

##调用示例
###子组件
get-user-info.vue 组件
```
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
								self.$u.api.wxlogin({
									code: res.code,
									iv: userInfo.iv,
									encryptedData: userInfo.encryptedData
								}).then(res => {
									//返回给父组件
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

```

###父组件
/pages/getUserInfo/getUserInfo
```
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
				this.CacheManagement.set(this.constCacheKey.token,result)
			},
		}
	}
</script>
<style>
</style>
```


