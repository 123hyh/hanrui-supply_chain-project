export default {
  //分页查询关务集装箱基础分页信息
  queryContainer(data) {
    return this._getData({
      url: `/container/search`,
      method: 'POST',
      data
    })
  },

  // 关务集装箱分页查询
  getContainerList(data) {
    return this._getData({
      url: `/container/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },

  //关务集装箱获取编码
  getContainerCode() {
    return this._getData({
      url: `/container/containerCode`,
      method: 'GET'
    })
  },

  // 关务集装箱新增 修改
  changeContainerData(data = {}, method = 'POST') {
    return this._getData({
      url: `/container/`,
      method,
      data
    })
  },
  
  // 删除集装箱舱单数据
  deleteContainerData(code) {
    return this._getData({
      url: `/container/${code}`,
      method: 'DELETE'
    })
  }
}
