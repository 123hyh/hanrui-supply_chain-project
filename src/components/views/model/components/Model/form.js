let rules = {
  required: true,
  message: "不能为空",
  trigger: ['blur', 'change']
};
export default [
  {
    none: false,
    disab: false,
    nonetitle: false,
    title: "基础",
    text: false,
    items: [
      {
        none: false,
        disab: false,
        disabled: false,
        readonly: false,
        name: "input",
        type: "input",
        label: "输入框",
        rules
      },
      {
        name: "inputbutton",
        type: "inputbutton",
        label: "点选框",
        rules
      },
      {
        name: "inputselect",
        type: "inputselect",
        label: "下拉输入框",
        selsect: "inputselectSelect",
        selectapi: "entrustOrderTypeG"
      },
      {
        name: "date",
        type: "date",
        label: "日期框"
      },
      {
        name: "select",
        type: "select",
        label: "下拉框",
        selectapi: "entrustOrderTypeG"
      },
      {
        name: "switch",
        type: "switch",
        label: "布尔框"
      },
      {
        name: "radio",
        type: "radio",
        label: "单选框"
      },
      {
        name: "checkbox",
        type: "checkbox",
        label: "多选框"
      }
    ]
  },
  {
    title: "拓展",
    items: [
      {
        name: "num",
        type: "num",
        label: "数字框",
        decimal:4,
        disabled: true,
      },
      {
        name: "numbutton",
        type: "numbutton",
        label: "数字点选框",
        disabled: true,
      },
      {
        type: "numselect",
        label: "下拉数字框",
        name: "numselect",
        decimal:4,
        disabled: true,
        selsect: "numselectSelect",
        selectapi: "entrustOrderTypeG",
        selsectDisabled:true,
        long: true
      },
      {
        name: "money",
        type: "money",
        label: "金额框",
        decimal:2,
        symbol:'￥',
        disabled: true,
      },
      {
        name: "moneybutton",
        type: "moneybutton",
        label: "金额点选框",
        disabled: true,
      },
      {
        selsect: "moneyselectSelect",
        type: "moneyselect",
        label: "下拉金额框",
        name: "moneyselect",
        decimal:2,
        symbol:'￥',
        disabled: true,
        selsect:'customTotalAmountcurrency',
        selectapi: "entrustOrderTypeG",
        selsectDisabled:true,
        long: true
      },
      {
        name: "percent",
        type: "percent",
        label: "百分比框"
      },
      {
        name: "percentbutton",
        type: "percentbutton",
        label: "百分比点选框",
        disabled: true,
      },
      {
        name: "percentselect",
        selsect: "percentselectSelect",
        type: "percentselect",
        label: "下拉百分比框",
        selectapi: "entrustOrderTypeG"
      }
    ]
  }
];
