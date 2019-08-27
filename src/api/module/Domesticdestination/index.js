export default {
  // 境内目的地 - 查询列表
  querydomesticdestinationSearch(data) {
    return this._getData({
      url: '/domesticdestination/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 境内目的地-新增
  adddomesticdestinationData(data) {
    return this._getData({
      url: '/domesticdestination/',
      method: 'POST',
      data
    })
  },

  // 境内目的地-修改
  editdomesticdestinationData(data) {
    return this._getData({
      url: '/domesticdestination/',
      method: 'PUT',
      data
    })
  },

  // 境内目的地-删除
  deletedomesticdestinationData(codeNo) {
    return this._getData({
      url: '/domesticdestination/' + codeNo,
      method: 'DELETE'
    })
  },

  // 境内目的地加载编码
  getAttachmentTypeCode() {
    return this.getdomesticdestinationCode()
  },

  // 境内目的地-加载编码
  getdomesticdestinationCode() {
    return this._getCode('JNMD')
  },
  
  // 境内目的地 - 查询单条
  searchOnedomesticdestinationData(codeNo) {
    return this._getData({
      url: `/domesticdestination/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
