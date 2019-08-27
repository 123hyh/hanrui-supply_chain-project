<template>
	<div>
		<el-button size="mini" :type="item.type" v-for="(item,index) in buttonConfig" :key="index" @click='clickEvent(item)'>{{item.lable}}</el-button>
	</div>
</template>
<script>
	export default {
		name: 'Button',
		props: {
			buttonConfig: {
				type: Array,
				required: true
			},
		},
		methods: {
			clickEvent(item) {
				this.$emit('handlerClickEvent', item)
			}
		},
	};
</script>
<style>
</style>
