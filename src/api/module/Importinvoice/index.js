export default {
  // 保存进口发货单主表
  saveImportinvoice(data) {
    return this._getData({
      url: `/importinvoice/`,
      method: 'POST',
      data
    })
  },
  // 修改进口发货单主表
  updateImportinvoice(data) {
    return this._getData({
      url: `/importinvoice/`,
      method: 'PUT',
      data
    })
  },

  // 分页查询进口发货单主表
  queryImportinvoice(data) {
    return this._getData({
      url: `/importinvoice/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条进口发货单主表
  getImportinvoice(billNo) {
    return this._getData({
      url: `/importinvoice/${billNo}`,
      method: 'GET'
    })
  },
  // 删除进口发货单主表
  removeImportinvoice(billNo) {
    return this._getData({
      url: `/importinvoice/${billNo}`,
      method: 'DELETE'
    })
  },

  // 保存进口发货单子表
  saveImportinvoiceitem(data) {
    return this._getData({
      url: `/importinvoiceitem/`,
      method: 'POST',
      data
    })
  },
  // 修改进口发货单子表
  updateImportinvoiceitem(data) {
    return this._getData({
      url: `/importinvoiceitem/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询进口深圳发货通知单子表
  queryImportinvoiceitem(data) {
    return this._getData({
      url: `/importinvoiceitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条进口发货单子表
  getImportinvoiceitem(itemCode) {
    return this._getData({
      url: `/importinvoiceitem/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  // 删除进口发货单子表
  removeImportinvoiceitem(itemCode) {
    return this._getData({
      url: `/importinvoiceitem/${itemCode}`,
      method: 'DELETE'
    })
  }
}
