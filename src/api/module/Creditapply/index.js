export default{
    // 网上授信 列表
    getOnlineCreditList(data) {
      return this._getData({
        url: `/creditapply/search`,
        method: 'POST',
        data: this._handlePage(data)
      })
    },
    // 查询单条授信申请
    getOneOnlineCredit(code) {
      return this._getData({
        url: `/creditapply/${code}`,
        method: 'GET'
      })
    },
    // 处理授信申请
    handleCreditApply(data = {}) {
      return this._getData({
        url: `/creditapply/deal`,
        method: 'PUT',
        data
      })
    },
}