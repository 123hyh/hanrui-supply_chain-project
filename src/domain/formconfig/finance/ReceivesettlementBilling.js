export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		type: "string",
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo"
	},
	{
		type: "string",
		key: "contractNo",
		name: "合同号",
		prop: "contractNo"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "delegeteBillType",
		key: "delegeteBillType",
		name: "委托单类型",
		prop: "delegeteBillType"
	},
	{
		type: "string",
		key: "company",
		name: "公司",
		prop: "company"
	},
	{
		type: "string",
		key: "delegate",
		name: "委托方",
		prop: "delegate"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "settlementUnitType",
		key: "settlementUnitType",
		name: "结算单位类型",
		prop: "settlementUnitType"
	},
	{
		type: "string",
		key: "settlementUnit",
		name: "结算单位",
		prop: "settlementUnit"
	},
	{
		type: "checkbox",
		key: "invoiceWithGoods",
		name: "随货开票",
		prop: "invoiceWithGoods"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "carrierType",
		key: "carrierType",
		name: "承运方类型",
		prop: "carrierType"
	},
	{
		type: "string",
		key: "vehicleOrder",
		name: "车序",
		prop: "vehicleOrder"
	},
	/* {
		selectOption: [],
		type: "select",
		selectKey: "state",
		key: "state",
		name: "状态",
		prop: "state"
	}, */
	{
		type: "string",
		key: "abroadIncidental",
		name: "境外杂费外收",
		prop: "abroadIncidental"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "paymentSettlementMethod",
		key: "paymentSettlementMethod",
		name: "付款结算方式",
		prop: "paymentSettlementMethod"
	},
	{
		type: "date",
		key: "payDate",
		name: "付款日",
		prop: "payDate"
	},
	{
		type: "date",
		key: "takeTicketDate",
		name: "前台取票日",
		prop: "takeTicketDate"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "moneyType",
		key: "moneyType",
		name: "币别",
		prop: "moneyType"
	}
]