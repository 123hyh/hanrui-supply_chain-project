export default {
  // 进/出口报关计划 - 查询
  queryImportCustomOrderSearch(data) {
    return this._getData({
      url: '/importcustomorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  changeImportCustomOrderData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/importcustomorder/',
      method,
      data
    })
  },
  // 进/出口报关计划 - 新增
  addImportCustomOrderData(data) {
    return this.changeImportCustomOrderData({ data })
  },
  // 进/出口报关计划 - 修改
  editImportCustomOrderData(data) {
    return this.changeImportCustomOrderData({ data, method: 'PUT' })
  },
  // 进/出口报关计划 - 删除
  deleteImportCustomOrderData(codeNo) {
    return this._getData({
      url: '/importcustomorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 进/出口报关计划 - 加载编码
  getImportCustomOrderCode() {
    return this._getCode('BGJH')
  },
  // 进/出口报关计划-获取单条
  searchOneImportCustomOrderData(planOrderNo) {
    return this._getData({
      url: '/importcustomorder/searchOne?planOrderNo=' + planOrderNo,
      method: 'GET'
    })
  },
  // 报关计划单 获取委托订单的商品信息
  getEntrustOrdersGoodsList(data = []) {
    return this._getData({
      url: `/importcustomorder/transfer`,
      method: 'POST',
      data
    })
  },

  // 进/出口报关计划-商品明细-分页查询
  queryimportcustomgoodsSearch(data) {
    return this._getData({
      url: '/importcustomgoods/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 新增 进/出口报关计划- 商品明细
  addimportcustomgoodsData(data = {}) {
    return this._getData({
      url: `/importcustomgoods/insertByOrderNo`,
      method: 'POST',
      data
    })
  },
  // 修改 进/出口报关计划- 商品明细
  editimportcustomgoodsData(data = {}) {
    return this._getData({
      url: `/importcustomgoods/`,
      method: 'PUT',
      data
    })
  },
  // 进/出口报关计划- 商品明细 - 删除
  deleteimportcustomgoodsData(codeNo) {
    return this._getData({
      url: '/importcustomgoods/' + codeNo,
      method: 'DELETE'
    })
  },
  // 进/出口报关计划- 商品明细-获取单条
  searchOneimportcustomgoodsData(itemCode) {
    return this._getData({
      url: '/importcustomgoods/' + itemCode,
      method: 'GET'
    })
  }
}
