export default {
  // 仓库使用授权 - 查询列表
  querywarehouseauthorizationSearch(data) {
    return this._getData({
      url: '/warehouseauthorization/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 仓库使用授权-新增 || 修改
  changeWarehouseauthorizationData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/warehouseauthorization/',
      method: 'POST',
      data
    })
  },
 

  // 仓库使用授权-删除
  deletewarehouseauthorizationData(codeNo) {
    return this._getData({
      url: '/warehouseauthorization/' + codeNo,
      method: 'DELETE'
    })
  },

  // 仓库使用授权-加载编码
  getwarehouseauthorizationCode() {
    return this._getCode('CKSQ')
  },

  // 仓库使用授权 - 查询单条
  searchOnewarehouseauthorizationData(codeNo) {
    return this._getData({
      url: `/warehouseauthorization/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
