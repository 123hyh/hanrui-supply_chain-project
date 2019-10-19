import api from '@/assets/js/appHelper.js'
const state = {
  openMenu: [],
  curRowData: {}, //当前行数据
  btnType: '',
  theme: '', // 主题
  exchangeRate: [], // 汇率
  orderStatus: [], // 列表页面查询单据状态的下拉值
  navigatorList: (() => {
    const base = { label: '基础信息' },
      businessManage = { label: '业务管理' },
      risk = { label: '风控/法务管理' },
      commerceManage = { label: '商务管理' },
      storageManageHK = { label: '仓储管理(香港)' },
      customsManage = { label: '关务管理' },
      storageManageSZ = { label: '仓储管理(深圳)' },
      closeManage = { label: '结算管理' },
      systemManage = { label: '系统管理' }
    return {
      // 业务单据 附件上传时需要使用到改导航路径
      BusinessForm: '业务管理/商机管理',
      ClientEvaluationForm: '业务管理/委托方评估',
      ClientForm: '业务管理/委托方',
      AgreementForm: '业务管理/协议管理',
      CreditForm: '风控/法务管理/融资授信',
      EntrustOrderForm: '商务管理/委托订单',
      SalesOrderForm: '商务管理/销售订单',
      PurchaseOrderForm: '商务管理/采购订单',
      buyerReceiveGoodsForm: '商务管理/买方(接)提货',
      sellerReceiveGoodsForm: '商务管理/卖方(接)提货',
      HkreceiveRegisterForm: '仓储管理(香港)/香港收货登记',
      GodownEntryForm: '仓储管理(香港)/香港收货入库单',
      HkscheduleBaseForm: '仓储管理(香港)/香港上货计划',
      HkoutstoreForm: '仓储管理(香港)/香港出库单',
      HkimportinvoiceForm: '仓储管理(香港)/香港发货通知单',
      hkdispatchOrderForm: '仓储管理(香港)/香港调度单',
      HkshipmentBaseForm: '仓储管理(香港)/香港发运单',
      ImportCustomOrderForm: '关务管理/进/出口报关计划',
      CustomsFormBaseForm: '关务管理/进/出口报关单',
      szinstoreForm: '仓储管理(深圳)/圳收货入库单',
      ImportinvoiceForm: '仓储管理(深圳)/深圳发货通知',
      DistributionTrainForm: '仓储管理(深圳)/配送车次',
      dispatchOrderForm: '仓储管理(深圳)/深圳调度单',
      centreDispatchForm: '仓储管理(深圳)/集中调度单',
      ShipmentBaseForm: '仓储管理(深圳)/深圳发运单',
      SzscheduleBaseForm: '仓储管理(深圳)/深圳上货计划',
      szoutstoreForm: '仓储管理(深圳)/深圳出库单',
      entrustpaybillForm: '结算管理/委托付款单',
      otherbillForm: '结算管理/费用报销单',
      adjustApplicationForm: '结算管理/账务调整申请单',
      ReceivesettlementForm: '结算管理/应收结算单',
      ReceiptForm: '结算管理/收款单',
      SubscriptionOrderForm: '结算管理/认款单',
      AccountingwriteoffForm: '结算管理/账务核销单',
      PayapplyForm: '结算管理/付款申请单',
      PaymentForm: '结算管理/付款单',
      ExpensesClaimSheetForm: '结算管理/费用报销单',
      RemittanceForm: '结算管理/调汇申请单',
      InvoiceReceiptForm: '结算管理/发票签收单',

      // 列表页面显示的导航
      M0106: [base, { label: '公司信息' }],
      M0101: [base, { label: '仓库信息' }],
      M0107: [base, { label: '关务行政区域代码' }],
      M0112: [base, { label: '附件上传类型表' }],
      M0122: [base, { label: '财务计费项目表' }],
      M0123: [base, { label: '计量单位表' }],
      M0124: [base, { label: '物流仓储车辆信息表' }],
      M0125: [base, { label: '物流仓储车型' }],
      M0126: [base, { label: '物流仓储司机信息' }],
      M0127: [base, { label: '物流仓储运输区域' }],
      M0128: [base, { label: '物流运输时效' }],
      M0129: [base, { label: '仓库状态' }],
      M0130: [base, { label: '仓库使用授权' }],
      M0131: [base, { label: '库存状态' }],
      M0132: [base, { label: '事务类型信息' }],
      M0133: [base, { label: '运输工具' }],
      M0134: [base, { label: '境内目的地' }],
      M0156: [base, { label: '境内货源地' }],
      M0136: [base, { label: '员工档案' }],
      M0137: [base, { label: '机关信息' }],
      M0138: [base, { label: '报检用途' }],
      M0139: [base, { label: '关务报关类型' }],
      M0141: [base, { label: '凭证摘要' }],
      M0144: [base, { label: '批次规则定义' }],
      M0145: [base, { label: '委托单类型' }],
      M0153: [base, { label: '交货区域' }],
      M0154: [base, { label: '税种' }],
      M0155: [base, { label: '第三方' }],
      M0157: [base, { label: '会计科目' }],

      M0202: [businessManage, { label: '商机管理' }],

      M0203: [businessManage, { label: '委托方评估' }],

      M0204: [businessManage, { label: '委托方' }],

      M0205: [businessManage, { label: '协议管理' }],

      M0206: [businessManage, { label: '协议变更' }],
      M0207: [businessManage, { label: '网上客户认证' }],

      M0302: [risk, { label: '担保管理' }],
      M0303: [risk, { label: '保证金(押金)管理' }],
      M0304: [risk, { label: '无担保授信' }],
      M0305: [risk, { label: '抵(质)押物管理' }],
      M0306: [risk, { label: '融资授信' }],
      M0307: [risk, { label: '网上授信申请' }],

      M0402: [commerceManage, { label: '委托订单' }],
      M0403: [commerceManage, { label: '销售订单' }],
      M0404: [commerceManage, { label: '采购订单' }],
      M0405: [commerceManage, { label: '买方(接)提货' }],
      M0406: [commerceManage, { label: '卖方(接)提货' }],
      M0407: [commerceManage, { label: '出口交货计划' }],
      M0408: [commerceManage, { label: '出口任务单' }],
      M0410: [commerceManage, { label: '网上订单' }],

      M0501: [storageManageHK, { label: '香港收货登记' }],
      M0503: [storageManageHK, { label: '香港收货入库单' }],
      M0504: [storageManageHK, { label: '香港上货计划' }],
      M0505: [storageManageHK, { label: '香港出库单' }],
      M0506: [storageManageHK, { label: '香港发货通知单' }],
      M0507: [storageManageHK, { label: '香港调度单' }],
      M0508: [storageManageHK, { label: '香港发运单' }],

      M0604: [customsManage, { label: '进/出口报关计划' }],
      M0606: [customsManage, { label: '进/出口报关单' }],

      M0702: [storageManageSZ, { label: '圳收货入库单' }],
      M0703: [storageManageSZ, { label: '深圳发货通知' }],
      M0705: [storageManageSZ, { label: '配送车次' }],
      M0706: [storageManageSZ, { label: '集中调度单' }],
      M0707: [storageManageSZ, { label: '深圳调度单' }],
      M0708: [storageManageSZ, { label: '深圳发运单' }],
      M0709: [storageManageSZ, { label: '深圳上货计划' }],
      M0710: [storageManageSZ, { label: '深圳出库单' }],

      M0801: [closeManage, { label: '委托付款单' }],
      M0802: [closeManage, { label: '费用报销单' }],
      M0803: [closeManage, { label: '账务调整申请单' }],
      M0804: [closeManage, { label: '转款单' }],
      M0805: [closeManage, { label: '应收结算单' }],
      M0806: [closeManage, { label: '收款单' }],
      M0807: [closeManage, { label: '认款单' }],
      M0808: [closeManage, { label: '账务核销单' }],
      M0809: [closeManage, { label: '付款申请单' }],
      M0810: [closeManage, { label: '付款单' }],
      M0811: [closeManage, { label: '应付结算单' }],
      M0812: [closeManage, { label: '费用报销单' }],
      M0813: [closeManage, { label: '出口预收汇转款' }],
      M0814: [closeManage, { label: '资金调拨单' }],
      M0815: [closeManage, { label: '调汇申请单' }],
      M0816: [closeManage, { label: '发票签收单' }],
      M0817: [closeManage, { label: '凭证管理' }],
      M0819: [closeManage, { label: '认款后逾期利息表' }],

      M0905: [{ label: '智能报表' }, { label: '单证管理' }],

      M1001: [systemManage, { label: '用户管理' }],
      M1002: [systemManage, { label: '角色管理' }],
      M1003: [systemManage, { label: '角色权限' }],
      M1004: [systemManage, { label: '用户角色' }],
      M1005: [systemManage, { label: '用户权限' }],
      M1006: [systemManage, { label: '数据字典' }],
      M1007: [systemManage, { label: '全局设置' }],
      M1008: [systemManage, { label: '系统公告' }],
      M1009: [systemManage, { label: '智能预警设置' }],
      M1010: [systemManage, { label: '即时库存' }]
    }
  })()
}
const mutations = {
  addOpenMenuList(state, menu) {
    state.openMenu.push(menu)
  },
  addCurRowData(state, rowData) {
    state.curRowData = rowData
  },
  addBtnType(state, btnKey) {
    state.btnType = btnKey
  },
  curRowData(state, rowData) {
    state.curRowData = rowData
  },
  btnType(state, btnKey) {
    state.btnType = btnKey
  },
  /**
   *
   *
   * @param {颜色} color
   * @method setTheme 设置主题
   */
  setTheme(state, color) {
    state.theme = color
  },

  /**
   * @method setexchangeRate 获取汇率
   */

  setexchangeRate(state, { data }) {
    state.exchangeRate = data
  },
  /**
   * @method setOrderStatus 设置 单据状态的下拉值
   */
  setOrderStatus(state, { data = [] }) {
    state.orderStatus = data
    state.orderStatus.push({ itemKey: null, itemValue: '全部' })
  }
}
const actions = {
  // 获取汇率
  async getExchange({ commit }) {
    commit('setexchangeRate', await api.getexchangerate())
  },
  async getOrderStatus({ commit }) {
    commit('setOrderStatus', await api.getEnum('orderStatus'))
  }
  // 	addOpenMenuList({commit}, menu){
  // 	  commit('MENU', menu)
  // 	},
  // 	addCurRowData({commit}, rowData){
  // 	  commit('ROWDATA', rowData)
  // 	},
  // 	addBtnType({commit}, btnKey){
  // 	  commit('BTNKEY', btnKey)
  // 	},
}
const getters = {
  openMenu: state => state.openMenu,
  curRowData: state => state.curRowData,
  btnType: state => state.btnType,
  getTheme: ({ theme }) => theme,
  exchangeRate: ({ exchangeRate }) => exchangeRate,
  orderStatus: ({ orderStatus }) => orderStatus,
  navigatorList: ({ navigatorList }) => navigatorList
}
export default {
  state,
  mutations,
  actions,
  getters
}
