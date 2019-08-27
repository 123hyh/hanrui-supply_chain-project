export default{
  
  // 认款单 - 查询
  querysubscriptionorderSearch(data) {
    return this._getData({
      url: '/subscriptionorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 认款单 - 新增 | 修改
  changeSubscriptionorderData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/subscriptionorder/`,
      method,
      data
    })
  },
  // 认款单 - 删除
  deletesubscriptionorderData(codeNo) {
    return this._getData({
      url: '/subscriptionorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 获取单条认款单
  getOneSubscriptionorderData(code) {
    return this._getData({
      url: `/subscriptionorder/${code}`,
      method: 'GET'
    })
  },
  // 认款单 - 加载编码
  getSubscriptionorderCode() {
    return this._getCode('RKQD')
  },
  // 获取认款单 子表
  getSubscriptionorderItem(data) {
    return this._getData({
      url: `/subscriptionitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 认款单 子表 新增 | 修改

  changeSubscriptionorderItem({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/subscriptionitem/`,
      method,
      data
    })
  },

  // 删除认款单子表
  deleteSubscriptionorderItem(itemCode) {
    return this._getData({
      url: `/subscriptionitem/${itemCode}`,
      method: 'DELETE'
    })
  },
}