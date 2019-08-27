export default [
	{
		selectOption: [],
		type: "select",
		selectKey: "entrustOrderTypeG",
		name: "委托订单类型",
		key: "entrustOrderType",
		prop: "entrustOrderType",
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		type: "string",
		btn: true,
		key: "trusteeName",
		name: "受托方(公司)",
		prop: "trusteeName",
		disabled: true,
		rules: [{ required: true, message: '必填', trigger: 'blur' }]
	},
	{
		selectOption: [],
		type: "select",
		key: "status",
		selectKey: "billStatus",
		name: "单据状态",
		prop: "status",
		disabled: true,
	},
	{
		type: "string",
		key: "entrustOrderNo",
		name: "委托订单号", //add
		prop: "entrustOrderNo",
		disabled: true,
	},
	{
		type: "string",
		key: "salesmanName",
		name: "接单人",
		prop: "salesmanName",
		disabled: true,
	},
	{
		type: "date",
		key: "signDate",
		name: "签订日期",
		prop: "signDate"
	},
	{
		type: "string",
		key: "followPersonName",
		name: "跟单人",
		prop: "followPersonName",
		disabled: true,
	},
	{
		type: "string",
		btn: true, 
		key: "purchaseUnitName",
		name: "采购组织", //add
		prop: "purchaseUnitName",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "billStatus",
	// 	name: "版本号", //add
	// 	prop: "billStatus",
	// 	disabled: true
	// },
]