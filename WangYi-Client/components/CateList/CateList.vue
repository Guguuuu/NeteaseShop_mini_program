<template>
	<view class="cateList">
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" v-if="cateObj.category">
			<swiper-item v-for="(item,index) in cateObj.category.bannerUrlList" :key="index">
				<view class="swiper-item">
					<image :src="item" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="title">
			{{cateObj.category.frontName}}
		</view>
		<view class="desc">
			{{cateObj.category.frontDesc}}
		</view>
		
		<!-- 商品列表 -->
		<view class="goodsList" enable-flex>
			<view class="goodsItem" v-for="item in cateObj.itemList" :key="item.id">
				<image :src="item.listPicUrl" mode=""></image>
				<view class="goodsDesc">
					{{item.name}}
				</view>
				<view class="goodsPrice">
					{{item.retailPrice}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>	
	import request from '../../utils/request.js'
	
	export default {
		name:"CateList",
		props:['L1Id'],
		data() {
			return {
				cateList:[],
			};
		},
		mounted() {
			this.getCateList()
		},
		methods: {
			async getCateList() {
				const res = await request('/getIndexCateList')
				this.cateList = res.indexCateList
				console.log(res.indexCateList)
			}
		},
		computed:{
			cateObj(){
				return this.cateList.find(item => item.category.parentId === this.L1Id)
			}
		},
	}
</script>

<style lang="stylus">
	.cateList
		.swiper
			height: 360rpx
			image
				width: 100%
				height: 360rpx
		.title
			font-size: 40rpx
			line-height: 80rpx
			color: #333333
			text-align: center
		.desc
			font-size: 30rpx
			line-height: 40rpx
			color: #666
			text-align: center
		.goodsList
			display: flex
			flex-wrap: wrap
			justify-content:space-around
			&::after
				content: ""
				width: 344rpx
			.goodsItem
				width: 344rpx
				height: 480rpx
				image
					width: 344rpx
					height: 344rpx
				.goodsDesc
					font-size: 26rpx
					white-space: nowrap
					overflow: hidden
					text-overflow: ellipsis
				.goodsPrice
					color: red
					font-size: 26rpx
</style>