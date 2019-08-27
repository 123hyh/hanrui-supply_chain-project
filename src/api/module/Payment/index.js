export default {
  // 付款单 - 加载编码
  getpaymentCode() {
    return this._getCode('FKDX')
  },
  // 付款单 - 查询
  querypaymentSearch(data) {
    return this._getData({
      url: '/payment/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 付款单 - 新增
  addpaymentData(data) {
    return this._getData({
      url: '/payment/',
      method: 'POST',
      data
    })
  },
  // 付款单 - 修改
  editpaymentData(data) {
    return this._getData({
      url: '/payment/',
      method: 'PUT',
      data
    })
  },
  // 付款单 - 删除
  deletepaymentData(codeNo) {
    return this._getData({
      url: '/payment/' + codeNo,
      method: 'DELETE'
    })
  },
  // 付款单子表-查询
  querypaymentdetailSearch(data) {
    return this._getData({
      url: '/paymentdetail/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-付款单子表
  addpaymentdetail(data) {
    return this._getData({
      url: `/paymentdetail/`,
      method: 'POST',
      data
    })
  },
  //修改-付款单子表
  updatepaymentdetail(data) {
    return this._getData({
      url: `/paymentdetail/`,
      method: 'PUT',
      data
    })
  },
  //删除-付款单子表
  removepaymentdetail(code) {
    return this._getData({
      url: `/paymentdetail/${code}`,
      method: 'DELETE'
    })
  },
  // 付款单子表 - 批量新增
  batchpaymentdetailData(data) {
    return this._getData({
      url: '/paymentdetail/insertBatch',
      method: 'POST',
      data
    })
  }
}
