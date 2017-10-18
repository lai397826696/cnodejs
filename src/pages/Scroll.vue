<template>
	<Scroll :onRefresh='onRefresh' :onInfinite='onInfinite' class="scrollPage">
		<p v-for="(list, index) in refredata" :key="index">{{list+(index+1)}}</p>
	</Scroll>
</template>

<script>
import { mapState } from 'vuex'
import Scroll from '../components/scrolled'
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
		Scroll
	},
	methods: {
		onRefresh(done) {
			setTimeout(() => {
				done()
			}, 2000)
		},
		onInfinite(done) {

			setTimeout(() => {
				for (var i = 0; i < 15; i++) {
					this.refredata.push('我是滚动条，我要增加滚动')
				}
				done()
			}, 2000)
		}
	},

}
</script>

<style lang="less" scoped>
.scrollPage {
	overflow: hidden;
	p {
		margin: .133333rem 0;
		padding: .133333rem;
	}
}
</style>
