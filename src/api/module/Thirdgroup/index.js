export default {
  // 第三方分页查询
  getThirdGroupList(data) {
    return this._getData({
      url: `/thirdgroup/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //第三方获取编码
  getThirdGroupCode() {
    return this._getData({
      url: `/thirdgroup/billCode`,
      method: 'GET'
    })
  },
  // 第三方新增 修改
  changeThirdGroupData(data = {}, method = 'POST') {
    return this._getData({
      url: `/thirdgroup/`,
      method,
      data
    })
  },
  // 删除第三方数据
  deleteThirdGroupData(code) {
    return this._getData({
      url: `/thirdgroup/${code}`,
      method: 'DELETE'
    })
  }
}
