import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: "string",
		key: "billNo",
		name: "应收结算单编码",
		prop: "billNo",
		readonly: true,
		rules
	},
	{
		type: "string",
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo",
		readonly: true,
		rules
	},
	{
		type: "string",
		key: "materielCode",
		name: "物料编码",
		prop: "materielCode",
		rules
	},
	{
		type: "string",
		key: "materielName",
		name: "物料名称",
		prop: "materielName",
		rules
	},
	{
		type: "string",
		key: "materielType",
		name: "物料型号",
		prop: "materielType",
		rules
	},
	{
		type: "string",
		key: "measurement",
		name: "卖方销售计量单位",
		prop: "measurement",
		rules
	},
	{
		type: "string",
		key: "quantity",
		name: "数量",
		prop: "quantity",
		rules: [{ required: true, message: '必填', trigger: 'blur' },{validator: validate.validateNaN,trigger: ['blur', 'change']}]
	},
	{
		type: "money",
		key: "unitPrice",
		name: "卖方销售单价",
		prop: "unitPrice",
		rules: [{ required: true, message: '必填', trigger: 'blur' },{validator: validate.validateNum,trigger: ['blur', 'change']}]
	},
	{
		type: "select",
		selectOption: [],
		selectKey: "currencyName",
		key: "currency",
		name: "卖方销售币种",
		prop: "currency",
		rules
	},
	{
		type: "money",
		key: "actualUnitPrice",
		name: "实际单价",
		prop: "actualUnitPrice",
		rules: [{ required: true, message: '必填', trigger: 'blur' },{validator: validate.validateNum,trigger: ['blur', 'change']}]
	},
	{
		type: "money",
		key: "amount",
		name: "金额",
		prop: "amount",
		rules: [{ required: true, message: '必填', trigger: 'blur' },{validator: validate.validateNum,trigger: ['blur', 'change']}]
	},
	{
		type: "string",
		key: "tariff",
		name: "关税",
		prop: "tariff"
	},
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
	// {
	// 	type: "string",
	// 	key: "itemCode",
	// 	name: "子表编码",
	// 	prop: "itemCode",
	// 	rules: [{
	// 		required: true,
	// 		message: '必填',
	// 		trigger: 'blur',
	// 	}]
	// },
]