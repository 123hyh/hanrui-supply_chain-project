<template>
	<div>
		<!-- 表单 -->
		<div>
			<el-form style="margin-bottom: 18px" label-position="right" :inline-message="true">
				<el-form-item>
					<el-button type="primary" @click="saveMain">保存</el-button>
					<el-button type="cancel" @click="cancelMain">返回</el-button>
				</el-form-item>
			</el-form>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="form-layout">
				<el-form-item v-for="(item,index) of AdvanceRemittanceForm" :key="index" :label="item.name" :prop="item.prop">
					<!-- 字符串类型输入框 -->
					<el-input style="width: 9vw" v-if="item.type=='string'" v-model="ruleForm[item['key']]" :readonly="item.readonly">
						<el-button v-if="item.btn" slot="append" icon="el-icon-search" @click="rousePopover(elem.key,elem.isShowPopover)"></el-button>
					</el-input>
					<!-- 数字类型输入框 -->
					<input v-if="item.type=='number'" style="width: 9vw" v-model.number="ruleForm[item['key']]" type="number" class="number-input"
					 :readonly="item.readonly">
					<!-- 时间选择 -->
					<el-date-picker v-if="item.type=='date'" style="width: 9vw" v-model.number="ruleForm[item['key']]" type="date"
					 placeholder="选择日期"></el-date-picker>
					<!-- 多选框 -->
					<el-checkbox v-if="item.type=='checkbox'" v-model="ruleForm[item['key']]"></el-checkbox>
					<!-- 下拉列表 -->
					<el-select v-if="item.type=='select'" style="width: 9vw" v-model="ruleForm[item['key']]" placeholder="请选择选项">
						<el-option v-for="option in item.selectOption" :key="option['itemKey']" :label="option['itemValue']" :value="option['itemKey']"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
		</div>

		<!-- tab页签 -->
		<!-- <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="计费" name="first"></el-tab-pane>
        <el-tab-pane label="物料" name="second"></el-tab-pane>
      </el-tabs>
    </div>-->

		<!-- 表格 -->
		<div class="table-nowrap scrollbar">
			<el-table :data="tableData" height="250" style="width: 100%" border>
				<el-table-column v-for="(item,index) of tableConfig" min-width="100" :key="index" :prop="item.prop" :label="item.label"></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
	import formConfig from "@/domain/formconfig/finance/AdvanceRemittance.js";
	import tableConfig from "@/domain/tableconfig/finance/AdvanceRemittance.js";
	import appHelper from "@/assets/js/appHelper";
	export default {
		data: () => ({
			AdvanceRemittanceForm: formConfig,
			tableConfig,
			ruleForm: {},
			rules: {},
			activeName: "first",
			tableData: []
		}),
		methods: {
			// 点击取消按钮，回到列表页
			cancelMain() {
				this.$router.push("M0813");
			},

			// 点击保存按钮，保存成功后回到列表页
			saveMain() {

			},
			handleClick() {},
			rousePopover() {},
			handleInputNumber(e) {
			},
			handleInput(e) {
			},
			handleNumberInput(x, y, z) {},
		},
		created() {
			appHelper.initSelect(this.AdvanceRemittanceForm);
		}
	}
</script>
<style scoped lang="less">
	.form-layout {
		>div {
			flex-basis: 20vw;
		}
	}

	.table-nowrap {
		th {
			>div {
				text-align: center;
			}
		}
	}

	//  输入数字框样式
	.number-input {
		height: 28px;
		line-height: 28px;
		-webkit-appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		color: #606266;
		display: inline-block;
		font-size: inherit;
		outline: 0;
		padding: 0 15px;
		-webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
		width: 100%;

		&:hover {
			border-color: #c4c4c4;
		}

		&:focus {
			border-color: #409eff;
			outline: 0;
		}
	}
</style>
