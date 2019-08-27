export default [
	{
		text: true,
		key: "billNo",
		name: "应付结算单单据编号",
		prop: "billNo"
	},
	{
		text: true,
		key: "receiverPayment",
		name: "收付",
		prop: "receiverPayment"
	},
	{
		text: true,
		key: "delegateBillNo",
		name: "委托单",
		prop: "delegateBillNo"
	},
	{
		text: true,
		key: "orderNo",
		name: "订单号",
		prop: "orderNo"
	},
	{
		selectOption: [],
		select: true,
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		selectOption: [],
		select: true,
		key: "reportGateType",
		name: "报关类型",
		prop: "reportGateType"
	},
	{
		date: true,
		key: "chargeDate",
		name: "计费日期",
		prop: "chargeDate"
	},
	{
		text: true,
		key: "chargeItem",
		name: "计费项目",
		prop: "chargeItem"
	},
	{
		type: true,
		text: true,
		key: "amount",
		name: "发生金额",
		prop: "amount"
	},
	{
		selectOption: [],
		select: true,
		key: "chargeMoneyType",
		name: "计费币别",
		prop: "chargeMoneyType"
	},
	{
		selectOption: [],
		select: true,
		key: "settlementMoney",
		name: "结算币别",
		prop: "settlementMoney"
	},
	{
		type: true,
		text: true,
		key: "settlementExchangeRate",
		name: "结算汇率",
		prop: "settlementExchangeRate"
	},
	{
		type: true,
		text: true,
		key: "settlementMoneyAmount",
		name: "折结算币金额",
		prop: "settlementMoneyAmount"
	},
	{
		type: true,
		text: true,
		key: "shouldChargeAmount",
		name: "应计金额",
		prop: "shouldChargeAmount"
	},
	{
		type: true,
		text: true,
		key: "applyAmountAll",
		name: "累计申请金额",
		prop: "applyAmountAll"
	},
	{
		type: true,
		text: true,
		key: "unApplyAmount",
		name: "未申请金额",
		prop: "unApplyAmount"
	},
	{
		type: true,
		text: true,
		key: "paidAmount",
		name: "已付款金额",
		prop: "paidAmount"
	},
	{
		type: true,
		text: true,
		key: "writeOffAmountAll",
		name: "累计核销金额",
		prop: "writeOffAmountAll"
	},
	{
		text: true,
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		selectOption: [],
		select: true,
		key: "sourceBillType",
		name: "来源单据类型",
		prop: "sourceBillType"
	},
	{
		text: true,
		key: "sourceBillNo",
		name: "来源单据编号",
		prop: "sourceBillNo"
	},
	{
		type: true,
		text: true,
		key: "warehousingRate",
		name: "入库汇率",
		prop: "warehousingRate"
	},
	{
		selectOption: [],
		select: true,
		key: "refundType",
		name: "退款方式",
		prop: "refundType"
	}
]