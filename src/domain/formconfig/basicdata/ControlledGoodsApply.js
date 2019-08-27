import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type:"string",
		key: "controlledGoodsCode",
		name: "单据编码",
		prop: "controlledGoodsCode",
		disabled:true,
		rules
	},
	{
		type:"date",
		key: "formDate",
		name: "填表日期",
		prop: "formDate",
		rules
	},
	{
		type:"string",
		key: "singlePrice",
		name: "单价",
		prop: "singlePrice",
		rules
	},
	{
		type:"select",
		selectOption: [],
		selectKey: "documentType",
		key: "documentType",
		name: "证件类型",
		prop: "documentType",
		rules
	},
	{
		type:"string",
		key: "totalValue",
		name: "总货值",
		prop: "totalValue",
		rules
	},
	{
		type:"string",
		key: "entrustOrderNo",
		name: "委托单号",
		prop: "entrustOrderNo",
		rules
	},
	{
		type:"select",
		selectOption: [],
		key: "category",
		selectKey: "controlCategory",
		name: "类别",
		prop: "category",
		rules
	},
	{
		type:"string",
		key: "model",
		name: "型号",
		prop: "model",
		rules
	},
	{
		type:"string",
		btn:true,
		disabled:true,
		name: "申请人",
		key: "applicantName",
		api:"getEmployeeInfo",
		tableConfig:[
			{
				name:"申请人",
				key: "employeeInfoName",
				value:"applicantName"
			},
			{
				name:"申请人编码",
				key: "employeeInfoCode",
				value:"applicant"
			},
		],
		rules
	},
	{
		type:"string",
		btn:true,
		disabled:true,
		name: "品牌",
		key: "brandName",
		api:"getBrandList",
		tableConfig:[
			{
				name:"品牌",
				key: "brandName",
				value:"brandName"
			},
			{
				name:"品牌编码",
				key: "brandCode",
				value:"brand"
			},
		],
		rules
	},
	{
		type:"string",
		key: "copies",
		name: "份数",
		prop: "copies"
	},
	{
		type:"string",
		key: "singleNubs",
		name: "单次数量",
		prop: "singleNubs"
	},
	{
		type:"select",
		key: "currency",
		name: "币种",
		selectKey: "currencyName",
		prop: "currency",
		selectOption: [],
		rules
	},
	{
		type:"string",
		key: "receiptNo",
		name: "收据编号",
		prop: "receiptNo"
	},
	{
		type:"date",
		key: "applyDate",
		name: "申请日期",
		prop: "applyDate"
	},
	{
		type:"checkbox",
		key: "hasApproval",
		name: "已获批",
		prop: "hasApproval"
	},
	{
		type:"checkbox",
		key: "noFinalCustomer",
		name: "非我司最终用户",
		prop: "noFinalCustomer"
	},
	{
		type:"string",
		key: "description",
		name: "产品描述",
		prop: "description",
		rules
	},
	{
		type:"string",
		key: "preClassNo",
		name: "预分类编号",
		prop: "preClassNo"
	},
	{
		type:"string",
		key: "ccats",
		name: "CCATS",
		prop: "ccats"
	},
	{
		type:"date",
		key: "hasApprovalDate",
		name: "获批日期",
		prop: "hasApprovalDate"
	},
	{
		btn:true,
		type:"string",
		key: "entryPerson",
		name: "收据编号录入人",
		prop: "entryPerson"
	},
	{
		type:"string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]