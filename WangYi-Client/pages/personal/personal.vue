<template>
	<view class="personal">
		<view class="header">
			<!-- 登录状态 -->
			<template v-if="userInfo.nickName">
				<image class="img" :src="userInfo.avatarUrl" mode=""></image>
				<text>{{ userInfo.nickName }}</text>
				<button class="exit" @click="exit">退出登录</button>
			</template>

			<!-- 未登录的 -->
			<template v-else>
				<image class="img" src="/static/images/personal/personal.png" mode=""></image>
				<text class="login" @click="toLogin">去登录</text>
			</template>
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
export default {
	data() {
		return {
			userInfo: {} //个人信息
		};
	},
	mounted() {
		// 从本地存储里读取数据=====>只是基本信息（昵称，头像）
		wx.getStorage({
			key: 'userinfo',
			success: res => {
				console.log(res.data);
				if (res.data) {
					this.userInfo = JSON.parse(res.data);
				}
			}
		});

		//调用接口获取登录凭证（code）
		wx.login({
			success:async res=> {
				if (res.code) {
					let code=res.code;
					// 2、将code发送给开发服务器(自己的服务器)
					const token=await request('/getOpenId',{code});
					console.log(token);
				} else {
					console.log('登录失败！' + res.errMsg);
				}
			}
		})
	},
	methods: {
		toLogin() {
			// 关闭所有页面，打开到应用内的某个页面
			wx.reLaunch({
				url: '/pages/login/login'
			});
		},
		exit() {
			// 清空
			wx.setStorage({
				key: 'userinfo',
				data: ''
			});
			// 去登录页
			wx.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style lang="stylus">
.personal
	.header
		height 300rpx
		line-height 200rpx
		background-color #EED7B5
		display flex
		.img
			height 100rpx
			width 100rpx
			vertical-align middle
			margin 50rpx
			border-radius 50rpx
		.exit
			height 80rpx
</style>
