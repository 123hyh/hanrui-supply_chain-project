import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'billNo',
    name: '单据编号',
    prop: 'billNo',
    disabled: true
  },
  {
    selectOption: [
      { itemKey: '1', itemValue: '委托单' },
      { itemKey: '2', itemValue: '卖方交(发)货' },
      { itemKey: '3', itemValue: '其他' }
    ],
    type: 'select',
    key: 'sourceBillType',
    name: '源单据类型',
    prop: 'sourceBillType',
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    type: 'string',
    key: 'delegeteBillNo',
    name: '委托单号',
    prop: 'delegeteBillNo',
    readonly: true
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'businessType',
    key: 'bizType',
    name: '业务类型',
    prop: 'bizType'
  },
  {
    btn: true,
    type: 'string',
    key: 'issueTypeName' /*"transactionName"*/,
    name: '事务类型',
    prop: 'issueTypeName',
    readonly: true,
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    btn: true,
    type: 'string',
    key: 'storeOrgName' /*"companyName"*/,
    name: '库存组织',
    prop: 'storeOrgName',
    readonly: true,
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    btn: true,
    type: 'string',
    key: 'warehouseName',
    name: '仓库',
    prop: 'warehouseName',
    readonly: true,
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'declareCustoms',
    key: 'reportGateType',
    name: '报关类型',
    prop: 'reportGateType',
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    btn: true,
    type: 'string',
    key: 'delegeteName' /*"clientName"*/,
    name: '委托方',
    prop: 'delegeteName',
    readonly: true,
    rules
  },
  {
    btn: true,
    type: 'string',
    key: 'supplierName',
    name: '供应商',
    prop: 'supplierName',
    readonly: true
  },
  {
    btn: true,
    type: 'string',
    key: 'customerName',
    name: '客户',
    prop: 'customerName',
    readonly: true
  },
  {
    type: 'string',
    key: 'incomeVehicleOrder',
    name: '来货车序',
    prop: 'incomeVehicleOrder',
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'registerStatus',
    key: 'receiveStatus',
    name: '登记状态',
    prop: 'receiveStatus',
    rules
  },
  {
    type: 'date',
    readonly: true,
    key: 'scheduleDeliveryTime',
    name: '登记时间',
    prop: 'scheduleDeliveryTime',
    rules: [{ required: true, message: '必填', trigger: 'blur' }]
  },
  {
    type: 'string',
    key: 'summary',
    name: '摘要',
    prop: 'summary'
  },
  {
    type: 'number',
    key: 'pieces',
    name: '件数',
    prop: 'pieces',
    rules: [...rules, { required: true, message: '必填', trigger: 'blur' }]
  },
  {
    type: 'string',
    key: 'areaCode',
    name: '区域编码',
    prop: 'areaCode'
  },
  {
    type: 'number',
    key: 'registerFee',
    name: '登记费',
    prop: 'registerFee',
    rules: [...rules, { required: true, message: '必填', trigger: 'blur' }]
  }
  /* {
		type: 'string',
		key: "auditor",
		name: "审核人",
		prop: "auditor"
	},
	{
		type: 'date',
		key: "auditTime",
		name: "审核时间",
		prop: "auditTime"
	} */
]
