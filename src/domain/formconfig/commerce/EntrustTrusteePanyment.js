import validate from "@/domain/common/validate"
export default [
	// {
	// 	type: "string",
	// 	key: "itemCode",
	// 	name: "表业务主键编号",
	// 	prop: "itemCode"
	// },
	// {
	// 	type: "string",
	// 	key: "entrustOrderNo",
	// 	name: "委托订单号",
	// 	prop: "entrustOrderNo",
	// 	disabled: true,
	// },
	{
		btn: true, 
		type: 'string',
		key: "settlementUnitName",
		name: "结算单位",
		prop: "settlementUnitName",
		// selectOption: [],
		// type: "select",
		// selectKey: "settlementUnitType",
		// key: "settlementUnit",
		// name: "结算单位",
		// prop: "settlementUnit"
	},
	{
		type: "string",
		key: "inOutType",
		name: "收付类别",
		prop: "inOutType"
	},
	{
		type: "string",
		selectOption: [],
		select: true,
		key: "unitType",
		name: "往来户类型",
		prop: "unitType"
	},
	// {
	// 	type: "string",
	// 	key: "unitCode",
	// 	name: "往来户编码",
	// 	prop: "unitCode"
	// },
	{
		type: "string",
		key: "unitName",
		name: "往来户名称",
		prop: "unitName"
	},
	{
		type: "string",
		key: "unitEnName",
		name: "往来户英文名称",
		prop: "unitEnName"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "InvoiceTypes",
		key: "invoiceType",
		name: "发票类型",
		prop: "invoiceType"
	},
	{
		type: "string",
		key: "paymentNature",
		name: "付款性质",
		prop: "paymentNature"
	},
	{
		type: "string",
		key: "paymentType",
		name: "付款期限",
		prop: "paymentType"
	},
	{
		type: "date",
		key: "settlementDate",
		name: "约定结算日期",
		prop: "settlementDate"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "settlementCurrentcy",
		name: "约定结算币别",
		prop: "settlementCurrentcy"
	},
	{
		type: "string",
		key: "paymentAmount",
		name: "约定付款金额",
		prop: "paymentAmount"
	},
	{
		type: "string",
		key: "otherAmount",
		name: "付杂费金额",
		prop: "otherAmount",
		rules: [{
			validator: validate.validateNaN,
			trigger: ['blur', 'change']
		}],
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "currencyName",
		key: "otherCurrency",
		name: "杂费币种",
		prop: "otherCurrency"
	},
	{
		type: "checkbox",
		key: "paidOtherFee",
		name: "是否已付杂费",
		prop: "paidOtherFee"
	},
	{
		type: "checkbox",
		key: "consignmentPayment",
		name: "是否已委托付款",
		prop: "consignmentPayment"
	}
]