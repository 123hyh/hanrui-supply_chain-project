export default [{
		type: 'string',
		key: "receiptOrderCode",
		name: "收货单编码",
		prop: "receiptOrderCode",
		// btn: true,
		disabled: true
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "businessType",
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		btn: true,
		type: 'string',
		key: "issueTypeName",
		name: "事务类型",
		prop: "issueTypeName",
		readonly: true
	},
	{
		btn: true,
		type: 'string',
		key: "storeOrgName",
		name: "库存组织",
		prop: "storeOrgName",
		readonly: true
	},
	{
		btn: true,
		type: 'string',
		key: "warehouseName",
		name: "仓库",
		prop: "warehouseName",
		readonly: true
	},
	// {
	// 	selectOption: [],
	// 	type: 'select',
	// 	selectKey: "orderStatus",
	// 	key: "billStatus",
	// 	name: "单据状态",
	// 	prop: "billStatus",
	// 	disabled: true
	// },
	{
		type: 'select',
		selectOption: [
			{itemKey: '1', itemValue: '香港收货登记'},
			{itemKey: '2', itemValue: '委托单'},
			{itemKey: '3', itemValue: '其他'},
		],
		key: "sourceBillType",
		name: "源单据类型",
		prop: "sourceBillType"
	},
	{
		type: 'string',
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "declareCustoms",
		key: "reportGateType",
		name: "报关类型",
		prop: "reportGateType"
	},
	{
		btn: true,
		type: 'string',
		key: "delegeteName",
		name: "委托方",
		prop: "delegeteName",
		readonly: true
	},
	{
		btn: true,
		type: 'string',
		key: "supplierName",
		name: "供应商",
		prop: "supplierName",
		readonly: true
	},
	{
		btn: true,
		type: 'string',
		key: "clientName",
		name: "客户",
		prop: "clientName",
		readonly: true
	},
	{
		type: 'date',
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
	{
		type: 'string',
		key: "carTurn",
		name: "来货车序",
		prop: "carTurn"
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "receivingStatus",
		key: "receiveStatus",
		name: "收货状态",
		prop: "receiveStatus"
	},
	{
		type: 'string',
		key: "summary",
		name: "摘要",
		prop: "summary"
	},
	{
		type: 'string',
		key: "pieces",
		name: "件数",
		prop: "pieces"
	},
	{
		type: 'string',
		key: "areaCode",
		name: "区域编码",
		prop: "areaCode"
	},
	{
		btn: true,
		type: 'string',
		key: "carrierName", // carrier
		name: "承运商",
		prop: "carrierName",
		readonly: true
	},
	{
		type: 'date',
		key: "planTime",
		name: "计划发货时间",
		prop: "planTime"
	},
]