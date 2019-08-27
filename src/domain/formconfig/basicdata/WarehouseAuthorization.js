import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "authWarehouseCode",
		name: "授权仓库组织编码",
		prop: "authWarehouseCode",
		disabled: true,
        rules,
	},
	{
		type : "string",
		key: "authWarehouseName",
		name: "授权仓库组织名称",
		prop: "authWarehouseName",
        rules,
	},
	{
		type : "string",
		key: "warehouseNo",
		name: "仓库编码",
		prop: "warehouseNo",
        rules,
	},
	{
		type : "date",
		key: "fiscalYear",
		name: "会计年度",
		prop: "fiscalYear"
	},
	{
		type : "string",
		key: "period",
		name: "会计期间",
		prop: "period"
	},
	{
		type : "checkbox",
		key: "initEnd",
		name: "结束初始化",
		prop: "initEnd"
	},
/* 	{
		type : "checkbox",
		key: "status",
		name: "状态",
		prop: "status"
	} */
]