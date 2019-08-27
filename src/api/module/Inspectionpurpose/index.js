export default {
  // 报检用途 - 查询列表
  queryinspectionpurposeSearch(data) {
    return this._getData({
      url: '/inspectionpurpose/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 报检用途-新增
  addinspectionpurposeData(data) {
    return this._getData({
      url: '/inspectionpurpose/',
      method: 'POST',
      data
    })
  },
  // 报检用途-修改
  editinspectionpurposeData(data) {
    return this._getData({
      url: '/inspectionpurpose/',
      method: 'PUT',
      data
    })
  },
  // 报检用途-删除
  deleteinspectionpurposeData(codeNo) {
    return this._getData({
      url: '/inspectionpurpose/' + codeNo,
      method: 'DELETE'
    })
  },
  // 报检用途-加载编码
  getinspectionpurposeCode() {
    return this._getCode('BJYT')
  },
  // 报检用途 - 查询单条
  searchOneinspectionpurposeData(codeNo) {
    return this._getData({
      url: `/inspectionpurpose/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
