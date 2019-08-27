export default {
   // 分页查询采购订单
   getProcurementList(data) {
    return this._getData({
      url: `/purchaseorder/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单新增时获取订单编码
  getPurchaseOrderNo() {
    return this._getCode('CGDD')
  },
  // 删除采购订单数据
  removeProcurementData(code) {
    return this._getData({
      url: `/purchaseorder/${code}`,
      method: 'DELETE'
    })
  },
  // 采购订单 新增保存
  addPurchaseOrder(data) {
    return this._getData({
      url: `/purchaseorder/addAll`,
      method: 'POST',
      data
    })
  },
  // 采购订单 修改   保存
  updatePurchaseOrder(data) {
    return this._getData({
      url: `/purchaseorder/`,
      method: 'PUT',
      data
    })
  },
  
  // 采购订单 查询 商品信息
  getProcurementGoods(data) {
    return this._getData({
      url: `/purchasegoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单 商品信息 修改
  updateProcurementGoods(data) {
    return this._getData({
      url: `/purchasegoods/`,
      method: 'PUT',
      data
    })
  },
  // 采购订单 获取物流信息
  getLogistics(data) {
    return this._getData({
      url: `/buyerreceivegoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询 采购订单私有 物流信息
  getprocurementLogistics(code) {
    return this._getData({
      url: `/purchaselogistics/searchOne?purchaseOrderNo=${code}`,
      method: 'GET'
    })
  },
  // 修改物流信息
  updateLogisticsMessage(data = {}) {
    return this._getData({
      url: `/purchaselogistics/`,
      method: 'POST',
      data
    })
  },

  // 采购订单获取 付款委托单信息
  getPaymentEntrustMessage(data) {
    return this._getData({
      url: `/entrustpaybill/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单 读取委托订单 付款 信息
  getProcurementPayment(data) {
    return this._getData({
      url: `/entrustpanyment/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单物流信息
  getPurchaseLogistics(data) {
    return this._getData({
      url: `/purchaselogistics/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单 收货登记信息
  getReceiveRegisterMessage(data) {
    return this._getData({
      url: `/hkreceiveregister/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 采购订单的委托订单弹窗
  getProcurementDialog(data) {
    return this.queryentrustorderSearch(data)
  },
}
