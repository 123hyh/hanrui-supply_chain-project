/**
* 采购订单
 */
<template>
  <div>
    <!-- 操作按钮 -->
    <preserve-btn
      @handlePreserve="handlerPreserve"
      :form='ruleForm'
      @handleRollback="$router.push('M0404')"
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- form框 -->
    <form-component
      :formModel="ruleForm"
      :inputKey="formConfig"
        @handlerFormVerify="handlerFormVerify"
      @handlerFormConfigClickSearch="handlerFormConfigClickSearch"
    ></form-component>
    <div>
      <!-- 页签 -->
      <el-tabs
        v-model="activeName"
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :disabled="tabIsDisabled"
          v-for="item in tabObj"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <!-- 表格的 form 弹窗 -->
      <popover-component
        :popoverType="'form'"
        :isShowPopover="isShowTableDialog"
        :formData="fromDialogData"
        @changeisShowPopover="handlerShowTableDialog"
        @formClickPreservation="tabformClickPreservation"
      ></popover-component>

      <table-component
        :isSubTable='true'
        :tabName="+ruleForm.status<=1 ? activeName:''"
        :itemCode="{ purchaseOrderNo: ruleForm.purchaseOrderNo, entrustOrderNo: ruleForm.entrustOrderNo }"
        :tableData="tableData"
        :tableDataKey="tableDataKey"
        :isShowTabTable="isShowTabTable"
        @handlerTableBtnClick="handlerTableBtnClick"
      ></table-component>
      <pagination-component
        :count="pageCount"
        @handlePageChange="tabRequest"
      ></pagination-component>
    </div>
    <!---统计---->
    <div
      class="handleTableHeight"
      v-if="isShowTabTable && activeName == 'goods'"
    >
      <el-table :data="tj">
        <el-table-column
          prop="sellerQuantityCount"
          label="卖方销售数量"
        ></el-table-column>
        <el-table-column
          prop="sellerGoodsValueCount"
          label="卖方销售货价"
        ></el-table-column>
        <el-table-column
          prop="customTaxAmountCount"
          label="关税税额"
        ></el-table-column>
        <el-table-column
          prop="vatTaxAmountCount"
          label="进口环节增值税税额"
        ></el-table-column>
        <el-table-column
          prop="serviceFeeCount"
          label="服务费"
        ></el-table-column>
        <el-table-column
          prop="buyerGoodsValueCount"
          label="买方采购货值"
        ></el-table-column>
        <el-table-column
          prop="otherTaxAmountCount"
          label="其他税金"
        ></el-table-column>
        <el-table-column
          prop="priceTaxCount"
          label="价税合计"
        ></el-table-column>
        <el-table-column
          prop="netWeightCount"
          label="净重"
        ></el-table-column>
        <el-table-column
          prop="grossWeightCount"
          label="毛重"
        ></el-table-column>
      </el-table>
    </div>

    <popover-component
      :formConfig="dialogData.queryBarConfig"
      :ruleForm="dialogData.ruleForm"
      :itemName="dialogData.itemName"
      :btnObj="dialogData.btnObj"
      :isShowPopover="dialogData.isShowPopover"
      :popoverList="dialogData.popoverList"
      :popoverListKey="dialogData.popoverListKey"
      :count="dialogData.count"
      @changeisShowPopover="handlerShowPopover"
      @handlePageChange="handlerFormConfigClickSearch"
      @handleBtnClickType="handlerFormConfigClickSearch"
      @handlerSubPreservation="handlerDialogPreservation"
    ></popover-component>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import TableComponent from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponent from "@/components/common/Popover.vue";

// 表单配置
import formConfig from "@/domain/formconfig/commerce/PurchaseOrder";
import PurchaseOrderBind from "@/domain/entities/commerce/PurchaseOrder.js";

