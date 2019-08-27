export default [
	{
		type : "string",
		key: "creditCode",
		name: "信用评估编码",
		prop: "creditCode",
		disabled: true
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "creditAssessmentType",
		key: "creditType",
		name: "信用类型",
		prop: "creditType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "supplierClassification",
		key: "supplierType",
		name: "供应商分类",
		prop: "supplierType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "orderProcessing",
		key: "processMode",
		name: "订单处理方式",
		prop: "processMode"
	},
	{
		type : "string",
		key: "verifyResult",
		name: "可疑项审核结果",
		prop: "verifyResult"
	},
	{
		type : "string",
		key: "supplierDesc",
		name: "可疑供应商描述",
		prop: "supplierDesc"
	},
	{
		type : "checkbox",
		key: "relieveTerm",
		name: "解除可疑项",
		prop: "relieveTerm"
	},
	{
		type : "string",
		key: "relievePerson",
		name: "解疑人",
		prop: "relievePerson"
	},
	{
		type : "string",
		key: "operatePerson",
		name: "操作人",
		prop: "operatePerson"
	}
]