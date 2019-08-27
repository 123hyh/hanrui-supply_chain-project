export default {
  // 获取事务类型list
  getTransactionTypeList(data) {
    return this.querytransactiontypeSearch(data)
  },

  // 事务类型 - 查询列表
  querytransactiontypeSearch(data) {
    return this._getData({
      url: '/transactiontype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 事务类型-新增 || 修改
  changeTransactiontypeData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/transactiontype/',
      method,
      data
    })
  },

  // 事务类型-删除
  deletetransactiontypeData(codeNo) {
    return this._getData({
      url: '/transactiontype/' + codeNo,
      method: 'DELETE'
    })
  },

  // 事务类型-加载编码
  gettransactiontypeCode() {
    return this._getCode('SWLX')
  },

  // 事务类型 - 查询单条
  searchOnetransactiontypeData(codeNo) {
    return this._getData({
      url: `/transactiontype/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
