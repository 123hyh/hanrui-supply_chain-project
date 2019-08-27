export default {
  // 仓库状态 - 查询列表
  querywarehousestatusSearch(data) {
    return this._getData({
      url: '/warehousestatus/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  
  // 仓库状态-新增 | 修改

  changeWarehousestatusData({ data, method = 'POST' }) {
    return this._getData({
      url: `/warehousestatus/`,
      method,
      data
    })
  },

  // 仓库状态-删除
  deletewarehousestatusData(codeNo) {
    return this._getData({
      url: `/warehousestatus/${codeNo}`,
      method: 'DELETE'
    })
  },

  // 仓库状态-加载编码
  getwarehousestatusCode() {
    return this._getCode('CKZT')
  },

  // 仓库状态 - 查询单条
  searchOnewarehousestatusData(codeNo) {
    return this._getData({
      url: `/warehousestatus/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
