<template>
	<div class="indexPage">
		<!-- <Heads title="头部演示信息" :rightShow="true">
			<div slot="right">
				<span>right</span>
			</div>
		</Heads> -->
		<header class="tabflex tab">
			<span class="flexlist" v-for="(list, index) in tabdata" :key="index" @click="tab(list.type, index)">
				<a href="javascript:;" :class="{active: tabActive==index}">{{list.name}}</a>
			</span>
		</header>
		<Scroll :onRefresh="onRefresh" :onInfinite="onInfinite" @top="topfn">
			<div class="line-tb topicList" v-for="list in topicdata" :key="list.id">
				<div class="flex head">
					<router-link :to="'/user/'+list.author.loginname" class="flex_hd" tag="div">
						<img :src="list.author.avatar_url" :alt="list.author.loginname" :title="list.author.loginname" class="img_avatar" />
					</router-link>
					<div class="flex_bd">
						<p class="user_avatar">{{list.author.loginname}}</p>
						<div class="lastTime">{{'#'+getTime(list.create_at)+'#'}}</div>
					</div>
					<div class="flex_ft">
						<span class="tag tag-top" v-if="list.top">置顶</span>
						<span class="tag tag-good" v-if="list.good">精华</span>
						<span class="tag" v-if="!!list.tab" :class="[{'tag-ask': list.tab=='ask'},{'tag-share': list.tab=='share'}]">{{tagType(list.tab)}}</span>
					</div>
				</div>
				<router-link :to="'/topics/'+list.id" :title="list.title" tag="div" class="body">
					<a href="">{{list.title}}</a>
				</router-link>
				<div class="line-t flex foot">
					<div class="flex_bd">最后回复：{{getTime(list.last_reply_at)}}</div>
					<div class="flex_ft">
						<i class="font-icon icon-comment-empty"></i> {{list.reply_count}}
						<i class="font-icon icon-eye"></i> {{list.visit_count}}
					</div>
				</div>
			</div>
		</Scroll>
	</div>
</template>

<script>
import mixin from '../mixin/mixin'
import Alert from '../components/Alert'
import Scroll from '../components/scrolled'
import Heads from '../components/Head'
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
			tabActive: 0,
			refresh: false
		}
	},
	mixins: [mixin],
	beforeRouteLeave(to, from, next) {
		this.$off('scrollfn')
		next();
	},
	created() {
		this.datahttps();
		this.$root.Bus.msgs="this is bus11111"
		this.$root.Bus.$emit("eventBus",'this is bus')
	},
	activated() {
		this.$children[0].$el.scrollTop = this.scrollTop
	},
	components: {
		Alert,
		Scroll,
		Heads
	},
	computed: {
		...mapState([
			'scrollTop'
		]),
	},
	methods: {
		datahttps(done) {
			let _this = this;
			this.$http({
				url: "/topics",
				params: _this.param
			}, false).then(function (response) {
				if (!!done) {
					setTimeout(function () {
						done()
					}, 1000)
				}

				if (_this.topicdata.length == 0 || _this.refresh) {
					_this.refresh = false
					_this.topicdata = response.data.data;
				} else {
					_this.topicdata = _this.topicdata.concat(response.data.data);
				}
			})
		},
		tab(type, index) {
			this.param.tab = type;
			this.param.page = 1;
			this.tabActive = index;
			this.topicdata = [];
			this.datahttps();
		},
		...mapMutations([
			'scrollTopfn'
		]),
		onRefresh(done) {
			this.refresh = true;
			this.param.page = 1;
			this.datahttps(done);
		},
		onInfinite(done) {
			this.param.page++;
			this.datahttps(done);
		},
		topfn(top) {
			this.scrollTopfn({ top: top });
		},
	}
}
</script>


<style lang="less" scoped>
	.indexPage {
	  width: 100%;
	  height: 100%;
	  background-color: #eff2f7;
	  .scrollBox {
	    top: 0.666667rem;
	  }
	}
	.tabflex {
	  display: flex;
	  font-size: 0.186667rem;
	  color: #fff;
	  background-color: #474a4f;
	  text-align: center;
	  .flexlist {
	    overflow: hidden;
	    flex: 1;
	    height: 50px;
	    line-height: 50px;
	    border-radius: 2px;

	    a {
	      display: block;
	      position: relative;
	    }
	  }
	  .active {
	    &:before {
	      content: ".";
	      position: absolute;
	      bottom: 2px;
	      left: 3px;
	      right: 3px;
	      z-index: 1;
	      height: 2px;
	      color: transparent;
	      background-color: #ff5252;
	    }
	  }
	}
	.topicList {
	  margin-bottom: 0.133333rem;
	  padding: 0.133333rem;
	  background-color: #fff;
	  .head {
	    font-size: 0.186667rem;
	    line-height: 0.266667rem;
	  }
	  .flex_hd {
	    margin-right: 0.133333rem;
	    border: 1px solid #efefef;
	    border-radius: 50%;
	  }
	  .img_avatar {
	    display: block;
	    width: 0.533333rem;
	    height: 0.533333rem;
	    border-radius: 50%;
	  }
	  .lastTime {
	    font-size: 12px;
	    color: #81c784;
	  }
	  .body {
	    padding: 0.106667rem 0;
	    font-size: 0.213333rem;
	    min-height: 0.32rem;
	    line-height: 0.32rem;
	    color: #5d7187;
	    word-wrap: break-word;
	    word-break: break-all;
	    font-weight: bold;
	    a {
	      display: block;
	    }
	  }
	  .foot {
	    padding-top: 0.106667rem;
	    font-size: 0.186667rem;
	    line-height: 0.266667rem;
	  }
	}
	.tagBox {
	  margin-bottom: 0.093333rem;
	  padding: 0.026667rem 0 0;
	}
</style>
