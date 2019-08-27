<template>
	<div>
		<my-from :fromConfig='content.fromConfig' @handlerPointSelection='pointSelection'></my-from>
		<my-button :buttonConfig='content.buttonConfig' class="fromdiabtn" @handlerClickEvent='clickEvent'></my-button>
	</div>
</template>

<script>
	import MyFrom from "../basics/from";
	import MyButton from "../basics/button";
	export default {
		components: {
			MyFrom,
			MyButton
		},
		props: {
			content: {
				type: Object,
				required: true
			}
		},
		methods: {
			pointSelection(obj, item) {
				this.$emit('handlerPointSelection', obj, item)
			},
			clickEvent(item) {
				this.$emit('handlerClickEvent', item)
			}
		},
	};
</script>

<style scoped>
	.fromdiabtn {
		text-align: right;
		margin-top: 24px;
	}
</style>
