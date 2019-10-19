export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		readonly:true
	},
	{
		// btn:true,
		type: "string",
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		readonly: true
	},
	{
		type: "date",
		key: "receiveDate",
		name: "应收日期",
		prop: "receiveDate"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
		key: "settleCurrency",
		name: "结算币别",
		prop: "settleCurrency",
		disabled: true,
	},
	{
		btn:true,
		type: "string",
		key: "clientName",
		name: "委托方",
		prop: "clientName",
		readonly: true
	},
	{
		btn:true,
		type: "string",
		key: "customerName",
		name: "客户",
		prop: "customerName",
		readonly: true
	},
	{
		btn:true,
		type: "string",
		key: "companyName",
		name: "公司",
		prop: "companyName",
		readonly: true
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "payMode",
		key: "paymentType",
		name: "货价付款方式",
		prop: "paymentType"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "settlementMethod",
		key: "settlementMethod",
		name: "结算方式",
		prop: "settlementMethod"
	},
	{
		type: "string",
		btn: true,
		key: "salesGroup",
		name: "销售组织",
		prop: "salesGroup",
		readonly: true
	},
	{
		type: "money",
		key: "totalAmount",
		name: "合计金额",
		prop: "totalAmount",
		disabled: true
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "businessType",
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "declareCustoms",
		key: "declareCustoms",
		name: "报关类型",
		prop: "declareCustoms"
	},
	// {
	// 	type: "string",
	// 	key: "bizReceivable",
	// 	name: "业务应收",
	// 	prop: "bizReceivable"
	// },
	{
		type: "select",
		selectOption: [],
		selectKey: "InvoiceTypes",
		key: "invoiceType",
		name: "发票类型",
		prop: "invoiceType"
	},
	{
		type: "string",
		btn: true,
		key: "taxCategoryName",
		name: "税种",
		prop: "taxCategoryName"
	},
	{
		type: "string",
		key: "taxRate",
		name: "税率",
		prop: "taxRate"
	},
	// {
	// 	type: "string",
	// 	key: "financialReceivables",
	// 	name: "财务应收",
	// 	prop: "financialReceivables"
	// },
	{
		type: "date",
		key: "reportDate",
		name: "报表日期",
		prop: "reportDate"
	},
	{
		type: "money",
		key: "closureAmount",
		name: "已销账金额",
		prop: "closureAmount"
	},
	{
		type: "string",
		key: "parityFigure",
		name: "比价位数",
		prop: "parityFigure"
	},
	{
		type: "checkbox",
		key: "initDocuments",
		name: "初始化单据",
		prop: "initDocuments"
	},
	{
		type: "checkbox",
		key: "hasGenerated",
		name: "是否已生成凭证",
		prop: "hasGenerated"
	},
	{
		type: "checkbox",
		key: "noAddedTax",
		name: "不收杂费增值税",
		prop: "noAddedTax"
	},
	{
		type: "checkbox",
		key: "freeShipmentFee",
		name: "免收运费增值税",
		prop: "freeShipmentFee"
	},
	{
		type: "checkbox",
		key: "noOverTax",
		name: "逾期利息不收税",
		prop: "noOverTax"
	},
	{
		type: "checkbox",
		key: "noOverInterest",
		name: "不收逾期利息",
		prop: "noOverInterest"
	},
	{
		type: "checkbox",
		key: "hasOverInterest",
		name: "是否逾期利息",
		prop: "hasOverInterest"
	},
	{
		type: "checkbox",
		key: "agentBilling",
		name: "代理式计费",
		prop: "agentBilling"
	},
	{
		type: "checkbox",
		key: "hasStatement",
		name: "已生成结算单",
		prop: "hasStatement"
	},
	{
		type: "checkbox",
		key: "guaranteeCustomers",
		name: "信保客户",
		prop: "guaranteeCustomers"
	},
	{
		type: "checkbox",
		key: "hasCommissionImport",
		name: "是否已导入提成",
		prop: "hasCommissionImport"
	},
	{
		type: "checkbox",
		key: "hasCheck",
		name: "是否已审",
		prop: "hasCheck"
	},
	{
		type: "checkbox",
		key: "commissionOne",
		name: "佣金1",
		prop: "commissionOne"
	},
	{
		type: "checkbox",
		key: "commissionTwo",
		name: "佣金2",
		prop: "commissionTwo"
	},
	{
		type: "checkbox",
		key: "agentToEntrust",
		name: "代理单转委托单",
		prop: "agentToEntrust"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
    prop: "remark",
    layout: `flex-basis:100%;height:auto !important`
	}
	/* {
		type: "select",
		selectOption: [],
		selectKey: "orderStatus",
		key: "status",
		name: "状态",
		prop: "status"
	}, */
]