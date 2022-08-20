<template>
	<view class="detailContainer" v-if="detailInfo.detailid">
		<!-- 作品原文 -->
		<view class="item">
			<view class="header">
				<view class="head">作品原文</view>
			</view>
			<view class="content">
				<view class="title">{{detailInfo.title}}</view>
				<view class="author">{{detailInfo.author}}</view>
				<view class="yuanwen">
					<rich-text :nodes="content_processed"></rich-text>
				</view>
			</view>
		</view>
		<!-- 注释译文 -->
		<view class="item" v-if="detailInfo.explanation">
			<view class="header">
				<view class="head">注释译文</view>
			</view>
			<view class="content">
				<view class="text">
					<rich-text :nodes="detailInfo.explanation"></rich-text>
				</view>
			</view>
		</view>
		<!-- 作品类型 -->
		<view class="item" v-if="detailInfo.type">
			<view class="header">
				<view class="head">作品类型</view>
			</view>
			<view class="content">
				<view class="text">
					<view class="type">{{detailInfo.type}}</view>
				</view>
			</view>
		</view>
		<!-- 作品鉴赏 -->
		<view class="item" v-if="detailInfo.appreciation">
			<view class="header">
				<view class="head">作品鉴赏</view>
			</view>
			<view class="content">
				<view class="text">
					<rich-text :nodes="detailInfo.appreciation"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				appkey:'61d432e40300b0ca',
				id:'',
				detailid:'',
				detailInfo:{}
			};
		},
		computed:{
			content(){
				return this.detailInfo.content || ''
			},
			content_processed(){
				return this.content.replace(/align="center"/,'class="poem"')
			}
		},
		onLoad(options) {
			this.id=options.id
			this.detailid=options.detailid
			this.getDetail()
		},
		methods:{
			async getDetail(){
				let {data}=await uni.$http.post(`/${this.id}/detail?appkey=${this.appkey}&detailid=${this.detailid}`)
				// console.log(data);
				if(data.status!=0) return uni.$showMsg()
				this.detailInfo=data.result
				// console.log(this.detailInfo);
			}
		}
	}
</script>

<style lang="scss">
.detailContainer{
	padding: 2px 0;
	.item{
		margin-bottom: 10px;
		
		// 标题
		.header{
			position: relative;
			height: 35px;
			padding-left: 20px;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			border-right: 1px solid #ccc;
			background-color: white;
			.head{
				font-size: 20px;
				line-height: 35px;
			}
			
			&::before{
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				content: '';
				display: block;
				width: 10px;
				height: 100%;
				background-color: #cce9cd;
			}
		}
		
		// 内容部分
		.content{
			margin: 10px 0;
			
			.text{
				padding: 0 12px;
			}
			
			// 1.作品原文
			// 作品题目
			.title{text-align: center;}
			// 作者
			.author{
				text-align: center;
				margin: 10px 0;
			}
			.yuanwen{
				padding: 0 5px;
				.poem{
					text-align: center;
					
				}
			}
			
			// 2.注释译文
			
			// 3.作品类型
			.type{margin: 10px 0;}
			
			// 4.作品鉴赏
			
		}
	}
}
</style>
