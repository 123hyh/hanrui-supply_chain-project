export default {
  // 费用报销单加载编码
  getexpenseorderCode() {
    return this._getCode('FYBX')
  },
  // 费用报销单-查询
  queryexpenseorderSearch(data) {
    return this._getData({
      url: '/expenseorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-费用报销单
  addexpenseorder(data) {
    return this._getData({
      url: `/expenseorder/`,
      method: 'POST',
      data
    })
  },
  //修改-费用报销单
  updateexpenseorder(data) {
    return this._getData({
      url: `/expenseorder/`,
      method: 'PUT',
      data
    })
  },
  //删除-费用报销单
  removeexpenseorder(code) {
    return this._getData({
      url: `/expenseorder/${code}`,
      method: 'DELETE'
    })
  },
  // 费用报销单子表-查询
  queryexpenseitemSearch(data) {
    return this._getData({
      url: '/expenseitem/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 增加-费用报销单子表
  addexpenseitem(data) {
    return this._getData({
      url: `/expenseitem/`,
      method: 'POST',
      data
    })
  },
  //修改-费用报销单子表
  updateexpenseitem(data) {
    return this._getData({
      url: `/expenseitem/`,
      method: 'PUT',
      data
    })
  },
  //删除-费用报销单子表
  removeexpenseitem(code) {
    return this._getData({
      url: `/expenseitem/${code}`,
      method: 'DELETE'
    })
  }
}
