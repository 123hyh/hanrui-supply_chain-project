export default {
  // 商机管理-查询
  querybusinessSearch(data) {
    return this._getData({
      url: '/business/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 商机管理-新增
  addbusinessData(data) {
    return this._getData({
      url: '/business/',
      method: 'POST',
      data
    })
  },
  // 商机管理-修改
  editbusinessData(data) {
    return this._getData({
      url: '/business/',
      method: 'PUT',
      data
    })
  },
  // 商机管理-删除
  deletebusinessData(codeNo) {
    return this._getData({
      url: `/business/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 商机管理-加载编码
  getbusinessCode() {
    return this._getCode('SJGL')
  },
  // 商机管理-获取单条
  searchOnebusinessData(businessNo) {
    return this._getData({
      url: `/business/searchOne?businessNo=${businessNo}`,
      method: 'GET'
    })
  }
}
