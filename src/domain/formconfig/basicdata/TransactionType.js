import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type : "string",
		key: "transactionCode",
		name: "事务类型编码",
		prop: "transactionCode",
		disabled: true,
        rules,
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "businessTypeG",
		key: "bizType",
		name: "业务类型",
		prop: "bizType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "transactionSourceType",
		key: "biType",
		name: "来源单据类型",
		prop: "biType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "transceiverType",
		key: "srType",
		name: "收发类型",
		prop: "srType"
	},
	{
		type : "string",
		key: "transactionName",
		name: "事务名称",
		prop: "transactionName",
        rules,
	},
	// {
	// 	type : "select",
	// 	selectOption: [],
	// 	selectKey: "billStatus",
	// 	key: "status",
	// 	name: "状态",
	// 	prop: "status"
	// },
	{
		type : "select",
		selectOption: [],
		selectKey: "warehouseStockType",
		key: "outType",
		name: "出库库存类型",
		prop: "outType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "warehouseStockType",
		key: "inType",
		name: "入库库存类型",
		prop: "inType"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "stockStatus",
		key: "outStatus",
		name: "出库库存状态",
		prop: "outStatus"
	},
	{
		type : "select",
		selectOption: [],
		selectKey: "stockStatus",
		key: "inStatus",
		name: "入库库存状态",
		prop: "inStatus"
	},
	{
		type : "string",
		key: "outStock",
		name: "出库影响现存量",
		prop: "outStock"
	},
	{
		type : "string",
		key: "inCost",
		name: "入库影响成本",
		prop: "inCost"
	},
	{
		type : "string",
		key: "outCost",
		name: "出库影响成本",
		prop: "outCost"
	},
	{
		type : "string",
		key: "unit",
		name: "管理单元",
		prop: "unit"
	}
]