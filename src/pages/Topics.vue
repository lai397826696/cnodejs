<template>
	<section class="dev">
		<div class="dev-item">
			<label>标题：</label>
			<input type="text" v-model.trim="title" placeholder="标题10个字符以上" class="dev-text" />
		</div>
		<div class="dev-item">
			<label>标签：</label>
			<select class="dev-text dev-select" v-model="tab">
				<option value="请选择" disabled>请选择</option>
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
				<textarea class="dev-text dev-area" v-model.trim="content"></textarea>
			</div>
		</div>
		<div class="dev-item">
			<button type="button" class="btn-topic" @click="topicfn">发布</button>
		</div>
	</section>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'dev',
	data() {
		return {
			title: '测试帖子测试帖子devdev',
			tab: '请选择',
			content: '测试内容测试内容测试内容测试内容，来回复啊'
		}
	},
	beforeRouteEnter(to, from, next) {
		next(vm => {
			vm.$store.commit("returnshowfn", { show: true })
		})
	},
	beforeRouteLeave(to, from, next) {
		this.$store.commit("returnshowfn", { show: false })
		next();
	},

	methods: {
		topicfn() {
			var _this = this;
			if (this.title.length >= 10 && this.tab != "请选择") {
				if (this.tab == "dev") {
					this.$http({
						method: "post",
						url: _this.$api + "topics",
						data: {
							accesstoken: _this.$token,
							title: _this.title,
							tab: _this.tab,
							content: _this.content
						}
					})
				} else {
					console.log("没有发布至客户端区");
				}
			} else {
				console.log("请正确填写内容");
			}
		}
	}
}
</script>

<style lang="less" scoped>
.dev {
	.dev-item {
		margin: .066667rem 0;
		padding: .066667rem .133333rem;
		box-sizing: border-box;
		label {
			font-size: .213333rem;
		}
		.dev-text {
			display: block;
			margin-top: .066667rem;
			padding: 0 .093333rem;
			width: 100%;
			height: .4rem;
			line-height: .4rem;
			font-size: .186667rem;
			box-sizing: border-box;
		}
		.dev-select {}
		.areaBox {
			margin-top: .093333rem;
			padding: .093333rem 0;
			background-color: #fff;
		}
		.dev-area {
			display: block;
			margin: 0;
			width: 100%;
			min-height: 4.5rem;
			height: auto;
			line-height: 1.6;
		}

		.btn-topic {
			display: block;
			width: 100%;
			height: .533333rem;
			line-height: .533333rem;
			font-size: .213333rem;
			color: #fff;
			background-color: #2196f3;
			border-radius: 2px;
		}
	}
}
</style>
