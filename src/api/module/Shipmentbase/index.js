export default {
  // 深圳发运单导出
  exportShipmentbase(billNo) {
    return this._getData({
      url: `/shipmentbase/export/${billNo}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  // 保存深圳发运单基础信息
  saveShipmentbase(data) {
    return this._getData({
      url: `/shipmentbase/`,
      method: 'POST',
      data
    })
  },
  // 修改深圳发运单基础信息
  updateShipmentbase(data) {
    return this._getData({
      url: `/shipmentbase/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询深圳发运单基础信息
  queryShipmentbase(data) {
    return this._getData({
      url: `/shipmentbase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询当条深圳发运单基础信息
  getShipmentbase(shipmentBaseCode) {
    return this._getData({
      url: `/shipmentbase/searchOne?shipmentBaseCode=${shipmentBaseCode}`,
      method: 'GET'
    })
  },
  // 删除深圳发运单基础信息
  removeShipmentbase(shipmentBaseCode) {
    return this._getData({
      url: `/shipmentbase/${shipmentBaseCode}`,
      method: 'DELETE'
    })
  },
  // 保存深圳发运单子表-物料信息
  saveShipmentmateriel(data) {
    return this._getData({
      url: `/shipmentmateriel/`,
      method: 'POST',
      data
    })
  },
  // 修改深圳发运单子表-物料信息
  updateShipmentmateriel(data) {
    return this._getData({
      url: `/shipmentmateriel/`,
      method: 'PUT',
      data
    })
  },
  // 分页查询深圳发运单子表-物料信息
  queryShipmentmateriel(data) {
    return this._getData({
      url: `/shipmentmateriel/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 查询深圳当条发运单子表-物料信息
  getShipmentmateriel(itemCode) {
    return this._getData({
      url: `/shipmentmateriel/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  // 删除深圳发运单子表-物料信息
  removeShipmentmateriel(itemCode) {
    return this._getData({
      url: `/shipmentmateriel/${itemCode}`,
      method: 'DELETE'
    })
  }
}
