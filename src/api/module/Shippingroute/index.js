export default {
  // 发运路线 - 分页查询
  getDispatchLineData(data) {
    return this._getData({
      url: '/shippingroute/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //发运路线获取编码
  getShippingRouteCode() {
    return this._getData({
      url: `/shippingroute/shippingRouteCode`,
      method: 'GET'
    })
  },
  // 发运路线 新增修改
  changeShippingRouteData(data = {}, method = 'POST') {
    return this._getData({
      url: `/shippingroute/`,
      method,
      data
    })
  },
  // 删除发运路线
  deleteShippingRouteData(code) {
    return this._getData({
      url: `/shippingroute/${code}`,
      method: 'DELETE'
    })
  }
}
