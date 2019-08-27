export default {
  // 调汇申请单-获取单条
  searchRemittanceData(id) {
    return this._getData({
      url: '/remittance/searchOne?id=' + id,
      method: 'GET'
    })
  },

  // 调汇申请单-查询
  queryremittanceSearch(data) {
    return this._getData({
      url: '/remittance/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 调汇申请单-新增
  addremittanceData(data) {
    return this._getData({
      url: '/remittance/',
      method: 'POST',
      data
    })
  },
  // 调汇申请单-修改
  editremittanceData(data) {
    return this._getData({
      url: '/remittance/',
      method: 'PUT',
      data
    })
  },
  // 调汇申请单-删除
  deleteremittanceData(codeNo) {
    return this._getData({
      url: '/remittance/' + codeNo,
      method: 'DELETE'
    })
  },
  // 调汇申请单-获取编号
  getremittanceCode(codeNo) {
    return this._getCode('DHSQ')
  }
}
