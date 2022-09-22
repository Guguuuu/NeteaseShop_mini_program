

<template>
	<view><button open-type="getUserInfo" @click="getUser">登录</button></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		getUser() {
			// 推荐使用 wx.getUserProfile 获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			// 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			wx.getUserProfile({
				desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				success: res => {
					// 用户信息
					// console.log(res);
					// 存储用户信息
					wx.setStorage({
					  key:"userinfo",
					  data:JSON.stringify(res.userInfo)
					})
					// 页面跳转，回到个人中心；把其他页面都关闭
					wx.reLaunch({
						url:'/pages/personal/personal'
					})
					
				}
			});
		}
	}
};
</script>

<style lang="stylus">

</style>
