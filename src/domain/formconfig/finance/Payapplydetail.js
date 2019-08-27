import validate from "@/domain/common/validate"
const rules = validate.setRequired()
export default [
	{
		type: "string",
		key: "billNo",
		name: "付款申请单单据编号",
		prop: "billNo",
		disabled: true,
	},
	{
		type: "string",
		key: "delegateBillNo",
		name: "委托单号",
		prop: "delegateBillNo",
		disabled: true,
	},
	{
		btn:true,
		type: "string",
		key: "chargeItemName",
		name: "计费项目",
		prop: "chargeItemName"
	},
	{
		btn:true,
		type: "string",
		key: "otherSubject",
		name: "对方科目",
		prop: "otherSubject"
	},
	{
		type: "string",
		key: "recordedAmount",
		name: "已计金额",
		prop: "recordedAmount",
		disabled: true,
	},
	{
		type: "string",
		key: "applyPayAmount",
		name: "申请付款金额",
		prop: "applyPayAmount"
	},
	{
		type: "string",
		key: "actualPayAmount",
		name: "实付金额",
		prop: "actualPayAmount",
		disabled: true,
	},
	{
		type: "checkbox",
		key: "innerDeductedCommission",
		name: "内扣佣金",
		prop: "innerDeductedCommission"
	},
	{
        type: "checkbox",
		key: "advancePayTax",
		name: "是否垫税",
		prop: "advancePayTax"
	},
	{
        type: "checkbox",
		key: "temporaryAdvancePayTax",
		name: "临时垫税",
		prop: "temporaryAdvancePayTax"
	},
    {
      selectOption: [],
      key: "sourceBillType",
      name: "来源单据类型",
      prop: "sourceBillType",
      type: "select",
      selectKey: "sourcedocumentType",
    },
	{
		btn:true,
		type: "string",
		key: "sourceBillNo",
		name: "来源单据编码",
		prop: "sourceBillNo"
	},
	{
        type: "select",
		selectOption: [],
		key: "initSourceBillType",
		name: "初始来源单类型",
		prop: "initSourceBillType"
	},
	{
		type: "string",
		key: "initSourceBillNo",
		name: "初始来源单号",
		prop: "initSourceBillNo"
	},
	{
        type: "date",
		key: "delegateBillCreateTime",
		name: "委托单制单时间",
		prop: "delegateBillCreateTime"
	},
	{
        type: "select",
		selectOption: [],
		key: "refundType",
		name: "退款方式",
		prop: "refundType"
	},
	{
        type: "select",
		selectOption: [],
		key: "delegateBillType",
		name: "委托单类型",
		prop: "delegateBillType"
	},
	{
		type: "string",
		key: "difference",
		name: "差额",
		prop: "difference"
	},
	{
		type: "string",
		key: "warehousingRate",
		name: "入库汇率",
		prop: "warehousingRate"
	},
	// {
	// 	type: "string",
	// 	key: "remark",
	// 	name: "说明",
	// 	prop: "remark"
	// },
]