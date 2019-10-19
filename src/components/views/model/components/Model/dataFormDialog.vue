<template>
  <el-dialog class="formDialog" :close-on-click-modal="false" :title="title" :visible="visible" :before-close="handleClose">
    <data-form v-loading='loading' ref="formDialog" :data.sync="data" :configs.sync="configs" @handlerInputChange='inputChange' @handlerPointSelection='pointSelection' @handlerSelectChange='selectChange' @handlerSwitchChange='switchChange' @handlerRadioChange='radioChange' @handlerButtonClick='buttonClick' @handlerOperation='operation'></data-form>
	<div class="operationDialogDiv">
      <el-button :type="item.type" v-for="(item,index) in operationConfigs" :key="index" @click="operation(item.event)" size="small">{{item.label}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
	import DataForm from "./dataForm.vue";
	export default {
		components: {
			DataForm,
		},
		props: {
			loading: {
				type: Boolean,
				default: false,
				desc: '加载'
			},
			title: {
				type: String,
				default: '',
				desc: "标题"
			},
			visible: {
				type: Boolean,
				default: false,
				desc: '是否显示弹窗'
			},
			data: {
				type: Object,
				default: () => {},
				desc: "表单值"
			},
			configs: {
				type: Array,
				required: true,
				desc: "表单配置"
			},
			operationConfigs: {
				type: Array,
				default: () => [],
				desc: '操作'
			},
		},
		methods: {
			inputChange(data, item) {
				this.$emit("handlerInputChange", data, item);
			},
			pointSelection(data, item) {
			this.$emit("handlerPointSelection", data, item);
			},
			selectChange(data, item) {
			this.$emit("handlerSelectChange", data, item);
			},
			switchChange(data, item) {
			this.$emit("handlerSwitchChange", data, item);
			},
			radioChange(data, item) {
			this.$emit("handlerRadioChange", data, item);
			},
			buttonClick(data, item) {
				this.$emit("handlerButtonClick", data, item);
			},
			operation(val) {
				this.$emit("handlerOperation", val);
			},
			handleClose() {
				this.$emit("update:visible", false);
			}
		}
	};
</script>

<style scoped>
</style>
