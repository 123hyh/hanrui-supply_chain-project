export default {
  // 批次规则定义 - 查询列表
  querybatchruleSearch(data) {
    return this._getData({
      url: '/batchrule/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 批次规则定义-新增
  changeBatchruleData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/batchrule/',
      method,
      data
    })
  },
 
  // 批次规则定义-删除
  deletebatchruleData(codeNo) {
    return this._getData({
      url: '/batchrule/' + codeNo,
      method: 'DELETE'
    })
  },
  // 批次规则定义-加载编码
  getbatchruleCode() {
    return this._getCode('PCDY')
  },
  // 批次规则定义 - 查询单条
  searchOnebatchruleData(codeNo) {
    return this._getData({
      url: `/batchrule/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
