<template>
	<div class="userinfo">
		<div class="userBox">
			<div class="userImg">
				<img :src="userinfoData.avatar_url" alt="">
			</div>
			<p class="username">{{userinfoData.loginname}}</p>
			<p class="git">
				<a :href="'https://github.com/'+userinfoData.githubUsername">{{'https://github.com/'+userinfoData.githubUsername}}</a>
			</p>
			<p class="pd10 tips">
				<span class="floatL">创建于：{{new Date(userinfoData.create_at).toLocaleDateString()}}</span>
				<span class="floatR">积分：{{userinfoData.score}}</span>
			</p>
		</div>
		<div class="line-tb tabBox">
			<ul class="tab">
				<li :class="{active: index==0}" @click="tabconfn('recent_replies', 0)">最近回复</li>
				<li :class="{active: index==1}" @click="tabconfn('recent_topics', 1)">最新发布</li>
				<li :class="{active: index==2}" @click="tabconfn('topic_collect', 2)">话题收藏</li>
			</ul>
			<div class="lineBox">
				<div class="line" :class="lineSelect"></div>
			</div>
		</div>
		<section class="pd10 tabCon">
			<div class="line-b flex list" v-for="item in infoData" :key="item.id" @click="routeSwitch(item.id)">
				<div class="mgr10 flex_hd">
					<img :src="item.author.avatar_url" :alt="item.author.loginname" class="img_author" />
				</div>
				<div class="flex_bd">
					<div class="flex flexalign">
						<h3 class="title">{{item.title}}</h3>
						<div class="foot">
							<span class="floatL">{{item.author.loginname}}</span>
							<span class="floatR">{{getTime(item.last_reply_at)}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="notedata" v-if="infoData.length==0">暂无数据发布</div>
		</section>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import mixin from '../util/utils'
export default {
	name: 'userinfo',
	data() {
		return {
			userinfoData: {},
			tab: 'recent_replies',
			infoDatas: {
				recent_replies: null,
				recent_topics: null,
				topic_collect: null
			},
			index: 0,
			dir: 0,
			name: '',
		}
	},
	mixins: [mixin],
	beforeRouteEnter(to, from, next) {
		next(vm => {
			let name=to.params.name;
			vm.$http({
				url: vm.$api + "/user/" + name,
			}).then(res => {
				vm.$data.userinfoData = res.data.data;
				vm.$data.infoDatas.recent_replies = res.data.data.recent_replies;
				vm.$data.infoDatas.recent_topics = res.data.data.recent_topics;
			})

			vm.$http({
				url: vm.$api + "/topic_collect/" + name,
			}).then(res => {
				vm.$data.infoDatas.topic_collect = res.data.data;
			})
		});
	},
	computed: {
		...mapState([
			'userToken',
			'userName'
		]),
		infoData() {
			return this.infoDatas[this.tab];
		},
		lineSelect() {
			return {
				lineLR1: this.index == 1 && this.dir == 0,
				lineLR2: this.index == 2 && this.dir == 0,
				lineRL1: this.index == 1 && this.dir == 1,
				lineRL2: this.index == 0 && this.dir == 1
			}
		}
	},
	methods: {
		tabconfn(tab, index) {
			this.tab = tab;
			if (index > this.index) {
				this.dir = 0;
			} else {
				this.dir = 1;
			}
			this.index = index;
		},
		routeSwitch(id) {
			this.$router.push({
				path: '/topics/' + id
			})
		}
	}
}
</script>

<style lang="less" scoped>
.userinfo {
	background-color: #fff;
	.userBox {
		padding: .533333rem 0 .266667rem;
		font-size: .186667rem;
		color: #fff;
		background: url("../assets/user_bg.jpg") no-repeat center top;
		background-size: 100%;
		.userImg {
			margin: 0 auto;
			padding: 2px;
			width: .933333rem;
			height: .933333rem;
			border-radius: 50%;
			border: 1px solid #ddd;
			overflow: hidden;
			img {
				display: block;
				width: 100%;
				border-radius: 50%;
			}
		}
		.username {
			margin: .133333rem 0 .066667rem;
			font-size: .32rem;
			color: #333;
			text-align: center;
		}
		.git {
			margin-bottom: .266667rem;
			color: #2196f3;
			text-align: center;
		}
		.tips {
			overflow: hidden;
			.floatR {
				color: #7fff00;
			}
		}
	}
	.tabBox {
		position: relative;
		overflow: hidden;
		color: #999;
		.tab {
			// margin: 0 .05%;
			overflow: hidden;
		}
		li {
			float: left;
			width: 33.33%;
			height: .48rem;
			height: .586667rem;
			line-height: .586667rem;
			font-size: .186667rem;
			text-align: center;
			cursor: pointer;
		}
		.active {
			color: #474a4f;
		}
	}
	.lineBox {
		width: 100%;
		.line {
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 0;
			width: 33.33%;
			height: 2px;
			overflow: hidden;
			background-color: #474a4f;
			display: inline-block;
		}
		.lineLR1 {
			animation: lineLR1 .3s ease forwards;
		}
		.lineLR2 {
			animation: lineLR2 .3s ease forwards;
		}
		.lineRL1 {
			animation: lineRL1 .3s ease forwards;
		}
		.lineRL2 {
			animation: lineRL2 .3s ease forwards;
		}
	}
	.tabCon {
		.list {
			padding: .16rem 0;
			.img_author {
				display: block;
				width: .666667rem;
				height: .666667rem;
				border-radius: 50%;
				overflow: hidden;
			}
			.flexalign {
				height: .666667rem;
			}
			.title {
				width: 100%;
				height: .293333rem;
				line-height: .293333rem;
				font-size: .213333rem;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
			.foot {
				width: 100%;
				height: .293333rem;
				line-height: .293333rem;
				font-size: .186667rem;
			}
		}
	}

	@keyframes lineLR1 {
		0% {
			left: 0;
		}
		100% {
			left: 33.33%;
		}
	}
	@keyframes lineLR2 {
		0% {
			left: 33.33%;
		}
		100% {
			left: 66.66%;
		}
	}
	@keyframes lineRL1 {
		0% {
			left: 66.66%;
		}
		100% {
			left: 33.33%;
		}
	}
	@keyframes lineRL2 {
		0% {
			left: 33.33%;
		}
		100% {
			left: 0;
		}
	}
}
</style>
