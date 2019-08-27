export default [
{
title: "",
list: [
	{
			type: "string",
			key: "salesOrderCode",
			name: "单据编号",
			prop: "salesOrderCode",
			disabled:true,
	},
	{
			type: "string",
			btn: true,
			disabled:true,
			name: "公司",
			key: "companyName",
			api:"getCreditCompanyNameData",
			rules:[
				{ required: true, message: "不能为空", trigger: "blur" }
			],
			tableConfig:[
				{
					name:"公司",
					key: "companyName",
					value:"companyName"
				},
				{
					name:"公司编码",
					key: "companyCode",
					value:"company"
				},
			],
	},
	{
			selectOption: [],
			type: "select",
			key: "pickWay",
			selectKey: "pickUpMethod",
			name: "接（提）货方式",
			prop: "pickWay"
	},
	{
			type: "string",
			btn: true,
			disabled:true,
			name: "运输时效",
			key: "transportEfficiencyName",
			api:'getTimeLimitData',
			tableConfig: [
				{
					name: "运输时效",
					key: "transportTimeName",
					value:"transportEfficiencyName"
				},
				{
					name: "运输时效编码",
					key: "transportTimeCode",
					value:"transportEfficiency"
				},
			],
	},
	{
			type: "string",
			btn: true,
			disabled:true,
			name: "客户",
			key: "customerName",
			api:"getCustomerList",
			rules:[
				{ required: true, message: "不能为空", trigger: "blur" }
			],
			tableConfig: [
				{
					name: "客户",
					key: "customerName",
					value:"customerName"
				},
				{
					name: "客户编码",
					key: "customerNo",
					value:"customer"
				},
			],
	},
	{
			selectOption: [],
			type: "select",
			key: "deliveryConditions",
			selectKey: "deliveryConditionsName",
			name: "发货条件",
			prop: "deliveryConditions"
	},
	{
			type: "select",
			key: "serviceFeeBase",
			selectKey: "serviceChargeBasis",
			name: "服务费计算基础",
			prop: "serviceFeeBase",
			selectOption: [],
	},
	{
			selectOption: [],
			type: "select",
			key: "shipmentFeeType",
			selectKey: "freightCarrierType",
			name: "运费承担方类型",
			prop: "shipmentFeeType"
	},
	{
			selectOption: [],
			type: "select",
			key: "originOrderType",
			selectKey: "sourcedocumentType",
			name: "来源单据类型",
			prop: "originOrderType"
	},
	{
			type: "string",
			btn: true,
			disabled:true,
			name: "委托方",
			rules:[
				{ required: true, message: "不能为空", trigger: "blur" }
			],
			key: "entrustName",
			api:"queryclientSearch",
			tableConfig: [
				{
					name: "委托方",
					key: "clientName",
					value:"entrustName"
				},
				{
					name: "委托方编码",
					key: "clientNo",
					value:"entrust"
				},
			],
	},
	{
			selectOption: [],
			type: "select",
			key: "busiType",
			name: "业务类型",
			prop: "busiType"
	},
	{
		type: "string",
		btn: true,
		disabled:true,
		name: "承运商",
		key: "carrierName",
		api: 'querycarrierbaseSearch',
		tableConfig:[
			{
				name:"承运商",
				key: "carrierName",
				value:"carrierName"
			},
			{
				name:"承运商编码",
				key: "carrierCode",
				value:"carrier"
			},
		],
	},
	{
			type: "date",
			key: "deliveryTime",
			name: "要求发货时间",
			prop: "deliveryTime"
	},
	{
			type: "string",
			key: "companyAbb",
			name: "收货公司简称",
			prop: "companyAbb"
	},
	{
			btn: true,
			disabled:true,
			type: "string",
			name: "联系人",
			key: "contactsName",
			api:"getCustomerContact",
			tableConfig:[
				{
					name:"联系人",
					key: "contact",
					value:"contactsName"
				},
				{
					name:"联系人编码",
					key: "itemCode",
					value:"contacts"
				},
			],
	},
	{
			type: "string",
			key: "address",
			name: "地址",
			prop: "address"
	},
	{
			type: "string",
			key: "shipmentFee",
			name: "运费承担方",
			prop: "shipmentFee"
	},
	/* {
			selectOption: [],
			type: "select",
			selectKey: "orderStatus",
			key: "status",
			name: "状态",
      prop: "status",
      disabled: true
	}, */
	{
			type: "string",
			btn: true,
            disabled: true,
			name: "委托单号",
			key: "trusteeCode",
			api: 'queryentrustorderSearch',
			tableConfig: [
				{
					name: "委托单号",
					key: "entrustOrderNo",
					value:"trusteeCode"
				},
			],
	},
	{
			selectOption: [],
			type: "select",
			key: "customsType",
			selectKey: "declareCustoms",
			name: "报关类型",
			prop: "customsType"
	},
	{
			selectOption: [],
			type: "select",
			key: "shippingType",
			selectKey: "shippingType",
			name: "运输方式",
			prop: "shippingType"
	},
	{
			type: "date",
			key: "receiptTime",
			name: "要求到货时间",
			prop: "receiptTime"
	},
	{
			type: "string",
			key: "receivingCompany",
			name: "收货公司",
			prop: "receivingCompany"
	},
	{
			type: "string",
			key: "telePhone",
			name: "联系电话",
			prop: "telePhone"
	},
	{
			type: "string",
			btn: true,
			disabled:true,
			name: "发运路线",
			key: "shippingRouteName",
			api:"getDispatchLineData",
			tableConfig: [//表格配置
				{
					name: "发运路线",
					key: "shippingRouteName",
					value:"shippingRouteName"
				},
				{
					name: "发运路线编码",
					key: "shippingRouteCode",
					value:"shippingRoute"
				},
			],
	},
	{
			type: "date",
			key: "busiDate",
			name: "业务日期",
			prop: "busiDate"
	},
	{
			type: "string",
			key: "storeNo",
			name: "入仓号",
			prop: "storeNo"
	},
	{
			type: "string",
			key: "remark",
			name: "备注",
			prop: "remark"
	},
	{
			type: "string",
			key: "receiptRemark",
			name: "收货方备注",
			prop: "receiptRemark"
	},
	{
			type: "string",
			key: "salesman",
			name: "客户业务员",
			prop: "salesman"
	},
	{
			type: "string",
			key: "fax",
			name: "传真号码",
			prop: "fax"
	},
	{
			btn: true,
			disabled:true,
			type: "string",
			key: "finalCustomerName",
			name: "最终客户",
			api:"getCustomerList",
			tableConfig: [
				{
					name: "最终客户",
					key: "customerName",
					value:"finalCustomerName"
				},
				{
					name: "最终客户编码",
					key: "customerNo",
					value:"finalCustomer"
				},
			],
	},
	{
			type: "string",
			key: "batchNo",
			name: "批次号",
			prop: "batchNo"
	},
]
},
{
title: "验货信息",
list: [
	{
			selectOption: [],
			type: "select",
			key: "inspectionMethod",
			selectKey: "inspectionMethod",
			name: "验货方式",
	},
	{
			btn: true,
			disabled:true,
			type: "string",
			key: "inspectionManName",
			name: "验货人员",
			api:"getEmployeeInfo",
			tableConfig: [
				{
					name: "验货人员",
					key: "employeeInfoName",
					value:"inspectionManName"
				},
				{
					name: "验货人员编码",
					key: "employeeInfoCode",
					value:"inspectionMan"
				},
			],
	},
	{
			type: "string",
			key: "plateNo",
			name: "车牌号",
			prop: "plateNo"
	},
	{
			type: "string",
			key: "inspectionReceive",
			name: "验货应收",
	},
	{
			type: "string",
			key: "inspectionCost",
			name: "验货成本",
	},
	{
			type: "string",
			key: "inspectionRemark",
			name: "验货备注",
	},
	{
			type: "checkbox",
			key: "supplierOrder",
			name: "供应商单据",
			prop: "supplierOrder"
	},
	{
			type: "string",
			key: "descriptionOne",
			name: "说明1",
			prop: "descriptionOne"
	},
	{
			type: "checkbox",
			key: "deliveryOrder",
			name: "我司送货单",
			prop: "deliveryOrder"
	},
	{
			type: "string",
			key: "descriptionTwo",
			name: "说明2",
			prop: "descriptionTwo"
	},
]
},
{
title: "",
list: [
	{
			selectOption: [],
			type: "select",
			key: "stockStatus",
			selectKey: "stockingStatus",
			name: "备货状态",
			prop: "stockStatus"
	},
	{
			type: "date",
			key: "stockTime",
			name: "备货时间",
			prop: "stockTime"
	},
	{
			type: "string",
			key: "stockManName",
			name: "备货人",
			btn: true,
			disabled:true,
			api:"getEmployeeInfo",
			tableConfig: [
				{
					name: "备货人",
					key: "employeeInfoName",
					value:"stockManName"
				},
				{
					name: "备货人编码",
					key: "employeeInfoCode",
					value:"stockMan"
				},
			],
	},
	{
			type: "string",
			key: "totalCardQuantity",
			name: "总卡板数",
			prop: "totalCardQuantity"
	},
	{
			type: "string",
			key: "totalBox",
			name: "总箱数",
			prop: "totalBox"
	},
	// {
	//     type: "string",
	//     key: "printer",
	//     name: "打印人",
	//     prop: "printer",
	//     btn: true
	// },
	// {
	//     type: "date",
	//     key: "printTime",
	//     name: "打印时间",
	//     prop: "printTime"
	// },
	{
			selectOption: [],
			type: "select",
			key: "shippingMode",
			selectKey: "deliveryMode",
			name: "出货方式",
			prop: "shippingMode"
	}
]
},
]