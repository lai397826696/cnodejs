<template>
	<div class="messagePage">
		<section class="pd10 msgBox">
			<header class="pds10 flex">
				<div class="flex_bd">
					<h3 class="msgTitle">未读信息</h3>
				</div>
				<div class="flex_ft">
					<span>标记全部已读</span>
				</div>
			</header>
			<div class="conList">
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
						<div class="topic">{{'话题：'+list.topic.title}}</div>
					</article>
				</div>
				<div class="notedata" v-if="hasnot_read_messages.length==0">暂无信息</div>
			</div>
		</section>
		<section class="msgBox">
			<header class="line-b pd10 pds10 flex">
				<div class="flex_bd">
					<h3 class="msgTitle">已读信息</h3>
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
						<div class="topic">{{'话题：'+list.topic.title}}</div>
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

	computed: {
		...mapState([
			'userToken'
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
			console.log(res.data);
		})
	},
	methods: {

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
		}
		.topic {
			padding: .093333rem;
			background-color: #ddd;
		}
	}
	.notedata {
		padding: .266667rem 0;
		font-size: .213333rem;
		text-align: center;
	}
}
</style>
