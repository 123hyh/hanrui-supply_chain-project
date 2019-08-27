<template>
	<el-dialog :title="model.title" :visible.sync="model.visible" :close-on-click-modal="false" width="1240px">
		<from-dailog-content :content='model.content' @handlerPointSelection='pointSelection' @handlerClickEvent='clickEvent' class='mycontent'></from-dailog-content>
	</el-dialog>
</template>
<script>
	import FromDailogContent from "./from-dialog-content";
	export default {
		components: {
			FromDailogContent
		},
		props: {
			model: {
				type: Object,
				required: true
			},
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
