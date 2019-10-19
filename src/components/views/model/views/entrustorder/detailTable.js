export default {
  api: "entrustdetail",
  items: [
    {
      prop: 'itemCode',
      label: '表业务主键编号',
      width: '180',
    },
    {
      prop: 'billNo',
      label: '单据编号',
    },
    {
      prop: 'entrustOrderNo',
      label: '委托订单号',
    },
    {
      prop: 'dispatchOrganizationCode',
      label: '发运组织编码',
    },
    {
      prop: 'dispatchOrganizationName',
      label: '发运组织名称',
    },
    {
      prop: 'pickUpMode',
      label: '接(提)货方式',
    },
    {
      prop: 'deliverDate',
      label: '要求发货日期',
    },
    {
      prop: 'arrivalDate',
      label: '要求到货日期',
    },
    {
      prop: 'receiveContactPerson',
      label: '收货联系人',
    },
    {
      prop: 'contactTel',
      label: '联系电话',
    },
    {
      prop: 'receiveAddress',
      label: '收货地址',
    },
    {
      prop: 'status',
      label: '状态',
    },
  ]
};
