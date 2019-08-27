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
      itemName='税则表'
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
import tableConfig from "@/domain/tableconfig/basicdata/CustomsTariff.js";
import formConfig from "@/domain/formconfig/basicdata/CustomsTariff.js";
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
      count: 0,
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
        } = await api.getCustomsTariffList({ ...this.queryBar.data, ...params });
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
              this.formDialog.ruleForm.customsTariffCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (!this.tableClickRow.customsTariffCode) {
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
            if (!this.tableClickRow.customsTariffCode) {
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
        case 'firstUnitName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, firstUnitName: clickrow.measurementUnit, firstUnitCode: clickrow.measurementCode };
          break;
        case 'secondUnitName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, secondUnitName: clickrow.measurementUnit, secondUnitCode: clickrow.measurementCode };
          break;
        case 'transactionUnitName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, transactionUnitName: clickrow.measurementUnit, transactionUnitCode: clickrow.measurementCode };
          break;
        case 'superConditionName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, superConditionName: clickrow.billName, delegete: clickrow.billCode };
          break;
      }
    },
    async handlerFormConfigClickSearch (params) {
      if ((this.formDialog.ruleForm.status || '1') !== '1') return;
      this.tableDialog.ruleForm = {};
      // 设置表格弹窗的标题和 查询条件
      let obj = { ...this.setTableDialog(params) };
      try {
        const { data: { list, count } } = await this.tableDialogRequest[params]({ status: '2' });
        obj.data = list;
        obj.count = count;
      } catch (error) {
        console.log(error)
      }
      this.tableDialog = { ...this.tableDialog, ...obj };
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params]();
      this.tableDialog.isshow = true;
    },
    // 设置 弹窗表格的标题和查询条件
    setTableDialog (key = '') {
      (key == 'firstUnitName' || key == 'secondUnitName' || key == 'transactionUnitName') && (key = 'unit')
      let title = '计算单位',
        queryBarObj = [{ label: "编码", moduleBind: "measurementCode", isInput: true }];
      let config = {
        unit: {
          title,
          queryBarObj
        },
        superConditionName: {
          title: '监管条件',
          queryBarObj: [{ label: "编码", moduleBind: "billCode", isInput: true }]
        },
        '': {}
      };
      return config[key];
    }
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "单据编码", moduleBind: "customsTariffCode", isInput: true },
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
        delete: _ => api.deleteCustomsTariffData(this.tableClickRow.customsTariffCode),
        add: _ => api.getCustomsTariffCode(),
        change: method => api.changeCustomsTariffData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        firstUnitName: (data = {}) => api.getMeasurement(data),
        secondUnitName: (data = {}) => api.getMeasurement(data),
        transactionUnitName: (data = {}) => api.getMeasurement(data),
        superConditionName: (data = {}) => api.getSupervisionConditionList(data)
      }
    },
    tableDialogConfig: () => ({
      firstUnitName: _ => require('@/domain/tableconfig/basicdata/Measurement.js').default,
      secondUnitName: _ => require('@/domain/tableconfig/basicdata/Measurement.js').default,
      transactionUnitName: _ => require('@/domain/tableconfig/basicdata/Measurement.js').default,
      superConditionName: _ => require('@/domain/tableconfig/basicdata/SupervisionCondition.js').default
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
