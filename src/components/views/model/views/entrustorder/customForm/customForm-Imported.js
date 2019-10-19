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
        name: "businessUnitName",
        type: "inputbutton",
        label: "经营单位",
        readonly: true,
      },
      {
        name: "declarationUnitName",
        type: "inputbutton",
        label: "申报单位",
        readonly: true,
      },
      {
        name: "contractNo",
        type: "input",
        label: "合同号",
      },
      {
        name: "customerAppointContact",
        type: "switch",
        label: "客户指定合同"
      },
      {
        name: "buyInsurance",
        type: "switch",
        label: "我司购买保险"
      },
      {
        name: "reportAlone",
        type: "switch",
        label: "需单独报关"
      },
      {
        name: "originTariffFree",
        type: "switch",
        label: "原产地减免关税"
      },
      {
        name: "appointBusinessUnit",
        type: "switch",
        label: "指定经营单位"
      },
    ]
  },
  {
    title: "进口",
    items: [
      {
        name: "receiveUnitType",
        type: "select",
        label: "收货单位类型",
        selectapi: "receiveUnitType",
				rules,
      },
      {
        name: "receiveUnitName",
        type: "inputbutton",
        label: "收货单位",
        readonly: true,
				rules,
      },
      {
        name: "importPortName",
        type: "select",
        label: "进口口岸",
        selectapi: "entryPort",
      },
      {
        name: "sellerType",
        type: "select",
        label: "报关卖方类型",
        selectapi: "receiveUnitType",
				rules,
      },
      {
        name: "sellerName",
        type: "inputbutton",
        label: "报关合同卖方",
        readonly: true,
				rules,
      },
    ]
  }
];
