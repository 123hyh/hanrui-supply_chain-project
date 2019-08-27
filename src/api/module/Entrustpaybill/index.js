export default {
  // 委托付款单加载编码
  getEntrustpaybillCode() {
    return this._getCode('WTFK')
  },
  // 删除单条委托付款单子表
  removeEntrustpaybillItem(itemCode) {
    return this._getData({
      url: `/entrustpaybillitem/${itemCode}`,
      method: 'DELETE'
    })
  },
  //
  getChildCode() {
    return this._getData({
      url: `/common/getCodeNo?bizCode=NO`,
      method: 'GET'
    })
  },

  // 委托付款单 删除数据
  deleteEntrustpaybillData(code = '') {
    return this._getData({
      url: `/entrustpaybill/${code}`,
      method: 'DELETE'
    })
  },
  // 委托订单 转 委托付款单 代收款子表
  insertEntrustpaybillItemData(data = {}) {
    return this._getData({
      url: `/entrustpaybill/transfer`,
      method: 'POST',
      data
    })
  },
  // 委托付款单 保存 | 修改
  changeEntrustpaybillData({ method = 'POST', data } = {}) {
    return this._getData({
      url: `/entrustpaybill/`,
      method,
      data
    })
  },
  // 委托付款单 分页查询
  getEntrustpaybillData(data) {
    return this._getData({
      url: `/entrustpaybill/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 分页查询委托付款单 子表信息
  getEntrustpaybillItemList(data) {
    return this._getData({
      url: `/entrustpaybillitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 修改单条委托付款单子表
  updateEntrustpaybillItem(data) {
    return this._getData({
      url: `/entrustpaybillitem/`,
      method: 'PUT',
      data
    })
  }
}
