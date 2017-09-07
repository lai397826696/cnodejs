<template>
	<div class="scrollBox" :class="{touchs: touching}" 
		@scroll="scrollfn" 
		@touchstart="onRefresh?touchstart($event):undefined" 
		@touchmove="onRefresh?touchmove($event):undefined" 
		@touchend="onRefresh?touchend($event):undefined"
		@mousedown="onRefresh?mousedown($event):undefined" 
		@mousemove="onRefresh?mousemove($event):undefined" 
		@mouseup="onRefresh?mouseup($event):undefined">
		<div class="scrollBody" ref="onlyChild" :style="{transform: 'translate3d(0px,'+ top +'px,0px)'}">
			<div class="upLoading" v-if="!!onRefresh">
				<!--<div class="star" :style="{transform: 'rotate('+ top +'deg)'}"></div>-->
				<div>{{clickmsg}}</div>
				<div class="star" @click="clickfn"></div>
			</div>
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
	props: {
		onRefresh: {
			type: Function,
			default: undefined
		},
		onInfinite: {
			type: Function,
			default: undefined
		}
	},
	data() {
		return {
			scrollTop: 0,
			touching: false,
			startY: 0,
			isShow: false,
			istouch: false,
			isscroll: false,
			clickmsg: '',
			top: 0,
			offset: -50
		}
	},
	computed: {
	},
	methods: {
		clickfn(){
			this.clickmsg='ontouchstart' in window
		},
		scrollfn(event) {
			this.scrollTop = this.$el.scrollTop
			let thish = this.$el.offsetHeight
			let childh = this.$refs.onlyChild.scrollHeight
			console.log(this.scrollTop)
			if (this.$el.scrollTop == (childh - thish-this.fixtop)) {
				console.log("end")
			}
		},
		touchstart(event) {
			this.startY = event.changedTouches[0].pageY
			this.touching = true
			console.log('touchstart-->',this.startY)
		},
		touchmove(event) {
			// if(this.top > 0 || this.touching) event.preventDefault()
			let diff = event.changedTouches[0].pageY - this.startY
			this.top = Math.pow(diff, 0.8) + this.offset

			// if (this.scrollTop == 0 && this.top >= 50) this.istouch = true

			console.log('touchmove-->',this.top)
		},
		touchend(event) {
			this.startY = this.top = 0;
			if (!!this.istouch) {
				this.refresh()
				this.istouch = false
			}
		},
		mousedown(event){
			// this.startY = event.pageY
		},
		mousemove(event){
			// if(this.top > 0 || !this.touching) return false;
			// if(this.top != 0) event.preventDefault()
			// this.moveY = event.pageY
			// if (this.scrollTop == 0 && this.top >= 50) this.istouch = true
		},
		mouseup(event){
			// this.startY = this.moveY = 0;
			// if (!!this.istouch) {
			// 	this.refresh()
			// 	this.istouch = false
			// }
		},
		refresh() {
			this.onRefresh()
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

		.upLoading {
			// margin-top: -37px;
			width: 100%;
			height: 40px;
			padding: 5px 0;
			.star {
				margin: 11px auto;
				width: 18px;
				height: 18px;
				border-radius: 50%;
				border: 4px solid #ccc;
				border-right-color: transparent;
				transform: rotate(0deg);
			}
		}
		p {
			margin: .133333rem 0;
			padding: .133333rem;
		}
	}
	&.touchs .scrollBody {
		transition-duration: 0ms;
	}
}
</style>
