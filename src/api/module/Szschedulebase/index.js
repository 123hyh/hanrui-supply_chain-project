export default {
  // 分页查询深圳上货单计划基本信息
  querySzschedulebase(data) {
    return this._getData({
      url: `/szschedulebase/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  }, // 深圳上货计划导出
  exportSzschedulerele(billCode) {
    return this._getData({
      url: `/szschedulebase/export/${billCode}`,
      method: 'GET',
      responseType: 'blob'
    })
  },
  //保存深圳上货单计划相关信息
  addSzschedulerele(data) {
    return this._getData({
      url: `/schedulerele/`,
      method: 'POST',
      data
    })
  },
  //修改深圳上货单计划相关信息
  updateSzschedulerele(data) {
    return this._getData({
      url: `/schedulerele/`,
      method: 'PUT',
      data
    })
  },
  //分页查询深圳上货单计划相关信息
  querySzschedulerele(data) {
    return this._getData({
      url: `/schedulerele/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  //查询当条深圳上货单计划相关信息
  getSzschedulerele(scheduleBaseCode) {
    return this._getData({
      url: `/schedulerele/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除深圳上货单计划相关信息
  removeSzschedulerele(scheduleBaseCode) {
    return this._getData({
      url: `/schedulerele/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  },
  //保存深圳上货计划单基本信息
  addSzschedulebase(data) {
    return this._getData({
      url: `/szschedulebase/`,
      method: 'POST',
      data
    })
  },
  //修改深圳上货计划单基本信息
  updateSzschedulebase(data) {
    return this._getData({
      url: `/szschedulebase/`,
      method: 'PUT',
      data
    })
  },

  //查询当条深圳上货计划单基本信息
  getSzschedulebase(scheduleBaseCode) {
    return this._getData({
      url: `/szschedulebase/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除深圳上货计划单基本信息
  removeSzschedulebase(scheduleBaseCode) {
    return this._getData({
      url: `/szschedulebase/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  },
  //保存深圳上货计划单核对信息
  addSchedulcheckinginfo(data) {
    return this._getData({
      url: `/schedulcheckinginfo/`,
      method: 'POST',
      data
    })
  },
  //修改深圳上货计划单核对信息
  updateSchedulcheckinginfo(data) {
    return this._getData({
      url: `/schedulcheckinginfo/`,
      method: 'PUT',
      data
    })
  },
  //分页查询深圳上货计划单核对信息
  querySchedulcheckinginfo(data) {
    return this._getData({
      url: `/schedulcheckinginfo/search`,
      method: 'POST',
      data
    })
  },
  //查询当条深圳上货计划单核对信息
  getSchedulcheckinginfo(scheduleBaseCode) {
    return this._getData({
      url: `/schedulcheckinginfo/searchOne?scheduleBaseCode=${scheduleBaseCode}`,
      method: 'GET'
    })
  },
  //删除深圳上货计划单核对信息
  removeSchedulcheckinginfo(scheduleBaseCode) {
    return this._getData({
      url: `/schedulcheckinginfo/${scheduleBaseCode}`,
      method: 'DELETE'
    })
  }
}
