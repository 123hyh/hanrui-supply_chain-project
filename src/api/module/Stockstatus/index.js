export default {
  // 库存状态 - 查询列表
  querystockstatusSearch(data) {
    return this._getData({
      url: '/stockstatus/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 库存状态-新增
  changeStockstatusData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/stockstatus/',
      method,
      data
    })
  },

  // 库存状态-删除
  deletestockstatusData(codeNo) {
    return this._getData({
      url: '/stockstatus/' + codeNo,
      method: 'DELETE'
    })
  },

  // 库存状态-加载编码
  getstockstatusCode() {
    return this._getCode('KCZT')
  },

  // 库存状态 - 查询单条
  searchOnestockstatusData(codeNo) {
    return this._getData({
      url: `/stockstatus/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
