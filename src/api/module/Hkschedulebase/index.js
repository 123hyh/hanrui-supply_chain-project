export default {
  //  香港上货计划导出
  exportHkschedulerele(billNo) {
    return this._getData({
      url: `/hkschedulebase/export/${billNo}`,
      method: 'GET',
      responseType: 'blob'
    })
  },

  //保存香港上货计划单基本信息
  addHkschedulebase(data) {
    return this._getData({
      url: `/hkschedulebase/`,
      method: 'POST',
      data
    })
  },
  //修改香港上货计划单基本信息
  updateHkschedulebase(data) {
    return this._getData({
      url: `/hkschedulebase/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港上货计划单基本信息
  queryHkschedulebase(data) {
    return this._getData({
      url: `/hkschedulebase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条香港上货计划单基本信息
  getHkschedulebase(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulebase/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除香港上货计划单基本信息
  removeHkschedulebase(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulebase/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  },
  // 香港上货计划基础信息分页查询
  getHkschedulcheBaseList(data) {
    return this.queryHkschedulebase(data)
  },
  //保存香港上货计划单核对信息
  addHkschedulcheckinginfo(data) {
    return this._getData({
      url: `/hkschedulcheckinginfo/`,
      method: 'POST',
      data
    })
  },
  //修改香港上货计划单核对信息
  updateHkschedulcheckinginfo(data) {
    return this._getData({
      url: `/hkschedulcheckinginfo/`,
      method: 'PUT',
      data
    })
  },
  //分页查询香港上货计划单核对信息
  queryHkschedulcheckinginfo(data) {
    return this._getData({
      url: `/hkschedulcheckinginfo/search`,
      method: 'POST',
      data
    })
  },
  //查询当条香港上货计划单核对信息
  getHkschedulcheckinginfo(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulcheckinginfo/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除香港上货计划单核对信息
  removeHkschedulcheckinginfo(scheduleBaseCode) {
    return this._getData({
      url: `/hkschedulcheckinginfo/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  }
}
