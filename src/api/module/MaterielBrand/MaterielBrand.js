export default {
  getMaterielbrandData(data) {
    return this._getData({
      url: `/materielbrand/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}
