import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    isString: true,
    key: 'billNo',
    name: '单据编号',
    prop: 'billNo',
    type: 'string'
  },
  {
    key: 'sourceBillType',
    name: '源单据类型',
    prop: 'sourceBillType',
    type: 'select',
    selectOption: [
      { itemKey: '1', itemValue: '深圳收货入库单' },
      { itemKey: '2', itemValue: '深圳发货通知单' },
      { itemKey: '3', itemValue: '委托单' },
      { itemKey: '4', itemValue: '其他' }
    ],
    rules
  },
  {
    key: 'delegeteBillNo',
    name: '委托单号',
    prop: 'delegeteBillNo',
    type: 'string',
    api: {
      '1': 'queryGodownentry',
      '2': 'queryentrustorderSearch'
    },
    btn: null,
    rules
  },
  {
    btn: true,
    isString: true,
    key: 'issueTypeName',
    name: '事务类型',
    prop: 'issueTypeName',
    isShowPopover: true,
    readonly: true,
    type: 'string',
    api: 'getTransactionTypeList',
    rules
  },
  {
    selectOption: [],
    select: true,
    selectKey: 'declareCustoms',
    key: 'reportGateType',
    name: '报关类型',
    prop: 'reportGateType',
    type: 'select',
    rules
  },
  {
    date: true,
    key: 'bizDate',
    name: '业务日期',
    prop: 'bizDate',
    type: 'date',
    rules
  },
  {
    isString: true,
    key: 'deliveryCustomerName',
    name: '送货客户',
    prop: 'deliveryCustomerName',
    btn: true,
    isShowPopover: true,
    readonly: true,
    type: 'string',
    api: 'getCustomerList',
    rules
  },
  {
    isString: true,
    key: 'storeOrgName',
    name: '库存组织',
    prop: 'storeOrgName',
    btn: true,
    isShowPopover: true,
    readonly: true,
    type: 'string',
    api: 'getCreditCompanyNameData',
    rules
  },
  {
    isString: true,
    key: 'departmentName',
    name: '部门',
    prop: 'departmentName',
    btn: true,
    isShowPopover: true,
    readonly: true,
    type: 'string',
    api: 'getDepartment',
    rules
  },
  // {
  // 	selectOption: [],
  // 	type: 'select',
  // 	selectKey: "businessType",
  // 	key: "bizType",
  // 	name: "业务类型",
  // 	prop: "bizType"
  // },
  {
    btn: true,
    type: 'string',
    key: 'delegeteName',
    name: '委托方',
    prop: 'delegeteName',
    isShowPopover: true,
    readonly: true,
    rules
  },
  {
    btn: true,
    type: 'string',
    key: 'supplierName',
    name: '供应商',
    prop: 'supplierName',
    isShowPopover: true,
    readonly: true
  },
  {
    btn: true,
    type: 'string',
    key: 'customerName',
    name: '客户',
    prop: 'customerName',
    isShowPopover: true,
    readonly: true
  },
  {
    checked: true,
    key: 'writeOff',
    name: '冲销',
    prop: 'writeOff',
    type: 'checkbox'
  },
  {
    checked: true,
    key: 'initData',
    name: '初始化单据',
    prop: 'initData',
    type: 'checkbox'
  },
  {
    checked: true,
    key: 'taxIncluded',
    name: '含税',
    prop: 'taxIncluded',
    type: 'checkbox'
  },
  {
    selectOption: [],
    selectKey: 'currencyName',
    key: 'currency',
    name: '币别',
    prop: 'currency',
    type: 'select'
  },
  {
    isString: true,
    key: 'exchangeRate',
    name: '汇率',
    prop: 'exchangeRate',
    type: 'number',
    rules: [{ validator: validate.validateNum }]
  },
  {
    isString: true,
    key: 'summary',
    name: '摘要',
    prop: 'summary',
    type: 'string'
  },
  {
    isString: true,
    key: 'inBillNo',
    name: '转入单号',
    prop: 'inBillNo',
    type: 'string'
  },
  {
    btn: true,
    type: 'string',
    key: 'inBillNoDelegeteName',
    name: '转入单号委托方',
    prop: 'inBillNoDelegete',
    isShowPopover: true
  },
  // {
  // 	btn: true,
  // 	type: 'string',
  // 	key: "inBillNoDelegete",
  // 	name: "转入单号委托方",
  // 	prop: "inBillNoDelegete",
  // 	isShowPopover: true,
  // },
  {
    btn: true,
    type: 'string',
    key: 'inBillCustomerName',
    name: '转入单的客户',
    prop: 'inBillCustomer',
    isShowPopover: true
  },
  {
    type: 'string',
    key: 'deliveryAddress',
    name: '收货地址',
    prop: 'deliveryAddress'
  }
  // {
  // 	btn: true,
  // 	type: 'string',
  // 	key: "inBillCustomer",
  // 	name: "转入单的客户",
  // 	prop: "inBillCustomer",
  // 	isShowPopover: true,
  // },
  // {
  // 	isString: true,
  // 	key: "auditor",
  // 	name: "审核人",
  // 	prop: "auditor",
  // 	type: "string",
  // },
  // {
  // 	date: true,
  // 	key: "auditTime",
  // 	name: "审核时间",
  // 	prop: "auditTime",
  // 	type: "date",
  // }
]
