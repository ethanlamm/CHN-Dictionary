<template>
	<view class="my-history">
		<view class="titleContainer">
			<view class="title">搜索历史</view>
			<uni-icons type="trash" size="25" @click="clear"></uni-icons>
		</view>
		<view class="history">
			<template v-for="(item,index) in history">
				<uni-tag :text="item" inverted class="tag" :key="index" @click="gotoWordDetail(item)"></uni-tag>
			</template>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		name:"my-history",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('dictionary',['history'])
		},
		methods:{
			// 清空搜索记录
			clear(){
				this.$store.commit('dictionary/clear')
			},
			// 点击标签跳转至汉字详情页
			gotoWordDetail(keyword){
				uni.navigateTo({
					url:'/subpackage/word_detail/word_detail?keyword='+keyword
				})
			}
		}
	}
</script>

<style lang="scss">
.my-history{
	.titleContainer{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 10px;
		background-color:white;
		margin: 10px 0;
		.title{
			font-size: 16px;
		}
	}
	.history{
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		.tag{
			display: block;
			margin: 0 10px 10px 0;
		}
	}
}
</style>