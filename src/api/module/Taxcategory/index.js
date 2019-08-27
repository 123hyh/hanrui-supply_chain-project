export default {
  // 税种分页查询
  getTaxCategoryList(data) {
    return this._getData({
      url: `/taxcategory/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //税种获取编码
  getTaxCategoryCode() {
    return this._getData( {
      url: `/taxcategory/billCode`,
      method: 'GET'
    } )
  },
  // 税种新增 修改
  changeTaxCategoryData(data = {}, method = 'POST') {
    return this._getData( {
      url: `/taxcategory/`,
      method,
      data
    } )
  },
  // 删除税种数据
  deleteTaxCategoryData(code) {
    return this._getData( {
      url: `/taxcategory/${code}`,
      method: 'DELETE'
    } )
  }
}
