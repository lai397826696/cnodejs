<template>
	<!-- <transition :name="transitionName" :mode="modetype"> -->
		<header class="appHeader" v-show="headShow">
			<nav class="detailsTab">
				<div class="leftBox" v-if="leftshow">
					<a href="javascript:;" class="returnBtn" @click="goBack">
						<i class="font-icon icon-left-big"></i>
					</a>
				</div>
				<div class="centerBox">
					<h3 class="title">{{title}}</h3>
				</div>
				<div class="rightBox">
				</div>
			</nav>
		</header>
	<!-- </transition> -->
</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'header',
	data() {
		return {
			tabdata: [
				{
					type: "",
					name: "全部"
				},
				{
					type: "good",
					name: "精华"
				},
				{
					type: "share",
					name: "分享"
				},
				{
					type: "ask",
					name: "问答"
				},
				{
					type: "job",
					name: "招聘"
				},
				{
					type: "dev",
					name: "客户端"
				},
			],
			transitionName: 'scale',
			modetype: 'out-in'
		}
	},
	computed: mapState([
		'headShow',
		'title',
		'leftshow'
	]),
	methods: {
		goBack() {
			this.$router.go(-1)
		},
	},
	watch: {
		'$route'(to, from) {
			let topath = to.path.split('/').length
			let frompath = from.path.split('/').length
			let arr = 'topics,topic,user'
			topath > frompath || to.meta.headShow ? this.transitionName = "roPage-left" : this.transitionName = "roPage-right"
			if ((arr.indexOf(to.name) >= 0 && arr.indexOf(from.name) >= 0) || !from.name) {
				this.transitionName = "scale"
			}
		}
	}
}
</script>

<style lang="less" scoped>
	.appHeader {
	  background-color: #474a4f;
	}

	// .tabflex {
	//   display: flex;
	//   font-size: 0.186667rem;
	//   color: #fff;
	//   background-color: #474a4f;
	//   text-align: center;
	//   .flexlist {
	//     overflow: hidden;
	//     flex: 1;
	//     height: 50px;
	//     line-height: 50px;
	//     border-radius: 2px;

	//     a {
	//       display: block;
	//       position: relative;
	//     }
	//   }
	//   .active {
	//     &:before {
	//       content: ".";
	//       position: absolute;
	//       bottom: 2px;
	//       left: 3px;
	//       right: 3px;
	//       z-index: 1;
	//       height: 2px;
	//       color: transparent;
	//       background-color: #ff5252;
	//     }
	//   }
	// }

	.detailsTab {
	  position: relative;
	  z-index: 0;
	  overflow: hidden;
	  .leftBox {
	    position: absolute;
	    left: 0;
	    top: 0;
	    bottom: 0;
	    z-index: 0;
	  }
	  .rightBox {
	    position: absolute;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    z-index: 0;
	  }
	  .centerBox {
			margin: 0 auto;
			width: 55%;
	    height: 50px;
	    line-height: 50px;
	    text-align: center;
	  }
	  .returnBtn {
	    float: left;
	    width: 0.666667rem;
	    height: 0.666667rem;
	    line-height: 0.666667rem;
	    font-size: 20px;
	    color: #fff;
	    text-align: center;
	    cursor: pointer;
	  }
	  .title {
	    display: inline;
	    font-size: 0.24rem;
	    color: #fff;
	    text-align: center;
	  }
	}
</style>
