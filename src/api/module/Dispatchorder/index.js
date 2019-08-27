export default {
  //深圳调度单 - 查询
  querydispatchorderSearch(data) {
    return this._getData({
      url: '/dispatchorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 深圳调度单-新增
  adddispatchorderData(data) {
    return this._getData({
      url: '/dispatchorder/',
      method: 'POST',
      data
    })
  },
  // 深圳调度单-修改
  editdispatchorderData(data) {
    return this._getData({
      url: '/dispatchorder/',
      method: 'PUT',
      data
    })
  },
  // 深圳调度单-删除
  deletedispatchorderData(codeNo) {
    return this._getData({
      url: '/dispatchorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 深圳调度单-获取编号
  getdispatchorderCode(codeNo) {
    return this._getCode('SZDD')
  },
  // 深圳调度单-获取单条
  searchDispatchOrderData(dispatchOrderCode) {
    return this._getData({
      url: '/dispatchorder/searchOne?dispatchOrderCode=' + dispatchOrderCode,
      method: 'GET'
    })
  },
  // 深圳调度单委托单-查询
  querydispatchentrustSearch(data) {
    return this._getData({
      url: '/dispatchentrust/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 深圳待选调度单-查询
  querydispatchentrustSearchEntrusts(data) {
    return this._getData({
      url: '/dispatchentrust/searchEntrusts',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 深圳生成选中数据的时候调用
  insertBatchdispatchentrustData(data) {
    return this._getData({
      url: '/dispatchentrust/insertBatch',
      method: 'POST',
      data
    })
  }
}
