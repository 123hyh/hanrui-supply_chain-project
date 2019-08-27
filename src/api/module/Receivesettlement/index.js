export default
{
  // 应收结算单 - 加载编码
  getreceivesettlementCode() {
    return this._getCode('YSJS')
  },
  // 应收结算单 获取计费项目
  getReceiveSettlementProject({ billNo, delegeteBillNo } = {}) {
    return this._getData({
      url: `/receivesettlement/${billNo}/${delegeteBillNo}`,
      method: 'GET'
    })
  },
  // 应收结算单 - 查询
  queryreceivesettlementSearch(data) {
    return this._getData({
      url: '/receivesettlement/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 应收结算单 - 新增
  addreceivesettlementData(data) {
    return this._getData({
      url: '/receivesettlement/',
      method: 'POST',
      data
    })
  },
  // 应收结算单 - 修改
  editreceivesettlementData(data) {
    return this._getData({
      url: '/receivesettlement/',
      method: 'PUT',
      data
    })
  },
  // 应收结算单 - 删除
  deletereceivesettlementData(codeNo) {
    return this._getData({
      url: '/receivesettlement/' + codeNo,
      method: 'DELETE'
    })
  },
  // 应收结算单 - 物料信息 - 查询
  queryreceivesettlementMaterielSearch(data) {
    return this._getData({
      url: '/receivesettlementmateriel/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 应收结算单 - 物料信息 - 新增
  addreceivesettlementMaterielData(data) {
    return this._getData({
      url: '/receivesettlementmateriel/',
      method: 'POST',
      data
    })
  },
  // 应收结算单 - 物料信息 - 修改
  editreceivesettlementMaterielData(data) {
    return this._getData({
      url: '/receivesettlementmateriel/',
      method: 'PUT',
      data
    })
  },
  // 应收结算单 - 物料信息 - 删除
  deletereceivesettlementMaterielData(codeNo) {
    return this._getData({
      url: '/receivesettlementmateriel/' + codeNo,
      method: 'DELETE'
    })
  },
  // 应收结算单 - 物料信息 - 批量新增
  batchreceivesettlementMaterielData(data) {
    return this._getData({
      url: '/receivesettlementmateriel/insertBatch',
      method: 'POST',
      data
    })
  },
  // 应收结算单 - 计费信息 - 查询
  queryreceivesettlementFeeSearch(data) {
    return this._getData({
      url: '/receivesettlementfee/search',
      method: 'POST',
      data: this._handlePage(data)
    })
  },
  // 应收结算单 - 计费信息 - 新增
  addreceivesettlementFeeData(data) {
    return this._getData({
      url: '/receivesettlementfee/',
      method: 'POST',
      data
    })
  },
  // 应收结算单 - 计费信息 - 修改
  editreceivesettlementFeeData(data) {
    return this._getData({
      url: '/receivesettlementfee/',
      method: 'PUT',
      data
    })
  },
  // 应收结算单 - 计费信息 - 删除
  deletereceivesettlementFeeData(codeNo) {
    return this._getData({
      url: '/receivesettlementfee/' + codeNo,
      method: 'DELETE'
    })
  },
  // 应收结算单 - 计费信息 - 批量新增
  batchreceivesettlementFeeData(data) {
    return this._getData({
      url: '/receivesettlementfee/insertBatch',
      method: 'POST',
      data
    })
  },
}