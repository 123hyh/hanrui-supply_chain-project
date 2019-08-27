import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "warehouseCode",
		name: "仓库编码",
		prop: "warehouseCode",
		disabled: true,
		rules
	},
	{
		type : "string",
		key: "warehouseName",
		name: "仓库名称",
		prop: "warehouseName",
		rules
	},
	{
		type : "string",
		key: "warehouseGroupName",
		name: "仓库组织",
		prop: "warehouseGroupName",
		readonly: true,
		btn:true,
		rules
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "warehouseStatus",
		key: "warehouseStatus",
		name: "状态",
		prop: "warehouseStatus",
		rules
	},
	{
		type : "select",
		selectOption: [],
		key: "province",
		name: "省",
		prop: "province",
	},
	{
		type : "select",
		selectOption: [],
		key: "city",
		name: "市",
		prop: "city",
	},
	{
		type : "select",
		selectOption: [],
		key: "district",
		name: "区县",
		prop: "district",
	},
	{
		type : "string",
		key: "address",
		name: "仓库地址",
		prop: "address",
		rules
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "depositType",
		key: "depositType",
		name: "储位存放类型",
		prop: "depositType",
		rules
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "stockType",
		key: "stockType",
		name: "存货类型",
		prop: "stockType",
		rules
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "stockStatus",
		key: "stockStatus",
		name: "库存状态",
		prop: "stockStatus",
		rules
	},
	{
		type : "string",
		key: "phone",
		name: "仓库电话",
		prop: "phone",
		rules
	},
	{
		type : "string",
		key: "fax",
		name: "仓库传真",
		prop: "fax"
	},
	{
		type : "string",
		key: "warePerson",
		name: "仓库责任人",
		prop: "warePerson",
		rules
	},
	{
		type : "string",
		key: "wareTelephone",
		name: "仓库责任电话",
		prop: "wareTelephone",
	}
]