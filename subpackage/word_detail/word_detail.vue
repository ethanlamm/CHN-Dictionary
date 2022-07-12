<template>
	<view class="wordContainer" v-show="wordInfo.name">
		<view class="top">
			<!-- 左侧大字 -->
			<view class="left">
				<image src="../../static/word_bg1.jpg" class="image"></image>
				<view class="word">
					{{wordInfo.name}}
				</view>
			</view>
			<!-- 右侧 -->
			<view class="right">
				<view class="pinyin"><text class="label">拼音</text><text class="content">{{wordInfo.pinyin}}</text></view>
				<view class="others">
					<view class="item"><text class="label">笔画</text><text class="content">{{wordInfo.bihua}}</text></view>
					<view class="item"><text class="label">部首</text><text class="bushou">{{wordInfo.bushou}}</text></view>
					<view class="item"><text class="label">结构</text><text class="content">{{wordInfo.jiegou}}</text></view>
					<view class="item"><text class="label">五笔</text><text class="content">{{wordInfo.wubi}}</text></view>
				</view>
				<view class="bishun"><text class="label">笔顺</text><text class="content">{{wordInfo.bishun}}</text></view>
			</view>
		</view>
		<view class="bottom">
			<view class="head">
				<text class="title">基本释义</text>
			</view>
			<view class="explain">
				<view v-for="(item,index) in explain" :key="index">
					<view class="PinYing">拼音 【 <text class="pinyin">{{item.pinyin}}</text> 】</view>
					<rich-text :nodes="item.content.replace(/\n/,'').replace(/\n/g,'<br />')"></rich-text>
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
				wordInfo:{}
			};
		},
		computed:{
			explain(){
				return this.wordInfo.explain || []
			},
		},
		onLoad(options) {
			this.getWordDetail(options)
		},
		methods:{
			async getWordDetail(params){
				let word=params.keyword
				// 请求数据
				let {data}=await uni.$http.post(`/zidian/word?appkey=61d432e40300b0ca&word=${word}`)
				// console.log(data);
				if(data.status!=0) return uni.$showMsg()
				// 请求成功后存储数据
				this.wordInfo=data.result
				// console.log(this.wordInfo);
			}
		}
	}
</script>

<style lang="scss">
.wordContainer{
	padding: 10px 0;
	.top{
		display: flex;
		align-items: center;
		padding: 0 10px;
		// 左侧
		.left{
			// 大字
			position: relative;
			margin-right: 10px;
			.image{
				width: 110px;
				height: 110px;
			}
			.word{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				font-family: cursive!important; // 草书
				font-size: 100px;
				color: #c83808;
			}
		}
		
		// 右侧
		.right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 110px;
			
			.label{
				font-weight: bold;
				margin-right: 15px;
				color: gray;
			}
			
			// 拼音
			.pinyin{
				margin-bottom: 2px;
			}
			
			.others{
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				
				.item{
					width: 48%;
					margin-bottom: 8px;
					
					.bushou{
						font-family: cursive;
						font-weight: bold;
					}
					
				}
			}
			// 笔顺
			.bishun{
				.content{
					font-family: cursive;
					font-weight: bold;
				}
			}
		}
	}
	
	// 解释
	.bottom{
		.head{
			margin: 10px 0;
			padding-left: 5px;
			.title{
				border-bottom: 5px solid #cce9cd;
			}
		}
		
		.explain{
			padding-left: 10px;
			
			.PinYing{
				margin: 5px 0;
				
				.pinyin{
					margin: 0 5px;
				}
			}
			
		}
	}
}
</style>
