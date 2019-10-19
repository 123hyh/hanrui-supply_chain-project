import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [

	{
		type: 'string',
		key: "specification",
		name: "规格型号",
		prop: "specification",
	},
	{
		type: 'string',
		key: "clientName",
		name: "委托方",
		prop: "clientName",
		readonly: true,
		btn: true,
	},
	{
		selectOption: [],
		type:"select",
		selectKey: "declareCustoms",
		key: "reportGateType",
		name: "报关类型",
		prop: "reportGateType",
	},
/* 	{
		type: 'string',
		key: "declareType",
		name: "申报型号",
		prop: "declareType"
  } */
]