export default {
  // 分页查询保证金管理 /deposits/search
  getCashDepositManagement(data) {
    return this._getData({
      url: `/deposits/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 保证金管理 获取新增编码
  getDepositsCode() {
    return this._getCode('RZBZ')
  },
  // 新增 修改 保证金管理
  changeDepositsData(data = {}, method = 'POST') {
    return this._getData({
      url: `/deposits/`,
      method,
      data
    })
  },
  // 删除 保证金 数据
  deleteDepositsData(code) {
    return this._getData({
      url: `/deposits/${code}`,
      method: 'DELETE'
    })
  },
}
