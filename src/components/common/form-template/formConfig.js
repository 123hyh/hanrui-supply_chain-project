export default {
  list: [{
      type: 'string',
      key: "arrivalCountryCode",
      name: "编码",
      prop: "arrivalCountryCode",
      group: 1,
      order: 0
    },
    {
      type: 'string',
      key: "arrivalCountryName",
      name: "名称",
      prop: "arrivalCountryName",
      group: 1,
      order: 2

    },
    {
      type: 'string',
      key: "arrivalCountryAbb",
      name: "简称",
      prop: "arrivalCountryAbb",
      group: 1,
      order: 3


    },
    {
      type: 'string',
      key: "customsCode",
      name: "对应海关编码",
      prop: "customsCode",
      group: 1,
      order: 4


    },
    {
      type: 'string',
      key: "description",
      name: "描述",
      prop: "description",
      group: 1,
      order: 5,
      rules: [{
        required: true,
        message: "必填",
        trigger: ['blur']
      }]

    },
    {
      type: "string",
      key: "billCode",
      name: "编码",
      prop: "billCode",
      disabled: true,
      group: 2,
      order: 1
    },
    {
      type: "string",
      key: "warehouseQuotionName",
      name: "名称",
      prop: "warehouseQuotionName",
      group: 2,
      order: 2
    },
    {
      type: "string",
      key: "companyName",
      name: "公司",
      prop: "companyName",
      btn: true,
      readonly: true,
      group: 2,
      order: 3

    },
    {
      type: "string",
      key: "clientName",
      name: "委托方",
      prop: "clientName",
      btn: true,
      readonly: true,
      group: 2,
      order: 4
    },
    {
      type: "select",
      selectOption: [{
        itemValue: '美元',
        itemKey: '1'
      }],
      selectKey: "currencyName",
      key: "currency",
      name: "币种",
      prop: "currency",
      group: 2,
      order: 5,
      rules: [{
        required: true,
        message: "必填",
        trigger: ['blur']
      }]
    },
    {
      type: "string",
      key: "warehouseName",
      name: "仓库",
      prop: "warehouseName",
      btn: true,
      readonly: true,
      group: 3,
      order: 1
    },
    {
      type: "string",
      key: "calcuMethod",
      name: "仓储费计算方式",
      prop: "calcuMethod",
      group: 3,
      order: 2,
      rules: [{
        required: true,
        message: "必填",
        trigger: ['blur']
      }]
    },
    {
      type: "textarea",
      key: "remark",
      name: "备注",
      prop: "remark",
      group: 3,
      order: 3
    },
    {
      type: 'number',
      key: 'count',
      name: '个数',
      prop: 'count',
      group: 3,
      order: 4,
    },
    {
      type: 'number',
      key: 'price',
      name: '个数',
      prop: 'price',
      group: 3,
      order: 5,
    },
    {
      type: 'calculate',
      key: 'total',
      name: '总计',
      prop: 'total',
      group: 3,
      order: 6,
      readonly: true
    },

  ],
  otherConfig: {
    title: {
      1: {
        text: '委托方',
        visible: false
      },
      2: {
        text: '承运商',
        visible: true
      },
      3: {
        text: '供应商',
        visible: true
      }
    }
  }
}