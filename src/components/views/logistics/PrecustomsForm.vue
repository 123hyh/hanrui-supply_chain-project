<template>
  <div class="Box">
    <!-- 操作按钮 -->
    <preserve-btn
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      @handleSubmit="handleSubmit"
      :billsStatus='form.data.status'
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- 查询栏 -->
    <el-row>
      <el-col :span="20">
        <form-component
          :inputKey='queryBar.inputKey'
          :formModel='queryBar.formModel'
          @handlerFormVerify="queryBarFormVerify"
          @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
        ></form-component>
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          @click.stop="handleSearch"
        >查询</el-button>
        <el-button @click.stop="handleClear">清除</el-button>
      </el-col>
    </el-row>
    <form-moduleHead title=''></form-moduleHead>
    <!-- 输入框 -->
    <form-component
      style="margin: 20px 0;"
      :formModel="form['data']"
      :inputKey="form['formConfig']"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></form-component>
    <!-- 表格 -->
    <el-tabs
      v-model="tabActiveName"
      type="border-card"
      @tab-click="handlerTabClick"
    >
      <el-tab-pane
        label="待报关入库单"
        name="godownentry"
      ></el-tab-pane>
      <el-tab-pane
        label="待报关采购订单(预申报)"
        name="purchaseorder"
      ></el-tab-pane>
      <!-- 表格 -->
      <div>
        <el-table
          :data="dataTab"
          tooltip-effect="dark"
          :fit='true'
          border
          stripe
          @selection-change="handleSelectionChange"
          ref="multipleTable"
        >
          <el-table-column
            type="selection"
            width="55"
          ></el-table-column>
          <el-table-column
            v-for='item in columnDataTable'
            :type="item.type"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
        <!-- 分页 快捷键：ctrl+] 首尾加标签-->
        <pagination-component
          @handlePageChange="handleTabPageChange"
          :count="queryTableData.count"
        ></pagination-component>
        <!-- 按钮 -->
        <div class="queryBtn">
          <el-checkbox
            v-model="queryBar.beforehand"
            @change="handleChange"
          >预申报</el-checkbox>
          <el-checkbox v-model="queryBar.car">本车最后一单</el-checkbox>
        </div>
      </div>
    </el-tabs>
    <!-- 分割条 -->
    <form-moduleHead title='商品明细'></form-moduleHead>
    <!-- 表格 -->
    <section v-show="table.tableData.length>0">
      <table-component
        :tableData="table.tableData"
        :tableDataKey="table.tableConfig"
        :isShowTabTable="true"
        tabName="basic"
        @setCurrent="setCurrent"
        @TableClickRowData="TableClickRowData"
        @handlerTableBtnClick="handlerTableBtnClick"
      ></table-component>
      <pagination-component
        :count="table.pageCount"
        @handlePageChange="initTableData"
      ></pagination-component>
    </section>
    <!-- 表格弹窗 -->
    <popover-component
      :itemName="tableDialog.title"
      :popoverType="tableDialog.popoverType"
      :formConfig="tableDialog.queryBarObj"
      :btnObj="tableDialog.btnObj"
      :isShowPopover="tableDialog.isshow"
      :popoverList="tableDialog.data"
      :popoverListKey="tableDialog.tableConfig"
      :ruleForm="tableDialog.ruleForm"
      :count="tableDialog.count"
      @handleBtnClickType="handleBtnClick"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
      @handlePageChange="handlePageChange"
    ></popover-component>
    <!-- 表单弹窗 -->
    <popover-component
      :isShowPopover="formDialog.isshow"
      :popoverType="'form'"
      :formData="formDialog"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></popover-component>
    <div></div>
  </div>
</template>
<script>
// 公共方法
import api from "@/assets/js/appHelper.js";

