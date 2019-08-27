export default {
  // 公式表分页
  getCustomizedFormulaPageData(data = {}) {
    return this._getData({
      url: `/formula/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 删除公式表
  deleteCustomizedFormulaData(itemCode) {
    return this._getData({
      url: `/formula/${itemCode}`,
      method: 'DELETE'
    })
  },

  // 公式表 新增 | 修改
  changeCustomizedFormulaData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/formula/`,
      method,
      data
    })
  },

  // 获取取值单据字段
  getComputedField(formulaBill) {
    return this._getData({
      url: `/formula/selectFields/${formulaBill}`,
      method: 'GET'
    })
  }
}
