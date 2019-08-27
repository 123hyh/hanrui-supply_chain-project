import validate from '@/domain/common/validate.js'
const rules = validate.setRequired()
export default [
  /* {
		type: 'string',
		key: "materielCode",
		name: "物料基础信息",
		prop: "materielCode",
		btn: true,
		rules
	}, */
  /* 	{
		type: 'string',
		key: "materielCustomCode",
		name: "物料信息编码",
		prop: "materielCustomCode"
	}, */
  {
    type: 'string',
    key: 'customsAbbreviation',
    name: '海关商品名称',
    prop: 'customsAbbreviation',
    rules
  },
  {
    type: 'string',
    key: 'customsAlias',
    name: '海关别名',
    prop: 'customsAlias',
    rules
  },
  {
    type: 'string',
    key: 'foreignName',
    name: '海关商品外文名称',
    prop: 'foreignName',
    rules
  },
  {
    type: 'string',
    key: 'customsCode',
    name: '海关商品编码',
    prop: 'customsCode',
    rules
  },
  {
    type: 'number',
    key: 'customsRate',
    name: '海关税率(%)',
    prop: 'customsRate',
    rules
  },
  {
    type: 'number',
    key: 'levyRate',
    name: '加征税率(%)',
    prop: 'levyRate',
    rules
  },
  {
    type: 'number',
    key: 'maxRate',
    name: '最高税率(%)',
    prop: 'maxRate',
    isShow: true,
    rules
  },
  {
    type: 'number',
    key: 'rebateRate',
    name: '出口退税率(%)',
    prop: 'rebateRate',
    rules
  },
  {
    type: 'number',
    key: 'averagePrice',
    name: '平均价单价',
    prop: 'averagePrice',
    rules
  },
  {
    type: 'number',
    key: 'maxPrice',
    name: '最高单价',
    prop: 'maxPrice',
    rules
  },
  {
    type: 'number',
    key: 'minPrice',
    name: '最低单价',
    prop: 'minPrice',
    rules
  },
  {
    type: 'number',
    key: 'totalNo',
    name: '总数量值',
    prop: 'totalNo',
    rules
  },
  {
    type: 'string',
    key: 'taxNo',
    name: '税号',
    prop: 'taxNo',
    rules
  },
  {
    type: 'string',
    key: 'attachNo',
    name: '附号',
    prop: 'attachNo'
  },
  {
    btn: true,
    type: 'string',
    key: 'superConditionName',
    name: '监管条件',
    prop: 'superConditionNamef'
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
    key: 'remarks',
    name: '审核备注',
    prop: 'remarks'
  },
  {
    type: 'checkbox',
    key: 'verify',
    name: '申报型号审核',
    prop: 'verify'
  },
  {
    type: 'number',
    key: 'vatTaxRate',
    name: '增值税率',
    prop: 'vatTaxRate',
    isShow: true
  },
  {
    type: 'number',
    key: 'generalTax',
    prop: 'generalTax',
    name: '普通进口税率'
  },
  {
    type: 'number',
    key: 'temporaryTax',
    prop: 'temporaryTax',
    name: '暂定进口税率'
  },
  {
    type: 'number',
    key: 'exciseTaxRate',
    prop: 'exciseTaxRate',
    name: '消费税率'
  },
  {
    type: 'number',
    key: 'expTax',
    prop: 'expTax',
    name: '出口关税率',
    isShow: true
  },
  {
    type: 'string',
    key: 'custFirstUnitName', //custFirstUnit
    prop: 'custFirstUnitName',
    name: '法定第一单位名称',
    btn: true,
    readonly: true
  },
  {
    type: 'string',
    key: 'custFirstNums',
    prop: 'custFirstNums',
    name: '法定第一单位代码'
  },
  {
    type: 'string',
    key: 'custSecondUnitName', //custSecondUnit
    prop: 'custSecondUnitName',
    name: '法定第二单位名称',
    readonly: true,
    btn: true
  },
  {
    type: 'number',
    key: 'custSecondNums',
    prop: 'custSecondNums',
    name: '法定第二单位代码'
  },
  {
    type: 'string',
    key: 'originCountry',
    prop: 'originCountry',
    name: '原产国（地区）'
  },
  {
    type: 'string',
    key: 'domesticDestination',
    prop: 'domesticDestination',
    name: '境内目的地'
  },
  {
    type: 'string',
    key: 'goodsPlace',
    prop: 'goodsPlace',
    name: '境内货源地'
  },
  {
    type: 'string',
    key: 'finalCountry',
    prop: 'finalCountry',
    name: '最终目的国'
  },
  {
    type: 'select',
    selectKey: 'has',
    selectOption: [],
    key: 'controlledGoods',
    prop: 'controlledGoods',
    name: '管制品'
  },
  {
    type: 'string',
    key: 'exemptionName',
    prop: 'exemptionName',
    name: '征免',
    btn: true
  },
  {
    type: 'select',
    selectKey: 'exportEnjoyment',
    selectOption: [],
    key: 'exportEnjoyment',
    prop: 'exportEnjoyment',
    name: '出口享惠情况'
  },
  {
    type: 'select',
    selectKey: 'has',
    selectOption:[],
    key: 'needInspection',
    prop: 'needInspection',
    name: '该商品需检验检疫'
  }
]
