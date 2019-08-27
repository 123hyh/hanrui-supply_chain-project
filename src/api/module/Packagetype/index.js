export default {
  // 包装种类分页查询
  getPackageTypeList(data) {
    return this._getData({
      url: `/packagetype/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //包装种类获取编码
  getPackageTypeCode() {
    return this._getData({
      url: `/packagetype/packageTypeCode`,
      method: 'GET'
    })
  },
  // 包装种类新增 修改
  changePackageTypeData(data = {}, method = 'POST') {
    return this._getData({
      url: `/packagetype/`,
      method,
      data
    })
  },
  // 删除包装种类数据
  deletePackageTypeData(code) {
    return this._getData({
      url: `/packagetype/${code}`,
      method: 'DELETE'
    })
  },
  //分页查询包装种类
  querypackagetypeSearch(data) {
    return this._getData({
      url: `/packagetype/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}
