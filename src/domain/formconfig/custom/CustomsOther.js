import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'recordNo',
    name: '备案号',
    prop: 'recordNo'
  },
  {
    type: 'string',
    key: 'approvalNo',
    name: '批准文号',
    prop: 'approvalNo'
  },
  {
    type: 'string',
    key: 'permitNo',
    name: '许可证号',
    prop: 'permitNo'
  },
  {
    type: 'string',
    key: 'voyageNo',
    name: '航次号',
    prop: 'voyageNo'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'shippingType',
    key: 'shippingType',
    name: '运输方式',
    prop: 'shippingType',
    rules
  },
  {
    type: 'string',
    key: 'purpose',
    name: '用途',
    prop: 'purpose'
  },
  {
    type: 'string',
    key: 'levyRate',
    name: '征收比例(%)',
    prop: 'levyRate'
  },
  {
    type: 'string',
    btn: true,
    key: 'supervisionType',
    name: '监管方式',
    prop: 'supervisionType',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'exemption',
    name: '征免性质',
    prop: 'exemption',
    readonly: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'entryPort',
    key: 'stopoverSeaport',
    name: '启运港',
    prop: 'stopoverSeaport',
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'originCountry',
    name: '启运国（地区）',
    prop: 'originCountry',
    readonly: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'entryPort',
    key: 'originSeaport',
    name: '经停港',
    prop: 'originSeaport',
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'entryPort',
    key: 'entryPort',
    name: '入境口岸',
    prop: 'entryPort',
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'tradingCountry',
    name: '贸易国别（地区）',
    prop: 'tradingCountry',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'declarationUnit',
    name: '申报单位',
    prop: 'declarationUnit',
    readonly: true,
    rules
    // 		rules: [{
    // 			required: true,
    // 			message: '必填',
    // 			trigger: 'blur'
    // 		}]
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'freight',
    key: 'freight',
    name: '运费',
    prop: 'freight'
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'premium',
    key: 'premium',
    name: '保费',
    prop: 'premium'
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'incidentals',
    key: 'incidental',
    name: '杂费',
    prop: 'incidental'
  },
  {
    type: 'string',
    key: 'hasQP',
    name: '已发QP否',
    prop: 'hasQP',
    disabled: true
  },
  {
    type: 'string',
    key: 'sendUser',
    name: '发送人',
    prop: 'sendUser',
    disabled: true
  },
  {
    type: 'date',
    key: 'sendTime',
    name: '发送时间',
    prop: 'sendTime',
    disabled: true
  },
  {
    type: 'string',
    key: 'specialConfirm',
    name: '特殊关系确认',
    prop: 'specialConfirm'
  },
  {
    type: 'string',
    key: 'priceConfirm',
    name: '价格影响确认',
    prop: 'priceConfirm'
  },
  {
    type: 'string',
    key: 'royaltyConfirm',
    name: '支付特许权使用费确认',
    prop: 'royaltyConfirm'
  },
  {
    type: 'checkbox',
    key: 'needInspection',
    name: '需检验检疫',
    prop: 'needInspection'
  }
]
