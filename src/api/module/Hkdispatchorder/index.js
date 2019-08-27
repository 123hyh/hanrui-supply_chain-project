export default {
  //香港调度单 - 查询
  queryhkdispatchorderSearch(data) {
    return this._getData({
      url: '/hkdispatchorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港调度单-新增
  addhkdispatchorderData(data) {
    return this._getData({
      url: '/hkdispatchorder/',
      method: 'POST',
      data
    })
  },
  // 香港调度单-修改
  edithkdispatchorderData(data) {
    return this._getData({
      url: '/hkdispatchorder/',
      method: 'PUT',
      data
    })
  },
  // 香港调度单-删除
  deletehkdispatchorderData(codeNo) {
    return this._getData({
      url: '/hkdispatchorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 香港调度单-获取编号
  gethkdispatchorderCode() {
    return this._getCode('HKDD')
  },
  // 香港调度单-获取单条
  searchhkdispatchorderOneData(dispatchOrderCode) {
    return this._getData({
      url: '/hkdispatchorder/' + dispatchOrderCode,
      method: 'GET'
    })
  },
  // 香港待选调度单-查询
  queryhkdispatchentrustSearchEntrusts(data) {
    return this._getData({
      url: '/hkdispatchentrust/searchEntrusts',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港已选调度单-查询
  queryhkdispatchentrustSearch(data) {
    return this._getData({
      url: '/hkdispatchentrust/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港生成选中数据的时候调用
  insertBatchhkdispatchentrustData(data) {
    return this._getData({
      url: '/hkdispatchentrust/insertBatch',
      method: 'POST',
      data
    })
  }
}
