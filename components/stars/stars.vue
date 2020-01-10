<template>
	<view class="score">
		<block v-for="(item, index) in stars" :key="index">
			<image :src="item"></image>
		</block>
	</view>
</template>

<script>
	
	
	export default {		
		name:'stars',
		props:{
			stars:{
				type:Array,
				default:function(){
					let arr=[];
					for(var i=0;i<=4;i++){
						arr.push('/static/huixingxing.png')
					}
					return arr
				}
			}
		}
	}
</script>

<style>
	.score image {
	  width: 28rpx;
	  height: 28rpx ;
	}
</style>
