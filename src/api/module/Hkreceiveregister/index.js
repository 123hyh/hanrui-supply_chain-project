export default {
  // 新增 修改 香港收货登记信息
  changeHkreceiveRegisterData(data = {}, method = 'POST') {
    return this._getData({
      url: `/hkreceiveregister/${method === 'POST' ? 'addAll' : ''}`,
      method,
      data
    })
  },
  // 获取香港收货登记子表 列表
  getHkreceiveRegisterItemList(data) {
    return this._getData({
      url: `/hkreceiveregisteritem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港收货登记子表 新增修改
  changeHkreceiveRegisterItemList(data = {}, method = 'POST') {
    return this._getData({
      url: `/hkreceiveregisteritem/`,
      method,
      data
    })
  },
  deleteHkreceiveRegisterItem(code) {
    return this._getData({
      url: `/hkreceiveregisteritem/${code}`,
      method: 'DELETE'
    })
  },
  searchHkreceiveRegisterItemOneData(code) {
    return this._getData({
      url: `/hkreceiveregisteritem/searchOne?itemCode=${code}`,
      method: 'GET'
    })
  },

  // 香港收货登记列表获取
  getHkreceiveRegisterList(data) {
    let options = {
      url: `/hkreceiveregister/search`,
      method: 'POST',
      data: this._handlePage(data)
    }
    return this._getData(options)
  },
  // 香港收货登记 - 查询单条
  searchOnehkreceiveregisterData(codeNo) {
    return this._getData({
      url: `/hkreceiveregister/searchOne/${codeNo}`,
      method: 'GET'
    })
  },
  // 香港收货登记 一条数据
  deleteHkreceiveRegister(code) {
    return this._getData({
      url: `/hkreceiveregister/${code}`,
      method: 'DELETE'
    })
  },
  // 香港收货登记 获取新增编码
  getHkreceiveRegisterNo() {
    return this._getCode('SHDJ')
  }
}
