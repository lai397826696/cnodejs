<template>
	<div class="alertBox" v-if="isshow">
		<div class="alterBody">
			{{title}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'alertBox',
	props: {
		isshows: {
			type: Boolean,
			default: false
		},
		titles: {
			type: String,
			default: '默认的消息提示'
		}
	},
	data() {
		return {
			isshow: this.isshows || false,
			title: this.titles || '默认的消息提示'
		}
	},
	methods: {
		show() {
			this.isshow = true
		},
		hide(){
			this.isshow=false
		},
	}
}

</script>

<style lang="less" scoped>
.alertBox {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99990;
	text-align: center;
	background-color: rgba(0, 0, 0, .1);
	
	.alterBody {
		// position: absolute;
		// left: 0;
		// top: 0;
		// z-index: 0;
		display: inline-block;
		margin: 76% auto 0;
		padding: 10px;
		width: 55%;
		max-width: 250px;
		font-size: .186667rem;
		background-color: #fff;
		text-align: left;
	}


}
</style>