<template>
	<div class="messagePage">
		<section class="msgBox">
			<header class="line-b pd10 pds10 flex">
				<div class="flex_bd">
					<h3 class="msgTitle">未读信息
						<span>{{hasnot_read_messages.length}}</span>
					</h3>
				</div>
				<div class="flex_ft">
					<span>标记全部已读</span>
				</div>
			</header>
			<div class="pd10 conList">
				<div v-if="has_read_messages.lenth!=0">
					<article class="pds10 line-b msgReply" v-for="list in hasnot_read_messages" :key="list.id">
						<div class="flex">
							<div class="flex_hd">
								<img :src="list.author.avatar_url" class="" />
							</div>
							<div class="flex_bd">
								<div class="flex flexalign">
									<p class="username">{{list.author.loginname}}</p>
									<span class="text">回复了你的话题</span>
								</div>
							</div>
							<div class="flex_ft">
								{{getTime(list.create_at)}}
								<!--{{list.reply.create_at}}-->
							</div>
						</div>
						<div class="bodyCon" v-html="list.reply.content"></div>
						<div class="topic" @click="linkDetails(list.topic.id)">{{'话题：'+list.topic.title}}</div>
					</article>
				</div>
				<div class="notedata" v-if="hasnot_read_messages.length==0">暂无信息</div>
			</div>
		</section>
		<section class="msgBox">
			<header class="line-b pd10 pds10 flex">
				<div class="flex_bd">
					<h3 class="msgTitle">已读信息
						<span>{{has_read_messages.length}}</span>
					</h3>
				</div>
			</header>
			<div class="pd10 conList">
				<div v-if="has_read_messages.lenth!=0">
					<article class="pds10 line-b msgReply" v-for="list in has_read_messages" :key="list.id">
						<div class="flex">
							<div class="flex_hd">
								<img :src="list.author.avatar_url" class="" />
							</div>
							<div class="flex_bd">
								<div class="flex flexalign">
									<p class="username">{{list.author.loginname}}</p>
									<span class="text">回复了你的话题</span>
								</div>
							</div>
							<div class="flex_ft">
								{{getTime(list.create_at)}}
								<!--{{list.reply.create_at}}-->
							</div>
						</div>
						<div class="bodyCon" v-html="list.reply.content"></div>
						<div class="topic" @click="linkDetails(list.topic.id)">{{'话题：'+list.topic.title}}</div>
					</article>
				</div>
				<div class="notedata" v-if="has_read_messages.length==0">暂无信息</div>
			</div>
		</section>
	</div>
</template>

<script>
import { mapState } from "vuex"
import mixin from '../util/utils'
export default {
	name: 'message',
	data() {
		return {
			hasnot_read_messages: [], //未读信息
			has_read_messages: [], //已读信息
		}
	},
	mixins: [mixin],
	beforeRouteLeave(to, from, next) {
		// let _this = this;
		// if (this.has_read_messages.length > 0) {
		// 	this.$http.post(_this.$api + '/message/mark_all', {
		// 		accesstoken: _this.userToken
		// 	}).then(res => {
		// 		console.log(res.data.success);
		// 	})
		// }
		next();
	},
	computed: {
		...mapState([
			'userToken',
			'isLogin'
		])
	},
	created() {
		let _this = this;
		this.$http({
			url: _this.$api + "/messages",
			params: {
				accesstoken: _this.userToken
			}
		}).then(res => {
			_this.hasnot_read_messages = res.data.data.hasnot_read_messages;
			_this.has_read_messages = res.data.data.has_read_messages;
		})
	},
	methods: {
		linkDetails(id) {
			this.$router.push({
				path: '/topics/' + id
			})
		},
	}
}
</script>

<style lang="less" scoped>
.messagePage {
	background-color: #fff;

	.msgBox {
		.msgTitle {
			line-height: 1.45;
			font-size: .186667rem;
		}
	}
	.msgReply {
		// margin: .066667rem 0;
		padding: .186667rem 0;
		background-color: #fff;
		border-radius: 4px;
		&:last-child:after {
			border: none;
		}
		img {
			display: block;
			margin-right: .133333rem;
			width: .533333rem;
			height: .533333rem;
			border-radius: 50%;
		}
		.flexalign {
			padding-bottom: .026667rem;
			height: .533333rem;
			box-sizing: border-box;
		}
		.username {
			font-size: .186667rem;
		}
		.text {
			color: #999;
		}
		.bodyCon {
			margin: .16rem 0;
			padding: 0 .133333rem; // height: .533333rem;
			max-height: .8rem;
			line-height: .266667rem;
			font-size: .186667rem;
			text-decoration: none;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-tap-highlight-color: transparent;
			-webkit-line-clamp: 2;

			a {
				color: #08c;
			}
		}
		.topic {
			padding: .093333rem;
			background-color: #ececec;
			cursor: pointer;
		}
	}
	.notedata {
		padding: .266667rem 0;
		font-size: .213333rem;
		text-align: center;
	}
}
</style>
<<style lang="less">
.bodyCon {
	a {
		margin: 0 .066667rem;
		color: #08c;
	}
}
</style>

