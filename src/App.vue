<template>
	<div id="app" ref="appBody">
		<div class="appBody">
			<Headers></Headers>
			<transition :name="transitionName" :mode="modetype">
				<!-- <keep-alive exclude='details,userinfo'>
					<router-view class="child-view"></router-view>
				</keep-alive> -->
				<router-view class="child-view"></router-view>
			</transition>
			<Footnav></Footnav>
		</div>
		<div class="slideBar">
			<a href="javascript:;" v-show="gotoshow" class="scrollTop" @click="goTop">Top</a>
		</div>
	</div>
</template>

<script>
	import Headers from './components/Headers'
	import Footnav from './components/Footnav'
	import { mapActions } from 'vuex'
	export default {
		name: 'app',
		data() {
			return {
				// headshow: true,
				gotoshow: false,
				top: 0,
				transitionName: 'roPage-left',
				modetype: 'out-in'
			}
		},
		created() {
			this.msgCountfn();
		},
		components: {
			Headers,
			Footnav,
		},
		computed: {

		},
		methods: {
			...mapActions([
				'msgCountfn'
			]),
			scrolltop() {
				// this.top = this.$refs.appBody.scrollTop;
				// this.gotoshow = this.top > 300;
				// console.log(this.top)
			},
			goTop() {
				let _this = this;
				let top = Math.floor(this.top / 15);
				let clear = setInterval(function () {
					_this.$refs.appBody.scrollTop = _this.top - top;
					if (_this.top <= 0) clearInterval(clear)
				}, 30);
			},
		},
		watch: {
			'$route'(to, from) {
				let topath = to.path.split('/').length
				let frompath = from.path.split('/').length
				let arr = 'topic,user'
				topath > frompath || to.meta.headShow ? this.transitionName = "roPage-left" : this.transitionName = "roPage-right"
				// if (arr.indexOf(to.name) >= 0 && arr.indexOf(from.name) >= 0) {
				// 	this.transitionName = "scale"
				// }
				// console.log(to);
				// console.log(from);
				// console.log(this.transitionName);
			}
		}
	}
</script>
<style lang="less" scoped>
	#app {
	  height: 100%;

	  .appBody {
	    display: flex;
	    flex-flow: column;
	    justify-content: space-between;
	    height: 100%;
	  }

	  .child-view {
	    position: relative;
	    flex: 1;
	    transition: all 0.3s ease;
	    overflow: auto;
	  }

	  .roPage-left-leave-active {
	    opacity: 0;
	  }
	  .roPage-left-enter {
	    opacity: 0;
	    -webkit-transform: translate(-100%, 0);
	    transform: translate(-100%, 0);
	  }
	  .roPage-right-leave-active {
	    opacity: 0;
	  }
	  .roPage-right-enter {
	    opacity: 0;
	    -webkit-transform: translate(100%, 0);
	    transform: translate(100%, 0);
	  }

	  .scale-enter,
	  .scale-leave-active {
	    opacity: 0;
	    -webkit-transform: scale(0, 0);
	    transform: scale(0, 0);
	  }
	}

	.slideBar {
	  position: fixed;
	  bottom: 10%;
	  right: 0.266667rem;
	  z-index: 10;
	  width: 0.533333rem;
	  line-height: 0.533333rem;
	  color: #fff;
	  text-align: center;
	  .scrollTop {
	    display: block;
	    margin-bottom: 0.066667rem;
	    height: 0.533333rem;
	    border-radius: 50%;
	    background-color: rgb(33, 150, 243);
	    -webkit-appearance: none;
	  }
	}
</style>

