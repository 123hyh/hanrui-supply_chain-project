import validate from '@/domain/common/validate';
export default [
// 	{
// 		type: "string",
// 		key: "solutionNo",
// 		name: "方案编号",
// 		prop: "solutionNo",
// 		disabled: true,
// 	},
// 	{
// 		type: "string",
// 		key: "supplierCode",
// 		name: "供应商编号",
// 		prop: "supplierCode",
// 		disabled: true,
// 	},
	{
		type: "string",
		btn: true,
		key: "supplierName",
		name: "供应商名称",
		prop: "supplierName",
		readonly: true
	},
	{
		type: "string",
		key: "supplierNameEn",
		name: "供应商外文名称",
		prop: "supplierNameEn",
		disabled: true
	},
	{
		type: "string",
		key: "chargeItemCode",
		name: "计费项目编码",
		prop: "chargeItemCode",
		btn: true,
		readonly: true
	},
	{
		type: "string",
		key: "chargeItemName",
		name: "计费项目名称",
		prop: "chargeItemName",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "paymentForDelivery",
		key: "receivableMethod",
		name: "收款方式",
		prop: "receivableMethod"
	},
	{
		type: "string",
		key: "accountPeriod",
		name: "账期(天)",
		prop: "accountPeriod",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "insideDayRate",
		name: "账期内日利率 %",
		prop: "insideDayRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "outsideDayRate",
		name: "超期日利率 %",
		prop: "outsideDayRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "dayRate",
		name: "内部结算日利率 %",
		prop: "dayRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "breachDayRate",
		name: "违约日利率 %",
		prop: "breachDayRate",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "checkbox",
		key: "noInterestDays",
		name: "不加免息天数",
		prop: "noInterestDays",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "checkbox",
		key: "chargeInterest",
		name: "单独计息",
		prop: "chargeInterest"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "settlementMethod",
		key: "chargeMode",
		name: "结算方式",
		prop: "chargeMode"
	},
	{
		type: "checkbox",
		key: "dcount",
		name: "贴现",
		prop: "dcount"
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "DiscountType",
		key: "discountType",
		name: "贴现类型",
		prop: "discountType"
	},
	{
		type: "string",
		key: "discountLimit",
		name: "货款贴现额度",
		prop: "discountLimit",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		selectOption: [],
		type: "select",
		selectKey: "transferOutCurrency",
		key: "currency",
		name: "币别",
		prop: "currency"
	},
	{
		type: "string",
		key: "discountRatio",
		name: "每单贴现比例 %",
		prop: "discountRatio",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	}
]