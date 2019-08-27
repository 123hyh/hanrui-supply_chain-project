export default {
  // 买方接提货 - 查询列表
  queryBuyerReceiveData(data) {
    return this._getData({
      url: `/buyerreceivegoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 买方接提货 - 修改 - 查询当条信息
  getBuyerReceiveOneData(code) {
    return this._getData({
      url: '/buyerreceivegoods/' + code,
      method: 'GET'
    })
  },
  // 买方接提货 - 列表 - 删除
  deleteBuyerReceiveList(codeNo) {
    return this._getData({
      url: '/buyerreceivegoods/' + codeNo,
      method: 'DELETE'
    })
  },
  // 买方接提货 - 保存表单
  saveBuyerReceiveForm(data) {
    return this._getData({
      url: `/buyerreceivegoods/`,
      method: 'POST',
      data
    })
  },
  // 买方接提货 - 修改表单
  editBuyerReceiveForm(data) {
    return this._getData({
      url: `/buyerreceivegoods/`,
      method: 'PUT',
      data
    })
  },
  // 买方接提货 - 新增表单 - 获取单据编号
  getBuyerReceiveOrderNo() {
    return this._getCode('MJTH')
  },
  // 买方物流信息 - 获取物流信息编码
  getBuyerLogisticsNo() {
    return this._getCode('MFWL')
  },
  // 买方物流信息 - 保存（增加）
  saveBuyerLogisticsInfo(data) {
    return this._getData({
      url: `/buyerlogisticsinfo/insertBatch`,
      method: 'POST',
      data
    })
  },
  // 买方物流信息 - 修改
  editBuyerLogisticsInfo(data) {
    return this._getData({
      url: `/buyerlogisticsinfo/`,
      method: 'PUT',
      data
    })
  },
  // 买方物流信息 - 删除
  deleteBuyerLogisticsInfo(data) {
    return this._getData({
      url: '/buyerlogisticsinfo/deleteBatch',
      method: 'DELETE',
      data
    })
  },

  // 买方物流信息 - 分页查询
  queryBuyerLogisticsInfo(data) {
    let options = {
      url: '/buyerlogisticsinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    }
    return this._getData(options)
  },
  // 买方物流信息 - 修改
  editSellerLogisticsInfo(data) {
    return this._getData({
      url: `/sellerlogisticsinfo/`,
      method: 'PUT',
      data
    })
  }
}
