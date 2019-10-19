import validate from "@/domain/common/validate";
let { setRequired } = validate;
export default [
  {
    type: "string",
    key: "clientNo",
    name: "委托方编号",
    prop: "clientNo",
    disabled: true
  },
  {
    type: "string",
    btn: true,
    key: "clientName",
    name: "委托方名称",
    prop: "clientName",
    rules: setRequired()
  },
  {
    type: "string",
    key: "clientShortName",
    name: "简称",
    prop: "clientShortName",
    rules: setRequired()
  },
  {
    type: "string",
    key: "clientEnName",
    name: "外文名称",
    prop: "clientEnName"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "consociationStatus",
    key: "consociationStatus",
    name: "合作状态",
    prop: "consociationStatus",
    rules: setRequired()
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "clientLevel",
    key: "clientLevel",
    name: "委托方等级",
    prop: "clientLevel"
    // rules: setRequired()
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "customsCredit",
    key: "customsCredit",
    name: "企业海关信用等级",
    prop: "customsCredit"
  },
  {
    type: "string",
    key: "shortCode",
    name: "助记码",
    prop: "shortCode"
  },
  /* 	{
		selectOption: [],
		type: "select",
		selectKey: "billStatus",
		key: "billStatus",
		name: "单据状态",
		prop: "billStatus",
		disabled: true,
	}, */
  {
    type: "checkbox",
    key: "aboveAccountPeriod",
    name: "允许超账期",
    prop: "aboveAccountPeriod"
  },
  {
    type: "checkbox",
    key: "aboveAmount",
    name: "允许超额度",
    prop: "aboveAmount"
  },
  {
    type: "checkbox",
    key: "allowOrder",
    name: "不允许下单",
    prop: "allowOrder"
  },
  {
    type: "checkbox",
    key: "inBlacklt",
    name: "是否是黑名单",
    prop: "inBlacklt"
  },
  /* 	{
		type: "checkbox",
		key: "suspiciousCustomer",
		name: "可疑客户",
		prop: "suspiciousCustomer"
  }, */

  {
    btn: true,
    type: "string",
    key: "parentName",
    name: "上级委托方名称",
    prop: "parentName",
    disabled: true
  },
  {
    type: "string",
    key: "socialCreditCode",
    name: "统一社会信用代码",
    prop: "socialCreditCode"
  },
  {
    type: "string",
    key: "registeredNo",
    name: "工商注册号",
    prop: "registeredNo",
    rules: setRequired()
  },
  {
    type: "date",
    key: "businessLicense",
    name: "营业执照失效日期",
    prop: "businessLicense"
  },

  {
    type: "string",
    key: "irsNumber",
    name: "国税编号",
    prop: "irsNumber",
    rules: setRequired()
  },

  {
    type: "string",
    key: "landTaxNumber",
    name: "地税编号",
    prop: "landTaxNumber",
    rules: setRequired()
  },
  {
    type: "string",
    key: "organizationNo",
    name: "组织机构代码",
    prop: "organizationNo"
  },
  {
    type: "date",
    key: "establishedTime",
    name: "成立日期",
    prop: "establishedTime"
    // rules: setRequired()
  },
  {
    type: "string",
    slotType: "元",
    key: "registerMoney",
    name: "注册资金(万)",
    prop: "registerMoney",
    rules: setRequired()
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "currencyName",
    key: "registerCurrency",
    name: "注册币种",
    prop: "registerCurrency",
    rules: setRequired()
  },
  {
    type: "string",
    key: "businessScope",
    name: "经营范围",
    prop: "businessScope"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "clientNature",
    key: "clientNature",
    name: "委托方性质",
    prop: "clientNature"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "industryType",
    key: "clientTradeName",
    name: "行业名称",
    prop: "clientTradeName",
    rules: setRequired()
  },
  {
    type: "string",
    key: "legalPerson",
    name: "法人代表",
    prop: "legalPerson",
    rules: setRequired()
  },
  {
    type: "string",
    key: "tel",
    name: "座机电话号码",
    prop: "tel",
    rules: [
      setRequired()[0],
      {
        validator: validate.validateTel,
        trigger: ["blur", "change"]
      }
    ]
  },
  {
    type: "string",
    key: "fax",
    name: "传真",
    prop: "fax"
    // rules: setRequired()
  },
  {
    type: "string",
    key: "url",
    name: "网址",
    prop: "url"
    // rules: [setRequired()[0], {
    //   validator: validate.validateUrl,
    //   trigger: ['blur', 'change']
    // }]
  },
  {
    type: "string",
    key: "email",
    name: "Email",
    prop: "email"
    /* rules: [{
    type: 'email',
    message: '邮箱错误',
    trigger: ['blur', 'change']
  }] */
  },
  {
    type: "string",
    key: "country",
    name: "国家",
    prop: "country"
  },
  {
    type: "select",
    selectOption: [],
    key: "province",
    name: "省份",
    prop: "province"
  },
  {
    type: "select",
    selectOption: [],
    key: "city",
    name: "城市",
    prop: "city"
  },
  {
    type: "select",
    selectOption: [],
    key: "county",
    name: "区县",
    prop: "county"
  },
  {
    type: "string",
    key: "area",
    name: "所属地区",
    prop: "area"
  },
  {
    type: "string",
    key: "businessLicenseAddress",
    name: "营业执照地址",
    prop: "businessLicenseAddress",
    rules: setRequired()
  },
  {
    type: "string",
    key: "crCode",
    name: "海关注册编码",
    prop: "crCode"
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "customsRating",
    key: "customsRating",
    name: "海关评级",
    prop: "customsRating"
  },
  {
    type: "date",
    key: "failureDate",
    name: "失效日期",
    prop: "failureDate"
  },
  {
    type: "string",
    key: "specialRemark",
    name: "特殊说明",
    prop: "specialRemark"
  },
  {
    type: "string",
    btn: true,
    key: "orderReceiverName",
    name: "主接单人",
    prop: "orderReceiverName",
    disabled: true,
    rules: setRequired()
  },
  {
    type: "string",
    btn: true,
    key: "orderFollowerName",
    name: "主跟单人",
    prop: "orderFollowerName",
    disabled: true,
    rules: setRequired()
  },
  {
    btn: true,
    type: "string",
    key: "outcomeOwner",
    name: "业绩归属业务员",
    prop: "outcomeOwner",
    disabled: true,
    rules: setRequired()
  },
  {
    type: "date",
    key: "outcome",
    name: "业绩归属有效期至",
    prop: "outcome",
    rules: setRequired()
  },
  {
    btn: true,
    type: "string",
    key: "inlandDestination",
    name: "境内目的地",
    prop: "inlandDestination",
    disabled: true
  },
  {
    type: "number",
    key: "accountPeriod",
    name: "委托方账期(天)",
    prop: "accountPeriod",
    // rules: setRequired()
  },
  {
    selectOption: [],
    type: "select",
    selectKey: "clientLevel",
    key: "minCharge",
    name: "最低消费等级",
    prop: "minCharge"
  },
  {
    type: "string",
    key: "customerLimit",
    name: "额度(万)",
    prop: "customerLimit",
    disabled: true
  },
  {
    type: "string",
    key: "noExportLimit",
    name: "非出口额度(万)",
    prop: "noExportLimit",
    disabled: true
  },
  {
    type: "string",
    key: "exportTaxLimit",
    name: "出口垫税额度(万)",
    prop: "exportTaxLimit",
    disabled: true
  },
  {
    type: "string",
    key: "exportMatLimit",
    name: "出口垫价款额度(万)",
    prop: "exportMatLimit",
    disabled: true
  },
  {
    type: "date",
    key: "orderTime",
    name: "最后下单时间",
    prop: "orderTime"
  },
  {
    type: "string",
    key: "orderNum",
    name: "下单数据",
    prop: "orderNum",
    disabled: true
  },
  {
    type: "string",
    key: "totalAmount",
    name: "总金额",
    prop: "totalAmount",
    disabled: true
  },
  {
    type: "string",
    key: "avgAgencyFee",
    name: "平均代理费",
    prop: "avgAgencyFee",
    disabled: true
  },
  {
    type: "string",
    key: "ranked",
    name: "排名",
    prop: "ranked",
    disabled: true
  },
  {
    type: "string",
    key: "parity",
    name: "比价小数位",
    prop: "parity",
    rules: [
      {
        validator: validate.validateNaN,
        trigger: ["blur", "change"]
      }
    ]
  },
  {
    type: "checkbox",
    key: "systemUser",
    name: "是否是下单平台用户",
    prop: "systemUser"
  },
  {
    type: "date",
    key: "disableDate",
    name: "平台注册日期",
    prop: "disableDate"
  },
  {
    type: "date",
    key: "enableDate",
    name: "平台激活日期",
    prop: "enableDate"
  },
  /* {
  type: "checkbox",
  key: "importantMonitor",
  name: "重点监控",
  prop: "importantMonitor"
}, {
  type: "checkbox",
  key: "importantFocus",
  name: "重点关注",
  prop: "importantFocus"
},  */
  {
    type: "string",
    key: "remark",
    name: "备注",
    prop: "remark"
  }
  /* {
    type: "string",
    key: "authEmail",
    name: "授权邮箱",
    prop: "authEmail",
    rules: [{
      type: 'email',
      message: '邮箱错误',
      trigger: ['blur', 'change']
    }]
  }, {
    type: "string",
    key: "keyWordRemark",
    name: "关键词备注",
    prop: "keyWordRemark"
  }, */
];
