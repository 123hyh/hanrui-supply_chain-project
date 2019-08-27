<template>
	<div class="Box">
		<!-- 保存 返回 按钮 -->
		<div class="btnBottom">
			<el-button type="primary" @click.stop="handlePreserve">保存</el-button>
			<el-button type="cancel" @click.stop="handleSubmit">返回</el-button>
		</div>
		<!-- 输入框 -->
		<div>
			<el-form :model="allocationorderForm" :rules="rules" ref="allocationorderForm" label-width="150px"
			  label-position="right" :inline-message="true" class="form-layout">
			  <el-form-item v-for="(elem,index) of allocationorderKey" :key="index" :label="elem.name" :prop="elem.prop">
			    <!-- 输入字符串类型 -->
			    <el-input v-if = "elem.text && !elem.type" v-model = "allocationorderForm[elem['key']]" style="width: 9vw" 
			      :disabled = 'elem.disabled' :placeholder = "allocationorderForm[elem['key']]" :readonly = 'elem.readonly'>
			      <el-button v-if = "elem.btn"  slot = "append" icon = "el-icon-search" @click = "rousePopover(elem.key,elem.isShowPopover)"> </el-button>
			    </el-input>
			    <!--  输入数字类型 -->
			    <el-input v-if = "elem.text && elem.type" v-model.number = "allocationorderForm[elem['key']]" style="width: 9vw" 
			      :disabled = 'elem.disabled' :placeholder = "allocationorderForm[elem['key']]" :readonly = 'elem.readonly'>
			      <el-button v-if = "elem.btn" slot = "append" icon = "el-icon-search" 
			        @click = "rousePopover(elem.key,elem.isShowPopover)">
			      </el-button>
			    </el-input>
			    <el-checkbox v-if="elem.checked" style="width: 9vw"  v-model="allocationorderForm[elem['key']]" ></el-checkbox>
			    <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="allocationorderForm[elem['key']]" style="width: 9vw"  v-if="elem.date"></el-date-picker>
			    <el-select v-if = "elem.select" v-model = "allocationorderForm[elem['key']]" style="width: 9vw"  placeholder = "请选择选项">
			      <el-option v-for = "(option) in elem.selectOption" :key = "option['itemValue']" :label = "option['itemValue']" :value = "option['itemKey']" ></el-option>
			    </el-select>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	import api from "@/assets/js/appHelper.js";
	import FormConfig from "@/components/common/FormConfig.vue";

	import AllocationOrder from "@/domain/entities/finance/AllocationOrder";
	import AllocationOrderForm from "@/domain/formconfig/finance/AllocationOrder";
	const selectKey = [{
		label: 'itemValue',
		value: 'itemKey'
	}];
	export default {
		data:()=>({
			tabIsDisabled: false, // 禁用tab
			tabActiveName: "billing", // 激活tab菜单
			// 主form
			allocationorderForm: new AllocationOrder(),
			allocationorderKey: AllocationOrderForm,
		}),
		components: {
			FormConfig,
		},
		methods: {
			//保存主表单
			async handlePreserve() {
				const {
					data
				} = await api.addData('/allocationorder', this.allocationorderForm)
				if (data) {
					// 提交成功后...
					this.$alert('保存成功', '新增', {
						confirmButtonText: '确定',
						callback: action => {
							this.popFormTab = false; //关闭弹窗
							this.allocationorderForm = new AllocationOrder()
						}
					});
				}
			},
			handleSubmit() {
				this.$router.push('M0814')
			}
		},
		created() {
      api.initSelect(this.allocationorderKey);
    },
	};
</script>
<style lang="less" scoped>
	.form-layout {
	  > div {
	    flex-basis: 20vw;
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
