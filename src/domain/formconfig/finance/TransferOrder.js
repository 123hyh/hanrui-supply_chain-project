export default [
	{
		text: true,
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		selectOption: [],
		select: true,
		selectKey: "transferOrderType",
		key: "transferType",
		name: "转单类型",
		prop: "transferType"
	},
	{
		date: true,
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
/* 	{
		selectOption: [],
		select: true,
		selectKey:"orderStatus",
		key: "bizStatus",
		name: "状态",
		prop: "bizStatus"
	}, */
	{
		btn: true,
		text: true,
		key: "originalPaymentAddress",
		name: "原付款地址",
		prop: "originalPaymentAddress",
		isShowPopover: true,
        readonly: true
	},
	{
		text: true,
		key: "outInfo",
		name: "转出信息",
		prop: "outInfo"
	},
	{
		btn: true,
		text: true,
		key: "outEntrust",
		name: "转出委托单号",
		prop: "outEntrust",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "settlementAdvice",
		name: "应收结算单",
		prop: "settlementAdvice",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "outCustomer",
		name: "转出客户",
		prop: "outCustomer",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "outSupplier",
		name: "转出供应商",
		prop: "outSupplier",
		isShowPopover: true,
        readonly: true
	},
	{
		selectOption: [],
		select: true,
		selectKey:"settlementMethod",
		key: "outSettlementMethod",
		name: "转出结算方式",
		prop: "outSettlementMethod"
	},
	{
		type: true,
		text: true,
		key: "outAmount",
		name: "转出金额",
		prop: "outAmount"
	},
	{
		selectOption: [],
		select: true,
		selectKey:"currencyName",
		key: "outCurrency",
		name: "转出币别",
		prop: "outCurrency"
	},
	{
		type: true,
		text: true,
		key: "canTransferAmount",
		name: "可转金额",
		prop: "canTransferAmount"
	},
	{
		selectOption: [],
		select: true,
		selectKey:"currencyName",
		key: "canTransferCurrency",
		name: "可转金额币别",
		prop: "canTransferCurrency"
	},
	{
		type: true,
		text: true,
		key: "outRmbRate",
		name: "转出RMB汇率",
		prop: "outRmbRate"
	},
	{
		type: true,
		text: true,
		key: "paymentDayRate",
		name: "付款日汇率",
		prop: "paymentDayRate"
	},
	{
		text: true,
		key: "transferReason",
		name: "转款理由",
		prop: "transferReason"
	},
	{
		text: true,
		key: "intoInfo",
		name: "转入信息",
		prop: "intoInfo"
	},
	{
		btn: true,
		text: true,
		key: "intoEntrust",
		name: "转入委托单号",
		prop: "intoEntrust",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "intoCustomer",
		name: "转入客户",
		prop: "intoCustomer",
		isShowPopover: true,
        readonly: true
	},
	{
		btn: true,
		text: true,
		key: "intoSupplier",
		name: "转入供应商",
		prop: "intoSupplier",
		isShowPopover: true,
        readonly: true
	},
	{
		selectOption: [],
		select: true,
		selectKey:"settlementMethod",
		key: "intoSettlementMethod",
		name: "转入结算方式",
		prop: "intoSettlementMethod"
	},
	{
		type: true,
		text: true,
		key: "intoAmount",
		name: "转入金额",
		prop: "intoAmount"
	},
	{
		selectOption: [],
		select: true,
		selectKey:"currencyName",
		key: "intoCurrency",
		name: "转入币别",
		prop: "intoCurrency"
	},
	{
		type: true,
		text: true,
		key: "intoCurrencyRate",
		name: "抵转入币别汇率",
		prop: "intoCurrencyRate"
	},
	{
		type: true,
		text: true,
		key: "intoRmbRate",
		name: "转入RMB汇率",
		prop: "intoRmbRate"
	},
	{
		type: true,
		text: true,
		key: "shippingRate",
		name: "上货汇率",
		prop: "shippingRate"
	},
	{
		type: true,
		text: true,
		key: "sinkDifference",
		name: "汇差",
		prop: "sinkDifference"
	},
	{
		text: true,
		key: "remark",
		name: "审核备注",
		prop: "remark"
	}
]