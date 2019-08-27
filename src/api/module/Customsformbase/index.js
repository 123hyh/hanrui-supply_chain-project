import qs from 'qs'
export default {
  // 报关单 读取 报关计划商品信息
  getImportCustomGoodsList(data = {}) {
    return this._getData({
      url: `/customsformbase/transfer?${qs.stringify(data)}`,
      method: 'GET'
    })
  },
  // 导出报关单 invoice
  exportINVOICE(code) {
    return this._getData({
      url: `/customsformbase/export/invoice/${code}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  // 导出报关单集装箱
  exportContainer(code) {
    return this._getData({
      url: `/customsformbase/export/packinglist/${code}`,
      method: 'GET',
      responseType: 'blob'
    })
  },

  getCustomsFormBase(code) {
    return this._getData({
      url: `/customsformbase/${code}`,
      method: 'GET'
    })
  },

  // 进/出口报关单-查询
  querycustomsformbaseSearch(data) {
    return this._getData({
      url: '/customsformbase/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 进/出口报关单-新增
  addcustomsformbaseData(data) {
    return this._getData({
      url: '/customsformbase/',
      method: 'POST',
      data
    })
  },
  // 进/出口报关单-修改
  editcustomsformbaseData(data) {
    return this._getData({
      url: '/customsformbase/',
      method: 'PUT',
      data
    })
  },
  // 进/出口报关单-删除
  deletecustomsformbaseData(codeNo) {
    return this._getData({
      url: '/customsformbase/' + codeNo,
      method: 'DELETE'
    })
  },
  // 进/出口报关单-获取编号
  getcustomsformbaseCode() {
    return this._getCode('BGXX')
  },
  // 进/出口报关单-获取单条
  searchOnecustomsformbaseData(codeNo) {
    return this._getData({
      url: '/customsformbase/searchOne?customsFormCode=' + codeNo,
      method: 'GET'
    })
  }
}
