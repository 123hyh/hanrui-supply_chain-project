import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
		{
			type: "string",
			key: "subjectCode",
			name: "科目编号",
			prop: "subjectCode",
			disabled: true,
			rules
		},
		{
			type: "string",
			key: "subjectName",
			name: "科目名称",
			prop: "subjectName",
			rules
		},
		{
			type: "select",
			selectOption: [],
			selectKey: "subjectType",
			key: "subjectType",
			name: "科目类别",
			prop: "subjectType"
		},
		{
			type: "select",
			selectOption: [],
			selectKey: "balanceAspect",
			key: "balanceAspect",
			name: "余额方向",
			prop: "balanceAspect"
		},
		{
			type: "select",
			selectOption: [],
			selectKey: "subjectFormat",
			key: "subjectFormat",
			name: "科目格式",
			prop: "subjectFormat"
		},
		{
			type: "checkbox",
			key: "accountingByDaty",
			name: "日记帐",
			prop: "accountingByDaty"
		},
		{
			type: "checkbox",
			key: "externalCurrencyAccounting",
			name: "外币核算",
			prop: "externalCurrencyAccounting"
		},
		{
			type: "select",
			selectOption: [],
			selectKey: "currencyName",
			key: "currency",
			name: "币种",
			prop: "currency"
		},
		{
			type: "checkbox",
			key: "quantityManage",
			name: "数量管理",
			prop: "quantityManage"
		},
		{
			btn:true,
			type: "string",
			key: "unitName",
			name: "单位",
			prop: "unitName"
		},
		{
			type: "checkbox",
			key: "changeRateTermEnd",
			name: "期未调汇",
			prop: "changeRateTermEnd"
		},
		{
			type: "string",
			key: "memoCode",
			name: "助记码",
			prop: "memoCode"
		},
		{
			type: "string",
			key: "subjectRemark",
			name: "科目说明",
			prop: "subjectRemark"
		},
		{
			type: "select",
			selectOption: [],
			selectKey: "accountingItem",
			key: "accountingItem",
			name: "核算",
			prop: "accountingItem"
		},
		{
			type: "checkbox",
			key: "dealings",
			name: "往来单位",
			prop: "dealings"
		},
		{
			type: "checkbox",
			prop: "department",
			name: "部门",
			prop: "department"
		},
		{
			type: "checkbox",
			key: "person",
			name: "人员",
			prop: "person"
		},
		{
			btn:true,
			type: "string",
			key: "accountingItemName",//accountingItemCode
			name: "核算项目",
			prop: "accountingItemName",
		},
		{
			type: "string",
			key: "itemRemark",
			name: "项目备注",
			prop: "itemRemark"
		},
		{
			type: "checkbox",
			key: "effective",
			name: "科目有效",
			prop: "effective"
		}
]