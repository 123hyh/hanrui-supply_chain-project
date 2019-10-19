/**
 * explain 单据提交的接口配置文件(根据当前模块的路由 path)
 * author hyh
 *
 */

/**
 * @property /CarrierBaseForm 承运商
 * @property /Customerform 客户
 * @property /SupplierBaseForm 供应商
 * @property /CompanyInfo 公司
 * @property //M0101 仓库信息
 * @property /M0107 关务行政区域
 * @property /M0112 附件上传类型表
 * @property /M0125 物料仓储车型
 * @property /M0122 财务计费项目
 * @property /M0123 计量单位
 * @property /M0158 第二计量单位
 * @property /M0126 仓储司机信息
 * @property /M0127 仓储运输区域
 * @property /M0128 运输时效
 * @property /M0129 仓库状态
 * @property /M0131 库存状态
 * @property /M0132 事务类型
 * @property /M0133 运输工具
 * @property /M0134 境内目的地
 * @property /M0156 境内货源地
 * @property /M0136 员工档案
 * @property /M0137 机关信息
 * @property /M0138 报检用途
 * @property /M0139 关务报关类型
 * @property /M0141 凭证摘要
 * @property /M0144 批次规则定义
 * @property /M0145 委托单类型
 * @property /M0153 交货区域
 * @property /M0154 税种
 * @property /M0155 第三方
 * @property /M0302 担保管理
 * @property M040101 管制品清单
 * @property M060120 物料基础
 * @property M060101 关务舱单
 * @property M060103 关务集装箱信息
 * @property M060104 关务监管条件
 * @property M060105 关务客品税号
 * @property M060106 关务清关费用
 * @property M060107 关务税则表
 * @property M060108 物料税号
 * @property M060112 原始舱单
 * @property M060114 征免性质
 * @property M060116 物料品牌产地
 * @property M060117 品牌
 * @property M060118 产地
 * @property M060119 管制品申请
 * @property M060123 运抵国
 * @property M060124 监管方式
 * @property M071105 发运路线
 * @property M071101 包装种类
 * @property M071102 车次
 * @property M071103 查车登记
 * @property M0124 仓储车辆
 * @property WarehouseQuotationForm 仓储报价单
 *
 *
 * @property /BusinessForm 商机管理
 * @property /ClientForm 委托方
 * @property /AgreementForm 协议管理
 * @property /M0302 担保管理
 * @property /M0303 担保管理
 * @property /M0304 无担保授信
 * @property /M0305 抵质押物
 * @property /CreditForm 融资授信
 * @property /EntrustOrderForm 委托订单
 * @property /SalesOrderForm 销售订单
 * @property /PurchaseOrderForm 采购订单
 * @property /buyerReceiveGoodsForm 买方接提货
 * @property /sellerReceiveGoodsForm 卖方交发货
 * @property /HkreceiveRegisterForm 香港收货登记
 * @property /GodownEntryForm 香港收货入库单
 * @property /HkscheduleBaseForm 香港上货计划
 * @property /HkoutstoreForm 香港出库单
 * @property /HkimportinvoiceForm 香港发货通知
 * @property /hkdispatchOrderForm 香港调度单
 * @property /HkshipmentBaseForm 香港发运单
 * @property /ImportCustomOrderForm 进出口报关计划
 * @property /CustomsFormBaseForm 进出口报关单
 * @property /szinstoreForm 深圳收货入库单
 * @property /ImportinvoiceForm 深圳发货通知
 * @property /DistributionTrainForm 配送车次
 * @property /dispatchOrderForm 深圳调度单
 * @property /centreDispatchForm 集中调度单
 * @property /ShipmentBaseForm 深圳发运单
 * @property /SzscheduleBaseForm 深圳上货计划
 * @property /szoutstoreForm 深圳出库单
 * @property /entrustpaybillForm 委托付款单
 * @property /adjustApplicationForm 账务调整申请
 * @property /ReceivesettlementForm 应收结算单
 * @property /ReceiptForm 收款单
 * @property /SubscriptionOrderForm 认款单
 * @property /PayapplyForm 付款申请单
 * @property /PaymentForm 付款单,
 * @property /otherbillForm 其他计费单
 * @property /AccountingwriteoffForm 账务核销申请单
 * @property /MaterielBaseForm 物料基础
 * @property /M060127 境内目的地
 */
