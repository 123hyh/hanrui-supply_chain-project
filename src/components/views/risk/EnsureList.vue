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
      popoverType="form"
      :billsStatus="formDialog.ruleForm.status"
      :formData="formDialog"
      width="725px"
      :btnObj="[ { type: 'upload', label: '附件上传'  }]"
      @handleItemBtnClick='() => uploadDialogVisible = true'
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
      @handlerFormVerify="handlerFormVerify"
    ></popover-component>
    <!-- 表格弹窗选择 -->
    <popover-component
      :isShowPopover="tableDialog.isshow"
      :count="tableDialog.count"
      :itemName="tableDialog.itemName"
      :btnObj="tableDialog.btnObj"
      :formConfig="tableDialog.queryConfig"
      :ruleForm="tableDialog.ruleForm"
      :popoverList="tableDialog.data"
      :popoverListKey="tableDialog.tableConfig"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
      @handlePageChange="handlerFormConfigClickSearch"
      @handleBtnClickType="handlerFormConfigClickSearch"
    ></popover-component>
    <!-- 附件上传弹窗 -->
    <upload-dialog
      :form='formDialog.ruleForm'
      :visible.sync='uploadDialogVisible'
    ></upload-dialog>
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
import UploadDialog from '@/components/common/upload/UploadDialog.vue'

// 注册表
import tableConfig from "@/domain/tableconfig/risk/Ensure.js";
import formConfig from "@/domain/formconfig/risk/Ensure.js";

