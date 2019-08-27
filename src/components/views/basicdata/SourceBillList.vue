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
      itemName='原始舱单'
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
import PopoverComponent from "@/components/common/Table.Form.Dialog/DialogComponent.vue";


// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/SourceBill.js";
import formConfig from "@/domain/formconfig/basicdata/SourceBill.js";
import { mapGetters } from 'vuex'

export default {
  created () {
    this.initTableList();
    api.initSelect(this.formDialog.formConfig)
  },
  data: () => ({
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
      queryBarObj: [], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      isshow: false,
      data: [],
      tableConfig: [] /* tableDialogConfig */
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
        } = await api.getSourceBillList({ ...this.queryBar.data, ...params });
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
              this.formDialog.ruleForm.sourceBillCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (!this.tableClickRow.sourceBillCode) {
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
            if (!this.tableClickRow.sourceBillCode) {
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
        this.tableClickRow = {};
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
    tableDialogPreservation (clickrow) {
      switch (this.tableDialogTarget) {
        case 'deliveryNoName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, deliveryNoName: clickrow.loadingBillNo, deliveryNo: clickrow.scheduleBaseCode, trainNo: clickrow.trips };
          break;
      }
    },
    async handlerFormConfigClickSearch (params) {
      if ((this.formDialog.ruleForm.status || '1') !== '1') return;
      let obj = { ...this.setTableDialog(params), data: [], count: 0, ruleForm: {} }
      try {
        const { data: { list, count } } = await this.tableDialogRequest[params]({ status: '2' });
        obj.data = list, obj, count = count;
      } catch (error) {
        console.log(error)
      }
      this.tableDialog = { ...this.tableDialog, ...obj };
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params]();
      this.tableDialog.isshow = true;
    },
    setTableDialog (key = '') {
      let config = {
        deliveryNoName: {
          title: '提运单号',
          queryBarObj: [{ label: "编码", moduleBind: "scheduleBaseCode", isInput: true }]
        },
        '': {}
      }
      return config[key]
    }
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "单据编码", moduleBind: "sourceBillCode", isInput: true },
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
        delete: _ => api.deleteSourceBillData(this.tableClickRow.sourceBillCode),
        add: _ => api.getSourceBillCode(),
        change: method => api.changeSourceBillData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        deliveryNoName: (data = {}) => api.getHkschedulcheBaseList(data)
      }
    },
    tableDialogConfig: () => ({
      deliveryNoName: _ => require('@/domain/tableconfig/logistics/HkscheduleBase.js').default
    })
  },
  components: {
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
