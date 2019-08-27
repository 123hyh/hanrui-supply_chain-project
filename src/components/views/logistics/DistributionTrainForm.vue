<!-- 报关单 -->
<template>
  <div>
    <div class="mb-10">
      <!-- 操作按钮 -->
      <!-- <el-button type="primary" @click="handlerPreserve">保存</el-button>
			<el-button type="cancel" @click="handlerBack">返回</el-button> -->
       <preserve-btn
        :form='DistributionTrainForm'
        @handlePreserve='handlerPreserve'
        @handleRollback='handlerBack'
        :isLoading='isLoading'
      ></preserve-btn>
    </div>
    <div>
      <form-component
        :formModel='DistributionTrainForm'
        :inputKey='DistributionTrainFormKey'
        @handlerFormConfigSelectChange="selectChange"
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch='rousePopover'
      ></form-component>
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
import PopoverComponent from '@/components/common/Popover.vue'

// 表单配置
import DistributionTrainForm from "@/domain/entities/logistics/DistributionTrain";
import DistributionTrainFormKey from "@/domain/formconfig/logistics/DistributionTrain";

import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  mounted () {
    console.log(this.DistributionTrainFormKey)
  },
  components: {
    FormComponent,
    PopoverComponent
  },
  watch: {
    'DistributionTrainForm.hasCutOrder': {
      handler (cur, pre) {
        for (let item of this.DistributionTrainFormKey) {
          switch (item.key) {
            case 'hasOutStock':
            case 'outStockTime':
            case 'shopper':
              item.disabled = (cur ? true : false);
              item.btn !== undefined && (item.btn = +this.DistributionTrainForm.status <= 1 && !cur)
              break;
          }

        }
      },
      deep: true
    },
    'DistributionTrainForm.hasOutStock': {
      handler (cur, pre) {
        for (let item of this.DistributionTrainFormKey) {
          switch (item.key) {
            case 'hasCutOrder':
              item.disabled = (cur ? true : false);
              break;
          }
        }
      },
      deep: true
    },
    'DistributionTrainForm.hasOutVehicles': {
      handler (cur, pre) {
        console.log(1);
        // 清空承运方，司机，车牌号
        let form = this.DistributionTrainForm;
        form.carrier = '',
          form.plateNo = '',
          form.driver = '',
          form.telePhone = '',
          form.carrierCode = '';

        for (let item of this.DistributionTrainFormKey) {
          switch (item.key) {
            case 'carrier':
              item.disabled = (!cur ? true : false);
              item.btn !== undefined && (item.btn = +this.DistributionTrainForm.status <= 1 && cur)
              break;
          }
        }
      },
      deep: true
    }
  },
  data: () => ({
    isLoading: false,
    status: '',
    searchTarget: '',
    DistributionTrainFormKey,
    DistributionTrainForm: new DistributionTrainForm(),
    verify: '',
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
  },
  methods: {
    /************************** 弹窗methods start *******************/
    ...mapMutations([
      'addBtnType', 'addbreadCrumbsList'
    ]),
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
    selectChange (val) {

    },
    //table
    async handlerSubPreservation (rowData, key) {
      if (this.DistributionTrainForm[key] !== undefined) {
        if (key == "plateNo") {
          this.DistributionTrainForm[key] = rowData["vehicleNo"];
          this.DistributionTrainForm['plateNoCode'] = rowData["vehicleInfoCode"];
        } else if (key == "deliveryLine") {
          this.DistributionTrainForm[key] = rowData["shippingRouteName"];
          this.DistributionTrainForm['deliveryLineCode'] = rowData["shippingRouteCode"];
        } else if (key == "carrier") {
          this.DistributionTrainForm[key] = rowData["carrierName"];
          this.DistributionTrainForm['carrierCode'] = rowData["carrierCode"];
        } else if (key == "receiver") {
          this.DistributionTrainForm[key] = rowData["signPerson"];
        } else if (key == "driver") {
          this.DistributionTrainForm[key] = rowData["driverName"];
          this.DistributionTrainForm['driverCode'] = rowData["driverInfoCode"];
          this.DistributionTrainForm['telePhone'] = rowData["phone"] || rowData["telePhone"];
        } else {
          this.DistributionTrainForm[key] = rowData["employeeInfoName"];
          this.DistributionTrainForm['shopperCode'] = rowData["employeeInfoCode"];
        }
      }
    },
    rousePopover (key) {
      this.searchTarget = key;
      if (this.DistributionTrainForm[key] !== undefined) {
        let popover = {
          'shopper': { //配送员
            queryCode: 'employeeInfoCode',
            apiKey: '/employeeinfo',
            itemName: '员工档案',
            configUrl: 'basicdata/EmployeeInfo',
          },
          'deliveryLine': { //配送线路 
            queryCode: 'shippingRouteCode',
            apiKey: '/shippingroute',
            itemName: '发运路线',
            configUrl: 'basicdata/ShippingRoute',    //search
          },
          'carrier': { //承运方
            queryCode: 'clientNo',
            apiKey: '/carrierbase',
            itemName: '承运商',
            configUrl: 'basicdata/CarrierBase',
          },
          'receiver': { //签收人
            queryCode: 'receiverNo',
            apiKey: '/shipmentbase',
            itemName: '深圳发运单',
            configUrl: 'logistics/ShipmentBase',
          },
        }
        if (this.DistributionTrainForm['hasOutVehicles']) {
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
        // 					let keyArr =['shopper','driver'];
        // 					let thisKey = keyArr.includes(key)? 'shopper': key;
        this.popover = { ...this.popover, ...popover[key] }
      }
      const WHITE_LIST = ['deliveryLine', 'carrier', 'plateNo', 'driver', 'shopper']
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let params = this.DistributionTrainForm['hasOutVehicles'] ? { carrierCode: this.DistributionTrainForm["carrierCode"] } : {};
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, {
              ...this.popover.ruleForm, ...params,
              status: WHITE_LIST.includes(this.searchTarget) ? '2' : ''
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
      this.$router.push("M0705");
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
    async handlerPreserve () {
      if (this.isVerify()) {
        this.isLoading = true
        let statusMessage = '';
        // 状态为 新增和修改 调用 不一样的 method
        try {
          let apiType = this.status === 'add' ? 'adddistributiontrainData' : 'editdistributiontrainData';
          const {
            data,
            status
          } = await api[apiType](this.DistributionTrainForm);
          this.DistributionTrainForm = { ...this.DistributionTrainForm, status: '1' }
          utools.setSession('saveMark', 'isSave');
          statusMessage = status;
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoading = false
        }
        utools.alertMessage.bind(this)(statusMessage);
        this.status == 'add' && statusMessage == 200;
      }
    },

    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      let saveObj = utools.getSession('saveMark')
      if (!saveObj) {
        try {
          const {
            data
          } = await api.getdistributiontrainCode()
          this.DistributionTrainForm.distributionTrainCode = data;
          this.DistributionTrainForm.orderStatus = '1';
        } catch (e) { console.log(e) }
      }
    },

    // 初始化数据
    async initData () {
      api.initSelect(this.DistributionTrainFormKey);
      let obj = utools.getSession('DistributionTrain');
      this.status == 'update' ? (
        this.DistributionTrainForm = obj
      ) : await this.loadCodeNo();
    },
  },
  created () {
    // 路由切换拿数据
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.DistributionTrainForm = formData);
    console.log(formData)
    this.status = status;
    this.initData();
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.DistributionTrainForm, status: this.status },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
</style>
