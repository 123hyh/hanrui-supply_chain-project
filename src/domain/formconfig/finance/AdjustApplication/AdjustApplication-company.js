export default {
  list: [
    {
      type: 'string',
      key: 'oldCompanyName',/* oldCompany */
      prop: 'oldCompanyName',
      name: '公司',
      readonly: true,
      group: '1'
    },
    {
      type: 'string',
      key: 'oldCustomerName',/*  oldCustomer*/
      prop: 'oldCustomerName',
      name: '客户',
      readonly: true,
      group: '1'

    },
    {
      type: 'string',
      key: 'oldClientName',/* oldClient */
      prop: 'oldClientName',
      readonly: true,
      name: '委托方',
      group: '1'

    },
    {
      type: 'string',
      key: 'oldCurrencyName',
      prop: 'oldCurrencyName',
      readonly: true,
      name: '币别',
      group: '1'
    },
    {
      type: 'string',
      btn: true,
      key: 'companyName',/*company  */
      prop: 'companyName',
      name: '公司',
      group: '2'
    },
    {
      type: 'select',
      selectKey: 'settlementUnitType',
      selectOption: [],
      key: 'settlementUnitType',
      prop: 'settlementUnitType',
      name: '结算单位类型',
      group: '2'

    },
    {
      type: 'string',/* settlementUnit */
      btn: true,
      key: 'settlementUnitName',
      prop: 'settlementUnitName',
      name: '结算单位',
      group: '2'

    },
    {
      type: 'string',/* client */
      btn: true,
      key: 'clientName',
      prop: 'clientName',
      name: '委托方',
      group: '2'

    },
    {
      type: 'select',
      selectKey: 'currencyName',
      key: 'currency',
      selectOption: [],
      name: '币别',
      group: '2'

    }
  ],
  otherConfig: {
    title: {
      '1': {
        visible: true,
        text: 'old 公司'
      },
      '2': {
        visible: true,
        text: 'new 公司'
      }
    }

  }
}