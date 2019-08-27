<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <!-- <i class="el-icon-menu"></i> -->
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :btnObj="btnObj"
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :tableData="table.tableData"
        :tableDataKey="table.tableConfig"
        :isShowTabTable="true"
        @TableClickRowData="TableClickRowData"
        @handleDbclickTable="handleDbclickTable"
      ></table-component>
      <!-- 分页 -->
      <pagination-component
        :count="pageCount"
        @handlePageChange="initTableList"
      ></pagination-component>
    </div>
    <!-- 表单弹窗 -->
    <popover-component
      itemName='关务舱单'
      :isShowPopover.sync="formDialog.isshow"
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData="formDialog"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
    ></popover-component>
    <!-- 表格弹窗选择 -->
    <popover-component
      :formConfig="tableDialog.queryBarObj"
      :itemName="tableDialog.title"
      :btnObj="tableDialog.btnObj"
      :ruleForm="tableDialog.ruleForm"
      :isShowPopover="tableDialog.isshow"
      :count='tableDialog.count'
      :popoverList='tableDialog.data'
      :popoverListKey='tableDialog.tableConfig'
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
    ></popover-component>
  </div>
</template>

<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
// import PopoverComponent from "@/components/common/Table.Form.Dialog/DialogComponent.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/ShippingBill.js";
import formConfig from "@/domain/formconfig/basicdata/ShippingBill.js";
import targetUnitTableConfig from '@/domain/tableconfig/basicdata/TrainNumber.js'; // 车次弹窗
import deliveryCodeTableConfig from '@/domain/tableconfig/logistics/HkscheduleBase.js'; // 提运单号 - 香港 || 深圳上货计划
import { mapGetters } from 'vuex'

export default {
  watch: {
    'formDialog.ruleForm.customsType' (cur, pre) {
      if (!cur) return;
      this.formDialog.ruleForm.deliveryCode = ''
    }
  },
  created () {
    this.initTableList();
    api.initSelect(this.formDialog.formConfig)
  },
  data: () => ({
    componentId1: '',
    queryBar: {

      data: {}
    },
    tableDialogTarget: '',
    table: {
      tableData: [],
      tableConfig
    },
    formDialog: {
      isshow: false,
      ruleForm: {},
      formConfig
    },
    tableDialog: {
      ruleForm: {},
      title: "",
      queryBarObj: [{ label: "编码", moduleBind: "", isInput: true }], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      isshow: false,
      data: [],
      tableConfig: [] /* tableDialogConfig */
    },
    pageCount: 0,
    tableClickRow: {},
    status: ''
  }),
  methods: {
    async initTableList (params = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getShippingBillList({ ...this.queryBar.data, ...params });
        (this.table.tableData = list), (this.pageCount = count);
      } catch (error) {
        console.log(error);
      }
    },
    async handleBtnClickType (type) {
      switch (type) {
        case "search":
          await this.initTableList();
          break;
        case "add":
          {
            try {
              const { data } = await this.queryBarRequest[type]();
              this.formDialog.ruleForm = {};
              this.formDialog.ruleForm.shippingBillCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (!this.tableClickRow.shippingBillCode) {
              utools.alertMessage.bind(this)("", "请选择一条数据");
              return;
            };
            this.formDialog.ruleForm = this.tableClickRow;
            this.formDialog.isshow = true;
            this.status = 'update'
          }
          break;
        case "delete":
          {
            if (!this.tableClickRow.shippingBillCode) {
              utools.alertMessage.bind(this)("", "请选择一条数据");
              return;
            }
            try {
              const { status } = await this.queryBarRequest[type]();
              this.initTableList();
              this.tableClickRow = {};
              utools.alertMessage.bind(this)(status);
            } catch (error) {
              console.log(error);
            }
          }
          break;
      }
    },
    TableClickRowData (data) {
      this.tableClickRow = data;
    },
    handleDbclickTable (data) {
      this.TableClickRowData(data)
      this.handleBtnClickType('update');
    },
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow
    },
    handlerTableFormPreservation () {
      this.saveForm()
    },

    // 保存单据
    async saveForm () {
      let s = 0;
      try {
        const { data, status } = await this.queryBarRequest['change'](this.status == 'add' ? 'POST' : 'PUT');
        s = status;
        this.$set(this.formDialog.ruleForm, 'status', '1')
        this.initTableList()
      } catch (error) {
        console.log(error)
      }
      utools.alertMessage.bind(this)(s);
    },

    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.formDialog.isshow = true
    },
    // 表格弹窗 点击保存 事件
    tableDialogPreservation ({ trainNumberName = '', trainNumberCode = '', loadingBillNo = '' } = {}) {
      const formData = {};
      switch (this.tableDialogTarget) {
        case 'targetUnitName': // 车次
          formData.targetUnitName = trainNumberName,
            formData.targetUnit = trainNumberCode;
          break;
        case 'deliveryCode': // 提运单号
          formData.deliveryCode = loadingBillNo;
      }
      this.formDialog.ruleForm = { ...this.formDialog.ruleForm, ...formData };
    },
    // 设置 表格弹窗参数
    setTableDIalog () {
      let configObj = {

      }
      this.tableDialog = {
        ...this.tableDialog,
        title: '车次'
      }
    },
    // 点击form的 search 按钮
    async handlerFormConfigClickSearch (params) {
      if ((this.formDialog.ruleForm.status || '1') !== '1') return;
      this.setTableDIalog();
      try {
        const isDel = params === 'deliveryCode',
          customsType = this.formDialog.ruleForm['customsType'],
          fn = isDel ? this.tableDialogRequest[params][customsType] : this.tableDialogRequest[params];
        if (isDel && !customsType) { // 点击对象 为提运单号时 的处理（必须先选择报关类型）
          this.utools.alertStatusMessage.call(this, { msg: { warning: '请先选择报关类型' } });
          return;
        }
        const { data: { list, count } } = await fn();
        this.tableDialog.data = list;
        this.tableDialog.count = count
      } catch (error) {
        console.log(error)
      }
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params];
      this.tableDialog.isshow = true;
    }

  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "shippingBillCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus }
      ]
    },
    btnObj: () => [
      { label: "查询", type: "search" },
      { label: "新增", type: "add" },
      { label: "修改", type: "update" },
      { label: "删除", type: "delete" }
    ],
    queryBarRequest () {
      return {
        delete: _ => api.deleteShippingBillData(this.tableClickRow.shippingBillCode),
        add: _ => api.getShippingBillCode(),
        change: method => api.changeShippingBillData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      let output = (data = {}) => api.queryHkschedulebase(data),
        imports = (data = {}) => api.querySzschedulebase(data)
      return {
        deliveryCode: { // 提运单号根据报关类型
          '1': output,
          '2': imports,
          '3': output,
          '4': imports
        },
        targetUnitName: (data = {}) => api.queryTrainnumber(data), // 车次
      }
    },
    tableDialogConfig: () => {
      return {
        targetUnitName: targetUnitTableConfig,
        deliveryCode: deliveryCodeTableConfig
      }

    }
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
    PopoverComponent: () => import('@/components/common/Table.Form.Dialog/DialogComponent.vue')
  }
};
</script>

<style scoped>
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
