<template>
	<div class="userBox">
		<div class="user" v-if="!isLogin" @click="signup">
			<span class="img_avatar"></span>
			<span class="name">还未登录，请先登录</span>
		</div>
		<div class="user" v-if="isLogin">
			<span class="img_avatar">
				<img :src="userAvatar" class="useravatar" />
			</span>
			<span class="name">{{userName}}</span>
		</div>
		<div class="listBox">
			<div class="flex line-b">
				<div class="flex_bd" @click="msgpush">消息通知</div>
			</div>
			<div class="flex line-b">
				<div class="flex_bd">主题收藏</div>
			</div>
			<div class="flex line-b">
				<div class="flex_bd" @click="signOut">退出登录</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'user',
	data() {
		return {

		}
	},
	created() {
	},
	computed: {
		...mapState([
			'isLogin',
			'userName',
			'userAvatar'
		])
	},
	methods: {
		signup() {
			this.$router.push("/login");
		},
		signOut() {
			localStorage.clear();
			window.location.reload();
			// this.$router.reload()
		},
		msgpush(){
			this.$router.push('/message')
		}
	}
}
</script>

<style lang="less" scoped>
.userBox {
	background-color: #fff;
	.user {
		margin: 0 auto;
		padding-top: .933333rem;
		width: 60%;
		font-size: .186667rem;
		text-align: center;
	}
	.img_avatar {
		margin: 0 auto .133333rem;
		display: block;
		width: 1.066667rem;
		height: 1.066667rem;
		border-radius: 50%;
		background-color: #ccc;
		overflow: hidden;
		.useravatar {
			display: block;
			width: 100%;
			border-radius: 50%;
		}
	}
	.listBox {
		margin-top: .266667rem;
		.flex_bd {
			padding: .066667rem .133333rem;
			height: .453333rem;
			line-height: .453333rem;
		}
	}
}
</style>
