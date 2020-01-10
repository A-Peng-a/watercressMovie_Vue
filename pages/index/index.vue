<template>
	<view class="content">
		<block v-for="(bigItm, bigIdx) in list" :key="bigIdx">
			<view class="movies_Box" v-if="bigItm">
				<view class="title_box">
					<text>{{bigItm.title}}</text>
					<text @click="clickMore" :data-id='bigIdx'>更多>></text>
				</view>
				<scroll-view class="castsInfo" scroll-x='true'>
					<block v-for="(item, index) in bigItm.subjects" :key="index">
						<view class="wellInner">
							<view style="padding:10rpx;" :data-id="item.id" @click="movieDetails">
								<image :src="item.movieImg"></image>
							</view>
							<text class="movieTitle">{{item.title}}</text>
							<stars :stars="item.arrstars"></stars>
							<view style="font-size:25rpx;color:#5da868;" v-if="item.average!=0">
								评分：{{item.average}}分
							</view>
							<view style="font-size:25rpx;color:#5da868;" v-else>
								暂无评分
							</view>
						</view>
					</block>
				</scroll-view>
			</view>
		</block>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import stars from '@/components/stars/stars.vue'
	import newMovie from '@/src/newMovie.js'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			stars
		},
		data() {
			return {
				list: [], //请求返回的数据
				arrUrl: [
					'in_theaters',
					'coming_soon',
					'top250'
				],
			}
		},
		onLoad() {
			var that = this;

			for (var index in that.arrUrl) {
				that.oRequest(index, that.arrUrl[index])
			}
			uni.showLoading({
				title: '数据加载中',
			})
		},
		methods: {
			oRequest: function(index, url) {
				var that = this;
				uni.request({
					url: 'https://api.douban.com/v2/movie/' + url,
					data: {
						apikey: '0b2bdeda43b5688921839c8ecb20399b',
						count: 5,
						start: 0,
						city: '南宁'
					},
					header: {
						"Content-Type": "application/x-www-form-urlencode"
					},
					success: function(res) {
						console.log(res.data)
						that.$set(that.list, index, newMovie.newMovies(res.data, "movie"));
						uni.hideLoading({
							title: '数据加载中',
						})
					}
				})
			},
			clickMore: function(e) {
				this.$router.push({
					path: '/pages/more/more',
					query: {
						id: e.currentTarget.dataset.id
					}
				})
			},
			movieDetails: function(e) {
				this.$router.push({
					path: '/pages/details/details',
					query: {
						id: e.currentTarget.dataset.id
					}
				})
			}

		}
	}
</script>

<style>
	page {
		background: rgb(250, 249, 249);
	}

	.castsInfo {
		width: 100%;
		white-space: nowrap;
	}


	.movies_Box {
		background: white;
		margin-bottom: 50rpx;
	}

	.title_box {
		display: flex;
		flex-direction: row;
		line-height: 50rpx;
		padding: 25rpx;
		font-size: 28rpx;
		color: #5da868;
		font-weight: bold;
		justify-content: space-between;
	}

	.wellInner {
		display: inline-block;
	}
</style>
