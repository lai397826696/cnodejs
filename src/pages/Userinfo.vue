<template>
	<div class="userinfo">
		<div class="tabBox">
			<ul class="tab">
				<li @click="tabconfn('recent_replies')">最近回复</li>
				<li @click="tabconfn('recent_topics')">最新发布</li>
				<li @click="tabconfn('topic_collect')">话题收藏</li>
			</ul>
			<div class="line"></div>
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
			}
		}
	},
	mixins: [mixin],
	created() {
		let _this = this;
		this.$http({
			url: _this.$api + "/user/" + _this.userName,
		}).then(res => {
			_this.userinfoData = res.data.data;
			_this.infoDatas.recent_replies=_this.userinfoData.recent_replies;
			_this.infoDatas.recent_topics=_this.userinfoData.recent_topics;
		})

		this.$http({
			url: _this.$api + "/topic_collect/" + _this.userName,
		}).then(res => {
			_this.infoDatas.topic_collect = res.data.data;
		})
	},
	computed: {
		...mapState([
			'userToken',
			'userName'
		]),
		infoData() {
			return this.infoDatas[this.tab];
		}
	},
	methods: {
		tabconfn(tab) {
			this.tab = tab;
		},
		routeSwitch(id){
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
	.tabBox {
		position: relative;
		overflow: hidden;
		background-color: #efefef;
		li {
			float: left;
			width: 33.33%;
			height: .48rem;
			line-height: .48rem;
			font-size: .186667rem;
			text-align: center;
		}
		.active {}
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
}
</style>
