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
      @handlerFormConfigClickSearch='rousePopover'
      @handlerFormVerify="handlerFormVerifyDialog"
    ></popover-component>
    <div class="mb-10">
      <!-- 操作按钮 -->
      <!-- <el-button type="primary" @click="handlerPreserve">保存</el-button>
			<el-button type="cancel" @click="handlerBack">返回</el-button> -->
        <preserve-btn
        :form='CentreDispatchForm'
        @handlePreserve='handlerPreserve'
        @handleRollback='handlerBack'
        :isLoading='isLoading'
      ></preserve-btn>
    </div>
    <div>
      <form-component
        :formModel='CentreDispatchForm'
        :inputKey='CentreDispatchFormKey'
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch='rousePopover'
      ></form-component>
      <div class="wrapper">
        <div class="rightTable">
          <!-- <div class="formBorder">
						<div class="formBox">
							<form-component :formModel='DispatchOrderForm' :inputKey='DispatchOrderFormKey'  @handlerFormConfigClickSearch='rousePopover'></form-component>
						</div>
						<div class="btnWrapper">
							<el-button v-for="item in rightBtnList" :type="item.type" :key="item.key" @click="handlerTabBtnClick(item.key)">{{item.name}}</el-button>
						</div>
					</div> -->
          <div
            class="mb-10"
            v-show="+CentreDispatchForm.status<=1"
          >
            <el-button
              v-for="item in btnList"
              :type="item.type"
              :key="item.key"
              @click="handlerTabBtnClick(item.key)"
            >{{item.name}}</el-button>
          </div>

          <table-component
            :isSubTable='true'
            :dialog='false'
            :popoverList='tableData'
            :popoverListKey='rightTableKey'
            :count='0'
            :activeRow.sync='clickRow'
            @handlePageChange='handleTabPageChange'
          ></table-component>

        </div>
      </div>
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
      @handleSelectionChange="changeSelects"
    ></popover-component>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import PopoverComponent from '@/components/common/Popover.vue';
import PaginationComponent from '@/components/common/Pagination.vue';
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

//表格配置
import tableconfigDelegete from '@/domain/tableconfig/logistics/CentreDelegete'
import tableconfigCentreReceive from '@/domain/tableconfig/logistics/CentreReceive'

// 表单配置
import CentreDispatchForm from "@/domain/entities/logistics/CentreDispatch";
import CentreDispatchFormKey from "@/domain/formconfig/logistics/CentreDispatch";
import CentreReceiveForm from "@/domain/entities/logistics/CentreReceive";
import CentreReceiveFormKey from "@/domain/formconfig/logistics/CentreReceive";
import DispatchOrderFormKey from "@/domain/formconfig/logistics/CentreDispatchSearch";
import DispatchOrderForm from "@/domain/entities/logistics/DispatchEntrust";

