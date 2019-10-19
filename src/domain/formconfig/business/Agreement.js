import validate from '@/domain/common/validate';
const rules = validate.setRequired()
export default [
  {
    type: "string",
    key: "agreementNo",
    name: "单据编号",
    prop: "agreementNo",
    readonly: true
  },
  {
    type: "string",
    key: "agreementName",
    name: "协议名称",
    prop: "agreementName",
    rules
  },
	/* {
		selectOption: [],
		type: "select",
		selectKey: "protocolManagementStatus",
		key: "status",
		name: "状态",
		prop: "status",
		disabled: true,
	}, */
  {
    type: "string",
    key: "passCount",
    name: "临时通过次数",
    prop: "passCount",
    disabled: true,
  },
  {
    type: "string",
    key: "agreementCode",
    name: "协议编码",
    prop: "agreementCode",
    // disabled: true,
    // rules
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "contractType",
    key: "contractType",
    name: "签约类型",
    prop: "contractType",
    rules
  },
  {
    type: "string",
    key: "versionNo",
    name: "版本号",
    prop: "versionNo",
    disabled: true,
  },
  {
    type: "date",
    key: "contractDate",
    name: "签约日期",
    prop: "contractDate",
    rules
  },
  
  {
    btn: true,
    type: "string",
    key: "customerName",
    name: "委托方（发包方）",
    prop: "customerName",
    disabled: true,
    rules
  },
  {
    type: "string",
    key: "legalPersonA",
    name: "法定代表（甲方）",
    prop: "legalPersonA",
    disabled: true,
    rules
  },
  {
    type: "string",
    key: "legalPersonAAddress",
    name: "地址（甲方）",
    prop: "legalPersonAAddress",
    disabled: true,
    rules
  },
  {
    type: "date",
    key: "effectiveDate",
    name: "生效日期",
    prop: "effectiveDate",
    rules
  },
  {
    btn: true,
    type: "string",
    key: "trusteeName",
    name: "受托方（承包方）",
    prop: "trusteeName",
    disabled: true,
    rules
  },
  {
    type: "string",
    key: "trusteeLegalPerson",
    name: "法定代表（乙方）",
    prop: "trusteeLegalPerson",
    disabled: true,
    rules
  },
  {
    type: "string",
    key: "trusteeAddress",
    name: "地址（乙方）",
    prop: "trusteeAddress",
    disabled: true,
    rules
  },
  {
    type: "date",
    key: "failureDate",
    name: "失效日期",
    prop: "failureDate",
    rules
  },
  {
    type: "string",
    key: "insideDayRate",
    name: "账期内日利率 %",
    prop: "insideDayRate",
    rules
  },
  {
    type: "string",
    key: "outsideDayRate",
    name: "超期日利率 %",
    prop: "outsideDayRate",
    rules
  },
  {
    type: "string",
    key: "dayRate",
    name: "内部结算日利率 %",
    prop: "dayRate",
    rules
  },
  {
    type: "string",
    key: "breachDayRate",
    name: "违约日利率 %",
    prop: "breachDayRate",
    rules
  },
  // 	{
  // 		type: "string",
  // 		key: "legalPersonC",
  // 		name: "法定代表（丙方）",
  // 		prop: "legalPersonC"
  // 	},
  // 	{
  // 		type: "string",
  // 		key: "legalPersonCAddress",
  // 		name: "地址（丙方）",
  // 		prop: "legalPersonCAddress"
  // 	},
  {
    type: "number",
    key: "minCharge",
    name: "最低消费(元)",
    prop: "minCharge",
    rules
  },
  {
    type: "checkbox",
    key: "expireRemind",
    name: "到期前三个月提醒",
    prop: "expireRemind"
  },

  {
    type: "checkbox",
    key: "needAuditMinCharge",
    name: "最低消费需审核",
    prop: "needAuditMinCharge"
  },
  // 	{
  // 		type: "string",
  // 		key: "legalPersonD",
  // 		name: "法定代表（丁方）",
  // 		prop: "legalPersonD"
  // 	},
  // 	{
  // 		type: "string",
  // 		key: "legalPersonDAddress",
  // 		name: "地址（丁方）",
  // 		prop: "legalPersonDAddress"
  // 	},


  {
    type: "checkbox",
    key: "needCheckAgreeMent",
    name: "需要检查协议有效期",
    prop: "needCheckAgreeMent"
  },
  {
    type: "string",
    key: "customerAccountPeriod",
    name: "委托方账期(天)",
    prop: "customerAccountPeriod",
    disabled: true,
  },
  {
    type: "string",
    key: "customerLimit",
    name: "委托方额度 万元",
    prop: "customerLimit",
    disabled: true,
  },
  {
    type: "textarea",
    key: "remark",
    name: "备注",
    prop: "remark"
  },
  {
    type: "textarea",
    key: "riskManagementInfo",
    name: "风控备注",
    prop: "riskManagementInfo"
  },
  {
    type: "string",
    key: "customerComment",
    name: "委托方特殊说明",
    prop: "customerComment"
  },
  {
    type: "string",
    key: "authorizationEmail",
    name: "授权邮箱",
    prop: "authorizationEmail",
    rules: [{
      type: 'email',
      message: '邮箱错误',
      trigger: 'blur'
    }]
  },
]