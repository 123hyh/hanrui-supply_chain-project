export default {
  // 分页查询无授信担保
  getNoEnsureManageList(data) {
    return this._getData({
      url: `/noensure/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 无担保授信 新增 修改
  changeNoensureData(data = {}, method = 'POST') {
    return this._getData({
      url: `/noensure/`,
      method,
      data
    })
  },
  // 无担保授信 删除
  deleteNoensureData(code = '') {
    return this._getData({
      url: `/noensure/${code}`,
      method: 'DELETE'
    })
  },
}
