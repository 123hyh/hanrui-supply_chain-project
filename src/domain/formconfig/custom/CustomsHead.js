import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'customsFormCode',
    name: '单据编号',
    prop: 'customsFormCode',
    // disabled: true,
    readonly: true
  },
  {
    type: 'select',
    key: 'biType',
    name: '源单单据来源',
    prop: 'biType',
    selectOption: [{ itemKey: '1', itemValue: '报关计划单' }]
  },
  {
    type: 'string',
    key: 'planOrderNo',
    name: '报关计划单',
    key: 'planOrderNo',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'customsNo',
    name: '海关编号',
    prop: 'customsNo',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'declareCustoms',
    key: 'customsType',
    name: '报关类型',
    prop: 'customsType',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'CustomsDeclarationStatus',
    key: 'customsStatus',
    name: '报关状态',
    prop: 'customsStatus',
    disabled: true,
    rules
  },
  // {
  // 	type: "checkbox",
  // 	key: "createWms",
  // 	name: "WMS生成",
  // 	prop: "createWms",
  // 	disabled: true,
  // },
  {
    type: 'string',
    key: 'preCode',
    name: '预录入编号',
    prop: 'preCode'
  },
  {
    type: 'string',
    key: 'uniformCode',
    name: '统一编号',
    prop: 'uniformCode'
  },
  // {
  // 	selectOption: [],
  // 	type: "select",
  // 	selectKey: "billStatus",
  // 	key: "billStatus",
  // 	name: "单据状态",
  // 	prop: "billStatus",
  // 	disabled: true,
  // },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'costomsType',
    key: 'customsFormType',
    name: '报关单类型',
    prop: 'customsFormType',
    rules
  },
  {
    type: 'checkbox',
    key: 'remittance',
    name: '是否付汇',
    prop: 'remittance'
  },
  {
    type: 'string',
    key: 'collectTax',
    name: '汇总征税',
    prop: 'collectTax',
    rules: [
      {
        validator: validate.validateNum,
        trigger: ['blur', 'change']
      }
    ]
  },

  {
    type: 'checkbox',
    key: 'myInsure',
    name: '我司投保',
    prop: 'myInsure'
  },
  {
    type: 'checkbox',
    key: 'payTax',
    name: '我司交税',
    prop: 'payTax',
    disabled: true
  },
  {
    type: 'checkbox',
    key: 'shouldPay',
    name: '已生成应付',
    prop: 'shouldPay',
    disabled: true
  },
  {
    type: 'checkbox',
    key: 'serviceCharge',
    name: '已生成服务费应收',
    prop: 'serviceCharge',
    disabled: true
  },
  {
    type: 'checkbox',
    key: 'agentReceive',
    name: '已生成代理应收',
    prop: 'agentReceive',
    disabled: true
  }
]
