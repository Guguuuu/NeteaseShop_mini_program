<template>
	<view class="content">
		<view class="indexContainer">
			<!-- 头部 -->
			<view class="header">
				<image class="logo" src="/static/images/logo.png" mode=""></image>
				<view class="search">
					<text class="iconfont icon-sousuotianchong"></text>
					<input type="text" placeholder="输入搜索内容" placeholder-class="placeholder">
				</view>
				<button type="default">Guguuuu</button>
			</view>
			
			<!-- 滑块 -->
			<scroll-view class="navScroll" scroll-x="true" enable-flex v-if="indexData.kingKongModule">
				<view class="navItem" :class="{active:navIndex === -1}" @click="changeIndex(-1,-1)">推荐</view>
				<view class="navItem" :class="{active:navIndex === index}" v-for="(item,index) in indexData.kingKongModule.kingKongList" :key="item.L1Id" @click="changeIndex(index,item.L1Id)">{{item.text}}</view>
			</scroll-view>
			
			<!-- 内容区 -->
			<scroll-view scroll-y="true" >
				<!-- 推荐模块, 跟其他模块互斥关系 v-if-->
				<Recommend v-if="navIndex===-1"></Recommend>
				<!-- 分类 -->
				<CateList v-else :L1Id='L1Id'></CateList>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import request from '../../utils/request.js'
	import { mapActions,mapState } from 'vuex'
	import Recommend from '../../components/Recommend/Recommend.vue'
	import CateList from "../../components/CateList/CateList.vue"
	
	export default {
		data() {
			return {
				navIndex:-1,
				L1Id:-1
			}
		},
		components:{
			Recommend,
			CateList
		},
		computed: {
			// 相当于 indexData() { return this.$store.state.home.indexData}
			...mapState('home',['indexData'])
			// 还可以这么写
			//  ...mapState({ indexData:state => state.home.indexData },)
		},
		onLoad() {
		
		},
		methods: {
			// 点击更换下标
			changeIndex(index,L1Id){
				this.navIndex = index
				this.L1Id = L1Id 
				// 因为滑块那个地方一共就Recommend推荐组件和CateList其他分类组件，除推荐以外，后面什么居家生活、服饰鞋包那些模板都是一样的，数据不一样而已，我们可以根据此时点击的是哪一个L1Id与请求的这个接口后返回的数据中的某个字段相等，来让CateList组件渲染某一套数据
			},
			// 在mounted中 this.$store.dispatch('home/getIndexDataActions')	这是触发action的第一种写法，但其实可以利用mapActions 即第二种写法
			...mapActions('home',['getIndexDataActions']) // 那么getIndexDataActions就能作为一个方法去调用，方法体的内容就是第一种写法。	
		},
		mounted() {
			this.getIndexDataActions()
		},
	}
</script>

<style lang="stylus">
	.indexContainer
		.header
			display: flex
			padding: 10rpx 5rpx
			.logo
				width: 140rpx
				height: 40rpx
				margin: 10rpx
			.search
				position: relative
				width: 420rpx
				height: 60rpx
				background: #f5f5f5
				input
					width: 360rpx
					height: 60rpx
					margin-left: 60rpx
					.placeholder
						font-size: 26rpx
						color: #333
				.iconfont
					position: absolute
					font-size: 40rpx
					left: 10rpx
					top: 10rpx
			button
				width: 144rpx
				height: 60rpx
				line-height: 60rpx
				text-align: center
				font-size: 26rpx
				padding: 0 4rpx
			
		.navScroll
			display: flex
			white-space: nowrap
			height: 70rpx
			.navItem
				display: inline-block
				height: 40rpx
				padding: 10rpx
				font-size: 26rpx
				&.active
					border-bottom: 3rpx solid #bb2c08
					color: #bb2c08
</style>
			