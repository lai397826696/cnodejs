<template>
	<div id="app" ref="app" :style="{marginBottom: footnavshow?'7.49625%':'', height: footnavshow?'92.50375%':'100%'}">
		<Headers></Headers>
		<section class="appBody" id="appBody" ref="appBody">
			<keep-alive exclude='details,userinfo'>
				<router-view></router-view>
			</keep-alive>
		</section>
		<Footnav></Footnav>
		<div class="slideBar">
			<a href="javascript:;" v-if="gotoshow" class="scrollTop" @click="goTop">Top</a>
			<a href="javascript:;" v-if="releaseshow" class="release" @click="release">发布</a>
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
	mounted() {
		document.getElementById("app").addEventListener("scroll", this.scrolltop);
	},
	components: {
		Headers,
		Footnav,
	},
	computed: {
		...mapState([
			'releaseshow',
			'footnavshow'
		])
	},
	methods: {
		scrolltop() {
			// this.top = document.body.scrollTop || document.documentElement.scrollTop;
			this.top = document.getElementById("app").scrollTop;
			this.gotoshow = this.top > 300;
		},
		goTop() {
			let _this = this;
			let top = Math.floor(this.top / 15);
			let clear = setInterval(function() {
				document.getElementById("app").scrollTop = _this.top - top;
				if (_this.top <= 0) clearInterval(clear)
			}, 30);
		},
		release() {
			this.$router.push('/topic');
		}
	}
}
</script>
<style lang="less" scoped>
#app {
	height: 92.50375%; // height: .666667rem;
	overflow-y: auto;
	margin-bottom: 7.49625%;
}

#appBody {
	// overflow-y: scroll;
	position: absolute;
	top: 0;
	bottom: .666667rem;
	left: 0;
	right: 0;
	z-index: 0;
	width: 100%;
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
	.release {
		display: block;
		margin-bottom: .066667rem;
		height: .533333rem;
		background-color: #80bd01;
		border-radius: 50%;
		-webkit-appearance: none;
	}
}
</style>
