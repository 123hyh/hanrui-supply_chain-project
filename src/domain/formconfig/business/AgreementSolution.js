import validate from '@/domain/common/validate'
const { setRequired } = validate
const rules = setRequired()
export default [
  // 	{
  // 		type: "string",
  // 		key: "solutionNo",
  // 		name: "方案编号",
  // 		prop: "solutionNo",
  // 		disabled: true,
  // 	},
  // 	{
  // 		type: "string",
  // 		key: "agreementNo",
  // 		name: "协议编号",
  // 		prop: "agreementNo",
  // 		disabled: true,
  // 	},
  {
    type: 'string',
    key: 'solutionName',
    name: '方案名称',
    prop: 'solutionName',
    btn: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'declareCustoms',
    key: 'customType',
    name: '报关类型',
    prop: 'customType',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'businessTypeG',
    key: 'businessType',
    name: '业务类型',
    prop: 'businessType',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'tradeName',
    key: 'tradeType',
    name: '贸易类型',
    prop: 'tradeType',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'transactionMode',
    key: 'establishMode',
    name: '成交方式',
    prop: 'establishMode',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'InvoiceTypes',
    key: 'invoiceType',
    name: '发票类型',
    prop: 'invoiceType',
    rules
  },
  {
    type: 'checkbox',
    key: 'matPayment',
    name: '垫货款',
    prop: 'matPayment'
  },
  {
    type: 'string',
    key: 'exportTaxMat',
    name: '出口垫税',
    prop: 'exportTaxMat'
  },
  {
    type: 'checkbox',
    key: 'taxRebateBySelf',
    name: '客户自行退税',
    prop: 'taxRebateBySelf'
  },
  {
    type: 'checkbox',
    key: 'collectionCharge',
    name: '境外代收服务费',
    prop: 'collectionCharge'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'QuoteType',
    key: 'offerType',
    name: '报价类型',
    prop: 'offerType'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'serviceFeeType',
    key: 'serviceChargeType',
    name: '服务费种类',
    prop: 'serviceChargeType',
    rules
  },
  {
    type: 'string',
    slotType: '%',
    key: 'serviceChargeRate',
    name: '服务费率',
    prop: 'serviceChargeRate',
    rules: [
      rules[0],
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    type: 'string',
    key: 'serviceCharge',
    name: '服务费定额',
    prop: 'serviceCharge',
    rules: [
      rules[0],
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'currencyName',
    key: 'serviceChargeCurrency',
    name: '定额币种',
    prop: 'serviceChargeCurrency',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'settlementMethod',
    key: 'chargeMode',
    name: '结算方式',
    prop: 'chargeMode'
  },
  {
    type: 'select',
    key: 'loanRateFlag',
    selectKey: 'exchangeRateBasis',
    selectOption: [],
    name: '汇率取值依据-贷款',
    prop: 'loanRateFlag',
    rules
  },
  {
    type: 'select',
    key: 'seviceRateFlag',
    name: '汇率取值依据-服务费',
    prop: 'seviceRateFlag',
    selectKey: 'exchangeRateBasis',
    selectOption: [],
    rules
  },
  {
    type: 'select',
    key: 'matTaxesRateFlag',
    name: '汇率取值依据-垫付税金',
    prop: 'matTaxesRateFlag',
    selectKey: 'exchangeRateBasis',
    selectOption: [],
    rules
  },
  {
    type: 'string',
    key: 'minimumCharge',
    name: '单笔最低服务费-金额',
    prop: 'minimumCharge',
    rules: [
      rules[0],
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'currencyName',
    key: 'miniChargeCurrency',
    name: '单笔最低服务费-币种',
    prop: 'miniChargeCurrency',
    rules
  },
  {
    type: 'checkbox',
    key: 'containInterest',
    name: '服务费含利息',
    prop: 'containInterest'
  },
  {
    type: 'checkbox',
    key: 'noMinerviceCharge',
    name: '不收最低服务费',
    prop: 'noMinerviceCharge'
  },
  {
    type: 'checkbox',
    key: 'chargeInterest',
    name: '服务费计息',
    prop: 'chargeInterest'
  },
  {
    type: 'string',
    key: 'storageChargeMode',
    name: '仓储计费方案',
    prop: 'storageChargeMode'
  },
  {
    type: 'checkbox',
    key: 'containCorporation',
    name: '服务费含信保',
    prop: 'containCorporation'
  },
  {
    type: 'string',
    slotType: '%',
    key: 'corporationRate',
    name: '信保费率',
    prop: 'corporationRate',
    rules: [
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    type: 'string',
    key: 'rateParameter',
    name: '汇率参数',
    prop: 'rateParameter'
  },
  {
    type: 'string',
    key: 'chargeFormula',
    name: '结算公式',
    prop: 'chargeFormula'
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'bizSettlementScheme',
    key: 'chargeAgreement',
    name: '结算方案',
    prop: 'chargeAgreement',
    rules
  },
  {
    type: 'string',
    key: 'accountPeriod',
    name: '账期(天)',
    prop: 'accountPeriod',
    rules: [
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },
  {
    type: 'textarea',
    key: 'accountPeriodRemark',
    name: '账期详细描述',
    prop: 'accountPeriodRemark'
  }
]
