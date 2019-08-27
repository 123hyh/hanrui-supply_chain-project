<template>
	<div class="Box">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="primary" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<el-form :model="orderbaseForm" ref="orderbaseForm" label-width="150px" label-position="right" :inline-message="true"
			 class="form-layout">
				<el-form-item v-for="(elem,index) of orderbaseKey" :key="index" :label="elem.name" :prop="elem.prop">
					<!-- 输入字符串类型 -->
					<el-input v-if="!elem.select && !elem.type" v-model="orderbaseForm[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="orderbaseForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<!--  输入数字类型 -->
					<el-input v-if="!elem.select && elem.type" v-model.number="orderbaseForm[elem['key']]" style="width: 9vw" :disabled="elem.disabled"
					 :placeholder="orderbaseForm[elem['key']]" :readonly="elem.readonly">
						<el-button v-if="elem.btn" slot="append" icon="el-icon-search"></el-button>
					</el-input>
					<el-select v-if="elem.select" v-model="orderbaseForm[elem['key']]" style="width: 9vw" placeholder="请选择选项">
						<template v-for="(obj) in elem.selectKey">
							<el-option v-for="(option) in elem.selectOption" :key="option[obj['label']]" :label="option[obj['label']]" :value="option[obj['value']]"></el-option>
						</template>
					</el-select>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import OrderBase from "@/domain/entities/commerce/OrderBase";
	import OrderBaseForm from "@/domain/formconfig/commerce/OrderBase";
	import api from "@/assets/js/appHelper.js";
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
				orderbaseForm: new OrderBase(),
				orderbaseKey: OrderBaseForm,
			};
		},
		components: {},
		methods: {
			//保存主表单
			async handlePreserve() {
				const {
					data
				} = await api.addData('/orderbase', this.orderbaseForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.orderbaseForm = new OrderBase()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0401')
			}
		},
		created() {
		},
	};
</script>
<style lang="less">
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

	.handleTableHeight {
		height: 48vh;
	}

	.btnBottom {
		margin-bottom: 10px;
	}
</style>
