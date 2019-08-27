export default {
  // 交货区域 - 分页查询
  getAreaData(data) {
    return this._getData({
      url: '/deliveryarea/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 交货区域 - 查询列表
  querydeliveryareaSearch(data) {
    return this.getAreaData(data)
  },
  // 交货区域-新增
  adddeliveryareaData(data) {
    return this._getData({
      url: '/deliveryarea/',
      method: 'POST',
      data
    })
  },
  // 交货区域-修改
  editdeliveryareaData(data) {
    return this._getData({
      url: '/deliveryarea/',
      method: 'PUT',
      data
    })
  },
  // 交货区域-删除
  deletedeliveryareaData(codeNo) {
    return this._getData({
      url: '/deliveryarea/' + codeNo,
      method: 'DELETE'
    })
  },
  // 交货区域-加载编码
  getdeliveryareaCode() {
    return this._getCode('JHQY')
  },
  // 交货区域 - 查询单条
  searchOnedeliveryareaData(deliveryAreaCode) {
    return this._getData({
      url: `/deliveryarea/searchOne/${deliveryAreaCode}`,
      method: 'GET'
    })
  }
}
