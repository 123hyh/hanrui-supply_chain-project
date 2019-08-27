export default {
  // 抵押物管理 获取列表
  getPawnList(data) {
    return this._getData({
      url: `/pawn/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 抵押物 新增时获取编码
  getPawnCode() {
    return this._getCode('RZDY')
  },
  // 抵押物 新增 修改
  changePawnData(data = {}, method = 'POST') {
    return this._getData({
      url: `/pawn/`,
      method,
      data
    })
  },
  // 删除抵押物数据
  deletePawnData(code) {
    return this._getData({
      url: `/pawn/${code}`,
      method: 'DELETE'
    })
  },

}
