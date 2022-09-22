<template>
	<view class="recommend">
		<!-- 1、轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="https://yanxuan.nosdn.127.net/89ddc38903cee9923e7d998a8a88ed08.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="https://yanxuan.nosdn.127.net/static-union/165406787637b102.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image class="img" src="https://yanxuan.nosdn.127.net/static-union/165339174537b102.jpg?type=webp&imageView&quality=75&thumbnail=750x0" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<!-- 2、 三个小图标    数据： policyDescLis -->
		<view class="policyList">
			<view class="policyItem" v-for="item in indexData.policyDescList" :key="item.desc">
				<image :src="item.icon" mode=""></image>
				<text class="desc">{{ item.desc }}</text>
			</view>
		</view>

		<!-- 3、10个导航图标 数据：kingKongModule -->
		<view class="kingKongList" v-if="indexData.kingKongModule">
			<view class="kingKongItem" v-for="item in indexData.kingKongModule.kingKongList" :key="item.L1Id">
				<image class="kingKongImg" :src="item.picUrl" mode=""></image>
				<view class="kingKongDesc">{{ item.text }}</view>
			</view>
		</view>

		<!-- 4、分类区 数据：categoryModule  -->
		<view class="categoryList">
			<view class="categoryItem" v-for="item in indexData.categoryModule" :key="item.titlePicUrl">
				<!-- 大图 -->
				<image class="categoryImg" :src="item.titlePicUrl" mode=""></image>
				<!-- 滑块  -->
				<scroll-view class="categoryScroll" scroll-x="true" enable-flex>
					<view class="goodsItem" v-for="goodsItem in item.itemList" :key="goodsItem.id">
						<image class="goodsImg" :src="goodsItem.showPicUrl" mode=""></image>
						<view class="goodsText">{{ goodsItem.name }}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'Recommend',
	data() {
		return {};
	},
	computed: {
		...mapState({
			indexData: state => state.home.indexData
		})
	},
	methods: {
		
	}
};
</script>

<style lang="stylus">
.recommend
	.swiper
		height 350rpx
		.img
			width 100%
			height 350rpx
	.policyList
		display flex
		margin 10rpx 0
		.policyItem
			flex 1
			text-align center
			image
				width 40rpx
				height 40rpx
				vertical-align middle
			.desc
				font-size 26rpx
	.kingKongList
		display flex
		flex-wrap wrap
		.kingKongItem
			width 20%
			text-align center
			margin 10rpx 0
			.kingKongImg
				width 100rpx
				height 100rpx
			.kingKongDesc
				font-size 24rpx
	.categoryList
		.categoryItem
			margin 10rpx 0
			.categoryImg
				height 370rpx
				width 100%
			.categoryScroll
				// 注意：一定要给滑块设置高度，否则撑满全屏
				height 300rpx
				display flex
				// 不换行
				white-space nowrap
				.goodsItem
					height 300rpx
					margin 0 5rpx
					.goodsImg
						background-color #f5f5f5
						width 200rpx
						height 200rpx
					.goodsText
						// 换行，超出2行....
						font-size 26rpx
						white-space pre-wrap
						overflow hidden
						text-overflow ellipsis
						display -webkit-box
						-webkit-box-orient vertical
						-webkit-line-clamp 2
</style>
