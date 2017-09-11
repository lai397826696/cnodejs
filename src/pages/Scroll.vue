<template>
	<div class="scrollPage">
		<Scroll :onRefresh='onRefresh' :onInfinite='onInfinite'>
			<p v-for="(list, index) in refredata" :key="index">{{list+(index+1)}}</p>
		</Scroll>
		<!--<Scrolls class="page-content" :onRefresh='onRefresh' :onInfinite='onInfinite'>
			<p v-for="(list, index) in refredata" :key="index">{{list+(index+1)}}</p>
		</Scrolls>-->
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Scroll from '../components/scrolled'
import Scrolls from '../components/scrolled2'
export default {
	name: 'scroll',
	data() {
		return {
			refredata: []
		}
	},
	created() {
		for (var i = 0; i < 30; i++) {
			this.refredata.push('我是滚动条，我要增加滚动')
		}
	},
	components: {
		Scroll,
		Scrolls
	},
	methods: {
		onRefresh(done) {
			// for (var i = 0; i < 15; i++) {
			// 	this.refredata.push('我是滚动条，我要增加滚动')
			// }
			// console.log(done)
			// done()
			setTimeout(()=>{
				done()
			},2000)
		},
		onInfinite(done){
			
			setTimeout(()=>{
				for (var i = 0; i < 15; i++) {
					this.refredata.push('我是滚动条，我要增加滚动')
				}
				done()
			},2000)
		}
	},

}
</script>

<style lang="less" scoped>
.scrollPage {
	position: fixed;
	top: .666667rem;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 0;
	background-color: #fff;
	overflow: hidden;
	

	p {
		margin: .133333rem 0;
		padding: .133333rem;
	}
}
</style>
