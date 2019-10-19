export default {
  // 获取单条基础信息
  getMaterielbaseData(materielCode) {
    return this._getData({
      url: `/materielbase/${materielCode}`,
      method: "GET"
    });
  },

  // 物料基础信息获取列表
  getMaterielBaseList(data) {
    return this._getData({
      url: `/materielbase/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  // 删除 物料基础信息
  deleteMaterielBase(code) {
    return this._getData({
      url: `/materielbase/${code}`,
      method: "DELETE"
    });
  },

  //	物料基础信息新增的编码
  getMaterielBaseCode() {
    return this._getCode("WLJC");
  },

  // 新增 修改 物料基本信息
  changeMaterielBaseData(data, method) {
    return this._getData({
      url: `/materielbase/`,
      method,
      data
    });
  },

  // 获取所有物料海关信息列表
  getMaterielCustomAll() {
    return this._getData({
      url: `/materielcustom/search`,
      method: "POST",
      data: {}
    });
  },

  // 获取物料海关信息列表
  getMaterielCustomList(data) {
    return this._getData({
      url: `/materielcustom/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  // 修改 删除 物料海关数据
  changeMaterielCustomData(data, method) {
    return this._getData({
      url: `/materielcustom/`,
      method,
      data
    });
  },

  // 删除物料海关数据
  deleteMaterielCustomData(code) {
    return this._getData({
      url: `/materielcustom/${code}`,
      method: "DELETE"
    });
  },

  // 获取物料财务列表
  getMaterielFinanceList(data) {
    return this._getData({
      url: `/materielfinance/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  // 新增 || 修改 物料财务数据
  changeMaterielFinanceData(data, method) {
    return this._getData({
      url: `/materielfinance/`,
      method,
      data
    });
  },

  // 删除 物料财务数据
  deleteMaterielFinanceData(code) {
    return this._getData({
      url: `/materielfinance/${code}`,
      method: "DELETE"
    });
  },

  // 获取 物料物流信息列表
  getMaterielLogisticsList(data) {
    return this._getData({
      url: `/materiellogistics/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  // 新增 物流物料
  changeMaterielLogisticsData(data, method) {
    return this._getData({
      url: `/materiellogistics/`,
      method,
      data
    });
  },

  // 删除 物流物料
  deletMaterielLogisticsData(code) {
    return this._getData({
      url: `/materiellogistics/${code}`,
      method: "DELETE"
    });
  },

  // 物料品牌产地表分页查询
  getBrandOriginList(data) {
    return this._getData({
      url: `/brandorigin/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  //物料品牌产地表获取新增 编码
  getBrandOriginCode() {
    return this._getData({
      url: `/brandorigin/brandOriginCode`,
      method: "GET"
    });
  },

  // 物料品牌产地表新增 修改
  changeBrandOriginData(data = {}, method = "POST") {
    return this._getData({
      url: `/brandorigin/`,
      method,
      data
    });
  },

  // 删除物料品牌产地表数据
  deleteBrandOriginData(code) {
    return this._getData({
      url: `/brandorigin/${code}`,
      method: "DELETE"
    });
  },

  // 关务物料税号分页查询
  getCustomsMaterielList(data) {
    return this._getData({
      url: `/customsmateriel/search`,
      method: "POST",
      data: this._handlePage(data)
    });
  },

  //关务物料税号获取编码
  getCustomsMaterielCode() {
    return this._getData({
      url: `/customsmateriel/customsMaterielCode`,
      method: "GET"
    });
  },

  // 关务物料税号新增 修改
  changeCustomsMaterielData(data = {}, method = "POST") {
    return this._getData({
      url: `/customsmateriel/`,
      method,
      data
    });
  },

  // 删除关务物料税号数据
  deleteCustomsMaterielData(code) {
    return this._getData({
      url: `/customsmateriel/${code}`,
      method: "DELETE"
    });
  },

  // 银行审核 委托方，承运商，客户，供应商，公司
  opcodeBankData(data) {
    return this._getData({
      url: `/bankinfo/billflow/verify`,
      method: "PUT",
      data: this._handlePage(data)
    });
  },
  // 报关申报要素查询
  getReportingElements(code) {
    return this._getData({
      url: `/materielbase/declarefactor/${code}`,
      method: "POST"
    });
  }
};
