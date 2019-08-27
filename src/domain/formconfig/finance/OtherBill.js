import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo",
		disabled: true,
		rules,
	},
	{
		btn: true,
		type: "string",
		key: "companyName",
		name: "公司",
		prop: "companyName",
	},
	{
		type: "date",
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
	{
		btn: true,
		type: "string",
		key: "departmentName",
		name: "部门",
		prop: "departmentName",
	},
	{
		btn: true,
		type: "string",
		key: "handlerName",
		name: "经手人",
		prop: "handlerName",
	},
	/* {
		selectOption: [],
		select: true,
		selectKey: "orderStatus",
		key: "status",
		name: "状态",
		prop: "status"
	} */
]