export default {
  //销售订单 - 列表 - 查询
  salesOrderSearch(data) {
    return this._getData({
      url: '/salesorder/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 销售订单 - 列表 - 删除
  deleteSalesOrderList(codeNo) {
    return this._getData({
      url: '/salesorder/' + codeNo,
      method: 'DELETE'
    })
  },
  // 销售订单 - 获取单据编号
  getSalesOrderNo() {
    return this._getCode('XSDD')
  },
  // 销售订单 - 保存表单
  saveSalesOrderForm(data) {
    return this._getData({
      url: `/salesorder/`,
      method: 'POST',
      data
    })
  },
  // 销售订单 - 获取当条数据
  getSalesOrderOneData(id) {
    return this._getData({
      url: '/salesorder/' + id,
      method: 'GET'
    })
  },
  // 销售订单 - 修改表单
  editSalesOrder(data) {
    return this._getData({
      url: `/salesorder/`,
      method: 'PUT',
      data
    })
  },
  // 销售订单 - 装箱单 -保存
  saveSalesPackageData(data) {
    return this._getData({
      url: `/salespackage/`,
      method: 'POST',
      data
    })
  },
  // 销售订单 - 装箱单 - 修改表单
  editSalesPackageData(data) {
    return this._getData({
      url: `/salespackage/`,
      method: 'PUT',
      data
    })
  },
  // 销售订单 - 装箱单 - 删除
  deleteSalesPackageData(id) {
    return this._getData({
      url: `/salespackage/` + id,
      method: 'DELETE'
    })
  },
  // 销售订单 - 装箱单 - 分页查询
  getSalesPackage(data) {
    return this._getData({
      url: '/salespackage/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 销售订单 - 装箱单 - 获取当条数据
  getSalesPackageOneData(itemCode) {
    return this._getData({
      url: '/salespackage/searchOne/' + itemCode,
      method: 'GET'
    })
  },
  // 销售订单 - 计费项目 - 分页查询
  getSalesFeeProject(data) {
    return this._getData({
      url: '/salesfeeproject/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 销售订单- 计费项目 - 保存
  saveSalesfeeproject(data) {
    return this._getData({
      url: `/salesfeeproject/`,
      method: 'POST',
      data
    })
  },
  // 销售订单- 计费项目 - 修改
  editSalesfeeproject(data) {
    return this._getData({
      url: `/salesfeeproject/`,
      method: 'PUT',
      data
    })
  },
  // 销售订单- 计费项目 - 查询当条信息
  getSalesFeeOneData(id) {
    return this._getData({
      url: `/salesfeeproject/searchOne?itemCode=` + id,
      method: 'GET'
    })
  },
  // 销售订单- 计费项目 - 删除
  deleteSalesFeeOneData(id) {
    return this._getData({
      url: `/salesfeeproject/` + id,
      method: 'DELETE'
    })
  }
}
