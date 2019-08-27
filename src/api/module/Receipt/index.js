export default {
  // 收款单 - 查询
  queryReceiptSearch(data) {
    return this._getData({
      url: '/receipt/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 获取单条收款单
  getOneReceiptData(billNo) {
    return this._getData({
      url: `/receipt/${billNo}`,
      method: 'GET'
    })
  },
  // 修改 | 新增 收款单
  changeReceiptData({ data = {}, method = 'POST' }) {
    return this._getData({
      url: `/receipt/`,
      method,
      data
    })
  },

  // 收款单 - 删除
  deleteReceiptData(codeNo) {
    return this._getData({
      url: `/receipt/${codeNo}`,
      method: 'DELETE'
    })
  },

  // 收款单 - 加载编码
  getReceiptCode() {
    return this._getCode('SKDX')
  },

  // 收款单 收款信息
  changeReceiptinformationData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/receiptinformation/`,
      method,
      data
    })
  },
  deleteReceiptinformationData(billNo) {
    return this._getData({
      url: `/receiptinformation/${billNo}`,
      method: 'DELETE'
    })
  },

  // 收款单 收款信息 分页查询
  getReceiptinformationPageData(data = {}) {
    return this._getData({
      url: `/receiptinformation/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}
