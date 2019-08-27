import validate from '@/domain/common/validate'
const rules = validate.setRequired()
export default [
  {
    type: 'string',
    key: 'conveyanceCode',
    name: '运输工具编码',
    prop: 'conveyanceCode',
    disabled: true,
    rules
  },
  {
    type: 'string',
    key: 'conveyanceName',
    name: '名称',
    prop: 'conveyanceName',
    rules
  },
  {
    type: 'string',
    key: 'plateNo',
    name: '大陆车牌',
    prop: 'plateNo',
    rules
  },
  {
    type: 'string',
    key: 'plateNoHk',
    name: '香港车牌',
    prop: 'plateNoHk',
    rules
  },
  {
    type: 'string',
    key: 'phoneNo',
    name: '大陆电话',
    prop: 'phoneNo',
    rules
  },
  {
    type: 'string',
    key: 'phoneNoHk',
    name: '香港电话',
    prop: 'phoneNoHk',
    rules
  },
  {
    type: 'string',
    key: 'bindPhone',
    name: '捆绑电话',
    prop: 'bindPhone'
  },

  {
    type: 'string',
    key: 'fax',
    name: '传真',
    prop: 'fax'
  },
  {
    type: 'string',
    key: 'contact',
    name: '联系人',
    prop: 'contact',
    rules
  },
  {
    type: 'string',
    key: 'truckHead',
    name: '货车牌头',
    prop: 'truckHead',
    rules
  },
  {
    type: 'string',
    key: 'agencyRegistration',
    name: '企业登记代码',
    prop: 'agencyRegistration'
  },
  {
    type: 'string',
    key: 'idCardNo',
    name: '身份证',
    prop: 'idCardNo',
    rules
  },
  {
    type: 'string',
    key: 'homeVisitingCard',
    name: '回乡证',
    prop: 'homeVisitingCard'
  },
  {
    type: 'string',
    key: 'icCardNo',
    name: 'IC卡号码',
    prop: 'icCardNo'
  },
  {
    type: 'string',
    key: 'forbiddenZoneNo',
    name: '禁区纸号码',
    prop: 'forbiddenZoneNo'
  },
  {
    type: 'string',
    key: 'driver',
    name: '司机',
    prop: 'driver'
  },
  {
    type: 'string',
    key: 'carType',
    name: '车型',
    prop: 'carType'
  },
  {
    type: 'string',
    key: 'carrier',
    name: '承运商',
    prop: 'carrier'
  },
  {
    type: 'string',
    key: 'vehicleCustomsCode',
    name: '车辆海关编码',
    prop: 'vehicleCustomsCode'
  },
  {
    type: 'string',
    key: 'driverCustomsCode',
    name: '司机海关编号',
    prop: 'driverCustomsCode'
  },
  {
    type: 'textarea',
    key: 'description',
    name: '描述',
    prop: 'description',
    layout: `flex-basis:100%; height: auto !important`
  }
]
