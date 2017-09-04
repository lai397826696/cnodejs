<template>
	<div class="scrollBox" @scroll="scrollfn" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
		<div class="scrollBody" ref="onlyChild" :style="{transform: 'translate3d(0px,'+top+'px,0px)'}">
			<slot>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
				<p>我是滚动条，我要增加滚动</p>
			</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'scrollBox',
	data() {
		return {
			startY: 0,
			moveY: 0,
			isShow: false,
		}
	},
	mounted() {
		console.log(this.$refs.onlyChild.scrollHeight)
	},
	computed: {
		top() {
			return this.moveY - this.startY
		}
	},
	methods: {
		scrollfn(event) {
			let thish = this.$el.offsetHeight
			let childh = this.$refs.onlyChild.scrollHeight
			if (this.$el.scrollTop == (childh - thish)) {
				console.log("end")
			}
		},
		touchstart(event) {
			let touch = event.changedTouches[0]
			this.startY = touch.pageY
			// console.log(event)
			console.log(this.startY)
		},
		touchmove(event) {
			let touch = event.changedTouches[0]
			this.moveY = touch.pageY
			console.log(this.moveY)
			console.log(this.moveY - this.startY)
		},
		touchend(event){
			this.startY=this.moveY=0;
			console.log("end")
		}
	}
}

</script>

<style scoped lang="less">
.scrollBox {
	background-color: #fff;
	position: relative;
	width: 100%;
	overflow-y: auto;
	font-size: .213333rem;
	position: fixed;
	top: 50px;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
	user-select: none; //控制文字不能被选中
	-webkit-overflow-scrolling: touch;

	.scrollBody {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 0;
		padding: 1px 0;
		-webkit-overflow-scrolling: touch;
		transition-duration: .3s;
		p {
			margin: .133333rem 0;
			padding: .133333rem;
		}
	}
}
</style>
