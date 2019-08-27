export default {
  // 委托单类型 - 查询列表
  queryentrustordertypeSearch(data) {
    return this._getData({
      url: '/entrustordertype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 委托单类型-新增
  addentrustordertypeData(data) {
    return this._getData({
      url: '/entrustordertype/',
      method: 'POST',
      data
    })
  },
  // 委托单类型-修改
  editentrustordertypeData(data) {
    return this._getData({
      url: '/entrustordertype/',
      method: 'PUT',
      data
    })
  },
  // 委托单类型-删除
  deleteentrustordertypeData(codeNo) {
    return this._getData({
      url: '/entrustordertype/' + codeNo,
      method: 'DELETE'
    })
  },
  // 委托单类型-加载编码
  getentrustordertypeCode() {
    return this._getCode('WTLX')
  },
  // 委托单类型 - 查询单条
  searchOneentrustordertypeData(codeNo) {
    return this._getData({
      url: `/entrustordertype/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
