<template>
	<div class="indexPage" @scroll="scrollfn">
		<div class="indexBody" ref="indexBody">
			<div class="maskbox" style="position: fixed; top: 0; left: 0; z-index: 10; width: 100%; color: red">{{maskboxnum}}</div>
			<header class="tabflex tab">
				<!--<span class="flexlist" :class="{active: activeTab==''}" @click="tab('')">全部</span>
				<span class="flexlist" :class="{active: activeTab=='good'}" @click="tab('good')">精华</span>
				<span class="flexlist" :class="{active: activeTab=='share'}" @click="tab('share')">分享</span>
				<span class="flexlist" :class="{active: activeTab=='ask'}" @click="tab('ask')">问答</span>
				<span class="flexlist" :class="{active: activeTab=='job'}" @click="tab('job')">招聘</span>
				<span class="flexlist" :class="{active: activeTab=='dev'}" @click="tab('dev')">客户端</span>-->
				<span class="flexlist" v-for="(list, index) in tabdata" :key="index" :class="{active: activeNum==index}" @click="tab(list.type, index)">{{list.name}}</span>
			</header>
			
			<div class="listBox">
				<Scroll :onRefresh="onRefresh" :onInfinite="onInfinite" @top="topfn">
					<div class="flex flexstar line-tb topic_list" v-for="list in topicdata" :key="list.id">
						<div class="flex_hd">
							<router-link :to="'/user/'+list.author.loginname" class="avatar">
								<img :src="list.author.avatar_url" :alt="list.author.loginname" :title="list.author.loginname" class="img_avatar" />
								<p class="user_avatar">{{list.author.loginname}}</p>
							</router-link>
						</div>
						<div class="flex_bd">
							<div class="tagBox">
								<span class="tag tag-top" v-if="list.top">置顶</span>
								<span class="tag tag-good" v-if="list.good">精华</span>
								<span class="tag" v-if="!!list.tab" :class="[{'tag-ask': list.tab=='ask'},{'tag-share': list.tab=='share'}]">{{tagType(list.tab)}}</span>
							</div>
							<router-link :to="'/topics/'+list.id" :title="list.title" class="title">{{list.title}}</router-link>
							<span class="time">最后回复：{{getTime(list.last_reply_at)}}</span>
							<p class="count">
								<span class="count_replies">{{list.reply_count}}</span>/
								<span class="count_visits">{{list.visit_count}}</span>
							</p>
						</div>
					</div>
				</Scroll>
			</div>
		</div>
	</div>

</template>

<script>
import mixin from '../util/utils'
import Alert from '../components/Alert'
import Scroll from '../components/scrolled'
import { mapState, mapMutations } from 'vuex'
export default {
	name: 'list',
	data() {
		return {
			topicdata: [],
			param: {
				page: 1,
				tab: '',
				limit: 20
			},
			tabdata: [
				{
					type: "",
					name: "全部"
				},
				{
					type: "good",
					name: "精华"
				},
				{
					type: "share",
					name: "分享"
				},
				{
					type: "ask",
					name: "问答"
				},
				{
					type: "job",
					name: "招聘"
				},
				{
					type: "dev",
					name: "客户端"
				},
			],
			activeNum: 0,
			maskboxnum: '',
			refresh: false
		}
	},
	mixins: [mixin],
	beforeRouteLeave(to, from, next) {
		this.$off('scrollfn')
		next();
	},
	beforeCreate() {
		this.$loading();
	},
	created() {
		this.datahttps();
	},
	activated() {
		// this.$el.scrollTop = this.scrollTop
		this.$children[0].$el.scrollTop = this.scrollTop
	},
	components: {
		Alert,
		Scroll
	},
	computed: {
		...mapState([
			'scrollTop'
		]),
	},
	methods: {
		datahttps(fn) {
			let _this = this;
			this.$http({
				url: this.$api + "/topics",
				params: _this.param
			}).then(function(response) {
				if(!!fn) {
					fn()
				} else {
					_this.$loading.close();
				}
				if(_this.refresh) {
					
					_this.topicdata = response.data.data;
					return false;
				}
				if (_this.topicdata.length > 0) {
					_this.topicdata = _this.topicdata.concat(response.data.data);
				} else {
					_this.topicdata = response.data.data;
				}
			})
		},
		scrollfn(event) {
			let apph = this.$el.clientHeight;
			let appBody = this.$refs.indexBody;
			let bodyh = appBody.scrollHeight;
			this.scrollTopfn({ top: this.$el.scrollTop });
			this.maskboxnum = this.$el.scrollTop + ',' + apph + ',' + bodyh
			if (this.$el.scrollTop == (bodyh - apph)) {
				this.$loading();
				this.param.page++;
				this.datahttps();
			}
		},
		tab(type, index) {
			this.param.tab = type;
			this.param.page = 1;
			this.activeNum = index;
			this.topicdata = [];
			this.$loading();
			this.datahttps();
		},
		...mapMutations([
			'scrollTopfn'
		]),
		onRefresh(fn){
			this.refresh = true
			this.param.page = 1
			this.datahttps();
			fn()
		},
		onInfinite(fn){
			this.param.page++;
			this.datahttps(fn);
		},
		topfn(top){
			this.scrollTopfn({ top: top });
		}
	}
}
</script>

<style lang="less" scoped>
.indexPage {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 0;
	width: 100%;
	height: 100%;
	background-color: #eff2f7;
	overflow-y: auto;
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

	.active {
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
.listBox {
	position: absolute;
	left: 0;
	top: .64rem;
	bottom: 0;
	z-index: 0;
	width: 100%;
}
.topic_list {
	margin-bottom: .093333rem;
	padding: .173333rem .133333rem;
	color: #5d7187;
	background-color: #fff;
	.avatar {
		display: block;
		margin-top: .026667rem;
		padding-right: .106667rem;
		width: .933333rem;
		text-align: center;
		.img_avatar {
			display: block;
			margin: 0 auto;
			width: .746667rem;
			height: .746667rem;
			border-radius: 50%;
		}
		.user_avatar {
			width: 100%;
			margin-top: .2rem;
			font-size: .186667rem;
			font-size: 12px;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.title {
		font-size: .186667rem;
		font-size: .213333rem;
		height: .613333rem;
		line-height: .293333rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.time {
		float: left;
	}
	.count {
		float: right;
		font-size: .133333rem;
		.count_replies {
			color: #9e78c0;
		}
		.count_visits {
			color: #b4b4b4;
		}
	}
}

.tagBox {
	margin-bottom: .093333rem;
	padding: .026667rem 0 0;
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
</style>