// 公共组件
import FormComponent from "@/components/common/FormConfig.vue";
import TabTable from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponent from "@/components/common/Popover.vue";
import FormModuleHead from '@/components/common/FormModuleHead.vue'
// 注册表
import QueryBarForm from "@/domain/entities/logistics/PrecustomsQueryBar";
import QueryBarKey from "@/domain/formconfig/logistics/PrecustomsQueryBar";
import formConfig from "@/domain/formconfig/logistics/Precustoms";
// import tableConfig from "@/domain/tableconfig/logistics/PrecustomsGoods";
// import itemFormConfig from "@/domain/formconfig/logistics/PrecustomsGoods";
import itemTableData from "@/assets/js/data";
import { mapGetters, mapMutations } from "vuex";
let itemFormConfig = [], tableConfig = [];
export default {
  components: {
    FormComponent,
    TableComponent: TabTable,
    PaginationComponent,
    PopoverComponent,
    FormModuleHead
  },
  data () {
    return {
      tableBtnType: "",
      dialogTarget: "",
      status: "update",
      isLoading: false,
      queryBar: {
        inputKey: QueryBarKey,
        formModel: new QueryBarForm(),
        beforehand: '',
        car: '',
      },
      tabActiveName: 'godownentry',
      verify: {}, // 表单验证
      // table
      dataTab: [],
      // table - 列
      columnDataTable: '',
      // 分页查询条件 form
      queryTableData: {},
      form: {
        data: {
          tenantId: "hfy",
          // precustomsGodowns: itemTableData
        },
        formConfig
      },
      formDialog: {
        isshow: false,
        ruleForm: { tenantId: "hfy" },
        formConfig: itemFormConfig
      },
      table: {
        isshow: false,
        tableData: [],
        tableConfig,
        pageCount: 0
      },
      tableDialog: {
        isshow: false,
        popoverType: 'table',
        ruleForm: { tenantId: "hfy" },
        count: 0,
        title: "报关计划单-基础信息",
        queryBarObj: [
          { label: "编码", moduleBind: "scheduleBaseCode", isInput: true }
        ], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        data: [],
        tableConfig: []
      },
      clickRowData: {}
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    DialogRequest () {
      return {
        deliveryNo: (data = {}) => api.queryHkschedulebase(data),
        entrustOrderNo: (data = {}) => api.queryentrustorderSearch(data),
        godownEntryNo: (data = {}) => api.queryGodownentry(data),
        purchaseOrderNo: (data = {}) => api.getProcurementList(data),
        warehouseNo: (data = {}) => api.querywarehouseSearch(data),
        issueTypeName: (data = {}) => api.querytransactiontypeSearch(data),
        supplierName: (data = {}) => api.querysupplierbaseSearch(data),
        departmentName: (data = {}) => api.getDepartment(data),
        delegeteName: (data = {}) => api.queryclientSearch(data),
        purchaseUnitName: (data = {}) => api.querycompanyinfoSearch(data),
        goodsName: (data = {}) => api.getEntrustGoods(data),
        taxNo: (data = {}) => api.getCustomsMaterielList(data),
      };
    },
    tableConfigs: () => ({
      deliveryNo: {
        title: "上货计划",
        searchCode: "scheduleBaseCode",
        config: _ =>
          require("@/domain/tableconfig/logistics/HkscheduleBase.js").default
      },
      entrustOrderNo: {
        title: "委托订单",
        searchCode: "entrustOrderNo",
        config: _ =>
          require('@/domain/tableconfig/commerce/EntrustOrder.js').default
      },
      godownEntryNo: {
        title: "入库单",
        searchCode: "godownEntryCode",
        config: _ =>
          require("@/domain/tableconfig/logistics/GodownEntry.js").default
      },
      purchaseOrderNo: {
        title: "采购订单编号",
        searchCode: "godownEntryCode",
        config: _ =>
          require("@/domain/tableconfig/commerce/PurchaseOrder.js").default
      },
      warehouseNo: { // storageName
        title: "仓库",
        searchCode: "warehouseCode",
        config: _ =>
          require("@/domain/tableconfig/basicdata/Warehouse.js").default
      },
      issueTypeName: {
        title: '事务类型',
        searchCode: 'transactionCode',
        config: _ => require('@/domain/tableconfig/basicdata/TransactionType.js').default,
      },
      supplierName: {
        title: '供应商',
        searchCode: 'supplierCode',
        config: _ => require('@/domain/tableconfig/basicdata/SupplierBase.js').default,
      },
      departmentName: {
        title: '部门',
        searchCode: 'departmentCode',
        config: _ => require('@/domain/tableconfig/system/Department.js').default,
      },
      delegeteName: {
        title: '委托方',
        searchCode: 'clientNo',
        config: _ => require('@/domain/tableconfig/business/Client.js').default,
      },
      purchaseUnitName: { // receiveOrganizationName
        title: '公司',
        searchCode: 'CompanyCode',
        config: _ => require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
      },
      goodsName: {
        title: '委托订单-商品明细',
        searchCode: 'goodsCode',
        config: _ => require('@/domain/tableconfig/commerce/EntrustGoods.js').default,
      },
      taxNo: {
        title: '物料税号',
        searchCode: 'customsMaterielCode',
        config: _ => require('@/domain/tableconfig/basicdata/CustomsMateriel.js').default,
      },
    })
  },
  watch: {
    tabActiveName (newVal, oldVal) {
      if (newVal == 'godownentry') { }
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    /************** 弹窗列表 start **********/
    async handlerFormConfigClickSearch (params, obj, queryData) {
      console.log(params, queryData)
      this.dialogTarget = params;
      const unitArr = ['businessUnit', 'agency', 'storeOrgName', 'receiveOrganizationName'], warehouse = ['storageName'], entrustOrder = ['orderNos'], godownEntry = ['godownEntryCode'];
      params = unitArr.includes(params) ? 'purchaseUnitName' : warehouse.includes(params) ? 'warehouseNo' : entrustOrder.includes(params) ? 'entrustOrderNo' : godownEntry.includes(params) ? 'godownEntryNo' : params;
      this.tableDialog.popoverType = this.dialogTarget == 'orderNos' ? 'selectTable' : 'table'; // 委托单号是多选表格
      // 弹窗条件
      queryData = params == 'goodsName' ? { ...queryData, entrustOrderNos: this.formDialog.ruleForm.orderNos } : queryData;
      try {
        // 弹窗条件查询
        const {
          data: { list, count }
        } = await this.DialogRequest[params](queryData);
        this.tableDialog = {
          ...this.tableDialog,
          data: list,
          count: count,
          title: this.tableConfigs[params]["title"],
          queryBarObj: [
            {
              label: "编码",
              moduleBind: this.tableConfigs[params]["searchCode"],
              isInput: true
            }
          ],
          tableConfig: this.tableConfigs[params]["config"](),
          isshow: true
        };
      } catch (error) {
        this.utools.alertMessage.bind(this)("", "获取数据失败, 请重试");
        console.log(error);
      }
    },
    tableDialogPreservation (data) {
      switch (this.dialogTarget) {
        case "deliveryNo":
          this.form.data = {
            ...this.form.data,
            deliveryNo: data.loadingBillNo,
            carNo: data.trips,
            entryPort: data.port,
            conveyance: data.platesNo,
            loadingTime: data.planDate,
            vehicleSequence: data.planDate
              ? data.planDate.split(" ")[0] + data.trips
              : ""
          };
          break;
        case "entrustOrderNo":
          this.queryBar.formModel = {
            ...this.queryBar.formModel,
            entrustOrderNo: data.entrustOrderNo
          };
          break;
        case "godownEntryNo":
          this.queryBar.formModel = {
            ...this.queryBar.formModel,
            godownEntryNo: data.godownEntryCode
          };
          break;
        case "warehouseNo":
          this.queryBar.formModel = {
            ...this.queryBar.formModel,
            warehouseNo: data.warehouseCode
          };
          break;
        case "purchaseOrderNo":
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, purchaseOrderNo: data.purchaseOrderNo };
          break;
        case "godownEntryCode":
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, godownEntryCode: data.godownEntryCode };
          break;
        case 'orderNos':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, orderNos: data.map(item => item.entrustOrderNo) };
          break;
        case 'goodsName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, ...data, orderNos: [data.entrustOrderNo],/* goodsName: data.goodsName, goodsCode: data.goodsCode, */ goodsModel: data.arrivalGoodsModel };
          break;
        case 'taxNo':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, taxNo: data.taxNo };
          break;
        case 'storageName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, storageName: data.warehouseName, storageCode: data.warehouseCode };
          break;
        case 'issueTypeName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, issueTypeName: data.transactionName, issueTypeCode: data.transactionCode };
          break;
        case 'supplierName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, supplierName: data.supplierName, supplierCode: data.supplierCode };
          break;
        case 'departmentName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, departmentName: data.departmentName, departmentCode: data.departmentCode };
          break;
        case 'delegeteName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, delegeteName: data.clientName, delegeteCode: data.clientNo };
          break;
        case 'businessUnit':
        case 'agency':
        case 'storeOrgName':
        case 'receiveOrganizationName':
        case 'purchaseUnitName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, [this.dialogTarget]: data.companyName, [this.dialogTarget.replace(/Name/g, "Code")]: data.companyCode };
          break;
      }
    },
    /************** 弹窗列表 end **********/
    // 点击取消按钮，回到列表页
    queryBarFormVerify ($refs) {
      this.verify = $refs;
    },
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    isVerify () {
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    //分页
    async handleTabPageChange (paper) {
      const {
        data: { list, count }
      } = await api.querySearch('/entrustorder', paper)
      this.dataTab = list;
      this.utools.turnCodeBoolean(this.dataTab)
      this.queryTableData.count = count;
    },
    // 第一个字母转大写
    capitalize ([first, ...rest]) {
      return first.toUpperCase() + rest.join('')
    },
    handlerTabClick ({
      name
    } = tab, event) {
      this.table.tableData = [];
      this.queryBar.beforehand = (name !== 'godownentry');
      let tableUrl = name == 'godownentry' ? "logistics/PrecustomsGoods" : "logistics/PrecustomsOrder";
      let tableConfig = name == 'godownentry' ? "logistics/PrecustomsGodown" : "logistics/PrecustomsPurchase";
      this.columnDataTable = require("@/domain/tableconfig/" + tableConfig).default;
      this.table.tableConfig = require("@/domain/tableconfig/" + tableUrl).default;
      this.formDialog.formConfig = require("@/domain/formconfig/" + tableUrl).default;
      api.initSelect(this.formDialog.formConfig);
      let withoutKey = name == 'godownentry' ? { withoutHkInstore: false } : { withoutPurchase: false };
      this.queryBar.form = { ...this.queryBar.formModel, ...withoutKey, reportGateStatus: 3, pageIndex: 1, pageSize: 10 }
      this.status !== 'update' && this.handleTabPageChange(this.queryBar.form);
      // this.curRowData = {}; // 清空当前行数据
    },
    async initTableData (page = {}) {
      let precustomsGodowns = this.utools.getSession('precustomsGodowns') || this.form.data.precustomsGodowns;
      if (precustomsGodowns.length > 0) {
        this.table = { ...this.table, tableData: precustomsGodowns, pageCount: precustomsGodowns.length };
      } else {
        try {
          const {
            data: { list, count }
          } = await api.queryprecustomsgoodsSearch({
            ...page,
            preCustomsCode: this.form.data.preCustomsCode
          });
          this.table = { ...this.table, tableData: list, pageCount: count };
        } catch (error) {
          console.log(error);
        }
      }
      this.setCurrent()
    },

    handleBtnClick () { //点击查询栏按钮事件
      this.handlerFormConfigClickSearch(this.dialogTarget, null, this.tableDialog.ruleForm)
    },
    TableClickRowData (data) {
      this.clickRowData = data;
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
    },
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
      this.setCurrent()
    },
    // 取消选择
    setCurrent (row) {
      this.clickRowData = {};
    },
    // 子表按钮操作
    async handlerTableBtnClick (type) {
      if (type !== "delete") {
        type === "add"
          ? (this.formDialog.ruleForm = { tenantId: "hfy", preCustomsCode: this.form.data.preCustomsCode })
          : (this.formDialog.ruleForm = this.clickRowData);
        this.formDialog.isshow = true;
        this.tableBtnType = type;
      } else {
        //         this.utools.titleCallBack.bind(this)(this.clickRowData.preCustomsCode, ()=>{
        //           this.utools.deleteMessage.bind(this)(async ()=>{
        //             try {
        //               const { status, data: {list, count} } = await api.deleteprecustomsgoodsData(this.clickRowData.preCustomsCode);
        //               this.utools.alertMessage.bind(this)(status, null, '删除')
        //               this.initTableData();
        //             } catch (e) { console.log(e) }
        //           })
        //         })
        // 删除
        this.utools.titleCallBack.bind(this)(this.clickRowData, () => {
          this.utools.deleteMessage.bind(this)(() => {
            try {
              this.table.tableData.splice(this.table.tableData.findIndex(item => item.preCustomsCode === this.clickRowData.preCustomsCode), 1)
              this.form.data.precustomsGodowns = this.table.tableData;
              this.utools.setSession('precustomsGodowns', this.form.data.precustomsGodowns)
              this.utools.alertMessage.bind(this)(200, null, '删除')
              this.initTableData();
            } catch (e) { console.log(e) }
          })
        })
      }
    },
    handleSearch () {
      let withoutKey = name == 'godownentry' ? { withoutHkInstore: false } : { withoutPurchase: false };
      let params = {
        // delegeteBillNo :this.queryBar.formModel.entrustOrderNo,
        ...withoutKey, reportGateStatus: 3,
        godownEntryCode: this.queryBar.formModel.godownEntryNo,
        storageCode: this.queryBar.formModel.warehouseNo,
        reportGateType: this.queryBar.formModel.customsFormType,
      }
      this.handleTabPageChange(params)
    },
    handleClear () {
      this.queryBar.formModel = {
        entrustOrderNo: '',
        godownEntryNo: '',
        warehouseNo: '',
        customsFormType: '',
      };
    },
    handleChange () {
      if (this.queryBar.beforehand) {
        this.tabActiveName = 'purchaseorder';
        this.handlerTabClick({ name: this.tabActiveName });
      } else {
        this.tabActiveName = 'godownentry';
        this.handlerTabClick({ name: this.tabActiveName });
      }
    },
    // 循环请求列表
    async mapRequestList (mainCode, val, storeOrg, message) {
      val.length > 1 ? (this.dataTab.length = 0) : this.dataTab.splice(this.dataTab.findIndex(item => item[mainCode] === val[0][mainCode]), 1);
      const { data: { list, count } } = await api.queryGodownbase({ godownEntryCodes: val.map(item => item.godownEntryCode)/* val[0].entrustOrderNo */ }) // 查询委托单的商品明细

      /* let newObj = {
        preCustomsCode: this.form.data.preCustomsCode,
        [mainCode]: val[0][mainCode],
        [storeOrg]: val[0][storeOrg],
      }; */
      list.length > 0 ? this.table.tableData = [...this.table.tableData, ...(list.map(item => { item['trusteeCode'] = item['delegeteBillNo']; return item }))] /* list.map(item => {
        for (let key in item) { // 循环列表的每个对象
          switch (key) {
            case 'entrustOrderNo':
              newObj = { ...newObj, entrustOrderNo: item[key] }
              break;
            case 'attachNo':
              newObj = { ...newObj, attachmentNo: item[key] }
              break;
            case 'arrivalGoodsModel':
              newObj = { ...newObj, specificationType: item[key] }
              break;
            case 'sellerPrice':
              newObj = { ...newObj, price: item[key] }
              break;
            case 'sellerCurrency':
              newObj = { ...newObj, currencyName: item[key] }
              break;
            case 'sellerQuantity':
              newObj = { ...newObj, quantity: item[key] }
              break;
            case 'sellerUnit':
              newObj = { ...newObj, unit: item[key] }
              break;
            case 'controlledGoods':
              newObj = { ...newObj, controled: item[key] }
              break;
            case 'superviseMode':
              newObj = { ...newObj, supervisionMode: item[key] }
              break;
            default:
              newObj = { ...newObj, [key]: item[key] }
              break;
          }
        }
        let flag = false;
        this.table.tableData.map(itemObj => {
          itemObj.entrustOrderNo === newObj.entrustOrderNo && (flag = true)
        })
        !flag && this.table.tableData.unshift(newObj)
      }) */ : this.$message(message);
      this.queryTableData.count = this.dataTab.length;
      this.table.pageCount = this.table.tableData.length;
    },
    // 选中当前行
    handleSelectionChange (val) {
      if (!val.length) return;
      let isBef = !!this.queryBar.beforehand;
      let isExistPCode = val[0]['purchaseOrderNo'];
      (isBef && isExistPCode) && this.mapRequestList('purchaseOrderNo', val, 'supplierCode', '该采购订单没有商品明细');
      (!isBef && isExistPCode) && this.$message('非预申报，不能选取采购订单！');
      (val[0].godownEntryCode) && this.mapRequestList('godownEntryCode', val, 'storeOrg', '该入库单没有商品明细');
      this.utools.setSession('precustomsGodowns', this.table.tableData)
      // 旧代码
      /* if (val.length != 0) {
        if (this.queryBar.beforehand && val[0].purchaseOrderNo) {
          this.mapRequestList('purchaseOrderNo', val, 'supplierCode', '该采购订单没有商品明细')
        } else if (!this.queryBar.beforehand && val[0].purchaseOrderNo) {
          this.$message('非预申报，不能选取采购订单！')
        } else if (val[0].godownEntryCode) {
          this.mapRequestList('godownEntryCode', val, 'storeOrg', '该入库单没有商品明细')
        }
        this.utools.setSession('precustomsGodowns', this.table.tableData)
      } */
    },
    // 保存主表
    async handlePreserve () {
      // 选中数据
      this.form.data.godownEntryCodes = [];
      this.form.data.purchaseOrderNos = [];
      this.table.tableData.map((e, i) => {
        this.form.data.godownEntryCodes.push(e.godownEntryCode);
        this.form.data.purchaseOrderNos.push(e.purchaseOrderNo);
      })
      this.form.data.precustomsGodowns = this.table.tableData;
      this.form.data.precustomsGoods = this.table.tableData;
      if (this.form.data.precustomsGodowns.length == 0) { this.$message.warning('请选择入库单') }
      this.isLoading = true;
      let code = 0;
      try {
        let apiType =
          this.status !== "update" ? "addprecustomsData" : "editprecustomsData";
        this.utools.turnStringBoolean(this.form.data.precustomsGodowns)
        const { status } = await api[apiType](this.form.data);
        this.form.data = { ...this.form.data, status: '1' }
        code = status;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
      this.utools.alertMessage.bind(this)(code);
      this.table.isshow = code === 200 && this.status === "add" ? true : false;
    },
    handleSubmit () {
      this.utools.submitBusinessStatus({
        code: this.form.data.preCustomsCode,
        ctx: this,
        form: this.form
      });
    },
    // 弹窗列表分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper }
      this.handleBtnClick(); //翻页查询
    },
    // 保存弹窗表单
    async handlerTableFormPreservation () {
      if (JSON.stringify(this.formDialog.ruleForm) === "{}") {
        this.utools.alertMessage.bind(this)("", "请输入内容");
        return;
      }
      //       const { status } = await api.changeprecustomsgoodsData(
      //         this.formDialog.ruleForm,
      //         this.tableBtnType == "add" ? "POST" : "PUT"
      //       );
      // 新增修改
      this.tableBtnType == "add" ? this.table.tableData.unshift(this.formDialog.ruleForm)
        : this.table.tableData = this.table.tableData.map(item => item.preCustomsCode === this.formDialog.ruleForm.preCustomsCode ? this.formDialog.ruleForm : item);
      this.utools.alertMessage.bind(this)(200);
      this.formDialog.isshow = false;
      this.form.data.precustomsGodowns = this.table.tableData;
      this.utools.setSession('precustomsGodowns', this.form.data.precustomsGodowns)
      this.initTableData();
    },
    handlebackspacing () {
      this.$router.push({
        path: "/M0605"
      });
    },
    async getprecustomsCode () {
      try {
        const { data } = await api.getprecustomsCode();
        this.form.data.preCustomsCode = data;
      } catch (error) {
        console.log(error);
      }
    },
    initData () {
      api.initSelect(this.form.formConfig);
      api.initSelect(this.queryBar.inputKey);
      const { formData, status } = this.getActivePathData(this.$route.path);
      formData && (this.form.data = formData);
      this.status = status;
      this.handlerTabClick({ name: 'godownentry' })
      const { jumpType, ...params } = this.utools.getSession(this.$route.name);
      jumpType
        ? ((this.status = jumpType),
          this.getprecustomsCode(),
          (this.form.data.orderStatus = '1'),
          (this.form.data.customsStatus = '2'),
          (this.utools.setSession('precustomsGodowns', '')),
          (this.form.data.originOrder = '入库单'))
        : ((this.form.data = params),
          (this.table.isshow = true),
          (this.form.data.precustomsGodowns = this.table.tableData));
      this.initTableData();
    }
  },
  created () {
    this.initData();
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.form.data, status: this.status },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style scoped lang="less">
.form-layout {
  > div {
    flex-basis: 20vw;
    height: 15px;
  }
}
.title {
  display: flex;
  align-items: center;
  > h5 {
    flex: 0.5;
  }
  &::after {
    content: "";
    display: block;
    flex: 9;
    border-bottom: 1px solid #000;
  }
  & {
    margin-top: 1rem;
  }
}
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
