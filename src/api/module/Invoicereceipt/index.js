export default {
  // 发票签收单-加载编码
  getinvoicereceiptCode() {
    return this._getCode('FPQS')
  },
  // 发票签收单-查询
  queryinvoicereceiptSearch(data) {
    return this._getData({
      url: '/invoicereceipt/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-发票签收单
  addinvoicereceipt(data) {
    return this._getData({
      url: `/invoicereceipt/`,
      method: 'POST',
      data
    })
  },
  //修改-发票签收单
  updateinvoicereceipt(data) {
    return this._getData({
      url: `/invoicereceipt/`,
      method: 'PUT',
      data
    })
  },
  //删除-发票签收单
  removeinvoicereceipt(code) {
    return this._getData({
      url: `/invoicereceipt/${code}`,
      method: 'DELETE'
    })
  },
  // 发票签收单子表-查询
  queryinvoicereceiptitemSearch(data) {
    return this._getData({
      url: '/invoicereceiptitem/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-发票签收单子表
  addinvoicereceiptitem(data) {
    return this._getData({
      url: `/invoicereceiptitem/`,
      method: 'POST',
      data
    })
  },
  //修改-发票签收单子表
  updateinvoicereceiptitem(data) {
    return this._getData({
      url: `/invoicereceiptitem/`,
      method: 'PUT',
      data
    })
  },

  // 发票签收单子表 - 批量新增
  batchinvoicereceiptitem(data) {
    return this._getData({
      url: '/invoicereceiptitem/insertBatch',
      method: 'POST',
      data
    })
  }
}