export default {
  //( key ==>router.path) ：( val ==> api)
  '/CarrierBaseForm': '/carrierbase',
  '/Customerform': '/customer',
  '/SupplierBaseForm': '/supplierbase',
  '/CompanyInfo': '/companyinfo',
  '/M0101': '/warehouse',
  '/M0107': '/administrative',
  '/M0112': '/attachmenttype',
  '/M0125': '/cartype',
  '/M0122': '/financeproject',
  '/M0123': '/measurement',
  '/M0124': '/vehicleinfo',
  '/M0126': '/driverinfo',
  '/M0158': '/secondmeasurement',
  '/M0127': '/transportarea',
  '/M0128': '/transporttime',
  '/M0129': '/warehousestatus',
  '/M0131': '/stockstatus',
  '/M0132': '/transactiontype',
  '/M0133': '/conveyance',
  '/M0134': '/domesticdestination',
  '/M0156': '/deliveredgoodsplace',
  '/M0136': '/employeeinfo',
  '/M0137': '/institution',
  '/M0138': '/inspectionpurpose',
  '/M0139': '/customstype',
  '/M0141': '/vouchersummary',
  '/M0144': '/batchrule',
  '/M0145': '/entrustordertype',
  '/M0153': '/deliveryarea',
  '/M0154': '/taxcategory',
  '/M0155': '/thirdgroup',
  M040101: '/controlledgoods',
  M060120: '/materielbase',
  M060101: '/shippingbill',
  M060103: '/container',
  M060104: '/supervisioncondition',
  M060105: '/producttax',
  M060106: '/clearancefees',
  M060107: '/customstariff',
  M060108: '/customsmateriel',
  M060112: '/sourcebill',
  M060114: '/exemption',
  M060116: '/brandorigin',
  M060117: '/brand',
  M060118: '/origin',
  M060119: '/controlledgoodsapply',
  M060123: '/arrivalcountry',
  M060124: '/supervisionmode',
  M071105: '/shippingroute',
  M071101: '/packagetype',
  M071102: '/trainnumber',
  M071103: '/carcheck',
  M060127: '/domesticdestination',
  '/WarehouseQuotationForm': '/warehousequotation',

  '/BusinessForm': '/business',
  '/ClientForm': '/client',
  '/AgreementForm': '/agreement',
  '/M0302': '/ensure',
  '/M0303': '/deposits',
  '/M0304': '/noensure',
  '/M0305': '/pawn',
  '/CreditForm': '/credit',
  '/EntrustOrderForm': '/entrustorder',
  '/SalesOrderForm': '/salesorder',
  '/PurchaseOrderForm': '/purchaseorder',
  '/buyerReceiveGoodsForm': '/buyerreceivegoods',
  '/sellerReceiveGoodsForm': '/sellerreceivegoods',
  '/HkreceiveRegisterForm': '/hkreceiveregister',
  '/GodownEntryForm': '/godownentry',
  '/HkscheduleBaseForm': '/hkschedulebase',
  '/HkoutstoreForm': '/hkoutstore',
  '/HkimportinvoiceForm': '/hkimportinvoice',
  '/hkdispatchOrderForm': '/hkdispatchorder',
  '/HkshipmentBaseForm': '/hkshipmentbase',
  '/ImportCustomOrderForm': '/importcustomorder',
  '/CustomsFormBaseForm': '/customsformbase',
  '/szinstoreForm': '/szinstore',
  '/ImportinvoiceForm': '/importinvoice',
  '/DistributionTrainForm': '/distributiontrain',
  '/dispatchOrderForm': '/dispatchorder',
  '/centreDispatchForm': '/centredispatch',
  '/ShipmentBaseForm': '/shipmentbase',
  '/SzscheduleBaseForm': '/szschedulebase',
  '/szoutstoreForm': '/szoutstore',
  '/entrustpaybillForm': '/entrustpaybill',
  '/adjustApplicationForm': '/adjustapplication',
  '/ReceivesettlementForm': '/receivesettlement',
  '/ReceiptForm': '/receipt',
  '/SubscriptionOrderForm': '/subscriptionorder',
  '/PayapplyForm': '/payapply',
  '/PaymentForm': '/payment',
  '/otherbillForm': '/otherbill',
  '/AccountingwriteoffForm': '/accountingwriteoff',
  '/MaterielBaseForm': '/materielbase',
  '/SeCompanyInfo':'/companyinfo',
  '/SeClientForm':'/client',
  '/SeCustomerform':'/customer',
  '/SeSupplierBaseForm':'/supplierbase',
  '/SeCarrierBaseForm':'/carrierbase',
  
}
