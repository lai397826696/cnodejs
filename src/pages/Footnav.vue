<template>
	<nav class="line-t navBox" v-if="footnavshow">
		<div class="flex nav">
			<div class="flex_bd">
				<router-link to="/topics" class="list">首页</router-link>
			</div>
			<div class="flex_bd">
				<router-link to="/topic" class="list">发表</router-link>
			</div>
			<!--<div class="flex_bd">
				<router-link to="/message" class="list">消息</router-link>
			</div>-->
			<div class="flex_bd">
				<router-link to="/user" class="list">我的</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
	data() {
		return {

		}
	},
	computed: {
		...mapState([
			'footnavshow'
		]),
	}
}
</script>

<style lang="less" scoped>
.navBox {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	margin: 0 auto;
	max-width: 640px;
	background-color: #fff;

	.nav {
		height: .666667rem;
		line-height: .666667rem;
		font-size: .186667rem;
		text-align: center;

		.list {
			display: block;
		}
		.router-link-active {
			color: #2196f3;
		}
	}
}
</style>
