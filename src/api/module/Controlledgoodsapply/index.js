export default {
  // 管制品申请表-分页查询
  getControlledGoodsData(data) {
    return this._getData({
      url: '/controlledgoodsapply/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 管制品申请表 - 删除
  deleteControlledGoods(controlledGoodsCode) {
    return this._getData({
      url: '/controlledgoodsapply/' + controlledGoodsCode,
      method: 'DELETE'
    })
  },
  // 管制品申请表 - 保存表单
  saveControlledGoodsForm(data = {}, method = 'POST') {
    return this._getData({
      url: `/controlledgoodsapply/`,
      method,
      data
    })
  },
  // 管制品申请表 - 修改表单
  editControlledGoodsForm(data) {
    return this._getData({
      url: `/controlledgoodsapply/`,
      method: 'PUT',
      data
    })
  },
  // 管制品申请表 - 修改 - 查询当条信息
  getControlledGoodsOneData(code) {
    return this._getData({
      url: '/controlledgoodsapply/searchOne?controlledGoodsCode=' + code,
      method: 'GET'
    })
  },
  // 管制品申请表 - 新增表单 - 获取单据编号
  getControlledGoodsNo() {
    return this._getCode('GZPX')
  }
}
