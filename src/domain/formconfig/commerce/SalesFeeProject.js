export default [
	{
		title: "",
		list: [
			{
				type: "string",
				disabled: true,
				key: "salesOrderCode",
				name: "销售订单编号",
				prop: "salesOrderCode"
			},
			{
				type: "string",
				btn: true,
				disabled: true,
				name: "计费项目",
				key: "feeProjectName",
				api: "getFinanceProject",
				tableConfig: [
					{
						name: "计费项目",
						key: "financeProjectName",
						value: "feeProjectName"
					},
					{
						name: "计费项目编码",
						key: "financeProjectCode",
						value: "feeProject"
					},
				],
			},
			{
				type: "string",
				key: "amount",
				name: "金额",
				prop: "amount"
			}
		]
	}
]