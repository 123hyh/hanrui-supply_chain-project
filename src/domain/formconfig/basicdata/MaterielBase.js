import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'materielCode',
    name: '物料基础编码',
    prop: 'materielCode',
    rules
  },
  {
    type: 'string',
    key: 'tradeName',
    name: '物料名称',
    prop: 'tradeName',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: 'materielStatus',
    name: '物料状态',
    prop: 'materielStatus',
    selectKey: 'materielStatus',
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: 'materielType',
    name: '物料分类',
    prop: 'materielType',
    selectKey: 'materialClassifiType',
    rules
  },
  {
    type: 'select',
    selectKey: 'brandType',
    selectOption: [],
    key: 'brandType',
    prop: 'brandType',
    name: '品牌类型'
  },
  {
    type: 'string',
    btn: true,
    key: 'brandName',
    prop: 'brandName',
    readonly: true,
    name: '品牌名称'
  },
  {
    type: 'string',
    key: 'brandAbb',
    prop: 'brandAbb',
    name: '品牌简称'
  },
  {
    type: 'string',
    key: 'brandDes',
    prop: 'brandDes',
    name: '品牌描述'
  },
  {
    type: 'string',
    btn: true,
    readonly: true,
    key: 'originName',
    prop: 'originName',
    name: '产地国'
  },
  {
    type: 'string',
    key: 'originAbb',
    prop: 'originAbb',
    name: '产地简称'
  },
  {
    type: 'string',
    key: 'originDes',
    prop: 'originDes',
    name: '产地描述'
  },
  {
    type: 'string',
    key: 'inspectionType',
    prop: 'inspectionType',
    name: '检验检疫类别',
  },
  {
    type: 'string',
    key: 'measurementUnitName',
    name: '成交单位',
    prop: 'measurementUnitName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'remenberCode',
    name: '助记码',
    prop: 'remenberCode'
  },
  {
    type: 'string',
    key: 'specificationType',
    name: '规格型号',
    prop: 'specificationType',
    rules
  },
  {
    type: 'string',
    key: 'engineNo',
    name: '工程图号',
    prop: 'engineNo'
  },
  {
    type: 'string',
    key: 'trademark',
    name: '注册商标',
    prop: 'trademark'
  },
  {
    type: 'string',
    key: 'barcode',
    name: '条形码',
    prop: 'barcode'
  },
  {
    type: 'string',
    key: 'approvalNumber',
    name: '批准文号',
    prop: 'approvalNumber'
  },
  {
    type: 'select',
    selectOption: [1, 2, 3, 4, 5].map(item => ({
      itemValue: item,
      itemKey: item
    })),
    key: 'monovalent',
    name: '单价精度',
    prop: 'monovalent'
  },
  {
    type: 'number',
    key: 'exchangeFactor',
    prop: 'exchangeFactor',
    name: '转换系数'
  },
  {
    type: 'string',
    btn: true,
    key: 'customsUnitName',
    prop: 'customsUnitName',
    name: '海关法定计量单位',
    isShow: true
  }
]
