export default {
  // 公司信息 - 查询列表
  querycompanyinfoSearch(data) {
    return this._getData({
      url: '/companyinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 公司信息-新增 | 修改
  addcompanyinfoData(data = {}, method = 'POST') {
    return this._getData({
      url: '/companyinfo/',
      method,
      data
    })
  },
  // 公司信息-删除
  deletecompanyinfoData(codeNo) {
    return this._getData({
      url: `/companyinfo/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 公司信息-加载编码
  getcompanyinfoCode() {
    return this._getCode('GSXX')
  },
  // 公司信息-修改
  editcompanyinfoData(data = {}, method = 'PUT') {
    return this.addcompanyinfoData(data, method)
  },
  // 公司信息 新增 | 修改
  changeCompanyinfoData({ data, method } = {}) {
    return this.addcompanyinfoData(data, method)
  },
  // 公司财务信息 新增 | 修改
  changeCompanyinfoFinanceData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/companyfinance/`,
      data,
      method
    })
  },

  // 公司银行信息
  changeCompanybankData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/companybank/`,
      method,
      data
    })
  },

  // 公司信息 分页查询 银行信息
  getCompanybankPageData(data) {
    return this._getData({
      url: `/companybank/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 删除银行信息分页
  deleteCompanyBankData(itemCode) {
    return this._getData({
      url: `/companybank/${itemCode}`,
      method: 'DELETE'
    })
  },
  // 查询单条公司 财务信息
  getCompanyInfoFinanceData(companyCode) {
    return this._getData({
      url: `/companyfinance/${companyCode}`,
      method: 'GET'
    })
  },

  // 公司信息 - 查询单条
  searchOnecompanyinfoData(codeNo) {
    return this._getData({
      url: `/companyinfo/searchOne/${codeNo}`,
      method: 'GET'
    })
  },

  // 分页查询司机信息
  getDriverMessage(data) {
    return this._getData({
      url: `/driverinfo/search`,
      method: 'POST',
      data
    })
  }
}
