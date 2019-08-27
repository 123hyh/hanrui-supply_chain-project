export default {
  // 业务协议方案 新增 | 修改
  changeSolutionData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/solution/`,
      method,
      data
    })
  },

  // 业务协议方案分页查询
  getSolutionPageData(data) {
    return this._getData({
      url: `/solution/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 删除协议方案
  removeSolutionData(billNo) {
    return this._getData({
      url: `/solution/${billNo}`,
      method: 'DELETE'
    })
  },

  // 协议方案计费项目
  getSolutionProjectData(data) {
    return this._getData({
      url: `/solutionproject/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 协议方案计费公式
  getSolutionFormulaData(data) {
    return this._getData({
      url: `/solutionformula/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 批量 新增 | 修改 协议方案计费公式
  changeSolutionFormulaData({ data = [], method = 'POST' } = {}) {
    return this._getData({
      url: `/solutionformula/insertBatch`,
      method,
      data
    })
  },
  // 批量 新增 | 修改 协议方案计费项目
  changeSolutionProjectData({ data = [], method = 'POST' } = {}) {
    return this._getData({
      url: `/solutionproject/insertBatch`,
      method,
      data
    })
  },

  // 删除 协议方案的计费项目
  removeSolutionprojectData(itemCode) {
    return this._getData({
      url: `/solutionproject/${itemCode}`,
      method: 'DELETE'
    })
  },

  // 删除 协议方案的 计费公式
  removeSolutionFormulaData(itemCode) {
    return this._getData({
      url: `/solutionformula/${itemCode}`,
      method: 'DELETE'
    })
  },

  // 获取委托订单商品计费公式
  getsolutionformula(data) {
    return this._getData({
      url: `/solutionformula/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 修改单条 协议方案的计费公司
  changeSolutionformulaOneData(data = {}) {
    return this._getData({
      url: `/solutionformula/`,
      data,
      method: 'PUT'
    })
  }
}
