export default{
  
  // 监管方式分页查询
  getSupervisionModeList(data) {
    return this._getData({
      url: `/supervisionmode/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //监管方式获取编码
  getSupervisionModeCode() {
    return this._getCode('JGFS')
  },
  // 监管方式新增 修改
  changeSupervisionModeData(data = {}, method = 'POST') {
    return this._getData({
      url: `/supervisionmode/`,
      method,
      data
    })
  },
  // 删除监管方式数据
  deleteSupervisionModeData(code) {
    return this._getData({
      url: `/supervisionmode/${code}`,
      method: 'DELETE'
    })
  },
}