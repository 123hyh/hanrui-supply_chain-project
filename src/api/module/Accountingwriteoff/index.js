export default {
  
  // 账务核销单-加载编码
  getaccountingwriteoffCode() {
  
    return this._getCode('ZWHX')
  },
  // 账务核销单-查询
  queryaccountingwriteoffSearch(data) {
    return this._getData(  {
      url: '/accountingwriteoff/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-账务核销单
  addaccountingwriteoff(data) {
    return this._getData({
      url: `/accountingwriteoff/`,
      method: 'POST',
      data
    })
  },
  //修改-账务核销单
  updateaccountingwriteoff(data) {
    return this._getData({
      url: `/accountingwriteoff/`,
      method: 'PUT',
      data
    } )
  },
  //删除-账务核销单
  removeaccountingwriteoff(code) {
    return this._getData({
      url: `/accountingwriteoff/${code}`,
      method: 'DELETE'
    } )
  },
}
