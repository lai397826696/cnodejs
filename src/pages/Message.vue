<template>
	<div class="messagePage">
		<section class="msgBox">
			<div class="pd10 conList">
				<div v-if="has_read_messages.lenth!=0">
					<article class="pds10 line-b msgReply" v-for="list in msgData" :key="list.id">
						<div class="flex">
							<div class="flex_hd">
								<img :src="list.author.avatar_url" class="" />
							</div>
							<div class="flex_bd">
								<div class="flex flexalign">
									<p class="username">{{list.author.loginname}}</p>
									<span class="text">回复了你的话题</span>
									<span class="newTips" v-if="list.newMsg"></span>
								</div>
							</div>
							<div class="flex_ft ">
								{{getTime(list.create_at)}}
							</div>
						</div>
						<div class="bodyCon" v-html="list.reply.content"></div>
						<div class="topic" @click="linkDetails(list)">{{'话题：'+list.topic.title}}</div>
					</article>
				</div>
				<div class="notedata" v-if="has_read_messages.length==0">暂无消息通知</div>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapState } from "vuex"
	import mixin from '../mixin/mixin'
	export default {
		name: 'message',
		data() {
			return {
				hasnot_read_messages: [], //未读信息
				has_read_messages: [], //已读信息
			}
		},
		mixins: [mixin],

		created() {
			this.update();
		},
		beforeDestroy() {
			this.$store.commit("resetMsgCount")
			console.log(111);
		},
		computed: {
			...mapState([
				'userToken',
				'isLogin',
			]),
			msgData() {
				let obj = [];
				this.hasnot_read_messages.map(list => {
					return list.newMsg = true;
				})
				this.has_read_messages.map(list => {
					return list.newMsg = false;
				})
				obj = obj.concat(this.hasnot_read_messages, this.has_read_messages)
				return obj;
			}
		},
		methods: {
			linkDetails(list) {
				list.newMsg=false;
				this.$router.push({
					path: '/topics/' + list.topic.id
				})
				// this.markOne(list.id);
			},
			markOne(id) {
				let _this = this;
				let url = '/message/mark_one/' + id;
				this.$http.post(url, {
					accesstoken: _this.userToken
				}).then(res => {

				}).catch(error => {
					throw new Error(error);
				})
			},
			update() {
				let _this = this;
				this.$http({
					url: "/messages",
					params: {
						accesstoken: _this.userToken,
					}
				}).then(res => {
					_this.hasnot_read_messages = res.data.data.hasnot_read_messages;
					_this.has_read_messages = res.data.data.has_read_messages;
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.messagePage {
	  background-color: #fff;

	  .msgBox {
	    .msgTitle {
	      line-height: 1.45;
	      font-size: 0.186667rem;
	    }
	  }
	  .msgReply {
	    // margin: .066667rem 0;
	    padding: 0.186667rem 0;
	    background-color: #fff;
	    border-radius: 4px;
	    &:last-child:after {
	      border: none;
	    }
	    img {
	      display: block;
	      margin-right: 0.133333rem;
	      width: 0.533333rem;
	      height: 0.533333rem;
	      border-radius: 50%;
	    }
	    .flexalign {
	      position: relative;
	      padding-bottom: 0.026667rem;
	      height: 0.533333rem;
	      box-sizing: border-box;
	    }
	    .username {
	      position: relative;
	      font-size: 0.186667rem;
	    }
	    .text {
	      color: #999;
	    }
	    .newTips {
	      position: absolute;
	      top: 15px;
	      right: 3px;
	      z-index: 0;
	      display: inline-block;
	      width: 5px;
	      height: 5px;
	      border-radius: 50%;
	      background-color: #f34343;
	    }
	    .bodyCon {
	      line-height: 0.266667rem;
	      font-size: 0.186667rem;
	      text-decoration: none;

	      a {
	        color: #08c;
	        margin: 0 0.066667rem;
	      }
	    }
	    .topic {
	      padding: 0.093333rem;
	      background-color: #f2f2f2;
	      cursor: pointer;
	    }
	  }
	  .notedata {
	    padding: 0.266667rem 0;
	    font-size: 0.213333rem;
	    text-align: center;
	  }
	}
</style>
<style lang="less">
	.messagePage {
	  .bodyCon {
	    padding: 0.066667rem;

	    .markdown-text {
	      padding: 0;
	      max-height: 0.8rem;
	      overflow: hidden;
	      text-overflow: ellipsis;
	      display: -webkit-box;
	      -webkit-box-orient: vertical;
	      -webkit-line-clamp: 2;
	    }
	  }
	}
</style>


