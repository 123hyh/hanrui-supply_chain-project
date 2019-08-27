export default{
  
  // 征免性质分页查询
  getExemptionList(data) {
    return this._getData({
      url: `/exemption/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //征免性质获取编码
  getExemptionCode() {
    return this._getData({
      url: `/exemption/exemptionCode`,
      method: 'GET'
    })
  },
  // 征免性质新增 修改
  changeExemptionData(data = {}, method = 'POST') {
    return this._getData({
      url: `/exemption/`,
      method,
      data
    })
  },
  // 删除征免性质数据
  deleteExemptionData(code) {
    return this._getData({
      url: `/exemption/${code}`,
      method: 'DELETE'
    })
  },
}