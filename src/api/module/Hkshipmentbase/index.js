export default {
  // 香港发运单导出
  exportHkshipment(billNO) {
    return this._getData({
      url: `/hkshipmentbase/export/${billNO}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  
  // 保存香港发运单基础信息
  saveHkshipmentbase(data) {
    return this._getData({
      url: `/hkshipmentbase/`,
      method: 'POST',
      data
    })
  },

  // 修改香港发运单基础信息
  updateHkshipmentbase(data) {
    return this._getData({
      url: `/hkshipmentbase/`,
      method: 'PUT',
      data
    })
  },

  // 分页查询香港发运单基础信息
  queryHkshipmentbase(data) {
    return this._getData({
      url: `/hkshipmentbase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 查询当条香港发运单基础信息
  getHkshipmentbase(shipmentBaseCode) {
    return this._getData({
      url: `/hkshipmentbase/searchOne?shipmentBaseCode=${shipmentBaseCode}`,
      method: 'GET'
    })
  },

  // 删除香港发运单基础信息
  removeHkshipmentbase(shipmentBaseCode) {
    return this._getData({
      url: `/hkshipmentbase/${shipmentBaseCode}`,
      method: 'DELETE'
    })
  },

  // 保存香港发运单子表-物料信息
  saveHkshipmentmateriel(data) {
    return this._getData({
      url: `/hkshipmentmateriel/`,
      method: 'POST',
      data
    })
  },

  // 修改香港发运单子表-物料信息
  updateHkshipmentmateriel(data) {
    return this._getData({
      url: `/hkshipmentmateriel/`,
      method: 'PUT',
      data
    })
  },

  // 分页查询香港发运单子表-物料信息
  queryHkshipmentmateriel(data) {
    return this._getData({
      url: `/hkshipmentmateriel/search`,
      method: 'POST',
      data
    })
  },

  // 查询香港当条发运单子表-物料信息
  getHkshipmentmateriel(itemCode) {
    return this._getData({
      url: `/hkshipmentmateriel/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },

  // 删除香港发运单子表-物料信息
  removeHkshipmentmateriel(itemCode) {
    return this._getData({
      url: `/hkshipmentmateriel/${itemCode}`,
      method: 'DELETE'
    })
  },

  // 香港发运单 - 分页查询
  getHkShipmentBase(data) {
    return this.queryHkshipmentbase(data)
  }
}
