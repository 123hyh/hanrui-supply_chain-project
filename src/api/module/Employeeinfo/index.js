export default {
  // 员工档案 - 查询列表
  queryemployeeinfoSearch(data) {
    return this._getData({
      url: '/employeeinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 员工档案-新增
  addemployeeinfoData(data) {
    return this._getData({
      url: '/employeeinfo/',
      method: 'POST',
      data
    })
  },
  // 员工档案-修改
  editemployeeinfoData(data) {
    return this._getData({
      url: '/employeeinfo/',
      method: 'PUT',
      data
    })
  },
  // 员工档案-删除
  deleteemployeeinfoData(codeNo) {
    return this._getData({
      url: '/employeeinfo/' + codeNo,
      method: 'DELETE'
    })
  },
  // 员工档案-加载编码
  getemployeeinfoCode() {
    return this._getCode('YGDA')
  },
  // 员工档案 - 查询单条
  searchOneemployeeinfoData(codeNo) {
    return this._getData({
      url: `/employeeinfo/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
