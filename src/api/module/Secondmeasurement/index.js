export default {
  // 第二计量单为 编码
  getSecondMeasurementCode() {
    return this._getCode('DRDW')
  },

  // 第二计量单位
  getSecondMeasurementPageData(data) {
    return this._getData({
      url: `/secondmeasurement/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  
  // 删除第二计量单位
  deleteSecondmeasurement(code) {
    return this._getData({
      url: `/secondmeasurement/${code}`,
      method: 'DELETE'
    })
  },

  // 新增 | 修改 第二计量单位
  changeSecondeasurement({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/secondmeasurement/`,
      data,
      method
    })
  }
}
