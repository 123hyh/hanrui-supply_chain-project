import validate from "@/domain/common/validate"
const rules = validate.setRequired();
export default [{
  // disabled: true,
  readonly: true,
  type: 'string',
  key: "planOrderNo",
  name: "计划单编号",
  prop: "planOrderNo",
  rules
},
{
  type: 'select',
  key: 'source',
  prop: 'source',
  name: '源单据来源',
  selectOption: [
    { itemKey: '1', itemValue: '香港上货计划' }
  ]
},
{
  type: 'string',
  btn: true,
  key: "scheduleBaseCode",
  name: "上货计划",
  prop: "scheduleBaseCode",
  readonly: true,
},
{
  type: 'string',
  btn: true,
  key: "deliveryOrderNo",
  name: "提运单号",
  prop: "deliveryOrderNo",
  readonly: true,
},
// {
//   readonly: true,
//   type: 'string',
//   btn: true,
//   key: "entrustOrderNo",
//   name: "委托单",
//   prop: "entrustOrderNo",
//   rules
// },
{
  type: 'checkbox',
  key: "depart",
  name: "已发车",
  prop: "depart",
},
{
  type: 'select',
  selectOption: [],
  selectKey: "entrustOrderType",
  key: "customTitle",
  name: "报关抬头",
  prop: "customTitle",
  rules
},
// {
// 	type: 'select',
// 	selectOption: [],
// 	key: "status",
// 	selectKey: "orderStatus",
// 	name: "单据状态",
// 	prop: "status",
// 	disabled: true,
// },
// 	{
// 		type: 'string',
// 		btn: false,
// 		key: "waitCustomList",
// 		name: "待报关列表",
// 		prop: "waitCustomList",
// 		disabled: true,
// 		readonly: true
// 	},
{
  type: 'select',
  selectOption: [],
  selectKey: "transactionMode",
  key: "dealMode",
  name: "成交方式",
  prop: "dealMode",
},
/* {
  type: 'string',
  key: "customOrderPrice",
  name: "订单价格",
  prop: "customOrderPrice",
  rules: [{
    required: true, message: '必填', trigger: 'blur',
    validator: validate.validateNum,
    trigger: ['blur', 'change']
  }]
}, */
{
  type: 'select',
  selectOption: [],
  key: "customType",
  selectKey: "declareCustoms",
  name: "报关类型",
  prop: "customType",
  // rules
},
{
  type: 'select',
  selectOption: [],
  selectKey: "receiveUnitType",
  key: "unitType",
  name: "收发货单位类型",
  prop: "unitType",
  rules
},
{
  btn: false,
  // disabled: true,
  readonly: true,
  type: 'string',
  key: "receiveUnitName",
  name: "收货单位名称",
  prop: "receiveUnitName"
},
{
  type: 'string',
  key: "customContractNo",
  name: "报关合同号",
  prop: "customContractNo",
},
{
  // disabled: true,
  type: 'string',
  key: "carSort",
  name: "车序",
  prop: "carSort",
},
{
  // disabled:true,
  type: 'string',
  key: "customOrderNo",
  name: "报关单号",
  prop: "customOrderNo",
},
{
  btn: true,
  type: 'string',
  key: "carNumber",
  name: "车次",
  prop: "carNumber",
  readonly: true,
},
{
  btn: false,
  // disabled: true,
  readonly: true,
  type: 'string',
  key: "businessUnitName",
  name: "经营单位名称",
  prop: "businessUnitName"
},
{
  btn: true,
  type: 'string',
  key: "transportMachine",
  name: "运输工具",
  prop: "transportMachine",
  readonly: true,
},
{
  type: 'date',
  key: "loadingDate",
  name: "计划装车日期",
  prop: "loadingDate",
},
{
  // disabled: true,
  type: 'string',
  key: "flightNo",
  name: "航次号",
  prop: "flightNo",
},
{
  btn: false,
  // disabled: true,
  readonly: true,
  type: 'string',
  key: "declarationUnitName",
  name: "申报单位名称",
  prop: "declarationUnitName"
},
{
  type: 'string',
  key: "containerNo",
  name: "集装箱号",
  prop: "containerNo",
},
{
  type: 'checkbox',
  key: "lastOrder",
  name: "最后一单",
  prop: "lastOrder",
},
{
  // disabled: true,
  type: 'number',
  key: "quantity",
  name: "件数",
  prop: "quantity",
},
{
  // disabled: true,
  type: 'string',
  key: "grossWeight",
  name: "毛重",
  prop: "grossWeight",
},
{
  // disabled: true,
  type: 'string',
  key: "netWeight",
  name: "净重",
  prop: "netWeight",
},
{
  type: 'select',
  selectOption: [],
  key: "customCurrency",
  selectKey: "currencyName",
  name: "报关币别",
  prop: "customCurrency",
},
{
  selectOption: [],
  selectKey: "entryPort",
  type: 'select',
  key: "entryPort",
  name: "口岸名称",
  prop: "entryPort",
},
{
  type: 'string',
  key: "customBoxQuantity",
  name: "待报关总箱数",
  prop: "customBoxQuantity",
},
{
  // disabled: true,
  type: 'string',
  key: "totalItem",
  name: "总项数",
  prop: "totalItem",
  /* rules: [{
    required: true, message: '必填', trigger: 'blur',
    validator: validate.validateNum,
    trigger: ['blur', 'change']
  }] */
},
{
  // disabled: true,
  type: 'string',
  key: "totalAmount",
  name: "总金额",
  prop: "totalAmount",
  rules: [{
    required: true, message: '必填', trigger: 'blur',
    validator: validate.validateNum,
    trigger: ['blur', 'change']
  }]
},
{
  btn: true,
  readonly: true,
  type: 'string',
  key: "packageKindName",
  name: "包装种类",
  prop: "packageKindName",
},
{
  type: 'string',
  key: "paperPages",
  name: "纸张页数",
  prop: "paperPages",
},
{
  type: 'date',
  key: "customDate",
  name: "报关日期",
  prop: "customDate",
  rules
},
// {
// 	type: 'checkbox',
// 	key: "wmsGenerate",
// 	name: "WMS生成",
// 	prop: "wmsGenerate"
// },
{
  type: 'string',
  key: "remark",
  name: "备注",
  prop: "remark"
}
]
