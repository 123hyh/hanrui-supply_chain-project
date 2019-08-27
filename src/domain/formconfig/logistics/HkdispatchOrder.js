import validate from '@/domain/common/validate'
export default [
	{
		type: 'string',
		key: "dispatchOrderCode",
		name: "调度单号",
		prop: "dispatchOrderCode",
		readonly: true
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "orderStatus",
		key: "billStatus",
		name: "单据状态",
		prop: "billStatus",
		disabled:true,
	},
	// {
	// 	type: 'string',
	// 	key: "operator",
	// 	name: "操作人",
	// 	prop: "operator",
	// 	readonly: true
	// },
	// {
	// 	type: 'date',
	// 	key: "operateTime",
	// 	name: "操作时间",
	// 	prop: "operateTime",
	// 	disabled:true,
	// },
	{
		selectOption: [],
		type: 'select',
		selectKey: "schedulingType",
		key: "dispatchType",
		name: "调度类型",
		prop: "dispatchType",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		btn:true,
		type: 'string',
		key: "deliveryTrain",
		name: "配送车次",
		prop: "deliveryTrain",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'date',
		key: "deliveryTime",
		name: "配送时间",
		prop: "deliveryTime",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		btn: true,
		type: 'string',
		key: "plateNo",
		name: "车辆",
		prop: "plateNo",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: true,
		type: 'string',
		key: "capacity",
		name: "载重(kg)",
		prop: "capacity",
		rules: [
			{ required: true, message: '必填', trigger: 'blur' },
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		],
		
	},
	{
		btn: true,
		type: 'string',
		key: "carrier",
		name: "承运方",
		prop: "carrier",
		readonly:true,
	},   
	{
		btn: true,
		type: 'string',
		key: "driver",
		name: "司机",
		prop: "driver",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'string',
		key: "driverPhone",
		name: "司机电话",
		prop: "driverPhone",
		disabled: true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'string',
		key: "packageNumber",
		name: "可载件数",
		prop: "packageNumber",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			},
			{
				validator: validate.validateNum,
				trigger: ['blur','change']
			}
		]
	},
	{	btn:true,
		type: 'string',
		key: "stocker",
		name: "备货人",
		prop: "stocker",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type: 'date',
		key: "stockTime",
		name: "备货时间",
		prop: "stockTime",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "stockingStatus",
		key: "stockStatus",
		name: "备货状态",
		prop: "stockStatus",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		selectOption: [],
		type: 'select',
		selectKey: "feePlan",
		key: "chargingScheme",
		name: "计费方案",
		prop: "chargingScheme",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		btn: true,
		type: 'string',
		key: "shopper",
		name: "配送员",
		prop: "shopper",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'checkbox',
		key: "outCar",
		name: "外请车辆",
		prop: "outCar"
	},
	{
		type: 'checkbox',
		key: "sendUp",
		name: "送改发",
		prop: "sendUp"
	},
	{
		type: 'checkbox',
		key: "createWms",
		name: "生成WMS",
		prop: "createWms"
	},
	{
		btn: true,
		type: 'string',
		key: "shippingRoute",
		name: "发运路线",
		prop: "shippingRoute",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'string',
		key: "carType",
		name: "车型",
		prop: "carType",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:['blur','change']
			}]
	},
	{
		type: 'textarea',
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]