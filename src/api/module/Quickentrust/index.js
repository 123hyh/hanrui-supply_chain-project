export default {
  // 网上订单 列表
  getOnlineOrderList(data) {
    return this._getData({
      url: `/quickentrust/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 订单 受理/退货
  changeQuickEntrustData(data = {}) {
    return this._getData({
      url: `/quickentrust/deal`,
      method: 'POST',
      data
    })
  },
  // 修改 网上订单
  updateQuickGoodsData(data = {}) {
    return this._getData({
      url: `/quickgoods/`,
      method: 'PUT',
      data
    })
  },
  // 查询 已受理网上订单
  getAcceptData(clientBillNo = '') {
    return this._getData({
      url: `/quickentrust/searchAccept/${clientBillNo}`,
      method: 'GET'
    })
  },
  // 网上订单 商品信息
  getQuickGoodsList(data) {
    return this._getData({
      url: `/quickgoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 修改网上订单  from表单数据
  updateQuickGoodsForm(data = {}) {
    return this._getData({
      url: `/quickentrust/`,
      method: 'PUT',
      data
    })
  }
}
