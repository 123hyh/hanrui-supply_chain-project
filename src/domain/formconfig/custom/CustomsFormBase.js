import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'contractNo',
    name: '合同协议号',
    prop: 'contractNo',
    readonly: true,
    btn: true,
    rules
  },
  {
    type: 'string',
    key: 'contractName',
    name: '合同协议',
    prop: 'contractName'
  },
  {
    btn: true,
    type: 'string',
    key: 'deliveryNo',
    name: '提运单号',
    prop: 'deliveryNo',
    readonly: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'entryClearance',
    key: 'category',
    name: '进境关别',
    prop: 'category',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
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
    selectOption: [],
    type: 'select',
    selectKey: 'shippingType',
    key: 'conveyance',
    name: '运输工具',
    prop: 'conveyance',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'checkbox',
    key: 'sengCar',
    name: '本车已发出',
    prop: 'sengCar',
    disabled: true
  },
  {
    type: 'date',
    key: 'importTime',
    name: '进口日期',
    prop: 'importTime',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur'
      }
    ]
  },
  {
    type: 'date',
    key: 'exportTime',
    name: '申请日期',
    prop: 'exportTime',
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
    selectKey: 'entryPort',
    key: 'declareCustoms',
    name: '申报海关',
    prop: 'declareCustoms',
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'destination',
    name: '境内目的地',
    prop: 'destination',
    readonly: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'receiveUnitType',
    key: 'unitType',
    name: '收发货单位类型',
    prop: 'unitType',
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'packagingType',
    name: '包装种类',
    prop: 'packagingType',
    readonly: true,
    rules
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: 'transactionMode',
    key: 'transactionMode',
    name: '成交方式',
    prop: 'transactionMode',
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
    selectKey: 'currencyName',
    key: 'currencyType',
    name: '报关币别',
    prop: 'currencyType',
    rules
  },
  {
    type: 'string',
    btn: true,
    key: 'receiveUnit',
    name: '收货单位',
    prop: 'receiveUnit',
    readonly: true,
    rules
    // 		rules: [{
    // 			required: true,
    // 			message: '必填',
    // 			trigger: 'blur'
    // 		}]
  },
  {
    type: 'string',
    btn: true,
    key: 'overseaShipper',
    name: '境外发货人',
    prop: 'overseaShipper',
    readonly: true
  },
  {
    type: 'string',
    btn: true,
    key: 'homeShipperName',
    prop: 'homeShipperName',
    readonly: true,
    name: '境内发货人'
  },
  {
    type: 'string',
    key: 'totalAmount',
    name: '报关总金额',
    prop: 'totalAmount',
    // disabled: true
    rules
  },
  {
    type: 'string',
    key: 'pieces',
    name: '件数',
    prop: 'pieces',
    // disabled: true
    rules
  },
  {
    type: 'string',
    key: 'netWeight',
    name: '净重(KG)',
    prop: 'netWeight',
    rules: [
      {
        required: true,
        trigger: 'blur',
        validator: validate.validateNum
      }
    ]
  },
  {
    type: 'string',
    key: 'grossWeight',
    name: '毛重(KG)',
    prop: 'grossWeight',
    rules: [
      {
        required: true,
        message: '必填',
        trigger: 'blur',
        validator: validate.validateNum,
        trigger: ['blur']
      }
    ]
  },
  {
    type: 'string',
    btn: true,
    key: 'busiUnit',
    name: '消费者使用单位',
    prop: 'busiUnit',
    readonly: true
  },
  {
    type: 'string',
    key: 'attachedNo',
    name: '随附单证编号',
    prop: 'attachedNo'
    // disabled: true,
  },
  {
    type: 'string',
    key: 'containerNo',
    name: '集装箱号',
    prop: 'containerNo',
    // disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'creditCode',
    name: '社会信用代号',
    prop: 'creditCode'
  },
  {
    type: 'string',
    key: 'bigContractNo',
    name: '大合同号',
    prop: 'bigContractNo'
  },

  {
    type: 'date',
    key: 'loadingTime',
    name: '计划装车日期',
    prop: 'loadingTime',
    disabled: true
    // rules
  },
  {
    type: 'string',
    key: 'markNo',
    name: '标记唛码',
    prop: 'markNo'
  },
  {
    type: 'string',
    btn: true,
    key: 'storagePlace',
    name: '货物存放地点',
    prop: 'storagePlace',
    readonly: true,
    rules
  },
  {
    type: 'select',
    selectOption: [],
    selectKey: 'has',
    key: 'selfExcited',
    name: '自报自缴',
    prop: 'selfExcited',
    rules
  },
  {
    type: 'textarea',
    key: 'remark',
    name: '备注',
    prop: 'remark',
    layout: 'flex-basis: 98%;height:auto !important'
  },
  {
    type: 'textarea',
    key: 'description',
    name: '说明',
    prop: 'description',
    layout: 'flex-basis: 98%;height:auto !important'
  }
]
