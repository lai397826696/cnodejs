<template>
	<div class="userBox">
		<div class="user">
			<span class="img_avatar"></span>
			<span class="name">还未登录，请先登录</span>
		</div>
		<div class="listBox">
			<div class="flex line-b">
				<div class="flex_bd">用户信息</div>
			</div>
			<div class="flex line-b">
				<div class="flex_bd">消息通知</div>
			</div>
			<div class="flex line-b">
				<div class="flex_bd">主题收藏</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'user',
	data() {
		return {

		}
	},

}
</script>

<style lang="less" scoped>
.userBox {
	background-color: #fff;
	.user {
		padding-top: .933333rem;
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
