
<template>
  <div class="table">
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
    <!-- 新增修改 表单弹窗 -->
    <popover-component
      itemName='物料财务信息'
      :isShowPopover="formDialog.isshow"
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData="formDialog"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
    ></popover-component>
    <!-- 弹窗选择 -->
    <popover-component
      :formConfig="tableDialog.queryBarObj"
      :itemName="tableDialog.title"
      :btnObj="tableDialog.btnObj"
      :ruleForm="tableDialog.ruleForm"
      :isShowPopover="tableDialog.isshow"
      :popoverList='tableDialog.data'
      :count='tableDialog.count'
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

import MaterielBaseForm from "@/components/views/basicdata/MaterielBaseForm.vue";
// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponent from "@/components/common/Table.Form.Dialog/DialogComponent.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/MaterielFinance.js";
import formConfig from "@/domain/formconfig/basicdata/MaterielFinance.js";
import tableDialogConfig from "@/domain/tableconfig/basicdata/MaterielBase.js";
import { mapGetters } from 'vuex'
export default {
  props: {
    btnObj: {
      type: Array,
      default: _ => ([])
    }
  },
  created () {
    console.log(1111)
    this.initTableList();
    api.initSelect(this.formDialog.formConfig)
  },
  data: () => ({
    queryBar: {

      data: {}
    },
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
      queryBarObj: [{ label: "编码", moduleBind: "materielCode", isInput: true }], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      isshow: false,
      data: [],
      count: 0,
      tableConfig: tableDialogConfig
    },
    pageCount: 0,
    tableClickRow: {},
    status: ''
  }),
  mounted () { },
  methods: {
    async initTableList (params = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getMaterielFinanceList({ ...this.queryBar.data, ...params });
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
          this.formDialog.ruleForm = {};
          this.formDialog.isshow = true;
          this.status = 'add'
          break;
        case "update":
          {
            if (!this.tableClickRow.materielFinanceCode) {
              utools.alertMessage.bind(this)("", "请选择一条数据");
              return;
            };
            this.formDialog.ruleForm = this.tableClickRow;
            this.formDialog.isshow = true;
            this.status = 'update';
          }
          break;
        case "delete":
          {
            if (!this.tableClickRow.materielFinanceCode) {
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
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.formDialog.isshow = true
    },
    // 弹窗按钮点击
    async handlerTableFormPreservation ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },
    // 提交单据
    async submitStatus () {
      let { materielFinanceCode } = this.formDialog.ruleForm, sCode = 0;
      try {
        const { status } = await api.updateBillStatus({ type: 'submit', code: materielFinanceCode });
        sCode = status;
        this.formDialog.isshow = false;
        this.tableClickRow = {};
        this.initTableList()
      } catch (error) {
        console.log(error)
      } finally {
        this.utools.alertStatusMessage.call(this, { status: sCode, msg: sCode === 200 ? { success: '提交成功' } : { error: '提交失败,请重试' } });
      }
    },
    // 保存单据
    async saveForm () {
      let s = 0;
      try {
        const { data, status } = await this.queryBarRequest['change'](this.status == 'add' ? 'POST' : 'PUT');
        s = status
        this.formDialog.ruleForm.status = data.status || '1';
        this.formDialog.ruleForm.materielFinanceCode = data.materielFinanceCode;
      } catch (error) {
        console.log(error)
      }
      this.initTableList()
      utools.alertMessage.bind(this)(s);
    },

    async handlerFormConfigClickSearch (params) {
      if ((this.formDialog.ruleForm.status || '1') !== '1') return;
      if(params == 'accContact'){}
      this.tableDialog = {
        ...this.tableDialog,
        title: '物料基础信息',
      }
      try {
        const { data: { list, count } } = await api.getMaterielBaseList({ financeStatus: false, status: '2' });
        this.tableDialog.data = list;
        this.tableDialog.count = count;
      } catch (error) {
        console.log(error)
      }
      this.tableDialog.isshow = true;
    },
    tableDialogPreservation ({ materielCode }) {
      this.formDialog.ruleForm = { ...this.formDialog.ruleForm, materielCode }
    }
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "materielCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "创建人", moduleBind: "creator", isInput: true },
        { label: "创建时间", moduleBind: "createTimeFrom", isDate: true },
      ]
    },
    queryBarRequest () {
      return {
        delete: _ => api.deleteMaterielFinanceData(this.tableClickRow.materielFinanceCode),
        add: _ => api.getMaterielBaseCode(),
        change: method => api.changeMaterielFinanceData(this.formDialog.ruleForm, method)
      };
    }
  },
  components: {
    MaterielBaseForm,
    QueryBar,
    TableComponent,
    PaginationComponent,
    PopoverComponent
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
