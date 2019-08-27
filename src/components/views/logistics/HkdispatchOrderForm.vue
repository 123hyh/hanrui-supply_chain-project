<!-- 报关单 -->
<template>
  <div>
    <!-- 表格的 form 弹窗 -->
    <popover-component
      :popoverType="'form'"
      :width="fromDialogData.width"
      :isShowPopover='isShowTableDialog'
      :formData='fromDialogData'
      @changeisShowPopover='handlerShowTableDialog'
      @formClickPreservation='tabformClickPreservation'
    ></popover-component>
    <div class="mb-10">
      <!-- 操作按钮 -->
      <!-- <el-button type="primary" @click="handlerPreserve">保存</el-button>
			<el-button type="cancel" @click="handlerBack">返回</el-button> -->
        <preserve-btn
        :form='HkdispatchOrderForm'
        @handlePreserve='handlerPreserve'
        @handleRollback='handlerBack'
        :isLoading='isLoading'
      ></preserve-btn>
    </div>
    <div>
      <form-component
        :formModel='HkdispatchOrderForm'
        :inputKey='HkdispatchOrderFormKey'
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch='rousePopover'
      ></form-component>
      <el-tabs
        v-model="tableName"
        type="card"
      >
        <el-tab-pane
          v-for="item in tableObj"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          :disabled="isTabDisabled"
        ></el-tab-pane>
        <div v-if="!isTabDisabled">
          <form-component
            v-if="tableName!='hasSelect'"
            :formModel='fromDialogData.ruleForm'
            :inputKey='fromDialogData.formConfig'
            @handlerFormConfigClickSearch='rousePopover'
          ></form-component>
          <div
            v-if="tableName!='hasSelect'"
            class="btnList"
          >
            <el-button
              v-for="item in btnList"
              :type="item.type"
              :key="item.type"
              :disabled="item.disabled"
              @click="handlerTabBtnClick(item.type)"
            >{{item.name}}</el-button>
          </div>
          <el-table
            :data="tableName!='hasSelect'?tableData:selectTabSearch"
            ref="singleTable"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            @selection-change="changeFun"
          >
            <el-table-column
              type="selection"
              width="55"
            ></el-table-column>
            <el-table-column
              v-for='item in tableKey'
              :key="item.label"
              :prop="item.prop"
              :type="item.type"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </el-table>
          <pagination-component
            :count='pageCount'
            @handlePageChange='tabRequest'
          ></pagination-component>
        </div>
      </el-tabs>
    </div>
    <popover-component
      :isShowPopover='popover.isShowPopover'
      :popoverType="popover.popoverType"
      :currencySelectInputKey='popover.currencySelectInputKey'
      :formConfig='popover.queryBarObj'
      :popoverListKey='popover.popoverListKey'
      :popoverList='popover.popoverList'
      :ruleForm='popover.ruleForm'
      :count='popover.count'
      :btnObj='popover.btnObj'
      :itemName='popover.itemName'
      @handleBtnClickType="handleBtnClick"
      @changeisShowPopover='rousePopover'
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="handlePageChange"
    ></popover-component>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import PopoverComponent from '@/components/common/Popover'
import PaginationComponent from '@/components/common/Pagination.vue'
import QueryBar from '@/components/common/QueryBar'

// 表单配置
import HkdispatchOrderForm from "@/domain/entities/logistics/HkdispatchOrder";
import HkdispatchOrderFormKey from "@/domain/formconfig/logistics/HkdispatchOrder";

