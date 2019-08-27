export default [
	// {
	// 	type: "string",
	// 	key: "creditCode",
	// 	name: "信用评估编码",
	// 	prop: "creditCode",
	// 	disabled: true
	// },
	{
		selectOption: [],
		type: "select",
		selectKey: "creditAssessmentType",
		key: "creditType",
		name: "信用评估类型",
		prop: "creditType"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "orderProcessing",
		key: "processMode",
		name: "订单处理方式",
		prop: "processMode"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "supplierClassification",
		key: "supplierType",
		name: "供应商分类",
		prop: "supplierType"
	},
	{
		type: "textarea",
		key: "verifyResult",
		name: "可疑项审核结果",
		prop: "verifyResult"
	},
	{
		type: "textarea",
		key: "supplierDesc",
		name: "可疑供应商描述",
		prop: "supplierDesc"
	},
	{
		type: "checkbox",
		key: "relieveTerm",
		name: "解除可疑项",
		prop: "relieveTerm"
	},
	{
		type: "string",
		key: "relievePerson",
		name: "解疑人",
    prop: "relievePerson",
    // btn: true,
    // readonly: true,
		disabled: true
	},
	{
		type: "string",
		key: "operatePerson",
		name: "操作人",
		prop: "operatePerson",
    // btn: true,
    readonly: true,
		disabled: true
	}
]
