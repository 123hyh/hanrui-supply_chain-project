let rules = {
  required: true,
  message: "不能为空",
  trigger: ['blur', 'change']
};
export default [
  {
    nonetitle: true,
    items: [
      {
        name: "hsCode",
        type: "input",
        label: "商品编码",
        disabled: true,
      },
      {
        name: "goodsName",
        type: "input",
        label: "商品名称",
        disabled: true,
      },
      {
        name: "declareFactor",
        type: "input",
        label: "申报要素",
        disabled: true,
      },
      {
        name: "unitOne",
        type: "input",
        label: "法定第一单位",
        disabled: true,
      },
      {
        name: "unitTwo",
        type: "input",
        label: "法定第二单位",
        disabled: true,
      },
      {
        name: "mostFavoredNationTaxRate",
        type: "input",
        label: "最惠国进口税率(%)",
        disabled: true,
      },
      {
        name: "generalTaxRate",
        type: "input",
        label: "普通进口税率(%)",
        disabled: true,
      },
      {
        name: "tempTaxRate",
        type: "input",
        label: "暂定进口税率(%)",
        disabled: true,
      },
      {
        name: "consumeTaxRate",
        type: "input",
        label: "消费税率(%)",
        disabled: true,
      },
      {
        name: "exportTaxRate",
        type: "input",
        label: "出口关税率(%)",
        disabled: true,
      },
      {
        name: "exportReturnTaxRate",
        type: "input",
        label: "出口退税率(%)",
        disabled: true,
      },
      {
        name: "vatTaxRate",
        type: "input",
        label: "增值税率(%)",
        disabled: true,
      },
      {
        name: "customsSupervisionCondition",
        type: "input",
        label: "海关监管条件",
        disabled: true,
      },
      {
        name: "inspectionType",
        type: "input",
        label: "检验检疫类别",
        disabled: true,
      },
      {
        name: "goodsDescription",
        type: "input",
        label: "商品描述",
        disabled: true,
      },
    ]
  }
];
