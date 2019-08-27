import validate from "@/domain/common/validate"
const rules = validate.setRequired()
//提货信息
export default [
	{
	  type: "money",
	  key: "agencyFee",
	  name: "代理报检费",
	  prop: "agencyFee",
	},
	{
	  type: "money",
	  key: "quarantineFee",
	  name: "检疫费",
	  prop: "quarantineFee",
	},
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'goodsValuecurrency',
		selectKey: "currencyName",
		key: "goodsValue",
		prop: "goodsValue",
		name: "卖方销售总货值",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "goodsValue",
	// 	name: "卖方销售总货值",
	// 	prop: "goodsValue",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "goodsValuecurrency",
	// 	selectKey: "currencyName",
	// 	name: "卖方销售币别",
	// 	prop: "goodsValuecurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'customTotalAmountcurrency',
		selectKey: "currencyName",
		key: "customTotalAmount",
		prop: "customTotalAmount",
		name: "关税合计",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "customTotalAmount",
	// 	name: "关税合计",
	// 	prop: "customTotalAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "customTotalAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "关税合计币别",
	// 	prop: "customTotalAmountcurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'vatTotalAmountcurrency',
		selectKey: "currencyName",
		key: "vatTotalAmount",
		prop: "vatTotalAmount",
		name: "增值税合计",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "vatTotalAmount",
	// 	name: "增值税合计",
	// 	prop: "vatTotalAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "vatTotalAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "增值税合计币别",
	// 	prop: "vatTotalAmountcurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'totalServiceChargecurrency',
		selectKey: "currencyName",
		key: "totalServiceCharge",
		prop: "totalServiceCharge",
		name: "服务费总和",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "totalServiceCharge",
	// 	name: "服务费总和",
	// 	prop: "totalServiceCharge",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "totalServiceChargecurrency",
	// 	selectKey: "currencyName",
	// 	name: "服务费币别",
	// 	prop: "totalServiceChargecurrency",
	// 	disabled: true,
	// },
	{
		type: "checkbox",
		key: "matPayment",
		name: "是否垫货款",
		prop: "matPayment",
	},
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'trusteePayGoodsAmountcurrency',
		selectKey: "currencyName",
		key: "trusteePayGoodsAmount",
		prop: "trusteePayGoodsAmount",
		name: "受托方应付货款总额",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "trusteePayGoodsAmount",
	// 	name: "受托方应付货款总额",
	// 	prop: "trusteePayGoodsAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "trusteePayGoodsAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "受托方应付货款币别",
	// 	prop: "trusteePayGoodsAmountcurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'invoiceAmountcurrency',
		selectKey: "currencyName",
		key: "invoiceAmount",
		prop: "invoiceAmount",
		name: "应开票金额",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "invoiceAmount",
	// 	name: "应开票金额",
	// 	prop: "invoiceAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "invoiceAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "应开票币别",
	// 	prop: "invoiceAmountcurrency",
	// 	disabled: true,
	// },
	// {
	// 	type: "string",
	// 	key: "advanceActualAmount",
	// 	name: "预计收款金额",
	// 	prop: "advanceActualAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'advanceActualAmountcurrency',
		selectKey: "currencyName",
		key: "advanceAmount",
		prop: "advanceAmount",
		name: "预计应收总额",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "advanceAmount",
	// 	name: "预计应收总额",
	// 	prop: "advanceAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "advanceActualAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "预计收款币别",
	// 	prop: "advanceActualAmountcurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'refundCustomerAmountcurrency',
		selectKey: "currencyName",
		key: "refundCustomerAmount",
		prop: "refundCustomerAmount",
		name: "应退客户货款",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "refundCustomerAmount",
	// 	name: "应退客户货款",
	// 	prop: "refundCustomerAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "refundCustomerAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "应退客户货款币别",
	// 	prop: "refundCustomerAmountcurrency",
	// 	disabled: true,
	// },
	{
		selectOption: [],
		type: "select",
		selectdisabled:true,
		money: true,
		typekey:'paidGoodsAmountcurrency',
		selectKey: "currencyName",
		key: "paidGoodsAmount",
		prop: "paidGoodsAmount",
		name: "已付货款总额",
		disabled: true,
	},
	// {
	// 	type: "string",
	// 	key: "paidGoodsAmount",
	// 	name: "已付货款总额",
	// 	prop: "paidGoodsAmount",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	// {
	// 	selectOption: [],
	// 	type: "select",
	// 	key: "paidGoodsAmountcurrency",
	// 	selectKey: "currencyName",
	// 	name: "已付货款总额币别",
	// 	prop: "paidGoodsAmountcurrency",
	// 	disabled: true,
	// },
	{
		type: "string",
		key: "dayRate",
		name: "日利率%",
		prop: "dayRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur', 'change']
		}],
		disabled: true
	},
	{
		type: "checkbox",
		key: "chargeInterest",
		name: "计息",
		prop: "chargeInterest",
	},
	// {
	// 	type: "select",
	// 	selectOption: [],
	// 	key: "invoiceType",
	// 	selectKey: "invoiceType",
	// 	name: "开票类型",
	// 	prop: "invoiceType",
	// },
	{
	  selectOption: [],
	  type: 'select',
	  selectKey: 'InvoiceTypes',
	  key: 'invoiceType',
	  name: '发票类型',
	  prop: 'invoiceType',
	  disabled: true
	},
	{
		type: 'string',
		isShow:true,
		key: "minCharge",
		name: "最低消费额",
		prop: "minCharge",
	},
	{
		type: "money",
		key: "minimumCharge",
		name: "最低消费差额",
		prop: "minimumCharge",
		disabled: true,
	},
	// {
	// 	type: "date",
	// 	key: "advanceReceivableDate",
	// 	name: "预计收款日",
	// 	prop: "advanceReceivableDate"
	// },
	{
		selectOption: [],
		type: "select",
		key: "supplierPayMode",
		selectKey: "paymentToSuppliers",
		name: "付供应商货款方式",
		prop: "supplierPayMode",
		rules
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "pickingInformation",
		key: "pickUpType",
		name: "提货信息",
		prop: "pickUpType",
		rules
	},
	{
		type: "string",
		key: "specialTips",
		name: "特别提示",
		prop: "specialTips",
		disabled: true
	},
	// {
	// 	type: "string",
	// 	key: "serviceChargeDis",
	// 	name: "服务费折让",
	// 	prop: "serviceChargeDis",
	// 	rules: [{
	// 		validator: validate.validateNum,
	// 		trigger: ['blur', 'change']
	// 	}],
	// 	disabled: true
	// },
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark",
	},
	{
		type: "textarea",
		key: "invoiceRemark",
		name: "发票备注",
		prop: "invoiceRemark"
	},
]
