export default {
  // 关务舱单分页查询
  getShippingBillList(data) {
    return this._getData({
      url: `/shippingbill/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  //关务舱单获取编码
  getShippingBillCode() {
    return this._getData({
      url: `/shippingbill/shippingBillCode`,
      method: 'GET'
    })
  },

  // 关务舱单新增 修改
  changeShippingBillData(data = {}, method = 'POST') {
    return this._getData({
      url: `/shippingbill/`,
      method,
      data
    })
  },
  
  // 删除关务舱单数据
  deleteShippingBillData(code) {
    return this._getData({
      url: `/shippingbill/${code}`,
      method: 'DELETE'
    })
  }
}
