export default {
  // 仓库信息表
  getWarehouseList(data) {
    return this.querywarehouseSearch(data)
  },
  // 仓库信息 - 查询列表
  querywarehouseSearch(data) {
    return this._getData({
      url: '/warehouse/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 仓库信息-新增
  addwarehouseData(data = {}, method = 'POST') {
    return this._getData({
      url: '/warehouse/',
      method,
      data
    })
  },
  // 仓库信息-修改
  editwarehouseData(params) {
    return this.addwarehouseData(params, 'PUT')
  },
  // 仓库信息-删除
  deletewarehouseData(codeNo) {
    return this._getData({
      url: `/warehouse/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 仓库信息-加载编码
  getwarehouseCode() {
    return this._getCode('CKXX')
  },
  // 仓库信息 - 查询单条
  searchOnewarehouseData(codeNo) {
    return this._getData({
      url: `/warehouse/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
