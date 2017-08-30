<template>
	<header class="header">
		<!--<nav class="tabflex" v-if="!goback">
			<router-link to="/topics" class="flexlist">全部</router-link>
			<router-link to="/good" class="flexlist">精华</router-link>
			<router-link to="/share" class="flexlist">分享</router-link>
			<router-link to="/ask" class="flexlist">问答</router-link>
			<router-link to="/job" class="flexlist">招聘</router-link>
			<router-link to="/dev" class="flexlist">客户端</router-link>
			<span class="flexlist active" @click="tab('topics')">全部</span>
			<span class="flexlist" @click="tab('good')">精华</span>
			<span class="flexlist" @click="tab('shark')">分享</span>
			<span class="flexlist" @click="tab('ask')">问答</span>
			<span class="flexlist" @click="tab('joe')">招聘</span>
		</nav>-->
		<nav class="detailsTab" v-if="goback">
			<div class="returnBtn" @click="gobackfn">返回</div>
		</nav>
	</header>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'header',
	data() {
		return {

		}
	},
	computed: mapState([
		'goback'
	]),
	methods: {
		gobackfn() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="less" scoped>
.header {
	background-color: #474a4f;
}

.tabflex {
	display: -webkit-box;
	display: -webkit-flex;
	display: flex;
	font-size: .186667rem;
	color: #fff;
	background-color: #474a4f;
	text-align: center;
	.flexlist {
		-webkit-box-flex: 1;
		-webkit-flex: 1;
		flex: 1;
		overflow: hidden;
		padding: .16rem 0;
		height: .32rem;
		line-height: .32rem;
	}

	.router-link-active {
		position: relative;
		&:before {
			content: '';
			position: absolute;
			bottom: 2px;
			left: .04rem;
			right: .04rem;
			z-index: 1;
			height: .026667rem;
			background-color: #ff5252;
		}
	}
}

.detailsTab {
	padding: 0 .133333rem;
	overflow: hidden;

	.returnBtn {
		float: left;
		width: .64rem;
		height: .64rem;
		line-height: .64rem;
		color: #fff;
		font-size: .213333rem;
		text-align: center;
		cursor: pointer;
	}
}
</style>
