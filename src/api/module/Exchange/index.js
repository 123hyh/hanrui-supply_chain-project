export default {

  // 增加汇率
  addExchangerate(data) {
    return this._getData({
      url: `/exchangerate/`,
      method: 'POST',
      data
    })
  },
  
  // 查询银行汇率
  getExchangerate(data) {
    return this._getData({
      url: `/exchangerate/search/settting/`,
      method: 'POST',
      data:{...data,source:'system'}
    })
  },

  // 指定日期银行汇率
  gettimeExchangerate(time) {
      return this._getData({
        url: `exchangerate/${time}`,
        method: 'GET'
      })
  },
  
  // 今日银行汇率
  getexchangerate() {
    return this._getData({
      url: `exchangerate/setting/today`,
      method: 'GET'
    })
  },

  // 设置海关汇率
  changeCustomsExchangeData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/exchangerate/custom`,
      method,
      data
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

  // 指定日期海关汇率
  gethgtimeExchangerate(time) {
    return this._getData({
      url: `exchangerate/custom/${time}`,
      method: 'GET'
    })
  },

  // 首页 汇率
  getExchange() {
    return this._getData({
      url: `exchangerate/search`,
      method: 'GET'
    })
  },
  
}
