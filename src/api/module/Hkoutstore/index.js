export default {
  // 导出香港出库单
  exportHkoutstoreEntry(billNo) {
    return this._getData({
      url: `/hkoutstore/export/${billNo}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  // 香港出库单新增获取code
  getHkoutstoreEntryCode() {
    return this._getCode('HKCK')
  },
  // 香港出库单新增获取code
  getSzoutstoreCode() {
    return this._getCode('SZCK')
  },
  //保存香港出库主表
  addHkoutstore(data) {
    return this._getData({
      url: `/hkoutstore/addAll`,
      method: 'POST',
      data
    })
  },
  //修改香港出库主表
  updateHkoutstore(data) {
    return this._getData({
      url: `/hkoutstore/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港出库主表
  queryHkoutstore(data) {
    return this._getData({
      url: `/hkoutstore/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条香港出库主表
  getHkoutstore(billNo) {
    return this._getData({
      url: `/hkoutstore/searchOne?billNo=${billNo}`,
      method: 'GET'
    })
  },
  //删除香港出库主表
  removeHkoutstore(billNo) {
    let options = {
      url: `/hkoutstore/${billNo}`,
      method: 'DELETE'
    }
    return this._getData(options)
  },
  //保存香港出库子表
  addHkoutstoreitem(data) {
    return this._getData({
      url: `/hkoutstoreitem/`,
      method: 'POST',
      data
    })
  },
  //修改香港出库子表
  updateHkoutstoreitem(data) {
    return this._getData({
      url: `/hkoutstoreitem/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港出库子表
  queryHkoutstoreitem(data) {
    return this._getData({
      url: `/hkoutstoreitem/search`,
      method: 'POST',
      data
    })
  },
  //查询当条香港出库子表
  getHkoutstoreitem(itemCode) {
    return this._getData({
      url: `/hkoutstoreitem/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  //删除香港出库子表
  removeHkoutstoreitem(itemCode) {
    return this._getData({
      url: `/hkoutstoreitem/${itemCode}`,
      method: 'DELETE'
    })
  }
}
