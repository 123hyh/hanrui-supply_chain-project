import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "shippingRouteCode",
		name: "发运路线编码",
		prop: "shippingRouteCode",
		rules
	},
	{
		type: 'string',
		key: "shippingRouteName",
		name: "发运路线名称",
		prop: "shippingRouteName",
		rules
	},
	{
		type: 'string',
		key: "startPlace",
		name: "起始地",
		prop: "startPlace",
		rules
	},
	{
		type: 'string',
		key: "endPlace",
		name: "到达地",
		prop: "endPlace",
		rules
	},
	{
		type: 'string',
		key: "carrierName",
		name: "默认供应商",
		prop: "carrierName",
		readonly: true,
		btn: true
	},
	{
		type: 'string',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]