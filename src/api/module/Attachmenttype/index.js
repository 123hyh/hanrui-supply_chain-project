export default {
  // 附件上传类型 - 查询列表
  queryattachmenttypeSearch(data) {
    return this._getData({
      url: '/attachmenttype/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 附件上传类型-新增
  addattachmenttypeData(data) {
    return this._getData({
      url: '/attachmenttype/',
      method: 'POST',
      data
    })
  },
  // 附件上传类型-修改
  editattachmenttypeData(data) {
    return this._getData({
      url: '/attachmenttype/',
      method: 'PUT',
      data
    })
  },
  // 附件上传类型-删除
  deleteattachmenttypeData(codeNo) {
    return this._getData({
      url: `/attachmenttype/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 附件上传类型-加载编码
  getattachmenttypeCode() {
    return this._getCode('FJLX')
  },
  // 附件上传类型 - 查询单条
  searchOneattachmenttypeData(codeNo) {
    return this._getData({
      url: `/attachmenttype/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
