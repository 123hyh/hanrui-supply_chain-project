export default {
  // 物流仓储车型 - 查询列表
  querycartypeSearch(data) {
    return this._getData({
      url: '/cartype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  
  // 物流仓储车型-新增 | 修改
  changeCartypeData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/cartype/',
      method,
      data
    })
  },

  // 物流仓储车型-删除
  deletecartypeData(codeNo) {
    return this._getData({
      url: '/cartype/' + codeNo,
      method: 'DELETE'
    })
  },
  // 物流仓储车型-加载编码
  getcartypeCode() {
    return this._getCode('WLCX')
  },
  // 物流仓储车型 - 查询单条
  searchOnecartypeData(codeNo) {
    return this._getData({
      url: `/cartype/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
