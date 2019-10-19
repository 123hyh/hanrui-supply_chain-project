
import api from "../../api";
import utils from "../../util/config";
// 主表
import companyinfo from "../companyinfo/table";
import companyinfoRuleConfigs from "../companyinfo/rule";
import department from "../department/table";
import departmentRuleConfigs from "../department/rule";
import client from "../client/table";
import clientRuleConfigs from "../client/rule";
import clientcontact from "../clientcontact/table";
import clientcontactRuleConfigs from "../clientcontact/rule";
import supplierbase from "../supplierbase/table";
import supplierbaseRuleConfigs from "../supplierbase/rule";
import suppliercontact from "../suppliercontact/table";
import suppliercontactRuleConfigs from "../suppliercontact/rule";
import customer from "../customer/table";
import customerRuleConfigs from "../customer/rule";
import agreement from "../agreement/table";
import agreementRuleConfigs from "../agreement/rule";
import agreementsolution from "../agreementsolution/table";
import agreementsolutionRuleConfigs from "../agreementsolution/rule";
// 商品
import materielbase from "../materielbase/table";
import materielbaseRuleConfigs from "../materielbase/rule";
import brand from "../brand/table";
import brandRuleConfigs from "../brand/rule";
import origin from "../origin/table";
import originRuleConfigs from "../origin/rule";
import measurement from "../measurement/table";
import measurementRuleConfigs from "../measurement/rule";
import supervisioncondition from "../supervisioncondition/table";
import supervisionconditionRuleConfigs from "../supervisioncondition/rule";
import taxcategory from "../taxcategory/table";
import taxcategoryRuleConfigs from "../taxcategory/rule";
import arrivalcountry from "../arrivalcountry/table";
import arrivalcountryRuleConfigs from "../arrivalcountry/rule";
import materielorigin from "../materielorigin/table";
import materieloriginRuleConfigs from "../materielorigin/rule";


const TABLE_lIMIT = {
  clientContactName: {
    must: "clientCode",
    news: "委托方不能为空"
  },
  supplierContactName: {
    must: "supplierCode",
    news: "供应商不能为空"
  },
  agreementName: {
    must: "clientCode",
    news: "委托方不能为空"
  },
  agreementSolutionName: {
    must: "agreementCode",
    news: "协议管理不能为空"
  },
  receiveUnitName: {
    must: "receiveUnitType",
    news: "收货单位类型不能为空"
  },
  sellerName: {
    must: "sellerType",
    news: "报关卖方类型不能为空"
  },
  sendUnitName: {
    must: "sendUnitType",
    news: "发货单位类型不能为空"
  },
  customsContractBuyerName: {
    must: "customsBuyerType",
    news: "报关买方类型不能为空"
  },
  brandNameorder: {
    must: "arrivalGoodsModel",
    news: "请青选择你要查看的来货规格型号"
  },
  sourceAreaNameorder: {
    must: "arrivalGoodsModel",
    news: "请选择你要查看的来货规格型号"
  },
  customsGoodsCode: {
    must: "customsGoodsCode",
    news: "请输入归类信息"
  },
};

const TABLE_RULE = {
  clientContactName: {
    clientNo: "clientCode",
  },
  supplierContactName: {
    supplierCode: "supplierCode",
  },
  agreementName: {
    customerCode: "clientCode",
  },
  agreementSolutionName: {
    agreementNo: "agreementCode",
  },
  brandNameorder: {
    specificationType: "arrivalGoodsModel",
  },
  sourceAreaNameorder: {
    specificationType: "arrivalGoodsModel",
  },
};

