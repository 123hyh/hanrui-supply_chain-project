<template>
	<div class="Box">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<el-form :model="exportdeliveryplanForm" ref="exportdeliveryplanForm" label-width="150px" label-position="right"
			 :inline-message="true" class="form-layout">
				<el-form-item v-for="(elem,index) of exportdeliveryplanKey" :key="index" :label="elem.name" :prop="elem.prop">
					<!-- 输入字符串类型 -->
					<el-input v-if="!elem.select && !elem.type" v-model="exportdeliveryplanForm[elem['key']]" style="width: 9vw"
					 :disabled="elem.disabled" :placeholder="exportdeliveryplanForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<!--  输入数字类型 -->
					<el-input v-if="!elem.select && elem.type" v-model.number="exportdeliveryplanForm[elem['key']]" style="width: 9vw"
					 :disabled="elem.disabled" :placeholder="exportdeliveryplanForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<el-select v-if="elem.select" v-model="exportdeliveryplanForm[elem['key']]" style="width: 9vw" placeholder="请选择选项">
						<template v-for="(obj) in elem.selectKey">
							<el-option v-for="(option) in elem.selectOption" :key="option[obj['label']]" :label="option[obj['label']]"
							 :value="option[obj['value']]"></el-option>
						</template>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
		<!-- 表格 -->
		<div>
		  <el-table :data="tableData" height="470" border style="width: 100%">
			<el-table-column v-for="(item,index) of tableConfig" :key="index" :prop="item.prop" :label="item.label" width="180"></el-table-column>
		  </el-table>
		</div>
	</div>
</template>
<script>
	import ExportDeliveryPlan from "@/domain/entities/commerce/ExportDeliveryPlan";
	import ExportDeliveryPlanForm from "@/domain/formconfig/commerce/ExportDeliveryPlan";
	import tableConfig from '@/domain/tableconfig/commerce/ExportDeliveryPlanItem'
	import api from "@/assets/js/appHelper.js";
	const selectKey = [{
		label: 'itemValue',
		value: 'itemKey'
	}];
	export default {
		data() {
			return {
				tableConfig,
				tableData: [],
				tabIsDisabled: false, // 禁用tab
				tabActiveName: "billing", // 激活tab菜单
				// 主form
				exportdeliveryplanForm: new ExportDeliveryPlan(),
				exportdeliveryplanKey: ExportDeliveryPlanForm,
			};
		},
		components: {},
		methods: {
			//保存主表单
			async handlePreserve() {
				const {
					data
				} = await api.addData('/exportdeliveryplan', this.exportdeliveryplanForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.exportdeliveryplanForm = new ExportDeliveryPlan()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0407')
			}
		},
		created() {},
	};
</script>
<style lang="less" scoped>
	.form-layout {
	  display: flex;
	  flex-wrap: wrap;
	  >div{
	    flex-basis: 21vw;
	    height: 15px;
	  }
	}
	
	.Box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.btnBottom {
		margin-bottom: 10px;
	}
</style>