// tab表格配置
import PurchaseGoodsTableConfig from "@/domain/tableconfig/commerce/PurchaseGoods";
import PurchasePaymentTableConfig from "@/domain/tableconfig/commerce/PurchasePayment";
import PurchaseLogisticsTableConfig from "@/domain/tableconfig/commerce/PurchaseLogistics";
import PurchasePaymentEntrust from "@/domain/tableconfig/commerce/PurchasePaymentEntrust.js";
import PurchaseReceiveTableConfig from "@/domain/tableconfig/commerce/PurchaseReceive";

import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
import { mapMutations, mapGetters } from "vuex";

// 弹窗查询
const btnObj = [{ type: "search", label: "查询" }];

export default {
  name: "PurchaseOrderForm",
  watch: {
    activeName (newVal) {
      this.tableDataKey = this.tableHeaderConfig[newVal];
      this.fromDialogData.formConfig = this.fromDialogConfig[newVal];
      this.tabRequest();
    }
  },
  created () {
    this.initData();
    this.fromDialogData.formConfig = this.fromDialogConfig[this.activeName];
    for (let item of this.formConfig) {
      //  状态不同 委托方按钮显示不同
      switch (item.key) {
        case "entrustOrderNo":
          {
            this.status == "add" ? (item.btn = true) : (item.btn = false);
          }
          break;
        case "statusName":
          break;
      }
    }
  },
  data () {
    return {
      /**
       * @param activeName 页签当前值
       * @param ruleForm  表单输入框集合
       * @param formConfig 表单渲染配置
       * @param tableData 表格数据
       * @param tableDataKey  表格  值的配置
       * @param pageCount 分页总条数
       * @param dialogData  弹窗参数
       */
      status: "",
      isLoading: false,
      activeName: "goods",
      tabIsDisabled: false,
      searchType: "",
      ruleForm: new PurchaseOrderBind(),
      isShowTabTable: true,
      isShowTableDialog: false,
      isShowAddBtn: true,
      formConfig,
      fromDialogData: {
        ruleForm: {},
        formConfig: []
      },
      addGoodsList: [],
      // TODO: 临时数据
      tableData: [],
      tableDataKey: PurchaseGoodsTableConfig,
      pageCount: 0,
      dialogData: {
        queryBarConfig: [
          {
            isInput: true,
            label: "委托订单编号",
            moduleBind: "entrustOrderNo"
          }
        ],
        ruleForm: {},
        itemName: "",
        isShowPopover: false,
        popoverList: [],
        popoverListKey: [],
        count: 0
      },
      // 保存后才启用 页签
      disableTab: true,
      tj: [],

      purchaseGoodsTable: PurchaseGoodsTableConfig,
      purchaseLogisticsTable: PurchaseLogisticsTableConfig,
      purchasePaymentTable: PurchasePaymentTableConfig,
      purchaseReceiveTable: PurchaseReceiveTableConfig,

      purchaseTab: "goods",
      openChooseFirstParty: false,
      firstPartyData: [],
      inputText: "",
      labelWidth: "150px",
      inputStyle: {
        width: "150px"
      },
      verify:'',
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    /**
     * @method tabObj 渲染页签list
     * @method tabAsyncObj  点击页签 对应的请求
     * @method tabTableUpdateAsync  页签弹窗的保存请求
     */
    tabObj: () => [
      { name: "goods", label: "商品信息" },
      { name: "payment", label: "付款信息" },
      { name: "logistics", label: "物流信息" },
      { name: "paymentEntrust", label: "付款委托信息" },
      { name: "receive", label: "收货登记信息" }
    ],
    tabAsyncObj () {
      return {
        goods: (data = {}) =>
          api.getProcurementGoods({
            ...data,
            purchaseOrderNo: this.ruleForm.purchaseOrderNo
          }),
        payment: (data = {}) =>
          api.getProcurementPayment({
            ...data,
            entrustOrderNo: this.ruleForm.entrustOrderNo
          }),
        logistics: (data = {}) =>
          api.getLogistics({
            ...data,
            delegeteBillNo: this.ruleForm.entrustOrderNo
          }) /* 物流信息 */,
        paymentEntrust: (data = {}) =>
          api.getPaymentEntrustMessage({
            ...data,
            delegete: this.ruleForm.entrustOrderNo
          }) /* 付款委托信息 */,
        receive: (data = {}) =>
          api.getReceiveRegisterMessage({
            ...data,
            delegeteBillNo: this.ruleForm.entrustOrderNo
          }) /* 收货登记信息 */
        /* 'add': {
          'goods': ( data = {} ) => api.getEntrustGoods({...data, entrustOrderNo: this.ruleForm.entrustOrderNo}),
        },
        'update': {
          'goods': params => api.getProcurementGoods(params), 
          'payment': params => api.getProcurementPayment(params),
          'logistics': params => api.getPurchaseLogistics(params),
          /* 物流暂缺 */
        /* 付款委托方暂缺 */
        // 'receive': params => api.getReceiveMessage(params)
        // } */
      };
    },
    tabTableUpdateAsync () {
      return {
        goods: data => api.updateProcurementGoods(data)
      };
    },
    tableHeaderConfig: () => ({
      goods: PurchaseGoodsTableConfig,
      payment: PurchasePaymentTableConfig,
      logistics: PurchaseLogisticsTableConfig,
      paymentEntrust: PurchasePaymentEntrust /* 付款委托信息 */,
      receive: PurchaseReceiveTableConfig
    }),
    fromDialogConfig: () => ({
      goods: [
        {
          type: "string",
          key: "quantity",
          name: "订货数量"
        },
        {
          type: "string",
          key: "netWeight",
          name: "净重"
        },
        {
          type: "string",
          key: "brand",
          name: "品牌"
        },
        {
          type: "string",
          key: "sourceArea",
          name: "原产地"
        }
      ]
    }),
    TableDialog () {
      return {
        entrustOrderNo: (data = {}) =>
          api.getProcurementDialog({
            ...this.dialogData.ruleForm,
            ...data,
            withEntrustCustom: true
          }),
        supplierName: (data = {}) =>
          api.querysupplierbaseSearch({ ...this.dialogData.ruleForm, ...data }),
        purchaseUnitName: (data = {}) =>
          api.getDepartment({ ...this.dialogData.ruleForm, ...data }),
        receiveOrganizationName: (data = {}) =>
          api.getCreditCompanyNameData({
            ...this.dialogData.ruleForm,
            ...data
          }),
        storageName: (data = {}) =>
          api.getWarehouseList({ ...this.dialogData.ruleForm, ...data })
      };
    },
    tableDialogConfig () {
      return {
        entrustOrderNo: _ =>
          require("@/domain/tableconfig/commerce/EntrustOrder.js").default,
        supplierName: _ =>
          require("@/domain/tableconfig/basicdata/SupplierBase.js").default,
        purchaseUnitName: _ =>
          require("@/domain/tableconfig/system/Department.js").default,
        receiveOrganizationName: _ =>
          require("@/domain/tableconfig/basicdata/CompanyInfo.js").default,
        storageName: _ =>
          require("@/domain/tableconfig/basicdata/Warehouse.js").default
      };
    },
    setDialogTitleAndQuery: _ => ({
      entrustOrderNo: {
        name: "委托订单",
        queryConfig: [
          { isInput: true, label: "委托订单编码", moduleBind: "entrustOrderNo" }
        ],
        btnObj
      },
      supplierName: {
        name: "供应商",
        queryConfig: [
          { isInput: true, label: "供应商编码", moduleBind: "supplierCode" }
        ],
        btnObj
      },
      purchaseUnitName: {
        name: "部门资料",
        queryConfig: [
          { isInput: true, label: "组织名称", moduleBind: "departmentName" }
        ],
        btnObj
      },
      receiveOrganizationName: {
        name: "公司",
        queryConfig: [
          { isInput: true, label: "公司编码", moduleBind: "companyCode" }
        ],
        btnObj
      },
      storageName: {
        name: "仓库",
        queryConfig: [
          { isInput: true, label: "仓库编码", moduleBind: "warehouseCode" }
        ],
        btnObj
      }
    })
  },
  methods: {
    /**
     * @method handlerFormConfigClickSearch 点击search按钮唤醒弹窗及发送请求
     * @method handlerDialogPaging  弹窗内的分页功能
     * @method handlerShowPopover 关闭弹窗功能
     * @method handleQueryBtnClickType 弹窗的搜索按钮
     * @method handlerDialogPreservation 弹窗点击保存
     * @method tabRequest 页签列表请求
     */
    ...mapMutations(["addbreadCrumbsList"]),
    handlerShowTableDialog () {
      if (!this.isShowTableDialog) return;
      this.isShowTableDialog = !this.isShowTableDialog;
    },
    async handlerPreserve () {
      if (!this.isVerify()) {
        return
      }
      let statusMessage = "";
      this.isLoading = true;
      // 状态为 新增和修改 调用 不一样的 method
      try {
        if (this.status === "add") {
          const {
            data: { list }
          } = await api.getEntrustGoods({
            entrustOrderNo: this.ruleForm.entrustOrderNo
          });
          this.addGoodsList = list;
          const { data, status } = await api.addPurchaseOrder({
            purchaseOrder: this.ruleForm,
            purchaseGoods: this.addGoodsList
          });
          this.ruleForm = { ...this.ruleForm, status: data.status || '1' }
          this.tabRequest(), // 激活页签及显示表格
            (this.tabIsDisabled = false);
          this.isShowTabTable = true;
          statusMessage = status;
        } else {
          const { data, status } = await api.updatePurchaseOrder(this.ruleForm);
          statusMessage = status;
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
      utools.alertMessage.bind(this)(statusMessage);
      this.status == "add" &&
        statusMessage == 200 &&
        (this.isShowAddBtn = false);
    },
    async handlerFormConfigClickSearch (params) {
      if (params !== "search" && !(params instanceof Object)) {
        /* 防止点击查询 */
        this.searchType = params;
        this.dialogData.ruleForm = {};
      }
      const WHITE_LIST = ['supplierName', 'purchaseUnitName', 'receiveOrganizationName', 'storageName']
      try {
        const {
          data: { list, count }
        } = await this.TableDialog[this.searchType](
          params instanceof Object ? params : { status: WHITE_LIST.includes(this.searchType) ? '2' : '' }
        );
        list.forEach(e => {
          if (e.status == 1) {
            e.status = "新增";
          } else if (e.status == 10) {
            e.status = "提交";
          } else {
            e.status == "审核";
          }
        });
        const {
          name: itemName,
          queryConfig: queryBarConfig,
          btnObj
        } = this.setDialogTitleAndQuery[this.searchType];
        this.dialogData = {
          ...this.dialogData,
          popoverList: list,
          count,
          itemName,
          queryBarConfig,
          btnObj,
          popoverListKey: this.tableDialogConfig[this.searchType]()
        };
        !this.dialogData.isShowPopover &&
          (this.dialogData.isShowPopover = true);
      } catch (error) {
        console.log(error);
      }
    },

    async getDialogData (data = {}) {
      try {
        const {
          data: { list, count }
        } = await api.getProcurementDialog({
          ...data,
          ...this.dialogData.ruleForm
        });
        let dialog = this.dialogData;
        dialog.popoverList = list;
        dialog.count = count;
        !dialog.isShowPopover && (dialog.isShowPopover = true);
      } catch (error) {
        console.log(error);
      }
    },

    handlerDialogPaging (data) {
      this.getDialogData({ ...data, ...this.dialogData.ruleForm });
    },

    handlerShowPopover () {
      this.dialogData.isShowPopover = !this.dialogData.isShowPopover;
    },

    handleQueryBtnClickType (type) {
      let ruleForm = this.dialogData.ruleForm;
      !ruleForm.entrustOrderNo && (ruleForm = {});
      this.getDialogData();
    },

    async handlerDialogPreservation (rowData) {
      /**
       *
       * @variation signDate 业务日期
       * @variation bizType 业务类型
       * @variation settlementMode 结算方式
       * @variation trusteeReceivableMode 受托方收款方式
       * @variation contractNo 客户合同号
       * @variation sourceBillType 源单据类型
       * @variation sellerCurrency 卖方销售币别
       * @variation buyerCurrency 买方采购币别
       * @variation customerOrderNo 客户订单号
       * @variation apGoodsAmountSum  委托单应付货款
       * @variation orderAmount 本次订货金额
       * @variation currency 币别
       * @variation payMode 付款方式
       * @variation customerName 客户名称
       * @variation customerCode 客户编码
       * @variation clientCode 委托方编码
       * @variation clientName 委托方名称
       * @variation currencyName币别
       * @variation dealMode 成交方式 编码
       * @variation dealModeName 成交方式 名称
       * @variation reportGateType 报关类型 编码
       * @variation reportGateTypeName 报关类型 名称
       * @variation chargeMode 计价方式 编码
       * @variation chargeModeName 计价方式 名称
       * @variation tradeMode 贸易方式 编码
       * @variation tradeModeName 贸易方式 名称
       * @variation salesmanName 接单人
       * @variation followPersonName 接单人
       * @variation followPersonId 接单人 id
       * @variation purchaseUnitName 财务组织 名称
       * @variation purchaseUnitCode 财务组织 编码
       *
       */
      if (this.searchType === "entrustOrderNo") {
        const {
          entrustOrderNo,
          signDate: bizDate,
          bizType,
          bizTypeName,
          receivableMethod: trusteeReceivableMode,
          receivableMethodName: trusteeReceivableModeName,
          contractNo,
          entrustOrderType: sourceBillType,
          entrustOrderTypeName: sourceBillTypeName,
          currency: sellerCurrency,
          currencyName: sellerCurrencyName,
          currency: buyerCurrency,
          currencyName: buyerCurrencyName,
          clientOrderNo: customerOrderNo,
          trusteePayGoodsAmount: apGoodsAmountSum,
          goodsValue: orderAmount,
          supplierCurrency: currency,
          supplierPayMode: payMode,
          supplierPayModeName: payModeName,
          customerName,
          customerCode,
          clientName,
          clientCode,
          supplierCurrencyName: currencyName,
          dealMode,
          dealModeName,
          reportGateType,
          reportGateTypeName,
          chargeMode,
          chargeModeName,
          tradeMode,
          tradeModeName,
          salesmanName,
          followPersonName,
          followPersonId,
          purchaseUnitName,
          purchaseUnitCode
        } = rowData;
        api
          .searchclientfinanceData({ clientNo: rowData.clientCode || "" })
          .then(
            ({
              data: {
                list: [{ settlementMode, settlementModeName }]
              }
            }) => {
              this.ruleForm = {
                ...this.ruleForm,
                settlementModeName,
                settlementMode,
                entrustOrderNo,
                bizDate,
                bizType,
                bizTypeName,
                trusteeReceivableMode,
                trusteeReceivableModeName,
                contractNo,
                sourceBillType,
                sourceBillTypeName,
                buyerCurrency,
                customerOrderNo,
                apGoodsAmountSum,
                orderAmount,
                currency,
                buyerCurrencyName,
                payMode,
                payModeName,
                sellerCurrency,
                sellerCurrencyName,
                customerName,
                customerCode,
                clientName,
                clientCode,
                currency,
                currencyName,
                dealMode,
                dealModeName,
                reportGateType,
                reportGateTypeName,
                chargeMode,
                chargeModeName,
                tradeMode,
                tradeModeName,
                salesmanName,
                followPersonName,
                followPersonId,
                purchaseUnitName,
                purchaseUnitCode
              };
            }
          )
          .catch(err => {
            console.log(err);
          });
      }
      rowData.supplierCode &&
        (this.ruleForm = {
          ...this.ruleForm,
          supplierCode: rowData.supplierCode,
          supplierName: rowData.supplierName
        });
      rowData.companyCode &&
        (this.ruleForm = {
          ...this.ruleForm,
          receiveOrganizationName: rowData.companyName,
          receiveOrganizationCode: rowData.companyCode
        });
      rowData.warehouseCode &&
        (this.ruleForm = {
          ...this.ruleForm,
          storageName: rowData.warehouseName,
          storageCode: rowData.warehouseCode
        });
      // 采购组织
      rowData.departmentCode &&
        (this.ruleForm = {
          ...this.ruleForm,
          purchaseUnitName: rowData.departmentName,
          purchaseUnitCode: rowData.departmentCode
        });
    },

    async tabRequest (params = {}) {
      (this.tableData = []), (this.count = 0);
      try {
        if (!this.ruleForm.purchaseOrderNo) return;
        const {
          data: { list, count }
        } = await this.tabAsyncObj[this.activeName]({ ...params });
        (this.tableData = list), (this.pageCount = count);
        this.handleClick()
      } catch (error) {
        console.log(error);
      }
    },
    handleClick () {
      if (this.activeName == 'goods') {
        this.cxtj()
      }
    },
    async cxtj () {
      if (!this.ruleForm.entrustOrderNo) return;
      let val = await api.querySearch(
        "/entrustgoods",
        { entrustOrderNo: this.ruleForm.entrustOrderNo }
      );
      if (!val.data.list.length > 0) {
        return;
      }
      // // 计算
      // //卖方销售总货值
      // this.entrustOrder.goodsValue = val.data.sellerGoodsValueCount;
      // // 增值税合计
      // this.entrustOrder.vatTotalAmount = val.data.vatTaxAmountCount;
      // // 服务费总和
      // this.entrustOrder.totalServiceCharge = val.data.serviceFeeCount;
      // // 关税合计
      // this.entrustOrder.customTotalAmount = val.data.customTaxAmountCount;
      // // 受托方应付货款总额
      // this.entrustOrder.trusteePayGoodsAmount = val.data.sellerGoodsValueCount;
      // // 预计应收总额
      // this.entrustOrder.advanceAmount =
      //   this.entrustOrder.goodsValue +
      //   val.data.otherTaxAmountCount +
      //   val.data.serviceFeeCount;
      let tisj = {
        sellerQuantityCount: val.data.sellerQuantityCount,
        sellerGoodsValueCount: val.data.sellerGoodsValueCount,
        customTaxAmountCount: val.data.customTaxAmountCount,
        vatTaxAmountCount: val.data.vatTaxAmountCount,
        serviceFeeCount: val.data.serviceFeeCount,
        buyerGoodsValueCount: val.data.buyerGoodsValueCount,
        otherTaxAmountCount: val.data.otherTaxAmountCount,
        priceTaxCount: val.data.priceTaxCount,
        netWeightCount: val.data.netWeightCount,
        grossWeightCount: val.data.grossWeightCount
      };
      this.tj = [];
      this.tj.push(tisj);
    },
    handlerTableBtnClick (type, clickRow) {
      this.fromDialogData.ruleForm = clickRow;
      this.isShowTableDialog = true;
    },

    initData () {
      const { formData, status } = this.getActivePathData(this.$route.path);
      this.status = status;
      status === "update"
        ? ((this.ruleForm = formData), this.tabRequest()) // 进来修改时默认加载页签表格
        : formData
          ? (this.ruleForm = formData)
          : this.initFormConfig();
    },
    async initFormConfig () {
      // 新增时获取采购订单编号
      this.tabIsDisabled = true;
      this.isShowTabTable = false;
      try {
        const { data } = await api.getPurchaseOrderNo();
        this.ruleForm.purchaseOrderNo = data;
      } catch (error) {
        console.log(error);
      }
    },
    async tabformClickPreservation () {
      let messageStatus = "";
      try {
        const { data, status } = await this.tabTableUpdateAsync[
          this.activeName
        ](this.fromDialogData.ruleForm);
        messageStatus = status;
      } catch (error) {
        console.log(error);
      }
      utools.alertMessage.bind(this)(messageStatus);
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
  },

  components: {
    FormComponent,
    TableComponent,
    PaginationComponent,
    PopoverComponent
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.ruleForm, status: this.status },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.form-layout {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 21vw;
    height: 15px;
  }
}
</style>
