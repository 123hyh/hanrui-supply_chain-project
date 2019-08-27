export default [
	{
		text: true,
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		text: true,
		key: "company",
		name: "申请日期",
		prop: "company"
	},
	{
		text: true,
		key: "actualReceiptCompany",
		name: "单据状态",
		prop: "actualReceiptCompany"
	},
	{
		date: true,
		key: "receivedDate",
		name: "申请类型",
		prop: "receivedDate"
	},
	{
		text: true,
		key: "receiptsAndPaymentsType",
		name: "调整账务来源",
		prop: "receiptsAndPaymentsType"
	},
	{
		type: true,
		text: true,
		key: "immediateBalance",
		name: "调整总金额",
		prop: "immediateBalance"
	},
	{
		selectOption: [],
		select: true,
		key: "receiptsType",
		name: "申请人",
		prop: "receiptsType"
	},
	{
		selectOption: [],
		select: true,
		key: "moneyType",
		name: "申请部门",
		prop: "moneyType"
	},
	{
		type: 'checkbox',
		check: true,
		key: "receiptsAmount",
		name: "收到票税",
		prop: "receiptsAmount"
	}
]