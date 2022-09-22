<template>
	<view class="category">
		<!-- 搜索 -->
		<view class="header"><view class="search">商品搜索</view></view>
		<!-- 内容区域 -->
		<view class="content">
			<view class="left">
				<scroll-view class="navScroll" scroll-y="true">
					<view class="navItem" :class="{ active: index === navIndex }" @click="changeNavIndex(index)" v-for="(item, index) in categoryDatas" :key="item.id">
						{{ item.name }}
					</view>
				</scroll-view>
			</view>
			<view class="right">
				<scroll-view class="categoryScroll" scroll-y="true">
					<!-- 大图 -->
					<image class="cateImg" :src="cateObj.imgUrl" mode=""></image>
					<!-- 列表 -->
					<view class="goodsList">
						<view class="goodsItem" v-for="item in cateObj.subCateList" :key="item.id">
							<image class="goodsImg" :src="item.wapBannerUrl" mode=""></image>
							<view class="goodsName">{{item.name}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import request from '../../utils/request.js';
export default {
	data() {
		return {
			categoryDatas: [],
			navIndex: 0
		};
	},
	mounted() {
		this.getCategory();
	},
	computed: {
		// 计算属性
		cateObj() {
			console.log(this.categoryDatas[this.navIndex]);
			return this.categoryDatas[this.navIndex];
		}
	},
	methods: {
		async getCategory() {
			const res = await request('/getCategoryDatas');
			console.log(res);
			this.categoryDatas = res.categoryDatas;
		},
		// 点击高亮
		changeNavIndex(index) {
			this.navIndex = index;
		}
	}
};
</script>

<style lang="stylus">
.category
	.header
		padding 20rpx 0
		.search
			width 90%
			margin 0 auto
			height 60rpx
			line-height 60rpx
			font-size 30rpx
			background-color #ddd
			border-radius 4rpx
			text-align center
	.content
		display flex
		// 100vh 高度：100等分 -  20rpx *2 +  search 60rpx + 2rpx
		height calc(100vh - 102rpx)
		border-top 2rpx solid #333
		.left
			width 20%
			height 100%
			border-right 2rpx solid #333
			.navScroll
				height calc(100vh - 102rpx)
				.navItem
					position relative
					height 60rpx
					line-height 60rpx
					font-size 27rpx
					text-align center
					// 父级引用
					&.active::before
						content ''
						width 2rpx
						height 40rpx
						background-color red
						position absolute
						left 10rpx
						top 10rpx
		.right
			width 80%
			height 100%
			.categoryScroll
				height 100%
				.cateImg
					width: 520rpx
					height: 200rpx
					display: block
					margin: 10rpx auto
				.goodsList
					display: flex
					flex-wrap: wrap
					.goodsItem
						width: 33.33%
						height: 200rpx
						text-align: center
						.goodsImg
							width: 90%
							height: 140rpx
						.goodsName
							font-size: 24rpx
							
						
					
</style>
