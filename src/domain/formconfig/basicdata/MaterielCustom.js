import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
  /* {
		type: 'string',
		key: "materielCode",
		name: "物料基础信息",
		prop: "materielCode",
		btn: true,
		rules
	}, */
  /* 	{
		type: 'string',
		key: "materielCustomCode",
		name: "物料信息编码",
		prop: "materielCustomCode"
	}, */
  {
    type: "string",
    key: "customsAbbreviation",
    name: "海关商品名称",
    prop: "customsAbbreviation",
    rules
  },
  {
    type: "string",
    key: "customsAlias",
    name: "海关别名",
    prop: "customsAlias"
  },
  {
    type: "string",
    key: "foreignName",
    name: "海关商品外文名称",
    prop: "foreignName"
  },
  {
    type: "string",
    key: "customsCode",
    name: "海关商品编码",
    prop: "customsCode",
    btn: true,
    rules
  },
  {
    type: "string",
    key: "declareElements",
    prop: "declareElements",
    name: "申报要素",
    rules
  },
  {
    type: "number",
    key: "customsRate",
    name: "海关税率(%)",
    prop: "customsRate",
    rules
  },
  {
    type: "number",
    key: "levyRate",
    name: "加征税率(%)",
    prop: "levyRate"
  },
  {
    type: "number",
    key: "maxRate",
    name: "最高税率(%)",
    prop: "maxRate",
    isShow: true,
    rules
  },
  {
    type: "number",
    key: "rebateRate",
    name: "出口退税率(%)",
    prop: "rebateRate"
  },
  {
    type: "number",
    key: "averagePrice",
    name: "平均价单价",
    prop: "averagePrice"
  },
  {
    type: "number",
    key: "maxPrice",
    name: "最高单价",
    prop: "maxPrice"
  },
  {
    type: "number",
    key: "minPrice",
    name: "最低单价",
    prop: "minPrice"
  },
  {
    type: "number",
    key: "totalNo",
    name: "总数量值",
    prop: "totalNo"
  },
  {
    type: "string",
    key: "taxNo",
    name: "税号",
    prop: "taxNo",
    rules
  },
  {
    type: "string",
    key: "attachNo",
    name: "附号",
    prop: "attachNo"
  },
  {
    btn: true,
    readonly: true,
    type: "string",
    key: "superCondition",
    name: "监管条件",
    prop: "superCondition"
  },
  {
    type: "string",
    key: "declaredModel",
    name: "申报型号",
    prop: "declaredModel",
    rules
  },
  {
    type: "string",
    key: "remarks",
    name: "审核备注",
    prop: "remarks"
  },
  {
    type: "checkbox",
    key: "verify",
    name: "申报型号审核",
    prop: "verify"
  },
  {
    type: "number",
    key: "vatTaxRate",
    name: "增值税率",
    prop: "vatTaxRate",
    isShow: true
  },
  {
    type: "number",
    key: "generalTax",
    prop: "generalTax",
    name: "普通进口税率"
  },
  {
    type: "number",
    key: "temporaryTax",
    prop: "temporaryTax",
    name: "暂定进口税率"
  },
  {
    type: "number",
    key: "exciseTaxRate",
    prop: "exciseTaxRate",
    name: "消费税率"
  },
  {
    type: "number",
    key: "expTax",
    prop: "expTax",
    name: "出口关税率",
    isShow: true
  },
  {
    type: "string",
    key: "custFirstUnit", //custFirstUnit
    prop: "custFirstUnit",
    name: "法定第一单位名称",
    btn: true,
    readonly: true
  },
  /* {
    type: 'string',
    key: 'custFirstNums',
    prop: 'custFirstNums',
    name: '法定第一单位代码'
  }, */
  {
    type: "string",
    key: "custSecondUnit", //custSecondUnit
    prop: "custSecondUnit",
    name: "法定第二单位名称",
    readonly: true,
    btn: true
  },
  /* {
    type: 'number',
    key: 'custSecondNums',
    prop: 'custSecondNums',
    name: '法定第二单位代码'
  }, */
  {
    type: "string",
    key: "originCountryName", // originCountry
    prop: "originCountryName",
    name: "原产国（地区）",
    btn: true,
    readonly: true
  },
  {
    type: "string",
    key: "domesticDestinationName", // domesticDestination
    prop: "domesticDestinationName",
    name: "境内目的地",
    btn: true,
    readonly: true
  },
  {
    type: "string",
    key: "goodsPlaceName", // goodsPlace
    prop: "goodsPlaceName",
    name: "境内货源地",
    btn: true,
    readonly: true
  },
  {
    type: "string",
    key: "finalCountryName", // finalCountry
    prop: "finalCountryName",
    name: "最终目的国",
    btn: true,
    readonly: true
  },
  {
    type: "select",
    selectKey: "has",
    selectOption: [],
    key: "controlledGoods",
    prop: "controlledGoods",
    name: "管制品"
  },
  {
    type: "string",
    key: "exemptionName",
    prop: "exemptionName",
    name: "征免性质",
    btn: true,
    readonly: true
  },
  {
    type: "select",
    selectKey: "exportEnjoyment",
    selectOption: [],
    key: "exportEnjoyment",
    prop: "exportEnjoyment",
    name: "出口享惠情况"
  },
  {
    type: "select",
    selectKey: "has",
    selectOption: [],
    key: "needInspection",
    prop: "needInspection",
    name: "该商品需检验检疫"
  }
];
