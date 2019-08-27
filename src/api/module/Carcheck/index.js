export default{
   // 查车登记分页查询
   getCarCheckList(data) {
    return this._getData({
      url: `/carcheck/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查车登记获取编码
  getCarCheckCode() {
    return this._getData({
      url: `/carcheck/carCheckCode`,
      method: 'GET'
    })
  },
  // 查车登记新增 修改
  changeCarCheckData(data = {}, method = 'POST') {
    return this._getData({
      url: `/carcheck/`,
      method,
      data
    })
  },
  // 删除查车登记数据
  deleteCarCheckData(code) {
    return this._getData({
      url: `/carcheck/${code}`,
      method: 'DELETE'
    })
  },
}