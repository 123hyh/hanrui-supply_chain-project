export default {
  
  // 融资授信查询
  getCredit(data) {
    return this._getData({
      url: '/credit/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 融资授信修改
  changeCredit(data) {
    return this._getData({
      url: '/credit/',
      method: 'PUT',
      data
    })
  },
  // 融资授信新增
  addCredit(data) {
    return this._getData({
      url: '/credit/',
      method: 'POST',
      data
    })
  },
  // 删除融资授信数据
  deleteCredit(No) {
    return this._getData({
      url: `/credit/${No}`,
      method: 'DELETE'
    })
  },
  // 获取融资授信编码
  getCreditNo() {
    return this._getData({
      url: '/common/getCodeNo?bizCode=RZSX',
      method: 'GET'
    })
  },

  //  批量保存融资授信抵押物
  batchPreservePawn(data) {
    return this._getData({
      url: '/creditpawn/insertBatch',
      method: 'POST',
      data
    })
  },
 
  // 融资授信 担保 新增保存
  addEnsure(data) {
    return this._getData({
      url: `/creditensure/insertBatch`,
      method: 'POST',
      data
    })
  },

  
  //  融资授信获取协议管理
  getAssignmentAgreementData(data) {
    return this.queryagreementSearch(data)
  },
  // 融资授信 抵押物保存操作
  handlerPawnPreserve(data) {
    let options = {
      url: '/creditpawn/insertBatch',
      method: 'POST',
      data
    }
  },
}
