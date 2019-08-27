export default {
  // 付款申请单加载编码
  getpayapplyCode() {
    return this._getCode('FKSQ')
  },
  // 付款申请单查询
  querypayapplySearch(data) {
    return this._getData({
      url: '/payapply/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加付款申请单
  addpayapply(data) {
    return this._getData({
      url: `/payapply/`,
      method: 'POST',
      data
    })
  },
  //修改付款申请单
  updatepayapply(data) {
    return this._getData({
      url: `/payapply/`,
      method: 'PUT',
      data
    })
  },
  //删除付款申请单
  removepayapply(code) {
    return this._getData({
      url: `/payapply/${code}`,
      method: 'DELETE'
    })
  },
  // 受托方付款查询
  queryentrusttrusteepanymentSearch(data) {
    return this._getData({
      url: '/entrusttrusteepanyment/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 付款申请单子表查询
  querypayapplydetailSearch(data) {
    return this._getData({
      url: '/payapplydetail/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加付款申请单子表
  addpayapplydetail(data) {
    return this._getData({
      url: `/payapplydetail/`,
      method: 'POST',
      data
    })
  },
  //修改付款申请单子表
  updatepayapplydetail(data) {
    return this._getData({
      url: `/payapplydetail/`,
      method: 'PUT',
      data
    })
  },
  //删除付款申请单子表
  removepayapplydetail(code) {
    return this._getData({
      url: `/payapplydetail/${code}`,
      method: 'DELETE'
    })
  },
  // 付款申请单子表 - 批量新增
  batchpayapplydetailData(data) {
    return this._getData({
      url: '/payapplydetail/insertBatch',
      method: 'POST',
      data
    })
  },
  //删除付款申请单子表
  removeinvoicereceiptitem(code) {
    return this._getData({
      url: `/invoicereceiptitem/${code}`,
      method: 'DELETE'
    })
  }
}
