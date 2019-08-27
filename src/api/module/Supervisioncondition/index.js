export default{
  
  // 关务监管条件分页查询
  getSupervisionConditionList(data) {
    return this._getData({
      url: `/supervisioncondition/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //监管条件获取编码
  getSupervisionConditionCode() {
    return this._getData({
      url: `/supervisioncondition/billCode`,
      method: 'GET'
    })
  },
  // 监管条件新增 修改
  changeSupervisionConditionData(data = {}, method = 'POST') {
    return this._getData({
      url: `/supervisioncondition/`,
      method,
      data
    })
  },
  // 删除监管条件数据
  deleteSupervisionConditionData(code) {
    return this._getData({
      url: `/supervisioncondition/${code}`,
      method: 'DELETE'
    })
  },
}