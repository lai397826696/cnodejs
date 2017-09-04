<template>
	<div class="scrollPage">
		<Scroll></Scroll>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Scroll from '../components/scrolled'
export default {
	name: 'scroll',
	data() {
		return {

		}
	},
	computed: {
		
	},
	components: {
		Scroll
	},
	methods: {
		
	},
	
}
</script>

<style lang="less" scoped>
.scrollPage {
	background-color: #fff;
	position: relative;
	
}
</style>
