<template>
  <div class="Box shipment-base-form">
    <!-- 保存 返回 按钮 -->
    <preserve-btn
      :form='ruleForm'
      @handlePreserve="handlePreserve"
      @handleRollback="handleRollback"
      @handleExport='handleExport'
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- form 表单 -->
    <form-component
      :formModel="ruleForm"
      :formConfig="configTable"
      @handlerFormVerify="handlerFormVerify"
      @handlerSearchClick='handlerSearchClick'
    ></form-component>
    <!-- 表格弹窗 -->
    <table-dialog
      :isShowPopover='tableDialog.isShow'
      :popoverList='tableDialog.popoverList'
      :popoverListKey="tableDialog.popoverListKey"
      :count='tableDialog.count'
      :formConfig='tableDialog.queryConfig'
      :ruleForm='tableDialog.ruleForm'
      :itemName='tableDialog.itemName'
      :btnObj='tableDialog.btnObj'
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="handlerTableDialogSubPreservation"
      @handleBtnClickType='tableDialogSearch'
      @handlePageChange='tableDialogSearch'
    ></table-dialog>
    <!-- 旧表单 -->
    <!-- <div
      v-for="(formTemp,index) in configTable"
      :key="index"
    >
      <form-module-head :title="formTemp.name"></form-module-head>
      <form-template
        :entity="ruleForm"
        @on-result-change="onRuleFormChange"
        :formConfig="formTemp.list"
        parentModule="ShipmentBaseForm"
        @tableDialogPreservation="tableDialogPreservation"
      >
        <div
          slot="btn_top"
          class="mb-10"
        ></div>
      </form-template>
    </div> -->
    <!-- tab -->
    <div>
      <el-tabs
        class="handleTableHeight"
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          label="物料信息"
          name="ShipmentMateriel"
          :disabled="isTabDisabled"
        ></el-tab-pane>
        <!-- 表格 -->
        <div v-show="!isTabDisabled">
          <div
            class="mb-10"
            v-show="+ruleForm.status<=1"
          >
            <!-- <el-button @click="handlerAddCreditPawn">新增</el-button> -->
            <el-button @click="update">修改</el-button>
            <el-button @click="remove">删除</el-button>
          </div>

          <table-component
            :isSubTable='true'
            :dialog='false'
            :popoverList='tableData'
            :popoverListKey='tableColumn'
            :count='queryPage.total'
            :activeRow.sync='currentRow'
            @handlePageChange='queryShipmentmateriel'
          ></table-component>
        </div>
      </el-tabs>
    </div>

    <!-- 添加 -->
    <form-template
      :dialog="true"
      :visible="editDialog.visible"
      :entity="formEntity"
      @on-result-change="onFormEntityChange"
      :formConfig="formConfig"
      parentModule="HkshipmentBase"
      @tableDialogPreservation="tableDialogPreservation"
      @close="closeDialog"
    >
      <div
        slot="btn_buttom"
        class="el-dialog__footer"
      >
        <el-button
          type="primary"
          @click="saveForm"
        >保存</el-button>
        <el-button
          type="cancel"
          @click="closeDialog"
        >取消</el-button>
      </div>
    </form-template>
  </div>
</template>
<script>
// 主表
import ShipmentBaseEntry from "@/domain/entities/logistics/ShipmentBase";
// import ShipmentBaseForm from "@/domain/formconfig/logistics/ShipmentBase"; // 旧表单
import ShipmentBaseForm from '@/domain/formconfig/logistics/ShipmentBase.1.js'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

// 子表
import ShipmentMaterielEntity from "@/domain/entities/logistics/HkshipmentMateriel";
import ShipmentMaterielForm from "@/domain/formconfig/logistics/HkshipmentMateriel";
import ShipmentMaterielTable from "@/domain/tableconfig/logistics/HkshipmentMateriel";
// 组件 
import formComponent from '@/components/common/form-template/FormComponent.vue'

import FormTemplate from "@/components/common/form/index";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import api from "@/assets/js/appHelper";

