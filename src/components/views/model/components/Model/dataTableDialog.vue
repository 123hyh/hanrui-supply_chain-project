<template>
  <el-dialog class="tableDialog" :close-on-click-modal="false" :title="title" :visible="visible" :before-close="handleClose">
    <data-table v-loading='loading' :data.sync="data" :count.sync="count" :configs.sync="configs" :ruleData.sync="ruleData"  :ruleConfigs.sync="ruleConfigs" @handlerRuleChange='ruleChange' @handlerCurrentSelected='currentSelected' @handlerOperation='operation' @handlerRuleEvent='ruleEvent'></data-table>
	<div class="operationDialogDiv">
      <el-button :type="item.type" v-for="(item,index) in operationConfigs" :key="index" @click="operation(item.event)" size="small">{{item.label}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
	import DataTable from "./dataTable.vue";
	export default {
		components: {
			DataTable,
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
				type: Array,
				default: () => [],
				desc: "表格值"
			},
			count: {
				type: Number,
				default: 0,
				desc: "总条数"
			},
			configs: {
				type: Object,
				required: true,
				desc: "表格配置"
			},
			ruleData: {
				type: Object,
				default: {},
				desc: "搜索值"
			},
			ruleConfigs: {
				type: Array,
				default: () => [],
				desc: "搜索"
			},
			operationConfigs: {
				type: Array,
				default: () => [],
				desc: '操作'
			},
		},
		methods: {
			ruleChange(val) {
				this.$emit("handlerRuleChange", val);
			},
			currentSelected(currentRow) {
				this.$emit('handlerCurrentSelected', currentRow)
			},
			operation(val) {
				this.$emit("handlerOperation", val);
			},
			handleClose() {
				this.$emit("update:visible", false);
			},
			ruleEvent(newVal, oldVal) {
				this.$emit("handlerRuleEvent", newVal, oldVal);
			},
		}
	};
</script>

<style scoped>
</style>
