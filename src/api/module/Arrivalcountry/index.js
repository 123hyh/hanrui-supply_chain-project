export default {
  // 启运国（地区）
  // 运抵国分页查询
  getArrivalCountryList(data) {
    return this._getData({
      url: `/arrivalcountry/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //运抵国获取编码
  getArrivalCountryCode() {
    return this._getData({
      url: `/arrivalcountry/arrivalCountryCode`,
      method: 'GET'
    })
  },
  // 运抵国新增 修改
  changeArrivalCountryData(data = {}, method = 'POST') {
    return this._getData({
      url: `/arrivalcountry/`,
      method,
      data
    })
  },
  // 删除运抵国数据
  deleteArrivalCountryData(code) {
    return this._getData({
      url: `/arrivalcountry/${code}`,
      method: 'DELETE'
    })
  }
}
