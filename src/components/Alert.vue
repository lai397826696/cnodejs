<template>
	<div class="alertBox" v-if="visible">
		<div class="alterBody">
			{{message}}
		</div>
	</div>
</template>

<script>
export default {
	name: 'alertBox',
	data() {
		return {
			visible: false, //是否显示
			message: "提供默认的提示", //提示文字
			callback: null, //关闭时回调函数
			duration: 2000 //关闭时间，默认2s
		}
	},
	methods: {
		showfn() {
			this.visible = true
			this.endTime()
		},
		close() {
			this.visible = false
		},
		endTime() {
			if (this.duration > 0) {
				setTimeout(() => {
					this.close()
					if(typeof this.callback==='function') this.callback()
				}, this.duration)
			}
		}
	}
}

</script>

<style lang="less" scoped>
.alertBox {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 99990;
	text-align: center;
	background-color: rgba(0, 0, 0, .1);

	.alterBody {
		position: absolute;
		left: 15%;
		right: 15%;
		top: 45%;
		z-index: 1; // margin: 76% auto 0;
		padding: 10px; // width: 55%;
		// max-width: 250px;
		font-size: .186667rem;
		background-color: #fff;
		// text-align: left;
	}
}
</style>