import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
let RuleForm = '';
export default {
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
    QueryBar
  },
  data: () => ({
    searchTarget: '',
    isLoading: false,
    status: '',
    HkdispatchOrderFormKey,
    HkdispatchOrderForm: new HkdispatchOrderForm(),
    verify: '',
    jumpType: '',
    ruleForm: {},
    // TODO: 临时数据
    btnList: [
      { type: "search", name: "查询", disabled: false },
      { type: "shippingRoute", name: "发运路线", disabled: false },
      { type: "sendUp", name: "送改发", disabled: false },
      { type: "create", name: "生成", disabled: false },
    ],
    tableName: 'hasSelect',
    isTabDisabled: true,
    tableData: [],
    tableKey: [],
    selectTab: [], //待选列表 选中的数据
    selectTabSearch: [],//已选数据
    pageCount: 0,
    //表格的form弹窗
    isShowTableDialog: false,
    fromDialogData: {
      width: '40%',
      ruleForm: {},
      formConfig: [],
      keyApi: '',
      curRowData: '',
    },
    popover: {  //弹出框组件参数
      isShowPopover: false, // 弹窗显示
      queryBarObj: [], // 弹出框查询栏
      queryCode: '', // 查询字段
      configUrl: '', // 文件路径
      popoverType: 'table', // 弹出框
      currencySelectInputKey: '', //弹出框选中对应的key值
      popoverListKey: [], // 弹出框表头绑定的 key
      popoverList: [], // 表格数据
      count: 0, // 分页数据总条数
      ruleForm: {}, // 查询栏的model绑定
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      itemName: '',// 弹窗标题
      apiKey: '',//弹窗内部的接口
    },
  }),
  computed: {
    ...mapGetters([
      'btnType', 'getbreadCrumbsList', 'getActivePathData'
    ]),
    tableObj: () => ([
      { name: 'entrust', label: '待选' },
      { name: 'hasSelect', label: '已选' },
    ]),
    currentTime () {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();
      var hh = now.getHours();
      var mm = now.getMinutes();
      var clock = year + "-";
      if (month < 10)
        clock += "0";
      clock += month + "-";
      if (day < 10)
        clock += "0";
      clock += day + " ";
      if (hh < 10)
        clock += "0";
      clock += hh + ":";
      if (mm < 10) clock += '0';
      clock += mm;
      return (clock + ':00');
    },
    WHITE_LIST () {
      return [
        'deliveryTrain', 'plateNo', 'driver', 'stocker', 'shopper', 'shippingRoute'
      ]
    }
  },
  watch: {
    tableName (cur, pro) {
      let newVal = utools.capitalize(cur);
      this.tableKey = require('@/domain/tableconfig/logistics/Hkdispatch' + newVal).default;
      this.fromDialogData.formConfig = require('@/domain/formconfig/logistics/Hkdispatch' + newVal).default;
      api.initSelect(this.fromDialogData.formConfig)
      RuleForm = require('@/domain/entities/logistics/Hkdispatch' + newVal).default;
      this.fromDialogData.ruleForm = new RuleForm();
      console.log(cur)
      cur === 'entrust' ? this.tabRequest() : this.selectRequest();
    },
    'HkdispatchOrderForm.outCar': {
      handler (cur, pre) {
        for (let item of this.HkdispatchOrderFormKey) {
          switch (item.key) {
            case 'carrier':
              item.disabled = (!cur ? true : false);
              item.btn !== undefined && (item.btn = cur)
              break;
          }
        }
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations([
      'addBtnType', 'addbreadCrumbsList'
    ]),
    /************************** 弹窗methods start *******************/
    handleBtnClick: (() => { //点击查询栏按钮事件
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    //多选框点击时触发
    changeFun (val) {
      this.selectTab = val;
    },

    handleBtnClickObj () {
      return {
        search: async () => {
          try {
            var { data: { count, list } } = await api.querySearch(this.popover.apiKey, { ...this.popover.ruleForm, status: this.WHITE_LIST.includes(this.searchTarget) ? '2' : '' })
            this.popover.count = count;
            this.popover.popoverList = list;
          } catch (e) { console.log(e) }
          // 清空查询数据
          this.popover.queryBarObj.map((e, i) => {
            if (this.popover.ruleForm[e.moduleBind])
              this.popover.ruleForm[e.moduleBind] = '';
          })
        },
      };
    },
    //table
    handlerSubPreservation (rowData, key) {
      if (this.HkdispatchOrderForm[key] !== undefined || this.fromDialogData.ruleForm[key] !== undefined) {
        if (key == "plateNo") {
          this.HkdispatchOrderForm[key] = rowData["vehicleNo"] || rowData["vehicleInfoCode"];
          this.HkdispatchOrderForm['plateNoCode'] = rowData["vehicleNo"] || rowData["vehicleInfoCode"];
        } else if (key == "shippingRoute") {
          this.HkdispatchOrderForm[key] = rowData["shippingRouteName"];
          this.HkdispatchOrderForm['shippingRouteCode'] = rowData["shippingRouteCode"];
        } else if (key == "carrier") {
          this.HkdispatchOrderForm[key] = rowData["carrierName"];
          this.HkdispatchOrderForm['carrierCode'] = rowData["carrierCode"];
        } else if (key == "transportTimeEfficiency") {
          this.fromDialogData.ruleForm[key] = rowData["transportTimeName"];
          this.fromDialogData.ruleForm['transportTimeEfficiencyCode'] = rowData["transportTimeCode"];
        } else if (key == "deliveryNo") {//提运单号
          this.fromDialogData.ruleForm[key] = rowData["scheduleBaseCode"];
          this.fromDialogData.ruleForm['deliveryNoCode'] = rowData["deliveryNoCode"];
        } else if (key == "entrustOrderNo") {//委托单号
          this.fromDialogData.ruleForm[key] = rowData["entrustOrderNo"];
        } else if (key == "deliveryTrain") {
          this.HkdispatchOrderForm[key] = rowData["deliveryTrain"];
          this.HkdispatchOrderForm['deliveryTrainCode'] = rowData["distributionTrainCode"];
        } else if (key == "driver") {
          this.HkdispatchOrderForm[key] = rowData["driverName"];
          this.HkdispatchOrderForm['driverCode'] = rowData["driverInfoCode"] || rowData["driveNo"];
          this.HkdispatchOrderForm['driverPhone'] = rowData["phone"] || rowData["telePhone"];
        } else {
          this.HkdispatchOrderForm[key] = rowData["employeeInfoName"];
          this.HkdispatchOrderForm["shopperCode"] = rowData["employeeInfoCode"];
        }
      }
    },
    rousePopover (key) {
      console.log(key)
      typeof key !== 'object' && (this.searchTarget = key);
      if (this.HkdispatchOrderForm[key] !== undefined || this.fromDialogData.ruleForm[key] !== undefined) {
        let popover = {
          'shippingRoute': { //发运线路 
            queryCode: 'shippingRouteCode',
            apiKey: '/shippingroute',
            itemName: '发运路线',
            configUrl: 'basicdata/ShippingRoute',
          },
          'carrier': { //承运方
            queryCode: 'clientNo',
            apiKey: '/carrierbase',
            itemName: '承运商',
            configUrl: 'basicdata/CarrierBase',
          },
          'operator': { //操作人 
            queryCode: 'mailSendLogCode',
            apiKey: '/shippingroute',
            itemName: '发运路线',
            configUrl: 'basicdata/ShippingRoute',
          },
          'shopper': { //配送员
            queryCode: 'employeeInfoCode',
            apiKey: '/employeeinfo',
            itemName: '员工档案',
            configUrl: 'basicdata/EmployeeInfo',
          },
          'transportTimeEfficiency': { //运输时效
            queryCode: 'transportTimeCode',
            apiKey: '/transporttime',
            itemName: '运输时效',
            configUrl: 'basicdata/TransportTime',
          },
          'deliveryNo': { //提运单号
            queryCode: 'scheduleBaseCode',
            apiKey: '/hkschedulebase',
            itemName: '上货计划',
            configUrl: 'logistics/HkscheduleBase',
          },
          'entrustOrderNos': { //委托单号
            queryCode: 'entrustOrderNo',
            apiKey: '/entrustorder',
            itemName: '委托单',
            configUrl: 'commerce/EntrustOrder',
          },
          'deliveryTrain': { //配送车次
            queryCode: 'distributionTrainCode',
            apiKey: '/distributiontrain',
            itemName: '配送车次',
            configUrl: 'logistics/DistributionTrain',
          },
        }
        if (this.HkdispatchOrderForm['outCar']) {
          popover = {            ...popover, 'plateNo': { //车牌号
              queryCode: 'carrierCode',
              apiKey: '/carriercar',
              itemName: '承运商-车辆信息',
              configUrl: 'basicdata/CarrierCar',
            }, 'driver': { //车牌号
              queryCode: 'carrierCode',
              apiKey: '/carrierdriver',
              itemName: '承运商-司机信息',
              configUrl: 'basicdata/CarrierDriver',
            }          }
        } else {
          popover = {            ...popover, 'plateNo': { //车牌号
              queryCode: 'vehicleInfoCode',
              apiKey: '/vehicleinfo',
              itemName: '仓储车辆信息',
              configUrl: 'basicdata/VehicleInfo',
            }, 'driver': { //车牌号
              queryCode: 'driverInfoCode',
              apiKey: '/driverinfo',
              itemName: '司机信息',
              configUrl: 'basicdata/DriverInfo',
            }          }
        }
        let keyArr = ['shopper', 'stocker'];
        let thisKey = keyArr.includes(key) ? 'shopper' : key;
        this.popover = { ...this.popover, ...popover[thisKey] }
      }

      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let params = this.HkdispatchOrderForm['outCar'] ? { carrierCode: this.HkdispatchOrderForm["carrierCode"] } : {};
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm, ...params,
              status: this.WHITE_LIST.includes(this.searchTarget) ? '2' : ''
            })
            this.popover.count = count;
            this.popover.queryBarObj = [
              { label: "编码", moduleBind: this.popover.queryCode, isInput: true },
            ];
            this.popover.popoverListKey = require('@/domain/tableconfig/' + this.popover.configUrl).default;
            this.popover.popoverList = list;
          } catch (e) { console.log(e); }
          this.popover.ruleForm = {};
        },
      }
      this.popover.currencySelectInputKey = key;
      key && currencyObj[key]();
      this.popover.isShowPopover = !this.popover.isShowPopover;
    },
    //分页
    handlePageChange (paper) {
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      this.handleBtnClick('search'); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    // 点击取消按钮，回到列表页
    handlerBack () {
      this.$router.push("M0507");
      sessionStorage.clear()
    },
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    isVerify () {
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    // 保存
    handlerPreserve () {
      this.verify['formModel'].validate(async (valid) => {
        if (valid) {
          this.isLoading = true
          let statusMessage = '';
          // 状态为 新增和修改 调用 不一样的 method
          try {
            let apiType = this.status === 'add' ? 'addhkdispatchorderData' : 'edithkdispatchorderData';
            const {
              data,
              status
            } = await api[apiType](this.HkdispatchOrderForm);
            this.HkdispatchOrderForm = { ...this.HkdispatchOrderForm, status: '1' }
            utools.setSession('saveMark', 'isSave');
            statusMessage = status;
            this.isTabDisabled = false;
          } catch (e) {
            console.log(e)
          } finally {
            this.isLoading = false
          }
          utools.alertMessage.bind(this)(statusMessage);
          this.status == 'add' && statusMessage == 200;
          this.initData();
        }
      })
    },
    //取消选中
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    // 选中
    handleCurrentChange (row) {
      this.fromDialogData.curRowData = row;
    },
    // 按钮点击
    handlerTabBtnClick (key) {
      let dealKey = {
        'search': () => {
          this.tabRequest(this.fromDialogData.ruleForm);
        },
        'shippingRoute': () => {
          //发运路线
          this.handlerSubPreservation();
        },
        'sendUp': () => {
          //送改发
        },
        'create': async () => {
          if (this.selectTab.length == 0) {   //生成数据
            this.$message('请选择要生成的数据');
          } else {
            for (let item of this.selectTab) {
              item.dispatchOrderCode = this.HkdispatchOrderForm.dispatchOrderCode
              item.consiCompany = item.receiveCompany;
              item.address = item.receiveAddress;
              item.telePhone = item.contactsPhone;
              item.carTimes = item.vehicleOrder;
            }
            const { data } = await api.insertBatchhkdispatchentrustData(this.selectTab);
            this.tabRequest();
          }
        },
      }
      this.fromDialogData.keyApi = key == 'add' ? 'addData' : 'create';
      key && dealKey[key].bind(this)();
      this.fromDialogData.ruleForm.billNo = this.HkdispatchOrderForm.billNo;
      this.setCurrent('');
    },
    handlerShowTableDialog () {
      if (!this.isShowTableDialog) return;
      this.isShowTableDialog = !this.isShowTableDialog;
    },
    // 保存
    async tabformClickPreservation () {
      let messageStatus = '';
      try {
        const { data, status } = await api[this.fromDialogData.keyApi]('/receivesettlement' + this.tableName, this.fromDialogData.ruleForm);
        messageStatus = status
      } catch (e) { console.log(e) }
      utools.alertMessage.bind(this)(messageStatus)
      this.tabRequest();
    },
    async loadCodeNo () { //加载编号
      let saveObj = utools.getSession('saveMark')
      if (!saveObj) {
        try {
          const {
            data
          } = await api.gethkdispatchorderCode()
          this.HkdispatchOrderForm.dispatchOrderCode = data;
          this.HkdispatchOrderForm.orderStatus = '1';
        } catch (e) { console.log(e) }
      }
    },
    // 加载列表
    async tabRequest (params = {}) {
      this.tableData = [], this.count = 0;
      try {
        if (!this.HkdispatchOrderForm.dispatchOrderCode) return;
        const {
          data: {
            list,
            count
          }
        } = await api.queryhkdispatchentrustSearchEntrusts({ ...params });
        this.tableData = list, this.pageCount = count;
      } catch (e) { console.log(e) }
    },
    async selectRequest (params = {}) {
      this.selectTabSearch = []
      let obj = this.HkdispatchOrderForm.dispatchOrderCode;
      const {
        data: {
          list,
          count
        }
      } = await api.queryhkdispatchentrustSearch({        ...params,
        dispatchOrderCode: obj
      });
      this.selectTabSearch = list, this.pageCount = count;
    },
    // 初始化数据
    async initData () {
      api.initSelect(this.HkdispatchOrderFormKey);
      let obj = utools.getSession('hkdispatchOrderForm');
      this.status == 'update' ? (
        this.HkdispatchOrderForm = obj
      ) : await this.loadCodeNo();
      this.tableName = 'entrust';
      this.HkdispatchOrderForm.operator = window.localStorage.getItem("ms_username");
      if (this.status == 'add') {
        this.HkdispatchOrderForm.billStatus = '1';
        this.HkdispatchOrderForm.operateTime = this.currentTime;
        let saveObj = utools.getSession('saveMark')
        if (!saveObj && this.status == 'add') {
          this.btnList[3].disabled = true
        } else {
          this.btnList[3].disabled = false
        }
      } else {
        this.HkdispatchOrderForm.billStatus = obj.billStatus;
        this.HkdispatchOrderForm.operateTime = obj.operateTime;
        this.isTabDisabled = false;
      }
      this.tabRequest();
    },
  },
  created () {
    // 路由切换拿数据
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.HkdispatchOrderForm = formData);
    this.status = status;
    this.initData();
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.HkdispatchOrderForm, status: this.status },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.btnList {
  margin: 0.8rem 6rem;
  text-align: right;
}
</style>
