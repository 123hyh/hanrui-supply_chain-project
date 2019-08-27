export default {
  
  // 计量单位
  getMeasurement(data) {
    return this._getData({
      url: `/measurement/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 计量单位表 - 查询列表
  querymeasurementSearch(data) {
    return this.getMeasurement(data)
  },

  // 计量单位表-新增
  addmeasurementData(data) {
    let options = {
      url: '/measurement/',
      method: 'POST',
      data
    }
    return this._getData(options)
  },

  // 计量单位表-修改
  editmeasurementData(data) {
    return this._getData({
      url: '/measurement/',
      method: 'PUT',
      data
    })
  },

  // 计量单位表-删除
  deletemeasurementData(codeNo) {
    return this._getData({
      url: `/measurement/${codeNo}`,
      method: 'DELETE'
    })
  },

  // 计量单位表-加载编码
  getmeasurementCode() {
    return this._getCode('JLDW')
  },

  // 计量单位表 - 查询单条
  searchOnemeasurementData(codeNo) {
    return this._getData({
      url: `/measurement/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
