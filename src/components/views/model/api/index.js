import request from "../util/requestData";

export default {

  // 请求数据字典
  getEnum(data) {
    return request({
      url: `/dict/search/${data}`,
      method: "GET"
    });
  },

  // 查询数据列表
  getList(url, rule) {
    return request({
      url: `/${url}/search`,
      method: "POST",
      data: rule
    });
  },

  // 查询单条
  getOne(url, code) {
    return request({
      url: `/${url}/${code}`,
      method: "POST"
    });
  },

  // 删除单条
  delOne(url, code) {
    return request({
      url: `/${url}/${code}`,
      method: "DELETE"
    });
  },

  // get请求url
  getVal(url) {
    return request({
      url: `/${url}`,
      method: "GET"
    });
  },

  // post请求url
  postVal(url, rule) {
    return request({
      url: `/${url}`,
      method: "POST",
      data: rule
    });
  },

  // 查询汇率
  getExchangeRateBank(date) {
    return request({
      url: `exchangerate/${date}`,
      method: "GET"
    });
  },

  // 指定日期海关汇率
  getCustomsExchangerate(date) {
    return request({
      url: `exchangerate/custom/${date}`,
      method: "GET"
    });
  },

  // 委托订单 新增
  addEntrustorderData(data) {
    return request({
      url: '/entrustorder/',
      method: "POST",
      data
    });
  },

  // 委托订单 修改
  editEntrustorderData(data) {
    return request({
      url: '/entrustorder/',
      method: "PUT",
      data
    });
  },

  // 委托订单 商品 新增
  addEntrustorderGoodsData(data) {
    return request({
      url: '/entrustgoods/',
      method: "POST",
      data
    });
  },

  // 委托订单 商品 修改
  editEntrustorderGoodsData(data) {
    return request({
      url: '/entrustgoods/',
      method: "PUT",
      data
    });
  },

  // 委托订单 商品 删除
  delEntrustorderGoodsData(code, data) {
    return request({
      url: `/entrustgoods/${code}`,
      method: "DELETE"
    });
  },

  // 委托订单 商品 全部替换
  updEntrustorderGoodsReplaceData(code, data) {
    return request({
      url: `/entrustgoods/replace/${code}`,
      method: "POST",
      data
    });
  },

  // 委托订单 报表 保存
  saveEntrustorderCustomData(data) {
    return request({
      url: '/entrustcustom/',
      method: "POST",
      data
    });
  },

  // 委托订单 受托方付款 新增
  addEntrustorderTrusteepanymentData(data) {
    return request({
      url: '/entrusttrusteepanyment/',
      method: "POST",
      data
    });
  },

  // 委托订单 受托方付款 修改
  editEntrustorderTrusteepanymentData(data) {
    return request({
      url: '/entrusttrusteepanyment/',
      method: "PUT",
      data
    });
  },

  // 委托订单 受托方付款 删除
  delEntrustorderTrusteepanymentData(code, data) {
    return request({
      url: `/entrusttrusteepanyment/${code}`,
      method: "DELETE"
    });
  },

  
	// 导出委托订单
	exportEntrustOrder(code = '') {
    return request({
			url: `entrustorder/export/${code}`,
			method: 'GET',
			responseType: 'blob'
    });
  },
  
	// 导出付款通知单
	exportPaymentNotification(entrustOrderNo = '') {
    return request({
			url: `/entrustorder/export/paybill/${entrustOrderNo}`,
			method: 'GET',
			responseType: 'blob'
    });
  },

  // 归类
  getReportingElements(code) {
    return request({
      url: `/materielbase/declarefactor/${code}`,
      method: "POST",
    });
  },

  // 新增 修改 物料基本信息
  changeMaterielBaseData(data, method = 'POST') {
    return request({
      url: `/materielbase/`,
      method,
      data
    });
  },

  // 单据编号出口
	getCode(keyword) {
    return request({
			url: `/common/getCodeNo?bizCode=${keyword}`,
			method: 'GET',
    });
  },

};
