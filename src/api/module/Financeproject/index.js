export default {
  // 财务-计费项目-分页查询
  getFinanceProject(data) {
    return this.queryfinanceprojectSearch(data)
  },
  // 财务计费项目表 - 查询列表
  queryfinanceprojectSearch(data) {
    return this._getData({
      url: '/financeproject/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 财务计费项目表-新增
  addfinanceprojectData(data) {
    return this._getData({
      url: '/financeproject/',
      method: 'POST',
      data
    })
  },
  // 财务计费项目表-修改
  editfinanceprojectData(data) {
    return this._getData({
      url: '/financeproject/',
      method: 'PUT',
      data
    })
  },
  // 财务计费项目表-删除
  deletefinanceprojectData(codeNo) {
    return this._getData({
      url: `/financeproject/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 财务计费项目表-加载编码
  getfinanceprojectCode() {
    return this._getCode('CWXM')
  },
  // 财务计费项目表 - 查询单条
  searchOnefinanceprojectData(codeNo) {
    return this._getData({
      url: `/financeproject/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
