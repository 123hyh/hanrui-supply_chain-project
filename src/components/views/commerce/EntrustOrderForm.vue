<template>
  <div class="EntrustOrderForm">
    <!-- 操作按钮 -->
    <preserve-btn
      :form="entrustOrder"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
      :isLoading="isLoading"
    ></preserve-btn>
    <span class="entrustOrderNametitle">{{entrustOrderNametitle}}</span>
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
      type="card"
      @tab-click="handlerTabClick"
      style="margin-top: 30px;"
      class="tabs-defined"
    >
      <el-tab-pane label="商品信息" name="goods" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10" v-show="entrustOrder.status <=1 ">
          <el-button @click="openTabForm('create')">新增</el-button>
          <el-button @click="openTabForm('update')">修改</el-button>
          <el-button @click="openTabForm('delete')">删除</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报关信息" name="custom" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10" v-show="entrustOrder.status <=1 ">
          <el-button @click="saveCostom">保存</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="buyer" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="卖方交货信息" name="seller" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="受托方收款" name="trusteereceipt" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="受托方付款" name="trusteepanyment" :disabled="dataTab.tabIsDisabled">
        <div class="mb-10" v-show="entrustOrder.status <=1 ">
          <el-button @click="openTabForm('create')">新增</el-button>
          <el-button @click="openTabForm('update')">修改</el-button>
          <el-button @click="openTabForm('delete')">删除</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收货信息" name="receive" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="转款信息" name="transfer" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="付款信息" name="panyment" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <el-tab-pane label="收货与报关明细" name="detail" :disabled="dataTab.tabIsDisabled"></el-tab-pane>
      <!-- 表格 -->
      <div class="handleTableHeight" v-if="dataTab.tabActiveName != 'custom'">
        <table-component
          :isSubTable="true"
          :dialog="false"
          :popoverList="dataTab.tableData"
          :popoverListKey="dataTab.columnDataTable"
          :count="dataTab.count"
          @rowClickData="clickTabRow"
          @handlePageChange="handleTabPageChange"
        ></table-component>
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
      <!---统计表---->
      <div class="handleTableHeight" v-if="dataTab.tabActiveName=='goods'">
        <el-table :data="dataTab.tj">
          <el-table-column prop="sellerQuantityCount" label="卖方销售数量"></el-table-column>
          <el-table-column prop="sellerGoodsValueCount" label="卖方销售货价"></el-table-column>
          <el-table-column prop="customTotalAmount" label="关税税额"></el-table-column>
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
        :lan="3"
        :formModel="entrustOrder"
        :inputKey="entrustOrderKey7"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch="rousePopover"
      ></form-config>
    </div>
    <!-- 子表商品信息,受托方付款表单-->
    <el-dialog
      top="5vh"
      v-if="dataTab.tabActiveName == 'goods'"
      v-dialogDrag
      :title="formPopover.itemName"
      :visible.sync="formPopover.isShowPopover"
      @close.native="rouseFormPopover"
      :width="formPopover.width"
      close-on-press-escape
      :close-on-click-modal="false"
      :before-close="rouseFormPopover"
    >
      <div class="diawtd">
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
      </div>
      <div class="btn-right">
        <el-button @click.stop="rouseFormPopover">取消</el-button>
        <el-button @click.stop="saveTabForm">确定</el-button>
      </div>
    </el-dialog>
    <popover
      v-else
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
    <!-- 查看按钮 -->
    <!-- <el-dialog
      top="5vh"
      v-dialogDrag
      :title="btnPopover.itemName"
      :width="btnPopover.width"
      :visible.sync="btnPopover.isShowPopover"
      @close.native="rouseFormPopover"
      close-on-press-escape
      :close-on-click-modal="false"
      :before-close="rouseFormPopover"
    >
      <div class="diawtd">
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
      </div>
      <div class="btn-right">
        <el-button @click.stop="rouseFormPopover">取消</el-button>
        <el-button @click.stop="saveTabForm">确定</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
// 引入公共的table组件
import { mapMutations, mapGetters } from "vuex";
import api from "@/assets/js/appHelper";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import FormConfig from "@/components/common/FormConfig";
import Pagination from "@/components/common/Pagination";
import Popover from "@/components/common/Popover";
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
// 主表
import EntrustOrder from "@/domain/entities/commerce/EntrustOrder";
import EntrustOrderFormConfig from "@/domain/formconfig/commerce/EntrustOrder/EntrustOrderList";
import EntrustOrderFormConfig7 from "@/domain/formconfig/commerce/EntrustOrder/EntrustOrder.7";
// 报关信息栏
import entrustCustom from "@/domain/entities/commerce/EntrustCustom";
import entrustCustomKey from "@/domain/formconfig/commerce/EntrustCustom";
// 弹窗
import Agreement from "@/domain/tableconfig/business/Agreement.js";
import AgreementSolution from "@/domain/tableconfig/business/AgreementSolution.js";

