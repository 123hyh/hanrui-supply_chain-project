<template>
  <div>
    <!-- 表单弹窗 -->
    <el-dialog
      v-if="dialog"
      :title="title"
      :visible="visible"
      @close="close"
    >
      <form-component
        :ruleForm="rules"
        :formModel="entityData"
        :inputKey="formConfig"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify"
      ></form-component>
      <slot name="btn_buttom"></slot>
    </el-dialog>
    <template v-else>
      <slot name="btn_top"></slot>
      <form-component
        :formModel="entityData"
        :inputKey="formConfig"
        @handlerFormConfigClickSearch="rousePopover"
        @handlerFormVerify="handlerFormVerify"
      ></form-component>
    </template>
    <!-- 表格弹窗选择 -->
    <popover-component
      :itemName="tableDialog.title"
      :popoverType="tableDialog.popoverType"
      :isShowPopover="tableDialog.isshow"
      :ruleForm="tableDialog.ruleForm"
      :formConfig="tableDialog.queryBarConfig"
      :btnObj="tableDialog.btnObj"
      :popoverList="tableDialog.data"
      :popoverListKey="tableDialog.tableConfig"
      :count="tableDialog.count"
      @handleBtnClickType="handleTableDialogClick"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
    ></popover-component>
  </div>
</template>
<script>
//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

// 组件
import PopoverComponent from "@/components/common/Popover.vue";
import FormComponent from "@/components/common/FormConfig.vue";

//仓库(起运地，目的地，交货区域)
import TableWarehouse from "@/domain/tableconfig/basicdata/Warehouse.js";
//物料
import TableMateriel from "@/domain/tableconfig/basicdata/MaterielBase.js";
//事务类型
import TableTransactionType from "@/domain/tableconfig/basicdata/TransactionType.js";
//库存组织（公司信息）
import TableCompanyInfo from "@/domain/tableconfig/basicdata/CompanyInfo.js";
//委托方(转入单号委托方)
import TableClient from "@/domain/tableconfig/business/Client";
//供应商（发货方）
import TableSupplier from "@/domain/tableconfig/basicdata/SupplierBase";
//客户(送货客户，收货方, 收货客户)
import TableCustomer from "@/domain/tableconfig/basicdata/Customer";
//联系人
import TableCustomerContact from "@/domain/tableconfig/basicdata/CustomerContact";
//承运商(推荐承运商，主承运方)
import TableCarrier from "@/domain/tableconfig/basicdata/CarrierBase";
//车次
import TableTrainNumber from "@/domain/tableconfig/basicdata/TrainNumber";
//部门
import TableDepartment from "@/domain/tableconfig/system/Department";
//车牌号
import TableVehicleInfo from "@/domain/tableconfig/basicdata/VehicleInfo";
//车型
import TableCarType from "@/domain/tableconfig/basicdata/CarType";
//集装箱
import TableContainer from "@/domain/tableconfig/basicdata/Container";
//运输时效
import TableTransportTime from "@/domain/tableconfig/basicdata/TransportTime";
//员工（仓管员，本单商务，司机，寄件人，收回经手人）
import TableEmployeeInfo from "@/domain/tableconfig/basicdata/EmployeeInfo";
//发运路线
import TableShippingRoute from "@/domain/tableconfig/basicdata/ShippingRoute";
//物流仓储运输区域（交货区域）
import TableDeliveryArea from "@/domain/tableconfig/basicdata/DeliveryArea";
//商品税号
import TableGoodsTax from "@/domain/tableconfig/basicdata/GoodsTax";
//物料品牌
import TableBrand from "@/domain/tableconfig/basicdata/Brand";
//城市(寄件城市,收件城市)
import TableCityList from "@/domain/tableconfig/other/CityList";

