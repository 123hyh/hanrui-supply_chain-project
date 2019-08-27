export default {
  // 删除供应链客户
  deleteCustomerData(code) {
    return this._getData({
      url: `/customer/${code}`,
      method: 'DELETE'
    })
  },
  // 供应链客户列表获取及搜索
  getCustomerList(data) {
    return this._getData({
      url: `/customer/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链客户获取客户编码
  getClienteleCode() {
    return this._getCode('KHXX')
  },
  // 供应链客户 基础资料新增保存
  changeCustomer(data = {}, method = 'POST') {
    return this._getData({
      url: `/customer/`,
      method,
      data
    })
  },
  // 供应链客户 财务资料查询 对应单号
  getCustomerFinance(data) {
    return this._getData({
      url: `/customerfinance/searchOne`,
      method: 'GET',
      data
    })
  },
  // 供应链客户 财务资料 保存修改对应单号
  changeCustomerFinance(data = {}) {
    return this._getData({
      url: `/customerfinance/`,
      method: 'POST',
      data
    })
  },
  // 供应链客户 获取基础资料、
  getCustomerSearchOne(data) {
    return this._getData({
      url: `/customer/searchOne`,
      method: 'GET',
      data
    })
  },
  // 供应链客户 分页查询
  getCustomerSellList(data) {
    return this._getData({
      url: `/customersell/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链客户 销售资料查询 /customersell/search
  getCustomerSell(data) {
    return this._getData({
      url: `/customersell/searchOne`,
      method: 'GET',
      data
    })
  },
  // 供应链客户 销售资料保存 /customersell/
  changeCustomerSell(data = {}) {
    return this._getData({
      url: `/customersell/`,
      method: 'POST',
      data
    })
  },
  // 供应链客户 员工信息 || 业务员
  getEmployeeInfo(data) {
    return this.queryemployeeinfoSearch(data)
  },
  // 供应链客户 财务资料 的 部门弹窗
  getDepartment(data) {
    return this._getData({
      url: `/department/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链客户 新增银行信息
  changeCustomerBank(data = {}, method = 'POST') {
    return this._getData({
      url: `/customerbank/`,
      method,
      data
    })
  },
  // 供应链客户 查询银行信息
  getCustomerBan(data) {
    return this.getALLBankData(data)
    /* return this._getData( {
      url: `/customerbank/search`,
      method: 'POST',
      data: this._handlePage(data)
    }) */
  },
  // 供应链客户联系人 获取联系人
  getCustomerContact(data) {
    return this._getData({
      url: `/customercontact/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链客户 银行信息删除
  deleteCustomerBank(code) {
    return this._getData({
      url: `/customerbank/${code}`,
      method: 'DELETE'
    })
  },
  // 供应链客户 联系人 修改删除
  changeCustomerContact(data = {}, method = 'POST') {
    return this._getData({
      url: `/customercontact/`,
      method,
      data
    })
  },
  // 供应链客户 删除联系人
  deleteCustomerContact(code) {
    return this._getData({
      url: `/customercontact/${code}`,
      method: 'DELETE'
    })
  },
  // 获取 供应链客户 委托方
  getCustomerClient(data) {
    return this._getData({
      url: `/customerclient/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 供应链客户 委托新增修改
  changeCustomerClient(data = {}, method = 'POST') {
    return this._getData({
      url: `/customerclient/`,
      method,
      data
    })
  },
  // 供应链客户 委托方删除、
  deleteCustomerClient(code) {
    return this._getData({
      url: `/customerclient/${code}`,
      method: 'DELETE'
    })
  },
  addCustomerBlacklist(customerNo) {
    return this._getData({
      url: `/customer/pullBlack/${customerNo}`,
      method: 'GET'
    })
  }
}
