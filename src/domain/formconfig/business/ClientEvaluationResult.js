export default [
	{
		type: "string",
		key: "clientEvaluationNo",
		name: "委托方评估编号",
		prop: "clientEvaluationNo",
		disabled: true,
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "clientLevel",
		key: "customerType",
		name: "客户类型",
		prop: "customerType"
	},
	{
		type: "string",
		key: "ensureMeasure",
		name: "批准担保措施",
		prop: "ensureMeasure"
	},
	{
		type: "string",
		key: "accountPeriod",
		name: "审批帐期",
		prop: "accountPeriod"
	},
	{
		type: "string",
		key: "customerLimit",
		name: "批准额度RMB",
		prop: "customerLimit"
	},
	{
		type: "string",
		key: "limitUse",
		name: "批准额度用途",
		prop: "limitUse"
	},
	{
		type: "string",
		key: "applyDayRate",
		name: "批准日利率",
		prop: "applyDayRate"
	},
	{
		type: "string",
		key: "applyCount",
		name: "批准点数",
		prop: "applyCount"
	},
	{
		type: "string",
		key: "prePaymentScale",
		name: "批准预付款比例",
		prop: "prePaymentScale"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "paymentForDelivery",
		key: "receiveMethod",
		name: "批准交货收款方式",
		prop: "receiveMethod"
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]