export default {
  // 境内货源地分页查询
  getDeliveredGoodsPlaceList(data) {
    return this._getData({
      url: `/deliveredgoodsplace/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  
  //境内货源地获取编码
  getDeliveredGoodsPlaceCode() {
    return this._getData({
      url: `/deliveredgoodsplace/goodsPlaceCode`,
      method: 'GET'
    })
  },

  // 境内货源地新增 修改
  changeDeliveredGoodsPlaceData(data = {}, method = 'POST') {
    return this._getData({
      url: `/deliveredgoodsplace/`,
      method,
      data
    })
  },

  // 删除境内货源地数据
  deleteDeliveredGoodsPlaceData(code) {
    return this._getData({
      url: `/deliveredgoodsplace/${code}`,
      method: 'DELETE'
    })
  }
}