let ColumnData = "";
export default {
  components: {
    formModuleHead,
    FormConfig,
    Pagination,
    TableComponent,
    Popover
  },
  data() {
    return {
      searchTarget: "",
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
        width: "70%",
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
      isCheckRoll: false,
      writeback: ""
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    //===================计算 主表
    // 委托订单类型
    entrustOrderType() {
      return this.entrustOrder.entrustOrderType;
    },
    // 业务类型
    bizType() {
      return this.entrustOrder.bizType;
    },
    // 成交方式
    dealMode() {
      return this.entrustOrder.dealMode;
    },
    // 抬头
    head() {
      if (this.entrustOrderType && this.bizType) {
        if (this.entrustOrderType == 1 || this.entrustOrderType == 2) {
          if (this.bizType == 1 || this.bizType == 3) {
            return "single"; // 单抬头
          } else {
            return "double"; // 双抬头
          }
        } else {
          return "other"; // 其他
        }
      }
    },
    // 委托订单类型下拉文本
    entrustOrderName() {
      if (
        this.entrustOrderType &&
        this.utools.getFromconfigObj(this.entrustOrderKey, "entrustOrderType")[
          "selectOption"
        ].length > 0
      ) {
        return this.utools.gecongfig(
          this.entrustOrderKey,
          "entrustOrderType",
          this.entrustOrder.entrustOrderType
        );
      }
    },
    // 标题
    entrustOrderNametitle() {
      if (this.head == "single") {
        return this.entrustOrderName + "(单抬头)";
      } else if (this.head == "double") {
        return this.entrustOrderName + "(双抬头)";
      } else if (this.head == "other") {
        return this.entrustOrderName;
      }
    },
    // 签订日期
    signDate() {
      return this.entrustOrder.signDate;
    },
    // 销售币别
    supplierCurrency() {
      return this.entrustOrder.supplierCurrency;
    },
    // 订单汇率
    orderExchangeRate() {
      return this.entrustOrder.orderExchangeRate;
    },
    // 采购币别
    currency() {
      return this.entrustOrder.currency;
    },
    // 买方汇率
    currencyExchangeRate() {
      return this.entrustOrder.currencyExchangeRate;
    },
    //===================计算 子表
    // 海关汇率
    customsExchangeRate() {
      return this.formPopover.formData.ruleForm.customsExchangeRate || "";
    },
    // 货款汇率
    buyerExchangeRate() {
      return this.formPopover.formData.ruleForm.buyerExchangeRate || "";
    },
    // 低消差额
    minimumCharge() {
      // 最低消费额 - 服务费总和
      return (
        this.entrustOrder.minCharge -
        (this.entrustOrder.totalServiceCharge || 0)
      );
    },
    //  应开票金额
    // 	进出口 单：价税合计+服务费+杂费（代理报检费和检疫费）
    // 	进出口 双：服务费+杂费
    // 	本港 :  货值（转人命币）+服务费+杂费
    invoiceAmount() {
      //最低实际收款服务费
      var totalServiceCharge = 0;
      if (this.minimumCharge > 0) {
        totalServiceCharge = this.entrustOrder.minCharge;
      } else {
        totalServiceCharge = this.entrustOrder.totalServiceCharge;
      }
      if (
        (this.entrustOrderType == 1 || this.entrustOrderType == 2) &&
        this.bizType
      ) {
        if (this.bizType == 1 || this.bizType == 3) {
          //进出口单抬头
          return (
            (this.entrustOrder.priceTaxCount || 0) +
            totalServiceCharge +
            (this.entrustOrder.agencyFee || 0) +
            (this.entrustOrder.quarantineFee || 0)
          );
        } else {
          //进出口双抬头
          return (
            totalServiceCharge +
            (this.entrustOrder.agencyFee || 0) +
            (this.entrustOrder.quarantineFee || 0)
          );
        }
      }
      if (this.entrustOrderType == 3) {
        //本港
        if (this.entrustOrder.orderExchangeRate) {
          return (
            (
              (this.entrustOrder.goodsValue || 0) *
              (this.entrustOrder.orderExchangeRate || 0)
            ).toFixed(2) +
            totalServiceCharge +
            (this.entrustOrder.agencyFee || 0) +
            (this.entrustOrder.quarantineFee || 0)
          );
        }
      }
      return 0;
    },
    // 预计应收总额：
    // 	进出口 单双：价税合计+服务费+杂费(勾选是否垫货款)   or 价税合计 - 货值（转人命币）+服务费+杂费(不勾选是否垫货款)
    // 	本港 :  货值（转人命币）+服务费+杂费
    advanceAmount() {
      //最低实际收款服务费
      var totalServiceCharge = 0;
      if (this.minimumCharge > 0) {
        totalServiceCharge = this.entrustOrder.minCharge;
      } else {
        totalServiceCharge = this.entrustOrder.totalServiceCharge;
      }
      if (
        (this.entrustOrderType == 1 || this.entrustOrderType == 2) &&
        this.bizType
      ) {
        //进出口单双抬头
        if (this.entrustOrder.matPayment) {
          return (
            (this.entrustOrder.priceTaxCount || 0) +
            totalServiceCharge +
            (this.entrustOrder.agencyFee || 0) +
            (this.entrustOrder.quarantineFee || 0)
          );
        } else {
          if (this.entrustOrder.orderExchangeRate) {
            // 注： 未勾选 是否垫货款 并 商品条数为0，这时候加税合计总和为0，用加税合计-货值（人）的时候，并没有最低消的服务费，所以要加上
            return (
              (this.entrustOrder.priceTaxCount || 0) -
              (
                (this.entrustOrder.goodsValue || 0) *
                (this.entrustOrder.orderExchangeRate || 1)
              ).toFixed(2) +
              totalServiceCharge +
              (this.entrustOrder.agencyFee || 0) +
              (this.entrustOrder.quarantineFee || 0)
            );
          }
        }
        // if (this.bizType == 1 || this.bizType == 3) {
        //   //进出口单抬头
        //   if (this.entrustOrder.matPayment) {
        //     return (
        //       (this.entrustOrder.priceTaxCount || 0) +
        //       totalServiceCharge +
        //       (this.entrustOrder.agencyFee || 0) +
        //       (this.entrustOrder.quarantineFee || 0)
        //     );
        //   } else {
        //     if (this.entrustOrder.orderExchangeRate) {
        //       // 注： 未勾选 是否垫货款 并 商品条数为0，这时候加税合计总和为0，用加税合计-货值（人）的时候，并没有最低消的服务费，所以要加上
        //       return (
        //         (this.entrustOrder.priceTaxCount || 0) -
        //         (
        //           (this.entrustOrder.goodsValue || 0) *
        //           (this.entrustOrder.orderExchangeRate || 1)
        //         ).toFixed(2) +
        //         totalServiceCharge +
        //         (this.entrustOrder.agencyFee || 0) +
        //         (this.entrustOrder.quarantineFee || 0)
        //       );
        //     }
        //   }
        // } else {
        //   //进出口双抬头
        //   return (
        //     totalServiceCharge +
        //     (this.entrustOrder.agencyFee || 0) +
        //     (this.entrustOrder.quarantineFee || 0)
        //   );
        // }
      }
      if (this.entrustOrderType == 3) {
        //本港
        if (this.entrustOrder.orderExchangeRate) {
          return (
            (
              (this.entrustOrder.goodsValue || 0) *
              (this.entrustOrder.orderExchangeRate || 1)
            ).toFixed(2) +
            totalServiceCharge +
            (this.entrustOrder.agencyFee || 0) +
            (this.entrustOrder.quarantineFee || 0)
          );
        }
      }
      return 0;
    },
    // 参数过滤
    tableDialogWhiteList() {
      return [
        // "arrivalGoodsModel",
        "trusteeName",
        "purchaseUnitName",
        "clientContactName",
        "supplierName",
        "customerName",
        "orderModel",
        "sellerUnitName",
        "superviseModeName",
        "exciseTaxRate",
        "taxTypeName",
        "brandName",
        "sourceAreaName",
        "businessUnitName",
        "declarationUnitName",
        "arrivalCountryName",
        "settlementUnitName"
      ];
    }
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    async rousePopover(key) {
      if (key == "brandNameorder") {
        if (!this.formPopover.formData.ruleForm.arrivalGoodsModel) {
          this.$message.warning("请选择来货规格型号");
          return;
        }
        this.popover.queryBarObj = [
          { label: "品牌名称", moduleBind: "brandName", isInput: true }
        ];
        this.popover.apiKey = "/materielbrand";
        this.popover.itemName = "品牌记录";
        this.popover.ruleForm.specificationType = this.formPopover.formData.ruleForm.arrivalGoodsModel;
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "specificationType", name: "来货规格型号" },
          { key: "brandName", name: "品牌" },
          { key: "orderTimes", name: "次数" }
        ];
      }
      if (key == "sourceAreaNameorder") {
        if (!this.formPopover.formData.ruleForm.arrivalGoodsModel) {
          this.$message.warning("请选择来货规格型号");
          return;
        }
        this.popover.queryBarObj = [
          { label: "品牌名称", moduleBind: "brandName", isInput: true }
        ];
        this.popover.apiKey = "/materielorigin";
        this.popover.itemName = "产地记录";
        this.popover.ruleForm.specificationType = this.formPopover.formData.ruleForm.arrivalGoodsModel;
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "specificationType", name: "来货规格型号" },
          { key: "originName", name: "产地" },
          { key: "orderTimes", name: "次数" }
        ];
      }
      this.popover.popoverList = [];
      if (key == "trusteeName" || key == "settlementUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "公司";
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
        this.popover.itemName = "部门资料";
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
        this.popover.itemName = "委托方联系人";
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
        this.popover.itemName = "委托方联系人";
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
        if (!this.entrustOrder.clientCode) {
          this.$message.warning("请选择委托方");
          return;
        }
        this.popover.queryBarObj = [
          { label: "协议编号", moduleBind: "agreementNo", isInput: true }
        ];
        this.popover.apiKey = "/agreement";
        this.popover.itemName = "协议名称";
        this.popover.popoverListKey = Agreement;
        this.popover.ruleForm.customerCode = this.entrustOrder.clientCode;
      } else if (key == "agreementSolutionName") {
        if (!this.entrustOrder.agreementName) {
          this.$message.warning("请选择协议名称");
          return;
        }
        this.popover.queryBarObj = [
          { label: "方案编号", moduleBind: "solutionNo", isInput: true }
        ];
        this.popover.apiKey = "/agreementsolution";
        this.popover.ruleForm.agreementNo = this.entrustOrder.agreementCode;
        this.popover.itemName = "协议方案";
        this.popover.popoverListKey = AgreementSolution;
      } else if (key == "businessUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "公司";
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
              this.popover.itemName = "公司";
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
              this.popover.itemName = "客户";
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
              this.popover.itemName = "公司";
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
              this.popover.itemName = "客户";
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
      } else if (key == "sendUnitName") {
        if (this.entrustCustom.sendUnitType) {
          switch (this.entrustCustom.sendUnitType) {
            case "1":
              this.popover.queryBarObj = [
                { label: "公司名称", moduleBind: "companyName", isInput: true }
              ];
              this.popover.apiKey = "/companyinfo";
              this.popover.itemName = "公司";
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
              this.popover.itemName = "客户";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "customerNo", name: "客户编码" },
                { key: "customerName", name: "客户名称" },
                { key: "internalCustomer", name: "是否内部客户" },
                { key: "shortName", name: "客户简称" },
                { key: "parentCustomerName", name: "上级客户" },
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
          this.$message.warning("请选择发货单位类型");
          return;
        }
      } else if (key == "customsContractBuyerName") {
        if (this.entrustCustom.customsBuyerType) {
          switch (this.entrustCustom.customsBuyerType) {
            case "1":
              this.popover.queryBarObj = [
                { label: "公司名称", moduleBind: "companyName", isInput: true }
              ];
              this.popover.apiKey = "/companyinfo";
              this.popover.itemName = "公司";
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
              this.popover.itemName = "客户";
              this.popover.popoverListKey = [
                // 设置表格的表头
                { key: "customerNo", name: "客户编码" },
                { key: "customerName", name: "客户名称" },
                { key: "internalCustomer", name: "是否内部客户" },
                { key: "shortName", name: "客户简称" },
                { key: "parentCustomerName", name: "上级客户" },
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
          this.$message.warning("请选择报关买方类型");
          return;
        }
      } else if (key == "arrivalCountryName") {
        this.popover.queryBarObj = [
          {
            label: "运抵国编码",
            moduleBind: "arrivalCountryCode",
            isInput: true
          }
        ];
        this.popover.apiKey = "/arrivalcountry";
        this.popover.itemName = "运抵国";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "arrivalCountryCode", name: "运抵国编码" },
          { key: "arrivalCountryName", name: "运抵国名称" },
          { key: "customsCode", name: "对应海关编码" },
          { key: "description", name: "描述" }
        ];
      } else if (key == "declarationUnitName") {
        this.popover.queryBarObj = [
          { label: "公司名称", moduleBind: "companyName", isInput: true }
        ];
        this.popover.apiKey = "/companyinfo";
        this.popover.itemName = "公司";
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
      } else if (key == "arrivalGoodsModel") {
        this.popover.queryBarObj = [
          { label: "规格型号", moduleBind: "specificationType", isInput: true }
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
      } else if (key == "exciseTaxRate") {
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
        this.popover.itemName = "客户";
        this.popover.popoverListKey = [
          // 设置表格的表头
          { key: "customerNo", name: "客户编码" },
          { key: "customerName", name: "客户名称" },
          { key: "internalCustomer", name: "是否内部客户" },
          { key: "shortName", name: "客户简称" },
          { key: "parentCustomerName", name: "上级客户" },
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
      this.searchTarget = key;
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let {
              data: { count, list }
            } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm,
              status: this.tableDialogWhiteList.includes(this.searchTarget)
                ? "2"
                : ""
            });
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
    },
    async handlerSubPreservation(rowData, key) {
      let _this = this;
      if (key == "orderModel" || key == "arrivalGoodsModel") {
        this.formPopover.formData.ruleForm["arrivalGoodsModel"] =
          rowData["specificationType"]; //来货规格型号
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
          case "sendUnitName":
            if (this.entrustCustom.sendUnitType == "1") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["companyName"]
              };
              this.entrustCustom["sendUnit"] = rowData["companyCode"];
            }
            if (this.entrustCustom.sendUnitType == "2") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["clientName"]
              };
              this.entrustCustom["sendUnit"] = rowData["clientCode"];
            }
            if (this.entrustCustom.sendUnitType == "3") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["customerName"]
              };
              this.entrustCustom["sendUnit"] = rowData["customerCode"];
            }
            if (this.entrustCustom.sendUnitType == "4") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["supplierName"]
              };
              this.entrustCustom["sendUnit"] = rowData["supplierCode"];
            }
            break;
          case "customsContractBuyerName":
            if (this.entrustCustom.customsBuyerType == "1") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["companyName"]
              };
              this.entrustCustom["customsContractBuyer"] =
                rowData["companyCode"];
            }
            if (this.entrustCustom.customsBuyerType == "2") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["clientName"]
              };
              this.entrustCustom["customsContractBuyer"] =
                rowData["clientCode"];
            }
            if (this.entrustCustom.customsBuyerType == "3") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["customerName"]
              };
              this.entrustCustom["customsContractBuyer"] =
                rowData["customerCode"];
            }
            if (this.entrustCustom.customsBuyerType == "4") {
              this.entrustCustom = {
                ...this.entrustCustom,
                [key]: rowData["supplierName"]
              };
              this.entrustCustom["customsContractBuyer"] =
                rowData["supplierCode"];
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
          case "arrivalCountryName":
            this.entrustCustom = {
              ...this.entrustCustom,
              [key]: rowData["arrivalCountryName"]
            };
            this.entrustCustom["arrivalCountry"] =
              rowData["arrivalCountryCode"];
            break;
          case "taxTypeName":
            this.formPopover.formData.ruleForm["taxTypeName"] =
              rowData["taxCategoryName"];
            this.formPopover.formData.ruleForm["otherTaxRate"] = rowData["tax"];
            break;
          case "exciseTaxRate":
            this.formPopover.formData.ruleForm["exciseTaxRate"] =
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
              this.entrustOrder.status == "1" &&
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
            this.entrustOrder.dayRate = rowData["insideDayRate"]; // 日利率
            // 作为参数
            this.isxymc = true;
            this.popover.curPopStorage.agreementNo = rowData["agreementNo"];
            // 重置协议方案
            this.entrustOrder.agreementSolutionName = ""; //方案名称
            this.entrustOrder.agreementSolutionCode = ""; //编码
            this.entrustOrder.entrustOrderType = ""; //委托订单类型
            this.entrustOrder.reportGateType = ""; // 报关类型
            this.entrustOrder.bizType = ""; //业务类型
            this.entrustOrder.tradeMode = ""; //贸易方式
            this.entrustOrder.dealMode = ""; //成交方式
            this.entrustOrder.invoiceType = ""; //发票类型
            this.entrustOrder.solutionNo = ""; // 公式编码
            // 服务费计算
            this.entrustOrder.serviceCharge = "";
            this.entrustOrder.serviceTaxRate = "";
            this.entrustOrder.serviceFee = "";
            break;
          case "agreementSolutionName": //协议方案
            if (
              this.entrustOrder.status == "1" &&
              this.entrustOrder.agreementSolutionCode &&
              this.entrustOrder.agreementSolutionCode !=
                rowData["solutionNo"] &&
              !this.isCheckRoll
            ) {
              this.TipsClose(rowData, key);
              return;
            }
            this.isCheckRoll = false;
            this.entrustOrder[key] = rowData["solutionName"]; //方案名称
            this.entrustOrder.agreementSolutionCode = rowData["itemCode"]; //编码
            this.entrustOrder.entrustOrderType = rowData["customType"]; //委托订单类型
            this.entrustOrder.reportGateType = "" + rowData["customType"]; //报关类型
            this.entrustOrder.bizType = rowData["businessType"]; // 业务类型
            this.entrustOrder.tradeMode = rowData["tradeType"]; //贸易方式
            this.entrustOrder.dealMode = rowData["establishMode"]; //成交方式
            this.entrustOrder.invoiceType = rowData["invoiceType"]; //发票类型
            this.entrustOrder.solutionNo = rowData.solutionNo; // 公式编码
            // 服务费计算
            this.entrustOrder.serviceCharge = rowData["serviceChargeType"];
            this.entrustOrder.serviceTaxRate = rowData["serviceChargeRate"];
            this.entrustOrder.serviceFee = rowData["serviceCharge"];
            // 最低消费额
            this.entrustOrder.minCharge = rowData["minimumCharge"];
            this.entrustOrder = { ...this.entrustOrder };
            // 锁定 贸易方式、成交方式
            if (this.entrustOrder.entrustOrderType == 4) {
              this.utools.getFromconfigObj(this.entrustOrderKey, "tradeMode")[
                "disabled"
              ] = true;
              this.utools.getFromconfigObj(this.entrustOrderKey, "dealMode")[
                "disabled"
              ] = true;
            } else {
              this.utools.getFromconfigObj(this.entrustOrderKey, "tradeMode")[
                "disabled"
              ] = false;
              this.utools.getFromconfigObj(this.entrustOrderKey, "dealMode")[
                "disabled"
              ] = false;
            }
            break;
          default:
            break;
        }
      }
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
      this.dataTab.columnDataTable = require("@/domain/tableconfig/commerce/Entrust" +
        this.capitalize(name)).default;
      this.dataTab.queryTableData.entrustOrderNo = this.entrustOrder.entrustOrderNo;
      // let con = JSON.parse(JSON.stringify(require("@/domain/formconfig/commerce/Entrust" + this.capitalize(name)).default))
      // console.log(con)
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
      name == "custom" && (this.formPopover.itemName = "受托方收款");
      // 报关信息关联初始化
      if (name == "custom") {
        this.entrustCustom = new ColumnData();
        // 默认讯宇
        this.entrustCustom["businessUnitCode"] = "GSXX2019072300015";
        this.entrustCustom["businessUnitName"] = "深圳市讯宇供应链管理有限公司";
        // 申报单位
        this.entrustCustom["declarationUnitCode"] = "GSXX2019072300015";
        this.entrustCustom["declarationUnitName"] =
          "深圳市讯宇供应链管理有限公司";
        // 收货单位类型
        if (this.head == "single") {
          //单抬头
          this.entrustCustom.receiveUnitType = "1";
          this.entrustCustom.receiveUnitCode = "GSXX2019072300015";
          this.entrustCustom.receiveUnitName = "深圳市讯宇供应链管理有限公司";
        } else if (this.head == "double") {
          // 双抬头
          this.entrustCustom.receiveUnitType = "3";
          this.entrustCustom.receiveUnitCode = this.entrustOrder.customerCode;
          this.entrustCustom.receiveUnitName = this.entrustOrder.customerName;
        }
        this.lockcus();
        if (sessionStorage.getItem("btnType") == "update") {
          api.getEntrustcustom(this.entrustOrder.entrustOrderNo).then(res => {
            if (res && res.data) {
              this.entrustCustom = res.data;
              this.lockcus();
            }
          });
        }
        return;
      }
      this.formPopover.formData.ruleForm = new ColumnData();
      // 切换
      name == "goods" && (this.formPopover.itemName = "商品信息");
      if (name == "goods") {
        try {
          const { data } = await api.getsolutionformula({
            billNo: this.entrustOrder.solutionNo,
            pageIndex: "",
            pageSize: ""
          });
          this.utools.setCalcconfigObj(
            this.formPopover.formData.formConfig,
            data.list
          );
        } catch (error) {
          console.log(error);
        }
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
            } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm,
              status: this.tableDialogWhiteList.includes(this.searchTarget)
                ? "2"
                : ""
            });
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
      let tisj = {
        sellerQuantityCount: val.data.sellerQuantityCount,
        sellerGoodsValueCount: val.data.sellerGoodsValueCount,
        customTotalAmount: val.data.customTaxAmountCount,
        vatTaxAmountCount: val.data.vatTaxAmountCount,
        totalServiceCharge: val.data.serviceFeeCount,
        buyerGoodsValueCount: val.data.buyerGoodsValueCount,
        otherTaxAmountCount: val.data.otherTaxAmountCount,
        priceTaxCount: val.data.priceTaxCount,
        netWeightCount: val.data.netWeightCount,
        grossWeightCount: val.data.grossWeightCount
      };
      // 统计数据加入到主单据中
      this.entrustOrder = { ...this.entrustOrder, ...tisj };
      //卖方销售总货值
      this.entrustOrder.goodsValue = tisj.sellerGoodsValueCount;
      // 增值税合计
      this.entrustOrder.vatTotalAmount = tisj.vatTaxAmountCount;
      // 服务费总和
      this.entrustOrder.totalServiceCharge = tisj.totalServiceCharge;
      // 关税合计
      this.entrustOrder.customTotalAmount = tisj.customTotalAmount;
      // 受托方应付货款总额
      this.entrustOrder.trusteePayGoodsAmount = tisj.sellerGoodsValueCount;
      // 展示表格
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
      let flog = true;
      for (let f = 0; f < this.$refs["formC"].length; f++) {
        this.$refs["formC"][f].$refs["formModel"].validate(valid => {
          if (!valid) {
            flog = false;
          }
        });
      }
      if (!flog) return;
      if (sessionStorage.getItem("btnType") == "update") {
        if (this.isVerify()) {
          this.isLoading = true;
          try {
            const { data } = await api.editentrustorderData(this.entrustOrder);
            if (data) {
              // 提交成功后...
              this.dataTab.tabActiveName = "goods";
              this.dataTab.tabIsDisabled = false;
              this.handlerTabClick({ name: this.dataTab.tabActiveName }); //重新初始化tab
              this.$message.success("操作成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
          }
        }
      } else {
        if (this.isVerify()) {
          try {
            if (
              this.entrustOrder.hasOwnProperty("status") &&
              !this.entrustOrder.status
            )
              delete this.entrustOrder["status"];
            const { data } = await api.addentrustorderData(this.entrustOrder);
            this.isLoading = false;
            if (data) {
              this.$set(this.entrustOrder, "status", "1");
              // 提交成功后...
              sessionStorage.setItem("btnType", "update");
              this.dataTab.tabActiveName = "goods";
              this.dataTab.tabIsDisabled = false;
              this.handlerTabClick({ name: this.dataTab.tabActiveName }); //重新初始化tab
              this.$message.success("保存成功");
            }
          } catch (e) {
            console.log(e);
          } finally {
            this.isLoading = false;
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
          this.formPopover.formData.ruleForm[
            "sellerCurrency"
          ] = this.entrustOrder.supplierCurrency; // 卖方币别
          this.formPopover.formData.ruleForm[
            "buyerCurrency"
          ] = this.entrustOrder.currency; // 买方币别
          this.formPopover.formData.ruleForm[
            "serviceExchangeRate"
          ] = this.entrustOrder.serviceTaxRate; //费率%
          this.formPopover.formData.ruleForm["serviceCurrency"] = "3"; // 服务费币别固定本位币人命币
          // 海关汇率
          if (this.head == "single") {
            //单抬头
            this.formPopover.formData.ruleForm[
              "customsExchangeRate"
            ] = this.entrustOrder.orderExchangeRate; // 海关汇率 = 订单汇率
          } else if (this.head == "double") {
            // 双抬头
            this.formPopover.formData.ruleForm[
              "customsExchangeRate"
            ] = this.entrustOrder.orderExchangeRate; // 海关汇率 = 订单汇率
          }
          this.formPopover.formData.ruleForm["buyerExchangeRate"] =
            Math.round(
              (this.orderExchangeRate / this.currencyExchangeRate) * 10000
            ) / 10000; // 货款汇率 = 订单汇率 / 买方汇率
          if (this.entrustOrderType == "1") {
            this.formPopover.formData.ruleForm["vatTaxRate"] = "1"; // 进口增值税税率  默认13%
            this.formPopover.formData.ruleForm = {
              ...this.formPopover.formData.ruleForm
            };
          }
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
                      // 刷新统计
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
      let flog = true;
      for (let f = 0; f < this.$refs["formD"].length; f++) {
        this.$refs["formD"][f].$refs["formModel"].validate(valid => {
          if (!valid) {
            flog = false;
          }
        });
      }
      if (flog) {
        try {
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
              this.$message.success("操作成功");
              this.handlerTabClick({ name: this.dataTab.tabActiveName });
              this.formPopover.isShowPopover = false;
            }
          }
        } catch (error) {
          this.$message.error("保存失败，请重试！");
          console.log(error);
        }
      }
    },
    async saveCostom() {
      if (this.isVerify()) {
        this.entrustCustom.entrustOrderNo = this.entrustOrder.entrustOrderNo;
        const { data } = await api.addentrustcustomData(this.entrustCustom);
        if (data) {
          // 提交成功后...
          this.$message({ type: "success", message: "保存成功" });
        }
      }
    },
    async rouseFormPopover(key) {
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
    // 商品信息锁定
    lockingcommodity() {
      // 委托订单类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "increaseTaxRate"
      )["disabled"] = false; //关税加征%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "exciseTaxRate"
      )["disabled"] = false; //消费税率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "exciseTaxRate"
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
        "drawbackRate"
      )["disabled"] = false; //退税率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "pieceMum"
      )["disabled"] = true; //件数
      if (
        this.entrustOrderType == "1" ||
        this.entrustOrderType == "3" ||
        this.entrustOrderType == "4" ||
        this.entrustOrderType == "5"
      ) {
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "drawbackRate"
        )["disabled"] = true; //退税率%
      }
      if (
        this.entrustOrderType == "2" ||
        this.entrustOrderType == "3" ||
        this.entrustOrderType == "4" ||
        this.entrustOrderType == "5"
      ) {
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "increaseTaxRate"
        )["disabled"] = true; //关税加征%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "exciseTaxRate"
        )["disabled"] = true; //消费税率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "exciseTaxRate"
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
      if (this.entrustOrderType == "4") {
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "pieceMum"
        )["disabled"] = false; //件数
      }

      // 成交方式
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "freightRate"
      )["disabled"] = false; //运费费率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "premiumRate"
      )["disabled"] = false; //保费费率%
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "extrasRate"
      )["disabled"] = false; //杂费费率%
      if (this.dealMode == "1" && this.entrustOrderType == "2") {
        //FOB && 出口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "freightRate"
        )["disabled"] = true; //运费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "extrasRate"
        )["disabled"] = true; //杂费费率%
      }
      if (this.dealMode == "2" && this.entrustOrderType == "1") {
        //CIF && 进口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "freightRate"
        )["disabled"] = true; //运费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "extrasRate"
        )["disabled"] = true; //杂费费率%
      }
      if (this.dealMode == "3" && this.entrustOrderType == "1") {
        //C&F && 进口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "freightRate"
        )["disabled"] = true; //运费费率%
      }
      if (this.dealMode == "3" && this.entrustOrderType == "2") {
        //C&F && 出口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
      }
      if (this.dealMode == "4" && this.entrustOrderType == "1") {
        //C&I && 进口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
      }
      if (this.dealMode == "4" && this.entrustOrderType == "2") {
        //C&I && 出口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "freightRate"
        )["disabled"] = true; //运费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "extrasRate"
        )["disabled"] = true; //杂费费率%
      }
      if (this.entrustOrderType == "4") {
        //C&I && 出口
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "pieceMum"
        )["disabled"] = true; //运费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "premiumRate"
        )["disabled"] = true; //保费费率%
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "extrasRate"
        )["disabled"] = true; //杂费费率%
      }
    },
    // 锁定报关信息
    lockcus() {
      // -----进口
      // 收货单位类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "receiveUnitType"
      )["disabled"] = true;
      // 收货单位
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "receiveUnitName"
      )["disabled"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "receiveUnitName"
      )["btn"] = false;
      // 进口口岸
      // this.utools.getFromconfigObj(
      //   this.formPopover.formData.formConfig,
      //   "importPortName"
      // )["disabled"] = true;
      // 报关卖方类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sellerType"
      )["disabled"] = true;
      // 报关合同卖方
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sellerName"
      )["disabled"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sellerName"
      )["btn"] = false;
      // ----出口
      // 发货单位类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sendUnitType"
      )["disabled"] = true;
      // 发货单位
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sendUnitName"
      )["disabled"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "sendUnitName"
      )["btn"] = false;
      // FCL/LCF
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "importExportHandoverMode"
      )["disabled"] = true;
      // 出口口岸
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "exportPort"
      )["disabled"] = true;
      // 报关买方类型
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "customsBuyerType"
      )["disabled"] = true;
      // 报关合同买方
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "customsContractBuyerName"
      )["disabled"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "customsContractBuyerName"
      )["btn"] = false;
      // 柜型及数量
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "containerNumber"
      )["disabled"] = true;
      // 抵运国
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "arrivalCountryName"
      )["disabled"] = true;
      this.utools.getFromconfigObj(
        this.formPopover.formData.formConfig,
        "arrivalCountryName"
      )["btn"] = false;
      if (this.entrustOrderType == "1") {
        // ----进口
        // 收货单位类型
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "receiveUnitType"
        )["disabled"] = false;
        // 收货单位
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "receiveUnitName"
        )["disabled"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "receiveUnitName"
        )["btn"] = true;
        // 进口口岸
        // this.utools.getFromconfigObj(
        //   this.formPopover.formData.formConfig,
        //   "importPortName"
        // )["disabled"] = false;
        // 报关卖方类型
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sellerType"
        )["disabled"] = false;
        // 报关合同卖方
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sellerName"
        )["disabled"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sellerName"
        )["btn"] = true;
        this.entrustCustom["sendUnitType"] = "";
        this.entrustCustom["sendUnit"] = "";
        this.entrustCustom["sendUnitName"] = "";
        this.entrustCustom["importExportHandoverMode"] = "";
        this.entrustCustom["exportPort"] = "";
        this.entrustCustom["customsBuyerType"] = "";
        this.entrustCustom["customsContractBuyer"] = "";
        this.entrustCustom["customsContractBuyerName"] = "";
        this.entrustCustom["containerNumber"] = "";
        this.entrustCustom["arrivalCountry"] = "";
        this.entrustCustom["arrivalCountryName"] = "";
        this.entrustCustom = { ...this.entrustCustom };
      }
      if (this.entrustOrderType == "2") {
        // ----出口
        // 发货单位类型
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sendUnitType"
        )["disabled"] = false;
        // 发货单位
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sendUnitName"
        )["disabled"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "sendUnitName"
        )["btn"] = true;
        // FCL/LCF
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "importExportHandoverMode"
        )["disabled"] = false;
        // 出口口岸
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "exportPort"
        )["disabled"] = false;
        // 报关买方类型
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "customsBuyerType"
        )["disabled"] = false;
        // 报关合同买方
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "customsContractBuyerName"
        )["disabled"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "customsContractBuyerName"
        )["btn"] = true;
        // 柜型及数量
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "containerNumber"
        )["disabled"] = false;
        // 抵运国
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "arrivalCountryName"
        )["disabled"] = false;
        this.utools.getFromconfigObj(
          this.formPopover.formData.formConfig,
          "arrivalCountryName"
        )["btn"] = true;
        this.entrustCustom["receiveUnitType"] = "";
        this.entrustCustom["receiveUnitCode"] = "";
        this.entrustCustom["receiveUnitName"] = "";
        this.entrustCustom["importPortName"] = "";
        this.entrustCustom["sellerType"] = "";
        this.entrustCustom["sellerCode"] = "";
        this.entrustCustom["sellerName"] = "";
        this.entrustCustom = { ...this.entrustCustom };
      }
    },
    //  规格型号 带出
    onArrivalGoodsModel(rowData) {
      // this.formPopover.formData.ruleForm["arrivalGoodsModel"] = rowData["specificationType"]; //来货规格型号
      this.formPopover.formData.ruleForm["orderModel"] =
        rowData["materielCode"]; //来货编码
      this.formPopover.formData.ruleForm["arrivalGoodsName"] =
        rowData["tradeName"]; //来货名称
      this.formPopover.formData.ruleForm["goodsCode"] = rowData["materielCode"]; //商品编码
      this.formPopover.formData.ruleForm["goodsName"] = rowData["tradeName"]; //商品名称
      this.formPopover.formData.ruleForm["sellerUnit"] =
        rowData["measurementUnit"]; //成交单位编码
      this.formPopover.formData.ruleForm["sellerUnitName"] =
        rowData["measurementUnitName"]; //成交单位
      this.formPopover.formData.ruleForm["arrivalGoodsCode"] =
        rowData["materielCode"];
      api.getMaterielCustomAll().then(res => {
        res.data.list.forEach(element => {
          if (element.materielCode == rowData["materielCode"]) {
            this.formPopover.formData.ruleForm["taxNo"] = element.taxNo; // 税号
            this.formPopover.formData.ruleForm["attachNo"] = element.attachNo; // 附号
            this.formPopover.formData.ruleForm["customTaxRate"] =
              element.customsRate; // 关税税率
            this.formPopover.formData.ruleForm["increaseTaxRate"] =
              element.levyRate; // 关税加征
              // 监管条件
              this.formPopover.formData.ruleForm["superviseMode"] = superCondition
              this.formPopover.formData.ruleForm["superviseModeName"] = {...this.formPopover.formData.ruleForm, ['superviseModeName']: superConditionName}
          }
        });
      });
    },
    // 规格型号 清空
    toArrivalGoodsModel() {
      // this.formPopover.formData.ruleForm["arrivalGoodsModel"] = ''; //来货规格型号
      this.formPopover.formData.ruleForm["orderModel"] = ""; //来货编码
      this.formPopover.formData.ruleForm["arrivalGoodsName"] = ""; //来货名称
      this.formPopover.formData.ruleForm["goodsCode"] = ""; //商品编码
      this.formPopover.formData.ruleForm["goodsName"] = ""; //商品名称
      this.formPopover.formData.ruleForm["sellerUnit"] = ""; //成交单位编码
      this.formPopover.formData.ruleForm["sellerUnitName"] = ""; //成交单位
      this.formPopover.formData.ruleForm["arrivalGoodsCode"] = "";
      this.formPopover.formData.ruleForm["taxNo"] = ""; // 税号
      this.formPopover.formData.ruleForm["attachNo"] = ""; // 附号
      this.formPopover.formData.ruleForm["customTaxRate"] = ""; // 关税税率
      this.formPopover.formData.ruleForm["increaseTaxRate"] = ""; // 关税加征
    },
    // 回调验证规则
    handlerFormVerify($refs) {
      this.verify = $refs;
    },
    // 验证规则
    isVerify() {
      let isVerify = true;
      return isVerify;
    },
    handlebackspacing() {
      this.$router.push("M0402");
    },
    // 第一个字母转大写
    capitalize([first, ...rest]) {
      return first.toUpperCase() + rest.join("");
    },
    // 给定日期 查询汇率
    async getexchangeratetodata(data, currency) {
      if (currency == "人民币") {
        return "1.0000";
      }
      try {
        const vdata = await api.gettimeExchangerate(data);
        var list = vdata.data
        for (let i = 0; i < list.length; i++) {
          var exchangerate = "";
          list.forEach(b => {
              if (currency == b.currency) {
                exchangerate = Math.round((b.cenPrice / 100) * 10000) / 10000;
              }
            });
            return exchangerate;
        }
        this.$message.warning("请录入系统汇率");
      } catch (e) {
        console.log(e);
      }
      // try {
      //   const {
      //     data: { list }
      //   } = await api.getExchangerate({});
      //   for (let i = 0; i < list.length; i++) {
      //     if (data == list[i].date.slice(0, 10)) {
      //       var exchangerate = "";
      //       list[i].rate.forEach(b => {
      //         if (currency == b.currency) {
      //           exchangerate = Math.round((b.cenPrice / 100) * 10000) / 10000;
      //         }
      //       });
      //       return exchangerate;
      //     }
      //   }
      //   this.$message.warning("请录入系统汇率");
      // } catch (e) {
      //   console.log(e);
      // }
    }
  },
  async created() {
    api.initSelect(this.entrustOrderKey);
    api.initSelect(this.entrustOrderKey7);
    this.writeback = true;
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
    const { formData = {} } = this.getActivePathData(this.$route.path) || {};
    if (formData) {
      Object.assign(this.entrustOrder, formData);
    }
    if (sessionStorage.getItem("btnType") == "create") {
      this.loadCodeNo(); //加载编号
      // 默认讯宇
      this.entrustOrder.trusteeCode = "GSXX2019072300015";
      this.entrustOrder.trusteeName = "深圳市讯宇供应链管理有限公司";
      // 采购组织默认操作人
      if (localStorage.userCode) {
        try {
          let { data } = await api.querySearch("/user", {
            userCode: localStorage.userCode
          });
          if (data.list.length > 0) {
            this.entrustOrder.departmentCode = data.list[0].department;
            this.entrustOrder.purchaseUnitCode = data.list[0].department;
            this.entrustOrder.purchaseUnitName = data.list[0].departmentName;
          }
        } catch (e) {
          console.log(e);
        }
      }
      // 签订日期
      this.entrustOrder.signDate =
        new Date().toJSON().slice(0, 10) + " 00:00:00";
    } else {
      this.dataTab.tabIsDisabled = false;
      this.dataTab.tabActiveName = "goods"; // 默认
      this.handlerTabClick({ name: "goods" }); //初始化tab
    }
    this.$nextTick(function() {
      this.writeback = false;
    });
  },
  watch: {
    // 委托订单类型
    entrustOrderType: {
      handler(newVal, oldVal) {
        // 业务类型下拉
        if (newVal && this.sellist.length > 0) {
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
          if (this.entrustOrderType == "5") {
            sel.push(this.sellist[4]);
            sel.push(this.sellist[5]);
          }
          this.utools.setFromconfigOption(this.entrustOrderKey, "bizType", sel);
        }
        // 报关数据
        if (newVal && this.dataTab.tabActiveName == "custom") {
          this.lockcus();
        }
      },
      deep: true
    },
    // 销售币别
    supplierCurrency: {
      async handler(newVal, oldVal) {
        if (newVal) {
          if (this.writeback) return;
          // 订单汇率 = 卖方汇率
          if (!this.signDate) return;
          let data = this.signDate.slice(0, 10);
          let currency = this.utools.gecongfig(
            this.entrustOrderKey,
            "supplierCurrency",
            this.supplierCurrency
          );
          this.entrustOrder.orderExchangeRate = await this.getexchangeratetodata(
            data,
            currency
          );
          //
          this.entrustOrder.goodsValuecurrency = newVal;
          this.entrustOrder.trusteePayGoodsAmountcurrency = newVal;
          this.entrustOrder.refundCustomerAmountcurrency = newVal;
          this.entrustOrder.paidGoodsAmountcurrency = newVal;
        } else {
          this.entrustOrder.orderExchangeRate = "";
          this.entrustOrder.goodsValuecurrency = "";
          this.entrustOrder.trusteePayGoodsAmountcurrency = "";
          this.entrustOrder.refundCustomerAmountcurrency = "";
          this.entrustOrder.paidGoodsAmountcurrency = "";
        }
      },
      deep: true
    },
    currency: {
      async handler(newVal, oldVal) {
        if (newVal) {
          if (this.writeback) return;
          // 买方汇率
          if (!this.signDate) return;
          let data = this.signDate.slice(0, 10);
          let currency = this.utools.gecongfig(
            this.entrustOrderKey,
            "currency",
            this.currency
          );
          this.entrustOrder.currencyExchangeRate = await this.getexchangeratetodata(
            data,
            currency
          );
          //
          this.$set(this.entrustOrder, "vatTotalAmountcurrency", newVal);
          this.$set(this.entrustOrder, "totalServiceChargecurrency", newVal);
          this.$set(this.entrustOrder, "customTotalAmountcurrency", newVal);
          this.$set(this.entrustOrder, "invoiceAmountcurrency", newVal);
          this.$set(this.entrustOrder, "advanceActualAmountcurrency", newVal);
        } else {
          this.$set(this.entrustOrder, "vatTotalAmountcurrency", "");
          this.$set(this.entrustOrder, "totalServiceChargecurrency", "");
          this.$set(this.entrustOrder, "customTotalAmountcurrency", "");
          this.$set(this.entrustOrder, "invoiceAmountcurrency", "");
          this.$set(this.entrustOrder, "advanceActualAmountcurrency", "");
        }
      },
      deep: true
    },
    signDate: {
      async handler(newVal, oldVal) {
        if (newVal) {
          if (this.writeback) return;
          // 订单汇率 = 卖方汇率
          if (!this.entrustOrder.supplierCurrency) return;
          let data = this.signDate.slice(0, 10);
          let currency = this.utools.gecongfig(
            this.entrustOrderKey,
            "supplierCurrency",
            this.supplierCurrency
          );
          this.entrustOrder.orderExchangeRate = await this.getexchangeratetodata(
            data,
            currency
          );
          // 买方汇率
          if (!this.entrustOrder.currency) return;
          let data1 = this.signDate.slice(0, 10);
          let currency1 = this.utools.gecongfig(
            this.entrustOrderKey,
            "currency",
            this.currency
          );
          this.entrustOrder.currencyExchangeRate = await this.getexchangeratetodata(
            data1,
            currency1
          );
        }
      },
      deep: true
    },
    "formPopover.formData.ruleForm": {
      handler(newVal, oldVal) {
        if (this.dataTab.tabActiveName == "goods") {
          this.utools.resCalcConfig(
            this.formPopover.formData.ruleForm,
            this.formPopover.formData.formConfig,
            this.entrustOrder
          );
        }
      },
      deep: true
    },
    invoiceAmount: {
      handler(newVal, oldVal) {
        this.$set(this.entrustOrder, "invoiceAmount", newVal.toFixed(2));
      },
      deep: true
    },
    advanceAmount: {
      handler(newVal, oldVal) {
        this.$set(this.entrustOrder, "advanceAmount", newVal.toFixed(2));
      },
      deep: true
    },
    minimumCharge: {
      handler(newVal, oldVal) {
        this.$set(this.entrustOrder, "minimumCharge", newVal);
      },
      deep: true
    },
    //受托方应付货款总额
    "entrustOrder.matPayment": {
      handler(newVal, oldVal) {
        if (newVal) {
          this.$set(
            this.entrustOrder,
            "trusteePayGoodsAmount",
            this.entrustOrder.goodsValue
          );
        } else {
          this.$set(this.entrustOrder, "trusteePayGoodsAmount", "");
        }
      },
      deep: true
    },
    "formPopover.formData.ruleForm.arrivalGoodsModel": {
      async handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (newVal) {
            // 录入
            try {
              const { data } = await api.getList("materielbase", {
                specificationType: newVal,
                pageIndex: "",
                pageSize: ""
              });
              if (data.list.length > 0) {
                // 录入
                this.onArrivalGoodsModel(data.list[0]);
                // this.onbrandNameorder()
              } else {
                // 清除
                this.toArrivalGoodsModel();
                // this.tobrandNameorder()
              }
            } catch (e) {
              console.log(e);
            }
          } else {
            // 清除
            this.toArrivalGoodsModel();
            // this.tobrandNameorder()
          }
        }
      },
      deep: true
    }
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      // title: "/委托订单信息",
      data: {
        formData: this.entrustOrder,
        status:
          sessionStorage.getItem("btnType") == "update" ? "update" : "create"
      },
      path: this.$route.path
    });
    next();
  }
};
</script>
<style lang="less">
.EntrustOrderForm {
  .entrustOrderNametitle {
    display: inline-block;
    width: 100%;
    text-align: center;
    line-height: 32px;
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
  .diawtd {
    max-height: 70vh;
    overflow: auto;
  }
}
</style>