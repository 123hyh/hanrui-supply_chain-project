import validate from "@/domain/common/validate"
export default [{
    type: "string",
    key: "preCustomsCode",
    name: "单据编号",
    prop: "preCustomsCode",
    disabled: true,
  },
  {
		type: "string",
		key: "contractNo",
		name: "合同号",
		prop: "contractNo"
	},
	{
		btn: true,
		type: "string",
		key: "deliveryNo",
		name: "提运单号",
		prop: "deliveryNo",
		disabled: true,
	},
	{
		type: "string",
		key: "carNo",
		name: "车次",
		prop: "carNo",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		key: "customsFormType",
		selectKey: "declareCustoms",
		name: "报关类型",
		prop: "customsFormType"
	},
	{
		type: "string",
		key: "entryPort",
		name: "口岸",
		prop: "entryPort",
		disabled: true,
	},
	{
		type: "string",
		key: "conveyance",
		name: "运输工具",
		prop: "conveyance",
		disabled: true,
	},
	{
		type: "date",
		key: "loadingTime",
		name: "装车日期",
		prop: "loadingTime",
		disabled: true,
	},
	{
		type: "string",
		key: "paperPages",
		name: "纸张页数",
		prop: "paperPages",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "totalItem",
		name: "总项数",
		prop: "totalItem",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "customBoxQuantity",
		name: "待报关总箱数",
		prop: "customBoxQuantity",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "string",
		key: "originOrder",
		name: "来源单据",
		prop: "originOrder",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		key: "orderStatus",
		selectKey: "orderStatus",
		name: "单据状态",
		prop: "orderStatus",
		disabled: true,
	},
	{
		selectOption: [],
		type: "select",
		key: "customsStatus",
		selectKey: "CustomsDeclarationStatus",
		name: "报关状态",
		prop: "customsStatus",
		disabled: true,
	},
	{
		type: "string",
		key: "containerNo",
		name: "集装箱号",
		prop: "containerNo"
	},
	{
		type: "string",
		key: "containerModel",
		name: "集装箱规格",
		prop: "containerModel"
	},
	{
		type: "string",
		key: "voyageNo",
		name: "航次号",
		prop: "voyageNo"
	},
	{
		type: "string",
		key: "vehicleSequence",
		name: "车序",
		prop: "vehicleSequence",
		disabled: true,
	},
	{
		type: "string",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		type: "string",
		key: "packageKind",
		name: "包装种类",
		prop: "packageKind",
		disabled: true,
	},
	{
		type: "string",
		key: "grossWeight",
		name: "毛重",
		prop: "grossWeight",
		rules: [{
			validator: validate.validateNum,
			trigger: ['blur','change']
		}]
	},
	{
		type: "textarea",
		key: "brandConfirm",
		name: "品牌确认",
		prop: "brandConfirm"
	}
]
