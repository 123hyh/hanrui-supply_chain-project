export default {
  // 凭证摘要 - 查询列表
  queryvouchersummarySearch(data) {
    return this._getData({
      url: '/vouchersummary/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 凭证摘要-新增||修改
  changeChersummaryData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/vouchersummary/',
      method,
      data
    })
  },

  // 凭证摘要-删除
  deletevouchersummaryData(codeNo) {
    return this._getData({
      url: `/vouchersummary/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 凭证摘要-加载编码
  getvouchersummaryCode() {
    return this._getCode('PZZY')
  },
  // 凭证摘要 - 查询单条
  searchOnevouchersummaryData(codeNo) {
    return this._getData({
      url: `/vouchersummary/searchOne/${codeNo}`,
      method: 'GET'
    })
  }
}
