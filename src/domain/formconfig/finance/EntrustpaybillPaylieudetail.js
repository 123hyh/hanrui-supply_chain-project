export default [
	{
		text: true,
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		checked: true,
		key: "payBeyond",
		name: "是否超额付款",
		prop: "payBeyond"
	},
	{
		checked: true,
		key: "booked",
		name: "是否已预约",
		prop: "booked"
	},
	{
		text: true,
		key: "payNature",
		name: "付款性质",
		prop: "payNature"
	},
	{
		text: true,
		key: "payOperation",
		name: "付款操作",
		prop: "payOperation"
	},
	{
		text: true,
		key: "delegete",
		name: "委托方",
		prop: "delegete"
	},
	{
		text: true,
		key: "trustee",
		name: "受托方",
		prop: "trustee"
	},
	{
		text: true,
		key: "agent",
		name: "代理方",
		prop: "agent"
	},
	{
		selectOption: [],
		select: true,
		key: "payType",
		name: "付款类型",
		prop: "payType"
	},
	{
		selectOption: [],
		select: true,
		key: "payMontyType",
		name: "付款币别",
		prop: "payMontyType"
	},
	{
		selectOption: [],
		select: true,
		key: "serviceChargePayerType",
		name: "手续费承担方类型",
		prop: "serviceChargePayerType"
	},
	{
		text: true,
		key: "checkNumber",
		name: "支票号码",
		prop: "checkNumber"
	},
	{
		type: true,
		text: true,
		key: "payMoneyRMBexchangeRate",
		name: "付款币别：人民币汇率",
		prop: "payMoneyRMBexchangeRate"
	},
	{
		text: true,
		key: "serviceChargePayer",
		name: "手续费承担方",
		prop: "serviceChargePayer"
	},
	{
		text: true,
		key: "receiptsBill",
		name: "收款单",
		prop: "receiptsBill"
	},
	{
		text: true,
		key: "financialReceiptsAudit",
		name: "财务收款审核",
		prop: "financialReceiptsAudit"
	},
	{
		type: true,
		text: true,
		key: "receiptsAmount",
		name: "收款金额",
		prop: "receiptsAmount"
	},
	{
		selectOption: [],
		select: true,
		key: "billState",
		name: "单据状态",
		prop: "billState"
	},
	{
		selectOption: [],
		select: true,
		key: "incidentalPayerType",
		name: "杂费承担方类型",
		prop: "incidentalPayerType"
	},
	{
		text: true,
		key: "ownReceiveBank",
		name: "HFY收款银行",
		prop: "ownReceiveBank"
	},
	{
		text: true,
		key: "incidentalPayer",
		name: "杂费承担方",
		prop: "incidentalPayer"
	},
	{
		type: true,
		text: true,
		key: "expectedAmountReceipt",
		name: "预计收款金额",
		prop: "expectedAmountReceipt"
	},
	{
		date: true,
		key: "plannedPayDate",
		name: "计划付款日期",
		prop: "plannedPayDate"
	},
	{
		type: true,
		text: true,
		key: "payForOthersAmount",
		name: "代付合计金额",
		prop: "payForOthersAmount"
	},
	{
		date: true,
		key: "termBillFinishDate",
		name: "期票结束日期",
		prop: "termBillFinishDate"
	},
	{
		text: true,
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		type: true,
		text: true,
		key: "advancePaymentAmount",
		name: "垫付合计金额",
		prop: "advancePaymentAmount"
	},
	{
		checked: true,
		key: "shouldReceiveBill",
		name: "是否应收单",
		prop: "shouldReceiveBill"
	},
	{
		text: true,
		key: "termBillDays",
		name: "期票天数",
		prop: "termBillDays"
	},
	// {
	// 	text: true,
	// 	key: "receiverUserName",
	// 	name: "收款方用户名",
	// 	prop: "receiverUserName"
	// },
	// {
	// 	checked: true,
	// 	key: "innerDeduction",
	// 	name: "是否内扣",
	// 	prop: "innerDeduction"
	// },
	// {
	// 	text: true,
	// 	key: "country",
	// 	name: "国家",
	// 	prop: "country"
	// },
	// {
	// 	type: true,
	// 	text: true,
	// 	key: "ttServiceCharge",
	// 	name: "TT手续费",
	// 	prop: "ttServiceCharge"
	// },
	// {
	// 	selectOption: [],
	// 	select: true,
	// 	key: "serviceChargeMoneyType",
	// 	name: "手续费币别",
	// 	prop: "serviceChargeMoneyType"
	// },
	// {
	// 	selectOption: [],
	// 	select: true,
	// 	key: "wayOfServiceCharge",
	// 	name: "手续费承担方式",
	// 	prop: "wayOfServiceCharge"
	// },
	// {
	// 	text: true,
	// 	key: "payeeAccount",
	// 	name: "收款人账号",
	// 	prop: "payeeAccount"
	// },
	// {
	// 	checked: true,
	// 	key: "fullAccountArrival",
	// 	name: "是否全额到账",
	// 	prop: "fullAccountArrival"
	// },
	// {
	// 	text: true,
	// 	key: "city",
	// 	name: "城市",
	// 	prop: "city"
	// },
	// {
	// 	text: true,
	// 	key: "swiftCode",
	// 	name: "SWIFT",
	// 	prop: "swiftCode"
	// },
	// {
	// 	checked: true,
	// 	key: "accountBeenPaid",
	// 	name: "账号是否付过",
	// 	prop: "accountBeenPaid"
	// },
	// {
	// 	text: true,
	// 	key: "bankNO",
	// 	name: "银行编号",
	// 	prop: "bankNO"
	// },
	// {
	// 	text: true,
	// 	key: "receiveBank",
	// 	name: "收款银行",
	// 	prop: "receiveBank"
	// },
	// {
	// 	text: true,
	// 	key: "destination",
	// 	name: "目的地",
	// 	prop: "destination"
	// },
	// {
	// 	selectOption: [],
	// 	select: true,
	// 	key: "settlementMethod",
	// 	name: "结算方式",
	// 	prop: "settlementMethod"
	// },
	// {
	// 	text: true,
	// 	key: "payeePhone",
	// 	name: "收款人电话",
	// 	prop: "payeePhone"
	// },
	// {
	// 	text: true,
	// 	key: "payeeFax",
	// 	name: "收款人传真",
	// 	prop: "payeeFax"
	// },
	// {
	// 	text: true,
	// 	key: "invoiceName",
	// 	name: "开票名称",
	// 	prop: "invoiceName"
	// },
	// {
	// 	text: true,
	// 	key: "invoiceAbbreviation",
	// 	name: "开票简称",
	// 	prop: "invoiceAbbreviation"
	// },
	// {
	// 	text: true,
	// 	key: "receiveBankAddress",
	// 	name: "收款银行地址",
	// 	prop: "receiveBankAddress"
	// },
	// {
	// 	text: true,
	// 	key: "postscript",
	// 	name: "附言",
	// 	prop: "postscript"
	// },
	// {
	// 	checked: true,
	// 	key: "discount",
	// 	name: "是否贴现",
	// 	prop: "discount"
	// },
	// {
	// 	selectOption: [],
	// 	select: true,
	// 	key: "discountType",
	// 	name: "贴现类型",
	// 	prop: "discountType"
	// },
	// {
	// 	text: true,
	// 	key: "auditor",
	// 	name: "审核人",
	// 	prop: "auditor"
	// },
	// {
	// 	date: true,
	// 	key: "auditTime",
	// 	name: "审核时间",
	// 	prop: "auditTime"
	// }
]