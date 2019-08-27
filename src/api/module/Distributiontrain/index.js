export default {
  // 配送车次-获取单条
  searchDistributionData(distributionTrainCode) {
    return this._getData({
      url:
        '/distributiontrain/searchOne?distributionTrainCode=' +
        distributionTrainCode,
      method: 'GET'
    })
  },
  // 配送车次-查询
  querydistributiontrainSearch(data) {
    return this._getData({
      url: '/distributiontrain/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 配送车次-新增
  adddistributiontrainData(data) {
    return this._getData({
      url: '/distributiontrain/',
      method: 'POST',
      data
    })
  },
  // 配送车次-修改
  editdistributiontrainData(data) {
    return this._getData({
      url: '/distributiontrain/',
      method: 'PUT',
      data
    })
  },
  // 配送车次-删除
  deletedistributiontrainData(codeNo) {
    return this._getData({
      url: '/distributiontrain/' + codeNo,
      method: 'DELETE'
    })
  },
  // 配送车次-获取编号
  getdistributiontrainCode(codeNo) {
    return this._getCode('PSCC')
  }
}
