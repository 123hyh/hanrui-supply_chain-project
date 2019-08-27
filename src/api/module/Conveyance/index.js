export default {
  // 运输工具 - 查询列表
  queryconveyanceSearch(data) {
    return this._getData({
      url: '/conveyance/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 运输工具-新增 | 修改
  changeConveyanceData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/conveyance/',
      method,
      data
    })
  },


  // 运输工具-删除
  deleteconveyanceData(codeNo) {
    return this._getData({
      url: '/conveyance/' + codeNo,
      method: 'DELETE'
    })
  },

  // 运输工具-加载编码
  getconveyanceCode() {
    return this._getCode('YSGJ')
  },

  // 运输工具 - 查询单条
  searchOneconveyanceData(codeNo) {
    return this._getData({
      url: `/conveyance/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
