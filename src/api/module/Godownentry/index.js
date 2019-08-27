export default {
  //分页查询香港入库单
  queryGodownentry(data) {
    return this._getData({
      url: '/godownentry/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //保存香港入库单
  addGodownentry(data = {}) {
    return this._getData({
      url: '/godownentry/addAll',
      method: 'POST',
      data
    })
  },
  //修改香港入库单
  updateGodownentry(data) {
    return this._getData({
      url: '/godownentry/',
      method: 'PUT',
      data
    })
  },
  //删除香港入库单
  removeGodownentry(godownEntryCode) {
    return this._getData({
      url: `/godownentry/${godownEntryCode}`,
      method: 'DELETE'
    })
  },
  //查询当条香港入库单
  getGodownentry(godownEntryCode) {
    return this._getData({
      url: `/godownentry/${godownEntryCode}`,
      method: 'GET'
    })
  },
  // 香港入库单新增获取code
  getGodownEntryCode() {
    return this._getData({
      url: `/common/getCodeNo?bizCode=HKRK`,
      method: 'GET'
    })
  }
}
