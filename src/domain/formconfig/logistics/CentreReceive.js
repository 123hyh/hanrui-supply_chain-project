import validate from '@/domain/common/validate'
export default [
	{
		type:"string",
		key: "itemCode",
		name: "子表编码",
		prop: "itemCode",
		readonly:true
	},
	{
		type:"string",
		key: "centreDispatchCode",
		name: "集中调度单编码",
		prop: "centreDispatchCode",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		btn:true,
		type:"string",
		key: "deliveryTrain",
		name: "配送车次",
		prop: "deliveryTrain",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "deliveryNo",
		name: "计划方案",
		prop: "deliveryNo",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{	
		btn:true,
		type:"string",
		key: "route",
		name: "发运路线",
		prop: "route",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		btn:true,
		type:"string",
		key: "driver",
		name: "司机",
		prop: "driver",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		btn:true,
		type:"string",
		key: "plateNo",
		name: "车牌",
		prop: "plateNo",
		readonly:true,
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "totalWeight",
		name: "总重",
		prop: "totalWeight",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "capacity",
		name: "载重",
		prop: "capacity",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "packageNumber",
		name: "可载件数",
		prop: "packageNumber",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "originOrderCode",
		name: "来源单据编号",
		prop: "originOrderCode",
	},
	{
		type:"string",
		key: "totalOrders",
		name: "总单数",
		prop: "totalOrders",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
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
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "deliveryPoint",
		name: "派送点",
		prop: "deliveryPoint",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		btn:true,
		type:"string",
		key: "dispatchOrderCode",
		name: "调度单号",
		prop: "dispatchOrderCode",
		rules: [
			{
				required:true,
				message:'必填',
				trigger:'blur'
			}]
	},
	{
		type:"string",
		key: "remark",
		name: "备注",
		prop: "remark"
	}
]