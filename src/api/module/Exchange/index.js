export default {
  // 首页 汇率
  getExchange() {
    return this._getData({
      url: `exchangerate/search`,
      method: 'GET'
    })
  },
  // 增加汇率
  addExchangerate(data) {
    return this._getData({
      url: `/exchangerate/`,
      method: 'POST',
      data
    })
  },
  // 查询汇率  分页
  getExchangerate(data) {
    return this._getData({
      url: `/exchangerate/search/settting`,
      method: 'POST',
      data:{...data,source:'system'}
    })
  },

  // 今日汇率
  getexchangerate() {
    return this._getData({
      url: `exchangerate/setting/today`,
      method: 'GET'
    })
  },

  // 获取所有汇率
  getexchangerateall() {
    return this._getData({
      url: `/exchangerate/search/settting`,
      method: 'POST',
      data: {source:'system'}
    })
  },
  // 获取海关汇率
  getCustomsExchangeData(data) {
    return this._getData({
      url: `/exchangerate/search/settting/custom`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 设置海关汇率
  changeCustomsExchangeData({ data = {}, method = 'POST' } = {}) {
    debugger
    return this._getData({
      url: `/exchangerate/custom`,
      method,
      data
    })
  }
}
