import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "voucherSummaryCode",
		name: "编码",
		prop: "voucherSummaryCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "voucherSummaryName",
		name: "名称",
		prop: "voucherSummaryName",
        rules,
	},
	{
		type : "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]