export default{
  // 委托方评估-查询
  queryclientevaluationSearch(data) {
    return this._getData({
      url: '/clientevaluation/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 委托方评估-新增
  addclientevaluationData(data = {}) {
    return this._getData({
      url: '/clientevaluation/',
      method: 'POST',
      data
    })
  },
  // 委托方评估-修改
  editclientevaluationData(data = {}) {
    return this._getData({
      url: '/clientevaluation/',
      method: 'PUT',
      data
    })
  },
  // 委托方评估-删除
  deleteclientevaluationData(codeNo) {
    return this._getData({
      url: '/clientevaluation/' + codeNo,
      method: 'DELETE'
    })
  },
  // 委托方评估-加载编码
  getclientevaluationCode() {
    return this._getCode('WTPG')
  },
  // 委托方评估-获取单条
  searchOneclientevaluationData(params) {
    return this._getData({
      url: '/clientevaluation/searchOne?itemCode=' + params,
      method: 'GET'
    })
  },
}