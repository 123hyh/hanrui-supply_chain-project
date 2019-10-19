import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [{
		type: 'string',
		key: "purchaseOrderNo",
		name: "采购订单编号",
		readonly: true
	},
	{
		type: 'string',
		key: "entrustOrderNo",
		name: "委托订单号",
		readonly: true,
    btn: false,
    rules
	},
	{
		type: 'date',
		key: "bizDate",
		name: "业务日期",
		readonly: true
	},
	{
		type: 'string',
		key: "clientName",
		name: "委托方",
		readonly: true
	},
	{
		type: 'string',
		key: "salesmanName",
		name: "接单人姓名",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "bizTypeName",
		// selectKey: "businessType",
		name: "业务类型",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "dealModeName",
		selectKey: "transactionMode",
		name: "成交方式",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "settlementModeName",
		// selectKey: "settlementMethod",
		name: "结算方式",
		readonly: true
	},
	/* {
		selectOption: [
			{itemKey: '1', itemValue: '新增'},
			{itemKey: '2', itemValue: '保存'},
			{itemKey: '4', itemValue: '审核'}
		],
		type: 'select',
		key: "statusName",
		selectKey: "orderStatus",
		name: "状态",
	}, */
/* 	{
		type: 'string',
		key: "supplierCode",
		name: "供应商编码",
		readonly: true
	}, */
	{
		type: 'string',
		key: "supplierName",
		name: "供应商",
		btn: true,
    readonly: true,
    rules
	},
	{
		type: 'string',
		key: "followPersonName",
		name: "跟单人",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "reportGateTypeName",
		selectKey: "declareCustoms",
		name: "报关类型",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "trusteeReceivableModeName",
		// selectKey: "paymentMethod",
		name: "受托方收款方式",
		readonly: true
	},
	{
		type: 'string',
		key: "contractNo",
		name: "客户合同号",
		readonly: true
	},

	{
		selectOption: [],
		type: 'select',
		key: "sourceBillTypeName",
		// selectKey: "originDocumentType",
		name: "源单据类型",
		readonly: true
	},
	{
		type: 'string',
		key: "customerName",
		name: "客户",
		readonly: true
	},
	{
		type: 'string',
		key: "purchaseUnitName",
		name: "采购组织",
		btn: true,
		readonly: true,
		rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "tradeModeName",
		selectKey: "tradeModeName",
		name: "贸易方式",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "chargeModeName",
		selectKey: "BillingMethod",
		name: "计价方式",
		readonly: true
	},
	{
		type: 'string',
		key: "receiveOrganizationName",
		name: "收货组织",
		btn: true,
    readonly: true,
    rules
	},
	{
		type: 'string',
		key: "storageName",
		name: "仓库",
		btn: true,
    readonly: true,
    rules
	},
	{
		selectOption: [],
		type: 'select',
		key: "sellerCurrencyName",
		// selectKey: "currencyName",
		name: "卖方销售币别",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "buyerCurrencyName",
		selectKey: "currencyName",
		name: "买方采购币别",
		readonly: true
	},
/* 	{
		type: 'string',
		key: "tallyPersonName",
		name: "理货人",
		readonly: true
	}, */
	{
		type: 'string',
		key: "customerOrderNo",
		name: "客户订单号",
		readonly: true
	},
	{
		type: 'number',
		key: "apGoodsAmountSum",
		name: "委托单应付货款总额",
		readonly: true,
		// rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		type: 'number',
		key: "orderAmount",
		name: "本次订货金额",
		readonly: true,
		// rules: [...rules, {validator: validate.validateNum,}]
	},
	{
		selectOption: [],
		type: 'select',
		key: "currencyName",
		selectKey: "currencyName",
		name: "币别",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		key: "payModeName",
		// selectKey: "payMode",
		name: "付款方式",
		readonly: true
	},
	{
		type: 'string',
		key: "orderRemark",
		name: "订单备注",
	},
	{
		type: 'string',
		key: "followRemark",
		name: "香港跟单备注",
	}
/* 	{
		type: 'string',
		key: "auditor",
		name: "审核人",
		readonly: true
	},
	{
		type: 'date',
		key: "auditTime",
		name: "审核日期",
		readonly: true
	} */
]