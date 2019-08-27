export default {
  // 供应链供应商-查询
  querysupplierbaseSearch(data) {
    return this._getData({
      url: '/supplierbase/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链供应商 新增 修改
  changesupplierbase(data = {}, method = 'POST') {
    return this._getData({
      url: `/supplierbase/`,
      method,
      data
    })
  },
  // 供应链供应商-删除
  deletesupplierbaseData(codeNo) {
    return this._getData({
      url: '/supplierbase/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应链供应商-加载编码
  getsupplierbaseCode() {
    return this._getCode('GYJC')
  },
  // 供应链供应商-获取单条
  searchOnesupplierbaseData(params) {
    return this._getData({
      url: '/supplierbase/searchOne/' + params,
      method: 'GET'
    })
  },

  // 供应商-财务信息-查询
  querysupplierfinanceSearch(data) {
    return this._getData({
      url: '/supplierfinance/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应商-财务信息 新增 修改
  changesupplierfinance(data = {}, method = 'POST') {
    return this._getData({
      url: `/supplierfinance/`,
      method,
      data
    })
  },
  // 供应商-财务信息-删除
  deletesupplierfinanceData(codeNo) {
    return this._getData({
      url: '/supplierfinance/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-财务信息-查询单条
  searchOnesupplierfinanceData(codeNo) {
    return this._getData({
      url: `/supplierfinance/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 供应商-财务信息-加载编码
  getsupplierfinanceCode() {
    return this._getCode('GYCW')
  },

  // 供应商-采购信息-查询
  querysupplierpurchaseSearch(data) {
    return this._getData({
      url: '/supplierpurchase/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应商-采购信息 新增 修改
  changesupplierpurchase(data = {}, method = 'POST') {
    return this._getData({
      url: `/supplierpurchase/`,
      method,
      data
    })
  },
  // 供应商-采购信息-删除
  deletesupplierpurchaseData(codeNo) {
    return this._getData({
      url: '/supplierpurchase/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-采购信息-查询单条
  searchOnesupplierpurchaseData(codeNo) {
    return this._getData({
      url: `/supplierpurchase/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 供应商-采购信息-加载编码
  getsupplierpurchaseCode() {
    return this._getCode('GYCG')
  },

  // 供应商-货仓提货地址-查询
  querysupplierdeliverySearch(data) {
    return this._getData({
      url: '/supplierdelivery/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应商-货仓提货地址 新增 修改
  changesupplierdelivery(data = {}, method = 'POST') {
    return this._getData({
      url: `/supplierdelivery/`,
      method,
      data
    })
  },
  // 供应商-货仓提货地址-删除
  deletesupplierdeliveryData(codeNo) {
    return this._getData({
      url: '/supplierdelivery/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-货仓提货地址-查询单条
  searchOnesupplierdeliveryData(codeNo) {
    return this._getData({
      url: `/supplierdelivery/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 供应商-货仓提货地址-加载编码
  getsupplierdeliveryCode() {
    return this._getCode('GYTH')
  },

  // 供应商-信用评估-查询
  querysuppliercreditSearch(data) {
    return this._getData({
      url: '/suppliercredit/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应商-信用评估 新增 修改
  changesuppliercredit(data = {}, method = 'POST') {
    return this._getData({
      url: `/suppliercredit/`,
      method,
      data
    })
  },
  // 供应商-信用评估-删除
  deletesuppliercreditData(codeNo) {
    return this._getData({
      url: '/suppliercredit/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-信用评估-查询单条
  searchOnesuppliercreditData(codeNo) {
    return this._getData({
      url: `/suppliercredit/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 供应商-信用评估-加载编码
  getsuppliercreditCode() {
    return this._getCode('GYXY')
  },
  // 查询单条 供应商财务资料
  getOneSupplierfinanceData(code = '') {
    return this._getData({
      url: `/supplierfinance/searchOne/${code}`,
      method: 'GET'
    })
  },
  // 供应商-银行信息-查询
  querysupplierbankSearch(data) {
    return this.getALLBankData(data)
  },
  // 供应商-银行信息 新增 修改
  changesupplierbank(data = {}, method) {
    return this._getData({
      url: `/supplierbank/`,
      method,
      data
    })
  },
  // 供应商-银行信息-删除
  deletesupplierbankData(codeNo) {
    return this._getData({
      url: '/supplierbank/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-银行信息-查询单条
  searchOnesupplierbankData(codeNo) {
    return this._getData({
      url: `/supplierbank/searchOne?itemCode=${codeNo}`,
      method: 'GET'
    })
  },

  // 供应商-联系人-查询
  querysuppliercontactSearch(data) {
    return this._getData({
      url: '/suppliercontact/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应商-联系人 新增 修改
  changesuppliercontact(data = {}, method) {
    return this._getData({
      url: `/suppliercontact/`,
      method,
      data
    })
  },
  // 供应商-联系人-删除
  deletesuppliercontactData(codeNo) {
    return this._getData({
      url: '/suppliercontact/' + codeNo,
      method: 'DELETE'
    })
  },
  // 供应商-联系人-查询单条
  searchOnesuppliercontactData(codeNo) {
    return this._getData({
      url: `/suppliercontact/searchOne?itemCode=${codeNo}`,
      method: 'GET'
    })
  },
  // 供应商-添加黑名单
  addSupplierBlack(supplierCode) {
    return this._getData({
      url: `/supplierbase/pullBlack/${supplierCode}`,
      method: 'GET'
    })
  }
}
