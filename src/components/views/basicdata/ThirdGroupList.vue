<template>
  <div class="table third-group">
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
        :queryBarVisible="false"
        :popoverList="table.tableData"
        :popoverListKey="table.tableConfig"
        :count="pageCount"
        @dblclickTableRow="handleDbclickTable"
        :activeRow.sync="tableClickRow"
        @handlePageChange="initTableList"
      ></table-component>
    </div>
    <!-- 表单弹窗 -->
    <popover-component
      :itemName="formDialog.itemName"
      :isShowPopover.sync="formDialog.isshow"
      popoverType="form"
      :billsStatus="formDialog.ruleForm.status"
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
import tableConfig from "@/domain/tableconfig/basicdata/ThirdGroup.js";
import formConfig from "@/domain/formconfig/basicdata/ThirdGroup.js";
import { mapGetters } from "vuex";

export default {
  created() {
    this.initTableList();
    api.initSelect(this.formDialog.formConfig);
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
      formConfig,
      itemName: "第三方",
      validate: eval,
      resetFields: eval
    },

    pageCount: 0,
    tableClickRow: {},
    status: ""
  }),
  methods: {
    async initTableList(params = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getThirdGroupList({ ...this.queryBar.data, ...params });
        (this.table.tableData = list), (this.pageCount = count);
      } catch (error) {
        console.log(error);
      }
    },
    async handleBtnClickType(type) {
      switch (type) {
        case "search":
          await this.initTableList();
          break;
        case "add":
          {
            try {
              const { data } = await this.queryBarRequest[type]();
              this.formDialog.ruleForm = {};
              this.formDialog.ruleForm.billCode = data;
              this.formDialog.isshow = true;
              this.status = "add";
            } catch (error) {
              this.$message.error("获取列表数据失败，请重试！");
              console.log(error);
            }
          }
          break;
        case "update":
          {
            utools.titleCallBack.call(this, this.tableClickRow, () => {
              this.formDialog.ruleForm = this.tableClickRow;
              this.formDialog.isshow = true;
              this.status = "update";
            });
          }
          break;
        case "delete":
          {
            utools.titleCallBack.call(
              this,
              this.tableClickRow,
              utools.removeReceiptsTips.bind(this, async () => {
                const { status } = await this.queryBarRequest[type]();
                this.initTableList();
                this.tableClickRow = {};
              })
            );
          }
          break;
      }
    },

    handleDbclickTable(data) {
      this.handleBtnClickType("update");
    },

    // 弹窗按钮点击
    async handlerTableFormPreservation() {
      this.saveForm();
    },
    handlerFormVerify({ formModel: { validate, resetFields } }) {
      (this.formDialog.validate = validate),
        (this.formDialog.resetFields = resetFields);
    },
    // 保存单据
    async saveForm() {
      this.formDialog.validate(valid => {
        if (valid) {
          utools.saveReceiptsTips.call(this, async () => {
            const { data, status } = await this.queryBarRequest["change"](
              this.status == "add" ? "POST" : "PUT"
            );
            this.formDialog.ruleForm.status = data.status;
            this.status = 'update'
            this.initTableList();
          });
        }
      });
    }
  },
  computed: {
    ...mapGetters(["orderStatus"]),

    queryBarFormConfig() {
      return [
        { label: "单据编码", moduleBind: "billCode", isInput: true },
        {
          label: "单据状态",
          moduleBind: "status",
          isSelect: true,
          selectOption: this.orderStatus
        }
      ];
    },

    queryBarRequest() {
      return {
        delete: _ => api.deleteThirdGroupData(this.tableClickRow.billCode),
        add: _ => api.getThirdGroupCode(),
        change: method =>
          api.changeThirdGroupData(this.formDialog.ruleForm, method)
      };
    }
  },
  components: {
    QueryBar,
    TableComponent,
    PopoverComponent
  }
};
</script>

<style lang='less'>
.third-group {
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
}
</style>
