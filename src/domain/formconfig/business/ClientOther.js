export default [
	{
		type: "string",
		key: "clientNo",
		name: "委托方编号",
		prop: "clientNo",
		disabled: true,
	},
	{
		type: "checkbox",
		key: "allowOrder",
		name: "不允许下单",
		prop: "allowOrder"
	},
	{
		type: "checkbox",
		key: "printAmount",
		name: "是否打印金额",
		prop: "printAmount"
	},
	{
		type: "checkbox",
		key: "autoLock",
		name: "系统不再自动锁定",
		prop: "autoLock"
	},
	{
		type: "checkbox",
		key: "noTransFeeVat",
		name: "不收运费增值税",
		prop: "noTransFeeVat"
	},
	{
		type: "checkbox",
		key: "monthly",
		name: "运费月结",
		prop: "monthly"
	},
	{
		type: "checkbox",
		key: "printOtherFee",
		name: "打印杂费",
		prop: "printOtherFee"
	},
	{
		type: "checkbox",
		key: "noOtherFeeVat",
		name: "不收杂费增值税",
		prop: "noOtherFeeVat"
	},
	{
		type: "checkbox",
		key: "noInterestNoTax",
		name: "逾期利息不加税",
		prop: "noInterestNoTax"
	},
	{
		type: "checkbox",
		key: "printTaxAndAgencyFee",
		name: "打印税金及代理费",
		prop: "printTaxAndAgencyFee"
	},
	{
		type: "checkbox",
		key: "corporationCustomer",
		name: "信保客户",
		prop: "corporationCustomer"
	},
	{
		type: "checkbox",
		key: "noInterest",
		name: "不收逾期利息",
		prop: "noInterest"
	},
	{
		type: "checkbox",
		key: "aloneCustom",
		name: "需单独报关",
		prop: "aloneCustom"
	},
	{
		type: "checkbox",
		key: "outlandOtherFee",
		name: "境外杂费境外",
		prop: "outlandOtherFee"
	},
	{
		type: "checkbox",
		key: "notAllowTgb",
		name: "不允许做TGB",
		prop: "notAllowTgb"
	},
	{
		type: "checkbox",
		key: "prePayBackInterest",
		name: "提前付款需退利息",
		prop: "prePayBackInterest"
	},
	{
		type: "checkbox",
		key: "chargeSingleFee",
		name: "每张出库单只计算一次是低收费",
		prop: "chargeSingleFee"
	},
	{
		type: "checkbox",
		key: "putOff",
		name: "是否延期",
		prop: "putOff"
	},
	{
		type: "checkbox",
		key: "canFindTgb",
		name: "可查TGB",
		prop: "canFindTgb"
	},
	{
		type: "checkbox",
		key: "mergeTransport",
		name: "等齐送",
		prop: "mergeTransport"
	},
	{
		type: "date",
		key: "putOffDate",
		name: "延期至",
		prop: "putOffDate"
	},
	{
		type: "string",
		key: "courseRating",
		name: "操作难度系数",
		prop: "courseRating"
	},
	{
		type: "checkbox",
		key: "outLimit",
		name: "出口退款时关联检查进口是否已超额度",
		prop: "outLimit"
	},
	{
		type: "checkbox",
		key: "notLostCustomer",
		name: "不在流失客户列表中显示",
		prop: "notLostCustomer"
	},
	{
		type: "checkbox",
		key: "inlandChargeFee",
		name: "出口单货款境内收",
		prop: "inlandChargeFee"
	},
	{
		type: "checkbox",
		key: "orderNoEqContactNo",
		name: "出口报关合同号等于委托单号",
		prop: "orderNoEqContactNo"
	},
	{
		type: "checkbox",
		key: "h",
		name: "H",
		prop: "h"
	},
	{
		type: "checkbox",
		key: "customerNameCustom",
		name: "客品名报关",
		prop: "customerNameCustom"
	},
	{
		type: "checkbox",
		key: "invoiceContainOrderNo",
		name: "委托单号显示在发票备注上",
		prop: "invoiceContainOrderNo"
	},
	{
		type: "checkbox",
		key: "taxGenerationCustome",
		name: "税代客户",
		prop: "taxGenerationCustome"
	},
	{
		type: "checkbox",
		key: "trustee",
		name: "指定受托方公司",
		prop: "trustee"
	},
	{
		type: "checkbox",
		key: "toEChain",
		name: "同步指定受托到E链",
		prop: "toEChain"
	},
	{
		type: "checkbox",
		key: "allowExportYsh",
		name: "允许出口预收汇",
		prop: "allowExportYsh"
	}
]