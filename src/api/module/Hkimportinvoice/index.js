export default {
  // 保存香港进口发货单主表
  saveHkimportinvoice(data) {
    return this._getData({
      url: `/hkimportinvoice/`,
      method: 'POST',
      data
    })
  },
  // 修改香港进口发货单主表
  updateHkimportinvoice(data) {
    return this._getData({
      url: `/hkimportinvoice/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询香港进口发货单主表
  queryHkimportinvoice(data) {
    return this._getData({
      url: `/hkimportinvoice/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条香港进口发货单主表
  getHkimportinvoice(billNo) {
    return this._getData({
      url: `/hkimportinvoice/searchOne?billNo=${billNo}`,
      method: 'GET'
    })
  },
  // 删除香港进口发货单主表
  removeHkimportinvoice(billNo) {
    return this._getData({
      url: `/hkimportinvoice/${billNo}`,
      method: 'DELETE'
    })
  },

  // 保存香港进口发货单子表
  saveHkimportinvoiceitem(data) {
    return this._getData({
      url: `/hkimportinvoiceitem/`,
      method: 'POST',
      data
    })
  },
  // 修改香港进口发货单子表
  updateHkimportinvoiceitem(data) {
    return this._getData({
      url: `/hkimportinvoiceitem/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询香港进口发货单子表
  queryHkimportinvoiceitem(data) {
    return this._getData({
      url: `/hkimportinvoiceitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条香港进口发货单子表
  getHkimportinvoiceitem(itemCode) {
    return this._getData({
      url: `/hkimportinvoiceitem/searchOne/${itemCode}`,
      method: 'GET'
    })
  },
  // 删除香港进口发货单子表
  removeHkimportinvoiceitem(itemCode) {
    return this._getData({
      url: `/hkimportinvoiceitem/${itemCode}`,
      method: 'DELETE'
    })
  }
}
