<template>
	<div class="loadBox" id="loadBox" v-if="isShow">
		<div class="loading">
			<div class="cube1"></div>
			<div class="cube2"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'loading',
	data() {
		return {
			isShow: false,
		}
	},
	methods: {
		show() {
			this.isShow = true
		},
		hide(){
			this.isShow=false
		}
	}
}

</script>

<style scoped>
.loadBox {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99999;
	background-color: rgba(0, 0, 0, .1);
}

.loading {
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 0;
	display: inline-block;
	margin-left: -16px;
	margin-top: -16px;
	width: 32px;
	height: 32px;
}

.loading .cube1,
.loading .cube2 {
	background-color: #67CF22;
	width: 30px;
	height: 30px;
	position: absolute;
	top: 0;
	left: 0;

	-webkit-animation: cubemove 1.8s infinite ease-in-out;
	animation: cubemove 1.8s infinite ease-in-out;
}

.loading .cube2 {
	-webkit-animation-delay: -0.9s;
	animation-delay: -0.9s;
}

@-webkit-keyframes cubemove {
	25% {
		-webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)
	}
	50% {
		-webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)
	}
	75% {
		-webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)
	}
	100% {
		-webkit-transform: rotate(-360deg)
	}
}

@keyframes cubemove {
	25% {
		transform: translateX(42px) rotate(-90deg) scale(0.5);
		-webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
	}
	50% {
		transform: translateX(42px) translateY(42px) rotate(-179deg);
		-webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
	}
	50.1% {
		transform: translateX(42px) translateY(42px) rotate(-180deg);
		-webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
	}
	75% {
		transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
		-webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
	}
	100% {
		transform: rotate(-360deg);
		-webkit-transform: rotate(-360deg);
	}
}
</style>
