<template>
	<nav class="line-t navBox" v-show="footnavshow">
		<div class="flex nav">
			<div class="flex_bd">
				<router-link to="/topics" class="list">首页</router-link>
			</div>
			<div class="flex_bd">
				<router-link to="/topic" class="list">发表</router-link>
			</div>
			<div class="flex_bd">
				<router-link to="/message" class="list">消息<span class="msgTag" v-if="msgCount!=0"></span></router-link>
			</div>
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
			'footnavshow',
			'msgCount'
		]),
	}
}
</script>

<style lang="less" scoped>
.navBox {
	background-color: #fff;

	.nav {
		height: .666667rem;
		line-height: .666667rem;
		font-size: .186667rem;
		text-align: center;

		.list {
			position: relative;
			display: block;
			color: #333;
		}
		.router-link-active {
			color: #2196f3;
		}
	}
	.msgTag {
		position: absolute;
		top: .133333rem;
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: #f34343;
	}
}
</style>
