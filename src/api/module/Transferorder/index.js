export default{
    // 分页查询转款单
    getSingleTurnParagraph(data) {
      return this._getData({
        url: `/transferorder/search`,
        method: 'POST',
        data: this._handlePage(data)
      })
    },
}