const TABLE_UPPER = {
  receiveUnitName: {
    judge: "receiveUnitType",
    choice: {
      '1': 'declarationUnitName',
      '2': 'clientName',
      '3': 'customerName',
      '4': 'supplierName',
    },
    value:{
      '1': {
        receiveUnitCode: "companyCode",
        receiveUnitName: "companyName"
      },
      '2': {
        receiveUnitCode: "clientNo",
        receiveUnitName: "clientName",
      },
      '3': {
        receiveUnitCode: "customerNo",
        receiveUnitName: "customerName",
      },
      '4': {
        receiveUnitCode: "supplierCode",
        receiveUnitName: "supplierName",
      },
    }
  },
  sellerName: {
    judge: "sellerType",
    choice: {
      '1': 'declarationUnitName',
      '2': 'clientName',
      '3': 'customerName',
      '4': 'supplierName',
    },
    value:{
      '1': {
        sellerCode: "companyCode",
        sellerName: "companyName"
      },
      '2': {
        sellerCode: "clientNo",
        sellerName: "clientName",
      },
      '3': {
        sellerCode: "customerNo",
        sellerName: "customerName",
      },
      '4': {
        sellerCode: "supplierCode",
        sellerName: "supplierName",
      },
    }
  },
  sendUnitName: {
    judge: "sendUnitType",
    choice: {
      '1': 'declarationUnitName',
      '2': 'clientName',
      '3': 'customerName',
      '4': 'supplierName',
    },
    value:{
      '1': {
        sendUnit: "companyCode",
        sendUnitName: "companyName"
      },
      '2': {
        sendUnit: "clientNo",
        sendUnitName: "clientName",
      },
      '3': {
        sendUnit: "customerNo",
        sendUnitName: "customerName",
      },
      '4': {
        sendUnit: "supplierCode",
        sendUnitName: "supplierName",
      },
    }
  },
  customsContractBuyerName: {
    judge: "customsBuyerType",
    choice: {
      '1': 'declarationUnitName',
      '2': 'clientName',
      '3': 'customerName',
      '4': 'supplierName',
    },
    value:{
      '1': {
        customsContractBuyer: "companyCode",
        customsContractBuyerName: "companyName"
      },
      '2': {
        customsContractBuyer: "clientNo",
        customsContractBuyerName: "clientName",
      },
      '3': {
        customsContractBuyer: "customerNo",
        customsContractBuyerName: "customerName",
      },
      '4': {
        customsContractBuyer: "supplierCode",
        customsContractBuyerName: "supplierName",
      },
    }
  },
};

const TABLE_CONFIGS = {
  trusteeName: {
    title: "公司列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: companyinfoRuleConfigs,
    configs: companyinfo
  },
  purchaseUnitName: {
    title: "部门列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: departmentRuleConfigs,
    configs: department
  },
  clientName: {
    title: "委托方列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: clientRuleConfigs,
    configs: client
  },
  clientContactName: {
    title: "委托方联系人列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: clientcontactRuleConfigs,
    configs: clientcontact
  },
  supplierName: {
    title: "供应商列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: supplierbaseRuleConfigs,
    configs: supplierbase
  },
  supplierContactName: {
    title: "供应商联系人列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: suppliercontactRuleConfigs,
    configs: suppliercontact
  },
  customerName: {
    title: "客户列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: customerRuleConfigs,
    configs: customer
  },
  agreementName: {
    title: "协议列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: agreementRuleConfigs,
    configs: agreement
  },
  agreementSolutionName: {
    title: "协议方案列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: agreementsolutionRuleConfigs,
    configs: agreementsolution
  },
  arrivalGoodsModel:{
    title: "物料基础信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materielbaseRuleConfigs,
    configs: materielbase
  },
  orderModel:{
    title: "物料基础信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materielbaseRuleConfigs,
    configs: materielbase
  },
  brandName:{
    title: "品牌列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: brandRuleConfigs,
    configs: brand
  },
  sourceAreaName:{
    title: "原产地列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: originRuleConfigs,
    configs: origin
  },
  sellerUnitName:{
    title: "单位列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: measurementRuleConfigs,
    configs: measurement
  },
  superviseModeName:{
    title: "监管方式列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: supervisionconditionRuleConfigs,
    configs: supervisioncondition
  },
  exciseTaxRate:{
    title: "税种信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: taxcategoryRuleConfigs,
    configs: taxcategory
  },
  taxTypeName:{
    title: "税种信息列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: taxcategoryRuleConfigs,
    configs: taxcategory
  },
  businessUnitName: {
    title: "公司列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: companyinfoRuleConfigs,
    configs: companyinfo
  },
  declarationUnitName: {
    title: "公司列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: companyinfoRuleConfigs,
    configs: companyinfo
  },
  arrivalCountryName: {
    title: "抵运国列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: arrivalcountryRuleConfigs,
    configs: arrivalcountry
  },
  settlementUnitName: {
    title: "公司列表",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: companyinfoRuleConfigs,
    configs: companyinfo
  },
  brandNameorder: {
    title: "品牌记录",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materieloriginRuleConfigs,
    configs: materielorigin
  },
  sourceAreaNameorder: {
    title: "产地记录",
    ruleData:{ ...utils.inntTable(), status: "2" },
    ruleConfigs: materieloriginRuleConfigs,
    configs: materielorigin
  },
};

