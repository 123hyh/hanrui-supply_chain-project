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
    key: 'quantity',
    name: '成交数量', // 卖方
    prop: 'quantity',
    // disabled: true,
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
    name: '订单单价', // 卖方
    prop: 'orderPrice',
    isShow: true,
    disabled: true,
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
    name: '报关订单单价',
    type: 'string',
    key: 'customPrice',
    prop: 'customPrice',
    disabled: true
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'currencyName',
    key: 'orderCurrency',
    name: '订单币种', // 卖方
    prop: 'orderCurrency',
    disabled: true
  },
  {
    type: 'string',
    key: 'customAmount',
    name: '报关(货值)金额',
    prop: 'customAmount',
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
    key: 'transportFee',
    name: '运费',
    prop: 'transportFee'
  },
  {
    type: 'string',
    key: 'insuranceFee',
    name: '保费',
    prop: 'insuranceFee'
  },
  {
    type: 'string',
    key: 'otherFee',
    name: '杂费',
    prop: 'otherFee',
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
    key: 'totalAmount',
    name: '运保杂总计',
    prop: 'totalAmount',
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
    key: 'tariff',
    name: '关税', // 海关税额
    prop: 'tariff',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'vat',
    name: '增值税', // 增值税税额
    prop: 'vat',
    disabled: true,
    rules
  },
  {
    type: 'select',
    selectKey: 'currencyName',
    selectOption: [],
    key: 'serviceCurrency',
    prop: 'serviceCurrency',
    name: '服务费币别'
  },
  {
    type: 'number',
    key: 'serviceFee',
    prop: 'serviceFee',
    name: '服务费金额'
  },
  {
    type: 'string',
    key: 'originalCurrencyToRmb',
    name: '原币别到人民币',
    prop: 'originalCurrencyToRmb',
    rules,
    readonly: true
  },
  {
    type: 'calculate',
    key: 'targetCurrencyToRmb',
    name: '目标币到人民币',
    prop: 'targetCurrencyToRmb',
    rules
  },
  {
    type: 'string',
    key: 'superviseTerm',
    name: '监管条件',
    prop: 'superviseTerm',
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
    key: 'superviseMode',
    name: '监管方式',
    prop: 'superviseMode',
    disabled: true,
    rules
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
