export default {
  // 物流仓储车辆信息表 - 查询列表
  queryvehicleinfoSearch(data) {
    return this._getData({
      url: '/vehicleinfo/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  // 物流仓储车辆信息表-新增 || 修改
  changeVehicleinfoData({ data, method = 'POST' } = {}) {
    return this._getData({
      url: '/vehicleinfo/',
      method,
      data
    })
  },

  // 物流仓储车辆信息表-删除
  deletevehicleinfoData(codeNo) {
    return this._getData({
      url: '/vehicleinfo/' + codeNo,
      method: 'DELETE'
    })
  },
  // 物流仓储车辆信息表-加载编码
  getvehicleinfoCode() {
    return this._getCode('WLCL')
  },
  // 物流仓储车辆信息表 - 查询单条
  searchOnevehicleinfoData(codeNo) {
    return this._getData({
      url: `/vehicleinfo/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  //分页查询仓储车辆信息
  queryVehicleinfo(data) {
    return this._getData({
      url: `/vehicleinfo/search`,
      method: 'POST',
      data
    })
  }
}
