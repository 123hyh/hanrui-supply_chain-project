// ;
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/M00'
    },
    {
      path: '/',
      component: _ => import('@/components/common/Home.vue'),
      meta: {
        title: '自述文件'
      },

      children: [
        {
          path: '/M00',
          component: _ => import('@/components/page/Dashboard.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/M0101',
          component: _ =>
            import('@/components/views/basicdata/WarehouseList.vue'),
          meta: {
            title: '仓库信息'
          }
        },
        {
          path: '/M020101',
          component: _ =>
            import('@/components/views/basicdata/CarrierBaseList.vue'),
          meta: {
            title: '承运商'
          }
        },
        {
          path: '/CarrierBaseForm',
          name: 'CarrierBaseForm',
          component: _ =>
            import('@/components/views/basicdata/CarrierBaseForm.vue'),
          meta: {
            title: '承运商信息',
            parentRoute: 'M020101'
          }
        },
        {
          path: '/SeCarrierBaseForm',
          name: 'SeCarrierBaseForm',
          component: _ =>
            import('@/components/views/basicdata/SeCarrierBaseForm.vue'),
          meta: {
            title: '承运商信息',
            parentRoute: 'M082005'
          }
        },
        {
          path: '/M0106',
          name: 'M0106',
          component: _ =>
            import('@/components/views/basicdata/CompanyInfoList.vue'),
          meta: {
            title: '公司'
          }
        },
        {
          path: '/CompanyInfo',
          name: 'CompanyInfo',
          component: _ =>
            import('@/components/views/basicdata/CompanyInfoForm.vue'),
          meta: {
            title: '公司信息',
            parentRoute: 'M082001'
          }
        },
        {
          path: '/SeCompanyInfo',
          name: 'SeCompanyInfo',
          component: _ =>
            import('@/components/views/basicdata/SeCompanyInfoForm.vue'),
          meta: {
            title: '公司信息',
            parentRoute: 'M0106'
          }
        },
        {
          path: '/M0107',
          component: _ =>
            import('@/components/views/basicdata/AdministrativeList.vue'),
          meta: {
            title: '关务行政区域代码'
          }
        },
        {
          path: '/M0108',
          component: _ =>
            import('@/components/views/basicdata/MaterielBaseList.vue'),
          meta: {
            title: '物料基础信息'
          }
        },
        {
          path: '/M0111',
          component: _ =>
            import('@/components/views/basicdata/MaterielFinanceList.vue'),
          meta: {
            title: '物料财务信息'
          }
        },
        {
          path: '/M0112',
          component: _ =>
            import('@/components/views/basicdata/AttachmentTypeList.vue'),
          meta: {
            title: '附件上传类型表'
          }
        },
        {
          path: '/null',
          component: _ =>
            import('@/components/views/basicdata/ShippingBillList.vue'),
          meta: {
            title: '关务舱单基础表'
          }
        },
        {
          path: '/null',
          component: _ =>
            import('@/components/views/basicdata/ClearanceFeesList.vue'),
          meta: {
            title: '关务清关费用基础资料'
          }
        },
        {
          path: '/M0121',
          component: _ =>
            import('@/components/views/basicdata/FinanceChargeList.vue'),
          meta: {
            title: '财务计费方式表'
          }
        },
        {
          path: '/M0122',
          component: _ =>
            import('@/components/views/basicdata/FinanceProjectList.vue'),
          meta: {
            title: '财务计费项目表'
          }
        },
        {
          path: '/M0123',
          component: _ =>
            import('@/components/views/basicdata/MeasurementList.vue'),
          meta: {
            title: '计量单位表'
          }
        },
        {
          path: '/M0158',
          component: _ =>
            import('@/components/views/basicdata/SecondUnitOfMeasureList.vue'),
          meta: {
            title: '第二计量单位'
          }
        },
        {
          path: '/M0124',
          component: _ =>
            import('@/components/views/basicdata/VehicleInfoList.vue'),
          meta: {
            title: '物流仓储车辆信息表'
          }
        },
        {
          path: '/M0125',
          component: _ =>
            import('@/components/views/basicdata/CarTypeList.vue'),
          meta: {
            title: '物流仓储车型'
          }
        },
        {
          path: '/M0126',
          component: _ =>
            import('@/components/views/basicdata/DriverInfoList.vue'),
          meta: {
            title: '物流仓储司机信息'
          }
        },
        {
          path: '/M0127',
          component: _ =>
            import('@/components/views/basicdata/TransportAreaList.vue'),
          meta: {
            title: '物流仓储运输区域'
          }
        },
        {
          path: '/M0128',
          component: _ =>
            import('@/components/views/basicdata/TransportTimeList.vue'),
          meta: {
            title: '物流运输时效'
          }
        },
        {
          path: '/M0129',
          component: _ =>
            import('@/components/views/basicdata/WarehouseStatusList.vue'),
          meta: {
            title: '仓库状态信息'
          }
        },
        {
          path: '/M0130',
          component: _ =>
            import('@/components/views/basicdata/WarehouseAuthorizationList.vue'),
          meta: {
            title: '仓库使用授权'
          }
        },
        {
          path: '/M0131',
          component: _ =>
            import('@/components/views/basicdata/StockStatusList.vue'),
          meta: {
            title: '库存状态信息'
          }
        },
        {
          path: '/M0132',
          component: _ =>
            import('@/components/views/basicdata/TransactionTypeList.vue'),
          meta: {
            title: '事务类型信息'
          }
        },
        {
          path: '/M0133',
          component: _ =>
            import('@/components/views/basicdata/ConveyanceList.vue'),
          meta: {
            title: '运输工具'
          }
        },
        {
          path: '/M0136',
          component: _ =>
            import('@/components/views/basicdata/EmployeeInfoList.vue'),
          meta: {
            title: '员工档案'
          }
        },
        {
          path: '/M0139',
          component: _ =>
            import('@/components/views/basicdata/CustomsTypeList.vue'),
          meta: {
            title: '关务报关类型'
          }
        },
        {
          path: '/M0141',
          component: _ =>
            import('@/components/views/basicdata/VoucherSummaryList.vue'),
          meta: {
            title: '凭证摘要'
          }
        },
        {
          path: '/M020105',
          component: _ =>
            import('@/components/views/basicdata/SupplierBaseList.vue'),
          meta: {
            title: '供应商'
          }
        },
        {
          path: '/SupplierBaseForm',
          name: 'SupplierBaseForm',
          component: _ =>
            import('@/components/views/basicdata/SupplierBaseForm.vue'),
          meta: {
            title: '供应商信息',
            parentRoute: 'M020105'
          }
        },
        {
          path: '/SeSupplierBaseForm',
          name: 'SeSupplierBaseForm',
          component: _ =>
            import('@/components/views/basicdata/SeSupplierBaseForm.vue'),
          meta: {
            title: '供应商信息',
            parentRoute: 'M082004'
          }
        },
        {
          path: '/M0144',
          component: _ =>
            import('@/components/views/basicdata/BatchRuleList.vue'),
          meta: {
            title: '批次规则定义'
          }
        },
        {
          path: '/M0145',
          component: _ =>
            import('@/components/views/basicdata/EntrustOrderTypeList.vue'),
          meta: {
            title: '委托单类型'
          }
        },
        {
          path: '/M0153',
          component: _ =>
            import('@/components/views/basicdata/DeliveryAreaList.vue'),
          meta: {
            title: '交货区域'
          }
        },
        {
          path: '/M0154',
          component: _ =>
            import('@/components/views/basicdata/TaxCategoryList.vue'),
          meta: {
            title: '税种'
          }
        },
        {
          path: '/M0155',
          component: _ =>
            import('@/components/views/basicdata/ThirdGroupList.vue'),
          meta: {
            title: '第三方'
          }
        },
        {
          path: '/M0157',
          component: _ =>
            import('@/components/views/basicdata/Accountingsubjects.vue'),
          meta: {
            title: '会计科目'
          }
        },
        // {
        //   path: '/M0157',
        //   component: _ => import('@/components/common/class/from-component/example.vue'),
        //   meta: {
        //     title: '会计科目'
        //   }
        // },
        {
          path: '/M0202',
          component: _ =>
            import('@/components/views/business/BusinessList.vue'),
          meta: {
            title: '商机管理'
          }
        },
        {
          path: 'BusinessForm',
          name: 'BusinessForm',
          component: _ =>
            import('@/components/views/business/BusinessForm.vue'),
          meta: {
            title: '商机管理信息',
            parentRoute: 'M0202'
          }
        },
        {
          path: '/M0203',
          component: _ =>
            import('@/components/views/business/ClientEvaluationList.vue'),
          meta: {
            title: '委托方评估'
          }
        },
        {
          path: '/ClientEvaluationForm',
          name: 'ClientEvaluationForm',
          component: _ =>
            import('@/components/views/business/ClientEvaluationForm.vue'),
          meta: {
            title: '委托方评估信息',
            parentRoute: 'M0203'
          }
        },
        {
          path: '/M0204',
          component: _ => import('@/components/views/business/ClientList.vue'),
          meta: {
            title: '委托方'
          }
        },
        {
          path: '/ClientForm',
          name: 'ClientForm',
          component: _ => import('@/components/views/business/ClientForm.vue'),
          props: true,
          meta: {
            title: '委托方信息',
            parentRoute: 'M0204'
          }
        },
        {
          path: '/SeClientForm',
          name: 'SeClientForm',
          component: _ =>
            import('@/components/views/business/SeClientForm.vue'),
          props: true,
          meta: {
            title: '委托方信息',
            parentRoute: 'M082002'
          }
        },
        {
          path: '/M0205',
          component: _ =>
            import('@/components/views/business/AgreementList.vue'),
          meta: {
            title: '协议管理'
          }
        },
        {
          path: '/AgreementForm',
          name: 'AgreementForm',
          component: _ =>
            import('@/components/views/business/AgreementForm.vue'),
          props: true,
          meta: {
            title: '协议管理信息',
            parentRoute: 'M0205'
          }
        },
        {
          path: '/M0206',
          component: _ =>
            import('@/components/views/business/AgreementChangeList.vue'),
          meta: {
            title: '协议变更'
          }
        },
        {
          path: '/AgreementChangeForm',
          name: 'AgreementChangeForm',
          component: _ =>
            import('@/components/views/business/AgreementChangeForm.vue'),
          meta: {
            title: '协议变更信息',
            parentRoute: 'M0206'
          }
        },
        {
          path: '/M020104',
          component: _ =>
            import('@/components/views/basicdata/CustomerList.vue'),
          meta: {
            title: '供应链客户'
          }
        },
        {
          path: '/Customerform',
          name: 'Customerform',
          component: _ =>
            import('@/components/views/basicdata/CustomerForm.vue'),
          meta: {
            title: '供应链客户信息',
            parentRoute: 'M020104'
          }
        },
        {
          path: '/SeCustomerform',
          name: 'SeCustomerform',
          component: _ =>
            import('@/components/views/basicdata/SeCustomerForm.vue'),
          meta: {
            title: '供应链客户信息',
            parentRoute: 'M082003'
          }
        },
        {
          path: '/M060116',
          component: _ =>
            import('@/components/views/basicdata/BrandOriginList.vue'),
          meta: {
            title: '物料品牌产地'
          }
        },
        {
          path: '/M060117',
          component: _ => import('@/components/views/basicdata/BrandList.vue'),
          meta: {
            title: '品牌'
          }
        },
        {
          path: '/M060118',
          component: _ => import('@/components/views/basicdata/OriginList.vue'),
          meta: {
            title: '产地'
          }
        },
        {
          path: '/M060119',
          component: _ =>
            import('@/components/views/basicdata/ControlledGoodsApplyList.vue'),
          meta: {
            title: '管制品申请'
          }
        },
        {
          path: '/M0302',
          component: _ => import('@/components/views/risk/EnsureList.vue'),
          meta: {
            title: '担保管理'
          }
        },
        {
          path: '/M0303',
          component: _ => import('@/components/views/risk/DepositsList.vue'),
          meta: {
            title: '保证金(押金)管理'
          }
        },
        {
          path: '/M0304',
          component: _ => import('@/components/views/risk/NoensureList.vue'),
          meta: {
            title: '无担保授信'
          }
        },
        {
          path: '/M0305',
          component: _ => import('@/components/views/risk/PawnList.vue'),
          meta: {
            title: '抵(质)押物管理'
          }
        },
        {
          path: '/M0306',
          component: _ => import('@/components/views/risk/CreditList.vue'),
          meta: {
            title: '融资授信'
          }
        },
        {
          path: '/CreditForm',
          name: 'CreditForm',
          component: _ => import('@/components/views/risk/CreditForm.vue'),
          meta: {
            title: '融资授信信息',
            parentRoute: 'M0306'
          },
          props: true
        },
        {
          path: '/M0307',
          component: _ => import('@/components/views/risk/OnlineCredit.vue'),
          meta: {
            title: '网上授信'
          }
        },
        {
          path: '/OnlineCreditEdiet',
          name: 'OnlineCreditEdiet',
          component: _ =>
            import('@/components/views/risk/OnlineCreditEdiet.vue'),
          meta: {
            title: '网上授信信息'
          }
        },
        // {
        //   path: '/M0402',
        //   component: _ =>
        //     import('@/components/views/commerce/EntrustOrderList.vue'),
        //   meta: {
        //     title: '委托订单'
        //   }
        // },
        // {
        //   path: '/EntrustOrderForm',
        //   name: 'EntrustOrderForm',
        //   component: _ =>
        //     import('@/components/views/commerce/EntrustOrderForm.vue'),
        //   meta: {
        //     title: '委托订单信息',
        //     parentRoute: 'M0402'
        //   }
        // },
        {
          path: '/M0402',
          component: _ =>
            import('@/components/views/model/views/entrustorder/entrustorderlist.vue'),
          meta: {
            title: '委托订单'
          }
        },
        {
          path: '/EntrustOrderForm',
          name: 'EntrustOrderForm',
          component: _ =>
            import('@/components/views/model/views/entrustorder/entrustorderform.vue'),
          meta: {
            title: '委托订单信息',
            parentRoute: 'M0402'
          }
        },
        // {
        //   path: '/M0409',
        //   component: _ =>
        //     import('@/components/views/model/views/entrustorder/entrustorderlist.vue'),
        //   meta: {
        //     title: '新委托订单'
        //   }
        // },
        // {
        //   path: '/newentrustorderform',
        //   name: 'newentrustorderform',
        //   component: _ =>
        //     import('@/components/views/model/views/entrustorder/entrustorderform.vue'),
        //   meta: {
        //     title: '新委托订单信息',
        //     parentRoute: 'M0409'
        //   }
        // },
        {
          path: '/M0403',
          component: _ =>
            import('@/components/views/commerce/SalesOrderList.vue'),
          meta: {
            title: '销售订单'
          }
        },
        {
          path: '/SalesOrderForm',
          name: 'SalesOrderForm',
          component: _ =>
            import('@/components/views/commerce/SalesOrderForm.vue'),
          meta: {
            title: '销售订单',
            parentRoute: 'M0403'
          }
        },
        {
          path: '/M0404',
          component: _ =>
            import('@/components/views/commerce/PurchaseOrderList.vue'),
          meta: {
            title: '采购订单'
          }
        },
        {
          path: '/PurchaseOrderForm',
          name: 'PurchaseOrderForm',
          component: _ =>
            import('@/components/views/commerce/PurchaseOrderForm.vue'),
          meta: {
            title: '采购订单信息',
            parentRoute: 'M0404'
          }
        },
        {
          path: '/M0405',
          component: _ =>
            import('@/components/views/business/BuyerReceiveGoodsList.vue'),
          meta: {
            title: '买方接(提)货信息'
          }
        },
        {
          path: '/buyerReceiveGoodsForm',
          name: 'buyerReceiveGoodsForm',
          component: _ =>
            import('@/components/views/business/BuyerReceiveGoodsForm.vue'),
          meta: {
            title: '买方接(提)货信息详情',
            parentRoute: 'M0405'
          }
        },
        {
          path: '/M0406',
          component: _ =>
            import('@/components/views/business/SellerReceiveGoodsList.vue'),
          meta: {
            title: '卖方交(发)货信息'
          }
        },
        {
          path: '/sellerReceiveGoodsForm',
          name: 'sellerReceiveGoodsForm',
          component: _ =>
            import('@/components/views/business/SellerReceiveGoodsForm.vue'),
          meta: {
            title: '卖方交(发)货信息详情',
            parentRoute: 'M0406'
          }
        },
        {
          path: '/M0501',
          name: 'HkreceiveRegisterList',
          component: _ =>
            import('@/components/views/logistics/HkreceiveRegisterList.vue'),
          meta: {
            title: '香港收货登记'
          }
        },
        {
          path: '/HkreceiveRegisterForm',
          name: 'HkreceiveRegisterForm',
          component: _ =>
            import('@/components/views/logistics/HkreceiveRegisterForm.vue'),
          meta: {
            title: '香港收货登记信息',
            parentRoute: 'M0501'
          }
        },
        {
          path: '/M0502',
          component: _ =>
            import('@/components/views/logistics/ReceiptOrderList.vue'),
          meta: {
            title: '香港收货单'
          }
        },
        {
          path: '/ReceiptOrderForm',
          name: 'ReceiptOrderForm',
          component: _ =>
            import('@/components/views/logistics/ReceiptOrderForm.vue'),
          props: true,
          meta: {
            title: '香港收货单信息',
            parentRoute: 'M0502'
          }
        },
        {
          path: '/M0503',
          component: _ =>
            import('@/components/views/logistics/GodownEntryList.vue'),
          meta: {
            title: '香港收货入库单'
          }
        },
        {
          path: '/GodownEntryForm',
          name: 'GodownEntryForm',
          component: _ =>
            import('@//components/views/logistics/GodownEntryForm.vue'),
          props: true,
          meta: {
            title: '香港收货入库单信息',
            parentRoute: 'M0503'
          }
        },
        {
          path: '/M0504',
          component: _ =>
            import('@/components/views/logistics/HkscheduleBaseList.vue'),
          meta: {
            title: '香港上货计划'
          }
        },
        {
          path: '/HkscheduleBaseForm',
          component: _ =>
            import('@/components/views/logistics/HkscheduleBaseForm.vue'),
          meta: {
            title: '香港上货计划信息',
            parentRoute: 'M0504'
          }
        },
        {
          path: '/M0505',
          component: _ =>
            import('@/components/views/logistics/HkoutstoreList.vue'),
          meta: {
            title: '香港出库单'
          }
        },
        {
          path: '/HkoutstoreForm',
          name: 'HkoutstoreForm',
          component: _ =>
            import('@/components/views/logistics/HkoutstoreForm.vue'),
          props: true,
          meta: {
            title: '香港出库单信息',
            parentRoute: 'M0505'
          }
        },
        {
          path: '/M0506',
          component: _ =>
            import('@/components/views/logistics/HkimportinvoiceList.vue'),
          meta: {
            title: '香港发货通知单'
          }
        },
        {
          path: '/HkimportinvoiceForm',
          component: _ =>
            import('@/components/views/logistics/HkimportinvoiceForm.vue'),
          name: 'HkimportinvoiceForm',
          meta: {
            title: '香港发货通知单',
            parentRoute: 'M0506'
          }
        },
        {
          path: '/M0507',
          component: _ =>
            import('@/components/views/logistics/HkdispatchOrderList.vue'),
          meta: {
            title: '香港调度单'
          }
        },
        {
          path: '/hkdispatchOrderForm',
          component: _ =>
            import('@/components/views/logistics/HkdispatchOrderForm.vue'),
          name: 'hkdispatchOrderForm',
          meta: {
            title: '香港调度单信息',
            parentRoute: 'M0507'
          }
        },
        {
          path: '/M0508',
          component: _ =>
            import('@/components/views/logistics/HkshipmentBaseList.vue'),
          meta: {
            title: '香港发运单'
          }
        },
        {
          path: '/HkshipmentBaseForm',
          component: _ =>
            import('@/components/views/logistics/HkshipmentBaseForm.vue'),
          meta: {
            title: '香港发运单信息',
            parentRoute: 'M0508'
          }
        },
        {
          path: '/M0604',
          component: _ =>
            import('@/components/views/custom/ImportCustomOrderList.vue'),
          meta: {
            title: '进/出口报关计划'
          }
        },
        {
          path: '/ImportCustomOrderForm',
          name: 'ImportCustomOrderForm',
          component: _ =>
            import('@/components/views/custom/ImportCustomOrderForm.vue'),
          meta: {
            title: '进/出口报关计划信息',
            parentRoute: 'M0604'
          }
        },

        {
          path: '/M0605',
          component: _ =>
            import('@/components/views/logistics/PrecustomsList.vue'),
          meta: {
            title: '待报关列表'
          }
        },
        {
          path: '/PrecustomsForm',
          name: 'PrecustomsForm',
          component: _ =>
            import('@/components/views/logistics/PrecustomsForm.vue'),
          meta: {
            title: '待报关列表信息',
            parentRoute: 'M0605'
          }
        },
        {
          path: '/M0606',
          component: _ =>
            import('@/components/views/custom/CustomsFormBaseList.vue'),
          meta: {
            title: '进/出口报关单'
          }
        },
        {
          path: '/CustomsFormBaseForm',
          name: 'CustomsFormBaseForm',
          component: _ =>
            import('@/components/views/custom/CustomsFormBaseForm.vue'),
          meta: {
            title: '进/出口报关单',
            parentRoute: 'M0606'
          }
        },
        {
          path: '/M0607',
          component: _ =>
            import('@/components/views/custom/CustomsAffairsReport.vue'),
          meta: {
            title: '关务报表'
          }
        },
        {
          path: '/M0701',
          component: _ =>
            import('@/components/views/logistics/SzreceivingList.vue'),
          meta: {
            title: '深圳收货单'
          }
        },
        {
          path: '/SzreceivingForm',
          component: _ =>
            import('@/components/views/logistics/SzreceivingForm.vue'),
          meta: {
            title: '深圳收货单信息',
            parentRoute: 'M0701'
          }
        },
        {
          path: '/szinstoreForm',
          component: _ =>
            import('@/components/views/logistics/SzinstoreForm.vue'),
          name: 'szinstoreForm',
          meta: {
            title: '深圳收货入库单信息',
            parentRoute: 'M0702'
          }
        },
        {
          path: '/M0702',
          component: _ =>
            import('@/components/views/logistics/SzinstoreList.vue'),
          meta: {
            title: '深圳收货入库单'
          }
        },
        {
          path: '/M0703',
          component: _ =>
            import('@/components/views/logistics/ImportinvoiceList.vue'),
          meta: {
            title: '深圳发货通知'
          }
        },
        {
          path: '/ImportinvoiceForm',
          component: _ =>
            import('@/components/views/logistics/ImportinvoiceForm.vue'),
          name: 'ImportinvoiceForm',
          meta: {
            title: '深圳发货通知信息',
            parentRoute: 'M0703'
          }
        },
        {
          path: '/M0704',
          component: _ =>
            import('@/components/views/logistics/DistributionTaskList.vue'),
          meta: {
            title: '配送任务'
          }
        },
        {
          path: '/distributionTaskForm',
          component: _ =>
            import('@/components/views/logistics/DistributionTaskForm.vue'),
          meta: {
            title: '配送任务信息',
            parentRoute: 'M0704'
          }
        },
        {
          path: '/M0705',
          component: _ =>
            import('@/components/views/logistics/DistributionTrainList.vue'),
          meta: {
            title: '配送车次'
          }
        },
        {
          path: '/DistributionTrainForm',
          name: 'DistributionTrainForm',
          component: _ =>
            import('@/components/views/logistics/DistributionTrainForm.vue'),
          meta: {
            title: '配送车次信息',
            parentRoute: 'M0705'
          }
        },
        {
          path: '/M0706',
          component: _ =>
            import('@/components/views/logistics/CentreDispatchList.vue'),
          meta: {
            title: '集中调度单'
          }
        },
        {
          path: '/centreDispatchForm',
          name: 'centreDispatchForm',
          component: _ =>
            import('@/components/views/logistics/CentreDispatchForm.vue'),
          meta: {
            title: '集中调度单信息',
            parentRoute: 'M0706'
          }
        },
        {
          path: '/M0707',
          component: _ =>
            import('@/components/views/logistics/DispatchOrderList.vue'),
          meta: {
            title: '深圳调度单'
          }
        },
        {
          path: '/dispatchOrderForm',
          name: 'dispatchOrderForm',
          component: _ =>
            import('@/components/views/logistics/DispatchOrderForm.vue'),
          meta: {
            title: '深圳调度单信息',
            parentRoute: 'M0707'
          }
        },
        {
          path: '/M0708',
          component: _ =>
            import('@/components/views/logistics/ShipmentBaseList.vue'),
          meta: {
            title: '深圳发运单'
          }
        },
        {
          path: '/ShipmentBaseForm',
          component: _ =>
            import('@/components/views/logistics/ShipmentBaseForm.vue'),
          name: 'ShipmentBaseForm',
          meta: {
            title: '深圳发运单信息',
            parentRoute: 'M0708'
          }
        },
        {
          path: '/M0709',
          component: _ =>
            import('@/components/views/logistics/DeliveryScheduleBaseList.vue'),
          meta: {
            title: '深圳上货计划'
          }
        },
        {
          path: '/SzscheduleBaseForm',
          component: _ =>
            import('@/components/views/logistics/DeliveryScheduleBaseForm.vue'),
          meta: {
            title: '深圳上货计划信息',
            parentRoute: 'M0709'
          }
        },
        {
          path: '/M0710',
          component: _ =>
            import('@/components/views/logistics/SzoutstoreList.vue'),
          meta: {
            title: '深圳出库单'
          }
        },
        {
          path: '/szoutstoreForm',
          component: _ =>
            import('@/components/views/logistics/SzoutstoreForm.vue'),
          meta: {
            title: '深圳出库单信息',
            parentRoute: 'M0710'
          }
        },
        {
          path: '/M0801',
          component: _ =>
            import('@/components/views/finance/EntrustpaybillList.vue'),
          meta: {
            title: '委托付款单'
          }
        },
        {
          path: '/entrustpaybillForm',
          name: 'entrustpaybillForm',
          component: _ =>
            import('@/components/views/finance/EntrustpaybillForm.vue'),
          meta: {
            title: '委托付款单信息',
            parentRoute: 'M0801'
          }
        },
        {
          path: '/M0805',
          component: _ =>
            import('@/components/views/finance/ReceivesettlementList.vue'),
          meta: {
            title: '应收结算单'
          }
        },
        {
          path: '/ReceivesettlementForm',
          name: 'ReceivesettlementForm',
          component: _ =>
            import('@/components/views/finance/ReceivesettlementForm.vue'),
          meta: {
            title: '应收结算单信息',
            parentRoute: 'M0805'
          }
        },
        {
          path: '/M0806',
          component: _ => import('@/components/views/finance/ReceiptList.vue'),
          meta: {
            title: '收款单'
          }
        },
        {
          path: '/ReceiptForm',
          name: 'ReceiptForm',
          component: _ => import('@/components/views/finance/ReceiptForm.vue'),
          meta: {
            title: '收款单信息',
            parentRoute: 'M0806'
          }
        },
        {
          path: '/M0808',
          component: _ =>
            import('@/components/views/finance/AccountingwriteoffList.vue'),
          meta: {
            title: '帐务核销申请单'
          }
        },
        {
          path: '/AccountingwriteoffForm',
          name: 'AccountingwriteoffForm',
          component: _ =>
            import('@/components/views/finance/AccountingwriteoffForm.vue'),
          meta: {
            title: '帐务核销申请单信息',
            parentRoute: 'M0808'
          }
        },
        {
          path: '/M0807',
          component: _ =>
            import('@/components/views/finance/SubscriptionOrderList.vue'),
          meta: {
            title: '认款单'
          }
        },
        {
          path: '/SubscriptionOrderForm',
          name: 'SubscriptionOrderForm',
          component: _ =>
            import('../components/views/finance/SubscriptionOrderForm.vue'),
          props: true,
          meta: {
            title: '认款单信息',
            parentRoute: 'M0807'
          }
        },
        {
          path: '/M0809',
          component: _ => import('@/components/views/finance/PayapplyList.vue'),
          meta: {
            title: '付款申请单'
          }
        },
        {
          path: '/PayapplyForm',
          name: 'PayapplyForm',
          component: _ => import('@/components/views/finance/PayapplyForm.vue'),
          props: true,
          meta: {
            title: '付款申请单信息',
            parentRoute: 'M0809'
          }
        },
        {
          path: '/M0810',
          component: _ => import('@/components/views/finance/PaymentList.vue'),
          meta: {
            title: '付款单'
          }
        },
        {
          path: '/PaymentForm',
          name: 'PaymentForm',
          component: _ => import('@/components/views/finance/PaymentForm.vue'),
          props: true,
          meta: {
            title: '付款单信息',
            parentRoute: 'M0810'
          }
        },
        {
          path: '/AddAndChangePayment',
          name: 'AddAndChangePayment',
          component: _ =>
            import('@/components/views/finance/AddAndChangePayment.vue'),
          meta: {
            title: '付款单信息'
          }
        },
        {
          path: '/M0811',
          component: _ =>
            import('@/components/views/finance/PaymentsettlementList.vue'),
          meta: {
            title: '应付结算单'
          }
        },
        {
          path: '/AddAndChangePaymentsettlement',
          name: 'AddAndChangePaymentsettlement',
          component: _ =>
            import('@/components/views/finance/AddAndChangePaymentsettlement.vue'),
          meta: {
            title: '应付结算单信息',
            parentRoute: 'M0811'
          }
        },
        {
          path: '/M0819',
          component: _ =>
            import('@/components/views/basicdata/BeoverdueList.vue'),
          meta: {
            title: '认款后逾期利息表'
          }
        },
        {
          path: '/M0821',
          component: () =>
            import('@/components/views/finance/MakeManage/MakeManage.vue'),
          meta: {
            title: '开票管理'
          }
        },
        {
          path: '/M0817',
          component: _ =>
            import('@/components/views/finance/VouchermanageList.vue'),
          meta: {
            title: '凭证管理'
          }
        },
        {
          path: '/M0201',
          component: _ =>
            import('@/components/views/business/BusinessContactList.vue'),
          meta: {
            title: '业务基础资料'
          }
        },
        {
          path: '/M0209',
          component: _ =>
            import('@/components/common/StatementsComponents.vue'),
          meta: {
            title: '业务报表'
          }
        },
        {
          path: '/M0301',
          component: _ => import('@/components/page/404.vue'),
          meta: {
            title: '风控/法务基础资料'
          }
        },
        {
          path: '/M0401',
          component: _ =>
            import('@/components/views/commerce/OrderBaseList.vue'),
          meta: {
            title: '订单基础资料'
          }
        },
        {
          path: '/M0407',
          component: _ =>
            import('@/components/views/commerce/ExportDeliveryPlanList.vue'),
          meta: {
            title: '出口交货计划'
          }
        },
        {
          path: '/ExportDeliveryPlanForm',
          name: 'ExportDeliveryPlanForm',
          component: _ =>
            import('@/components/views/commerce/ExportDeliveryPlanForm.vue'),
          props: true,
          meta: {
            title: '出口交货计划信息',
            parentRoute: 'M0407'
          }
        },
        {
          path: '/M0408',
          component: _ =>
            import('@/components/views/commerce/ExportOrderList.vue'),
          meta: {
            title: '出口任务单'
          }
        },
        {
          path: '/ExportOrderForm',
          name: 'ExportOrderForm',
          component: _ =>
            import('@/components/views/commerce/ExportOrderForm.vue'),
          props: true,
          meta: {
            title: '出口任务单信息',
            parentRoute: 'M0408'
          }
        },
        {
          path: '/M0409',
          component: _ =>
            import('@/components/views/commerce/CommerceStatement.vue'),
          meta: {
            title: '商务报表'
          }
        },
        {
          path: '/M0410',
          component: () =>
            import('@/components/views/commerce/OnlineOrder.vue'),
          meta: {
            title: '网上订单'
          }
        },
        {
          path: '/OnlineOrderEdit',
          name: 'OnlineOrderEdit',
          component: _ =>
            import('@/components/views/commerce/OnlineOrderEdit.vue'),
          meta: {
            title: '网上订单信息'
          }
        },
        {
          path: '/M0601',
          component: _ => import('@/components/views/custom/CustomPubData.vue'),
          meta: {
            title: '关务基础资料'
          }
        },
        {
          path: '/MaterielBaseForm',
          component: () =>
            import('@/components/views/basicdata/MaterielBaseForm.vue'),
          meta: {
            title: '物料基础信息',
            parentRoute: 'M060120'
          }
        },
        {
          path: '/M0602',
          component: _ => import('@/components/page/404.vue'),
          meta: {
            title: '商品物料'
          }
        },
        {
          path: '/M0603',
          component: _ => import('@/components/page/404.vue'),
          meta: {
            title: '归类'
          }
        },
        {
          path: '/M0711',
          component: _ =>
            import('@/components/views/logistics/LogisticsPubData.vue'),
          meta: {
            title: '仓储物流基础资料'
          }
        },
        {
          path: '/M071101',
          component: _ =>
            import('@/components/views/basicdata/PackageTypeList.vue'),
          meta: {
            title: '包装种类'
          }
        },
        {
          path: '/M071102',
          component: _ =>
            import('@/components/views/basicdata/TrainNumberList.vue'),
          meta: {
            title: '车次'
          }
        },
        {
          path: '/M071103',
          component: _ =>
            import('@/components/views/basicdata/CarCheckList.vue'),
          meta: {
            title: '查车登记表'
          }
        },
        {
          path: '/M071104',
          component: _ =>
            import('@/components/views/basicdata/WarehouseQuotationList.vue'),
          meta: {
            title: '仓储报价单'
          }
        },
        {
          path: '/WarehouseQuotationForm',
          component: _ =>
            import('@/components/views/basicdata/WarehouseQuotationForm.vue'),
          name: 'WarehouseQuotationForm',
          meta: {
            title: '仓储报价单信息',
            parentRoute: 'M071104'
          }
        },
        {
          path: '/M071105',
          component: _ =>
            import('@/components/views/basicdata/ShippingRouteList.vue'),
          meta: {
            title: '发运路线'
          }
        },
        /* {
					path: '/M071106',
					component: _ => import('@/components/views/basicdata/MaterielLogisticsList.vue'),
					meta: {
						title: '仓储物料信息'
					}
				}, */ {
          path: '/M0802',
          component: _ =>
            import('@/components/views/finance/OtherBillList.vue'),
          meta: {
            title: '其它计费单'
          }
        },
        {
          path: '/M0820',
          component: _ =>
            import('@/components/views/basicdata/SettlementList.vue'),
          meta: {
            title: '财务基础资料'
          }
        },
        {
          path: '/otherbillForm',
          name: 'otherbillForm',
          component: _ =>
            import('@/components/views/finance/OtherBillForm.vue'),
          meta: {
            title: '其它计费单信息',
            parentRoute: 'M0802'
          }
        },
        {
          path: '/M0803',
          component: _ =>
            import('@/components/views/finance/AdjustApplicationList.vue'),
          meta: {
            title: '账务调整申请单'
          }
        },
        {
          path: '/adjustApplicationForm',
          name: 'adjustApplicationForm',
          component: _ =>
            import('@/components/views/finance/AdjustApplicationForm.vue'),
          meta: {
            title: '账务调整申请单信息',
            parentRoute: 'M0803'
          }
        },
        {
          path: '/M0804',
          component: _ =>
            import('@/components/views/finance/TransferOrderList.vue'),
          meta: {
            title: '转款单'
          }
        },
        {
          path: '/TransferForm',
          component: _ =>
            import('@/components/views/finance/TransferOrderForm.vue'),
          meta: {
            title: '转款单信息',
            parentRoute: 'M0804'
          }
        },
        {
          path: '/M0812',
          component: _ =>
            import('@/components/views/finance/ExpensesClaimSheetList.vue'),
          meta: {
            title: '费用报销单'
          }
        },
        {
          path: '/ExpensesClaimSheetForm',
          name: 'ExpensesClaimSheetForm',
          props: true,
          component: _ =>
            import('@/components/views/finance/ExpensesClaimSheetForm.vue'),
          meta: {
            title: '费用报销单信息',
            parentRoute: 'M0812'
          }
        },
        {
          path: '/M0813',
          component: _ =>
            import('@/components/views/finance/AdvanceRemittanceList.vue'),
          meta: {
            title: '出口预收汇转款'
          }
        },
        {
          path: '/AdvanceRemittanceForm',
          name: 'AdvanceRemittanceForm',
          props: true,
          component: _ =>
            import('@/components/views/finance/AdvanceRemittanceForm.vue'),
          meta: {
            title: '出口预收汇转款信息',
            parentRoute: 'M0813'
          }
        },
        {
          path: '/M0814',
          component: _ =>
            import('@/components/views/finance/AllocationOrderList.vue'),
          meta: {
            title: '资金调拨单'
          }
        },
        {
          path: '/AllocationOrderForm',
          name: 'AllocationOrderForm',
          props: true,
          component: _ =>
            import('@/components/views/finance/AllocationOrderForm.vue'),
          meta: {
            title: '资金调拨单信息',
            parentRoute: 'M0814'
          }
        },
        {
          path: '/M0815',
          component: _ =>
            import('@/components/views/finance/RemittanceList.vue'),
          meta: {
            title: '调汇申请单'
          }
        },
        {
          path: '/RemittanceForm',
          name: 'RemittanceForm',
          props: true,
          component: _ =>
            import('@/components/views/finance/RemittanceForm.vue'),
          meta: {
            title: '调汇申请单信息',
            parentRoute: 'M0815'
          }
        },
        {
          path: '/M0816',
          component: _ =>
            import('@/components/views/finance/InvoiceReceiptList.vue'),
          meta: {
            title: '发票签收单'
          }
        },
        {
          path: '/InvoiceReceiptForm',
          name: 'InvoiceReceiptForm',
          props: true,
          component: _ =>
            import('@/components/views/finance/InvoiceReceiptForm.vue'),
          meta: {
            title: '发票签收单信息',
            parentRoute: 'M0816'
          }
        },
        {
          path: '/M0818',
          component: _ =>
            import('@/components/views/finance/FinanceStatement.vue'),
          meta: {
            title: '结算报表'
          }
        },
        {
          path: '/M0901',
          component: _ => import('@/components/views/smart/BossStatement.vue'),
          meta: {
            title: '老板报表'
          }
        },
        {
          path: '/M0902',
          component: _ =>
            import('@/components/views/smart/SatisfactionScore.vue'),
          meta: {
            title: '满意度评分'
          }
        },
        {
          path: '/M0903',
          component: _ =>
            import('@/components/views/smart/OperationAnalysis.vue'),
          meta: {
            title: '经营分析'
          }
        },
        {
          path: '/M0904',
          component: _ =>
            import('@/components/views/smart/StrategicAnalysis.vue'),
          meta: {
            title: '战略分析'
          }
        },
        {
          path: '/M0905',
          component: _ =>
            import('@/components/views/smart/DocumentsManagement.vue'),
          meta: {
            title: '单证管理'
          }
        },
        {
          path: '/M1000',
          component: _ =>
            import('@/components/views/system/DepartmentList.vue'),
          meta: {
            title: '部门管理'
          }
        },
        {
          path: '/M1001',
          component: _ => import('@/components/views/system/UserList.vue'),
          meta: {
            title: '用户管理'
          }
        },
        {
          path: '/M1002',
          component: _ => import('@/components/views/system/RoleList.vue'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/M1003',
          component: _ => import('@/components/views/system/RoleauthList.vue'),
          meta: {
            title: '角色权限'
          }
        },
        {
          path: '/M1004',
          component: _ => import('@/components/views/system/UserroleList.vue'),
          meta: {
            title: '用户角色'
          }
        },
        {
          path: '/M1005',
          component: _ => import('@/components/views/system/UserauthList.vue'),
          meta: {
            title: '用户权限'
          }
        },
        {
          path: '/M1006',
          component: _ => import('@/components/views/system/DictList.vue'),
          meta: {
            title: '数据字典'
          }
        },
        {
          path: '/M1008',
          component: _ => import('@/components/views/system/NoticeList.vue'),
          meta: {
            title: '系统公告'
          }
        },
        {
          path: '/NoticeEdit',
          name: 'NoticeEdit',
          component: _ => import('@/components/views/system/NoticeEdit.vue'),
          meta: {
            title: '创建系统公告',
            parentRoute: 'M1008'
          }
        },
        {
          path: '/NoticeDetails',
          name: 'NoticeDetails',
          component: _ => import('@/components/views/system/NoticeDetails.vue'),
          meta: {
            title: '系统公告详情'
          }
        },
        {
          path: '/M1007',
          name: 'GlobalSetting',
          component: _ => import('@/components/views/system/GlobalSetting.vue'),
          meta: {
            title: '全局设置'
          }
        },
        {
          path: '/M0207',
          name: 'CustomerAuthentication',
          component: _ =>
            import('@/components/views/business/CustomerAuthenticationList.vue'),
          meta: {
            title: '网上客户认证'
          }
        },
        {
          path: '/CustomerAuthenticationForm',
          name: 'CustomerAuthenticationForm',
          component: _ =>
            import('@/components/views/business/CustomerAuthenticationForm.vue'),
          meta: {
            title: '网上客户认证'
          }
        },
        {
          path: '/M1009',
          component: _ =>
            import('@/components/views/basicdata/EarlywarningList.vue'),
          meta: {
            title: '智能预警'
          }
        },
        {
          path: '/EarlywarningFrom',
          name: 'EarlywarningFrom',
          component: _ =>
            import('@/components/views/basicdata/EarlywarningFrom.vue'),
          meta: {
            title: '智能预警设置'
          }
        },
        {
          path: '/AccessoryManageList',
          name: 'AccessoryManageList',
          component: () =>
            import('@/components/common/upload/AccessoryManageList.vue'),
          props: true,
          meta: {
            title: '附件管理'
          }
        },
        {
          path: '/M1010',
          component: () =>
            import('@/components/views/system/JustinTimeInventoryList.vue'),
          meta: {
            title: '即时库存'
          }
        },
        {
          path: '/M1011',
          component: () =>
            import('@/components/views/system/CheckSchemeList.vue'),
          meta: {
            title: '盘点方案'
          }
        },
        
        {
          path: '/M1103',
          component: () =>
            import('@/components/views/enterpriseInterconnection/ClientDataInterconnection.vue'),
          meta: {
            title: '客户数据互联'
          }
        },
        {
          path: '/404',
          component: _ => import('@/components/page/404.vue'),
          meta: {
            title: '404'
          }
        },
        {
          path: '/403',
          component: _ => import('@/components/page/403.vue'),
          meta: {
            title: '403'
          }
        }
      ]
    },
    {
      path: '/login',
      component: _ => import('@/components/page/Login.vue')
    },
    {
      path: '/tanstion',
      component: _ => import('@/components/page/TanstionPage.vue')
    },
    {
      path: '*',
      redirect: '/404'
    }
    /* {
      path: '/export',
      component: () => import('@/test/Export.vue')
    } */
  ]
})
