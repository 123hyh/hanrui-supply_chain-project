export default {
  // 其他计费单-加载编码
  getotherbillCode() {
    return this._getCode('QTJF')
  },
  // 其他计费单-查询
  queryotherbillSearch(data) {
    return this._getData({
      url: '/otherbill/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-其他计费单
  addotherbill(data) {
    return this._getData({
      url: `/otherbill/`,
      method: 'POST',
      data
    })
  },
  //修改-其他计费单
  updateotherbill(data) {
    return this._getData({
      url: `/otherbill/`,
      method: 'PUT',
      data
    })
  },
  //删除-其他计费单
  removeotherbill(code) {
    return this._getData({
      url: `/otherbill/${code}`,
      method: 'DELETE'
    })
  },
  // 其他计费单子表-查询
  queryotherbillbranchSearch(data) {
    return this._getData({
      url: '/otherbillbranch/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-其他计费单子表
  addotherbillbranch(data) {
    return this._getData({
      url: `/otherbillbranch/`,
      method: 'POST',
      data
    })
  },
  //修改-其他计费单子表
  updateotherbillbranch(data) {
    return this._getData({
      url: `/otherbillbranch/`,
      method: 'PUT',
      data
    })
  },
  //删除-其他计费单子表
  removeotherbillbranch(code) {
    return this._getData({
      url: `/otherbillbranch/${code}`,
      method: 'DELETE'
    })
  },
  // 其他计费单子表（修改记录）-查询
  queryotherbillrecordSearch(data) {
    return this._getData({
      url: '/modifylog/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}
