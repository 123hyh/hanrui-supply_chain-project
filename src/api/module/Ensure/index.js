export default {
  // 融资授信担保管理分页查询
  getEnsureManageList(data) {
    return this._getData({
      url: `/ensure/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 担保管理获取新增 编码
  getEnsureCode() {
    return this._getCode('DBGL')
  },
  // 担保管理新增 修改
  changeEnsureData(data = {}, method = 'POST') {
    return this._getData({
      url: `/ensure/`,
      method,
      data
    })
  },
  // 删除担保管理数据
  deleteEnsureData(code) {
    return this._getData({
      url: `/ensure/${code}`,
      method: 'DELETE'
    })
  }
}
