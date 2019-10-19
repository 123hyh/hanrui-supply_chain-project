// const Mock = require('mockjs')
export default {
  getTablePageData(data) {
    var arr = []
    var i = 0
    while (i++ < 10) {
      arr.push({
        itemCode: i,
        entrustOrderNo: (i + 1) % 2,
        businessType: Math.floor(Math.random() * 10) % 2,
        status: i % 2,
        invoiceNo: 4,
        openInvoiceTime: 5,
        purchaseUnit: i % 2,
        openInvoiceDetail: 7,
        oughtInvoiceMoney: 8,
        alreadyOpenMoney: 9,
        thisOpenMoney: 10
      })
    }
    return { list: arr, count: 100 }

    /* return this._getData({
      url: ``,
      method: 'POST',
      data: this._handlePage(data)
    }) */
  }
}