import mixins from "@/components/views/risk/mixins.js";
const btnObj = [{ type: "search", label: "查询" }];
import { mapGetters } from "vuex";
export default {
  name: 'EnsureList',
  mixins: [mixins],
  created () {
    this.initTableList();
    api.initSelect(this.formDialog.formConfig);
  },
  watch: {
    "formDialog.ruleForm.ensureAmount" (cur) {
      if (!cur) return;
      this.formDialog.ruleForm.ensureCurrency =
        Math.round(
          +cur * (this.formDialog.ruleForm.exchangeRate || 0) * 10000
        ) / 10000;
    }
  },
  data: () => ({
    uploadDialogVisible: false,
    queryBar: {
      data: {}
    },
    tableDialogTarget: "",
    table: {
      tableData: [],
      tableConfig
    },
    formDialog: {
      isshow: false,
      ruleForm: {},
      formConfig,
      itemName: '担保管理'
    },
    tableDialog: {
      isshow: false,
      ruleForm: {},
      data: [],
      tableConfig: [],
      count: 0
    },
    pageCount: 0,
    tableClickRow: {},
    status: "",
    clickSearchType: "",
    validate: new Function() //表单验证回调
  }),
  methods: {
    /**
     * @method handlerFormVerify 设置验证规则
     * @method initTableList 获取表格数据
     */
    handlerFormVerify ({ formModel: { validate } }) {
      this.validate = validate;
    },
    async initTableList (params = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getEnsureManageList({ ...this.queryBar.data, ...params });
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
              this.formDialog.ruleForm.ensureNo = data;
              this.formDialog.isshow = true;
              this.status = "add";
            } catch (error) {
              console.log(error);
            }
          }
          break;
        case "update":
          {
            if (!this.tableClickRow.ensureNo) {
              utools.alertMessage.bind(this)("", "请选择一条数据");
              return;
            }
            this.formDialog.ruleForm = this.tableClickRow;
            this.formDialog.isshow = true;
            this.status = "update";
          }
          break;
        case "delete":
          {
            if (!this.tableClickRow.ensureNo) {
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
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    isVerify () {
      let isVerify = false;
      this.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    // 弹窗按钮点击
    async handlerTableFormPreservation () {
      this.saveForm();
    },

    // 保存单据
    async saveForm () {
      if (this.isVerify()) {
        let s = 0;
        try {
          const { data, status } = await this.queryBarRequest["change"](
            this.status == "add" ? "POST" : "PUT"
          );
          s = status;
          this.$set(this.formDialog.ruleForm, 'status', '1')
        } catch (error) {
          console.log(error);
        }
        utools.alertMessage.bind(this)(s);
        this.initTableList()
      }
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.formDialog.isshow = true;
    },
    tableDialogPreservation (clickrow) {
      switch (this.tableDialogTarget) {
        case "securedUnitName":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            securedUnitName: clickrow.clientName,
            securedUnitCode: clickrow.clientNo
          };
          break;
        case "companyName":
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            companyName: clickrow.companyName,
            companyCode: clickrow.companyCode
          };
          break;
        case "repealPersonName": {
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            repealPersonId: clickrow.employeeInfoCode,
            repealPersonName: clickrow.employeeInfoName
          };
          break;
        }
        case "ensureUnitName": {
          let ens = this.formDialog.ruleForm.ensureUnitType;
          let obj = {
            "1": [clickrow.customerName, clickrow.customerNo],
            "2": [clickrow.supplierName, clickrow.supplierCode],
            "3": [clickrow.thirdGroupName, clickrow.billCode],
            "4": [clickrow.clientName, clickrow.clientNo]
          };
          this.formDialog.ruleForm = {
            ...this.formDialog.ruleForm,
            ensureUnitName: obj[ens][0],
            ensureUnitCode: obj[ens][1]
          };
          break;
        }
      }
    },
    async handlerFormConfigClickSearch (params) {
      let isEns = params === "ensureUnitName";
      let ensureUnitType = this.formDialog.ruleForm.ensureUnitType;
      // 担保单位的处理
      if (isEns && !ensureUnitType) {
        utools.alertStatusMessage.call(this, {
          msg: { warning: "请先选择担保单位类型" }
        });
        return;
      }
      let dataType = utools.getDataType(params);
      if (dataType === "String" && params !== "search") {
        this.tableDialog.ruleForm = {};
        this.clickSearchType = params;
        if (isEns) {
          this.tableDialog = {
            ...this.tableDialog,
            ...this.setDialogTitleAndQuery[params][ensureUnitType]()
          };
        } else {
          this.tableDialog = {
            ...this.tableDialog,
            ...this.setDialogTitleAndQuery[params]
          };
        }
      }
      const WHITE_LIST = ['companyName', 'ensureUnitName', 'repealPersonName']
      try {
        // 点击 担保单位 调用 不同的 api接口
        const {
          data: { list, count }
        } = await (isEns
          ? this.tableDialogRequest[this.clickSearchType][ensureUnitType]
          : this.tableDialogRequest[this.clickSearchType])({
            ...(dataType === "Object" && params),
            ...this.tableDialog.ruleForm,
            status: WHITE_LIST.includes(this.clickSearchType) ? '2' : ''
          });
        this.tableDialog.data = list;
        this.tableDialog.count = count;
      } catch (error) {
        console.log(error);
      }
      if (dataType === "Object") return;
      this.tableDialogTarget = params;
      // 点击担保单位 根据 担保单位类型的值取对应表格配置
      this.tableDialog.tableConfig = (isEns
        ? this.tableDialogConfig[params][ensureUnitType]
        : this.tableDialogConfig[params])();
      this.tableDialog.isshow = true;
    }
  },
  computed: {
    ...mapGetters(["orderStatus"]),
    queryBarFormConfig () {
      return [
        { label: "委托方编码", moduleBind: "ensureUnitCode", isInput: true },
        {
          label: "单据状态",
          moduleBind: "status",
          isSelect: true,
          selectOption: this.orderStatus
        },
        { label: "担保单号", moduleBind: "ensureNo", isInput: true }
      ];
    },
    queryBarRequest () {
      return {
        delete: _ => api.deleteEnsureData(this.tableClickRow.ensureNo),
        add: _ => api.getEnsureCode(),
        change: method => api.changeEnsureData(this.formDialog.ruleForm, method)
      };
    },
    tableDialogRequest () {
      return {
        securedUnitName: (data = {}) => api.queryclientSearch(data),
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        repealPersonName: (data = {}) => api.queryemployeeinfoSearch(data),
        ensureUnitName: {
          "1": (data = {}) => api.getCustomerList(data),
          "2": (data = {}) => api.querysupplierbaseSearch(data),
          "3": (data = {}) => api.getThirdGroupList(data),
          "4": (data = {}) => api.queryclientSearch(data)
        }
      };
    },
    tableDialogConfig: () => ({
      securedUnitName: _ =>
        require("@/domain/tableconfig/business/Client.js").default,
      companyName: _ =>
        require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
      repealPersonName: _ =>
        require("@/domain/tableconfig/basicdata/EmployeeInfo.js").default,
      ensureUnitName: {
        "1": _ => require("@/domain/tableconfig/basicdata/Customer.js").default,
        "2": _ =>
          require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
        "3": _ =>
          require("@/domain/tableconfig/basicdata/ThirdGroup.js").default,
        "4": _ => require("@/domain/tableconfig/business/Client.js").default
      }
    }),
    setDialogTitleAndQuery: _ => ({
      securedUnitName: {
        itemName: "委托方",
        queryConfig: [
          { isInput: true, label: "委托方编码", moduleBind: "clientNo" }
        ],
        btnObj
      },
      ensureUnitName: {
        "1": _ => ({ itemName: "客户", queryConfig: [], btnObj }),
        "2": _ => ({ itemName: "供应商", queryConfig: [], btnObj }),
        "3": _ => ({ itemName: "第三方", queryConfig: [], btnObj }),
        "4": _ => ({ itemName: "委托方", queryConfig: [], btnObj }),
      },
      companyName: {
        itemName: "公司",
        queryConfig: [
          { isInput: true, label: "公司编码", moduleBind: "companyCode" }
        ],
        btnObj
      }
    })
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent,
    PopoverComponent,
    UploadDialog
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
