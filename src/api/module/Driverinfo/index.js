export default {
  // 物流仓储司机 - 查询列表
  querydriverinfoSearch(data) {
    return this._getData({
      url: '/driverinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 物流仓储司机-新增 | 修改
  changeDriverinfo({ data, method = 'POST' } = {}) {
    return this._getData({
      url: `/driverinfo/`,
      method,
      data
    })
  },

  // 物流仓储司机-删除
  deletedriverinfoData(codeNo) {
    return this._getData({
      url: '/driverinfo/' + codeNo,
      method: 'DELETE'
    })
  },

  // 物流仓储司机-加载编码
  getdriverinfoCode() {
    return this._getCode('WLSJ')
  },

  // 物流仓储司机 - 查询单条
  searchOnedriverinfoData(codeNo) {
    return this._getData({
      url: `/driverinfo/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
