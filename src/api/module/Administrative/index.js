export default {
  // 关务行政区域代码 - 查询列表
  queryadministrativeSearch(data) {
    return this._getData({
      url: '/administrative/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 关务行政区域代码-新增
  addadministrativeData(data = {}, method = 'POST') {
    return this._getData({
      url: '/administrative/',
      method,
      data
    })
  },
  // 关务行政区域代码-修改
  editadministrativeData(data) {
    return this.addadministrativeData(data, 'PUT')
  },
  // 关务行政区域代码-删除
  deleteadministrativeData(codeNo) {
    return this._getData({
      url: `/administrative/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 关务行政区域代码-加载编码
  getadministrativeCode() {
    return this._getCode('GWXZ')
  },
  // 关务行政区域代码 - 查询单条
  searchOneadministrativeData(codeNo) {
    return this._getData({
      url: `/administrative/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
