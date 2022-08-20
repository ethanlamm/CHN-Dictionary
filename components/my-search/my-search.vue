<template>
	<view class="my-search">
		<form @submit="formSubmit" class="form">
			<view class="input"><input type="text" focus placeholder="只能搜索一个字哦~" name="input" class="ipt"></input></view>
			<view class="button"><button form-type="submit" class="btn" type="primary">查询</button></view>
		</form>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			formSubmit(e){
				let keyword=e.detail.value.input.trim()
				// 输入检验
				if(!keyword) return uni.$showMsg('输入不能为空~')
				if(keyword.length!=1) return uni.$showMsg('一次只能查一个字哦~')
				// 点击跳转并传参数
				let that=this
				uni.navigateTo({
					url:'/subpackage/word_detail/word_detail?keyword='+keyword
					// 不再这里存储历史记录，放在页面跳转后
					// success:() =>{
					// 	// 成功跳转后，将关键字存储到本地
					// 	that.$store.commit('dictionary/updateHistory',keyword)
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	width: 100%;
	height: 100%;
	.my-search{
		margin: 20px 0;
		width: 100%;
		
		.form{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;
			
			.input{
				width: 375px;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.ipt{
					width: 90%;
					height: 35px;
					border: 2px solid #cce9cd;
					border-radius: 10px;
					padding: 0 15px;
					background-color: white;
				}
			}
			.button{
				margin: 10px 0;
				width: 375px;
				.btn{
					width: 80%;
					border-radius: 50px;
					background-color: #cce9cd;
				}
			}
			
		}
		
	}
}

</style>