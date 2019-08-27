export default {
  // 承运商-基础信息-查询
  querycarrierbaseSearch(data) {
    return this._getData({
      url: '/carrierbase/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 承运商-基础信息-新增 || 修改
  changeCarrierbaseData({ data = {}, method = 'POST' }) {
    return this._getData({
      url: `/carrierbase/`,
      method,
      data
    })
  },
  // 承运商银行信息 分页查询
  getCarrierBankData(data) {
    return this.getALLBankData(data)
  },
  //  承运商银行信息  新增||修改
  changeCarrierBankData(data) {
    return this.changeAllBankData(data)
  },
  // 删除 承运商银行信息
  deleteCarrierBankData(code){
    return this.deleteBankData(code)
  },
  // 承运商-基础信息-新增
  addcarrierbaseData(data = {}) {
    return this._getData({
      url: '/carrierbase/',
      method: 'POST',
      data
    })
  },
  // 承运商-基础信息-修改
  editcarrierbaseData(data = {}) {
    return this._getData({
      url: '/carrierbase/',
      method: 'PUT',
      data
    })
  },
  // 承运商-基础信息-删除
  deletecarrierbaseData(codeNo) {
    return this._getData({
      url: '/carrierbase/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-基础信息-加载编码
  getcarrierbaseCode() {
    return this._getCode('CYSJ')
  },
  // 承运商-基础信息-查询单条
  searchOnecarrierbaseData(codeNo) {
    return this._getData({
      url: `/carrierbase/searchOne/${codeNo}`,
      method: 'GET'
    })
  },

  // 承运商-财务信息-查询
  querycarrierfinanceSearch(data) {
    return this._getData({
      url: '/carrierfinance/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 承运商-财务信息-新增
  changeCarrierfinanceData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/carrierfinance/`,
      method,
      data
    })
  },
  // 承运商-财务信息-新增
  addcarrierfinanceData(data = {}) {
    return this._getData({
      url: '/carrierfinance/',
      method: 'POST',
      data
    })
  },
  // 承运商-财务信息-修改
  editcarrierfinanceData(data = {}) {
    return this._getData({
      url: '/carrierfinance/',
      method: 'PUT',
      data
    })
  },
  // 承运商-财务信息-删除
  deletecarrierfinanceData(codeNo) {
    return this._getData({
      url: '/carrierfinance/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-财务信息-查询单条
  searchOnecarrierfinanceData(codeNo) {
    return this._getData({
      url: `/carrierfinance/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 承运商-财务信息-加载编码
  getcarrierfinanceCode() {
    return this._getCode('CYCW')
  },

  // 承运商-采购信息-查询
  querycarrierpurchaseSearch(data) {
    return this._getData({
      url: '/carrierpurchase/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 承运商-采购信息-新增 || 修改
  changeCarrierpurchaseData({ data = {}, method = {} } = {}) {
    return this._getData({
      url: `/carrierpurchase/`,
      method,
      data
    })
  },
  // 承运商-采购信息-新增
  addcarrierpurchaseData(data) {
    return this._getData({
      url: '/carrierpurchase/',
      method: 'POST',
      data
    })
  },
  // 承运商-采购信息-修改
  editcarrierpurchaseData(data) {
    return this._getData({
      url: '/carrierpurchase/',
      method: 'PUT',
      data
    })
  },
  // 承运商-采购信息-删除
  deletecarrierpurchaseData(codeNo) {
    return this._getData({
      url: '/carrierpurchase/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-采购信息-查询单条
  searchOnecarrierpurchaseData(codeNo) {
    return this._getData({
      url: `/carrierpurchase/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 承运商-采购信息-加载编码
  getcarrierpurchaseCode() {
    return this._getCode('CYCG')
  },

  // 承运商-货仓提货地址-查询
  querycarrierdeliverySearch(data) {
    return this._getData({
      url: '/carrierdelivery/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 承运商-货仓提货地址-新增 || 修改
  changeCarrierdeliveryData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/carrierdelivery/',
      method,
      data
    })
  },
  // 承运商-货仓提货地址-新增
  addcarrierdeliveryData(data) {
    return this._getData({
      url: '/carrierdelivery/',
      method: 'POST',
      data
    })
  },
  // 承运商-货仓提货地址-修改
  editcarrierdeliveryData(data) {
    return this._getData({
      url: '/carrierdelivery/',
      method: 'PUT',
      data
    })
  },
  // 承运商-货仓提货地址-删除
  deletecarrierdeliveryData(codeNo) {
    return this._getData({
      url: '/carrierdelivery/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-货仓提货地址-查询单条
  searchOnecarrierdeliveryData(codeNo) {
    return this._getData({
      url: `/carrierdelivery/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 承运商-货仓提货地址-加载编码
  getcarrierdeliveryCode() {
    return this._getCode('CYTH')
  },

  // 承运商-信用评估-查询
  querycarriercreditSearch(data) {
    return this._getData({
      url: '/carriercredit/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 承运商-信用评估-新增 || 修改
  changeCarriercreditData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: `/carriercredit/`,
      method,
      data
    })
  },
  // 承运商-信用评估-新增
  addcarriercreditData(data) {
    return this._getData({
      url: '/carriercredit/',
      method: 'POST',
      data
    })
  },
  // 承运商-信用评估-修改
  editcarriercreditData(data) {
    return this._getData({
      url: '/carriercredit/',
      method: 'PUT',
      data
    })
  },
  // 承运商-信用评估-删除
  deletecarriercreditData(codeNo) {
    return this._getData({
      url: '/carriercredit/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-信用评估-查询单条
  searchOnecarriercreditData(codeNo) {
    return this._getData({
      url: `/carriercredit/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 承运商-信用评估-加载编码
  getcarriercreditCode() {
    return this._getCode('CYXY')
  },

  // 承运商-司机-查询
  querycarrierdriverSearch(data) {
    return this._getData({
      url: '/carrierdriver/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //承运商-司机-新增 || 修改
  changeCarrierdriverData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/carrierdriver/',
      method,
      data
    })
  },
  // 承运商-司机-新增
  addcarrierdriverData(data) {
    return this._getData({
      url: '/carrierdriver/',
      method: 'POST',
      data
    })
  },
  // 承运商-司机-修改
  editcarrierdriverData(data) {
    return this._getData({
      url: '/carrierdriver/',
      method: 'PUT',
      data
    })
  },
  // 承运商-司机-删除
  deletecarrierdriverData(codeNo) {
    return this._getData({
      url: '/carrierdriver/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-司机-查询单条
  searchOnecarrierdriverData(codeNo) {
    return this._getData({
      url: `/carrierdriver/searchOne?itemCode=${codeNo}`,
      method: 'GET'
    })
  },

  // 承运商-车辆-查询
  querycarriercarSearch(data) {
    return this._getData({
      url: '/carriercar/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //承运商-车辆-新增 || 修改
  changeCarriercarData({ data = {}, method = 'POST' } = {}) {
    return this._getData({
      url: '/carriercar/',
      method,
      data
    })
  },
  // 承运商-车辆-新增
  addcarriercarData(data) {
    return this._getData({
      url: '/carriercar/',
      method: 'POST',
      data
    })
  },
  // 承运商-车辆-修改
  editcarriercarData(data) {
    return this._getData({
      url: '/carriercar/',
      method: 'PUT',
      data
    })
  },
  // 承运商-车辆-删除
  deletecarriercarData(codeNo) {
    return this._getData({
      url: '/carriercar/' + codeNo,
      method: 'DELETE'
    })
  },
  // 承运商-车辆-查询单条
  searchOnecarriercarData(codeNo) {
    return this._getData({
      url: `/carriercar/searchOne?itemCode=${codeNo}`,
      method: 'GET'
    })
  },
  // 承运商加入黑名单
  addCarriercarBlacklist(carrierCode) {
    return this._getData({
      url: `/carrierbase/pullBlack/${carrierCode}`,
      method: 'GET'
    })
  }
}
