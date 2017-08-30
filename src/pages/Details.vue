<template>
	<article class="details pd10" v-cloak>
		<header class="line-b hd">
			<p class="tips">
				<span class="tag tag-top" v-if="detaildata.top">置顶</span>
				<span class="tag tag-good" v-if="detaildata.good">精华</span>
				<span class="lastime">最后回复时间：{{getTime(detaildata.last_reply_at)}}</span>
			</p>
			<h2>{{detaildata.title}}</h2>
		</header>
		<section class="flex authorBox">
			<div class="flex_hd">
				<router-link :to="'/user/'+detaildata.author.loginname">
					<img :src="detaildata.author.avatar_url" class="img_author" />
				</router-link>
			</div>
			<div class="flex_bd">
				<div class="flex flexalign">
					<p class="text">
						<span class="tag tag-lou">作者</span>{{detaildata.author.loginname}}</p>
					<div class="tips">{{getTime(detaildata.create_at)}}创建 · {{detaildata.visit_count}}次浏览</div>
				</div>
			</div>
			<div class="flex_ft" v-if="!!userToken">
				<span class="collection" @click="collectfn">{{detaildata.is_collect?'取消收藏':'收藏'}}</span>
				<span class="edit" @click="editfn" v-if="detaildata.author.loginname==userName">编辑</span>
			</div>
		</section>
		<section class="detailCon" v-html="detaildata.content"></section>
		<div class="replyBox">
			<div class="line-b replyNum">{{detaildata.replies.length+"条回复"}}</div>
			<div class="con" v-if="detaildata.replies.length!=0">
				<article class="line-b item" v-for="(item, index) in detaildata.replies" :key="item.id">
					<div class="flex">
						<div class="flex_hd">
							<router-link :to="'/user/'+item.author.loginname">
								<img :src="item.author.avatar_url" :title="item.author.avatar_url" class="img_author" />
							</router-link>
						</div>
						<div class="flex_bd">
							<div class="flex flexalign">
								<p>
									<span class="floor">#{{index+1}}</span>
									{{item.author.loginname}}
									<span class="tag tag-lou" v-if="item.author.loginname==detaildata.author.loginname">作者</span>
								</p>
								<span>回复时间：{{getTime(item.create_at)}}</span>
							</div>
						</div>
						<div class="flex_ft">
							<div class="flex flexalign">
								<span @click="zanfn(item)" :class="{zan: item.is_uped}">赞 {{item.ups.length}}</span>
								<span @click="reply(item.id, item.author.loginname)">回复</span>
							</div>
						</div>
					</div>
					<div class="replyCon" v-html="item.content"></div>
				</article>
			</div>
			<div class="notedata" v-if="detaildata.replies.length==0">暂无回复</div>
		</div>
		<section class="flex huifu">
			<div class="flex_bd">
				<div class="textBox">
					<input type="text" v-model.trim="hfData.content" class="text_hf" />
				</div>
			</div>
			<div class="flex_ft">
				<button type="button" class="btn_hf" @click="huifufn">发送</button>
			</div>
		</section>
	</article>
</template>

