import validate from '@/domain/common/validate'
const rules = validate.setRequired();
export default [
  {
    type: 'string',
    key: "distributionTrainCode",
    name: "配送车次编号",
    prop: "distributionTrainCode",
    readonly: true
  },
  {
    type: 'string',
    key: "deliveryTrain",
    name: "配送车次",
    prop: "deliveryTrain",
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    btn: true,
    type: 'string',
    key: "deliveryLine",
    name: "配送线路",
    prop: "deliveryLine",
    readonly: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    type: 'checkbox',
    key: "hasOutVehicles",
    name: "外请车辆",
    prop: "hasOutVehicles"
  },
  {
    btn: true,
    type: 'string',
    key: "carrier",
    name: "承运方",
    prop: "carrier",
    readonly: true,
  },
  {
    btn: true,
    type: 'string',
    key: "plateNo",
    name: "车牌号",
    prop: "plateNo",
    readonly: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    btn: true,
    type: 'string',
    key: "driver",
    name: "司机",
    prop: "driver",
    readonly: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    type: 'string',
    key: "telePhone",
    name: "联系电话",
    prop: "telePhone",
    disabled: true,
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    type: 'date',
    key: "outcarTime",
    name: "计划出车时间",
    prop: "outcarTime",
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: "deliveryTime",
    key: "timeSlot",
    name: "时段选择",
    prop: "timeSlot",
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    type: 'string',
    key: "loadWeight",
    name: "载重(kg)",
    prop: "loadWeight",
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      },
      {
        validator: validate.validateNum,
        trigger: ['blur']
      }]
  },

  {
    type: 'string',
    key: "packageNo",
    name: "可载件数",
    prop: "packageNo",
    rules: [{
      required: true, message: '必填', trigger: 'blur',
      validator: validate.validateNum,
      trigger: ['blur']
    }]
  },
  {
    selectOption: [],
    type: 'select',
    selectKey: "feePlan",
    key: "chargingScheme",
    name: "计费方案",
    prop: "chargingScheme",
    rules: [
      {
        required: true,
        message: '必填',
        trigger: ['blur']
      }]
  },
  {
    type: 'checkbox',
    key: "hasCutOrder",
    name: "已截单",
    prop: "hasCutOrder"
  },
  {
    type: 'checkbox',
    key: "hasOutStock",
    name: "已出库",
    prop: "hasOutStock"
  },
  {
    type: 'date',
    key: "outStockTime",
    name: "出库时间",
    prop: "outStockTime"
  }, {
    btn: true,
    type: 'string',
    key: "shopper",
    name: "配送员",
    prop: "shopper",
    readonly: true,
    rules
  },
  {
    type: 'string',
    key: "receiver",
    name: "签收人",
    prop: "receiver",
    readonly: true,
    disabled: true
  },
  {
    type: 'textarea',
    key: "remark",
    name: "备注",
    prop: "remark"
  }
]