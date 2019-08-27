<template>
  <div class="EntrustOrderForm">
    <!-- 操作按钮 -->
    <preserve-btn
      :billsStatus="entrustOrder.statusName"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      @handleSubmit="handleSubmit"
      :isLoading="isLoading"
    ></preserve-btn>
    <span class="typetitle">{{typetitle}}</span>
    <!-- 表单 -->
    <div :key="i" v-for="(item,i) in entrustOrderKey">
      <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
      <form-config
        ref="formC"
        :formModel="entrustOrder"
        :inputKey="item.list"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config>
    </div>
    <!-- 子表与统计 -->
    <el-tabs
      v-model="dataTab.tabActiveName"
      type="border-card"
      @tab-click="handlerTabClick"
      style="margin-top: 30px;"
      class="tabs-defined"
    >
      <el-tab-pane label="商品信息" name="goods" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10">
          <el-button type="primary" @click="openTabForm('create')">新增</el-button>
          <el-button type="primary" @click="openTabForm('update')">修改</el-button>
          <el-button type="danger" @click="openTabForm('delete')">删除</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报关信息" name="custom" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10">
          <el-button type="primary" @click="saveCostom">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="buyer" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="卖方交货信息" name="seller" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="受托方收款" name="trusteereceipt" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="受托方付款" name="trusteepanyment" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10">
          <el-button type="primary" @click="openTabForm('create')">新增</el-button>
          <el-button type="primary" @click="openTabForm('update')">修改</el-button>
          <el-button type="danger" @click="openTabForm('delete')">删除</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收货信息" name="receive" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="转款信息" name="transfer" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="付款信息" name="panyment" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="收货与报关明细" name="detail" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <!-- 表格 -->
      <div class="handleTableHeight" v-if="dataTab.tabActiveName != 'custom'">
        <el-table
          :data="dataTab.tableData"
          border
          highlight-current-row
          @row-click="clickTabRow"
          ref="moviesTable"
        >
          <el-table-column
            v-for="item in dataTab.columnDataTable"
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
        </el-table>
        <pagination @handlePageChange="handleTabPageChange" :count="dataTab.count"></pagination>
      </div>
    <!-- 表单 -->
    <div v-else :key="i" v-for="(item,i) in entrustCustomKey">
      <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
      <form-config
        ref="customtable"
        :formModel="entrustCustom"
        :inputKey="item.list"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config>
    </div>
      <!-- 表单 -->
      <!-- <form-config
        v-else
        ref="customtable"
        :formModel="entrustCustom"
        :inputKey="entrustCustomKey"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config> -->
      <!---统计表---->
      <div class="handleTableHeight" v-if="dataTab.tabActiveName=='goods'">
        <el-table :data="dataTab.tj">
          <el-table-column prop="sellerQuantityCount" label="卖方销售数量"></el-table-column>
          <el-table-column prop="sellerGoodsValueCount" label="卖方销售货价"></el-table-column>
          <el-table-column prop="customTaxAmountCount" label="关税税额"></el-table-column>
          <el-table-column prop="vatTaxAmountCount" label="进口环节增值税税额"></el-table-column>
          <el-table-column prop="serviceFeeCount" label="服务费"></el-table-column>
          <el-table-column prop="buyerGoodsValueCount" label="买方采购货值"></el-table-column>
          <el-table-column prop="otherTaxAmountCount" label="其他税金"></el-table-column>
          <el-table-column prop="priceTaxCount" label="价税合计"></el-table-column>
          <el-table-column prop="netWeightCount" label="净重"></el-table-column>
          <el-table-column prop="grossWeightCount" label="毛重"></el-table-column>
        </el-table>
      </div>
    </el-tabs>
    <!-- 统计表单 -->
    <div class="clientFooter">
      <legend style="margin: 20px 0 20px 600px;"></legend>
      <form-config
        :formModel="entrustOrder"
        :inputKey="entrustOrderKey7"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config>
    </div>
    <!-- 子表商品信息,受托方付款表单-->
    <el-dialog
      v-if="dataTab.tabActiveName == 'goods'"
      v-dialogDrag
      :title="formPopover.itemName"
      :visible.sync="formPopover.isShowPopover"
      @close.native="rouseFormPopover"
      :width="formPopover.width"
      close-on-press-escape
      :before-close="rouseFormPopover"
    >
      <div :key="i" v-for="(item,i) in formPopover.formData.formConfig">
        <form-module-head :title="item.title" v-show="item.showline"></form-module-head>
        <form-config
          ref="formD"
          :formModel="formPopover.formData.ruleForm"
          :inputKey="item.list"
          @handlerFormConfigClickSearch="rousePopover"
          @handlerFormVerify="handlerFormVerify"
        ></form-config>
      </div>
      <div class="btn-right">
        <el-button @click.stop="saveTabForm">确定</el-button>
        <el-button @click.stop="rouseFormPopover">取消</el-button>
      </div>
    </el-dialog>
    <popover
      v-else
      ref="formD"
      :isShowPopover="formPopover.isShowPopover"
      :popoverType="formPopover.popoverType"
      :itemName="formPopover.itemName"
      :formData="formPopover.formData"
      :width="formPopover.width"
      @handlerFormConfigClickSearch="rousePopover"
      @changeisShowPopover="rouseFormPopover"
      @formClickPreservation="saveTabForm"
    ></popover>
    <!-- 点选 -->
    <popover
      :isShowPopover="popover.isShowPopover"
      :popoverType="popover.popoverType"
      :currencySelectInputKey="popover.currencySelectInputKey"
      :formConfig="popover.queryBarObj"
      :popoverListKey="popover.popoverListKey"
      :popoverList="popover.popoverList"
      :ruleForm="popover.ruleForm"
      :count="popover.count"
      :btnObj="popover.btnObj"
      :itemName="popover.itemName"
      @handleBtnClickType="handleBtnClick"
      @changeisShowPopover="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="handlePageChange"
    ></popover>
  </div>
</template>
<script>
// 引入公共的table组件
import FormComponent from "@/components/common/FormConfig.vue";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import Popover from "@/components/common/Popover";
import Pagination from "@/components/common/Pagination";
import FormConfig from "@/components/common/FormConfig";
import api from "@/assets/js/appHelper";
import { mapMutations, mapGetters } from "vuex";
// 主表
import EntrustOrder from "@/domain/entities/commerce/EntrustOrder";
import EntrustOrderFormConfig from "@/domain/formconfig/commerce/EntrustOrder/EntrustOrderList";
import EntrustOrderFormConfig7 from "@/domain/formconfig/commerce/EntrustOrder/EntrustOrder.7";
// 报关信息栏
import entrustCustom from "@/domain/entities/commerce/EntrustCustom";
import entrustCustomKey from "@/domain/formconfig/commerce/EntrustCustom";

