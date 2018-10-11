<template>
	<section class="devPage">
		<!-- <Heads title="发布帖子" :leftShow="false" :rightShow="true"></Heads> -->
		<div class="dev-item">
			<label>标题：</label>
			<input type="text" v-model.trim="title" placeholder="标题10个字符以上" class="dev-text" />
		</div>
		<div class="dev-item">
			<label>标签：</label>
			<select class="dev-text dev-select" v-model="tab">
				<option value="请选择">请选择</option>
				<option value="good">精华</option>
				<option value="share">分享</option>
				<option value="ask">问答</option>
				<option value="job">招聘</option>
				<option value="dev">客户端</option>
			</select>
		</div>
		<div class="dev-item">
			<label>内容：</label>
			<div class="areaBox">
				<textarea class="dev-text dev-area" v-html="content"></textarea>
			</div>
		</div>
		<div class="dev-item">
			<button type="button" class="btn-topic" @click="topicfn">发布</button>
		</div>
	</section>
</template>

<script>
	import Heads from '../components/Head'
	import { mapState } from 'vuex'
	export default {
		name: 'dev',
		data() {
			return {
				topic_id: '',
				title: '',
				tab: '请选择',
				content: ''
			}
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (!!to.query.id) {
					vm.topic_id = to.query.id
					vm.tab = to.query.tab
					vm.content = to.query.content
					vm.title = to.query.title
				}
			})
		},
		components: {
			Heads
		},
		computed: {
			...mapState([
				'userToken'
			])
		},
		methods: {
			topicfn() {
				var vm = this;
				if (this.title.length >= 10 && this.tab != "请选择") {
					let obj = {}, url = "/topics"
					if (!!this.topic_id) {
						url += "/update";
						obj = {
							accesstoken: this.userToken,
							topic_id: this.topic_id,
							title: this.title,
							tab: this.tab,
							content: this.content,
						}
					} else {
						obj = {
							accesstoken: this.userToken,
							title: this.title,
							tab: this.tab,
							content: this.content,
						}
					} 
					 
						
						
					this.$http({
						method: "post",
						url: url,
						data: obj
					}).then(res => {
						console.log(res.data.success);
					})
				} else {
					console.log("请正确填写内容");
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.devPage {
	  position: absolute;
	  top: 0;
	  bottom: 0;
	  left: 0;
	  right: 0;
	  z-index: 0;
	  background-color: #eff2f7;
	  .dev-item {
	    margin: 0.066667rem 0;
	    padding: 0.066667rem 0.133333rem;
	    box-sizing: border-box;
	    label {
	      font-size: 0.213333rem;
	    }
	    .dev-text {
	      display: block;
	      margin-top: 0.066667rem;
	      padding: 0 0.093333rem;
	      width: 100%;
	      height: 0.4rem;
	      line-height: 0.4rem;
	      font-size: 0.186667rem;
	      box-sizing: border-box;
	    }
	    .dev-select {
	    }
	    .areaBox {
	      margin-top: 0.093333rem;
	      padding: 0.093333rem 0;
	      background-color: #fff;
	    }
	    .dev-area {
	      display: block;
	      margin: 0;
	      width: 100%;
	      min-height: 2.5rem;
	      height: auto;
	      line-height: 1.6;
	    }

	    .btn-topic {
	      display: block;
	      width: 100%;
	      height: 0.533333rem;
	      line-height: 0.533333rem;
	      font-size: 0.213333rem;
	      color: #fff;
	      background-color: #2196f3;
	      border-radius: 2px;
	    }
	  }
	}
</style>
