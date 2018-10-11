<template>
	<header class="appHeader">
		<nav class="detailsTab">
			<div class="leftBox" v-if="leftShow">
				<a href="javascript:;" class="returnBtn" @click="goBack">
					<i class="font-icon icon-left-big"></i>
				</a>
			</div>
			<div class="centerBox">
				<h3 class="title">{{title}}</h3>
			</div>
			<div class="rightBox" v-if="rightShow">
				<slot name="right"></slot>
			</div>
		</nav>
	</header>
</template>

<script>
export default {
	name: 'header',
	props: {
		leftShow: {
			type: Boolean,
			default: true
		},
		title: {
			type: String,
			default: "默认头部信息"
		},
		rightShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {

		}
	},
	created(){
		console.log(this.$root.Bus);
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
	},
}
</script>

<style lang="less" scoped>
	.appHeader {
	  background-color: #474a4f;
	  color: #fff;
	}
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
	    line-height: 50px;
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
	    text-align: center;
	    cursor: pointer;
	  }
	  .title {
	    display: inline;
	    font-size: 0.24rem;
	    text-align: center;
	  }
	}
</style>
