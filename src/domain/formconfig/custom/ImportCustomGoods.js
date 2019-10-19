import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'orderNos',
    name: '委托单',
    prop: 'orderNos',
    isShow: true,
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'goodsCode',
    name: '商品编码',
    prop: 'goodsCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'goodsModel',
    name: '规格型号',
    prop: 'goodsModel',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'brand',
    name: '品牌',
    prop: 'brand',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'sourceArea',
    name: '原产地',
    prop: 'sourceArea',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'goodsNameCustom',
    name: '报关商品名称', // 来货名称
    prop: 'goodsName_Custom',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'goodsName',
    name: '商品名称',
    prop: 'goodsName',
    btn: true,
    readonly: true,
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'taxNo',
    name: '税号',
    prop: 'TaxNo',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'attachmentNo',
    name: '附号',
    prop: 'attachmentNo',
    disabled: true
  },
  {
    type: 'number',
    key: 'sellerQuantity',
    name: '成交数量', // 卖方
    prop: 'sellerQuantity',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur',
        validator: validate.validateNum,
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'string',
    key: 'receiveQuantity',
    name: '累计收货数量',
    prop: 'receiveQuantity'
  },
  {
    type: 'string',
    key: 'notRelevanceQuantity',
    name: '未关联数量',
    prop: 'notRelevanceQuantity',
    rules: [
      {
        validator: validate.validateNum,
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'string',
    key: 'outputQuantity',
    name: '累计出库数量',
    prop: 'outputQuantity'
  },
  {
    type: 'string',
    key: 'notCargoQuantity',
    name: '未放货数量',
    prop: 'notCargoQuantity'
  },
  {
    type: 'string',
    readonly: true,
    btn: true,
    key: 'unitName',
    name: '成交单位', // 卖方
    prop: 'unitName',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'orderPrice',
    name: '订单单价',
    prop: 'orderPrice',
    isShow: true,
    disabled: true,
  },
  {
    name: '报关订单单价',
    type: 'string',
    key: 'sellerPrice',
    prop: 'sellerPrice',
    disabled: true
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'currencyName',
    key: 'sellerCurrency',
    name: '订单币种', // 卖方
    prop: 'sellerCurrency',
    disabled: true
  },
  {
    type: 'string',
    key: 'rmbPrice',
    name: '人民币单价',
    prop: 'rmbPrice',
    disabled: true,
    rules
  },
  {
    type: 'calc',
    solutionFormula:"sellerQuantity*sellerPrice",
    key: 'sellerGoodsValue',
    name: '报关(货值)金额', //货价（货值）
    prop: 'sellerGoodsValue',
    disabled: true,
  },
  {
    type: 'string',
    key: 'piece',
    name: '件数',
    prop: 'piece',
    disabled: true,
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
    key: 'netWeight',
    name: '净重(KG)',
    prop: 'netWeight',
    disabled: true,
    rules
  },
  {
    type: 'string',
    ratio:true,
    key: "freightRate",
    name: "运费费率(%)",
    prop: "freightRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'freight',
    name: '运费',
    prop: 'freight',
    disabled: true,
  },
  {
    type: 'string',
    ratio:true,
    key: "premiumRate",
    name: "保费费率(%)",
    prop: "premiumRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'premium',
    name: '保费',
    prop: 'premium',
    disabled: true,
  },
  {
    type: 'string',
    ratio:true,
    key: "extrasRate",
    name: "杂费费率(%)",
    prop: "extrasRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'extras',
    name: '杂费',
    prop: 'extras',
    disabled: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur',
        validator: validate.validateNum,
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'string',
    key: 'costAmount',
    name: '运保杂总计',
    prop: 'costAmount',
    disabled: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur',
        validator: validate.validateNum,
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'string',
    key: 'customsExchangeRate',
    name: '原币别到人民币', //海关汇率
    prop: 'customsExchangeRate',
    disabled: true,
    rules,
  },
  // {
  //   type: 'calculate',
  //   key: 'targetCurrencyToRmb',
  //   name: '目标币到人民币',
  //   prop: 'targetCurrencyToRmb',
  //   disabled: true,
  //   rules
  // },
  {
    type: 'string',
    ratio:true,
    key: "customTaxRate",
    name: "关税税率(%)",
    prop: "customTaxRate",
    disabled: true,
  },
  {
    type: 'string',
    ratio:true,
    key: "increaseTaxRate",
    name: "加征税率(%)",
    prop: "increaseTaxRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'customTaxAmount',
    name: '关税', // 海关税额
    prop: 'customTaxAmount',
    disabled: true,
    rules
  },
  {
    type: 'string',
    ratio:true,
    key: "exciseTaxRate",
    name: "消费税率(%)",
    prop: "exciseTaxRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'exciseTax',
    name: '消费税额',
    prop: 'exciseTax',
    disabled: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    key: "vatTaxRate",
    selectKey: "valueAddedTax",
    name: "进口增值税率%",
    disabled: true,
    prop: "vatTaxRate",
  },
  {
    type: 'string',
    key: 'vatTaxAmount',
    name: '增值税', // 增值税税额
    prop: 'vatTaxAmount',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'taxTypeName',
    name: '其他税种',
    prop: 'taxTypeName',
    disabled: true,
    rules
  },
  {
    type: 'string',
    ratio:true,
    key: "otherTaxRate",
    name: "其他税率(%)",
    prop: "otherTaxRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'otherTaxAmount',
    name: '其他税金',
    prop: 'otherTaxAmount',
    disabled: true,
    rules
  },
  {
    type:"calc",
    key: "priceTax",
    name: "价税合计",
    prop: "priceTax",
    solutionFormula:"sellerGoodsValue*customsExchangeRate+customTaxAmount+exciseTax+vatTaxAmount+otherTaxAmount",
    symbol:'￥',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'dutiablePrice',
    name: '完税价格',
    prop: 'dutiablePrice',
    disabled: true,
    isShow: true,
    rules
  },
  {
    type: 'string',
    ratio:true,
    key: "serviceExchangeRate",
    name: "服务费费率(%)",
    prop: "serviceExchangeRate",
    disabled: true,
  },
  {
    type: 'select',
    selectKey: 'currencyName',
    selectOption: [],
    key: 'serviceCurrency',
    prop: 'serviceCurrency',
    name: '服务费币别',
    disabled: true,
  },
  {
    type: 'number',
    key: 'serviceFee',
    prop: 'serviceFee',
    name: '服务费金额',
    disabled: true,
  },
  {
    type: 'string',
    key: 'buyerExchangeRate',
    name: '买方货款汇率',
    prop: 'buyerExchangeRate',
    disabled: true,
  },
  {
    type: 'string',
    key: 'buyerRate',
    name: '买方汇率',
    isShow:true,
    prop: 'buyerRate',
    disabled: true,
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'currencyName',
    key: 'buyerCurrency',
    name: '买方币别',
    prop: 'buyerCurrency',
    disabled: true
  },
  {
    type: 'calc',
    solutionFormula:"buyerGoodsValue/sellerQuantity",
    divisor:'sellerQuantity',
    key: 'buyerPrice',
    name: '买方单价',
    prop: 'buyerPrice',
    disabled: true,
  },
  {
    type: 'calc',
    solutionFormula:"(priceTax+serviceFee)/buyerRate",
    divisor:'buyerRate',
    key: 'buyerGoodsValue',
    name: '买方货值',
    prop: 'buyerGoodsValue',
    disabled: true,
  },
  {
    type: 'string',
    ratio:true,
    key: "drawbackRate",
    name: "退税率(%)",
    prop: "drawbackRate",
    disabled: true,
  },
  {
    type: 'string',
    key: 'drawback',
    name: '退税金额',
    prop: 'drawback',
    disabled: true,
    rules
  },
  // {
  //   type: 'string',
  //   key: 'superviseMode',
  //   name: '监管方式',
  //   prop: 'superviseMode',
  //   disabled: true,
  //   rules
  // },
  {
    type: 'string',
    key: 'superviseTerm',
    name: '监管条件',
    prop: 'superviseTerm',
    disabled: true,
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'exemption',
    name: '征免性质',
    prop: 'exemption',
    btn: true,
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: 'parameter',
    name: '参数',
    prop: 'parameter'
  },
  {
    type: 'string',
    key: 'mark',
    name: '唛头',
    prop: 'mark',
    rules
  },
  {
    type: 'string',
    key: 'startNo',
    name: '起号',
    prop: 'startNo'
  },
  {
    type: 'string',
    key: 'endNo',
    name: '止号',
    prop: 'endNo'
  },
  {
    type: 'string',
    key: 'remark',
    name: '备注',
    prop: 'remark'
  },

  {
    type: 'string',
    key: 'storageLocation',
    name: '库位',
    prop: 'storageLocation'
  },
  // {
  // 	type: "string",
  // 	key: "lineNo",
  // 	name: "行号",
  // 	prop: "lineNo"
  // },
  {
    type: 'string',
    key: 'mergeOrderNo',
    name: '合并单号',
    prop: 'mergeOrderNo'
  },
  {
    type: 'string',
    key: 'exportAmountSettlement',
    name: '已计出口结算金额',
    prop: 'exportAmountSettlement'
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
    key: 'customsCheck',
    name: '关务查看',
    prop: 'customsCheck'
  },
  {
    type: 'string',
    key: 'attachmentQuantity',
    name: '附件数',
    prop: 'attachmentQuantity',
    rules: [
      {
        validator: validate.validateNum,
        trigger: 'blur'
      }
    ]
  }
]
