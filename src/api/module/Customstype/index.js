export default {
  // 关务报关类型 - 查询列表
  querycustomstypeSearch(data) {
    return this._getData({
      url: '/customstype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 关务报关类型-新增 || 修改
  changeCustomstypeData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/customstype/`,
      method,
      data
    })
  },
/*   // 关务报关类型-新增
  addcustomstypeData(data) {
    return this._getData({
      url: '/customstype/',
      method: 'POST',
      data
    })
  },
  // 关务报关类型-修改
  editcustomstypeData(data) {
    return this._getData({
      url: '/customstype/',
      method: 'PUT',
      data
    })
  }, */
  // 关务报关类型-删除
  deletecustomstypeData(codeNo) {
    return this._getData({
      url: '/customstype/' + codeNo,
      method: 'DELETE'
    })
  },
  // 关务报关类型-加载编码
  getcustomstypeCode() {
    return this._getCode('BGLX')
  },
  // 关务报关类型 - 查询单条
  searchOnecustomstypeData(codeNo) {
    return this._getData({
      url: `/customstype/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
