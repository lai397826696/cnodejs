<template>
	<div class="dir">
		<div>1111</div>
		<p v-align:center>指令</p>
		<button>按钮</button>
	</div>
</template>

<script>
export default {
	name: 'scroll',
	data() {
		return {
			refredata: []
		}
	},
	created() {
		for (var i = 0; i < 30; i++) {
			this.refredata.push('我是滚动条，我要增加滚动')
		}
	},
	components: {
	},
	methods: {
		
	},
	directives: {
		align:{
			bind(el, binding, vnode, oldVnode){
				console.log(el, binding, vnode, oldVnode);
				el.style.textAlign=binding.arg
			}
		}
	}
}
</script>

<style lang="less" scoped>
.dir {
	overflow: hidden;
	
	p {
		height: 70px;
		line-height: 70px;
		background-color: #ccc;
	}
}
</style>
