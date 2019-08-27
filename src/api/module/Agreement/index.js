export default {
  // 协议管理-查询
  queryagreementSearch(data) {
    return this._getData({
      url: '/agreement/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 协议管理-新增
  addagreementData(data) {
    return this._getData({
      url: '/agreement/',
      method: 'POST',
      data
    })
  },
  // 获取 受托方收款项目 
  getAgreementclinetPage(data) {
    return this._getData({
      url: `/agreementclinet/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 协议管理-修改
  editagreementData(data) {
    return this._getData({
      url: '/agreement/',
      method: 'PUT',
      data
    })
  },
  // 协议管理-删除
  deleteagreementData(codeNo) {
    return this._getData({
      url: `/agreement/${codeNo}`,
      method: 'DELETE'
    })
  },
  // 协议管理-加载编码
  getagreementCode() {
    return this._getCode('XXGL')
  },
  // 协议管理-获取单条
  searchOneagreementData(agreementNo) {
    return this._getData({
      url: `/agreement/searchOne?agreementNo=${agreementNo}`,
      method: 'GET'
    })
  },

  // 协议管理-合同明细-获取单条
  searchOneagreementcontractData(itemCode) {
    return this._getData({
      url: `/agreementcontract/searchOne?agreementNo=${itemCode}`,
      method: 'GET'
    })
  }
}
