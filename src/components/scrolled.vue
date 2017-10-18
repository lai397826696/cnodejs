<template>
	<div class="scrollBox" v-cloak :class="{touchs: touching}" @scroll="!!onInfinite ? scrollfn($event) : undefined" @touchstart="onRefresh ? touchstart($event) : undefined" @touchmove="onRefresh ? touchmove($event) : undefined" @touchend="onRefresh ? touchend($event) : undefined" @mousedown="onRefresh ? touchstart($event) : undefined" @mousemove="onRefresh ? touchmove($event) : undefined" @mouseup="onRefresh ? touchend($event) : undefined">
		<div class="scrollBody" ref="onlyChild" :style="{transform: 'translate3d(0px,'+ tops +'rem,0px)'}">
			<div class="Loading" ref="loading" v-if="!!onRefresh">
				<div class="star" :class="{refactive : refactive}" :style="{transform: 'rotate('+ top * 3 +'deg)'}"></div>
			</div>
			<slot>
			</slot>
			<div class="Loading" v-show="!!infin">
				<div class="star refactive"></div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'scrollBox',
	props: {
		offset: {
			type: Number,
			default: 50
		},
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
			offsets: this.offset,
			scrollTop: 0,
			touching: false,
			startY: 0,
			top: 0,
			refactive: false,
			infin: false,
			scrollStop: true,
		}
	},
	computed: {
		tops() {
			console.log(this.top - this.offset)
			return this.rem2px(this.top - this.offset)
		},
	},
	methods: {
		scrollfn(event) {
			this.scrollTop = this.$el.scrollTop;
			let thish = this.$el.offsetHeight;
			let childh = this.$refs.onlyChild.scrollHeight;
			this.$emit("top", this.$el.scrollTop);
			if (!this.infin) this.infin = true;
			if ((this.$el.scrollTop + 10) >= (childh - thish - this.offsets) && this.scrollStop) {
				this.scrollStop = false;
				this.infinite();
			}
		},
		touchstart(ev) {
			if (this.top == this.offsets) return false
			this.touching = true
			this.startY = this.pageY(ev)
		},
		touchmove(ev) {
			if (this.top == this.offsets) return false
			if (this.$el.scrollTop > 0 || !this.touching) return false
			let diff = this.pageY(ev) - this.startY
			if (diff > 0) ev.preventDefault()
			this.top = Math.pow(diff, 0.8)
		},
		touchend(ev) {
			this.touching = false
			if (this.top >= this.offsets) {
				this.top = this.offsets
				this.refactive = true
				this.refresh()
			} else {
				this.top = 0
				this.startY = 0
			}
		},
		pageY(ev) {
			return ev.changedTouches ? ev.changedTouches[0].pageY : ev.pageY
		},
		refresh() {
			this.onRefresh(this.refsuccess)
		},
		refsuccess() {
			this.top = 0
			this.refactive = false
		},
		infinite() {
			this.onInfinite(this.infinsuccess)
		},
		infinsuccess() {
			this.infin = false;
			this.scrollStop = true;
		},
		rem2px(px) {
			return px / 75
		}
	}
}
</script>

<style scoped lang="less">
.scrollBox {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1;
	font-size: .213333rem;
	overflow-y: auto;
	user-select: none; //控制文字不能被选中
	-webkit-overflow-scrolling: touch;
	.scrollBody {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 0;
		-webkit-overflow-scrolling: touch;
		transition-duration: .3s;
		.Loading {
			position: relative;
			width: 100%;
			height: 38px;
			padding: 6px 0;
			.star {
				margin: 6px auto;
				width: 18px;
				height: 18px;
				border-radius: 50%;
				border: 4px solid #ccc;
				border-right-color: transparent;
				transform: rotate(0deg);
			}
			.refactive {
				animation: rotatefn .7s linear infinite;
			}
		}
	}
	&.touchs .scrollBody {
		transition-duration: 0ms;
	}

	@keyframes rotatefn {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
}
</style>
