import validate from '@/domain/common/validate'
const rules = validate.setRequired();
export default [
	{
		type: 'string',
		key: "centreDispatchCode",
		name: "集中调度单编码",
		prop: "centreDispatchCode",
		readonly: true,
		rules
	},
	// {
	// 	selectOption: [],
	// 	type: 'select',
	// 	selectKey: "orderStatus",
	// 	key: "billStatus",
	// 	name: "单据状态",
	// 	prop: "billStatus",
	// 	disabled:true,
	// 	rules
	// },
	{
		type: 'string',
		key: "totalOrders",
		name: "总单数",
		prop: "totalOrders",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			},
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		]
	},
	{
		type: 'string',
		key: "totalNumbers",
		name: "总件数",
		prop: "totalNumbers",
		rules
	},
	{
		type: true,
		type: 'string',
		key: "totalWeight",
		name: "总重量",
		prop: "totalWeight",
		rules
	},
	{
		btn:true,
		type: 'string',
		key: "dispatchOrderName",
		name: "调度单号",
		prop: "dispatchOrderName",
		rules
	},
	{
		type: 'textarea',
		key: "deliveryPoint",
		name: "派送点",
		prop: "deliveryPoint",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			},
		]
	},
	{
		type: 'textarea',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]