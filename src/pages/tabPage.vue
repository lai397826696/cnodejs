<template>
	<div class="tabPage">
		<TabBox>
			<div class="flex tabMenu" slot="menu">
				<div class="flex_bd">第一列1</div>
				<div class="flex_bd">第一列2</div>
				<div class="flex_bd">第一列3</div>
				<div class="flex_bd">第一列4</div>
			</div>
		</TabBox>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import TabBox from '../components/TabBox'
export default {
	name: 'tabBox',
	data() {
		return {
			refredata: []
		}
	},
	created() {

	},
	components: {
		TabBox,
	},
	methods: {

	},

}
</script>

<style>

</style>
