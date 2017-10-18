<template>
	<div id="app">
		<!-- :style="{top: !!headShow?'0.666667rem':'0', bottom: !!footnavshow?'0.666667rem':'0'}" -->
		<div id="appBody" ref="appBody" @scroll="scrolltop">
			<Headers></Headers>
			<transition name="roPage" mode="">
				<keep-alive exclude='details,userinfo'>
					<router-view class="child-view"></router-view>
				</keep-alive>
			</transition>
			<Footnav></Footnav>
		</div>
		<div class="slideBar">
			<a href="javascript:;" v-show="gotoshow" class="scrollTop" @click="goTop">Top</a>
		</div>
	</div>
</template>

<script>
import Headers from './pages/Headers'
import Footnav from './pages/Footnav'
import { mapState } from 'vuex'
export default {
	name: 'app',
	data() {
		return {
			headshow: true,
			gotoshow: false,
			top: 0,
		}
	},
	components: {
		Headers,
		Footnav,
	},
	computed: {
		...mapState([
			'headShow',
			'footnavshow',
		])
	},
	methods: {
		scrolltop() {
			this.top = this.$refs.appBody.scrollTop;
			this.gotoshow = this.top > 300;
		},
		goTop() {
			let _this = this;
			let top = Math.floor(this.top / 15);
			let clear = setInterval(function() {
				_this.$refs.appBody.scrollTop = _this.top - top;
				if (_this.top <= 0) clearInterval(clear)
			}, 30);
		}
	}
}
</script>
<style lang="less" scoped>
#app {
	// position: absolute;
	// left: 0;
	// right: 0;
	// top: 0;
	// bottom: 0;
	// z-index: 0;
	height: 100%;
}
#appBody {
	// position: absolute;
	// top: 0;
	// bottom: 0;
	// left: 0;
	// right: 0;
	// z-index: 0;
	// width: 100%;
	// overflow-y: auto;
	// overflow-x: hidden;
	display: flex;
	flex-flow: column;
	justify-content: space-between;
	height: 100%;

	.child-view {
		// position: absolute;
		// width: 100%;
		transition: all .8s ease;
		flex: 1;
		position: relative;
	}

	.roPage-enter {
		opacity: 0;
		-webkit-transform: translate3d(100%, 0, 0);
		transform: translate3d(100%, 0, 0);
	}
	.roPage-leave-active {
		opacity: 0;
		-webkit-transform: translate3d(-100%, 0, 0);
		transform: translate3d(-100%, 0, 0);
	} // .roPage-left-leave-active,
	// .roPage-right-enter {
	// 	opacity: 0;
	// 	-webkit-transform: translate(-100%, 0);
	// 	transform: translate(-100%, 0);
	// }
}

.slideBar {
	position: fixed;
	bottom: 10%;
	right: .266667rem;
	z-index: 10;
	width: .533333rem;
	line-height: .533333rem;
	color: #fff;
	text-align: center;
	.scrollTop {
		display: block;
		margin-bottom: .066667rem;
		height: .533333rem;
		border-radius: 50%;
		background-color: rgb(33, 150, 243);
		-webkit-appearance: none;
	}
}
</style>
<style>

</style>

