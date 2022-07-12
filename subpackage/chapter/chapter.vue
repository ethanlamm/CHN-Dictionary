<template>
	<view class="chapterContainer">
		<view>
			<template v-for="(item,index) in showData">
				<view class="chapterItem" :key="index" @click="goDetail(item.detailid)">
					<view class="name">《 {{item.name}} 》</view>
					<view class="author">{{item.author}}</view>
				</view>
			</template>
		</view>
		<!-- 回到顶部按钮 -->
		<view class="goTop" @click="goTop" v-if="isShow">
			<uni-icons type="arrow-up" size="30"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				appkey:'61d432e40300b0ca',
				allData:[],
				showData:[],
				total:0,
				currentPage:1,
				pageSize:20,
				isShow:false,
			};
		},
		onLoad(options) {
			this.id=options.id
			this.getChapter(options.id)
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.showData.length==this.total) return uni.$showMsg('没有更多数据了')
			this.currentPage++
			this.getShowData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			// 重置数据
			this.currentPage=1
			this.showData=[]
			// 再次截取第一段数据
			this.getShowData()
		},
		onPageScroll(e) {
			// 200
			// console.log(e.scrollTop);
			if(e.scrollTop>200){
				this.isShow=true
			}else{
				this.isShow=false
			}
		},
		methods:{
			async getChapter(id){
				let {data}=await uni.$http.post(`/${id}/chapter?appkey=${this.appkey}`)
				// console.log(data);
				if(data.status!=0) return uni.$showMsg()
				// 请求成功
				// 先存储全部数据
				this.allData=data.result
				this.total=data.result.length
				// 根据当前第几页展示数据
				this.getShowData(()=>uni.stopPullDownRefresh())
			},
			// 截取数据
			getShowData(sp){
				let beginIndex=(this.currentPage-1) * this.pageSize
				let endIndex=this.currentPage * this.pageSize
				let sliceDate=[]
				if(endIndex>this.total){
					sliceDate=this.allData.slice(beginIndex)
					this.showData=[...this.showData, ...sliceDate]
				}
				sliceDate=this.allData.slice(beginIndex,endIndex)
				this.showData=[...this.showData,...sliceDate]
				// 关闭下拉刷新
				sp&&sp()
				// console.log(this.showData);
			},
			// 回到顶部
			goTop(){
				uni.pageScrollTo({
					scrollTop:0,
					duration:1000
				})
			},
			// 点击跳转至详情页
			goDetail(detailid){
				uni.navigateTo({
					url:`/subpackage/detail/detail?id=${this.id}&detailid=${detailid}`
				})
			}
			
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
	}
.chapterContainer{
	position: relative;
	padding: 3px;
	height: 100%;
	
	.chapterItem{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;
		height: 40px;
		margin: 5px 0;
		border: 1px solid #ddd;
		box-shadow: 0 0 3px #d2d2d2;
		.name{}
		.author{}
	}
	
	// 回到顶部按钮
	.goTop{
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 18px;
		bottom: 25px;
		z-index: 999;
		width: 35px;
		height: 35px;
		border: 1px solid #ccc;
		border-radius: 50%;
		background-color: #ccc;
	}
}	
</style>
