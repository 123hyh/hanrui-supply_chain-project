import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
/* 	{
		type: 'string',
		key: "customsTariffCode",
		name: "关务税则编码",
		prop: "customsTariffCode",
		rules
	},
	{
		type: 'string',
		key: "taxNo",
		name: "税号",
		prop: "taxNo",
		rules
	},
	{
		type: 'string',
		key: "attachNo",
		name: "附号",
		prop: "attachNo",
		// rules
	},
	{
		type: 'string',
		key: "tradeName",
		name: "商品名称",
		prop: "tradeName",
		rules
	},
	{
		type: 'string',
		key: "minTariff",
		name: "最低关税(%)",
		prop: "minTariff",
		rules
	},
	{
		type: 'string',
		key: "maxTariff",
		name: "最高关税(%)",
		prop: "maxTariff",
		rules
	},
	{
		type: 'string',
		key: "rebateRate",
		name: "退税率(%)",
		prop: "rebateRate",
		rules
	},
	// {
	// 	type: 'string',
	// 	key: "firstUnitCode",
	// 	name: "第一单位",
	// 	prop: "firstUnitCode"
	// },
	{
		type: 'string',
		key: "firstUnitName",
		name: "第一单位名称",
		prop: "firstUnitName",
		readonly: true,
		btn: true,
		rules
	}, */
	// {
	// 	type: 'string',
	// 	key: "secondUnitCode",
	// 	name: "第二单位",
	// 	prop: "secondUnitCode"
	// },
	{
		type: 'string',
		key: "secondUnitName",
		name: "第二单位名称",
		prop: "secondUnitName",
		readonly: true,
		btn: true,
    rules,
    isShow: true
	},
	// {
	// 	type: 'string',
	// 	key: "transactionUnitCode",
	// 	name: "成交单位",
	// 	prop: "transactionUnitCode"
	// },
/* 	{
		type: 'string',
		key: "transactionUnitName",
		name: "成交单位名称",
		prop: "transactionUnitName",
		readonly: true,
		btn: true,
		rules
	}, */
	{
		type: 'string',
		key: "valueAddRate",
		name: "增值税税率(%)",
		prop: "valueAddRate",
		rules
	},
/* 	{
		type: 'string',
		key: "superConditionName",
		name: "监管条件",
		prop: "superConditionName",
		readonly: true,
		btn: true,
		rules
	}, */
	{
		type: 'string',
		key: "taRemarks",
		name: "备注",
		prop: "taRemarks"
	}
]