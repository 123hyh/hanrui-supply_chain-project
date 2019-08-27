export default [
	{
		type: "string",
		key: "billNo",
		name: "单据编号",
		prop: "billNo"
	},
	{
		type: "date",
		key: "bizDate",
		name: "业务日期",
		prop: "bizDate"
	},
	// {
	// 	type: "select",
	// 	selectOption: [],
	// 	selectKey: "orderStatus",
	// 	key: "status",
	// 	name: "单据状态",
	// 	prop: "status"
	// },
	{
		type: "select",
		selectOption: [],
		selectKey: "sourceFinanciaRequisition",
		key: "sourceBillType",
		name: "来源单据类型",
		prop: "sourceBillType"
	},
	{
		btn:true,
		type: "string",
		key: "sourceBillNo",
		name: "来源单据编号",
		prop: "sourceBillNo"
	},
	{
		btn:true,
		type: "string",
		key: "salesmanName",
		name: "业务员",
		prop: "salesmanName"
	},
	{
		btn:true,
		type: "string",
		key: "delegeteBillNo",
		name: "委托单号",
		prop: "delegeteBillNo"
	},
	{
		btn:true,
		type: "string",
		key: "clientName",
		name: "委托方",
		prop: "clientName"
	},
	{
		type: "select",
		selectOption: [],
		selectKey:"currencyName",
		key: "currency",
		name: "应收币别",
		prop: "currency"
	},
	{
		btn:true,
		type: "string",
		key: "businessManName",
		name: "商务员",
		prop: "businessManName"
	},
	{
		btn:true,
		type: "string",
		key: "chargeItem",
		name: "计费项目名称",
		prop: "chargeItem"
	},
	{
		type: "money",
		key: "applyAmount",
		name: "申请金额",
		prop: "applyAmount"
	},
	{
		type: "money",
		key: "receiveAmount",
		name: "应收金额",
		prop: "receiveAmount"
	},
	{
		type: "money",
		key: "receiveBalance",
		name: "应收余额",
		prop: "receiveBalance"
	},
	{
		type: "textarea",
		key: "managerApproval",
		name: "经理审批结果",
		prop: "managerApproval"
	},
	// {
	// 	type: "string",
	// 	key: "auditor",
	// 	name: "审核人",
	// 	prop: "auditor"
	// },
	{
		type: "string",
		key: "approvalNo",
		name: "批号",
		prop: "approvalNo"
	},
	{
		type: "string",
		key: "serviceCharge",
		name: "服务费",
		prop: "serviceCharge"
	},
	{
		type: "string",
		key: "financeApproval",
		name: "财务审批结果",
		prop: "financeApproval"
	},
	// {
	// 	type: "string",
	// 	key: "auditTime",
	// 	name: "审核时间",
	// 	prop: "auditTime"
	// },
	// {
	// 	type: "string",
	// 	key: "approvalOpinion",
	// 	name: "审批意见",
	// 	prop: "approvalOpinion"
	// },
	// {
	// 	type: "string",
	// 	key: "financeAuditor",
	// 	name: "财务审核人",
	// 	prop: "financeAuditor"
	// },
	// {
	// 	type: "date",
	// 	key: "financeAuditTime",
	// 	name: "财务审核时间",
	// 	prop: "financeAuditTime"
	// },
	// {
	// 	type: "string",
	// 	key: "writeOffCause",
	// 	name: "申请核销原因",
	// 	prop: "writeOffCause"
	// },
	{
		type: "textarea",
		key: "remark",
		name: "备注",
		prop: "remark"
	},
	{
		type: "textarea",
		key: "causeType",
		name: "原因归类",
		prop: "causeType"
	}
]