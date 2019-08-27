<template>
	<div class="Box">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<form-config :formModel="exportorderForm" :inputKey="exportorderKey"></form-config>
			<fieldset>
				<legend>货物信息</legend>
				<form-config :formModel="exportorderForm" :inputKey="exportorderKey1"></form-config>
			</fieldset>
			<fieldset>
				<legend>深圳提货方式</legend>
				<form-config :formModel="exportorderForm" :inputKey="exportorderKey2"></form-config>
			</fieldset>
			<fieldset>
				<legend>香港交货方式</legend>
				<form-config :formModel="exportorderForm" :inputKey="exportorderKey3"></form-config>
			</fieldset>
			<fieldset>
				<legend>深圳调度反馈</legend>
				<form-config :formModel="exportorderForm" :inputKey="exportorderKey4"></form-config>
			</fieldset>
			<fieldset>
				<legend>报关信息反馈</legend>
				<form-config :formModel="exportorderForm" :inputKey="exportorderKey5"></form-config>
			</fieldset>
		</div>
	</div>
</template>
<script>
	import api from "@/assets/js/appHelper.js";
	import FormConfig from "@/components/common/FormConfig.vue";

	import ExportOrder from "@/domain/entities/commerce/ExportOrder";
	import ExportOrderForm from "@/domain/formconfig/commerce/ExportOrder/ExportOrder";
	import ExportOrderForm1 from "@/domain/formconfig/commerce/ExportOrder/ExportOrder.1";
	import ExportOrderForm2 from "@/domain/formconfig/commerce/ExportOrder/ExportOrder.2";
	import ExportOrderForm3 from "@/domain/formconfig/commerce/ExportOrder/ExportOrder.3";
	import ExportOrderForm4 from "@/domain/formconfig/commerce/ExportOrder/ExportOrder.4";
	import ExportOrderForm5 from "@/domain/formconfig/commerce/ExportOrder/ExportOrder.5";
	const selectKey = [{
		label: 'itemValue',
		value: 'itemKey'
	}];
	export default {
		data() {
			return {
				tabIsDisabled: false, // 禁用tab
				tabActiveName: "billing", // 激活tab菜单
				// 主form
				exportorderForm: new ExportOrder(),
				exportorderKey: ExportOrderForm,
				exportorderKey1: ExportOrderForm1,
				exportorderKey2: ExportOrderForm2,
				exportorderKey3: ExportOrderForm3,
				exportorderKey4: ExportOrderForm4,
				exportorderKey5: ExportOrderForm5,
			};
		},
		components: {
			FormConfig,
		},
		methods: {
			//保存主表单
			async handlePreserve() {
				const {
					data
				} = await api.addData('/exportorder', this.exportorderForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.exportorderForm = new ExportOrder()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0408')
			}
		},
		created() {},
	};
</script>
<style lang="less" scoped>
	.Box {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.btnBottom {
		margin-bottom: 10px;
	}

	fieldset{
		border-color: #fff;
		legend{
			padding-inline-start: 20px;
		}
	}
</style>
