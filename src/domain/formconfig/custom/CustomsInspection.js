import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'brokerCode',
    name: '报关员代码',
    prop: 'brokerCode',
    rules
  },
  {
    type: 'string',
    key: 'verifyCode',
    name: 'QP审核状态代码',
    prop: 'verifyCode',
    rules
  },
  {
    type: 'date',
    key: 'releaseTime',
    name: '放行时间',
    prop: 'releaseTime'
  },
  {
    type: 'date',
    key: 'closeDate',
    name: '结关日期',
    prop: 'closeDate'
  },
  {
    type: 'checkbox',
    key: 'hasInspection',
    name: '已做报关检查',
    prop: 'hasInspection'
  },
  {
    type: 'string',
    key: 'buyingPrice',
    name: '报关日的银行买入价',
    prop: 'buyingPrice'
  },
  {
    type: 'string',
    key: 'busiTypeCode',
    name: '业务类型编码',
    prop: 'busiTypeCode'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'businessType',
    key: 'bizType',
    name: '业务类型',
    prop: 'bizType'
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'sourcedocumentType',
    key: 'orderType',
    name: '委托单单据类型',
    prop: 'orderType'
  },
  {
    type: 'string',
    key: 'approvalReceipt',
    name: 'OP审批回执',
    prop: 'approvalReceipt'
  },
  // 报检信息
  {
    type: 'string',
    btn: true,
    key: 'iqOffice',
    name: '检验检疫受理机关',
    prop: 'iqOffice',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'licenseOffice',
    name: '领证机关',
    prop: 'licenseOffice',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'destinationOffice',
    name: '目的地检验检疫机关',
    prop: 'destinationOffice',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'portOffice',
    name: '口岸检验检疫机关',
    prop: 'portOffice',
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'inspectionWay',
    name: '报检用途',
    prop: 'inspectionWay',
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'packageQuantity',
    name: '其他包装件数',
    prop: 'packageQuantity'
  },
  {
    type: 'string',
    key: 'packageType',
    name: '其他包装种类',
    prop: 'packageType'
  },
  {
    type: 'string',
    key: 'qualification',
    name: '企业资质',
    prop: 'qualification'
  },
  {
    type: 'string',
    key: 'reasonsCode',
    name: '关联理由及代码',
    prop: 'reasonsCode'
  },
  {
    type: 'string',
    key: 'goodsAttributes',
    name: '货物属性',
    prop: 'goodsAttributes'
  }
]
