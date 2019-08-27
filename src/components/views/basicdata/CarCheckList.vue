<template>
  <div>
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
      :itemName='formDialog.itemName'
      :isShowPopover.sync="formDialog.isshow"
      :popoverType="'form'"
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
import tableConfig from "@/domain/tableconfig/basicdata/CarCheck.js";
import formConfig from "@/domain/formconfig/basicdata/CarCheck.js";

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
      formConfig,
      itemName: '查车登记'
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
        } = await api.getCarCheckList({ ...this.queryBar.data, ...params });
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
              this.formDialog.ruleForm.carCheckCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              console.log(error)
            }
          }
          break;
        case "update":
          {

            if (!this.tableClickRow.carCheckCode) {
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
            if (!this.tableClickRow.carCheckCode) {
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
    async saveForm () {
      let s = 0;
      try {
        const { status } = await this.queryBarRequest['change'](this.status == 'add' ? 'POST' : 'PUT');
        this.$set(this.formDialog.ruleForm, 'status', '1')
        s = status;
        this.initTableList()
      } catch (error) {
        console.log(error)
      }
      utools.alertMessage.bind(this)(s);
    },
    // 弹窗按钮点击
    handlerTableFormPreservation () {
      this.saveForm()
    },

    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.formDialog.isshow = true
    },
    tableDialogPreservation (clickrow) {
      switch (this.tableDialogTarget) {
        case 'trainNo':
          this.formDialog.ruleForm = {...this.formDialog.ruleForm, trainNo: clickrow.trainNo };
          break;
        // case 'tradeName':
        //   this.formDialog.ruleForm = {...this.formDialog.ruleForm, tradeName: clickrow.tradeName, trade: clickrow.materielCode };
        //   break;
        // case 'delegeteName':
        //   this.formDialog.ruleForm = {...this.formDialog.ruleForm, delegeteName: clickrow.clientName, delegete: clickrow.clientNo };
        //   break;
      }
    },
    async handlerFormConfigClickSearch (params) {
      try {
        const { data: { list, count } } = await this.tableDialogRequest[params]();
        this.tableDialog.data = list;
        this.tableDialog.count = count;
      } catch (error) {
        console.log(error)
      }
      this.tableDialog.title = ''
      this.tableDialog.queryBarObj = []
      if(params == 'trainNo'){
        this.tableDialog.title = '车次',
        this.tableDialog.queryBarObj = [{ label: "编码", moduleBind: "trainNo", isInput: true }]
      }
      this.tableDialogTarget = params;
      this.tableDialog.tableConfig = this.tableDialogConfig[params]();
      this.tableDialog.isshow = true;
    }

  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "车次编号", moduleBind: "trainNo", isInput: true },
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
        delete: _ => api.deleteCarCheckData(this.tableClickRow.carCheckCode),
        add: _ => api.getCarCheckCode(),
        change: method => api.changeCarCheckData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        trainNo: (data={}) => api.getTrainNumberList(data),
      }
    },
    tableDialogConfig: () => ({
      trainNo: _ => require('@/domain/tableconfig/basicdata/TrainNumber.js').default
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
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
</style>