const TABLE_WRITE = {
  trusteeName: {
    trusteeCode: "companyCode",
    trusteeName: "companyName"
  },
  purchaseUnitName: {
    purchaseUnitCode: "departmentCode",
    purchaseUnitName: "departmentName"
  },
  clientName: {
    clientCode: "clientNo",
    clientName: "clientName",
    salesmanId: "orderReceiverCode",
    salesmanName: "orderReceiverName",
    followPersonId: "orderFollowerCode",
    followPersonName: "orderFollowerName",
    clientContactName: "",
    // clientTel: "",
    // clientPhone: "",
    agreementCode: "",
    agreementName: ""
  },
  clientContactName: {
    clientContactName: "leader",
    clientTel: "tel",
    clientPhone: "phone"
  },
  supplierName: {
    supplierCode: "supplierCode",
    supplierName: "supplierName",
    supplierContactName: "",
    // supplierTel: "",
    // supplierPhone: ""
  },
  supplierContactName: {
    supplierContactName: "contact",
    supplierTel: "tel",
    supplierPhone: "phone"
  },
  customerName: {
    customerCode: "customerNo",
    customerName: "customerName",
  },
  agreementName: {
    agreementCode: "agreementNo",
    agreementName: "agreementName",
    dayRate: "insideDayRate", // 日利率
    agreementSolutionCode: "",
    agreementSolutionName: "",//方案名称
    // entrustOrderType: "",// 委托订单类型
    // reportGateType: "", // 报关类型
    // bizType: "",//业务类型
    // tradeMode: "",//贸易方式
    // dealMode: "",//成交方式
    // invoiceType: "",//发票类型
    // solutionNo: "",//公式编码
    // serviceCharge: "",//种类
    // serviceTaxRate: "",//服务费率
    // serviceFee: "",//定额服务费
  },
  agreementSolutionName:{
    agreementSolutionCode: "itemCode",
    agreementSolutionName: "solutionName",
    entrustOrderType: "customType",// 委托订单类型
    reportGateType: "customType", // 报关类型
    bizType: "businessType",//业务类型
    tradeMode: "tradeType",//贸易方式
    dealMode: "establishMode",//成交方式
    solutionNo: "solutionNo",//公式编码
    serviceCharge: "serviceChargeType",//种类
    serviceTaxRate: "serviceChargeRate",//服务费率
    serviceFee: "serviceCharge",//定额服务费
    invoiceType: "invoiceType",//发票类型
    matPayment: "matPayment",//是否垫货款
    minCharge: "minimumCharge",//低消金额
  },
  arrivalGoodsModel:{
    arrivalGoodsModel: "specificationType",//来货规格型号
  },
  orderModel:{
    arrivalGoodsModel: "specificationType",//来货规格型号
  },
  brandName:{
    brand: "brandCode",
    brandName: "brandName",
  },
  sourceAreaName:{
    sourceArea: "originCode",
    sourceAreaName: "originName",
  },
  sellerUnitName:{
    sellerUnit: "measurementCode",
    sellerUnitName: "measurementUnit",
  },
  superviseModeName:{
    superviseMode: "billCode",
    superviseModeName: "billName",
  },
  exciseTaxRate:{
    exciseTaxRate: "tax",
    originName: "originName",
  },
  taxTypeName:{
    taxTypeName: "taxCategoryName",
    otherTaxRate: "tax",
  },
  businessUnitName: {
    businessUnitCode: "companyCode",
    businessUnitName: "companyName"
  },
  declarationUnitName: {
    declarationUnitCode: "companyCode",
    declarationUnitName: "companyName"
  },
  arrivalCountryName: {
    arrivalCountry: "arrivalCountryCode",
    arrivalCountryName: "arrivalCountryName"
  },
  settlementUnitName: {
    settlementUnit: "companyCode",
    settlementUnitName: "companyName"
  },

};

