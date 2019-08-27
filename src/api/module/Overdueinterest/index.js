export default {
  // 认款后逾期利息表-查询
  queryoverdueinterestSearch(data) {
    return this._getData({
      url: '/overdueinterest/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //保存-认款后逾期利息表
  saveoverdueinterest(data) {
    return this._getData({
      url: `/overdueinterest/`,
      method: 'POST',
      data
    })
  },
  //生产应收结算单-认款后逾期利息表
  savelistbyreceivesettlement(data) {
    return this._getData({
      url: `/overdueinterest/createSettlement`,
      method: 'POST',
      data
    })
  }
}
