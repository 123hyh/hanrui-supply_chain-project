export default {
  // 运输时效 - 分页查询
  getTimeLimitData(data) {
    return this._getData({
      url: '/transporttime/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 物流运输时效 - 查询列表
  querytransporttimeSearch(data) {
    return this._getData({
      url: '/transporttime/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 物流运输时效-新增 | 修改
  changeTransporttimeData({ data, method = 'POST' }) {
    return this._getData({
      url: `/transporttime/`,
      method,
      data
    })
  },
  

  // 物流运输时效-删除
  deletetransporttimeData(codeNo) {
    return this._getData({
      url: '/transporttime/' + codeNo,
      method: 'DELETE'
    })
  },

  // 物流运输时效-加载编码
  gettransporttimeCode() {
    return this._getCode('WLSX')
  },

  // 物流运输时效 - 查询单条
  searchOnetransporttimeData(codeNo) {
    return this._getData({
      url: `/transporttime/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
