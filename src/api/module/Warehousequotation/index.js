export default {
  // 仓储报价单 - 查询列表
  querywarehousequotationSearch(data) {
    return this._getData({
      url: '/warehousequotation/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 仓储报价单-新增
  addwarehousequotationData(data) {
    return this._getData({
      url: '/warehousequotation/',
      method: 'POST',
      data
    })
  },
  // 仓储报价单-修改
  editwarehousequotationData(data) {
    return this._getData({
      url: '/warehousequotation/',
      method: 'PUT',
      data
    })
  },
  // 仓储报价单-删除
  deletewarehousequotationData(codeNo) {
    return this._getData({
      url: '/warehousequotation/' + codeNo,
      method: 'DELETE'
    })
  },
  // 仓储报价单-加载编码
  getCodewarehousequotation() {
    return this._getCode('CZBJ')
  },
  // 仓储报价单 - 查询单条
  searchOnewarehousequotationData(billCode) {
    return this._getData({
      url: `/warehousequotation/searchOne?billCode=${billCode}`,
      method: 'GET'
    })
  }
}
