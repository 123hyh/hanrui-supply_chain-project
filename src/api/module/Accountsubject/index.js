export default {
  // 所有会计科目 - 查询
  getaccountsubject() {
    return this._getData({
      url: '/accountsubject/search',
      method: 'GET'
    })
  },
  // 会计科目 - 单挑
  oneaccountsubject(code) {
    return this._getData({
      url: '/accountsubject/' + code,
      method: 'GET'
    })
  },
  // 会计科目 - 新增
  addaccountsubject(data) {
    return this._getData({
      url: '/accountsubject/',
      method: 'POST',
      data
    })
  },
  // 会计科目 - 修改
  updateaccountsubject(data) {
    return this._getData({
      url: '/accountsubject/',
      method: 'PUT',
      data
    })
  },
  // 会计科目 - 删除
  deleteaccountsubject(code) {
    return this._getData({
      url: '/accountsubject/' + code,
      method: 'DELETE'
    })
  }
}
