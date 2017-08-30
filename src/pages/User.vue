<template>
	<div class="userBox">
		<div class="user" v-if="!isLogin" @click="routeSwitch('login')">
			<span class="img_avatar"></span>
			<span class="name">还未登录，请先登录</span>
		</div>
		<div class="user" v-if="isLogin">
			<router-link :to="'/user/'+userName" class="img_avatar">
				<img :src="userAvatar" class="useravatar" />
			</router-link>
			<router-link :to="'/user/'+userName" class="name">
				{{userName}}
			</router-link>
		</div>
		<div class="listBox">
			<div class="flex line-b">
				<div class="flex_bd">
					<router-link :to="'/user/'+userName" tag="p">用户信息</router-link>
				</div>
			</div>
			<div class="flex line-b">
				<div class="flex_bd" @click="routeSwitch('message')">消息通知</div>
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
	computed: {
		...mapState([
			'isLogin',
			'userName',
			'userAvatar'
		])
	},
	methods: {
		signOut() {
			if(this.isLogin) {
				localStorage.clear();
				window.location.reload();
			} else {
				alert("还没有登录呢");
			}
		},
		routeSwitch(str) {
			if(str=='login' || this.isLogin) {
				this.$router.push({ name: str });
			} else {
				alert("还没有登录呢");
			}
		}
	}
}
</script>

<style lang="less" scoped>
.userBox {
	background-color: #fff;
	.user {
		// margin: 0 auto;
		padding: .666667rem 0 .4rem;
		font-size: .213333rem;
		color: #fff;
		text-align: center;
		cursor: pointer;
		background: url("../assets/user_bg.jpg") no-repeat center bottom;
		background-size: 100%;
	}
	.img_avatar {
		display: block;
		margin: 0 auto .133333rem;
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
		cursor: pointer;
		.flex_bd {
			padding: .066667rem .133333rem;
			height: .453333rem;
			line-height: .453333rem;
		}
	}
}
</style>
