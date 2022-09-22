<template>
	<view class="indexContainer">
		<!-- 头部 -->
		<view class="header">
			<image class="logo" src="/static/images/logo.png" mode=""></image>
			<view class="search">
				<text class="iconfont icon-sousuotianchong"></text>
				<input type="text" value="" placeholder="搜索..." placeholder-class="placeholder" />
			</view>
			<button type="default">张三张三</button>
		</view>
		<!-- 滑块 -->
		<scroll-view class="navcroll" scroll-x="true" enable-flex v-if="indexData.kingKongModule">
			<view class="navItem" :class="{ active: navIndex === -1 }" @click="changeIndex(-1,-1)">推荐</view>
			<view
				class="navItem"
				:class="{ active: navIndex === index }"
				@click="changeIndex(index,item.L1Id)"
				v-for="(item, index) in indexData.kingKongModule.kingKongList"
				:key="item.L1Id"
			>
				{{ item.text }}
			</view>
		</scroll-view>
		
		<!-- 内容区 -->
		<scroll-view scroll-y="true" >
			<!-- 推荐模块, 跟其他模块互斥关系 v-if-->
			<Recommend v-if="navIndex===-1"></Recommend>
			<!-- 分类 -->
			<CateList v-else :L1Id='L1Id'></CateList>
		</scroll-view>
		
		
		
	</view>
</template>

<script>
import request from '../../utils/request.js';
import Recommend from '../../components/Recommend/Recommend.vue'
import CateList from '../../components/CateList/CateList.vue'
// vuex
import { mapActions, mapState } from 'vuex';
export default {
	components:{
		Recommend,
		CateList
	},
	data() {
		return {
			
			navIndex: -1 ,//点谁，谁高亮，导航的标记
			L1Id:-1,
		};
	},
	computed:{
		// ...mapState('模块',['数据'])
		// ...mapState('home',['indexData'])
		...mapState({
			indexData:state=>state.home.indexData
		})
	},
	onLoad() {},
	mounted() {
		// 获取仓库里的测试数据
		console.log(this.$store.state.home.test);
		// 1、触发action： this.$store.dispatch('模块名/action名')
		// this.$store.dispatch('home/getIndexDataActions')
		// 2、触发action： 
		this.getIndexDataActions();
		
		// this.getIndexData();
	},
	methods: {
		...mapActions('home',['getIndexDataActions']),
		async getIndexData() {
			const res = await request('/getIndexData'); //小程序
			// const res = await request('/api/getIndexData'); //H5
			this.indexData = res.indexData;
		},
		// 点击切换下标
		changeIndex(index,L1Id) {
			// console.log(index);
			// 把点击当前项的Index,赋值给导航标记
			this.navIndex = index;
			this.L1Id=L1Id;
		}
	}
};
</script>

<style lang="stylus">
.indexContainer
	.header
		display flex
		padding 10rpx 5rpx
		.logo
			width 140rpx
			height 40rpx
			margin 10rpx
		.search
			// width 420rpx
			flex 1
			height 60rpx
			background #f5f5f5
			position relative
			input
				width 360rpx
				height 60rpx
				margin-left 60rpx
				// 重新placeholder 样式
				.placeholder
					font-size 26rpx
					color #333
			.iconfont
				position absolute
				font-size 40rpx
				left 10rpx
				top 10rpx
		button
			width 144rpx
			height 60rpx
			line-height 60rpx
			text-align center
			font-size 26rpx
			padding 0 4rpx
			margin-left: 10rpx
	.navcroll
		display flex
		// 一定要设置高！否则占满全屏
		height: 75rpx
		// 不换行
		white-space nowrap
		.navItem
			display inline-block
			height 40rpx
			padding 10rpx
			font-size 26rpx
			&.active
				color #BB2C08
				border-bottom 3rpx solid #BB2C08
.test
	color red
</style>
