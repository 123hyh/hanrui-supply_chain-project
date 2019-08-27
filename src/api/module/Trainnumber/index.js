export default {
  // 车次分页查询
  getTrainNumberList(data) {
    return this._getData({
      url: `/trainnumber/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //车次获取编码
  getTrainNumberCode() {
    return this._getData({
      url: `/trainnumber/trainNumberCode`,
      method: 'GET'
    })
  },
  // 车次新增 修改
  changeTrainNumberData(data = {}, method = 'POST') {
    return this._getData({
      url: `/trainnumber/`,
      method,
      data
    })
  },
  // 删除车次数据
  deleteTrainNumberData(code) {
    return this._getData({
      url: `/trainnumber/${code}`,
      method: 'DELETE'
    })
  },
  //分页查询车次
  queryTrainnumber(data) {
    return this.getTrainNumberList(data)
  }
}
