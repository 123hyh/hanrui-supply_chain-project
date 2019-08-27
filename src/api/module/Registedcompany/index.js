export default {
  // 网上客户认证
  queryregistedcompanySearch(data) {
    return this._getData({
      url: '/registedcompany/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}
