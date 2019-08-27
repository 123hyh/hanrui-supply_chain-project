export default {
  // 卖方交发货 - 列表 - 查询
  sellerReceiveSearch(data) {
    return this._getData({
      url: '/sellerreceivegoods/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 卖方交发货 - 列表 - 删除
  deleteSellerReceiveList(codeNo) {
    return this._getData({
      url: '/sellerreceivegoods/' + codeNo,
      method: 'DELETE'
    })
  },

  // 卖方交发货 - 新增表单 - 获取单据编号
  getSellerReceiveOrderNo() {
    return this._getCode('MJFH')
  },
  // 卖方交发货 - 修改 - 查询当条信息
  getSellerReceiveOneData(Code) {
    return this._getData({
      url: '/sellerreceivegoods/' + Code,
      method: 'GET'
    })
  },
  // 卖方接提货 - 保存表单
  saveSellerReceiveForm(data) {
    return this._getData({
      url: `/sellerreceivegoods/`,
      method: 'POST',
      data
    })
  },
  // 卖方接提货 - 修改表单
  editSellerReceiveForm(data) {
    return this._getData({
      url: `/sellerreceivegoods/`,
      method: 'PUT',
      data
    })
  },
  // 卖方物流信息 - 分页查询
  querySellerLogisticsInfo(data) {
    return this._getData({
      url: '/sellerlogisticsinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 卖方物流信息 - 保存（增加）
  saveSellerLogisticsInfo(data) {
    return this._getData({
      url: `/sellerlogisticsinfo/insertBatch`,
      method: 'POST',
      data
    })
  },

  // 卖方物流信息 - 删除
  deleteSellerLogisticsInfo(data) {
    return this._getData({
      url: '/sellerlogisticsinfo/deleteBatch',
      method: 'DELETE',
      data
    })
  }
}
