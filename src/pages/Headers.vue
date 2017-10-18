<template>
	<header class="appHeader" v-if="headShow">
		<nav class="tabflex" v-if="!headShow">
			<router-link to="/topics" class="flexlist">全部</router-link>
			<router-link to="/good" class="flexlist">精华</router-link>
			<router-link to="/share" class="flexlist">分享</router-link>
			<router-link to="/ask" class="flexlist">问答</router-link>
			<router-link to="/job" class="flexlist">招聘</router-link>
			<router-link to="/dev" class="flexlist">客户端</router-link>
		</nav>
		<nav class="detailsTab">
			<div class="leftBox">
				<a href="javascript:;" class="returnBtn" @click="goBack">
					<i class="font-icon icon-left-big"></i>
				</a>
			</div>
			<div class="centerBox">
				<h3 class="title">{{title}}</h3>
			</div>
			<div class="rightBox">
			</div>
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
		'headShow',
		'title'
	]),
	methods: {
		goBack() {
			this.$router.go(-1)
		}
	}
}
</script>

<style lang="less" scoped>
.appHeader {
	// position: fixed;
	// top: 0;
	// left: 0;
	// right: 0;
	// z-index: 0;
	background-color: #474a4f;
	height:50px;
	flex-basis: 50px;
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
	position: relative;
	z-index: 0;
	overflow: hidden;
	.leftBox {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		z-index: 0;
	}
	.rightBox {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 0;
	}
	.centerBox {
		height: 50px;
		line-height: 50px;
		text-align: center;
	}
	.returnBtn {
		float: left;
		width: .666667rem;
		height: .666667rem;
		line-height: .666667rem;
		font-size: 20px;
		color: #fff;
		text-align: center;
		cursor: pointer;
	}
	.title {
		display: inline;
		font-size: .24rem;
		color: #fff;
		text-align: center;
	}
}
</style>
