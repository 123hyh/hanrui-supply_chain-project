<template>
  <div style="padding: 10px 10px 10px 10px;" class="mystyle">
	<breadcrumb-navigation />
	<div class="container pd-10">
		<query-bar
			:ruleForm="ruleData"
			:formConfig="queryBarFormConfig"
			:btnObj="btnObj"
			@handleBtnClickType="operation"
		></query-bar>
		<div>
			<data-table v-loading='loading' :data.sync="data" :count.sync="count" :configs.sync="configs" :ruleData.sync="ruleData" :ruleConfigs.sync="ruleConfigs" :operationConfigs='optionConfigs' @handlerCurrentSelected='currentSelected' @handlerCellDblclick='cellDblclick' @handlerRuleChange='ruleChange' @handlerRuleEvent='ruleEvent' @handlerOperation='operation'>
			<!-- <template #statusName="slotProps">
				<el-tag type="success">{{slotProps.prop.statusName}}</el-tag>
			</template> -->
			<template #signDate="slotProps">
				{{slotProps.prop.signDate.slice(0, 10)}}
			</template>
			<template #clientTelPhone="slotProps">
				{{slotProps.prop.clientTel || ' -- '}} / {{slotProps.prop.clientPhone || ' -- '}}
			</template>
			<template #salesmanfollowPersonName="slotProps">
				{{slotProps.prop.salesmanName || ' -- '}} / {{slotProps.prop.followPersonName || ' -- '}}
			</template>
			<template #supplierPhoneTel="slotProps">
				{{slotProps.prop.supplierPhone || ' -- '}} / {{slotProps.prop.supplierTel || ' -- '}}
			</template>
			<!-- <template #consignmentPayment="slotProps">
				{{slotProps.prop.consignmentPayment ? '是' : '否'}}
			</template>
			<template #pickUpGoods="slotProps">
				{{slotProps.prop.supplierPhone}}
			</template> -->
			</data-table>
		</div>
	</div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import QueryBar from '@/components/common/QueryBar'
	import DataTable from "../../components/Model/dataTable.vue";
	import optionConfigs from "./optable";
	import ruleConfigs from "./rule";
	import configs from "./table";
	import utils from "../../util/config";
	export default {
		components: {
			DataTable,
			QueryBar
		},
		data: () => ({
			loading:false,
			optionConfigs:[],
			ruleData:{},
			ruleConfigs:[],
			data:[],
			count:0,
			configs,
			currentRow:'',
			btnObj: [
				{ type: "search", label: "查询" },
				{ type: "add", label: "新增" },
				{ type: "update", label: "修改" },
				{ type: "delete", label: "删除" },
			]
		}),
		computed: {
			...mapGetters(['orderStatus']),
			queryBarFormConfig () {
			return [
				{ label: "委托订单编码", moduleBind: "entrustOrderNo", isInput: true },
				{ label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
				{ label: "委托方名称", moduleBind: "clientName", isInput: true },
			]
			},
		},
		methods: {
			...mapMutations(["addbreadCrumbsList"]),
			// 获取列表
			async getTableList() {
				try {
					this.loading = true
					let { list, count } = await utils.getConfigTable(this.configs.api, this.ruleData)
					this.data = list
					this.count = count
				} catch (error) {
					this.$message({ message: '获取数据失败', type: 'warning',center: true });
					return Promise.reject(error)
				} finally {
					this.loading = false
				}
			},
			// 修改搜索条件
			ruleChange(ruleData) {
				this.ruleData = ruleData
			},
			// 选中当前行
			currentSelected(currentRow){
				this.currentRow = currentRow
			},
			// 选中当前行
			cellDblclick(currentRow){
				this.operation('update')
			},
			// 查询条件变更
			ruleEvent(newVal, oldVal){
				if(oldVal && newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1){
					// 如果存在页码之外的条件变更，且不在第一页
					this.$set(this.ruleData,'pageIndex',1)
				}else{
					this.getTableList()
				}
			},
			// 操作按钮事件
			async operation(val){
				if(val == 'add'){
					sessionStorage.setItem('btnType', 'create');
					this.addbreadCrumbsList({
						title: '/委托订单信息',
						data: { formData: '', status: "create" },
						path: '/EntrustOrderForm'
					});
					this.$router.push('/EntrustOrderForm')
				}
				if(val == 'update'){
					if((!this.currentRow) || JSON.stringify(this.currentRow) == "{}")return this.$message({ message: '请选择记录', type: 'warning',center: true });
					sessionStorage.setItem('btnType', 'update');
					this.addbreadCrumbsList({
						title: '/新委托订单信息',
						data: { formData: this.currentRow, status: "update" },
						path: '/EntrustOrderForm'
					});
					this.$router.push({ name: 'EntrustOrderForm', params: this.currentRow})
				}
				if(val == 'delete'){
					if((!this.currentRow) || JSON.stringify(this.currentRow) == "{}")return this.$message({ message: '请选择记录', type: 'warning',center: true });
					try {
						this.loading = true
						await utils.delConfigTable(this.configs.api, this.currentRow.entrustOrderNo);
						this.$message({ message: '删除成功', type: 'success',center: true });
						this.getTableList()
					} catch (error) {
						this.$message({ message: '删除失败', type: 'warning',center: true });
						return Promise.reject(error);
					} finally {
						this.loading = false
					}
				}
			},
		},
		created(){
			// 初始化条件并查询
			this.ruleData = utils.inntTable()
			this.getTableList()
		},
	};
</script>


<style lang="less">
.mystyle{
/* @import "../../styles/index.less"; */

/* 自定义 */
// 布局
.app-container {
  width: 100%;
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
}

.app-mian-container {
  overflow-y: hidden;
  overflow-x: auto;
}

.el-aside {
  background-color: #d1d8e0;
}

.model-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  min-width: 1440px;
}

.model {
  flex: 1;
}

.el-footer {
  text-align: center;
  padding-top: 36px;
  font-size: 14px;
  color: #a6a6a6;
}

//  model
.login {
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-size: 100% 100%;
}

.login-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.logout-btn {
  float: right;
  margin-top: 30px;
  transform: translate(0, -50%);
}

.header {
  line-height: 36px;
}

.table,
.form {
}

// 分页
.page {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

// 按钮
.operationDiv {
//   text-align: right;
  margin-bottom: 20px;
}

.operationDialogDiv {
  text-align: right;
  margin-top: 20px;
}

// 表单
// .el-form {
//   text-align: left;
// }

// .form-item {
//   width: 300px;
//   vertical-align: top;
//   display: inline-block;
//   padding-right: 50px;
//   margin-bottom: 10px;
// }

// .form-item-long {
//   width: 416px;
// }

// .form-item-big {
//   width: 650px;
// }

// 下拉输入框
.el-input {
  .el-select .el-input {
    width: 85px;
  }
}

.text-r input {
  text-align: right;
}


.el-date-editor.el-input,
.el-select {
  width: 100%;
}

.el-radio {
  height: 28px;
  line-height: 28px;
}

// 展示
.form-item.text {
  .colon{
    margin-right: 10px;
  }
}

.el-form-item__error {
  display: inline-block;
  left: auto;
  margin-left: 10px;
}

// 弹窗
.el-dialog {
  min-width: 1440px;
  .el-dialog__header{
    padding: 20px;
    .el-dialog__headerbtn{
      top: 25px;
    }
  }
  .el-dialog__body {
    padding: 0 20px 30px 20px;
  }
}

.formHead{
  text-align: center;
}

}
</style>
