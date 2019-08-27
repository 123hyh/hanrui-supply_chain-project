export default{
  getMaterialOriginData(data){
    return this._getData({
      url: `/materielorigin/search`,
      method: 'POST',
      data: this._handlePage(data)
    })
  }
}