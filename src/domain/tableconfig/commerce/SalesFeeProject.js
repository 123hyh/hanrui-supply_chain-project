export default [
	{
		prop: 'salesOrderCode',
		label: '销售订单编号',
		width: '100',
	},
	{
		prop: 'feeProjectName',
		key:"feeProjectName",
		name: "计费项目",
		label: '计费项目',
		width: '100',
		api:"getFinanceProject",
		dataName:"financeProjectName"
	},
	{
		prop: 'amount',
		label: '金额',
		width: '100',
		type:"number"
	}
]