// 弹窗表格配置
import entrustOrder from '@/domain/tableconfig/commerce/EntrustOrder.js'
import importinvoice from "@/domain/tableconfig/logistics/Szimportinvoice.js";
import trainNumber from "@/domain/tableconfig/basicdata/TrainNumber.js";
import client from '@/domain/tableconfig/business/Client.js'
import companyInfo from "@/domain/tableconfig/basicdata/CompanyInfo.js"
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo.js'
import carrierBase from '@/domain/tableconfig/basicdata/CarrierBase.js'
import transportTime from '@/domain/tableconfig/basicdata/TransportTime.js'
import customer from "@/domain/tableconfig/basicdata/Customer.js"
import shippingRoute from '@/domain/tableconfig/basicdata/ShippingRoute.js'
import deliveryArea from '@/domain/tableconfig/basicdata/DeliveryArea.js'
import vehicleInfo from '@/domain/tableconfig/basicdata/VehicleInfo.js'
import warehouse from '@/domain/tableconfig/basicdata/Warehouse.js'
import supplierBase from '@/domain/tableconfig/basicdata/SupplierBase.js'
import cityList from "@/domain/tableconfig/other/CityList.js";
import driverInfo from '@/domain/tableconfig/basicdata/DriverInfo.js'

import { mapMutations, mapGetters } from "vuex";
export default {
  name: 'ShipmentBaseForm',
  components: {
    tableDialog: () => import('@/components/common/Popover.vue'),
    formComponent,
    FormTemplate,
    formModuleHead,
    TableComponent
  },
  data () {
    return {
      isLoading: false,
      ruleForm: new ShipmentBaseEntry(), // 表单输入
      configTable: ShipmentBaseForm,
      formEntity: new ShipmentMaterielEntity(),
      formConfig: this.blacklist(ShipmentMaterielForm, [
        "shipmentBaseCode",
        "itemCode",
        "materialCode"
      ]),
      searchTarget: '',
      tableDialog: {
        isShow: false,
        popoverList: [],
        popoverListKey: [],
        count: 0,
        queryConfig: [],
        ruleForm: {},
        itemName: '',
        btnObj: [{ type: 'search', label: '查询' }],
      },
      tableColumn: ShipmentMaterielTable, // tab 表格数据
      rules: {}, // 表单验证规则
      tabActiveName: "",
      isTabDisabled: true,
      tableData: [],
      // 查询条件
      queryPage: { pageIndex: 1, pageSize: 10, total: 0 },
      // 修改弹出框表单
      editDialog: { shipmentBaseCode: "", itemCode: "", visible: false },
      currentRow: {},//当前选中行
      jumpType: '',
      tableBtnType: '',
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"]),
    tableDialogPort () {
      let companyinfo = api.querycompanyinfoSearch,// 公司
        carrierbase = api.querycarrierbaseSearch, // 承运商基础信息
        customer = api.getCustomerList, // 客户
        employeeinfo = api.queryemployeeinfoSearch, // 员工档案
        warehouse = api.querywarehouseSearch, // 仓库信息
        cityLis = api.getCityList; //城市
      return {
        sourceBillNo: {
          /* 根据来源单据类型的值 */
          '2': api.queryentrustorderSearch,
          '15': api.queryImportinvoice
        },
        trainNoName: api.getTrainNumberList, //车次
        delegeteName: api.queryclientSearch,// 委托方
        shipmentGroupName: companyinfo,//发运组织
        senderName: employeeinfo, //寄件人
        mainCarrierName: carrierbase, // 主承运方
        transportTimingName: api.getTimeLimitData, // 运输时效
        clientName: customer, // 客户
        receiveClientName: customer,//收货客户
        routeName: api.getDispatchLineData, // 发运总路线
        deliveryAreaName: api.getAreaData, // 交货区域
        driverName: api.querydriverinfoSearch, //司机
        storekeeperName: employeeinfo, // 仓管员
        plateNoName: api.queryvehicleinfoSearch, // 车牌号
        startPlace: warehouse, // 起始地
        endPlace: warehouse, // 到达地
        feeBearName: companyinfo, // 运费承担方
        backBrokerName: employeeinfo, // 收回经手人
        shipmentArea: warehouse, // 发运区域
        sendCityName: cityLis, receiveCityName: cityLis, // (寄件 | 收件) 城市  
        expressDesName: companyinfo, // 快递目的地
        recomCarrierName: carrierbase, // 推荐承运商
        shipperName: api.querysupplierbaseSearch // 发货方
      }
    },
    tabledialogConfig () {
      return {
        sourceBillNo: {
          '2': entrustOrder,
          '15': importinvoice
        },
        trainNoName: trainNumber,
        delegeteName: client,
        shipmentGroupName: companyInfo,
        senderName: employeeInfo,
        mainCarrierName: carrierBase,
        transportTimingName: transportTime,
        clientName: customer,
        receiveClientName: customer,
        routeName: shippingRoute,
        deliveryAreaName: deliveryArea,
        driverName: driverInfo,
        storekeeperName: employeeInfo,
        plateNoName: vehicleInfo,
        startPlace: warehouse,
        endPlace: warehouse,
        feeBearName: companyInfo,
        backBrokerName: employeeInfo,
        shipmentArea: warehouse,
        sendCityName: cityList,
        receiveCityName: cityList,
        expressDesName: companyInfo,
        recomCarrierName: carrierBase,
        shipperName: supplierBase
      }
    }
  },
  watch: {
    // 监听商品明细的按钮类型
    'tableBtnType': {
      handler (cur, pre) {
        for (let item of this.formConfig) {
          switch (item.key) {
            case 'entrustOrderNos':
              item.btn = (cur == 'add');
              break;
            default:
              break;
          }
        }
      },
      deep: true
    },
  },
  created () {
    api.initSelect(this.configTable.list);
    this.getShipmentbase();
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.ruleForm, status: this.jumpType },
      path: this.$route.path
    });
    next();
  },
  methods: {

    async handleExport () {
      try {
        this.utools.downFile(`/shipmentbase/export/${this.ruleForm.shipmentBaseCode}`)
        // const data = await api.exportShipmentbase(this.ruleForm.shipmentBaseCode);
      } catch (error) {
        this.$message({
          type: 'error',
          message: '导出失败，请重试！'
        })
        console.log(error)
      }
    },

    // 表单验证规则
    handlerFormVerify () { },
    // 表单点击 search按钮事件
    handlerSearchClick (target) {
      this.searchTarget = target;
      const type = this.ruleForm.originOrderType;
      if (target === 'sourceBillNo' && !type) {
        this.utools.alertStatusMessage.call(this, { msg: { warning: '请先选择来源单据' } });
        return;
      };
      this.handleSetTableDialogConfig()
    },
    // 设置弹窗表格 配置 
    handleSetTableDialogConfig: (() => {
      let input = [{ isInput: true, label: "编码", moduleBind: "" }], [one] = input, itemName;
      let configObj = { // 弹窗标题和查询条件
        sourceBillNo: () => ({
          '2': () => ({ input: [{ ...one, moduleBind: 'entrustOrderNo' }], itemName: '委托订单' }),
          '15': () => ({ input: [{ ...one, moduleBind: 'billNo' }], itemName: '深圳发货通知单' })
        }),
        trainNoName: () => ({ input: [{ ...one, moduleBind: 'trainNo' }], itemName: '车次' }),
        delegeteName: () => ({ input: [{ ...one, moduleBind: 'clientNo' }], itemName: '委托方' }),
        shipmentGroupName: () => ({ input: [{ ...one, moduleBind: 'companyCode' }], itemName: '发运组织' }),
        senderName: () => ({ input: [{ ...one, moduleBind: 'employeeInfoCode' }], itemName: '寄件人' }),
        mainCarrierName: () => ({ input: [{ ...one, moduleBind: 'carrierCode' }], itemName: '主承运方' }),
        transportTimingName: () => ({ input: [{ ...one, moduleBind: 'transportTimeCode' }], itemName: '运输时效' }),
        clientName: () => ({ input: [{ ...one, moduleBind: 'customerNo' }], itemName: '客户' }),
        receiveClientName: () => ({ input: [{ ...one, moduleBind: 'customerNo' }], itemName: '收货客户' }),
        routeName: () => ({ input: [{ ...one, moduleBind: 'shippingRouteCode' }], itemName: '发运总路线' }),
        deliveryAreaName: () => ({ input: [{ ...one, moduleBind: 'deliveryAreaCode' }], itemName: '交货区域' }),
        driverName: () => ({ input: [{ ...one, moduleBind: 'driverInfoCode' }], itemName: '司机' }),
        storekeeperName: () => ({ input: [{ ...one, moduleBind: 'employeeInfoCode' }], itemName: '仓管员' }),
        plateNoName: () => ({ input: [{ ...one, moduleBind: 'vehicleInfoCode' }], itemName: '车牌号' }),
        startPlace: () => ({ input: [{ ...one, moduleBind: 'address' }], itemName: '起始地' }),
        endPlace: () => ({ input: [{ ...one, moduleBind: 'address' }], itemName: '到达地' }),
        feeBearName: () => ({ input: [{ ...one, moduleBind: 'companyCode' }], itemName: '运费承担方' }),
        backBrokerName: () => ({ input: [{ ...one, moduleBind: 'employeeInfoCode' }], itemName: '收回经手人' }),
        shipmentArea: () => ({ input: [{ ...one, moduleBind: 'address' }], itemName: '发货区域' }),
        sendCityName: () => ({ input: [{ ...one, moduleBind: 'code' }], itemName: '寄件城市' }),
        receiveCityName: () => ({ input: [{ ...one, moduleBind: 'code' }], itemName: '收件城市' }),
        expressDesName: () => ({ input: [{ ...one, moduleBind: 'companyCode' }], itemName: '快递目的地' }),
        recomCarrierName: () => ({ input: [{ ...one, moduleBind: 'carrierCode' }], itemName: '推荐承运商' }),
        shipperName: () => ({ input: [{ ...one, moduleBind: 'supplierCode' }], itemName: '发货方' }),
      };
      return function () {
        this.tableDialog.ruleForm = {}; // 清空 弹窗的 查询栏的数据
        const type = this.ruleForm.originOrderType, isSou = this.searchTarget === 'sourceBillNo';
        let searchConfig = configObj[this.searchTarget]();
        let config = this.tabledialogConfig[this.searchTarget];
        isSou && (searchConfig = searchConfig[type])
        isSou && (config = config[type]);// 来源单据 配置 取决于来源单据类型的值

        const { input: queryConfig, itemName } = searchConfig;
        this.tableDialog = {
          ...this.tableDialog,
          isShow: true,
          popoverListKey: config,
          itemName,
          queryConfig
        };
        // 请求表格数据
        this.tableDialogRequestData();
      }
    })(),
    //  关闭表格弹窗
    closeTableDialog () {
      this.tableDialog.isShow = false;
    },
    //表格弹窗点击确定按钮事件
    handlerTableDialogSubPreservation (clickRow = {}) {
      const {
        entrustOrderNo, billNo,
        trusteeName,
        trainNumberCode, trainNumberName,
        clientNo, clientName,
        companyCode, companyName,
        employeeInfoCode, employeeInfoName,
        carrierCode, carrierName,
        transportTimeCode, transportTimeName,
        customerNo, customerName,
        shippingRouteCode, shippingRouteName,
        deliveryAreaCode, deliveryAreaName,
        vehicleInfoCode, vehicleNo,
        warehouseCode, warehouseName,
        address,
        supplierCode, supplierName,
        city, code,
        driverInfoCode, driverName
      } = clickRow;
      // 弹窗 点击确定 取数 策略
      let objData = {
        sourceBillNo: {
          '2': () => ({ sourceBillNo: entrustOrderNo, ...this.writeBackForm(clickRow, 'entrustOrder') }),
          '15': () => ({ sourceBillNo: billNo, ...this.writeBackForm(clickRow, 'importinvoice') })
        },
        trainNoName: { trainNo: trainNumberCode, trainNoName: trainNumberName, }, // 车次
        delegeteName: { delegete: clientNo, delegeteName: clientName }, // 委托方
        shipmentGroupName: { shipmentGroup: companyCode, shipmentGroupName: companyName }, //发运组织
        senderName: { senderName: employeeInfoName, sender: employeeInfoCode }, //寄件人
        mainCarrierName: { mainCarrier: carrierCode, mainCarrierName: carrierName }, // 主承运方
        transportTimingName: { transportTiming: transportTimeCode, transportTimingName: transportTimeName }, // 运输时效
        clientName: { client: customerNo, clientName: customerName }, // 客户
        receiveClientName: { receiveClient: customerNo, receiveClientName: customerName }, // 收货客户
        routeName: { route: shippingRouteCode, routeName: shippingRouteName }, // 发运总路线
        deliveryAreaName: { deliveryArea: deliveryAreaCode, deliveryAreaName }, // 交货区域
        driverName: { driver: driverInfoCode, driverName: driverName },  //司机
        storekeeperName: { storekeeper: employeeInfoCode, storekeeperName: employeeInfoName }, // 仓管员
        plateNoName: { plateNo: vehicleInfoCode, plateNoName: vehicleNo },// 车牌号
        startPlace: { startPlace: address }, // 起始地
        endPlace: { endPlace: address }, // 到达地
        feeBearName: { feeBear: companyCode, feeBearName: companyName },// 运费承担方
        backBrokerName: { backBroker: employeeInfoCode, backBrokerName: employeeInfoName },// 收回经手人
        shipmentArea: { shipmentArea: address },// 发运区域
        sendCityName: { sendCity: code, sendCityName: city },
        receiveCityName: { receiveCity: code, receiveCityName: city }, //( 寄件 | 收件) 城市
        expressDesName: { expressDes: companyCode, expressDesName: companyName },// 快递目的地
        recomCarrierName: { recomCarrier: carrierCode, recomCarrierName: carrierName }, // 推荐承运商
        shipperName: { shipper: supplierCode, shipperName: supplierName }, // 发货方
      };
      // 弹窗点击确定时 策略 取数
      let data = objData[this.searchTarget],
        target = this.searchTarget;
      target === 'sourceBillNo' && (data = data[this.ruleForm.originOrderType]());
      this.ruleForm = { ...this.ruleForm, ...data };
      target === "receiveClientName" && this.getContactInfo(); // 选择 客户后 请求该 客户信息
    },
    // 表格弹窗 点击 查询 || 分页 事件
    tableDialogSearch (pageDta = {}) {
      this.tableDialogRequestData(typeof (pageDta) === 'object' ? pageDta : {});
    },
    // 表格弹窗 请求数据
    async tableDialogRequestData (data = {}) {
      console.log(this.searchTarget)
      const WHITE_LIST = [
        'trainNoName', 'shipmentGroupName', 'senderName', 'mainCarrierName', 'transportTimingName', 'clientName', 'receiveClientName', 'routeName', 'deliveryAreaName', 'driverName',
        'storekeeperName', 'plateNoName', 'startPlace', 'endPlace', 'feeBearName', 'backBrokerName', 'shipmentArea', 'expressDesName', 'recomCarrierName', 'shipperName',
        'materialName', 'shipper', 'stockGroup', 'shipWarehouse'
      ]
      try {
        const type = this.ruleForm.originOrderType;
        let fn = this.tableDialogPort[this.searchTarget];
        this.searchTarget === 'sourceBillNo' && (fn = fn[type]);// 来源单据 接口取决于来源单据类型的值
        const { data: { list, count }, status } = await fn.call(api, {
          ...data, ... this.tableDialog.ruleForm,
          status: WHITE_LIST.includes(this.searchTarget) ? '2' : ''
        });
        this.tableDialog = { ...this.tableDialog, popoverList: list, count };
      } catch (error) {
        this.utools.alertStatusMessage.call(this, { status: 500, msg: { error: '获取数据失败，请重试！' } })
        console.log(error)
      }
    },
    // 点击 收货客户 弹窗选择后 带出 该客户的(收货客户联系人 / 联系电话 / 收货地址)
    async getContactInfo () {
      if (this.ruleForm.receiveClient) {
        try {
          const { data: { list: [{ contact, phone, contactAddress }] } } = await api.getCustomerContact({ customerNo: this.ruleForm.receiveClient });
          this.ruleForm = { ...this.ruleForm, receiveContact: contact, telephone: phone, address: contactAddress };
        } catch (error) {
          this.utools.alertStatusMessage.call(this, { status: 500, msg: { error: '获取收货客户信息失败, 请手动输入或者 重新选择 收货客户！' } })
          console.log(error)
        }
      }
    },
    // 来源单据 回写表单字段
    writeBackForm (data = {}, target) {
      const {
        delegeteBillNo, delegeteName,
        bizDate,
        transportTimeEfficiency, transportTimeName,
        consignee, consigneeName,
        customerCode, customerName,
        contactsName, contactsPhone, receiveAddress,
        carrierType,
        sendLine, sendLineName,
        deliveryArea, deliveryAreaName,
        storekeeper, storekeeperName,
        transportType,
        deliveryType,
        freightReceiverType,
        freightPayer, freightPayerName,
        invoiceNo,
        pickupAddress,
        sendCity, sendCityName,
        receiveCity, receiveCityName
      } = data;
      let obj = {};
      if (target === 'importinvoice') { // 来源单据 发货通知单
        obj = {
          delegete: delegeteBillNo, delegeteName, // 委托方
          bizDate, // 业务日期
          transportTiming: transportTimeEfficiency, transportTimingName: transportTimeName,
          client: customerCode, clientName: customerName, // 客户
          receiveClient: consignee, receiveClientName: consigneeName, // 客户信息
          receiveContact: contactsName, telephone: contactsPhone, address: receiveAddress,
          carrierType, // 承运方类型
          route: sendLine, routeName: sendLineName, // 发运总路线
          deliveryArea, deliveryAreaName, //交货区域
          storekeeper, storekeeperName, // 仓管员
          transportType, // 运输方式
          deliveryWay: deliveryType, // 交货方式
          bearType: freightReceiverType, // 运费承担方类型
          feeBear: freightPayer, feeBearName: freightPayerName, //运费承担方
          invoiceNo, // 发票号
          selfAddress: pickupAddress, // 自提地址
          sendCity, sendCityName, //寄件城市
          receiveCity, receiveCityName, // 收件城市
          recomCarrier: consignee, recomCarrierName: consigneeName, // 推荐承运商 
        }
      }
      return obj;
    },
    async getShipmentmateriel () {
      if (this.currentRow.itemCode) {
        let { data } = await api.getShipmentmateriel(
          this.currentRow.itemCode
        );
        return data;
      } else {
        return new ShipmentMaterielItem();
      }
    },
    // 查询当条深圳入库主表
    getShipmentbase () {
      const {
        formData = {},
        status,
        itemTable = [],
      } = this.getActivePathData(this.$route.path);
      this.utools.judgeNullObj(formData) && (this.ruleForm = formData);
      this.utools.judgeNullObj(itemTable) && (this.tableData = itemTable);
      this.jumpType = status;
      this.jumpType == "update" ? (this.isTabDisabled = false, this.tabActiveName = 'ShipmentMateriel')
        : this.loadCode()
      if (this.jumpType == "update") {
        this.utools.setFormConfig(this.configTable.list, [
          {
            key: "sourceBillNo",
            btn: false
          }
        ]);
      } else {
        this.utools.setFormConfig(this.configTable.list, [
          {
            key: "sourceBillNo",
            btn: true
          }
        ]);
      }
      this.queryShipmentmateriel();
    },
    ...mapMutations(["addbreadCrumbsList"]),
    /**
     * 黑名单
     */
    blacklist (obj, blacks) {
      return obj.filter(item => {
        return !blacks.includes(item.key);
      });
    },
    onRuleFormChange (val) {
      this.ruleForm = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    onFormEntityChange (val) {
      this.formEntity = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    async tableDialogPreservation (obj, target) {
      if (target !== "feeBearName") {
        // 页签下的表格操作
        this.jumpType === "add" && (this.formEntity = { ...this.formEntity, ...obj })
      } else {
        // 切换源单据类型
        this.ruleForm = { ...this.ruleForm, ...obj };
      }
    },
    handlerTabClick () { },
    handlerAddCreditPawn () {
      this.tableBtnType = 'add';
      this.formEntity = new ShipmentMaterielEntity();
      this.formEntity = { ...this.formEntity, shipmentBaseCode: this.ruleForm.shipmentBaseCode, clientCode: this.ruleForm.delegete }
      this.editDialog = { shipmentBaseCode: this.ruleForm.shipmentBaseCode, visible: true };
    },
    async handlePreserve () {
      this.isLoading = true;
      let Scode = 0,
        msg = { message: "", type: "" };
      try {
        const { status } = await this.editSzinstore();
        this.ruleForm = { ...this.ruleForm, status: '1' };
        this.isTabDisabled = false, this.tabActiveName = 'ShipmentMateriel'; // 页签的设置
        Scode = status;
        msg = { message: "保存成功", type: "success" };
        this.queryShipmentmateriel(); // 查询 子表信息
      } catch (error) {
        msg = { message: "保存失败", type: "warning" };
        console.log(error)
      } finally {
        this.$message(msg)
        this.isLoading = false;
      }
    },
    async editSzinstore () {
      if (this.jumpType === 'add') {
        return api
          .saveShipmentbase({
            ...this.ruleForm,
            shipmentBaseCode: this.ruleForm.shipmentBaseCode
          })
          .then(data => {
            //修改url的shipmentBaseCode参数
            if (data && data.status == 200) {
              this.$router.push({
                query: { shipmentBaseCode: this.ruleForm.shipmentBaseCode }
              });
              this.ruleForm.shipmentBaseCode = this.ruleForm.shipmentBaseCode;
            }
            return data;
          });
      } else {
        return api.updateShipmentbase(this.ruleForm);
      }
    },
    //分页查询深圳入库子表
    queryShipmentmateriel ({ pageIndex, pageSize } = {}) {
      this.queryPage = { ...this.queryPage, pageIndex, pageSize }
      if (this.ruleForm.shipmentBaseCode) {
        api
          .queryShipmentmateriel({
            shipmentBaseCode: this.ruleForm.shipmentBaseCode,
            ...this.queryPage
          })
          .then(data => {
            if (data.status === 200) {
              this.tableData = data.data.list;
              this.queryPage.total = data.data.count;
            }
          });
      }
    },
    async loadCode () {
      //没有shipmentBaseCode说明是新增
      let res = await api.getCommonCodeNo("SZFY");
      this.ruleForm.shipmentBaseCode = res.data;
    },
    update () {
      if (this.currentRow && this.currentRow.itemCode) {
        this.tableBtnType = 'update';
        this.getShipmentmateriel().then(data => {
          this.formEntity = { ...data, clientCode: this.ruleForm.delegete, entrustOrderNos: [data.delegeteBillNo] };
          this.editDialog = {
            shipmentBaseCode: this.ruleForm.shipmentBaseCode,
            itemCode: this.currentRow.itemCode,
            visible: true
          };
        });
      } else {
        this.$message({ type: "warning", message: "请选中您要修改的单据！" });
      }
    },
    remove () {
      if (this.currentRow && this.currentRow.itemCode) {
        this.$confirm("此操作将永久删除单据, 是否继续?", "提示", {
          type: "warning"
        })
          .then(() => {
            api
              .removeShipmentmateriel(this.currentRow.itemCode)
              .then(data => {
                this.queryShipmentmateriel();
                this.$message({ type: "success", message: "删除成功!" });
              });
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消删除" });
          });
      } else {
        this.$message({ type: "warning", message: "请选中您要删除的单据！" });
      }
    },
    editSuccsess () {
      this.editDialog = { visible: false };
      this.queryShipmentmateriel();
    },
    //表格当前选中行改变事件
    currentTableChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    //表格分页改变事件
    pageChange (page) {
      this.queryPage.pageIndex = page;
      this.queryShipmentmateriel();
    },
    //表格分页大小改变事件
    sizeChange (size) {
      this.queryPage.pageSize = size;
      this.queryShipmentmateriel();
    },
    saveForm () {
      this.saveSzreceivingitem().then(data => {
        if (data && data.status == 200) {
          this.formEntity = new ShipmentMaterielEntity();
          this.queryShipmentmateriel();
          this.editDialog.visible = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
      });
    },
    saveSzreceivingitem () {
      this.formEntity.shipmentBaseCode = this.editDialog.shipmentBaseCode;
      if (this.formEntity.itemCode) {
        //修改
        return api.updateShipmentmateriel(this.formEntity);
      } else {
        //添加
        return api.saveShipmentmateriel(this.formEntity);
      }
    },
    closeDialog () {
      this.editDialog.visible = false;
    },
    handleRollback () {
      this.$router.push("M0708");
    }
  },
  beforeDestroy () {
    // 销毁闭包
    this.handleSetTableDialogConfig = null;
  }
};
</script>
<style lang='less' scoped>
.shipment-base-form,
.Box {
  .handleTableHeight {
    min-height: 48vh;
  }

  .block {
    border: 1px solid #eaeaea;
    margin: 10px 2px;
    border-radius: 10px;
    position: relative;
    .block-name {
      position: absolute;
      left: 12px;
      top: -12px;
      background: white;
      padding: 0 10px;
      color: #666;
    }
  }
}
</style>