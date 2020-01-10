<template>
	<view class="detailsBox">
		<view class="bg_Box">
			<view class="bg_Img">
				<image :src="detailsList.movieImg"></image>
			</view>
			<view class="smallImg">
				<image :src="detailsList.movieImg"></image>
			</view>
			<view class="movie_Info">
				<label>{{detailsList.title}}</label>
				<view class="scoreBox">评分：
					<stars :stars="detailsList.arrstars" v-if="detailsList.average!=0"></stars>
					<text v-if="detailsList.average!=0">{{detailsList.average}}</text>
					<text v-else>暂无评分</text>
				</view>


				<text>导演：<block v-for="(item, index) in detailsList.directors" :key="index">
						<text>{{item.name}} </text>
					</block>
				</text>
				<text>年份：{{detailsList.year}}</text>
				<text>类型：<block v-for="(item, index) in detailsList.genres" :key="index">
						<text>{{item}} </text>
					</block>
				</text>
				<text>主演：<block v-for="(item, index) in detailsList.casts" :key="index">
						<text>{{item.name}}, </text>
					</block>
				</text>

			</view>
		</view>

		<view class="synopsis">
			<view class="synopsisInfo">
				<text style="line-height:80rpx;color:gray;font-size:25rpx;">剧情简介</text>
				<view class="synTxt">
					{{detailsList.summary}}

				</view>
			</view>
		</view>
		<view class="castsBox">
			<text style="line-height:80rpx;color:gray;font-size:25rpx;margin-left:30rpx;">演员列表</text>
			<scroll-view class="castsInfo" scroll-x="true">
				<block v-for="(item, index) in detailsList.casts" :key="index">
					<view class="wellInner">
						<view style="padding:10rpx;" :data-id="item.id">
							<image  v-if="item.avatars" :src="'https://images.weserv.nl/?url='+item.avatars.large"></image>
						</view>
						<view>{{item.name}}</view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import stars from '@/components/stars/stars.vue'
	import newMovie from '@/src/newMovie.js'
	export default {
		components: {
			stars
		},
		data() {
			return {
				detailsList: ''
			}
		},
		onLoad() {
			console.log(this.$route.query.id);
			this.oRequest(this.$route.query.id)
			uni.showLoading({
				title: '数据加载中',
			})
		},
		methods: {
			oRequest: function(id) {
				var that = this;

				uni.request({
					url: 'https://api.douban.com/v2/movie/subject/' + id,
					data: {
						apikey: '0b2bdeda43b5688921839c8ecb20399b',
					},
					header: {
						"Content-Type": "application/x-www-form-urlencode"
					},
					success: function(res) {
						console.log(res.data);
						that.detailsList = that.newMovie(res.data)
						uni.hideLoading({
							title: '数据加载中',
						})
					}
				})
			},
			newMovie: function(obj) {
				let movie = {
					title: obj.title,
					movieImg: 'https://images.weserv.nl/?url=' + obj.images.large,
					average: obj.rating.average,
					id: obj.id,
					arrstars: newMovie.getStart(obj.rating.average),
					directors: obj.directors,
					genres: obj.genres,
					casts: obj.casts,
					summary: obj.summary
				};
				console.log(movie)
				return movie
			}
		}
	}
</script>

<style>
	.bg_Box {
		width: 100%;
		height: 480rpx;
		position: relative;
	}

	.bg_Box::before {
		content: "";
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.2);
		position: absolute;
		z-index: 1;
	}

	.bg_Img {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.bg_Img image {
		width: 100%;
		height: 100%;
		background-size: cover;
		z-index: -1;
		filter: blur(15rpx);
		transform: scale(1.2);
	}

	.movie_Info {
		width: 55%;
		height: 400rpx;
		display: flex;
		flex-direction: column;
		line-height: 50rpx;
		font-size: 25rpx;
		color: white;
		text-align: left;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 3;
		padding: 30rpx 60rpx 0 50rpx;
	}

	.movie_Info label {
		line-height: 100rpx;
		font-size: 45rpx;
		font-weight: bold;
	}

	.smallImg {
		z-index: 3;
		position: absolute;
		right: 5%;
		top: 100%;
		margin-top: -150rpx;
		width: 230rpx;
		height: 300rpx;
		/* border: 1px solid white; */
	}

	.smallImg image {
		width: 100%;
		height: 100%;
	}

	.synopsis {
		margin-top: 150rpx;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.synopsisInfo {
		width: 90%;
		margin-bottom: 100rpx;
	}

	.synTxt {
		line-height: 50rpx;
		font-size: 30rpx;
		text-indent: 2rem;
		text-align: left;
	}

	.castsBox {
		width: 100%;
		margin-bottom: 80rpx;
	}

	.castsInfo {
		width: 100%;
		/* display: flex; */
		white-space: nowrap;
		/* flex-direction: row; */
	}

	.wellInner {
		width: 230rpx;
		height: 300rpx;
		display: inline-block;
		text-align: center;
		font-size: 28rpx;
	}

	.wellInner image {
		width: 100%;
		height: 300rpx;
	}
</style>
