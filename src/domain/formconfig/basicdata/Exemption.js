import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "exemptionCode",
		name: "编码",
		prop: "exemptionCode",
		rules
	},
	{
		type: 'string',
		key: "supplierName",
		name: "供应商",
		prop: "supplierName",
		readonly: true,
		btn: true,
    rules,
    isShow: true
	},
	{
		type: 'string',
		key: "exemptionName",
		name: "征免性质全称",
		prop: "exemptionName",
		rules
	},
	{
		type: 'string',
		key: "exemptionAbb",
		name: "征免性质简称",
		prop: "exemptionAbb",
		rules
	},
	{
		type: 'string',
		key: "customsCode",
		name: "征免性质代码",
		prop: "customsCode",
		rules
	},
	{
		type: 'string',
		key: "description",
		name: "描述",
    prop: "description",
    isShow: true
	}
]