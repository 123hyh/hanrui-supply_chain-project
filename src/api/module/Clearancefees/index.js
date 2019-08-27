export default{
  
  // 关务清关费用分页查询
  getClearanceFeesList(data) {
    return this._getData({
      url: `/clearancefees/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //清关费用获取编码
  getClearanceFeesCode() {
    return this._getData({
      url: `/clearancefees/clearanceFeesCode`,
      method: 'GET'
    })
  },
  // 清关费用新增 修改
  changeClearanceFeesData(data = {}, method = 'POST') {
    return this._getData({
      url: `/clearancefees/`,
      method,
      data
    })
  },
  // 删除清关费用数据
  deleteClearanceFeesData(code) {
    return this._getData({
      url: `/clearancefees/${code}`,
      method: 'DELETE'
    })
  },
}