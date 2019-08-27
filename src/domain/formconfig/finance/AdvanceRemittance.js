export default [
	{
		type: 'string',
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		type: 'string',
		key: "outEntrustOrderNo",
		name: "转出委托单号",
		prop: "outEntrustOrderNo"
	},
	{
		type: 'string',
		key: "clientNo",
		name: "委托方",
		prop: "clientNo"
	},
	{
		type: 'string',
		key: "outCheckNo",
		name: "转出查款单号",
		prop: "outCheckNo"
	},
	{
		type: 'string',
		key: "outReceiptNo",
		name: "转出收款单号",
		prop: "outReceiptNo"
	},
	{
		type: 'number',
		key: "canTransferAmount",
		name: "可转金额",
		prop: "canTransferAmount"
	},
	{
		type: 'number',
		key: "outAmount",
		name: "转出金额",
		prop: "outAmount"
	},
	{
		selectOption: [],
		type: 'select',
    key: "outCurrency",
    selectKey:"currencyName",
		name: "转出币别",
		prop: "outCurrency"
	},
	{
		type: 'date',
		key: "arrivalDate",
		name: "到账日期",
		prop: "arrivalDate"
	},
	{
		selectOption: [],
		type: 'select',
		key: "status",
    selectKey:"orderStatus",
		name: "单据状态",
		prop: "status"
	}
]