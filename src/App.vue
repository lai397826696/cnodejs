<template>
	<div id="app" :style="{marginBottom: footnavshow?'0.733333rem':''}">
		<Headers></Headers>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<Footnav></Footnav>
		<div class="slideBar">
			<a href="javascript:;" v-if="gotoshow" class="scrollTop" @click="gotoback">Top</a>
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
		window.addEventListener("scroll", this.scrolltop);
	},
	components: {
		Headers,
		Footnav
	},
	computed: {
		...mapState([
			'releaseshow',
			'footnavshow'
		])
	},
	methods: {
		scrolltop() {
			this.top = document.body.scrollTop || document.documentElement.scrollTop;
			this.gotoshow = this.top > 300;
		},
		gotoback() {
			let _this = this;
			let top = Math.floor(this.top / 15);
			let clear = setInterval(function () {
				document.body.scrollTop = document.documentElement.scrollTop = _this.top - top;
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
	margin-bottom: .733333rem; // padding-bottom: 5px;
	background: #f2f2f2;
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



.release {}
</style>
