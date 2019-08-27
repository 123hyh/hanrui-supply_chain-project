export default {
  // 委托订单-查询
  queryentrustorderSearch(data) {
    return this._getData({
      url: '/entrustorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 委托订单-新增
  addentrustorderData(data = {}) {
    return this._getData({
      url: '/entrustorder/',
      method: 'POST',
      data
    })
  },
  // 委托订单-修改
  editentrustorderData(data) {
    return this._getData({
      url: '/entrustorder/',
      method: 'PUT',
      data
    })
  },
  // 委托订单-删除
  deleteentrustorderData(codeNo) {
    return this._getData({
      url: '/entrustorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 委托订单-加载编码
  getentrustorderCode() {
    return this._getCode('WTDD')
  },
  // 委托订单-获取单条
  searchOneentrustorderData(code) {
    return this._getData({
      url: `/entrustorder/${code}`,
      method: 'GET'
    })
  },

  // 委托订单-报关信息-新增
  addentrustcustomData(data) {
    return this._getData({
      url: '/entrustcustom/',
      method: 'POST',
      data
    })
  },

  // // 委托订单-报关信息-查询
  getEntrustcustom(code) {
    return this._getData({
      url: `/entrustcustom/${code}`,
      method: 'GET'
    })
  },
  
  // 委托订单 商品信息 分页查询
  getEntrustGoods(data) {
    return this._getData({
      url: `/entrustgoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
}