let ColumnData = "";
export default {
  components: {
    FormComponent,
    formModuleHead,
    Popover,
    Pagination,
    FormConfig
  },
  data() {
    return {
      entrustOrder: new EntrustOrder(), // 主表实体
      entrustOrderKey: EntrustOrderFormConfig, // 配置
      entrustOrderKey7: EntrustOrderFormConfig7, // 配置
      //子表
      dataTab: {
        columnDataTable: [], //子表表格配置
        tableData: [],
        // 保存后才启用 tab
        tabIsDisabled: true,
        tabActiveName: "",
        // 查询条件 form
        count: 0,
        queryTableData: {},
        tj: []
      },
      isLoading: false,
      //子表
      formPopover: {
        itemName: "", // 弹窗标题
        width: "58%",
        isShowPopover: false, // 弹窗显示
        popoverType: "form", // 弹出框
        formData: {
          ruleForm: {}, //子表实体
          formConfig: [] //子表表单配置
        }
      },
      entrustCustom: new entrustCustom(), // 报关实体
      entrustCustomKey, //配置
      // 点选
      popover: {
        //弹出框组件参数
        isShowPopover: false, // 弹窗显示
        popoverType: "table", // 弹出框
        currencySelectInputKey: "", //弹出框选中对应的key值
        queryBarObj: [], // 弹出框查询栏
        popoverListKey: [], // 弹出框表头绑定的 key
        popoverList: [], // 表格数据
        count: 0, // 分页数据总条数
        ruleForm: {}, // 查询栏的model绑定
        curPopStorage: {}, // 当前弹窗传递的数据
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        itemName: "" // 弹窗标题
      },
      sellist: [], //所有业务类型下拉项
      verify: "",
      curRowData: "",
      iswtf: false,
      isxymc: false,
      isrollback: false, // 是否在回滚字段值
      isCheckRoll: false
      // TipsdialogVisible: false
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    //===================计算 主表
    // 委托订单类型
    entrustOrderType() {
      return this.entrustOrder.entrustOrderType;
    },
    // 种类
    serviceCharge() {
      return this.entrustOrder.serviceCharge;
    },
    // 业务类型
    bizType() {
      return this.entrustOrder.bizType;
    },
    // 前部分标题
    entrustOrderTypeName() {
      if (
        this.entrustOrderType &&
        this.utools.getFromconfigObj(this.entrustOrderKey, "entrustOrderType")[
          "selectOption"
        ]
      ) {
        return this.utools.gecongfig(
          this.entrustOrderKey,
          "entrustOrderType",
          this.entrustOrder.entrustOrderType
        );
      }
    },
    // 标题
    typetitle() {
      if (this.entrustOrderType && this.bizType) {
        if (this.entrustOrder.bizType) {
          if (this.entrustOrderType == 1 || this.entrustOrderType == 2) {
            if (this.bizType == 1 || this.bizType == 3) {
              return this.entrustOrderTypeName + "(单抬头)";
            } else {
              return this.entrustOrderTypeName + "(双抬头)";
            }
          } else {
            return this.entrustOrderTypeName;
          }
        }
      }
    },
    // 报关类型
    reportGateType() {
      if (this.entrustOrderType) {
        if (this.entrustOrderType == "1") {
          return "1";
        }
        if (this.entrustOrderType == "2") {
          return "2";
        }
        if (this.entrustOrderType == "3") {
          return "3";
        }
        if (this.entrustOrderType == "4") {
          return "4";
        }
      }
    },
    // 销售币别
    supplierCurrency() {
      return this.entrustOrder.supplierCurrency;
    },
    // 贸易方式
    tradeMode() {
      return this.entrustOrder.tradeMode;
    },
    // 成交方式
    dealMode() {
      return this.entrustOrder.dealMode;
    },

    //===================计算 子表
    // 卖方单价
    sellerPrice() {
      return this.formPopover.formData.ruleForm.sellerPrice || "";
    },
    // 卖方数量
    sellerQuantity() {
      return this.formPopover.formData.ruleForm.sellerQuantity || "";
    },
    // 货价（货值）
    sellerGoodsValue() {
      return (this.formPopover.formData.ruleForm.sellerGoodsValue =
        this.sellerPrice * this.sellerQuantity || "");
    },
    // 运费费率%
    freightRate() {
      return this.formPopover.formData.ruleForm.freightRate / 100 || "";
    },
    // 计算 运费
    freight() {
      return this.sellerGoodsValue * this.freightRate || "";
    },
    // 保费费率%
    premiumRate() {
      return this.formPopover.formData.ruleForm.premiumRate / 100 || "";
    },
    // 计算 保费
    premium() {
      return (this.sellerGoodsValue + this.freight) * this.premiumRate || "";
    },
    // 杂费费率%
    extrasRate() {
      return this.formPopover.formData.ruleForm.extrasRate / 100 || "";
    },
    // 计算 杂费
    extras() {
      return this.sellerGoodsValue * this.extrasRate || "";
    },
    // 运保杂费额
    costAmount() {
      return (this.formPopover.formData.ruleForm.costAmount =
        Math.round(
          ((this.freight || 0) + (this.premium || 0) + (this.extras || 0)) *
            10000
        ) / 10000 || "");
    },
    // 完税价格
    dutyPaidPrice() {
      if (this.entrustOrderType && this.dealMode) {
        if (this.entrustOrderType == "1") {
          if (
            this.dealMode == "1" ||
            this.dealMode == "2" ||
            this.dealMode == "3" ||
            this.dealMode == "4"
          ) {
            return (
              Math.round(
                ((this.sellerGoodsValue || 0) +
                  (this.freight || 0) +
                  (this.premium || 0) +
                  (this.extras || 0)) *
                  this.customsExchangeRate *
                  10000
              ) / 10000 || ""
            );
          } else {
            return (
              Math.round(
                this.sellerGoodsValue * this.customsExchangeRate * 10000
              ) / 10000 || ""
            );
          }
        }
        if (this.entrustOrderType == "2") {
          if (
            this.dealMode == "1" ||
            this.dealMode == "2" ||
            this.dealMode == "3" ||
            this.dealMode == "4"
          ) {
            return (
              Math.round(
                ((this.sellerGoodsValue || 0) -
                  (this.freight || 0) -
                  (this.premium || 0) -
                  (this.extras || 0)) *
                  this.customsExchangeRate *
                  10000
              ) / 10000 || ""
            );
          } else {
            return (
              Math.round(
                this.sellerGoodsValue * this.customsExchangeRate * 10000
              ) / 10000 || ""
            );
          }
        }
      } else {
        return "";
      }
    },
    // 关税税率
    customTaxRate() {
      return this.formPopover.formData.ruleForm.customTaxRate / 100 || "";
    },
    // 关税税额
    customTaxAmount() {
      return (this.formPopover.formData.ruleForm.customTaxAmount =
        Math.round(this.sellerGoodsValue * this.customTaxRate * 10000) /
          10000 || "");
    },
    // 服务费汇率
    serviceExchangeRate() {
      return this.formPopover.formData.ruleForm.serviceExchangeRate / 100 || "";
    },
    // 服务费
    serviceFee() {
      return (this.formPopover.formData.ruleForm.serviceFee =
        Math.round(this.sellerGoodsValue * this.serviceExchangeRate * 10000) /
          10000 || "");
    },
    // 买方货款汇率
    buyerExchangeRate() {
      return this.formPopover.formData.ruleForm.buyerExchangeRate / 100 || "";
    },
    // 买方单价
    buyerPrice() {
      return this.formPopover.formData.ruleForm.buyerPrice;
    },
    // 买方货值
    buyerGoodsValue() {
      return (this.formPopover.formData.ruleForm.buyerGoodsValue =
        Math.round(
          this.sellerQuantity * this.buyerPrice * this.buyerExchangeRate * 10000
        ) / 10000 || "");
    },
    // 其他税率
    otherTaxRate() {
      return this.formPopover.formData.ruleForm.otherTaxRate / 100 || "";
    },
    // 其他税金
    otherTaxAmount() {
      return (this.formPopover.formData.ruleForm.otherTaxAmount =
        Math.round(this.sellerGoodsValue * this.otherTaxRate * 10000) / 10000 ||
        "");
    },
    // 价税合计
    priceTax() {
      return (
        (this.sellerGoodsValue || 0) +
          (this.customTaxAmount || 0) +
          (this.vatTaxAmount || 0) +
          (this.otherTaxAmount || 0) || "");
    },
    // 海关税率
    customsExchangeRate() {
      return this.formPopover.formData.ruleForm.customsExchangeRate / 100 || "";
    },
    // 关税加征
    increaseTaxRate() {
      return this.formPopover.formData.ruleForm.increaseTaxRate / 100 || "";
    },
    // 关税（若有加征）
    tariff() {
      return (
        Math.round(
          ((this.dutyPaidPrice || 0) + (this.increaseTaxRate || 0)) *
            this.customTaxRate *
            10000
        ) / 10000 || ""
      );
    },
    // 消费税率
    consumptionTaxRate() {
      return this.formPopover.formData.ruleForm.consumptionTaxRate / 100 || "";
    },
    // 消费税额 (完税价格+关税）/(1-消费税率)*消费税率
    exciseTax() {
      return (this.formPopover.formData.ruleForm.exciseTax =
        Math.round(
          (((this.dutyPaidPrice || 0) + (this.tariff || 0)) /
            (1 - (this.consumptionTaxRate || 0))) *
            this.consumptionTaxRate *
            10000
        ) / 10000 || "");
    },
    // 进口增值税率
    vatTaxRate() {
      return this.formPopover.formData.ruleForm.vatTaxRate / 100 || "";
    },
    // 进口增值税额
    vatTaxAmount() {
      return (this.formPopover.formData.ruleForm.vatTaxAmount =
        Math.round(
          ((this.dutyPaidPrice || 0) +
            (this.tariff || 0) +
            (this.exciseTax || 0)) *
            this.vatTaxRate *
            10000
        ) / 10000 || "");
    },
    // 出口退税率
    drawbackrate() {
      return this.formPopover.formData.ruleForm.drawbackrate / 100 || "";
    },
    // 出口退税额
    drawback() {
      if (this.dutyPaidPrice && this.drawbackrate) {
        return (this.formPopover.formData.ruleForm.drawback =
          Math.round(this.dutyPaidPrice * this.drawbackrate * 10000) / 10000 ||
          "");
      }
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    rousePopover(key) {
      this.popover.popoverList = [];
      if (key == "trusteeName" || key == "settlementUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "受托方";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "companyCode", name: "公司编码" },
          { key: "companyName", name: "名称" },
          { key: "national", name: "国家" },
          { key: "province", name: "省" },
          { key: "city", name: "市" },
          { key: "district", name: "区县" }
        ];
      } else if (key == "purchaseUnitName") {
        this.popover.queryBarObj = [
          { label: "部门编码", moduleBind: "departmentCode", isInput: true }
        ];
        this.popover.apiKey = "/department";
        this.popover.itemName = "采购组织";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "departmentCode", name: "部门编码" },
          { key: "departmentName", name: "部门名称" },
          { key: "parentDepartment", name: "上级部门" },
          { key: "remark", name: "部门说明" }
        ];
      } else if (key == "clientName") {
        this.popover.queryBarObj = [
          { label: "委托方编号", moduleBind: "clientNo", isInput: true }
        ];
        this.popover.apiKey = "/client";
        this.popover.itemName = "委托方";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "clientNo", name: "委托方编号" },
          { key: "clientName", name: "委托方名称" },
          { key: "tel", name: "电话" },
          { key: "billStatus", name: "单据状态" },
          { key: "clientLevel", name: "委托方等级" }
        ];
      } else if (key == "clientContactName") {
        if (!this.entrustOrder.clientCode) {
          this.$message.warning("请选择委托方");
          return;
        }
        this.popover.queryBarObj = [
          { label: "联系人编号", moduleBind: "clientNo", isInput: true }
        ];
        this.popover.apiKey = "/clientcontact";
        this.popover.ruleForm.clientNo = this.entrustOrder.clientCode;
        this.popover.itemName = "联系人";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "clientNo", name: "委托方编号" },
          { key: "leader", name: "负责人" },
          { key: "duty", name: "职务" },
          { key: "tel", name: "电话" },
          { key: "phone", name: "手机" },
          { key: "email", name: "Email" }
        ];
      } else if (key == "supplierName") {
        this.popover.queryBarObj = [
          { label: "供应商编码", moduleBind: "supplierCode", isInput: true }
        ];
        this.popover.apiKey = "/supplierbase";
        this.popover.itemName = "供应商";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "supplierCode", name: "供应商编码" },
          { key: "supplierName", name: "供应商中文名称" },
          { key: "creditLevel", name: "信用等级" },
          { key: "withinSupplier", name: "内部供应商" },
          { key: "hasChecked", name: "已审核" },
          { key: "supplierAbb", name: "供应商简称" }
        ];
      } else if (key == "supplierContactName") {
        if (!this.entrustOrder.supplierCode) {
          this.$message.warning("请选择供应商");
          return;
        }
        this.popover.queryBarObj = [
          { label: "联系人编号", moduleBind: "clientNo", isInput: true }
        ];
        this.popover.apiKey = "/suppliercontact";
        this.popover.ruleForm.supplierCode = this.entrustOrder.supplierCode;
        this.popover.itemName = "联系人";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "supplierCode", name: "委托方编号" },
          { key: "contact", name: "联系人" },
          { key: "tel", name: "办公电话" },
          { key: "duty", name: "职务" },
          { key: "phone", name: "phone" },
          { key: "email", name: "Email" }
        ];
      } else if (key == "agreementName") {
        this.popover.queryBarObj = [
          { label: "协议编号", moduleBind: "agreementNo", isInput: true }
        ];
        this.popover.apiKey = "/agreement";
        this.popover.itemName = "协议名称";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "agreementNo", name: "协议编号" },
          { key: "agreementName", name: "协议名称" },
          { key: "contractType", name: "签约类型" },
          { key: "status", name: "状态" },
          { key: "customerName", name: "委托方名称" },
          { key: "customerCode", name: "委托方编码" }
        ];
      } else if (key == "agreementSolutionName") {
        if (!this.entrustOrder.agreementName) {
          this.$message.warning("请选择协议名称");
          return;
        }
        if (!this.isxymc) {
          this.$message.warning("请重新选择协议名称");
          return;
        }
        this.popover.queryBarObj = [
          { label: "方案编号", moduleBind: "solutionNo", isInput: true }
        ];
        this.popover.apiKey = "/agreementsolution";
        this.popover.ruleForm.agreementNo = this.popover.curPopStorage.agreementNo;
        this.popover.itemName = "协议方案";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "solutionNo", name: "方案编号" },
          { key: "solutionName", name: "方案名称" },
          { key: "agreementNo", name: "协议编号" },
          { key: "customType", name: "报关类型" },
          { key: "entrustType", name: "业务类型" },
          { key: "tradeType", name: "贸易类型" }
        ];
      } else if (key == "businessUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "公司列表";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "companyCode", name: "公司编码" },
          { key: "companyName", name: "名称" },
          { key: "national", name: "国家" },
          { key: "province", name: "省" },
          { key: "city", name: "市" },
          { key: "district", name: "区县" }
        ];
      } else if (key == "sellerName") {
        if (this.entrustCustom.sellerType) {
          switch (this.entrustCustom.sellerType) {
            case "1":
              this.popover.queryBarObj = [
                { label: "公司名称", moduleBind: "companyName", isInput: true }
              ];
              this.popover.apiKey = "/companyinfo";
              this.popover.itemName = "公司列表";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "companyCode", name: "公司编码" },
                { key: "companyName", name: "名称" },
                { key: "national", name: "国家" },
                { key: "province", name: "省" },
                { key: "city", name: "市" },
                { key: "district", name: "区县" }
              ];
              break;
            case "2":
              this.popover.queryBarObj = [
                { label: "委托方编号", moduleBind: "clientNo", isInput: true }
              ];
              this.popover.apiKey = "/client";
              this.popover.itemName = "委托方";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "clientNo", name: "委托方编号" },
                { key: "clientName", name: "委托方名称" },
                { key: "tel", name: "电话" },
                { key: "billStatus", name: "单据状态" },
                { key: "clientLevel", name: "委托方等级" }
              ];
              break;
            case "3":
              this.popover.queryBarObj = [
                { label: "客户名称", moduleBind: "customerName", isInput: true }
              ];
              this.popover.apiKey = "/customer";
              this.popover.itemName = "客户列表";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "customerNo", name: "客户编码" },
                { key: "customerName", name: "客户名称" },
                { key: "internalCustomer", name: "是否内部客户" },
                { key: "shortName", name: "客户简称" },
                { key: "parentCustomerName", name: "客户" },
                { key: "customerNature", name: "客户性质" }
              ];
              break;
            default:
              this.popover.queryBarObj = [
                {
                  label: "供应商编码",
                  moduleBind: "supplierCode",
                  isInput: true
                }
              ];
              this.popover.apiKey = "/supplierbase";
              this.popover.itemName = "供应商";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "supplierCode", name: "供应商编码" },
                { key: "supplierName", name: "供应商中文名称" },
                { key: "creditLevel", name: "信用等级" },
                { key: "withinSupplier", name: "内部供应商" },
                { key: "hasChecked", name: "已审核" },
                { key: "supplierAbb", name: "供应商简称" }
              ];
              break;
          }
        } else {
          this.$message.warning("请选择报关卖方类型");
          return;
        }
      } else if (key == "receiveUnitName") {
        if (this.entrustCustom.receiveUnitType) {
          switch (this.entrustCustom.receiveUnitType) {
            case "1":
              this.popover.queryBarObj = [
                { label: "公司名称", moduleBind: "companyName", isInput: true }
              ];
              this.popover.apiKey = "/companyinfo";
              this.popover.itemName = "公司列表";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "companyCode", name: "公司编码" },
                { key: "companyName", name: "名称" },
                { key: "national", name: "国家" },
                { key: "province", name: "省" },
                { key: "city", name: "市" },
                { key: "district", name: "区县" }
              ];
              break;
            case "2":
              this.popover.queryBarObj = [
                { label: "委托方编号", moduleBind: "clientNo", isInput: true }
              ];
              this.popover.apiKey = "/client";
              this.popover.itemName = "委托方";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "clientNo", name: "委托方编号" },
                { key: "clientName", name: "委托方名称" },
                { key: "tel", name: "电话" },
                { key: "billStatus", name: "单据状态" },
                { key: "clientLevel", name: "委托方等级" }
              ];
              break;
            case "3":
              this.popover.queryBarObj = [
                { label: "客户名称", moduleBind: "customerName", isInput: true }
              ];
              this.popover.apiKey = "/customer";
              this.popover.itemName = "客户列表";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "customerNo", name: "客户编码" },
                { key: "customerName", name: "客户名称" },
                { key: "internalCustomer", name: "是否内部客户" },
                { key: "shortName", name: "客户简称" },
                { key: "parentCustomerName", name: "客户" },
                { key: "customerNature", name: "客户性质" }
              ];
              break;
            default:
              this.popover.queryBarObj = [
                {
                  label: "供应商编码",
                  moduleBind: "supplierCode",
                  isInput: true
                }
              ];
              this.popover.apiKey = "/supplierbase";
              this.popover.itemName = "供应商";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "supplierCode", name: "供应商编码" },
                { key: "supplierName", name: "供应商中文名称" },
                { key: "creditLevel", name: "信用等级" },
                { key: "withinSupplier", name: "内部供应商" },
                { key: "hasChecked", name: "已审核" },
                { key: "supplierAbb", name: "供应商简称" }
              ];
              break;
          }
        } else {
          this.$message.warning("请选择收货单位类型");
          return;
        }
      } else if (key == "declarationUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "公司列表";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "companyCode", name: "公司编码" },
          { key: "companyName", name: "名称" },
          { key: "national", name: "国家" },
          { key: "province", name: "省" },
          { key: "city", name: "市" },
          { key: "district", name: "区县" }
        ];
      } else if (key == "orderModel") {
        this.popover.queryBarObj = [
          { label: "商品名称", moduleBind: "tradeName", isInput: true }
        ];
        this.popover.apiKey = "/materielbase";
        this.popover.itemName = "物料基础信息";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "materielCode", name: "物料基础编码" },
          { key: "tradeName", name: "商品名称" },
          { key: "materielStatus", name: "物料状态" },
          { key: "materielType", name: "物料分类" },
          { key: "measurementUnitName", name: "计量单位" },
          { key: "specificationType", name: "规格型号" }
        ];
      } else if (key == "sellerUnitName") {
        this.popover.queryBarObj = [
          { label: "编码", moduleBind: "measurementCode", isInput: true }
        ];
        this.popover.apiKey = "/measurement";
        this.popover.itemName = "单位";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "measurementCode", name: "单据编号" },
          { key: "measurementGroup", name: "计量单位组" },
          { key: "measurementUnit", name: "计量单位名称" },
          { key: "remark", name: "备注" }
        ];
      } else if (key == "taxTypeName") {
        this.popover.queryBarObj = [
          { label: "税种名称", moduleBind: "taxCategoryName", isInput: true }
        ];
        this.popover.apiKey = "/taxcategory";
        this.popover.itemName = "税种信息";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "billCode", name: "税种编码" },
          { key: "taxCategoryName", name: "税种名称" },
          { key: "tax", name: "税率" }
        ];
      } else if (key == "consumptionTaxRate") {
        this.popover.queryBarObj = [
          { label: "税种名称", moduleBind: "taxCategoryName", isInput: true }
        ];
        this.popover.apiKey = "/taxcategory";
        this.popover.itemName = "税种信息";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "billCode", name: "税种编码" },
          { key: "taxCategoryName", name: "税种名称" },
          { key: "tax", name: "税率" }
        ];
      } else if (key == "customerName") {
        this.popover.queryBarObj = [
          { label: "客户名称", moduleBind: "customerName", isInput: true }
        ];
        this.popover.apiKey = "/customer";
        this.popover.itemName = "客户列表";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "customerNo", name: "客户编码" },
          { key: "customerName", name: "客户名称" },
          { key: "internalCustomer", name: "是否内部客户" },
          { key: "shortName", name: "客户简称" },
          { key: "parentCustomerName", name: "客户" },
          { key: "customerNature", name: "客户性质" }
        ];
      } else if (key == "brandName") {
        this.popover.queryBarObj = [
          { label: "品牌名称", moduleBind: "brandName", isInput: true }
        ];
        this.popover.apiKey = "/brand";
        this.popover.itemName = "品牌列表";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "brandCode", name: "编码" },
          { key: "brandName", name: "名称" },
          { key: "brandAbb", name: "简称" },
          { key: "customsCode", name: "对应海关编码" },
          { key: "description", name: "描述" }
        ];
      } else if (key == "superviseModeName") {
        this.popover.queryBarObj = [
          {
            label: "监管方式名称",
            moduleBind: "supervisionModeName",
            isInput: true
          }
        ];
        this.popover.apiKey = "/supervisionmode";
        this.popover.itemName = "监管方式列表";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "supervisionModeCode", name: "编码" },
          { key: "supervisionModeCode", name: "名称" },
          { key: "supervisionModeAbb", name: "简称" },
          { key: "customsCode", name: "对应海关编码" },
          { key: "description", name: "描述" }
        ];
      } else if (key == "sourceAreaName") {
        this.popover.queryBarObj = [
          { label: "原产地名称", moduleBind: "originName", isInput: true }
        ];
        this.popover.apiKey = "/origin";
        this.popover.itemName = "原产地";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "originCode", name: "编码" },
          { key: "originName", name: "名称" },
          { key: "originAbb", name: "简称" },
          { key: "customsCode", name: "对应海关编码" },
          { key: "description", name: "描述" }
        ];
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(
              this.popover.apiKey,
              this.popover.ruleForm
            );
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (error) {
            console.log(error);
          }
          this.popover.ruleForm = {};
        }
      };
      this.popover.currencySelectInputKey = key;
      key && currencyObj[key]();
      this.popover.isShowPopover = !this.popover.isShowPopover;
      // if(!key) return
    },
    handlerSubPreservation(rowData, key) {
      let _this = this;
      if (key == "orderModel") {
        this.formPopover.formData.ruleForm["orderModel"] =
          rowData["materielCode"]; //来货编码（原登单型号）
        this.formPopover.formData.ruleForm["arrivalGoodsCode"] =
          rowData["materielCode"]; //来货编码
        this.formPopover.formData.ruleForm["arrivalGoodsName"] =
          rowData["tradeName"]; //来货名称
        this.formPopover.formData.ruleForm["arrivalGoodsModel"] =
          rowData["specificationType"]; //来货规格型号
        this.formPopover.formData.ruleForm["goodsCode"] =
          rowData["materielCode"]; //商品编码
        this.formPopover.formData.ruleForm["goodsName"] = rowData["tradeName"]; //商品名称
        this.formPopover.formData.ruleForm["sellerUnit"] =
          rowData["measurementUnit"]; //卖方单位编码
        this.formPopover.formData.ruleForm["sellerUnitName"] =
          rowData["measurementUnitName"]; //卖方单位
        api.getMaterielCustomAll().then(res => {
          res.data.list.forEach(element => {
            if (element.materielCode == rowData["materielCode"]) {
              this.formPopover.formData.ruleForm["taxNo"] = element.taxNo; // 税号
              this.formPopover.formData.ruleForm["attachNo"] = element.attachNo; // 附号
              this.formPopover.formData.ruleForm["customTaxRate"] =
                element.maxRate; // 关税税率
            }
          });
        });
        this.formPopover.formData.ruleForm = {
          ...this.formPopover.formData.ruleForm
        };
        return;
      } else if (key != undefined) {
        switch (key) {
          case "trusteeName":
            this.entrustOrder.trusteeCode = rowData["companyCode"];
            this.entrustOrder[key] = rowData["companyName"];
            break;
          case "purchaseUnitName":
            this.entrustOrder.departmentCode = rowData["departmentCode"];
            this.entrustOrder.purchaseUnitCode = rowData["departmentCode"];
            this.entrustOrder[key] = rowData["departmentName"];
            break;
          case "clientName":
            this.entrustOrder.clientCode = rowData["clientNo"];
            this.entrustOrder[key] = rowData["clientName"];
            api.searchOneclientData(rowData["clientNo"]).then(res => {
              if (res.status == "200") {
                _this.entrustOrder.salesmanId = res.data.orderReceiverCode;
                _this.entrustOrder.salesmanName = res.data.orderReceiverName;
                _this.entrustOrder.followPersonId = res.data.orderFollowerCode;
                _this.entrustOrder.followPersonName =
                  res.data.orderFollowerName;
              }
            });
            this.entrustOrder["clientContactName"] = "";
            this.entrustOrder["clientTel"] = "";
            this.entrustOrder["clientPhone"] = "";
            break;
          case "clientContactName":
            this.entrustOrder[key] = rowData["leader"];
            // 回写
            this.entrustOrder["clientTel"] = rowData["tel"];
            this.entrustOrder["clientPhone"] = rowData["phone"];
            break;
          case "supplierName":
            if (
              sessionStorage.getItem("btnType") == "update" &&
              this.entrustOrder.supplierCode != rowData["supplierCode"] &&
              !this.isCheckRoll
            ) {
              this.TipsClose(rowData, key);
              return;
            }
            this.isCheckRoll = false;
            // 回写
            this.entrustOrder[key] = rowData[key];
            this.entrustOrder.supplierCode = rowData["supplierCode"];
            api
              .searchOnesupplierfinanceData(rowData["supplierCode"])
              .then(res => {
                if (res.status == "200") {
                  _this.entrustOrder.supplierCurrency = res.data.currency;
                }
              });
            // 清空
            this.entrustOrder["supplierContactName"] = "";
            this.entrustOrder["supplierTel"] = "";
            this.entrustOrder["supplierPhone"] = "";
            break;
          case "supplierContactName":
            this.entrustOrder[key] = rowData["contact"];
            // 回写
            this.entrustOrder["supplierTel"] = rowData["tel"];
            this.entrustOrder["supplierPhone"] = rowData["phone"];
            break;
          case "customerName":
            if (
              sessionStorage.getItem("btnType") == "update" &&
              this.entrustOrder.customerCode != rowData["customerNo"] &&
              !this.isCheckRoll
            ) {
              this.TipsClose(rowData, key);
              return;
            }
            this.isCheckRoll = false;
            //
            this.entrustOrder[key] = rowData[key];
            this.entrustOrder.customerCode = rowData["customerNo"];
            // 币别
            api
              .getCustomerFinance({
                customerNo: rowData["customerNo"]
              })
              .then(res => {
                if (res.status == "200") {
                  _this.entrustOrder.currency = res.data.settlementCurrency;
                }
              });
            break;
          case "businessUnitName":
            this.entrustCustom = {
              ...this.entrustCustom,
              [key]: rowData["companyName"]
            };
            this.entrustCustom["businessUnitCode"] = rowData["companyCode"];
            break;
          case "declarationUnitName":
            this.entrustCustom = {
              ...this.entrustCustom,
              [key]: rowData["companyName"]
            };
            this.entrustCustom["declarationUnitCode"] = rowData["companyCode"];
            break;
          case "receiveUnitName":
            if (this.entrustCustom.receiveUnitType == "1") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["companyName"]
              };
              this.entrustCustom["receiveUnitCode"] = rowData["companyCode"];
            }
            if (this.entrustCustom.receiveUnitType == "2") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["clientName"]
              };
              this.entrustCustom["receiveUnitCode"] = rowData["clientCode"];
            }
            if (this.entrustCustom.receiveUnitType == "3") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["customerName"]
              };
              this.entrustCustom["receiveUnitCode"] = rowData["customerCode"];
            }
            if (this.entrustCustom.receiveUnitType == "4") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["supplierName"]
              };
              this.entrustCustom["receiveUnitCode"] = rowData["supplierCode"];
            }
            break;
          case "sellerName":
            if (this.entrustCustom.sellerType == "1") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["companyName"]
              };
              this.entrustCustom["sellerCode"] = rowData["companyCode"];
            }
            if (this.entrustCustom.sellerType == "2") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["clientName"]
              };
              this.entrustCustom["sellerCode"] = rowData["clientCode"];
            }
            if (this.entrustCustom.sellerType == "3") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["customerName"]
              };
              this.entrustCustom["sellerCode"] = rowData["customerCode"];
            }
            if (this.entrustCustom.sellerType == "4") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["supplierName"]
              };
              this.entrustCustom["sellerCode"] = rowData["supplierCode"];
            }
            break;
          case "sellerUnitName":
            this.formPopover.formData.ruleForm["sellerUnit"] =
              rowData["measurementCode"]; //卖方单位编码
            this.formPopover.formData.ruleForm["sellerUnitName"] =
              rowData["measurementUnit"]; //卖方单位
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm
            };
            break;
          case "taxTypeName":
            this.formPopover.formData.ruleForm["taxTypeName"] =
              rowData["taxCategoryName"];
            this.formPopover.formData.ruleForm["otherTaxRate"] = rowData["tax"];
            break;
          case "consumptionTaxRate":
            this.formPopover.formData.ruleForm["consumptionTaxRate"] =
              rowData["tax"];
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm
            };
            break;
          case "brandName":
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm,
              [key]: rowData["brandName"]
            };
            this.formPopover.formData.ruleForm["brand"] = rowData["brandCode"];
            break;
          case "superviseModeName":
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm,
              [key]: rowData["supervisionModeName"]
            };
            this.formPopover.formData.ruleForm["superviseMode"] =
              rowData["supervisionModeCode"];
            break;
          case "sourceAreaName":
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm,
              [key]: rowData["originName"]
            };
            this.formPopover.formData.ruleForm["sourceArea"] =
              rowData["originCode"];
            break;
          case "settlementUnitName":
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm,
              ["settlementUnit"]: rowData["companyCode"]
            };
            this.formPopover.formData.ruleForm["settlementUnitName"] =
              rowData["companyName"];
            break;
          // 协议名称agreementName
          case "agreementName":
            if (
              sessionStorage.getItem("btnType") == "update" &&
              this.entrustOrder.agreementCode != rowData["agreementNo"] &&
              !this.isCheckRoll
            ) {
              this.TipsClose(rowData, key);
              return;
            }
            this.isCheckRoll = false;
            //
            this.entrustOrder[key] = rowData[key];
            this.entrustOrder.agreementCode = rowData["agreementNo"];
            // 作为参数
            this.isxymc = true;
            this.popover.curPopStorage.agreementNo = rowData["agreementNo"];
            // 重置协议方案
            this.entrustOrder["agreementSolutionName"] = "";
            this.entrustOrder.agreementSolutionCode = "";
            // 服务费计算
            this.entrustOrder.serviceCharge = "";
            this.entrustOrder.serviceTaxRate = "";
            this.entrustOrder.serviceFee = "";
            break;
          case "agreementSolutionName": //协议方案
            if (
              sessionStorage.getItem("btnType") == "update" &&
              this.entrustOrder.agreementSolutionCode &&
              this.entrustOrder.agreementSolutionCode !=
                rowData["solutionNo"] &&
              !this.isCheckRoll
            ) {
              this.TipsClose(rowData, key);
              return;
            }
            this.isCheckRoll = false;
            //
            this.entrustOrder[key] = rowData["solutionName"];
            this.entrustOrder.agreementSolutionCode = rowData["solutionNo"];
            // 服务费计算
            this.entrustOrder.serviceCharge = rowData["serviceChargeType"];
            this.entrustOrder.serviceTaxRate = rowData["serviceChargeRate"];
            this.entrustOrder.serviceFee = rowData["serviceCharge"];
            break;
          default:
            break;
        }
      }
    },
    TipsdialogVisiblehandleClose(key, newVal, oldVal) {
      this.$confirm("此操作将永久清空委托单据商品信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handlePreserve();
        })
        .catch(() => {
          this.isrollback = true;
          this.entrustOrder[key] = oldVal;
        });
    },
    TipsClose(rowData, key) {
      this.$confirm("此操作将永久清空委托单据商品信息，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.isCheckRoll = true;
          this.handlerSubPreservation(rowData, key);
          this.handlePreserve();
        })
        .catch(() => {});
    },
    // 初始化tab 表格
    async handlerTabClick({ name } = tab, event) {
      if (name == "trusteereceipt") {
        name = "trusteeReceipt";
      }
      if (name == "trusteepanyment") {
        name = "trusteePanyment";
      }
      ColumnData = require("@/domain/entities/commerce/Entrust" +
        this.capitalize(name)).default;
      this.formPopover.formData.ruleForm = new ColumnData();
      this.dataTab.columnDataTable = require("@/domain/tableconfig/commerce/Entrust" +
        this.capitalize(name)).default;
      this.dataTab.queryTableData.entrustOrderNo = this.entrustOrder.entrustOrderNo;
      this.formPopover.formData.formConfig = require("@/domain/formconfig/commerce/Entrust" +
        this.capitalize(name)).default;
      api.initSelect(this.formPopover.formData.formConfig);
      if (name == "trusteeReceipt") {
        name = "trusteereceipt";
      }
      if (name == "trusteePanyment") {
        name = "trusteepanyment";
      }
      this.dataTab.tabActiveName = name;
      // 报关信息关联初始化
      if (name == "custom") {
        if (sessionStorage.getItem("btnType") == "update") {
          api.getEntrustcustom(this.entrustOrder.entrustOrderNo).then(res => {
            if (res) {
              if (res.data == "") {
                this.entrustCustom = new EntrustOrder();
              } else {
                this.entrustCustom = res.data;
              }
            }
          });
        }
        return;
      }
      this.dataTab.queryTableData.pageIndex = 1; //页签调到第一页
      this.handleTabPageChange({ pageIndex: "1", pageSize: "10" });
      this.curRowData = {}; // 清空当前行数据
    },
    //分页查询子表
    async handleTabPageChange(paper) {
      this.dataTab.queryTableData.pageIndex = paper.pageIndex;
      this.dataTab.queryTableData.pageSize = paper.pageSize;
      let val = await api.querySearch(
        "/entrust" + this.dataTab.tabActiveName,
        this.dataTab.queryTableData
      );
      const {
        data: { list, count }
      } = val;
      this.dataTab.tableData = list;
      this.dataTab.count = count;
      this.tj(paper);
    },
    //点击查询栏按钮事件
    handleBtnClick: (() => {
      var obj = null;
      return function(type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    handleBtnClickObj() {
      return {
        search: async () => {
          try {
            var {
              data: { count, list }
            } = await api.querySearch(
              this.popover.apiKey,
              this.popover.ruleForm
            );
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (e) {
            console.log(e);
          }
          // 清空查询数据
          this.popover.queryBarObj.map((e, i) => {
            if (this.popover.ruleForm[e.moduleBind])
              this.popover.ruleForm[e.moduleBind] = "";
          });
        }
      };
    },
    // 统计
    async tj(paper) {
      this.dataTab.queryTableData.pageIndex = paper.pageIndex;
      this.dataTab.queryTableData.pageSize = paper.pageSize;
      let val = await api.querySearch(
        "/entrustgoods",
        this.dataTab.queryTableData
      );
      if (!val.data.list.length > 0) {
        return;
      }
      // 计算
      //卖方销售总货值
      this.entrustOrder.goodsValue = val.data.sellerGoodsValueCount;
      // 增值税合计
      this.entrustOrder.vatTotalAmount = val.data.vatTaxAmountCount;
      // 服务费总和
      this.entrustOrder.totalServiceCharge = val.data.serviceFeeCount;
      // 关税合计
      this.entrustOrder.customTotalAmount = val.data.customTaxAmountCount;
      // 受托方应付货款总额
      this.entrustOrder.trusteePayGoodsAmount = val.data.sellerGoodsValueCount;
      // 预计应收总额
      this.entrustOrder.advanceAmount =
        this.entrustOrder.goodsValue +
        val.data.otherTaxAmountCount +
        val.data.serviceFeeCount;
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
      this.dataTab.tj = [];
      this.dataTab.tj.push(tisj);
    },
    //点选分页
    handlePageChange(paper) {
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      this.handleBtnClick("search"); //翻页查询
    },
    //保存主表单
    async handlePreserve() {
      if (sessionStorage.getItem("btnType") == "update") {
        if (this.isVerify()) {
          try {
            this.isLoading = true;
            const { data } = await api.editentrustorderData(this.entrustOrder);
            this.isLoading = false;
            if (data) {
              // 提交成功后...
              this.dataTab.tabActiveName = "goods";
              this.dataTab.tabIsDisabled = false;
              this.handlerTabClick({ name: this.dataTab.tabActiveName }); //重新初始化tab
              this.$message.success("修改成功");
            }
          } catch (e) {
            console.log(e);
          }
        }
      } else {
        if (this.isVerify()) {
          this.isLoading = true;
          const { data } = await api.addentrustorderData(this.entrustOrder);
          this.isLoading = false;
          if (data) {
            // 提交成功后...
            sessionStorage.setItem("btnType", "update");
            this.dataTab.tabActiveName = "goods";
            this.dataTab.tabIsDisabled = false;
            this.handlerTabClick({ name: this.dataTab.tabActiveName }); //重新初始化tab
            this.$message.success("保存成功");
            // this.locking();
          }
        }
      }
    },
    // 是否新增修改
    async openTabForm(btnType) {
      if (!this.curRowData.itemCode && btnType != "create") {
        this.$message.warning("请选择一条数据");
        return;
      }
      let curRowData = this.curRowData;
      if (btnType == "update" && JSON.stringify(curRowData) != "{}") {
        try {
          const { data: searchOneData } = await api.searchOneData(
            "/entrust" + this.dataTab.tabActiveName,
            {
              itemCode: curRowData.itemCode
            }
          );
          this.curRowData = searchOneData;
        } catch (e) {
          console.log(e);
        }
      }
      // 拿数据
      if (btnType == "create") {
        this.formPopover.formData.ruleForm = new ColumnData();
        if (this.dataTab.tabActiveName == "goods") {
          this.formPopover.formData.ruleForm["serviceCurrency"] = "3"; // 本位币固定人命币
          this.formPopover.formData.ruleForm[
            "sellerCurrency"
          ] = this.entrustOrder.supplierCurrency; // 币别
          this.formPopover.formData.ruleForm[
            "buyerCurrency"
          ] = this.entrustOrder.currency; // 币别
          if (this.entrustOrderType == "1") {
            this.formPopover.formData.ruleForm["vatTaxRate"] = "1"; // 进口增值税税率  默认13%
            api.getExchange().then(res => {
              res.data.forEach(b => {
                // 海关汇率
                if (this.formPopover.formData.ruleForm["sellerCurrency"]) {
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 3
                  ) {
                    this.formPopover.formData.ruleForm[
                      "customsExchangeRate"
                    ] = 1.0;
                  }
                  // 1 澳元
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 1 &&
                    b.currency == "澳大利亚元"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 2 瑞士法朗
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 2 &&
                    b.currency == "瑞士法郎"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 4 欧元
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 4 &&
                    b.currency == "欧元"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 5 英镑
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 5 &&
                    b.currency == "英镑"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 6 港币
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 6 &&
                    b.currency == "港币"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 7 日元
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 7 &&
                    b.currency == "日元"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                  // 8 美元
                  if (
                    this.formPopover.formData.ruleForm["sellerCurrency"] == 8 &&
                    b.currency == "美元"
                  ) {
                    this.formPopover.formData.ruleForm["customsExchangeRate"] =
                      // Math.round(b.cenPrice * 10000) / 10000;
                      b.cenPrice;
                  }
                }
              });
            });
          }
          // let exchangeRate = this.$store.state.other.exchangeRate;
          // if (Object.prototype.toString.call(this.exchangeRate).slice(8, -1) == 'Array') {
          //   for (let item of this.exchangeRate) {
          //   }
          // }
          api.getExchange().then(res => {
            res.data.forEach(b => {
              // 买方货款汇率
              if (this.formPopover.formData.ruleForm["buyerCurrency"]) {
                if (this.formPopover.formData.ruleForm["buyerCurrency"] == 3) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] = 1.0;
                }
                // 1 澳元
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 1 &&
                  b.currency == "澳大利亚元"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 2 瑞士法朗
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 2 &&
                  b.currency == "瑞士法郎"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 4 欧元
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 4 &&
                  b.currency == "欧元"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 5 英镑
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 5 &&
                  b.currency == "英镑"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 6 港币
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 6 &&
                  b.currency == "港币"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 7 日元
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 7 &&
                  b.currency == "日元"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
                // 8 美元
                if (
                  this.formPopover.formData.ruleForm["buyerCurrency"] == 8 &&
                  b.currency == "美元"
                ) {
                  this.formPopover.formData.ruleForm["buyerExchangeRate"] =
                    // Math.round(b.cenPrice * 10000) / 10000;
                    b.cenPrice;
                }
              }
            });
          });
        }
      } else {
        this.formPopover.formData.ruleForm = this.curRowData;
      }
      // 赋值
      this.formPopover.formData.ruleForm.entrustOrderNo = this.entrustOrder.entrustOrderNo;
      //显示空选提示语
      if (btnType != "create" && JSON.stringify(curRowData) == "{}") {
        this.$message.warning("请选择数据");
      } else if (btnType != "delete") {
        this.$store.commit("btnType", btnType);
        this.rouseFormPopover();
      }
      // 确认删除
      if (btnType == "delete" && JSON.stringify(curRowData) != "{}") {
        this.$alert("删除不可恢复，是否确定删除？", "删除", {
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          beforeClose: (action, instance, done) => {
            if (action === "confirm") {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = "执行中...";
              setTimeout(() => {
                // 删除
                api
                  .deleteData(
                    "/entrust" + this.dataTab.tabActiveName,
                    curRowData.itemCode
                  )
                  .then(res => {
                    if (res) {
                      // 提交成功后...
                      this.handlerTabClick({
                        name: this.dataTab.tabActiveName
                      });
                      this.$message.success("保存成功");
                    }
                  });
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 1000);
            } else {
              done();
            }
          }
        });
      }
    },
    // 新增修改子form（商品信息）
    async saveTabForm() {
      if (this.isVerify()) {
        var isvalid = true;
        // this.$refs.formD.$refs.formModel.$refs.formModel.validate(valid => {
        //   if (valid) {
        //     isvalid = valid;
        //   }
        // });
        if (isvalid) {
          // 验证成功
          if (this.$store.state.other.btnType == "create") {
            const { data: addData } = await api.addData(
              "/entrust" + this.dataTab.tabActiveName,
              this.formPopover.formData.ruleForm
            );
            if (addData) {
              // 提交成功后...
              this.$message.success("保存成功");
              this.formPopover.isShowPopover = false;
              this.handlerTabClick({ name: this.dataTab.tabActiveName });
            }
          } else {
            const { data: editData } = await api.editData(
              "/entrust" + this.dataTab.tabActiveName,
              this.formPopover.formData.ruleForm
            );
            if (editData) {
              // 提交成功后...
              this.$message.success("修改成功");
              this.handlerTabClick({ name: this.dataTab.tabActiveName });
              this.formPopover.isShowPopover = false;
            }
          }
        }
      }
    },
    async saveCostom() {
      if (this.isVerify()) {
        this.entrustCustom.entrustOrderNo = this.entrustOrder.entrustOrderNo;
        var invalidate = false;
        this.$refs.customtable.$refs.formModel.validate(valid => {
          invalidate = true;
        });
        if (invalidate) {
          const { data } = await api.addentrustcustomData(this.entrustCustom);
          if (data) {
            // 提交成功后...
            this.$message({ type: "success", message: "保存成功" });
          }
        }
      }
    },
    rouseFormPopover(key) {
      this.formPopover.isShowPopover = !this.formPopover.isShowPopover;
      if (
        this.formPopover.isShowPopover &&
        this.dataTab.tabActiveName == "goods"
      ) {
        this.lockingcommodity(); // 锁定子表
      }
    },
    async loadCodeNo() {
      //加载编号
      try {
        let { data } = await api.getentrustorderCode();
        this.entrustOrder.entrustOrderNo = data;
      } catch (e) {
        console.log(e);
      }
    },
    // 选中当前行
    clickTabRow(row) {
      // 获取修改内容
      this.curRowData = row;
      this.$store.commit("curRowData", row);
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    lockingUtil(arr) {
      for (let value of arr) {
        for (let item of this.entrustOrderKey) {
          for (let data of item.list) {
            if (value.key === data.key) {
              data = { ...data, ...value };
            }
          }
        }
      }
    },
    // // 主表锁定
    // locking() {
    //   this.entrustOrderKey[0]["list"][1].disabled = false; //委托订单类型
    //   this.entrustOrderKey[2]["list"][4].disabled = false; //销售币别
    //   this.entrustOrderKey[3]["list"][1].disabled = false; //采购币别
    //   this.entrustOrderKey[4]["list"][0].btn = true; //协议管理
    //   this.entrustOrderKey[4]["list"][1].btn = true; //协议方案
    //   this.entrustOrderKey[1]["list"][2].disabled = false; //贸易方式
    //   this.entrustOrderKey[1]["list"][3].disabled = false; //成交方式
    //   if (sessionStorage.getItem("btnType") == "update") {
    //     // 锁定不可修改
    //     this.entrustOrderKey[0]["list"][1].disabled = true;
    //     this.entrustOrderKey[2]["list"][4].disabled = true;
    //     this.entrustOrderKey[3]["list"][1].disabled = true;
    //     this.entrustOrderKey[4]["list"][0].btn = false;
    //     this.entrustOrderKey[4]["list"][1].btn = false;
    //     this.entrustOrderKey[1]["list"][2].disabled = true;
    //     this.entrustOrderKey[1]["list"][3].disabled = true;
    //   }
    //   this.entrustOrderKey[0]["list"] = [...this.entrustOrderKey[0]["list"]];
    //   this.entrustOrderKey[2]["list"] = [...this.entrustOrderKey[2]["list"]];
    //   this.entrustOrderKey[3]["list"] = [...this.entrustOrderKey[3]["list"]];
    //   this.entrustOrderKey[1]["list"] = [...this.entrustOrderKey[1]["list"]];
    // },
    // // 商品信息锁定
    lockingcommodity() {
      // 委托订单类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "increaseTaxRate"
      )["disabled"] = false; //关税加征%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "consumptionTaxRate"
      )["disabled"] = false; //消费税率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "consumptionTaxRate"
      )["btn"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "vatTaxRate"
      )["disabled"] = false; //进口增值税率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "taxTypeName"
      )["disabled"] = false; //其他税种%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "taxTypeName"
      )["btn"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "drawbackrate"
      )["disabled"] = false; //退税率%
      if (
        this.entrustOrderType == "1" ||
        this.entrustOrderType == "3" ||
        this.entrustOrderType == "4"
      ) {
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "drawbackrate"
        )["disabled"] = true; //退税率%
      }
      if (
        this.entrustOrderType == "2" ||
        this.entrustOrderType == "3" ||
        this.entrustOrderType == "4"
      ) {
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "increaseTaxRate"
        )["disabled"] = true; //关税加征%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "consumptionTaxRate"
        )["disabled"] = true; //消费税率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "consumptionTaxRate"
        )["btn"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "vatTaxRate"
        )["disabled"] = true; //进口增值税率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "taxTypeName"
        )["disabled"] = true; //其他税种%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "taxTypeName"
        )["btn"] = false;
      }
      // this.formPopover.formData.formConfig[3]["list"][0].disabled = false; //运费费率
      // this.formPopover.formData.formConfig[3]["list"][1].disabled = false; //保费费率
      // this.formPopover.formData.formConfig[3]["list"][2].disabled = false; //杂费费率
      // this.formPopover.formData.formConfig[7]["list"][1].disabled = true; //退税金额
      // // 成交方式
      // if (this.dealMode) {
      //   if (this.dealMode == "1") {
      //     //FOB
      //   }
      //   if (this.dealMode == "2") {
      //     //CIF
      //     this.formPopover.formData.formConfig[3]["list"][0].disabled = true;
      //     this.formPopover.formData.formConfig[3]["list"][1].disabled = true;
      //     this.formPopover.formData.formConfig[3]["list"][2].disabled = true;
      //   }
      //   if (this.dealMode == "3") {
      //     //C&F
      //     this.formPopover.formData.formConfig[3]["list"][0].disabled = true;
      //   }
      //   if (this.dealMode == "4") {
      //     //C&I
      //     this.formPopover.formData.formConfig[3]["list"][1].disabled = true;
      //     this.formPopover.formData.formConfig[3]["list"][2].disabled = true;
      //   }
      // }
    },
    // 回调验证规则
    handlerFormVerify($refs) {
      this.verify = $refs;
    },
    // 验证规则
    isVerify() {
      let isVerify = true;
      // this.$refs.formConfigModel.$refs.formModel.validate(valid => {
      //   if (!valid) isVerify = valid;
      // });
      // this.$refs.formC.forEach(e => {
      //   e.$refs.formModel.validate(valid => {
      //     if (!valid) isVerify = valid;
      //   });
      // });
      return isVerify;
    },
    handlebackspacing() {
      this.$router.push("M0402");
    },
    // 单据提交
    handleSubmit() {
      this.utools.submitBusinessStatus({
        code: this.entrustOrder.entrustOrderNo,
        ctx: this,
        form: this.entrustOrder
      });
    },
    // 第一个字母转大写
    capitalize([first, ...rest]) {
      return first.toUpperCase() + rest.join("");
    }
  },
  created() {
    api.initSelect(this.entrustOrderKey);
    api.initSelect(this.entrustOrderKey7);
    // 业务类型下拉
    api.getEnum("businessTypeG").then(result => {
      this.sellist = result.data;
      let sel = [];
      if (this.entrustOrderType == "1") {
        sel.push(this.sellist[0]);
        sel.push(this.sellist[1]);
      }
      if (this.entrustOrderType == "2") {
        sel.push(this.sellist[2]);
        sel.push(this.sellist[3]);
      }
      if (this.entrustOrderType == "3") {
        sel.push(this.sellist[1]);
      }
      if (this.entrustOrderType == "4") {
        sel.push(this.sellist[4]);
        sel.push(this.sellist[5]);
      }
      this.utools.setFromconfigOption(this.entrustOrderKey, "bizType", sel);
    });
    // if (this.entrustOrderType) {
    //   this.sellist = this.utools.getFromconfigObj(
    //     this.entrustOrderKey,
    //     "bizType"
    //   );
    //   console.log(this.sellist)
    //   let sel = [];
    //   if (this.entrustOrderType == "1") {
    //     sel.push(this.sellist[0]);
    //     sel.push(this.sellist[1]);
    //   }
    //   if (this.entrustOrderType == "2") {
    //     sel.push(this.sellist[2]);
    //     sel.push(this.sellist[3]);
    //   }
    //   if (this.entrustOrderType == "3") {
    //     sel.push(this.sellist[1]);
    //   }
    //   if (this.entrustOrderType == "4") {
    //     sel.push(this.sellist[4]);
    //     sel.push(this.sellist[5]);
    //   }
    //   this.utools.setFromconfigOption(this.entrustOrderKey, "bizType", sel);
    // }
    const { formData = {} } = this.getActivePathData(this.$route.path) || {};
    if (formData) {
      Object.assign(this.entrustOrder, formData);
    }
    if (sessionStorage.getItem("btnType") == "create") {
      this.loadCodeNo(); //加载编号
    } else {
      this.dataTab.tabIsDisabled = false;
      this.dataTab.tabActiveName = "goods"; // 默认
      this.handlerTabClick({ name: "goods" }); //初始化tab
    }
  },
  watch: {
    // 委托订单类型
    entrustOrderType: {
      handler(newVal, oldVal) {
        if (
          sessionStorage.getItem("btnType") == "update" &&
          oldVal &&
          newVal &&
          oldVal != newVal
        ) {
          if (!this.isrollback) {
            this.TipsdialogVisiblehandleClose(
              "entrustOrderType",
              newVal,
              oldVal
            );
          } else {
            this.isrollback = false;
          }
        }
        // 业务类型下拉
        if (newVal && this.sellist.length > 0) {
          if (oldVal) {
            this.entrustOrder.bizType = "";
          }
          var sel = [];
          if (this.entrustOrderType == "1") {
            sel.push(this.sellist[0]);
            sel.push(this.sellist[1]);
          }
          if (this.entrustOrderType == "2") {
            sel.push(this.sellist[2]);
            sel.push(this.sellist[3]);
          }
          if (this.entrustOrderType == "3") {
            sel.push(this.sellist[1]);
          }
          if (this.entrustOrderType == "4") {
            sel.push(this.sellist[4]);
            sel.push(this.sellist[5]);
          }
          this.utools.setFromconfigOption(this.entrustOrderKey, "bizType", sel);
        }
        // 报关类型
        if (newVal) {
          this.entrustOrder.reportGateType = this.reportGateType;
        }
      },
      deep: true
    },
    // 种类
    serviceCharge: {
      handler(newVal, oldVal) {
        this.utools.getFromconfigObj(
          this.entrustOrderKey,
          "serviceTaxRate"
        ).rules = [];
        this.utools.getFromconfigObj(
          this.entrustOrderKey,
          "orderExchangeRate"
        ).rules = [];
        this.utools.getFromconfigObj(
          this.entrustOrderKey,
          "serviceFee"
        ).rules = [];
        if (newVal == "1") {
          this.utools.getFromconfigObj(
            this.entrustOrderKey,
            "serviceTaxRate"
          ).rules = [{ required: true, message: "必填", trigger: "blur" }];
          this.utools.getFromconfigObj(
            this.entrustOrderKey,
            "orderExchangeRate"
          ).rules = [{ required: true, message: "必填", trigger: "blur" }];
        }
        if (newVal == "2") {
          this.utools.getFromconfigObj(
            this.entrustOrderKey,
            "serviceFee"
          ).rules = [{ required: true, message: "必填", trigger: "blur" }];
        }
      },
      deep: true
    },
    // 销售币别
    supplierCurrency: {
      handler(newVal, oldVal) {
        if (newVal) {
          // 订单汇率
          api.getExchange().then(res => {
            res.data.forEach(b => {
              if (this.supplierCurrency == 3) {
                this.entrustOrder.orderExchangeRate = 1.0;
              }
              // 1 澳元
              if (this.supplierCurrency == 1 && b.currency == "澳大利亚元") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 2 瑞士法朗
              if (this.supplierCurrency == 2 && b.currency == "瑞士法郎") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 4 欧元
              if (this.supplierCurrency == 4 && b.currency == "欧元") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 5 英镑
              if (this.supplierCurrency == 5 && b.currency == "英镑") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 6 港币
              if (this.supplierCurrency == 6 && b.currency == "港币") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 7 日元
              if (this.supplierCurrency == 7 && b.currency == "日元") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
              // 8 美元
              if (this.supplierCurrency == 8 && b.currency == "美元") {
                this.entrustOrder.orderExchangeRate =
                  Math.round(b.cenPrice * 10000) / 1000000;
              }
            });
          });
        } else {
          this.entrustOrder.orderExchangeRate = "";
        }
      },
      deep: true
    },
    // =======================子表关联
    sellerPrice: {
      handler(newVal, oldVal) {},
      deep: true
    },
    sellerQuantity: {
      handler(newVal, oldVal) {},
      deep: true
    },
    sellerGoodsValue: {
      handler(newVal, oldVal) {},
      deep: true
    },
    freightRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    premiumRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    extrasRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    freight: {
      handler(newVal, oldVal) {},
      deep: true
    },
    premium: {
      handler(newVal, oldVal) {},
      deep: true
    },
    extras: {
      handler(newVal, oldVal) {},
      deep: true
    },
    costAmount: {
      handler(newVal, oldVal) {},
      deep: true
    },
    vatTaxRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    customTaxRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    buyerPrice: {
      handler(newVal, oldVal) {},
      deep: true
    },
    buyerExchangeRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    serviceExchangeRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 其他税率
    otherTaxRate: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 关税税额
    customTaxAmount: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 增值税税额
    vatTaxAmount: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 其他税金
    otherTaxAmount: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 完税价格
    dutyPaidPrice: {
      handler(newVal, oldVal) {},
      deep: true
    },
    // 价税合计
    priceTax: {
      handler(newVal, oldVal) {
        if(this.entrustOrder.entrustOrderType == '1')
        this.formPopover.formData.ruleForm.priceTax = this.priceTax
      },
      deep: true
    }
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      title: "/委托订单信息",
      data: { formData: this.entrustOrder, status: "create" },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less">
.EntrustOrderForm {
  .typetitle {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .btn-right {
    text-align: right;
    margin: 25px 0 0 0;
    & > button {
      margin-left: 30px !important;
    }
  }
  .tabs-defined {
    > :first-child {
      > div > div > div {
        > :first-child::before,
        :nth-child(2)::before {
          content: "*";
          color: red;
        }
      }
    }
  }
}
</style>
