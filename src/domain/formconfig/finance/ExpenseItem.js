import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "billNo",
		name: "费用报销单编码",
		prop: "billNo",
		disabled: true,
		rules,
	},
	{
		selectOption: [],
		type: "select",
		key: "bizType",
    	selectKey: "businessType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		selectOption: [],
		type: "select",
		key: "feeType",
    	selectKey: "currencyName",
		name: "费用类型",
		prop: "feeType"
	},
	{
		type: "string",
		key: "description",
		name: "费用说明",
		prop: "description"
	},
	{
		type: "string",
		key: "referencePerson",
		name: "参考人员",
		prop: "referencePerson"
	},
	{
		type: "date",
		key: "happenDate",
		name: "发生时间",
		prop: "happenDate"
	},
	{
		type: "string",
		key: "applicationAmount",
		name: "申请金额",
		prop: "applicationAmount"
	},
	{
		type: "string",
		key: "authorizedAmount",
		name: "核定金额",
		prop: "authorizedAmount"
	},
	{
		btn:true,
		type: "string",
		key: "paymentDept",
		name: "费用支付部门",
		prop: "paymentDept"
	},
	{
		btn:true,
		type: "string",
		key: "paymentCompany",
		name: "费用支付公司",
		prop: "paymentCompany"
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]