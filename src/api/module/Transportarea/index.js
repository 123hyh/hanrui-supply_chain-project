export default {
  // 物流仓储运输区域 - 查询列表
  querytransportareaSearch(data) {
    return this._getData({
      url: '/transportarea/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 物流仓储运输区域-新增 | 修改
  changeTransportareaData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/transportarea/',
      method,
      data
    })
  },



  // 物流仓储运输区域-删除
  deletetransportareaData(codeNo) {
    return this._getData({
      url: `/transportarea/${codeNo}`,
      method: 'DELETE'
    })
  },

  // 物流仓储运输区域-加载编码
  gettransportareaCode() {
    return this._getCode('WLQY')
  },

  // 物流仓储运输区域 - 查询单条
  searchOnetransportareaData(codeNo) {
    return this._getData({
      url: `/transportarea/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