import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
let RuleForm = '';
export default {
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
    TableComponent
  },
  data: () => ({
    isLoading: false,
    jumpType: '',
    status: '',
    CentreDispatchFormKey,
    CentreDispatchForm: new CentreDispatchForm(),
    CentreReceiveFormKey,
    CentreReceiveForm: new CentreReceiveForm(),
    DispatchOrderFormKey,
    DispatchOrderForm: new DispatchOrderForm(),
    verify: '',
    verifys: '',
    dialogCode: '',
    clickRow: {},
    // TODO: 临时数据
    btnList: [
      { key: 'delete', name: '删除' },
    ],
    rightBtnList: [   //子表右侧按钮
      { type: 'primary', key: 'hang', name: '挂起车辆' },
      { type: 'primary', key: 'send', name: '送改发' },
      { type: 'primary', key: 'line', name: '发运路线' },
      { type: 'primary', key: 'data', name: '发送日期' },
      { type: 'primary', key: 'search', name: '查询' },
    ],
    tableName: 'delegete',
    tableData: [],
    leftTableData: [],
    leftTableKey: tableconfigDelegete,
    rightTableKey: tableconfigCentreReceive,
    pageCount: 0,
    leftPageCount: 0,
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
      popoverType: 'selectTable', // 弹出框
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
      { name: 'receive', label: '收货信息' },
      { name: 'delegete', label: '委托信息' },
    ]),
  },
  watch: {

  },
  methods: {
    /************************** 弹窗methods start *******************/
    ...mapMutations([
      'addBtnType', 'addbreadCrumbsList'
    ]),
    changeSelects (val) {
      console.log(val);
    },
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
    handleBtnClickObj () {
      return {
        search: async () => {
          try {
            var { data: { count, list } } = await api.querySearch(this.popover.apiKey, this.popover.ruleForm)
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
      if (rowData instanceof Array) {
        let codeArr = [], nameArr = '';
        this.tableData = [];
        this.tableData = this.tableData.concat(rowData);
        utools.setSession('tab', this.tableData)
        rowData.map(item => {
          codeArr.push(item.dispatchOrderCode);
          nameArr += `${item.dispatchOrderCode} `;
        });
        rowData = { dispatchOrderCode: codeArr, dispatchOrderName: nameArr }
        if (this.CentreDispatchForm[key] !== undefined) {
          if (key == "dispatchOrderName") {
            this.CentreDispatchForm[key] = rowData["dispatchOrderName"];
            this.CentreDispatchForm['dispatchOrderCodes'] = rowData["dispatchOrderCode"];
          } else {//委托单号
            this.CentreDispatchForm[key] = rowData[key];
          }
        }
      } else {
        if (this.CentreDispatchFormKey[key] !== undefined) {
          if (key == "transportTimeEfficiency") {
            this.DispatchOrderForm[key] = rowData["transportTimeCode"];
            // this.DispatchOrderForm["transportTimeEfficiencyCode"] = rowData["transportTimeCode"];
          } else if (key == "deliveryNo") {//提运单号
            this.DispatchOrderForm[key] = rowData["scheduleBaseCode"];
          } else if (key == "dispatchOrderCode") {
            this.DispatchOrderForm[key] = rowData["entrustOrderNo"];
          } else if (key == "delegeteBillNo") {//委托单号
            this.CentreDispatchFormKey[key] = rowData[nameArr];
          }
        } else if (this.fromDialogData.ruleForm[key] !== undefined) {
          if (key == "deliveryTrain") {
            this.fromDialogData.ruleForm[key] = rowData["deliveryTrain"];
            this.fromDialogData.ruleForm["deliveryTrainCode"] = rowData["distributionTrainCode"];
          } else if (key == "route") {
            this.fromDialogData.ruleForm[key] = rowData["shippingRouteName"];
            this.fromDialogData.ruleForm["shippingRouteCode"] = rowData["shippingRouteCode"];
          } else if (key == "driver") {
            this.fromDialogData.ruleForm[key] = rowData["employeeInfoName"];
            this.fromDialogData.ruleForm["driverCode"] = rowData["driverCode"];
          } else if (key == "dispatchOrderCodes") {
            this.fromDialogData.ruleForm[key] = rowData["dispatchOrderCode"];
          } else if (key == "plateNo") {
            this.fromDialogData.ruleForm[key] = rowData["vehicleNo"];
            this.fromDialogData.ruleForm["plateNoCode"] = rowData["vehicleInfoCode"];
          }
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover.queryCode = pop['queryCode'];
      this.popover.apiKey = pop['apiKey'];
      this.popover.itemName = pop['itemName'];
      this.popover.configUrl = pop['configUrl'];
    },
    rousePopover (key) {
      //
      if (this.CentreDispatchForm[key] !== undefined) {
        let popover = {
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
          'delegeteBillNo': { //委托单号
            queryCode: 'clientOrderNo',
            apiKey: '/entrustorder',
            itemName: '委托单',
            configUrl: 'commerce/EntrustOrder',
          },
          'dispatchOrderName': { //调度单号
            queryCode: 'dispatchOrderCode',
            apiKey: '/dispatchorder',
            itemName: '调度单',
            configUrl: 'logistics/DispatchOrders',
          },
        }
        this.popoverParamsFn(popover[key])
      } else if (this.fromDialogData.ruleForm[key] !== undefined) {
        let popover = {
          'deliveryTrain': { //配送车次
            queryCode: 'distributionTrainCode',
            apiKey: '/distributiontrain',
            itemName: '配送车次',
            configUrl: 'logistics/DistributionTrain',
          },
          'route': { //发运线路 
            queryCode: 'shippingRouteCode',
            apiKey: '/shippingroute',
            itemName: '发运路线',
            configUrl: 'basicdata/ShippingRoute',
          },
          'driver': { //配送员
            queryCode: 'employeeInfoCode',
            apiKey: '/employeeinfo',
            itemName: '员工档案',
            configUrl: 'basicdata/EmployeeInfo',
          },
          'plateNo': { //车辆
            queryCode: 'vehicleInfoCode',
            apiKey: '/vehicleinfo',
            itemName: '仓储车辆信息',
            configUrl: 'basicdata/VehicleInfo',
          },
        }
        this.popoverParamsFn(popover[key])
      }

      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, this.popover.ruleForm)
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
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
      this.handleBtnClick('search'); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    // 点击取消按钮，回到列表页
    handlerBack () {
      this.$router.push("M0706");
      sessionStorage.clear()
    },
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    handlerFormVerifyDialog ($refs) {   //获取弹窗
      this.verifys = $refs;
    },
    isVerify () {      //验证form
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    isVerifys () {         //弹窗验证
      let isVerifys = false;
      this.verifys["formModel"].validate(valid => {
        isVerifys = valid;
      });
      this.isShowTableDialog = true;
      return isVerifys;
    },
    // 保存
    async handlerPreserve () {
      if (this.isVerify()) {
        this.isLoading = true
        let statusMessage = '';
        // 状态为 新增和修改 调用 不一样的 method
        try {
          let apiType = this.status === 'add' ? 'addcentredispatchData' : 'editcentredispatchData';
          const {
            data,
            status
          } = await api[apiType](this.CentreDispatchForm);
          utools.setSession('saveMark', 'isSave');
          statusMessage = status;
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoading = false;
        }
        utools.alertMessage.bind(this)(statusMessage);
        this.status == 'add' && statusMessage == 200;
      }
    },
    //取消选中
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row);
    },


    // 按钮点击
    handlerTabBtnClick (key) {
      let curRowData = this.clickRow;
      this.fromDialogData.ruleForm = curRowData
        ? curRowData : key == 'add' ? new RuleForm()
          : this.fromDialogData.ruleForm;
      let dealKey = {
        'add': () => {
          this.loadReceiveCodeNo();
          this.fromDialogData.ruleForm.centreDispatchCode = this.dialogCode;
          this.isShowTableDialog = true;
        },
        'search': () => {  //搜索

          // this.tabRequestSearch(this.DispatchOrderForm);
        },
        'hang': () => {  //挂起车辆

        },
        'send': () => {   //送改发

        },
        'line': () => {  //发运路线

        },
        'data': () => {   //日期

        },
        'delete': () => {
          if (JSON.stringify(this.clickRow) === '{}') {
            this.$message('请选择要删除的数据')
          } else {
            this.utools.deleteMessage.bind(this)(() => {
              try {
                // 									this.tableData.map((item,ind)=>{
                // 										console.log(item,ind)
                // 										this.tableData.splice(ind,1)
                // 										utools.setSession({"tab": this.tableData})
                // 									})
                this.tableData.splice(this.tableData.findIndex(item => (item.dispatchOrderCode === this.clickRow.dispatchOrderCode)), 1)
                utools.setSession("tab", this.tableData)
                this.utools.alertMessage.bind(this)(200, null, '删除')
                this.clickRow = {}
              } catch (e) { console.log(e) }
            })
          }
        },
      }
      this.fromDialogData.keyApi = key == 'add' ? 'addData' : 'editData';
      key && dealKey[key].bind(this)();
      this.fromDialogData.ruleForm.itemCode = this.CentreDispatchForm.itemCode;
      this.setCurrent('');
    },
    handlerShowTableDialog () {
      if (!this.isShowTableDialog) return;
      this.isShowTableDialog = !this.isShowTableDialog;
    },
    // 弹窗保存
    async tabformClickPreservation () {
      if (this.isVerifys()) {
        let messageStatus = '';
        try {
          const { data, status } = await api[this.fromDialogData.keyApi]('/centrereceive', this.fromDialogData.ruleForm);
          messageStatus = status
        } catch (e) { console.log(e) }
        utools.alertMessage.bind(this)(messageStatus)
        this.tabRequest();
      }

    },
    async loadCodeNo () { //加载编号
      // 新增时获取集中调度单编号
      let saveObj = utools.getSession('saveMark');
      if (!saveObj) {
        try {
          const {
            data
          } = await api.getcentredispatchCode()
          this.CentreDispatchForm.centreDispatchCode = data;
          this.dialogCode = data;
          this.CentreDispatchForm.orderStatus = '1';
        } catch (e) { console.log(e) }
      }
    },
    async loadReceiveCodeNo () { //加载子表收货信息编号
      try {
        const {
          data
        } = await api.getcentreReceiveCode()
        this.fromDialogData.ruleForm.itemCode = data;
        this.fromDialogData.ruleForm.orderStatus = '1';
      } catch (e) { console.log(e) }
    },
    //查询右边列表
    // 	async tabRequestSearch(params = {}) {
    // 	this.tableData = [], this.count = 0;
    // 	try {
    // 		if (!this.CentreDispatchForm.centreDispatchCode) return;
    // 		const {
    // 			data: {
    // 				list,
    // 				count
    // 			}
    // 		} = await api.querySearch('/importinvoice', { ...params,
    // 			centreDispatchCode: this.CentreDispatchForm.centreDispatchCode
    // 		});
    // 		this.tableData = list, this.pageCount = count;
    // 	} catch (e) { console.log(e) }
    // },
    // 加载列表
    async tabRequest (params = {}) {
      this.tableData = [], this.count = 0;
      try {
        if (!this.CentreDispatchForm.centreDispatchCode) return;
        const {
          data: {
            list,
            count
          }
        } = await api.querySearch('/centrereceive', {          ...params,
          centreDispatchCode: this.CentreDispatchForm.centreDispatchCode
        });
        list.map((item, index) => {
          item.shippingRoute = item.route;
          item.chargingScheme = item.chargingScheme;
          item.dispatchType = item.dispatchTypeName;
        })
        this.tableData = list, this.pageCount = count;

      } catch (e) { console.log(e) }
    },
    // 初始化数据
    async initData () {
      api.initSelect(this.CentreDispatchFormKey);
      let obj = utools.getSession('CentreDispatchForm');
      this.status == 'update' ? (
        this.CentreDispatchForm = obj,
        this.tabRequest()
      ) : await this.loadCodeNo();
      this.tableName = 'receive';
      this.fromDialogData.formConfig = require('@/domain/formconfig/logistics/CentreReceive').default;
      api.initSelect(this.fromDialogData.formConfig)
      api.initSelect(this.DispatchOrderFormKey);
      RuleForm = require('@/domain/entities/logistics/CentreReceive').default;
      this.fromDialogData.ruleForm = new RuleForm();
      if (this.status == 'add') {
        this.CentreDispatchForm.billStatus = '1';
      } else {
        this.CentreDispatchForm.billStatus = obj.billStatus;
        this.dialogCode = obj.centreDispatchCode;
      }
    },
    handleTabPageChange () { }
  },
  created () {
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.CentreDispatchForm = formData);
    this.status = status;
    this.initData();
    this.tableData = utools.getSession('tab');
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.CentreDispatchForm, status: this.status },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  margin-top: 40px;
  overflow: hidden;
  border-top: 1px solid #dcdfe6;
  // padding-top: 10px;
}
.formBorder {
  border: 1px solid #dcdfe6;
  padding: 10px;
  overflow: hidden;
}
.mb-10 {
  margin: 10px 5px;
}
.formBox {
  width: 635px;
  overflow: scroll;
  float: left;
}
.btnWrapper {
  float: left;
  width: 13%;
}
.el-button + .el-button {
  margin: 10px 0 0 5px;
}
</style>
