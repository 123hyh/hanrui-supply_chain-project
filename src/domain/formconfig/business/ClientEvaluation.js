import validate from "@/domain/common/validate"
export default [
	{
		type: "string",
		key: "clientEvaluationNo",
		name: "委托方评估编号",
		prop: "clientEvaluationNo",
		disabled: true,
	},
	{
		type: "string",
		key: "clientNo",
		name: "委托方编码",
		prop: "clientNo"
	},
	{
		type: "string",
		key: "clientName",
		name: "委托方全称",
		prop: "clientName",
		rules: [
			{ required: true, message: '输入不能为空', trigger: 'blur' },
		]
	},
	{
		type: "string",
		key: "clientEnName",
		name: "外文名称",
		prop: "clientEnName"
	},
	{
		type: "string",
		key: "registerMoney",
		name: "注册资金 万",
		prop: "registerMoney",
		rules: [
			{ required: true, message: '请输入资金', trigger: 'blur' },
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		type: "string",
		key: "companyAddress",
		name: "公司地址",
		prop: "companyAddress",
		rules: [
			{ required: true, message: '请输入地址', trigger: 'blur' },
		]
	},
	{
		type: "date",
		key: "establishedTime",
		name: "成立时间",
		prop: "establishedTime",
		rules: [
			{ required: true, message: '请选择时间', trigger: 'blur' },
		]
	},
	{
		type: "number",
		key: "actualReceiveAmount",
		name: "实收资金 万",
		prop: "actualReceiveAmount",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		btn : true,
		type: "string",
		isShowPopover: true,
		key: "visitorName",
		name: "登门拜访经理",
		prop: "visitorName",
		rules: [
			{ required: true, message: '请选择经理', trigger: 'blur' },
		]
	},
	{
		type: "string",
		key: "operateTerm",
		name: "目前操作条件",
		prop: "operateTerm"
	},
	{
		type: "string",
		key: "customerDemand",
		name: "客户其它需求",
		prop: "customerDemand"
	},
	{
		type: "select",
		selectOption : [],
		selectKey: "businessType",
		key: "businessType",
		name: "业务类别",
		prop: "businessType",
		rules: [
			{ required: true, message: '选择业务类别', trigger: 'blur' },
		]
	},
	{
		type: "string",
		key: "accountPeriod",
		name: "申请帐期",
		prop: "accountPeriod",
		rules: [
			{ required: true, message: '输入申请帐期', trigger: 'blur' },
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		type: "string",
		key: "customerLimit",
		name: "申请额度RMB",
		prop: "customerLimit",
		rules: [
			{ required: true, message: '输入申请额度', trigger: 'blur' },
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		type: "select",
		selectOption : [],
		selectKey: "limitUseType",
		key: "limitUse",
		name: "额度用途",
		prop: "limitUse",
		rules: [
			{ required: true, message: '输入不能为空', trigger: 'blur' },
		]
	},
	{
		type: "number",
		key: "applyDayRate",
		name: "申请日利率 %",
		prop: "applyDayRate",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		type: "string",
		key: "applyCount",
		name: "申请点数",
		prop: "applyCount",
		rules: [
			{ required: true, message: '输入申请点数', trigger: 'blur' },
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		type: "string",
		key: "prePaymentScale",
		name: "预付款比例 %",
		prop: "prePaymentScale",
		rules: [
			{ validator: validate.validateNum, trigger: ['blur','change'] }
		]
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "paymentForDelivery",
		key: "receiveMethod",
		name: "交货收款方式",
		prop: "receiveMethod",
		rules: [
			{ required: true, message: '输入不能为空', trigger: 'blur' },
		]
	},
	{
		type: "string",
		key: "ensureMeasure",
		name: "担保措施",
		prop: "ensureMeasure"
	},
	{
		type: "date",
		key: "receivableDate",
		name: "收款日",
		prop: "receivableDate"
	}
]