<script>
import mixin from '../util/utils'
import { mapState } from 'vuex'
export default {
	name: 'details',
	data() {
		return {
			collect: '收藏',
			detaildata: {
				author: {},
				replies: []
			},
			id: '',
			hfData: {
				id: "",
				content: ""
			},
			scrollBottom: 0
		}
	},
	mixins: [mixin],
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$loading();
			vm.id = to.params.id;
			vm.$http({
				url: vm.$api + "/topic/" + vm.id,
				params: {
					accesstoken: vm.$store.state.userToken
				}
			}).then(function(response) {
				vm.$loading.close();
				vm.detaildata = response.data.data;
			})
		})
	},
	beforeRouteLeave(to, from, next) {
		this.detaildata={}
		next();
	},
	computed: {
		...mapState([
			'userToken',
			'isLogin',
			'userName'
		])
	},
	methods: {
		collectfn() {
			if (this.detaildata.is_collect) {
				this.de_collect();
			} else {
				this.ad_collects();
			}
		},
		ad_collects() {
			let _this = this;
			this.$http.post(_this.$api + '/topic_collect/collect', {
				accesstoken: _this.$token,
				topic_id: _this.id
			}).then((res) => {
				this.detaildata.is_collect = true;
				_this.collect = "取消收藏";
			})
		},
		de_collect() {
			let _this = this;
			this.$http.post(_this.$api + '/topic_collect/de_collect', {
				accesstoken: _this.$token,
				topic_id: _this.id
			}).then((res) => {
				this.detaildata.is_collect = false;
				_this.collect = "收藏";
			})
		},
		reply(id, name) {
			this.hfData.id = id;
			this.hfData.content = `@${name} ` + this.hfData.content;
		},
		huifufn() {
			let _this = this;
			if (!this.isLogin) {
				alert("登录后才能回复");
				return false;
			}
			if (!this.hfData.content) {
				alert("回复内容不能为空")
				return false;
			}
			if (!!this.id && !!this.name) {
				this.$http.post(_this.$api + '/topic/' + _this.id + '/replies', {
					accesstoken: _this.userToken,
					content: _this.hfData.content,
					reply_id: _this.hfData.id
				}).then((res) => {
					if (res.data.success) {
						_this.$http({
							url: _this.$api + "/topic/" + _this.id,
							params: {
								accesstoken: _this.userToken
							}
						}).then(function(response) {
							_this.detaildata = response.data.data;
							_this.hfData.content = "";
							_this.scrollfn();
						})
					}
				})
			} else {
				this.$http.post(_this.$api + '/topic/' + _this.id + '/replies', {
					accesstoken: _this.userToken,
					content: _this.hfData.content,
				}).then((res) => {
					if (res.data.success) {
						_this.$http({
							url: _this.$api + "/topic/" + _this.id,
							params: {
								accesstoken: _this.userToken
							}
						}).then(function(response) {
							_this.detaildata = response.data.data;
							_this.hfData.content = "";
							_this.scrollfn();
						})
					}
				})
			}
		},
		zanfn(item) {
			let _this = this;
			if (this.isLoginfn()) {
				if (item.author.loginname == this.userName) {
					alert("不能帮自己点赞")
					return false;
				}
				this.$http.post(_this.$api + "/reply/" + item.id + "/ups", {
					accesstoken: _this.userToken
				}).then(res => {
					if (res.data.action == "down") {
						item.is_uped = false;
						item.ups.splice(item.ups.indexOf(_this.detaildata.author_id), 1);
					} else {
						item.is_uped = true;
						item.ups.push(item.id);
					}
				}).catch(error => {
					console.log(error);
					alert("发送错误")
				})
			}
		},
		isLoginfn() {
			if (!this.isLogin) {
				alert("登录后才可以点赞")
				return false;
			}
			return true;
		},
		scrollfn() {
			let docHeight = this.$parent.$refs.app.offsetHeight;
			let bodyheight = this.$parent.$refs.appBody.scrollHeight;
			this.$parent.$refs.app.scrollTop = bodyheight - docHeight;
			if ((bodyheight - docHeight) > 100) {
				this.$parent.$refs.app.scrollTop = bodyheight - docHeight;
				console.log(bodyheight - docHeight);
			} else {
				console.log("xiao yu")
			}
		},
		editfn(){
			console.log(this.detaildata.content.replace(/<.*?>/gi,''));
			this.$router.push({
				name: 'topic',
				query: {
					id: this.detaildata.id,
					title: this.detaildata.title,
					tab: this.detaildata.tab,
					content: this.detaildata.content.replace(/<.*?>/gi,''),
				}
			})
		}
	}
}
</script>

<style lang="less">
.details {
	margin-bottom: .613333rem;
	padding-top: .133333rem;
	padding-bottom: .133333rem;
	background-color: #fafafa;
	background-color: #fff;
	.hd {
		.tips {
			overflow: hidden;
		}
		.tag {
			float: left;
		}
		.lastime {
			float: right;
			color: #878787;
		}

		h2 {
			padding: .066667rem 0 .133333rem;
			color: #324057;
			font-size: .213333rem;
			line-height: .32rem;
			word-break: break-all;
		}
	}
	.authorBox {
		margin: .133333rem 0;
		font-size: .186667rem;
		.img_author {
			display: block;
			margin-right: .133333rem;
			width: .6rem;
			height: .6rem;
			border-radius: 50%;
		}
		.text {
			padding: 1px 0;
		}
		.flexalign {
			height: .6rem;
		}
		.collection {
			display: block;
			padding: .026667rem .133333rem;
			background-color: #80bd01;
			color: #fff;
			cursor: pointer;
			border-radius: 2px;
		}
		.edit {
			cursor: pointer;
		}
	}
	.detailCon {
		margin-top: .133333rem;
		margin-bottom: .2rem;
		line-height: 1.6;
		font-size: .186667rem;
		h1,h2,h3 {
			border-bottom: 1px dotted #ccc;
		}
	}
	.tag-lou {
		color: #fff;
		background-color: #6b727d;
	}
	.replyBox {
		.replyNum {
			padding: .133333rem 0;
			font-size: .213333rem;
		}
		.item {
			margin-bottom: .173333rem;
			margin-bottom: .133333rem;
			margin: .066667rem 0;
			padding: .093333rem 0;
			border-radius: 3px;
			background-color: #fff;
			.img_author {
				display: block;
				margin-right: .133333rem;
				width: .6rem;
				height: .6rem;
				border-radius: 50%;
			}
			.flexalign {
				padding: .026667rem 0;
				height: .6rem;
				box-sizing: border-box;
			}
			.zan {
				color: red;
			}
			.floor {
				margin-right: .133333rem;
				color: #19d431;
			}
			.replyCon {
				padding: .093333rem .066667rem 0;
			}
		}
	}
	.huifu {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		margin: 0 auto;
		max-width: 640px;
		padding: .08rem 0;
		font-size: 0;
		background-color: #474a4f;

		.textBox {
			margin-left: 5px;
		}
		.text_hf {
			display: block;
			padding: 0 .093333rem;
			width: 100%;
			height: .453333rem;
			line-height: .453333rem;
			font-size: .213333rem;
			border-radius: 3px;
			box-sizing: border-box;
		}
		.btn_hf {
			padding: 0 .133333rem;
			font-size: .186667rem;
			color: #fff;
			background: none;
			text-align: center;
			cursor: pointer;
		}
	}
}
</style>
