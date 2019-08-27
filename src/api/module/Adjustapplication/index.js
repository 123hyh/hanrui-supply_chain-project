export default
{
  // 账务调整申请单 单据编号
  getAdjustApplicationCode() {
    return this._getCode('ZWTZ')
  },
  // 账务调整申请单 分页查询
  getAdjustApplicationData(data) {
    return this._getData({
      url: `/adjustapplication/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 删除账务调整申请单 一条数据
  removeOnAdjustApplicationData(billNo) {
    return this._getData({
      url: `/adjustapplication/${billNo}`,
      method: 'DELETE'
    })
  },
  // 账务调整单 新增 | 修改
  changeAdjustApplicationData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/adjustapplication/`,
      method,
      data
    })
  },
  // 获取单条账务调整单
  getOneAdjustapplicationData(billNo) {
    return this._getData({
      url: `/adjustapplication/${billNo}`,
      method: 'GET'
    })
  },

  // 查询账务调整单子表分页
  getAdjustApplicationItemData(data) {
    return this._getData({
      url: `/adjustapplicationitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 账务调整单子表 新增 | 修改
  changeAdjustapplicationitemData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/adjustapplicationitem/`,
      method,
      data
    })
  },

  // 删除账务调整单 子表
  deleteAdjustapplicationitemData(itemCode) {
    return this._getData({
      url: `/adjustapplicationitem/${itemCode}`,
      method: 'DELETE'
    })
  },
}