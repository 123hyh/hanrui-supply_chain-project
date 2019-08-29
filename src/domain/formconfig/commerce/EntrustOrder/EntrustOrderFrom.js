let rules = {
	required: true,
	message: '不能为空',
	trigger: 'blur'
}
export default [{
	title: '基础',
	items: [{
		name: 'entrustOrderNo',
		type: 'disabled',
		label: '委托订单号',
		rules
	}, {
		name: 'entrustOrderType',
		type: 'select',
		label: '委托订单类型',
		selectapi: 'entrustOrderTypeG',
	}, {
		name: 'trusteeName',
		type: 'inputbutton',
		label: '受托方(公司)'
	}, {
		name: 'purchaseUnitName',
		type: 'inputbutton',
		label: '采购组织',
	}, {
		name: 'signDate',
		type: 'date',
		label: '签订日期',
	}]
}, {
	title: '委托方',
	items: [{
		name: 'clientName',
		type: 'inputbutton',
		label: '委托方'
	}, {
		name: 'clientContactName',
		type: 'inputbutton',
		label: '联系人'
	}, {
		name: 'clientTel',
		type: 'disabled',
		label: '电话'
	}, {
		name: 'clientPhone',
		type: 'disabled',
		label: '手机'
	}, {
		name: 'clientOrderNo',
		type: 'input',
		label: '委托方订单号'
	}, {
		name: 'salesmanName',
		type: 'disabled',
		label: '接单人'
	}, {
		name: 'followPersonName',
		type: 'disabled',
		label: '跟单人'
	}]
}, {
	title: '卖方',
	items: [{
		name: 'supplierName',
		type: 'inputbutton',
		label: '供应商'
	}, {
		name: 'supplierContactName',
		type: 'inputbutton',
		label: '联系人'
	}, {
		name: 'supplierPhone',
		type: 'disabled',
		label: '手机'
	}, {
		name: 'supplierTel',
		type: 'disabled',
		label: '电话'
	}, {
		name: 'supplierCurrency',
		type: 'select',
		label: '销售币别',
		selectapi: 'currencyName',
	}, {
		name: 'switchobj',
		type: 'switch',
		label: '委托收款'
	}, {
		name: 'deliverGoods',
		type: 'switch',
		label: '卖方交(发)货'
	}]
}, {
	title: '买方',
	items: [{
		name: 'customerName',
		type: 'inputbutton',
		label: '客户'
	}, {
		name: 'currency',
		type: 'select',
		label: '采购币别',
		selectapi: 'currencyName',
	}, {
		name: 'consignmentPayment',
		type: 'switch',
		label: '委托付款'
	}, {
		name: 'pickUpGoods',
		type: 'switch',
		label: '买方接(提)货'
	}]
}, {
	title: '',
	items: [{
		name: 'agreementName',
		type: 'inputbutton',
		label: '协议管理'
	}, {
		name: 'agreementSolutionName',
		type: 'inputbutton',
		label: '协议方案'
	}, {
		name: 'bizType',
		type: 'select',
		label: '业务类型',
		selectapi: 'businessTypeG',
	},
	{
		name: 'reportGateType',
		type: 'select',
		label: '报关类型',
		selectapi: 'declareCustoms',
	},
	{
		name: "tradeMode",
		type: "select",
		label: "贸易方式",
		selectapi: "tradeModeName",
	},
	{
		type: "select",
		name: "dealMode",
		selectapi: "transactionMode",
		label: "成交方式",
	},
	{
		type: "select",
		name: "receivableMethod",
		selectapi: "payMode",
		label: "收款方式",
	},
	{
		type: "select",
		name: "chargeMode",
		selectapi: "BillingMethod",
		label: "计价方式",
	},
	{
		name: 'reportUntilComplete',
		type: 'switch',
		label: '等齐报'
	}, {
		name: 'sendUntilComplete',
		type: 'switch',
		label: '等齐送'
	}]
}]