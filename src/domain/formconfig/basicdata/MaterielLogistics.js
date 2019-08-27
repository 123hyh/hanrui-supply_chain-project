import validate from "@/domain/common/validate.js";
const rules = validate.setRequired();
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
      key: "materielLogisticsCode",
      name: "物料物流编码",
      prop: "materielLogisticsCode"
    }, */
  {
    btn: true,
    readonly: true,
    type: 'string',
    key: "lengthUnitName",
    name: "长度单位",
    prop: "lengthUnit"
  },
  {
    type: 'string',
    key: "length",
    name: "长度",
    prop: "length",
    rules
  },
  {
    type: 'string',
    key: "width",
    name: "宽度",
    prop: "width",
    rules
  },
  {
    type: 'string',
    key: "height",
    name: "高度",
    prop: "height",
    rules
  },
  {
    btn: true,
    readonly: true,
    type: 'string',
    key: "weightUnitName",
    name: "重量单位",
    prop: "weightUnit"
  },
  {
    type: 'number',
    key: "grossWeight",
    name: "毛重",
    prop: "grossWeight",
    rules
  },
  {
    type: 'number',
    key: "netWeight",
    name: "净重",
    prop: "netWeight",
    rules
  },
  {
    btn: true,
    readonly: true,
    type: 'string',
    key: "volumeUnitName",
    name: "体积单位",
    prop: "volumeUnit"
  },
  {
    type: 'string',
    key: "volume",
    name: "体积",
    prop: "volume",
    rules
  }
]