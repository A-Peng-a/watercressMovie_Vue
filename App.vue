<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.moreBox {
	  display: flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	}
	.movieTitle {
		display: block;
		width: 80%;
		margin: 0 auto;
		line-height: 30rpx;
		font-size: 30rpx;
		font-weight: bold;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.wellInner {
	  width: 33.3%;
	  display: flex;
	  flex-direction: column;
	  text-align: center;
	}
	
	.wellInner image {
	  width: 100%;
	  height: 350rpx;
	}
	.scoreBox{
	  display: flex;
	  flex-direction: row;
	}
	.score image {
	  width: 28rpx;
	  height: 28rpx;
	}

</style>
