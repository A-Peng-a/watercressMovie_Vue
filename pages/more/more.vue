<template>
	<view class="moreBox">
		<block v-for="(item, index) in list.subjects" :key="index">
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
				list: {
					title: '',
					subjects: []
				}, //请求返回的数据
				arrUrl: [
					'in_theaters',
					'coming_soon',
					'top250'
				],
				off: true
			}
		},
		onLoad() {
			this.oRequest(this.arrUrl[this.$route.query.id]); //调用请求函数，附带通过用户点击更多获得的下标来确定要请求的接口
			uni.showLoading({ //提示框
				title: '数据加载中',
			})
		},


		onReachBottom() { //下滑到底部执行的事件

			if (this.off) { //如果还有请求还有数据返回的话off状态为true
				this.oRequest(this.arrUrl[this.$route.query.id]); //继续请求
			}
		},

		methods: {
			//请求事件
			oRequest: function(url) {
				var that = this;
				var lenNum = that.list.subjects.length; //获取当前页面的电影个数
				if (lenNum == 0) { //如果当前电影个数为0,那就+10，请求十个

					that.totalNum = lenNum + 10
				}
				uni.showLoading({ //提示框
					title: '数据加载中',
				})
				uni.request({
					url: 'https://api.douban.com/v2/movie/' + url, //url为传输过来的接口后缀，用于决定请求哪个接口
					data: {
						apikey: '0b2bdeda43b5688921839c8ecb20399b',
						count: 10,
						start: lenNum, //变量设置，便于每次+10
						city: '南宁'
					},
					header: {
						"Content-Type": "application/x-www-form-urlencode"
					},
					success: function(res) {
						uni.hideLoading({ //提示框
							title: '数据加载中',
						})
						that.list.subjects = that.list.subjects.concat(newMovie.newMovies(res.data).subjects) //赋值数据用于渲染，cantat用于数组拼接，newMovies是我写的抽取数据函数
						console.log(newMovie.newMovies(res.data))
						//如果没有数据返回
						if (res.data.subjects.length == 0) {
							uni.showToast({ //提示框
								title: '没有更多了',
								image: '/static//kulian.png',
								duration: 2000
							})
							that.off = false //把开关关了，这样用户滑到底部不会再发起请求事件
						}

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
			},
		}
	}
</script>

<style>
</style>
