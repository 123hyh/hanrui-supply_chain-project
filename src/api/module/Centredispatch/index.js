export default {
  // 集中调度单-获取单条
  searchCentreDispatchData(centreDispatchCode) {
    return this._getData({
      url: '/centredispatch/searchOne?centreDispatchCode=' + centreDispatchCode,
      method: 'GET'
    })
  },
  // 集中调度单-查询
  querycentredispatchSearch(data) {
    return this._getData({
      url: '/centredispatch/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 集中调度单-新增
  addcentredispatchData(data) {
    return this._getData({
      url: '/centredispatch/',
      method: 'POST',
      data
    })
  },
  // 集中调度单-修改
  editcentredispatchData(data) {
    return this._getData({
      url: '/centredispatch/',
      method: 'PUT',
      data
    })
  },
  // 集中调度单-删除
  deletecentredispatchData(codeNo) {
    return this._getData({
      url: '/centredispatch/' + codeNo,
      method: 'DELETE'
    })
  },
  // 集中调度单-获取编号
  getcentredispatchCode() {
    return this._getCode('JZDD')
  },
  // 集中调度单子表 收货信息-获取编号
  getcentreReceiveCode(codeNo) {
    return this._getCode('JZSH')
  }
}
