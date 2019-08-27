import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
export default [
  {
    type: 'string',
    key: "shippingBillCode",
    name: "关务舱单编码",
    prop: "shippingBillCode",
    readonly: true,
		rules
  },
  {
    type: 'string',
    key: "deliveryCode",
    name: "提运单号",
    prop: "deliveryCode",
    readonly: true,
    btn: true
  },
  // {
  // 	type: 'string',
  // 	key: "targetUnit",
  // 	name: "车次",
  // 	prop: "targetUnit",
  // 	readonly: true,
  // 	btn: true
  // },
  {
    type: 'string',
    key: "targetUnitName",
    name: "车次",
    prop: "targetUnitName",
    readonly: true,
    btn: true
  },
  {
    selectOption: [],
    type: 'select',
    key: 'customsType',
    selectKey: "declareCustoms",
    name: "报关类型",
    prop: "customsType"
  },
  {
    selectOption: [],
    type: 'select',
    key: 'sendCustoms',
    selectKey: "has",
    name: "已发海关",
    prop: "sendCustoms"
  },
  {
    type: 'string',
    key: "sendPerson",
    name: "发送人",
    prop: "sendPerson"
  },
  {
    type: 'date',
    key: "sendTime",
    name: "发送时间",
    prop: "sendTime"
  },
  {
    type: 'string',
    key: "remark",
    name: "备注",
    prop: "remark"
  }
]