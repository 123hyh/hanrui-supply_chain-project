export default {
  // 导出深圳出库单
  exportSzoutstoreData(billNo) {
    return this._getData({
      url: `/szoutstore/export/${billNo}`,
      method: 'GET',
      responseType: 'blob'
    })
  },

  // 保存深圳出库主表
  saveSzoutstore(data) {
    return this._getData({
      url: `/szoutstore/addAll`,
      method: 'POST',
      data
    })
  },
  // 修改深圳出库主表
  updateSzoutstore(data) {
    return this._getData({
      url: `/szoutstore/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询深圳出库主表
  querySzoutstore(data) {
    return this._getData({
      url: `/szoutstore/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条深圳出库主表
  getSzoutstore(billNo) {
    return this._getData({
      url: `/szoutstore/searchOne?billNo=${billNo}`,
      method: 'GET'
    })
  },
  // 删除深圳出库主表
  removeSzoutstore(billNo) {
    return this._getData({
      url: `/szoutstore/${billNo}`,
      method: 'DELETE'
    })
  },
  // 保存深圳出库子表
  saveSzoutstoreitem(data) {
    return this._getData({
      url: `/szoutstoreitem/`,
      method: 'POST',
      data
    })
  },
  // 修改深圳出库子表
  updateSzoutstoreitem(data) {
    return this._getData({
      url: `/szoutstoreitem/`,
      method: 'PUT',
      data
    })
  },
  //分页查询深圳出库子表
  querySzoutstoreitem(data) {
    return this._getData({
      url: `/szoutstoreitem/search`,
      method: 'POST',
      data
    })
  },
  // 查询当条深圳出库子表
  getSzoutstoreitem(itemCode) {
    return this._getData({
      url: `/szoutstoreitem/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  // 删除深圳出库子表
  removeSzoutstoreitem(itemCode) {
    return this._getData({
      url: `/szoutstoreitem/${itemCode}`,
      method: 'DELETE'
    })
  }
}
