export default {
  // 机关信息 - 查询列表
  queryinstitutionSearch(data) {
    return this._getData({
      url: '/institution/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 机关信息-新增
  addinstitutionData(data) {
    return this._getData({
      url: '/institution/',
      method: 'POST',
      data
    })
  },

  // 机关信息-修改
  editinstitutionData(data) {
    return this._getData({
      url: '/institution/',
      method: 'PUT',
      data
    })
  },

  // 机关信息-删除
  deleteinstitutionData(codeNo) {
    return this._getData({
      url: '/institution/' + codeNo,
      method: 'DELETE'
    })
  },

  // 机关信息-加载编码
  getinstitutionCode() {
    return this._getCode('JGXX')
  },
  
  // 机关信息 - 查询单条
  searchOneinstitutionData(codeNo) {
    return this._getData({
      url: `/institution/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
