<template>
	<div class="tabBox" id="tabBox">
		<div class="flex tabMenu">
			<slot name="menu"></slot>
			<div class="flex_bd" @click="tabClickFn">第一列</div>
			<div class="flex_bd" @click="tabClickFn">第二列</div>
			<div class="flex_bd" @click="tabClickFn">第三列</div>
		</div>
		<div class="tabMenuCon">
			<slot>{{tabCon}}</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'tabBox',
	props: {
		tabCon: {
			type: String,
			default: "自定义默认内容"
		}
	},
	data() {
		return {
			isShow: false,
		}
	},
	methods: {
		tabClickFn() {
			console.log(111)
		},
		hide(){
			this.isShow=false
		}
	}
}

</script>

<style lang="less" scoped>
.tabBox {
	.tabMenu {
		border-bottom: 1px solid #ddd;
		.flex_bd {
			padding: .026667rem;
			height: .32rem;
			line-height: .32rem;
			text-align: center;
			cursor: pointer;
		}
	}
}
</style>

