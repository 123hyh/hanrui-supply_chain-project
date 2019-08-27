export default {
  //保存深圳入库单
  addSzinstore(data = {}) {
    return this._getData({
      url: '/szinstore/addAll',
      method: 'POST',
      data
    })
  },
  //修改深圳入库单
  updateSzinstore(data) {
    return this._getData({
      url: '/szinstore/',
      method: 'PUT',
      data
    })
  },
  //分页查询深圳入库单
  querySzinstore(data) {
    return this._getData({
      url: '/szinstore/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条深圳入库单
  getSzinstore(billNo) {
    return this._getData({
      url: `/szinstore/${billNo}`,
      method: 'GET'
    })
  },
  //删除深圳入库单
  removeSzinstore(godownEntryCode) {
    return this._getData({
      url: `/szinstore/${godownEntryCode}`,
      method: 'DELETE'
    })
  },
  // 深圳入库单新增获取code
  getSzinstoreCode() {
    return this._getData({
      url: `/common/getCodeNo?bizCode=SZRK`,
      method: 'GET'
    })
  },
  //保存深圳入库单子表-基本信息
  addSzinstoreItem(data) {
    return this._getData({
      url: `/szinstoreitem/`,
      method: 'POST',
      data
    })
  },
  //修改深圳入库单子表-基本信息
  updateSzinstoreItem(data) {
    return this._getData({
      url: `/szinstoreitem/`,
      method: 'PUT',
      data
    })
  },
  //分页查询深圳入库单子表-基本信息
  querySzinstoreItem(data) {
    return this._getData({
      url: `/szinstoreitem/search`,
      method: 'POST',
      data
    })
  },
  //查询当条深圳入库单子表-基本信息
  getSzinstoreItem(itemCode) {
    return this._getData({
      url: `/szinstoreitem/searchOne?itemCode=${itemCode}`,
      method: 'GET'
    })
  },
  //删除深圳入库单子表-基本信息
  removeSzinstoreItem(itemCode) {
    return this._getData({
      url: `/szinstoreitem/${itemCode}`,
      method: 'DELETE'
    })
  },
  // 深圳收货单 获取列表
  getSzreceivingList(data) {
    return this._getData({
      url: `/szreceiving/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 香港收货单 新增修改
  changeSzreceivingData(data, method = 'POST') {
    return this._getData({
      url: `/szreceiving/${method === 'POST' ? 'addAll' : ''}`,
      method,
      data
    })
  },
  // 深圳收货单新增获取code
  getSzreceivingCode() {
    return this._getCode('SZSH')
  },
  // 删除 深圳收货单 数据
  deleteSzreceivingData(code = '') {
    return this._getData({
      url: `/szreceiving/${code}`,
      method: 'DELETE'
    })
  },
  // 深圳收货单子表 列表获取
  getSzreceivingItemList(data) {
    return this._getData({
      url: `/szreceivingitem/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 深圳收货单子表 新增 修改
  changeSzreceivingItemData(data = {}, method = 'POST') {
    return this._getData({
      url: `/szreceivingitem/`,
      method,
      data
    })
  },
  // 深圳收货单子表 单挑
  getSzreceivingItemData(code) {
    return this._getData({
      url: `/szreceivingitem/${code}`,
      method: 'GET'
    })
  },
  // 删除 深圳收货单子表 数据
  deleteSzreceivingItemData(code) {
    return this._getData({
      url: `/szreceivingitem/${code}`,
      method: 'DELETE'
    })
  }
}
