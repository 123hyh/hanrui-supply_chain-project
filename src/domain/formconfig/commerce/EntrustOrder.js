export default [
	{
	    title: '',
	    list: [
			{
				type: "string",
				btn: true,
				key: "trusteeName",
				name: "受托方(公司)",
				prop: "trusteeName",
				disabled: true,
			},
			// {
			// 	selectOption: [],
			// 	type: "select",
			// 	key: "status",
			// 	selectKey: "billStatus",
			// 	name: "单据状态",
			// 	prop: "status",
			// 	disabled: true,
			// },
			{
				type: "string",
				key: "entrustOrderNo",
				name: "委托订单号", //add
				prop: "entrustOrderNo",
				disabled: true,
			},
			{
				type: "string",
				key: "salesmanName",
				name: "接单人",
				prop: "salesmanName"
			},
			{
				type: "date",
				key: "signDate",
				name: "签订日期",
				prop: "signDate"
			},
			{
				type: "string",
				key: "followPersonName",
				name: "跟单人",
				prop: "followPersonName"
			},
			{
				type: "string",
				btn: true, 
				key: "purchaseUnitName",
				name: "采购组织", //add
				prop: "purchaseUnitName",
				disabled: true,
			},
			{
				type: "string",
				key: "clientContactName",
				name: "版本号", //add
				prop: "clientContactName"
			},
		],
	}, {
	    title: '委托方',
	    list: [
			{
				type: "string",
				btn: true,
				key: "clientName",
				name: "委托方",
				prop: "clientName",
				disabled: true,
			},
			{
				selectOption: [],
				type: "select",
				selectKey: "associatedInformation",
				key: "clientAssociatedInfo",
				name: "关联信息",
				prop: "clientAssociatedInfo"
			},
			{
				btn: true,
				type: "string",
				key: "clientContactName",
				name: "联系人",//一个委托方有多个联系人，选择其中一个，带出相应的电话和手机
				prop: "clientContactName",
				disabled: true,
			},
			{
				type: "string",
				key: "clientTel",
				name: "电话",
				prop: "clientTel"
			},
			{
				type: "string",
				key: "clientPhone",
				name: "手机",
				prop: "clientPhone"
			},
			{
				type: "string",
				key: "clientOrderNo",
				name: "订单号",
				prop: "clientOrderNo"
			},
		],
	}, {
	    title: '卖方',
	    list: [
			{
				type: "string",
				btn: true,
				key: "supplierName",
				name: "供应商", //add
				prop: "supplierName",
				disabled: true,
			},
			{
				type: "string",
				key: "supplierContactName",
				name: "联系人",
				prop: "supplierContactName"
			},
			{
				type: "string",
				key: "supplierAssociatedInfo",
				name: "关联信息",
				prop: "supplierAssociatedInfo"
			},
			{
				type: "string",
				key: "supplierPhone",
				name: "手机",
				prop: "supplierPhone"
			},
			{
				type: "string",
				key: "supplierTel",
				name: "电话",
				prop: "supplierTel"
			},
			{
				selectOption: [],
				type: "select",
				key: "supplierCurrency",
				selectKey: "currencyName",
				name: "销售币别",
				prop: "supplierCurrency"
			},
			{
				type: "checkbox",
				key: "consignmentCollection",
				name: "委托收款",
				prop: "consignmentCollection"
			},
			{
				type: "checkbox",
				key: "deliverGoods",
				name: "卖方交(发)货",
				prop: "deliverGoods"
			},
		],
	}, {
	    title: '买方',
	    list: [
			{
				type: "string",
				btn: true,
				key: "customerName",
				name: "客户",
				prop: "customerName",
				disabled: true,
			},
			{
				selectOption: [],
				type: "select",
				key: "currency",
				selectKey: "currencyName",
				name: "采购币别",
				prop: "currency"
			},
			{
				type: "checkbox",
				key: "consignmentPayment",
				name: "委托付款",
				prop: "consignmentPayment"
			},
			{
				type: "checkbox",
				key: "pickUpGoods",
				name: "买方接(提)货",
				prop: "pickUpGoods"
			},
		],
	}, {
	    title: '',
	    list: [
			{
				type: "string",
				btn: true,
				key: "agreementName",
				name: "协议名称",
				prop: "agreementName",
				disabled: true,
			},
			{
				type: "string",
				btn: true,
				key: "agreementSolutionName",
				name: "协议方案",
				prop: "agreementSolutionName",
				disabled: true,
			},
			{
				type: "checkbox",
				key: "reportUntilComplete",
				name: "等齐报", //add
				prop: "reportUntilComplete"
			},
// 			{
// 				type: "checkbox",
// 				key: "w",
// 				name: "等齐送", //add
// 				prop: "w"
// 			},
// 			{
// 				type: "checkbox",
// 				key: "r",
// 				name: "纯物流", //add
// 				prop: "r"
// 			},
		],
	}, {
	    title: '服务费计算',
	    list: [
			{
				selectOption: [],
				type: "select",
				selectKey: "serviceFeeType",
				key: "serviceCharge",
				name: "种类",
				prop: "serviceCharge"
			},
			{
				type: "string",
				key: "serviceTaxRate",
				name: "服务费率",
				prop: "serviceTaxRate"
			},
			{
				type: "string",
				key: "orderExchangeRate",
				name: "订单汇率",
				prop: "orderExchangeRate"
			},
			{
				type: "string",
				key: "serviceFee",
				name: "定额服务费",
				prop: "serviceFee"
			},
		],
	}, {
	    title: '',
	    list: [
			{
				selectOption: [],
				type: "select",
				key: "bizType",
				selectKey: "businessType",
				name: "业务类型",
				prop: "bizType"
			},
			{
				selectOption: [],
				type: "select",
				key: "reportGateType",
				selectKey: "declareCustoms",
				name: "报关类型",
				prop: "reportGateType"
			},
			{
				selectOption: [],
				type: "select",
				key: "tradeMode",
				selectKey: "tradeModeName",
				name: "贸易方式",
				prop: "tradeMode"
			},
			{
				selectOption: [],
				type: "select",
				key: "dealMode",
				selectKey: "transactionMode",
				name: "成交方式",
				prop: "dealMode"
			},
			{
				selectOption: [],
				type: "select",
				key: "receivableMethod",
				selectKey: "transactionMode",
				name: "收款方式",
				prop: "receivableMethod"
			},
			{
				selectOption: [],
				type: "select",
				key: "chargeMode",
				selectKey: "BillingMethod",
				name: "计价方式",
				prop: "chargeMode"
			},
		],
	}
]