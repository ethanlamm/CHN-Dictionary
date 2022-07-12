<template>
	<view class="poetryContainer">
		<template v-for="item in list">
			<view class="poetry" :key="item.id" @click="goChapter(item.id)">
				<image :src="item.url" class="image"></image>
				<view class="category">{{item.category}}</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						id:'tangshi',
						category:'唐诗',
						url:'../../static/tang.jpg'
					},
					{
						id:'songci',
						category:'宋词',
						url:'../../static/song.jpg'
					},
					{
						id:'yuanqu',
						category:'元曲',
						url:'../../static/yuan.jpg'
					},
				]
			};
		},
		methods:{
			// 点击跳转至章节页面
			goChapter(id){
				uni.navigateTo({
					url:'/subpackage/chapter/chapter?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
}
.poetryContainer{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	height: 98%;
	padding: 5px 10px;
	
	.poetry{
		position: relative;
		width: 100%;
		height: 33%;
		.image{
			width: 100%;
			height: 100%;
		}
		.category{
			position: absolute;
			top: 0;
			z-index: 999;
			width: 100%;
			height: 100%;
			text-align: center;
			line-height: 180px;
			font-family:cursive;
			font-size: 50px;
			color: white;
			background-color: rgba(0, 0, 0, 0.3);
		}
	}
}
</style>
