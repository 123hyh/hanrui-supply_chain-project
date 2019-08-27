import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		title: "", showline: false, list: [
			{
				type: "string",
				btn: true,
				key: "businessUnitName",
				name: "经营单位",
				prop: "businessUnitName",
				readonly: true,
				rules,
			},
			{
				type: "string",
				btn: true,
				key: "declarationUnitName",
				name: "申报单位",
				prop: "declarationUnitName",
				readonly: true,
				rules,
			},
			{
				type: "string",
				key: "contractNo",
				name: "合同号",
				prop: "contractNo",
				disabled:true,
				rules,
			},
			{
				type: "checkbox",
				key: "customerAppointContact",
				name: "客户指定合同",
				prop: "customerAppointContact",
			},
			{
				type: "checkbox",
				key: "buyInsurance",
				name: "我司购买保险",
				prop: "buyInsurance"
			},
			{
				type: "checkbox",
				key: "reportAlone",
				name: "需单独报关",
				prop: "reportAlone"
			},
			{
				type: "checkbox",
				key: "originTariffFree",
				name: "原产地减免关税",
				prop: "originTariffFree"
			},
			{
				type: "checkbox",
				key: "appointBusinessUnit",
				name: "指定经营单位", //add
				prop: "appointBusinessUnit"
			},
		]
	},
	{
		title: "进口", showline: true, list: [
			{
				selectOption: [],
				type: "select",
				key: "receiveUnitType",
				selectKey: "receiveUnitType",
				name: "收货单位类型",
				prop: "receiveUnitType",
				rules,
			},
			{
				type: "string",
				btn: true,
				key: "receiveUnitName",
				name: "收货单位",
				prop: "receiveUnitName",
				readonly: true,
				rules,
			},
			{
				selectOption: [],
				type: "select",
				selectKey: "entryPort",
				key: "importPortName",
				name: "进口口岸",
				prop: "importPortName",
				disabled:true,
			},
			{
				selectOption: [],
				type: "select",
				key: "sellerType",
				selectKey: "receiveUnitType",
				name: "报关卖方类型",
				prop: "sellerType",
				rules,
			},
			{
				type: "string",
				btn: true,
				key: "sellerName",
				name: "报关合同卖方",
				prop: "sellerName",
				readonly: true,
				rules,
			},
		]
	},
	{
		title: "出口", showline: true, list: [
			{
				selectOption: [],
				type: "select",
				selectKey: "receiveUnitType",
				key: "sendUnitType",
				name: "发货单位类型",
				prop: "sendUnitType",
				rules
			},
			{
				type: "string",
				btn: true,
				key: "sendUnitName",//sendUnit
				name: "发货单位",
				prop: "sendUnitName",
				readonly: true,
				rules,
			},
			{
				selectOption: [],
				type: "select",
				key: "importExportHandoverMode",
				selectKey: "importExportHandoverMode",
				name: "FCL/LCF",
				prop: "importExportHandoverMode",
			},
			{
				selectOption: [],
				type: "select",
				selectKey: "entryPort",
				key: "exportPort",
				name: "出口口岸",
				prop: "exportPort",
			},
			{
				selectOption: [],
				type: "select",
				selectKey: "receiveUnitType",
				key: "customsBuyerType",
				name: "报关买方类型",
				prop: "customsBuyerType",
				rules
			},
			{
				type: "string",
				btn: true,
				key: "customsContractBuyerName",//编码 customsContractBuyer
				name: "报关合同买方",
				prop: "customsContractBuyerName",
				readonly: true,
				rules,
			},
			{
				type: "string",
				key: "containerNumber",
				name: "柜型及数量",
				prop: "containerNumber"
			},
			{
				type: "string",
				btn: true,
				type: "string",
				key: "arrivalCountryName",//arrivalCountry
				name: "抵运国",
				prop: "arrivalCountryName",
				readonly: true,
			},
		]
	},
	// {
	// 	type: "checkbox",
	// 	key: "manualSetting",
	// 	name: "手工设置委托单用", //add
	// 	prop: "manualSetting"
	// },
	// {
	// 	// selectOption: [],
	// 	// type: "select",
	// 	type: "checkbox",
	// 	key: "franchisePayAlone",
	// 	// selectKey: 'concessionFeeSeparately',
	// 	name: "特许权费另行支付", //add
	// 	prop: "franchisePayAlone"
	// },
	// {
	// 	// selectOption: [],
	// 	// type: "select",
	// 	key: "specialRelated",
	// 	// selectKey: 'hasSpecialRelationship',
	// 	type: "checkbox",
	// 	name: "存在特殊关系", //add
	// 	prop: "specialRelated"
	// },
	// {
	// 	// selectOption: [],
	// 	// type: "select",
	// 	type: "checkbox",
	// 	key: "influencePrice",
	// 	// selectKey: 'AffectPrices',
	// 	name: "影响价格", //add
	// 	prop: "influencePrice"
	// },
]