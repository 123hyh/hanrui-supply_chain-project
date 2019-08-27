import validate from '@/domain/common/validate'
export default [
	{
		type: 'string',
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		readonly:true
	},
	{
		type: 'string',
		key: "remittanceNo",
		name: "调汇编号",
		prop: "remittanceNo",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'select',
    	selectOption: [],
		key: "remittanceType",
    	selectKey: "transferType",
		name: "调汇类型",
		prop: "remittanceType",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'select',
		key: "interestPayer",
		name: "利息支付方",
		selectKey:"interestPayer",
		prop: "interestPayer",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'select',
		selectOption: [],
		selectKey:'orderStatus',
		key: "status",
		name: "单据状态",
		prop: "status",
		disabled:true
	},
	{
		type: 'date',
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'string',
		key: "reason",
		name: "事由",
		prop: "reason",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'string',
		key: "year",
		name: "年份",
		prop: "year",
		rules:[
			{ required: true, message: '必填', trigger: 'blur' },
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		]
	},
	{
		type: 'string',
		key: "receiptNo",
		name: "收款单号",
		prop: "receiptNo",
		rules:[
			{ required: true, message: '必填', trigger: ['blur','change'] },
		]
	},
	{
		type: 'number',
		key: "actualAmount",
		name: "实收金额",
		prop: "actualAmount",
		rules:[
			{ required: true, message: '必填', trigger: 'blur' },
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		]
	},
	{
		type: 'number',
		key: "resourceAmount",
		name: "原币金额",
		prop: "resourceAmount",
		rules:[
			{ required: true, message: '必填', trigger: 'blur' },
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		]
	},
	{
		type: 'select',
		selectOption: [],
		key: "resourceCurrency",
    	selectKey: "currencyName",
		name: "原币币别",
		prop: "resourceCurrency",
	},
	{
		type: 'textarea',
		key: "szRemark",
		name: "深圳备注",
		prop: "szRemark"
	}
]