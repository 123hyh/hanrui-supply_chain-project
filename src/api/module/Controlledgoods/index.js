export default {
  // 管制品清单分页查询
  getControlledList(data) {
    return this._getData({
      url: `/controlledgoods/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //管制品清单获取编码
  getControlledCode() {
    return this._getData({
      url: `/controlledgoods/controlledGoodsCode`,
      method: 'GET'
    })
  },
  // 管制品清单新增 修改
  changeControlledData(data = {}, method = 'POST') {
    return this._getData({
      url: `/controlledgoods/`,
      method,
      data
    })
  },
  // 删除管制品清单数据
  deleteControlledData(code) {
    return this._getData({
      url: `/controlledgoods/${code}`,
      method: 'DELETE'
    })
  }
}
