import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    title: '',
    showline: false,
    list: [
      {
        text: true,
        key: 'billNo',
        name: '出库单编号',
        prop: 'billNo',
        type: 'string',
        disabled: true
      },
      {
        key: 'delegeteBillNo',
        name: '委托单号',
        prop: 'delegeteBillNo',
        type: 'string',
        disabled: true
      },
      {
        key: 'customsTradeName',
        name: '海关商品名称',
        prop: 'customsTradeName',
        type: 'string'
      },
      {
        key: 'inventoryCode',
        name: '存货编码',
        prop: 'inventoryCode',
        type: 'string',
        btn: true,
        rules: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      {
        key: 'inventoryName',
        name: '存货名称',
        prop: 'inventoryName',
        type: 'string',
        rules: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      {
        key: 'specificationType',
        name: '规格型号',
        prop: 'specificationType',
        type: 'string',
        rules: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      // {
      // 	key: "tradeName",
      // 	name: "商品名称",
      // 	prop: "tradeName",
      // 	type: "string",
      // 	rules: [{ required: true, message: '必填', trigger: 'blur' }]
      // },
      {
        key: 'brandName',
        name: '品牌',
        prop: 'brandName',
        type: 'string',
        btn: true,
        rules
      },
      {
        key: 'originPlaceName',
        name: '产地',
        prop: 'originPlaceName',
        type: 'string',
        btn: true,
        rules
      },
      {
        key: 'taxNo',
        name: '税号',
        prop: 'taxNo',
        type: 'string',
        btn: true
      },
      {
        key: 'attachNo',
        name: '附号',
        prop: 'attachNo',
        type: 'string'
      },
      {
        key: 'parameter',
        name: '参数',
        prop: 'parameter',
        type: 'string'
      },
      {
        key: 'planTurn',
        name: '计划车序',
        prop: 'planTurn',
        type: 'string'
      },
      {
        key: 'batchNo',
        name: '批次',
        prop: 'batchNo',
        type: 'string'
      },
      {
        key: 'supplierBatchNo',
        name: '供应商批次号',
        prop: 'supplierBatchNo',
        type: 'string'
      }
    ]
  },
  {
    title: '',
    showline: true,
    list: [
      // {
      // 	key: "x",
      // 	name: "应收数量",
      // 	prop: "x",
      // 	type: "string",
      // 	rules
      // },
      // {
      // 	key: "t",
      // 	name: "实收数量",
      // 	prop: "t",
      // 	type: "string",
      // 	rules
      // },
      {
        key: 'unitName',
        name: '计量单位',
        prop: 'unitName',
        type: 'string',
        btn: true,
        rules
      },
      {
        key: 'quantity',
        name: '出库数量',
        prop: 'quantity',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      {
        key: 'assistUnitName',
        name: '辅助计量单位',
        prop: 'assistUnitName',
        type: 'string',
        btn: true
      },
      {
        key: 'assictCount',
        name: '辅助数量',
        prop: 'assictCount',
        type: 'number',
        rules: [{ validator: validate.validateNum }]
      },
      {
        key: 'shippingMarks',
        name: '唛头',
        prop: 'shippingMarks',
        type: 'string',
        rules
      },
      {
        key: 'boxNoStart',
        name: '起始箱号',
        prop: 'boxNoStart',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      {
        key: 'boxNoEnd',
        name: '结束箱号',
        prop: 'boxNoEnd',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      // {
      // 	key: "boxPlusNo",
      // 	name: "箱附号",
      // 	prop: "boxPlusNo",
      // 	type: "string",
      // },
      {
        key: 'boxCount',
        name: '箱数',
        prop: 'boxCount',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      {
        key: 'netWeight',
        name: '净重(KG)',
        prop: 'netWeight',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      {
        key: 'grossWeight',
        name: '毛重(KG)',
        prop: 'grossWeight',
        type: 'number',
        rules: [
          {
            required: true,
            message: '必填',
            trigger: 'blur',
            validator: validate.validateNum
          }
        ]
      },
      {
        key: 'volume',
        name: '体积(M³)',
        prop: 'volume',
        type: 'number',
        rules: [{ validator: validate.validateNum }]
      },
      {
        btn: true,
        readonly: true,
        key: 'warehouseName',
        name: '仓库',
        prop: 'warehouseName',
        type: 'string',
        rules: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      {
        btn: true,
        readonly: true,
        key: 'storekeeperName',
        name: '仓管员',
        prop: 'storekeeperName',
        type: 'string',
        rules: [{ required: true, message: '必填', trigger: 'blur' }]
      },
      {
        key: 'storehouse',
        name: '库位',
        prop: 'storehouse',
        type: 'string'
      }
      // {
      // 	text: true,
      // 	key: "contractNo",
      // 	name: "合同号",
      // 	prop: "contractNo",
      // 	type: "string",
      // 	// rules
      // },
      /* {
				text: true,
				key: "deliveryAddress",
				name: "送货地址",
				prop: "deliveryAddress",
				type: "string",
				rules
			}, */
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "price",
      // 	name: "单价",
      // 	prop: "price",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "priceTax",
      // 	name: "价税合计",
      // 	prop: "priceTax",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	text: true,
      // 	key: "amountCurrency",
      // 	name: "金额本位币",
      // 	prop: "amountCurrency",
      // 	type: "string",
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "taxRate",
      // 	name: "税率%",
      // 	prop: "taxRate",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "priceContainTax",
      // 	name: "含税单价",
      // 	prop: "priceContainTax",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "priceNet",
      // 	name: "实际单价",
      // 	prop: "priceNet",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "amount",
      // 	name: "金额",
      // 	prop: "amount",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "taxCurrency",
      // 	name: "税额本位币",
      // 	prop: "taxCurrency",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "priceTaxCurrency",
      // 	name: "价税合计本位币",
      // 	prop: "priceTaxCurrency",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	text: true,
      // 	key: "keyBillNo",
      // 	name: "核心单据号",
      // 	prop: "keyBillNo",
      // 	type: "string",
      // },
      // {
      // 	text: true,
      // 	key: "keyBillRowNo",
      // 	name: "核心单据行号",
      // 	prop: "keyBillRowNo",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	selectOption: [],
      // 	select: true,
      // 	key: "keyBillType",
      // 	name: "核心单据类型",
      // 	prop: "keyBillType",
      // 	type: "string",
      // },
      // {
      // 	type: 'string',
      // 	key: "baseUnitName",
      // 	name: "基本计量单位",
      // 	prop: "baseUnit",
      // 	btn: true,
      // 	rules
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "unitActualCost",
      // 	name: "单位实际成本",
      // 	prop: "unitActualCost",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "actualCost",
      // 	name: "实际成本",
      // 	prop: "actualCost",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	text: true,
      // 	key: "attachedAttribute",
      // 	name: "辅助属性",
      // 	prop: "attachedAttribute",
      // 	type: "string",
      // },
      // {
      // 	btn: true,
      // 	type: 'string',
      // 	key: "supplierName",
      // 	name: "供应商",
      // 	prop: "supplierName",
      // 	isShowPopover: true,
      // 	readonly: true
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "unitStandardCost",
      // 	name: "单位标准成本",
      // 	prop: "unitStandardCost",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "standardCost",
      // 	name: "标准成本",
      // 	prop: "standardCost",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	selectOption: [],
      // 	select: true,
      // 	key: "discountType",
      // 	name: "折扣方式",
      // 	prop: "discountType",
      // 	type: "string",
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "discountAmount",
      // 	name: "折扣额",
      // 	prop: "discountAmount",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "unitDiscount",
      // 	name: "单位折扣",
      // 	prop: "unitDiscount",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "actualTaxPrice",
      // 	name: "实际含税单价",
      // 	prop: "actualTaxPrice",
      // 	type: "string",
      // },
      // {
      // 	checked: true,
      // 	key: "completeCancellation",
      // 	name: "完全核销",
      // 	prop: "completeCancellation",
      // 	type: "checkbox",
      // },
      // {
      // 	type: true,
      // 	text: true,
      // 	key: "cancelledAmount",
      // 	name: "已核销金额",
      // 	prop: "cancelledAmount",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // },
      // {
      // 	text: true,
      // 	key: "writeOffQuantity",
      // 	name: "累计冲销数量",
      // 	prop: "writeOffQuantity",
      // 	type: "number",
      // 	rules: [{validator: validate.validateNum,}],
      // }
    ]
  }
]
