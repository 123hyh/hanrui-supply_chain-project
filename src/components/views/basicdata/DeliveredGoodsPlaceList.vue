<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :formConfig="queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>

      <!-- 表格 -->
      <table-component
        :dialog="false"
        :queryBarVisible='false'
        :popoverList="table.tableData"
        :popoverListKey='table.tableConfig'
        :count="pageCount"
        :isShowTabTable="true"
        @dblclickTableRow='dblclickTableRow'
        :activeRow.sync="tableClickRow"
        @handlePageChange="initTableList"
      ></table-component>
    </div>
    <!-- 表单弹窗 -->
    <popover-component
      :itemName='formDialog.itemName'
      :isShowPopover.sync="formDialog.isshow"
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData="formDialog"
      @handlerFormVerify="handlerFormVerify"
      @formClickPreservation="handlerTableFormPreservation"
    ></popover-component>
  </div>
</template>

<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";

import PopoverComponent from "@/components/common/Table.Form.Dialog/DialogComponent.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/DeliveredGoodsPlace.js";
import formConfig from "@/domain/formconfig/basicdata/DeliveredGoodsPlace.js";
import { mapGetters } from 'vuex'


export default {
  watch: {
    'formDialog.isshow' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },

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
      itemName: '境内货源地',
      validate: eval,
      resetFields: eval
    },
    tableDialog: {
      isshow: false,
      data: [],
      tableConfig: [] 
    },
    pageCount: 0,
    tableClickRow: {},
    status: ''
  }),
  
  methods: {

    handlerFormVerify ({ formModel: { resetFields, validate } }) {
      this.formDialog.validate = validate,
        this.formDialog.resetFields = resetFields
    },

    dblclickTableRow () {
      this.handleBtnClickType('update')
    },

    async initTableList (params = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getDeliveredGoodsPlaceList({ ...this.queryBar.data, ...params });
        (this.table.tableData = list), (this.pageCount = count);
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
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
              this.formDialog.ruleForm.goodsPlaceCode = data;
              this.formDialog.isshow = true;
              this.status = 'add'
            } catch (error) {
              this.$message.error('获取单据编号失败，请重试！')
              console.log(error)
            }
          }
          break;
        case "update":
          {
            utools.titleCallBack.call(
              this,
              this.tableClickRow,
              () => {
                this.formDialog.ruleForm = utools.cloneObj(this.tableClickRow);
                this.formDialog.isshow = true;
                this.status = 'update'
              }
            )
          }
          break;
        case "delete":
          {
            utools.titleCallBack.call(
              this,
              this.tableClickRow,
              utools.removeReceiptsTips.bind(
                this,
                async () => {
                  const { status } = await this.queryBarRequest[type]();
                  this.initTableList();
                  this.tableClickRow = {};
                }
              )
            )
          }
          break;
      }
    },



    async handlerTableFormPreservation ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },

    // 保存单据
    async saveForm () {
      this.formDialog.validate(async valid => {
        if (valid) {
          utools.saveReceiptsTips.call(
            this,
            async () => {
              const { data, status } = await this.queryBarRequest['change'](this.status == 'add' ? 'POST' : 'PUT');
              this.formDialog.ruleForm.status = data.status;
              this.initTableList();
            }
          )
        }
      })

    },

    // 提交单据
    async submitStatus () {
      let { goodsPlaceCode } = this.formDialog.ruleForm;
      utools.sbumitReceiptsTips.call(
        this,
        async () => {
          const { status } = await api.updateBillStatus({ type: 'submit', code: goodsPlaceCode });
          this.formDialog.isshow = false;
          this.formDialog.ruleForm = {};
          this.tableClickRow = {};
          this.initTableList()
        }
      )
    },
  },

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "名称", moduleBind: "goodsPlaceName", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus }
      ]
    },

    queryBarRequest () {
      return {
        delete: _ => api.deleteDeliveredGoodsPlaceData(this.tableClickRow.goodsPlaceCode),
        add: _ => api.getDeliveredGoodsPlaceCode(),
        change: method => api.changeDeliveredGoodsPlaceData(this.formDialog.ruleForm, method)
      };
    },
  },
  components: {
    QueryBar,
    TableComponent,
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
