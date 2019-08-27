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
      itemName='管制品申请表'
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
      :count='tableDialog.count'
      :isShowPopover="tableDialog.isshow"
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
import tableConfig from "@/domain/tableconfig/basicdata/ControlledGoodsApply.js";
import formConfig from '@/domain/formconfig/basicdata/ControlledGoodsApply.js';

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
      ruleForm: { applicantName: '', brandName: '',entryPerson:'' },
      formConfig
    },
    tableDialog: {
      ruleForm: {},
      title: "",
      queryBarObj: [], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      count: 0,
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
        } = await api.getControlledGoodsData({ ...this.queryBar.data, ...params });
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
              this.formDialog.ruleForm = { applicantName: '', brandName: '',entryPerson:'' };
              this.formDialog.ruleForm.controlledGoodsCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (!this.tableClickRow.controlledGoodsCode) {
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
            if (!this.tableClickRow.controlledGoodsCode) {
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
        this.initTableList();
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
    tableDialogPreservation ({ employeeInfoCode, employeeInfoName, brandCode, brandName } = {}) {
      let { ruleForm } = this.formDialog;
      switch (this.tableDialogTarget) {
        case 'applicantName':
          ruleForm.applicant = employeeInfoCode;
          ruleForm.applicantName = employeeInfoName;
          break;
        case 'entryPerson':
          ruleForm.entryPerson = employeeInfoCode;
          ruleForm.entryPerson = employeeInfoName;
          break;
        case 'brandName':
          ruleForm.brandName = brandName;
          ruleForm.brand = brandCode;
      }
    },
    async handlerFormConfigClickSearch (params) {
      if ((this.formDialog.ruleForm.status || '1') !== '1') return;
      let obj = { ...this.setTableDialog(params), data: [], count: 0, ruleForm: {} };
      try {
        const { data: { list, count } } = await this.tableDialogRequest[params]({ status: '2' });
        obj.count = count, obj.data = list;
      } catch (error) {
        console.log(error)
      }
      this.tableDialog = { ...this.tableDialog, ...obj };
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params];
      this.tableDialog.isshow = true;
    },
    // 设置 table弹窗 标题/查询条件
    setTableDialog (key = '') {
      let config = {
        applicantName: {
          title: '申请人',
          queryBarObj: [{ label: "编码", moduleBind: "employeeInfoCode", isInput: true }]
        },
        entryPerson: {
          title: '收据编号录入人',
          queryBarObj: [{ label: "编码", moduleBind: "employeeInfoCode", isInput: true }]
        },
        brandName: {
          title: '品牌',
          queryBarObj: [{ label: "编码", moduleBind: "brandCode", isInput: true }]
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
        { label: "单据编号", moduleBind: "controlledGoodsCode", isInput: true },
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
        delete: _ => api.deleteControlledGoods(this.tableClickRow.controlledGoodsCode),
        add: _ => api.getControlledGoodsNo(),
        change: method => api.saveControlledGoodsForm(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        // 申请人
        applicantName: (data = {}) => api.queryemployeeinfoSearch(data),
        entryPerson: (data = {}) => api.queryemployeeinfoSearch(data),
        // 品牌
        brandName: (data = {}) => api.getBrandList(data)

      }
    },
    tableDialogConfig: () => ({
      applicantName: require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
      entryPerson: require('@/domain/tableconfig/basicdata/EmployeeInfo.js').default,
      brandName: require('@/domain/tableconfig/basicdata/Brand.js').default
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
