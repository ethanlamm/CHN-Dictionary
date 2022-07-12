<template>
	<view class="searchConatiner">
		<my-search></my-search>
		<my-history v-if="history.length!=0"></my-history>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('dictionary',['history'])
		}
	}
</script>

<style lang="scss">

</style>
