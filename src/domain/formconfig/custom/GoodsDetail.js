import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'customsFormCode',
    name: '报关单编码',
    prop: 'customsFormCode',
    disabled: true
  },
  /* {
		type: "string",
		key: "orderNos",
		name: "委托单号",
		prop: "orderNos",
		btn: true,
		readonly: true,
		rules
	}, */
  {
    type: 'string',
    key: 'goodsName',
    name: '商品名称',
    prop: 'goodsName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'taxNo',
    name: '税号',
    prop: 'taxNo',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'attachNo',
    name: '附号',
    prop: 'attachNo',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'tradeName',
    name: '商品报关名称',
    prop: 'tradeName',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'specificationType',
    name: '规格型号',
    prop: 'specificationType',
    disabled: true,
    rules
  },
  {
    type: 'select',
    key: 'brandType',
    name: '品牌类型',
    prop: 'brandType',
    selectKey: 'brandType',
    selectOption: []
  },
  {
    type: 'string',
    key: 'brandName',
    name: '品牌',
    prop: 'brand',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'declaredModel',
    name: '申报型号',
    prop: 'declaredModel',
    rules
  },
  {
    type: 'string',
    key: 'paramNo',
    name: '参数',
    prop: 'paramNo'
  },
  {
    type: 'string',
    key: 'originPlaceName',
    name: '原产国',
    prop: 'originPlaceName',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    btn: true,
    readonly: true,
    key: 'desCountryName',
    name: '运抵国',
    prop: 'desCountryName',
    rules
  },
  {
    type: 'string',
    key: 'planNumber',
    name: '报关计划数量',
    prop: 'planNumber',
    rules
  },
  {
    type: 'string',
    key: 'unitName',
    name: '成交单位',
    prop: 'unitName',
    rules
  },
  {
    type: 'string',
    key: 'netWeight',
    name: '净重(KG)',
    prop: 'netWeight',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'grossWeight',
    name: '毛重(KG)',
    prop: 'grossWeight',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'transactionPrice',
    name: '成交单价',
    prop: 'transactionPrice',
    rules
  },
  {
    type: 'select',
    key: 'currency',
    name: '币制',
    selectKey: 'currencyName',
    selectOption: []
  },
  {
    type: 'string',
    key: 'quantity',
    name: '成交数量',
    prop: 'quantity',
    rules,
    isShow: true
  },
  {
    type: 'string',
    key: 'transactionAmount',
    name: '成交金额',
    prop: 'transactionAmount',
    rules
  },
  {
    type: 'string',
    key: 'boxNumber',
    name: '箱数',
    prop: 'boxNumber',
    rules
  },
  {
    type: 'string',
    key: 'superConditions',
    name: '监管条件',
    prop: 'superConditions',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'boxNo',
    name: '箱号',
    prop: 'boxNo',
    rules
  },
  {
    type: 'string',
    key: 'transactionNumber',
    name: '成交数量',
    prop: 'transactionNumber',
    rules,
    isShow: true
  },
  {
    type: 'string',
    key: 'transactionUnitCode',
    name: '成交单位代码',
    prop: 'transactionUnitCode',
    isShow: true
  },
  {
    type: 'string',
    key: 'transactionUnitName',
    name: '成交单位名称',
    prop: 'transactionUnitName',
    isShow: true
  },
  {
    type: 'string',
    key: 'legalNumber',
    name: '法定第一计量单位代码',
    prop: 'legalNumber'
  },
  {
    type: 'string',
    key: 'legalUnitCode',
    name: '法定单位编码',
    prop: 'legalUnitCode',
    isShow: true
  },
  {
    type: 'string',
    key: 'legalUnitName',
    name: '法定第一计量单位名称',
    prop: 'legalUnitName'
  },
  {
    type: 'string',
    key: 'secondNumber',
    name: '法定第二计量单位数量',
    prop: 'secondNumber'
  },
  {
    type: 'number',
    key: 'exchangeFactor',
    prop: 'exchangeFactor',
    name: '换算比例'
  },
  {
    type: 'string',
    key: 'secondUnitCode',
    name: '法定第二计量单位代码',
    prop: 'secondUnitCode'
  },
  {
    type: 'string',
    key: 'secondUnitName',
    name: '法定第二计量单位名称',
    prop: 'secondUnitName',
    btn: true,
    readonly: true
  },
  {
    type: 'string',
    key: 'freeCharge',
    name: '征免',
    prop: 'freeCharge'
  },
  {
    type: 'string',
    key: 'accAmount',
    name: '累计申请金额',
    prop: 'accAmount'
  },
  {
    type: 'string',
    key: 'unAmount',
    name: '未申请金额',
    prop: 'unAmount'
  },
  {
    type: 'string',
    key: 'hasAmount',
    name: '已付款金额',
    prop: 'hasAmount'
  },
  {
    type: 'string',
    key: 'totalAmount',
    name: '运保杂合计',
    prop: 'totalAmount'
  },
  {
    type: 'string',
    key: 'batchNo',
    name: '批号',
    prop: 'batchNo',
    disabled: true
  },
  {
    type: 'string',
    key: 'superModel',
    name: '监管方式',
    prop: 'superModel',
    disabled: true
  },
  {
    type: 'string',
    key: 'customsWiew',
    name: '关务查看',
    prop: 'customsWiew'
  },
  {
    type: 'select',
    key: 'exportEnjoyment',
    name: '出口享惠情况',
    prop: 'exportEnjoyment',
    selectKey: 'exportEnjoyment',
    selectOption: []
  },
  {
    type: 'string',
    key: 'iqPlusCode',
    name: '检验检疫附加编码',
    prop: 'iqPlusCode'
  },
  {
    type: 'string',
    key: 'cargoAttribute',
    name: '货物属性',
    prop: 'cargoAttribute'
  },
  {
    type: 'string',
    key: 'iqName',
    name: '检验检疫名称',
    prop: 'iqName'
  },
  {
    type: 'string',
    key: 'plusNumber',
    name: '附件数',
    prop: 'plusNumber'
  }
]