//提运单(香港上货计划)
import TableHkscheduleBase from "@/domain/tableconfig/logistics/HkscheduleBase";
// 香港收货入库单
import GodownEntryTable from "@/domain/tableconfig/logistics/GodownEntry.js";
// 税号
import CustomsMateriel from "@/domain/tableconfig/basicdata/CustomsMateriel.js";
// 品牌
import Brand from "@/domain/tableconfig/basicdata/Brand.js";
// 产地
import Origin from "@/domain/tableconfig/basicdata/Origin.js";
// 计量单位
import unit from "@/domain/tableconfig/basicdata/Measurement.js";
// 委托单
import EntrustOrderTable from "@/domain/tableconfig/commerce/EntrustOrder";
// 委托单 - 商品明细
import EntrustGoodsTable from "@/domain/tableconfig/commerce/EntrustGoods";
// 买方接(提)货
import BuyerReceiveGoodsList from "@/domain/tableconfig/business/BuyerReceiveGoods";
// 深圳发运单
import SZimportinvoice from "@/domain/tableconfig/logistics/Szimportinvoice";
// 监管方式
import SupervisionMode from "@/domain/tableconfig/basicdata/SupervisionMode.js";
export default {
  components: {
    FormComponent,
    PopoverComponent
  },
  props: {
    title: String,
    dialog: false,
    visible: false,
    entity: {
      type: Object,
      default: () => ({})
    },
    formConfig: Array,
    rules: Object,
    parentModule: {
      // 特殊的弹窗 需传入 对应模块的名字，以区分 同名
      type: String,
      default: ""
    }
  },
  data () {
    return {
      searchTarget: '',
      entityData: this.entity,
      tableDialogConfig: {
        buyerReceiveGoodsNo: BuyerReceiveGoodsList,
        originOrder: SZimportinvoice,
        deliveryAreaName: TableDeliveryArea,
        materialName: EntrustGoodsTable, // 商品物料
        inventoryName: TableMateriel,
        endWarehouseName: TableWarehouse,
        startWarehouseName: TableWarehouse,
        regulateType: SupervisionMode,
        warehouseName: TableWarehouse,
        stockGroup: TableWarehouse,
        shipmentArea: TableWarehouse,
        startPlace: TableWarehouse,
        endPlace: TableWarehouse,
        issueTypeName: TableTransactionType,
        storeOrgName: TableCompanyInfo,
        receiveCompanyName: TableCompanyInfo,
        expressDesName: TableCompanyInfo,
        shipmentGroupName: TableCompanyInfo,
        delegeteName: TableClient,
        inBillNoDelegeteName: TableClient,
        supplierName: TableSupplier,
        shipperName: TableSupplier,
        shipper: TableSupplier,
        deliveryCustomerName: TableSupplier,
        customerName: TableCustomer,
        receiveCustomerName: TableCustomer,
        consigneeName: TableCustomer,
        inBillCustomerName: TableCustomer,
        contactsName: TableCustomerContact,
        clientName: TableCustomer,
        receiveClientName: TableCustomer,
        carrierName: TableCarrier,
        carrierCode: TableCarrier,
        recommendedName: TableCarrier,
        recomCarrierName: TableCarrier,
        mainCarrierName: TableCarrier,
        trips: TableTrainNumber,
        trainNo: TableTrainNumber, // 车次
        departmentName: TableDepartment,
        platesNoName: TableVehicleInfo,
        plateNoName: TableVehicleInfo,
        vehicleTypeName: TableCarType,
        containerName: TableContainer,
        transportTimeName: TableTransportTime,
        transportTimingName: TableTransportTime,
        storekeeperName: TableEmployeeInfo,
        thisBusinessName: TableEmployeeInfo,
        driverName: TableEmployeeInfo,
        backBrokerName: TableEmployeeInfo,
        senderName: TableEmployeeInfo,
        sendLineName: TableShippingRoute,
        routeName: TableShippingRoute,
        taxName: TableGoodsTax,
        brandName: TableBrand,
        sendCityName: TableCityList,
        receiveCityName: TableCityList,
        deliveryNo: TableHkscheduleBase,
        entrustOrderNos: EntrustOrderTable, // 订单号 selectTable
        shipWarehouse: TableWarehouse, // 仓库
        sourceBillType: GodownEntryTable,
        taxNo: CustomsMateriel,
        BrandName: Brand,
        originPlaceName: Origin,
        unitName: unit,
        godownentry: {
          // 香港入库
          // 1 香港收货单 / 2 委托单
          delegeteBillNo: {
            "1": require("@/domain/tableconfig/logistics/ReceiptOrder.js")
              .default,
            "2": EntrustOrderTable
          }
        },
        szinstoreEntity: {
          // 深圳入库
          // 1 深圳收货单 / 2 委托单
          delegeteBillNo: {
            "1": require("@/domain/tableconfig/logistics/Szreceiving.js")
              .default,
            "2": EntrustOrderTable
          }
        },
        outstoreEntity: {
          // 香港出库
          // 1 深圳入库单 / 2 委托单
          delegeteBillNo: {
            "1": require("@/domain/tableconfig/logistics/Szinstore.js").default,
            "2": EntrustOrderTable
          }
        },
        HkshipmentBase: {
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户 / 6 其它 7 供应商
          feeBearName: {
            "1": TableCompanyInfo,
            "2": TableClient,
            "3": TableCustomer,
            "4": TableEmployeeInfo,
            "5": TableCustomer,
            "6": TableClient,
            "7": TableSupplier
          }
        },
        Importinvoice: {
          // 香港发货通知单
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户
          carrierName: {
            "1": TableCompanyInfo,
            "2": TableClient,
            "3": TableCustomer,
            "4": TableEmployeeInfo,
            "5": TableCustomer
          },
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户
          freightPayerName: {
            "1": TableCompanyInfo,
            "2": TableClient,
            "3": TableCustomer,
            "4": TableEmployeeInfo,
            "5": TableCustomer
          }
        }
      },
      tableDialog: {
        isshow: false,
        popoverType: "table",
        title: "",
        target: "", // 所点击的 key
        targetType: "", // 点击 key 对应的类型
        obj: "", // tableConfig 的每一项
        count: 0,
        queryBarConfig: [], // 弹出框查询栏
        btnObj: [
          {
            type: "search",
            label: "查询"
          }
        ], // 查询栏按钮
        ruleForm: {}, // 查询栏的model绑定
        data: [],
        tableConfig: []
      }
    };
  },
  computed: {
    tableDialogSearch () {
      return {
        searchCode_buyerReceiveGoodsNo: "billNo",
        searchCode_originOrder: "shipmentBaseCode",
        searchCode_deliveryAreaName: "deliveryAreaCode",
        searchCode_materialName: "entrustOrderNo",
        searchCode_inventoryName: "inventoryCode",
        searchCode_endWarehouseName: "warehouseCode",
        searchCode_startWarehouseName: "warehouseCode",
        searchCode_warehouseName: "warehouseCode",
        searchCode_stockGroup: "warehouseCode",
        searchCode_shipWarehouse: "warehouseCode",
        searchCode_shipmentArea: "warehouseCode",
        searchCode_startPlace: "warehouseCode",
        searchCode_endPlace: "warehouseCode",
        searchCode_issueTypeName: "transactionCode",
        searchCode_storeOrgName: "storeOrgCode",
        searchCode_receiveCompany: "companyCode",
        searchCode_expressDesName: "companyCode",
        searchCode_shipmentGroupName: "companyCode",
        searchCode_delegeteName: "clientNo",
        searchCode_inBillNoDelegeteName: "clientNo",
        searchCode_supplierName: "supplierCode",
        searchCode_shipperName: "supplierCode",
        searchCode_shipper: "supplierCode",
        searchCode_customerName: "customerNo",
        searchCode_deliveryCustomerName: "supplierCode",
        searchCode_receiveCustomerName: "customerNo",
        searchCode_consigneeName: "customerNo",
        searchCode_inBillCustomerName: "customerNo",
        searchCode_contactsName: "customerNo",
        searchCode_clientName: "customerNo",
        searchCode_receiveClientName: "customerNo",
        searchCode_carrierName: "carrierCode",
        searchCode_carrierCode: "carrierCode",
        searchCode_recommendedName: "carrierCode",
        searchCode_recomCarrierName: "carrierCode",
        searchCode_mainCarrierName: "carrierCode",
        searchCode_trips: "trainNumberCode",
        searchCode_trainNo: "trainNumberCode",
        searchCode_departmentName: "departmentCode",
        searchCode_platesNoName: "vehicleInfoCode",
        searchCode_plateNoName: "vehicleInfoCode",
        searchCode_vehicleTypeName: "carTypeCode",
        searchCode_containerName: "containerCode",
        searchCode_transportTimeName: "transportTimeCode",
        searchCode_transportTimingName: "transportTimeCode",
        searchCode_storekeeperName: "employeeInfoCode",
        searchCode_thisBusinessName: "employeeInfoCode",
        searchCode_driverName: "employeeInfoCode",
        searchCode_backBrokerName: "employeeInfoCode",
        searchCode_senderName: "employeeInfoCode",
        searchCode_sendLineName: "shippingRouteCode",
        searchCode_routeName: "shippingRouteCode",
        searchCode_taxName: "goodsTaxCode",
        searchCode_brandName: "brandCode",
        searchCode_sendCityName: "sendCityCode",
        searchCode_receiveCityName: "city",
        searchCode_deliveryNo: "scheduleBaseCode",
        searchCode_entrustOrderNos: "entrustOrderNo",
        searchCode_sourceBillType: "godownEntryCode",
        searchCode_taxNo: "customsMaterielCode",
        searchCode_BrandName: "brandCode",
        searchCode_originPlaceName: "originCode",
        searchCode_unitName: "unitConvertCode",
        godownentry: {
          // 香港入库
          // 1 香港收货单 / 2 委托单
          searchCode_delegeteBillNo: {
            "1": "receiptOrderCode",
            "2": "entrustOrderNo"
          }
        },
        szinstoreEntity: {
          // 深圳入库
          // 1 深圳收货单 / 2 委托单
          searchCode_delegeteBillNo: {
            "1": "billNo",
            "2": "entrustOrderNo"
          }
        },
        outstoreEntity: {
          // 香港出库
          // 1 深圳入库单 / 2 委托单
          searchCode_delegeteBillNo: {
            "1": "billNo",
            "2": "entrustOrderNo"
          }
        },
        HkshipmentBase: {
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户 / 6 其它 7 供应商
          searchCode_feeBearName: {
            "1": "companyCode",
            "2": "clientNo",
            "3": "customerNo",
            "4": "employeeInfoCode",
            "5": "customerNo",
            "6": "clientNo",
            "7": "supplierCode"
          }
        },
        Importinvoice: {
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户
          searchCode_carrierName: {
            "1": "companyCode",
            "2": "clientNo",
            "3": "customerNo",
            "4": "employeeInfoCode",
            "5": "customerNo"
          },
          // 1 公司 / 2 委托方 3 客户 / 4 业务员 5 退款客户
          searchCode_freightPayerName: {
            "1": "companyCode",
            "2": "clientNo",
            "3": "customerNo",
            "4": "employeeInfoCode",
            "5": "customerNo"
          }
        }
      };
    }
  },
  watch: {
    entity (val) {
      this.entityData = val; //新增result的watch，监听变更并同步到myResult上
    },
    entityData (val) {
      //xxcanghai 小小沧海 博客园
      this.$emit("on-result-change", val); //③组件内对myResult变更后向外部发送事件通知
    }
  },
  created () {
    api.initSelect(this.formConfig);
    // 			console.log(this.tableDialogConfig)
    // 			let obj = {}
    // 			for (let item in this.tableDialogConfig) {
    // 				console.log(item)
    // 				obj[`searchCode_${item}`] = item.includes('Name') ? item.replace(/Name/g, "Code") : item.includes('Code') ? item :
    // 					`${item}Code`;
    // 			}
    // 			console.log(JSON.stringify(obj))
  },
  methods: {
    async tableDialogPreservation (clickrow) {
      switch (this.tableDialog.target) {
        case "buyerReceiveGoodsNo":
          this.entityData.buyerReceiveGoodsNo = clickrow.billNo;
          delete clickrow.billNo;
          delete clickrow.status;
          delete clickrow.statusName;
          this.entityData = {
            ...this.entityData,
            ...clickrow,
            costRange: clickrow.costRange, //费用区间
            carrierName: clickrow.carrierName, //承运商
            receiveAddress: clickrow.receiveAddress, //收货地址
            cashAmount: clickrow.cashAmount, //现金金额
            sendCityName: clickrow.sendCityName, //寄件城市
            currency: clickrow.currency, //币别
            waitNotice: clickrow.waitNotice, //等通知
            remark: clickrow.remark, //备注
            invoiceNo: clickrow.invoiceNo, //发票号-------------
            // buyerReceiveGoodsNo: clickrow.billNo,
            receiveFirstSendFirst: clickrow.deliveryPriority, //先收先发货
            transportType: clickrow.transportMode, //运输方式
            timeFirst: clickrow.timeLimitPriority, //时效优先
            costFirst: clickrow.costPriority, //费用优先
            deliveryType: clickrow.deliveryMode, //交货方式
            transportTimeEfficiency: clickrow.timeLimit, //运输时效
            transportTimeName: clickrow.timeLimitName,
            consignee: clickrow.receiveCompanyCode, //收货公司
            consigneeName: clickrow.receiveCompanyName,
            contactsName: clickrow.receiveContactName, //联系人-收货联系人
            contactsPhone: clickrow.contactTel, //联系人电话-联系电话
            receiveCity: clickrow.receiptCity, //收件城市
            receiveCityName: clickrow.receiptCityName,
            freightReceiverType: clickrow.underPartyType, //运费承担方类型
            freightPayerName: clickrow.underPartyName, //运费承担方-运费承担对象
            chargingObject: clickrow.chargeObject, //计费对象
            mainland: clickrow.inland, //是否境内
            incidentalType: clickrow.categoryExpenses, //杂费类别
            priceIncludeFreight: clickrow.goodsValueContainFee, //货价含运费
            printRemark: clickrow.deliverRemark, //送货单打印备注
            customerDesignatedCarrier: clickrow.hasAssignCarrier, //客户指定承运商
            freightPayType: clickrow.paymentMode, //运费付费方式-运费支付方式
            incidentalType: clickrow.collectFeeType, //杂费类别
            pickupAddress: clickrow.pickUpAddress, //自提地点
            requiredTimeArrival: clickrow.arrivalDate, //要求到货时间-要求到货日期
            incidentalAmount: clickrow.cashAmount, //杂费金额-现金金额
            sendLine: clickrow.shippingRouteCode, //发货路线-发运路线
            sendLineName: clickrow.dispatchLineName
          };
          const { data } = await api.searchOneentrustorderData(
            clickrow.delegeteBillNo
          );
          this.entityData = {
            ...this.entityData,
            delegete: data.clientCode,
            delegeteName: data.clientName
          };
          break;
        case "originOrder":
          this.entityData.originOrder = clickrow.billNo;
          delete clickrow.billNo;
          delete clickrow.status;
          delete clickrow.statusName;
          this.entityData = {
            ...this.entityData,
            ...clickrow,
            // originOrder: clickrow.billNo,// 来源单据
            carrierType: clickrow.carrierType, //承运方类型
            deliveryArea: clickrow.deliveryArea, //交货区域
            deliveryAreaName: clickrow.deliveryAreaName,
            storekeeperName: clickrow.storekeeperName, //仓管员
            transportType: clickrow.transportType, //运输方式
            invoiceNo: clickrow.invoiceNo, //发票号---------
            transportTimingName: clickrow.transportTimeName, //运输时效
            sendUp: clickrow.deliverToSend, //送改发
            address: clickrow.receiveAddress, //收货地址
            deliveryWay: clickrow.deliveryType, //交货方式
            needCash: clickrow.receivables, //需收款
            bearType: clickrow.freightReceiverType, //运费承担方类型
            feeBearName: clickrow.freightPayerName, //运费承担方
            selfAddress: clickrow.pickupAddress, //自提地址
            sendCity: clickrow.sendCityName, //寄件城市
            receiveCity: clickrow.receiveCityName, //收件城市
            firstSend: clickrow.receiveFirstSendFirst, //先收先发货
            appointCarrier: clickrow.customerDesignatedCarrier, //客户指定承运商
            recomCarrierName: clickrow.recommendedName //推荐承运商
          };
          break;
        case "warehouseName":
          this.entityData = {
            ...this.entityData,
            warehouseName: clickrow.warehouseName,
            warehouse: clickrow.warehouseCode,
            warehouseCode: clickrow.warehouseCode
          };
          break;
        case "startWarehouseName":
          (this.entity.startWarehouseName = clickrow.warehouseName),
            (this.entity.startWarehouse = clickrow.warehouseCode);
          /* this.entityData = {
            ...this.entityData,
            startWarehouseName: clickrow.warehouseName,
            startWarehouse: clickrow.warehouseCode,
          } */
          break;
        case "regulateType":
          this.entity = { ...this.entity, regulateType: clickrow.supervisionModeName }
          /* (this.entity.regulateType = clickrow.supervisionModeCode),
          (this.entity.regulateType = clickrow.supervisionModeName); */
          break;
        case "endWarehouseName":
          (this.entity.endWarehouseName = clickrow.warehouseName),
            (this.entity.endWarehouse = clickrow.warehouseCode);
          /* this.entityData = {
            ...this.entityData,
            endWarehouseName: clickrow.warehouseName,
            endWarehouse: clickrow.warehouseCode,
          } */
          break;
        case "stockGroup":
          this.entityData = {
            ...this.entityData,
            stockGroup: clickrow.warehouseName,
            stockGroupCode: clickrow.warehouseCode
          };
          break;
        case "shipWarehouse": //发货仓库
          this.entityData = {
            ...this.entityData,
            shipWarehouse: clickrow.warehouseName,
            shipWarehouseCode: clickrow.warehouseCode
          };
          break;
        case "shipmentArea": //发运区域
          this.entityData = {
            ...this.entityData,
            shipmentArea: clickrow.warehouseName,
            shipmentAreaCode: clickrow.warehouseCode
          };
          break;
        case "startPlace": //起始地
          this.entityData = {
            ...this.entityData,
            startPlace: clickrow.warehouseName,
            startPlaceCode: clickrow.warehouseCode
          };
          break;
        case "endPlace": //到达地
          this.entityData = {
            ...this.entityData,
            endPlace: clickrow.warehouseName,
            endPlaceCode: clickrow.warehouseCode
          };
          break;
        case "deliveryAreaName":
          this.entityData = {
            ...this.entityData,
            deliveryAreaName: clickrow.deliveryAreaName,
            deliveryArea: clickrow.deliveryAreaCode
          };
          break;
        case "materialName": // 商品物料
          console.log(clickrow);
          this.entityData = {
            ...this.entityData,
            materialName: clickrow.goodsName,
            materialCode: clickrow.goodsCode,
            unit: clickrow.sellerUnit,
            unitName: clickrow.sellerUnitName,
            quantity: clickrow.sellerQuantity,
            specificationType: clickrow.arrivalGoodsModel,
            price: clickrow.sellerPrice,
            entrustOrderNos: [clickrow.entrustOrderNo]
          };
          break;
        case "inventoryName":
          this.entityData = {
            ...this.entityData,
            inventoryCode: clickrow.materielCode,
            inventoryName: clickrow.tradeName,
            specificationType: clickrow.specificationType,
            goodsName: clickrow.tradeName
          };
          break;
        case "issueTypeName":
          this.entityData = {
            ...this.entityData,
            issueTypeName: clickrow.bizType,
            issueType: clickrow.transactionCode
          };
          break;
        case "storeOrgName":
          this.entityData = {
            ...this.entityData,
            storeOrgName: clickrow.companyName,
            storeOrg: clickrow.companyCode
          };
          break;
        case "receiveCompanyName":
          this.entityData = {
            ...this.entityData,
            receiveCompanyName: clickrow.companyName,
            receiveCompany: clickrow.companyCode
          };
          break;
        case "expressDesName":
          this.entityData = {
            ...this.entityData,
            expressDesName: clickrow.companyName,
            expressDes: clickrow.companyCode
          };
          break;
        case "shipmentGroupName":
          this.entityData = {
            ...this.entityData,
            shipmentGroupName: clickrow.companyName,
            shipmentGroup: clickrow.companyCode
          };
          break;
        case "delegeteName":
          this.entityData = {
            ...this.entityData,
            delegeteName: clickrow.clientName,
            delegete: clickrow.clientNo
          };
          break;
        case "inBillNoDelegeteName":
          this.entityData = {
            ...this.entityData,
            inBillNoDelegeteName: clickrow.clientName,
            inBillNoDelegete: clickrow.clientNo
          };
          break;
        case "supplierName":
          this.entityData = {
            ...this.entityData,
            supplierName: clickrow.supplierName,
            supplier: clickrow.supplierCode
          };
          break;
        case "shipperName":
          this.entityData = {
            ...this.entityData,
            shipperName: clickrow.supplierName,
            shipper: clickrow.supplierCode
          };
          break;
        case "shipper":
          this.entityData = {
            ...this.entityData,
            shipper: clickrow.supplierName,
            shipperCode: clickrow.supplierCode
          };
          break;
        case "customerName":
          this.entityData = {
            ...this.entityData,
            customerName: clickrow.customerName,
            customer: clickrow.customerNo
          };
          break;
        case "clientName":
          this.entityData = {
            ...this.entityData,
            clientName: clickrow.customerName,
            client: clickrow.customerNo
          };
          break;
        case "deliveryCustomerName":
          this.entityData = {
            ...this.entityData,
            deliveryCustomerName: clickrow.supplierName,
            deliveryCustomer: clickrow.supplierCode
          };
          break;
        case "receiveCustomerName":
          this.entityData = {
            ...this.entityData,
            receiveCustomerName: clickrow.customerName,
            receiveCustomer: clickrow.customerNo
          };
          break;
        case "consigneeName":
          this.requestTable(
            { customerNo: clickrow.customerNo },
            { api: "getCustomerContact" }
          ).then(({ list, count } = data) => {
            this.entityData = {
              ...this.entityData,
              consigneeName: clickrow.customerName,
              consignee: clickrow.customerNo,
              contactsName: list.length > 0 ? list[0].contact : "",
              contactsPhone: list.length > 0 ? list[0].phone : "",
              receiveAddress: clickrow.address
            };
          });
          break;
        case "receiveClientName":
          this.requestTable(
            { customerNo: clickrow.customerNo },
            { api: "getCustomerContact" }
          ).then(({ list, count } = data) => {
            this.entityData = {
              ...this.entityData,
              receiveClientName: clickrow.customerName,
              receiveClient: clickrow.customerNo,
              receiveContact: list.length > 0 ? list[0].contact : "",
              telephone: list.length > 0 ? list[0].phone : "",
              address: clickrow.address
            };
          });
          break;
        case "inBillCustomerName":
          this.entityData = {
            ...this.entityData,
            inBillCustomerName: clickrow.customerName,
            inBillCustomer: clickrow.customerNo
          };
          break;
        case "contactsName":
          this.entityData = {
            ...this.entityData,
            contactsName: clickrow.contact,
            contacts: clickrow.itemCode,
            contactsPhone: clickrow.phone,
            receiveAddress: clickrow.destination,
            receiveCompany: clickrow.receiveCompany,
            receiveCompanyName: clickrow.receiveCompanyName
          };
          break;
        case "carrierName":
          (this.entity.carrierName = clickrow.carrierName),
            (this.entity.carrier = clickrow.carrierCode);
          /* this.entityData = {
            ...this.entityData,
            carrierName: clickrow.carrierName,
            carrierCode: clickrow.carrierCode,
          } */
          break;
        case "carrierCode":
          this.entityData = {
            ...this.entityData,
            carrierName: clickrow.carrierName,
            carrierCode: clickrow.carrierCode
          };
          break;
        case "recommendedName":
          this.entityData = {
            ...this.entityData,
            recommendedName: clickrow.carrierName,
            recommendedCarrier: clickrow.carrierCode
          };
          break;
        case "recomCarrierName":
          this.entityData = {
            ...this.entityData,
            recomCarrierName: clickrow.carrierName,
            recomCarrier: clickrow.carrierCode
          };
          break;
        case "mainCarrierName":
          this.entityData = {
            ...this.entityData,
            mainCarrierName: clickrow.carrierName,
            mainCarrier: clickrow.carrierCode
          };
          break;
        case "trips":
          (this.entity.trips = clickrow.trainNumberName),
            (this.entity.tripsCode = clickrow.trainNumberCode);
          /* this.entityData = {
            ...this.entityData,
            trips: clickrow.trainNumberName,
            tripsCode: clickrow.trainNumberCode,
          } */
          break;
        case "trainNo":
          this.entityData = {
            ...this.entityData,
            trainNo: clickrow.trainNumberCode,
            trainName: clickrow.trainNumberName
          };
          break;
        case "departmentName":
          this.entityData = {
            ...this.entityData,
            departmentName: clickrow.departmentName,
            department: clickrow.departmentCode
          };
          break;
        case "platesNoName":
          (this.entity.platesNoName = clickrow.vehicleNo),
            (this.entity.platesNo = clickrow.vehicleInfoCode),
            (this.entity.carType = clickrow.carType);
          /* this.entityData = {
            ...this.entityData,
            platesNoName: clickrow.vehicleNo,
            platesNo: clickrow.vehicleInfoCode,
          } */
          break;
        case "plateNoName":
          this.entityData = {
            ...this.entityData,
            plateNoName: clickrow.vehicleNo,
            plateNo: clickrow.vehicleInfoCode
          };
          break;
        case "vehicleTypeName":
          this.entityData = {
            ...this.entityData,
            vehicleTypeName: clickrow.carTypeName,
            vehicleType: clickrow.carTypeCode
          };
          break;
        case "containerName":
          (this.entity.containerName = clickrow.containerName),
            (this.entity.containerCode = clickrow.containerCode),
            (this.entity.containerSpecification =
              clickrow.containerSpecification);
          /* this.entityData = {
            ...this.entityData,
            containerSpecification: clickrow.containerSpecification,
            containerName: clickrow.containerName,
            containerCode: clickrow.containerCode,
          } */
          break;
        case "transportTimeName":
          this.entityData = {
            ...this.entityData,
            transportTimeName: clickrow.transportTimeName,
            transportTimeEfficiency: clickrow.transportTimeCode
          };
          break;
        case "transportTimingName":
          this.entityData = {
            ...this.entityData,
            transportTimingName: clickrow.transportTimeName,
            transportTiming: clickrow.transportTimeCode
          };
          break;
        case "storekeeperName":
          this.entityData = {
            ...this.entityData,
            storekeeperName: clickrow.employeeInfoName,
            storekeeper: clickrow.employeeInfoCode
          };
          break;
        case "thisBusinessName":
          this.entityData = {
            ...this.entityData,
            thisBusinessName: clickrow.employeeInfoName,
            thisBusiness: clickrow.employeeInfoCode
          };
          break;
        case "driverName":
          this.entityData = {
            ...this.entityData,
            driverName: clickrow.employeeInfoName,
            driver: clickrow.employeeInfoCode
          };
          break;
        case "backBrokerName":
          this.entityData = {
            ...this.entityData,
            backBrokerName: clickrow.employeeInfoName,
            backBroker: clickrow.employeeInfoCode
          };
          break;
        case "senderName":
          this.entityData = {
            ...this.entityData,
            senderName: clickrow.employeeInfoName,
            sender: clickrow.employeeInfoCode
          };
          break;
        case "sendLineName":
          this.entityData = {
            ...this.entityData,
            sendLineName: clickrow.shippingRouteName,
            sendLine: clickrow.shippingRouteCode
          };
          break;
        case "routeName":
          this.entityData = {
            ...this.entityData,
            routeName: clickrow.shippingRouteName,
            route: clickrow.shippingRouteCode
          };
          break;
        case "taxName":
          this.entityData = {
            ...this.entityData,
            taxName: clickrow.taxNo,
            taxNo: clickrow.goodsTaxCode
          };
          break;
        case "brandName":
          this.entityData = {
            ...this.entityData,
            brandName: clickrow.brandName,
            brand: clickrow.brandCode
          };
          break;
        case "sendCityName":
          this.entityData = {
            ...this.entityData,
            sendCityName: clickrow.city,
            sendCity: clickrow.code
          };
          break;
        case "receiveCityName":
          this.entityData = {
            ...this.entityData,
            receiveCityName: clickrow.city,
            receiveCity: clickrow.code
          };
          break;
        case "deliveryNo":
          this.entityData = {
            ...this.entityData,
            deliveryNo: clickrow.loadingBillNo
          };
          break;
        case "entrustOrderNos": //委托单号 selectTable
          this.entityData = {
            ...this.entityData,
            entrustOrderNos: clickrow.map(item => item.entrustOrderNo)
          };
          break;
        case "sourceBillType":
          this.entityData = {
            ...this.entityData,
            sourceBillType: clickrow.godownEntryCode
          };
          break;
      }
      // 特殊业务
      let param = {
        godownentry: {
          delegeteBillNo: {
            "1": _ => ({
              delegeteBillNo: clickrow.receiptOrderCode
            }),
            "2": _ => ({
              delegeteBillNo: clickrow.entrustOrderNo
            })
          },
          // 税号
          taxNo: _ => ({
            taxNo: clickrow.taxNo
          }),
          // 品牌
          brandName: _ => ({
            brand: clickrow.brandCode,
            brandName: clickrow.brandName
          }),
          // 产地
          originPlaceName: _ => ({
            originPlace: clickrow.originCode,
            originPlaceName: clickrow.originName,
            sourceArea: clickrow.originCode,
            sourceAreaName: clickrow.originName
          }),
          // 计量单位
          unitName: _ => ({
            unit: clickrow.measurementCode,
            unitName: clickrow.measurementUnit
          })
        },
        szinstoreEntity: {
          delegeteBillNo: {
            "1": _ => ({
              delegeteBillNo: clickrow.billNo
            }),
            "2": _ => ({
              delegeteBillNo: clickrow.entrustOrderNo
            })
          },
          // 税号
          taxNo: _ => ({
            taxNo: clickrow.taxNo
          }),
          // 品牌
          brandName: _ => ({
            brand: clickrow.brandCode,
            brandName: clickrow.brandName
          }),
          // 产地
          originPlaceName: _ => ({
            originPlace: clickrow.originCode,
            originPlaceName: clickrow.originName
          }),
          // 计量单位
          unitName: _ => ({
            unit: clickrow.measurementCode,
            unitName: clickrow.measurementUnit
          })
        },
        outstoreEntity: {
          delegeteBillNo: {
            "1": _ => ({
              delegeteBillNo: clickrow.billNo
            }),
            "2": _ => ({
              delegeteBillNo: clickrow.entrustOrderNo
            })
          },
          // 税号
          taxNo: _ => ({
            taxNo: clickrow.taxNo
          }),
          // 品牌
          brandName: _ => ({
            brand: clickrow.brandCode,
            brandName: clickrow.brandName
          }),
          // 产地
          originPlaceName: _ => ({
            originPlace: clickrow.originCode,
            originPlaceName: clickrow.originName
          }),
          // 计量单位
          unitName: _ => ({
            unit: clickrow.measurementCode,
            unitName: clickrow.measurementUnit
          })
        },
        HkshipmentBase: {
          feeBearName: {
            "1": _ => ({
              feeBearName: clickrow.companyName,
              feeBearCode: clickrow.companyCode
            }),
            "2": _ => ({
              feeBearName: clickrow.clientName,
              feeBearCode: clickrow.clientNo
            }),
            "3": _ => ({
              feeBearName: clickrow.customerName,
              feeBearCode: clickrow.customerNo
            }),
            "4": _ => ({
              feeBearName: clickrow.employeeInfoName,
              feeBearCode: clickrow.employeeInfoCode
            }),
            "5": _ => ({
              feeBearName: clickrow.customerName,
              feeBearCode: clickrow.customerNo
            }),
            "6": _ => ({
              feeBearName: clickrow.clientName,
              feeBearCode: clickrow.clientNo
            }),
            "7": _ => ({
              feeBearName: clickrow.supplierName,
              feeBearCode: clickrow.supplierCode
            })
          }
        },
        Importinvoice: {
          carrierName: {
            "1": _ => ({
              carrierName: clickrow.companyName,
              carrier: clickrow.companyCode
            }),
            "2": _ => ({
              carrierName: clickrow.clientName,
              carrier: clickrow.clientNo
            }),
            "3": _ => ({
              carrierName: clickrow.customerName,
              carrier: clickrow.customerNo
            }),
            "4": _ => ({
              carrierName: clickrow.employeeInfoName,
              carrier: clickrow.employeeInfoCode
            }),
            "5": _ => ({
              carrierName: clickrow.customerName,
              carrier: clickrow.customerNo
            })
          },
          freightPayerName: {
            "1": _ => ({
              freightPayerName: clickrow.companyName,
              freightPayer: clickrow.companyCode
            }),
            "2": _ => ({
              freightPayerName: clickrow.clientName,
              freightPayer: clickrow.clientNo
            }),
            "3": _ => ({
              freightPayerName: clickrow.customerName,
              freightPayer: clickrow.customerNo
            }),
            "4": _ => ({
              freightPayerName: clickrow.employeeInfoName,
              freightPayer: clickrow.employeeInfoCode
            }),
            "5": _ => ({
              freightPayerName: clickrow.customerName,
              freightPayer: clickrow.customerNo
            }),
            originPlaceName: _ => ({
              sourceArea: clickrow.originCode,
              sourceAreaName: clickrow.originName
            })
          },
          // 计量单位
          unitName: _ => ({
            unit: clickrow.measurementCode,
            unitName: clickrow.measurementUnit
          }),
          // 产地
          originPlaceName: _ => ({
            sourceAreaName: clickrow.originName,
            sourceArea: clickrow.originCode
          })
        }
      };
      if (
        param[this.parentModule] &&
        param[this.parentModule][this.tableDialog.target]
      ) {
        let p = param[this.parentModule][this.tableDialog.target];
        let data =
          typeof p == "function"
            ? p()
            : p[this.entityData[this.tableDialog.targetType]]();
        utools.judgeNullObj(data) &&
          this.$emit("tableDialogPreservation", data, this.tableDialog.target);
      }
      this.$forceUpdate();
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
      this.tableDialog.ruleForm = {};
    },
    //点击输入框的搜索图标，弹出弹窗
    async rousePopover (key, obj) {
      if (key === "sourceAreaName")
        key = "originPlaceName" /* 产地不同名需要转key */;
      this.tableDialog.targetType = {
        delegeteBillNo: "sourceBillType",
        feeBearName: "bearType",
        carrierName: "carrierType",
        freightPayerName: "freightReceiverType"
      }[key];
      this.searchTarget = key;
      // 业务场景的特俗处理
      let parentSearchCode = this.tableDialogSearch[this.parentModule], // 搜索 父级module
        parentTableConfig = this.tableDialogConfig[this.parentModule]; // 配置 父级module
      parentSearchCode
        ? (parentSearchCode = parentSearchCode[`searchCode_${key // 搜索 key
          }`]
          ? parentSearchCode[`searchCode_${key}`][
          this.entityData[this.tableDialog.targetType]
          ]
          : this.tableDialogSearch[`searchCode_${key}`])
        : (parentSearchCode = this.tableDialogSearch[`searchCode_${key}`]);
      parentTableConfig
        ? (parentTableConfig = parentTableConfig[key] // 配置 key 对象
          ? parentTableConfig[key][
          this.entityData[this.tableDialog.targetType]
          ]
          : this.tableDialogConfig[key])
        : (parentTableConfig = this.tableDialogConfig[key]);
      this.tableDialog = {
        ...this.tableDialog,
        // 判断是否是多选弹窗  委托单号是多选表格
        popoverType: key == "entrustOrderNos" ? "selectTable" : "table",
        queryBarConfig: [
          {
            label: "编码",
            moduleBind: parentSearchCode,
            isInput: true
          }
        ],
        title: obj.name,
        tableConfig: parentTableConfig,
        isshow: true
      };
      //设置 香港发运单-委托单号 参数 selectTable
      if (key === "entrustOrderNos") {
        obj.param = {
          ...obj.param,
          clientCode: this.entityData.clientCode
        };
      }
      //设置 香港发运单-物料名称参数 selectTable
      if (key === "materialName") {
        obj.param = {
          ...obj.param,
          entrustOrderNos: this.entityData.entrustOrderNos
        };
      }
      //设置联系人参数
      if (key === "contactsName") {
        obj.param = {
          ...obj.param,
          customerNo: this.entityData.consignee
        };
      }
      // 买方接(提)货
      if (key === "buyerReceiveGoodsNo") {
        obj.param = {
          ...obj.param
          // clientNo: this.entityData.delegete
        };
      }
      // 深圳发运单
      if (key === "originOrder") {
        obj.param = {
          ...obj.param
          // clientNo: this.entityData.delegete
        };
      }
      //设置运费承担方
      if (key === "feeBearName") {
        switch (this.entityData.bearType) {
          case "1":
            obj.api = "querycompanyinfoSearch";
            this.tableDialog.title = "公司列表";
            break;
          case "2":
            obj.api = "queryclientSearch";
            this.tableDialog.title = "委托方列表";
            break;
          case "3":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
          case "4":
            obj.api = "queryemployeeinfoSearch";
            this.tableDialog.title = "员工列表";
            break;
          case "5":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
          case "7":
            obj.api = "querysupplierbaseSearch";
            this.tableDialog.title = "供应商列表";
            break;
          default:
            obj.api = "queryclientSearch";
            this.tableDialog.title = "委托方列表";
            break;
        }
      }
      // 源单据类型
      if (key === "delegeteBillNo") {
        switch (this.entityData.sourceBillType) {
          case "1":
            obj.api = "queryentrustorderSearch";
            this.tableDialog.title = "委托单列表";
            break;
          case "2":
            obj.api = "queryGodownentry";
            this.tableDialog.title = "入库单列表";
            break;
        }
      }
      // 承运商
      if (key === "carrierName") {
        switch (this.entityData.carrierType) {
          case "1":
            obj.api = "querycompanyinfoSearch";
            this.tableDialog.title = "公司列表";
            break;
          case "2":
            obj.api = "queryclientSearch";
            this.tableDialog.title = "委托方列表";
            break;
          case "3":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
          case "4":
            obj.api = "queryemployeeinfoSearch";
            this.tableDialog.title = "员工列表";
            break;
          case "5":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
        }
      }
      //设置运费承担方
      if (key === "freightPayerName") {
        switch (this.entityData.freightReceiverType) {
          case "1":
            obj.api = "querycompanyinfoSearch";
            this.tableDialog.title = "公司列表";
            break;
          case "2":
            obj.api = "queryclientSearch";
            this.tableDialog.title = "委托方列表";
            break;
          case "3":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
          case "4":
            obj.api = "queryemployeeinfoSearch";
            this.tableDialog.title = "员工列表";
            break;
          case "5":
            obj.api = "getCustomerList";
            this.tableDialog.title = "客户列表";
            break;
        }
      }
      let apiObj = {
        taxNo: "getCustomsMaterielList",
        brandName: "getBrandList",
        originPlaceName: "getOriginList",
        unitName: "getMeasurement",
        customerName: "getCustomerList"
      };
      apiObj[key] && (obj.api = apiObj[key]);
      this.requestTable(
        { ...obj.param, ...this.tableDialog.ruleForm },
        obj
      ).then(data => {
        /**
         * @param target: key 保存对应的key
         * @param obj: obj 保存对应的项
         */
        this.tableDialog = {
          ...this.tableDialog,
          data: data.list,
          count: data.count,
          target: key,
          obj: obj
        };
      });
    },

    setRequestParam () {
      let target = this.searchTarget;
      console.log(target)
      const path = this.$route.path.slice(1),
        obj = {
          HkscheduleBaseForm: ['trips', 'startWarehouseName', 'endWarehouseName', 'platesNoName', 'carrierName', 'containerName', 'regulateType'],
          HkimportinvoiceForm: [
            'warehouseName', 'carrierName', 'vehicleTypeName', 'deliveryAreaName', 'sendLineName', 'transportTimeName', 'consigneeName', 'storekeeperName',
            'freightPayerName', 'recommendedName', 'brandName', 'originPlaceName', 'materialName', 'unitName', 'deliveryCustomerName', 'receiveCustomerName', ''
          ],
          HkshipmentBaseForm: [
            'trainNo', 'thisBusinessName', 'shipmentGroupName', 'senderName',
            'mainCarrierName', 'transportTimingName', 'clientName', 'receiveClientName', 'routeName',
            'deliveryAreaName', 'driverName', 'storekeeperName', 'plateNoName', 'carrierCode', 'startPlace',
            'endPlace', 'feeBearName', 'backBrokerName', 'shipmentArea', 'expressDesName', 'recomCarrierName',
            'shipperName', 'materialName', 'shipper', 'stockGroup', 'shipWarehouse'
          ],
          ImportinvoiceForm: [
            'warehouseName', 'carrierName', 'vehicleTypeName', 'deliveryAreaName', 'sendLineName', 'transportTimeName', 'consigneeName', 'storekeeperName',
            'storekeeperName', 'freightPayerName', 'recommendedName', 'brandName', 'originPlaceName', 'materialName', 'unitName', 'deliveryCustomerName', 'receiveCustomerName'
          ],
          SzscheduleBaseForm: [
            'trips', 'startWarehouseName', 'endWarehouseName', 'platesNoName', 'carrierName', 'containerName', 'regulateType',
          ]
        }[path] || [];
      let status = '';
      status = obj.includes(target) ? '2' : '';
      path === 'HkimportinvoiceForm' && this.entityData.freightReceiverType === '2' && target === 'freightPayerName' && (status = '');
      path === 'HkshipmentBaseForm' && this.entityData.bearType === '2' && target === 'feeBearName' && (status = '');
      path === 'ImportinvoiceForm' && this.entityData.carrierType === '2' && target === 'carrierName' && (status = '');
      path === 'ImportinvoiceForm' && this.entityData.freightReceiverType === '2' && target === 'freightPayerName' && (status = '')
      return { status }
    },
    handleTableDialogClick () {
      //点击列表弹窗查询栏按钮事件
      this.rousePopover(
        this.tableDialog.target,
        this.tableDialog.obj,
        this.tableDialog.ruleForm
      );
    },
    //请求弹窗中表格数据
    async requestTable (param, obj) {
      let request = "";
      if (api[obj.api]) {
        request = obj.api;
      } else if (utools.judgeNullObj(obj.api)) {
        request = obj.api[this.entityData[this.tableDialog.targetType]];
      } else {
        throw "接口未配置";
      }
      return (await api[request]({ ...param, ...this.setRequestParam() }))["data"];
    },
    handlerFormVerify (refs) {
      //this.verify = refs
    },
    close () {
      this.$emit("close");
    }
  }
};
</script>
<style lang="less" scoped>
</style>