export default {
  /**
   * @param {名称} 点选限制
   */
  limitSelectionTable(data, item) {
    if (TABLE_lIMIT[item.name] && !data[TABLE_lIMIT[item.name]["must"]]) {
      return TABLE_lIMIT[item.name]["news"];
    } else {
      return "";
    }
  },
  
  /**
  * @param {名称} 点选配置条件
  */
  getSelectionTableRule(data, item) {
    if (TABLE_UPPER[item.name]) {
      var tableDialog = TABLE_CONFIGS[TABLE_UPPER[item.name]["choice"][data[TABLE_UPPER[item.name]["judge"]]]];
    } else {
      var tableDialog = TABLE_CONFIGS[item.name];
    }
    for (let key in TABLE_RULE[item.name]) {
      if (data.hasOwnProperty(TABLE_RULE[item.name][key])) {
        tableDialog.ruleData[key] = data[TABLE_RULE[item.name][key]];
      } else {
        tableDialog.ruleData[key] = "";
      }
    }
    return tableDialog
  },

  /**
    * @param {名称} 点选列表
    */
   async getSelectionTableList(tableDialog) {
    try {
      const { list, count } = (await api.getList(
        tableDialog.configs["api"],
        tableDialog.ruleData
      ))['data'];
      (tableDialog.data = list), (tableDialog.count = count);
        return tableDialog;
      } catch (error) {
        return Promise.reject(error);
      }
  },

  /**
   * @param {名称} 点选数据
   */
  async getSelectionTable(data, item) {
    if (TABLE_UPPER[item.name]) {
      var tableDialog = TABLE_CONFIGS[TABLE_UPPER[item.name]["choice"][data[TABLE_UPPER[item.name]["judge"]]]];
    } else {
      var tableDialog = TABLE_CONFIGS[item.name];
    }
    for (let key in TABLE_RULE[item.name]) {
      if (data.hasOwnProperty(TABLE_RULE[item.name][key])) {
        tableDialog.ruleData[key] = data[TABLE_RULE[item.name][key]];
      } else {
        tableDialog.ruleData[key] = "";
      }
    }
    try {
      const { list, count } = (await api.getList(
        tableDialog.configs["api"],
        tableDialog.ruleData
      ))['data'];
      (tableDialog.data = list), (tableDialog.count = count);
      return tableDialog;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   * @param {名称} 切换条件
   */
  async changeSelectionTable(item, ruleData) {
    var tableDialog = TABLE_CONFIGS[item.name];
    tableDialog.ruleData = ruleData;
    try {
      const { list, count } = (await api.getList(
        tableDialog.configs["api"],
        tableDialog.ruleData
      ))['data'];
      (tableDialog.data = list), (tableDialog.count = count);
      return tableDialog;
    } catch (error) {
      return Promise.reject(error);
    }
  },

  /**
   * @param {名称} 点选回写
   */
  async writeSelectionTable(item, currentRow, data) {
    if (TABLE_UPPER[item.name]) {
      var tableRow = TABLE_UPPER[item.name]["value"][data[TABLE_UPPER[item.name]["judge"]]];
    } else {
      var tableRow = TABLE_WRITE[item.name];
    }
    var writeVla = {};
    for (let key in tableRow) {
      if (currentRow.hasOwnProperty(tableRow[key])) {
        writeVla[key] = currentRow[tableRow[key]];
      } else {
        writeVla[key] = "";
      }
    }
    await this.apiWriteSelectionTable(writeVla, item, currentRow);
    return writeVla;
  },

  /**
   * @param {名称} 接口回写
   */
  async apiWriteSelectionTable(writeVla, item, currentRow) {
    if (item.name == "supplierName") {
      // 卖方币别
      try {
        const { currency='' } = (await api.getVal("supplierfinance/searchOne/"+currentRow.supplierCode))['data'] || {};
        writeVla.supplierCurrency = currency;
      } catch (error) {
        return Promise.reject(error);
      }
    }
    if (item.name == "customerName") {
      // 买方币别
      try {
        const { settlementCurrency='' } = (await api.getVal('customerfinance/searchOne?customerNo='+currentRow.customerNo))['data'] || {};
        writeVla.currency = settlementCurrency;
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
};
