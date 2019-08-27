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
        :form='RemittanceForm'
        @handlePreserve='handlerPreserve'
        @handleRollback='handlerBack'
        :isLoading='isLoading'
      ></preserve-btn>
    </div>
    <div>
      <form-component
        :formModel='RemittanceForm'
        :inputKey='RemittanceFormKey'
        @handlerFormVerify="handlerFormVerify"
        @handlerFormConfigClickSearch='rousePopover'
      ></form-component>
      <div class="tableWrapper">
        <el-table
          :data="tableData"
          ref="singleTable"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            v-for='item in tableKey'
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
          ></el-table-column>
        </el-table>
        <pagination-component
          :count='pageCount'
          @handlePageChange='tabRequest'
        ></pagination-component>
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
    ></popover-component>
  </div>
</template>

<script>
// 组件
import FormComponent from "@/components/common/FormConfig.vue";
import PopoverComponent from '@/components/common/Popover.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import formModuleHead from "@/components/common/FormModuleHead.vue";

// 表单配置
import RemittanceForm from "@/domain/entities/finance/Remittance";
import RemittanceFormKey from "@/domain/formconfig/finance/Remittance";
import tableKey from "@/domain/tableconfig/finance/RemittanceItem";

import api from "@/assets/js/appHelper";
import utools from '@/domain/common/utools.js'
import { mapGetters, mapActions, mapMutations } from 'vuex'
let RuleForm = '';
export default {
  name: 'RemittanceForm',
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
    formModuleHead
  },
  data: () => ({
    isLoading: false,
    status: '',
    jumpType: '',
    RemittanceFormKey,
    RemittanceForm: new RemittanceForm(),
    verify: '',
    // TODO: 临时数据
    btnList: [
      { type: 'primary', key: 'add', name: '新增' },
      { type: 'primary', key: 'update', name: '修改' },
      { type: 'danger', key: 'delete', name: '删除' },
    ],
    tableData: [],
    tableKey,
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
      { name: 'fee', label: '计费信息' },
      { name: 'materiel', label: '物料信息' },
    ]),
  },
  watch: {
    tableName (newVal, oldVal) {
      newVal = utools.capitalize(newVal);
      this.tableKey = require('@/domain/tableconfig/finance/RemittanceItem').default;
      this.fromDialogData.formConfig = require('@/domain/formconfig/finance/RemittanceItem').default;
      api.initSelect(this.fromDialogData.formConfig)
      RuleForm = require('@/domain/entities/finance/RemittanceItem').default;
      this.fromDialogData.ruleForm = new RuleForm();
      this.tabRequest()
    }
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
    //table
    handlerSubPreservation (rowData, key) {
      if (this.RemittanceForm[key] !== undefined) {
        if (key == "delegeteBillNo") {
          this.RemittanceForm[key] = rowData["entrustOrderNo"];
        } else if (key == "client") {
          this.RemittanceForm[key] = rowData["clientName"];
        } else if (key == "customer") {
          this.RemittanceForm[key] = rowData["customerName"];
        } else if (key == "company") {
          this.RemittanceForm[key] = rowData["companyName"];
        } else {
          this.RemittanceForm[key] = rowData['departmentName'];
        }
      }
    },
    rousePopover (key) {
      if (this.RemittanceForm[key] !== undefined) {
        let popover = {
          'delegeteBillNo': {
            queryCode: 'entrustOrderNo',
            apiKey: '/entrustorder',
            itemName: '委托单号',
            configUrl: 'commerce/EntrustOrder',
          },
          'client': {
            queryCode: 'clientNo',
            apiKey: '/client',
            itemName: '委托方',
            configUrl: 'business/Client',
          },
          'customer': {
            queryCode: 'customerNo',
            apiKey: '/customer',
            itemName: '客户',
            configUrl: 'basicdata/Customer',
          },
          'company': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司',
            configUrl: 'basicdata/CompanyInfo',
          },
          'salesGroup': {
            queryCode: 'departmentCode',
            apiKey: '/department',
            itemName: '部门',
            configUrl: 'system/Department',
          },
          'project': {
            queryCode: 'financeProjectCode',
            apiKey: '/financeproject',
            itemName: '项目',
            configUrl: 'basicdata/FinanceProject',
          },
          'receiverAccount': {
            queryCode: 'customerNo',
            apiKey: '/customerbank',
            itemName: '银行卡账户',
            configUrl: 'basicdata/CustomerBank',
          },
        }
        this.popover.queryCode = popover[key]['queryCode'];
        this.popover.apiKey = popover[key]['apiKey'];
        this.popover.itemName = popover[key]['itemName'];
        this.popover.configUrl = popover[key]['configUrl'];
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
      this.popover.ruleForm.pageIndex = paper.pageIndex;
      this.popover.ruleForm.pageSize = paper.pageSize;
      this.handleBtnClick('search'); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    // 点击取消按钮，回到列表页
    handlerBack () {
      this.$router.push("M0815");
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
        this.isLoading = true;
        let statusMessage = '';
        // 状态为 新增和修改 调用 不一样的 method
        try {
          let apiType = this.status === 'add' ? 'addremittanceData' : 'editremittanceData';
          const {
            data,
            status
          } = await api[apiType](this.RemittanceForm);
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
    // 选中
    handleCurrentChange (row) {
      this.fromDialogData.curRowData = row;
    },
    // 按钮点击
    handlerTabBtnClick (key) {
      let curRowData = this.fromDialogData.curRowData;
      this.fromDialogData.ruleForm = curRowData
        ? curRowData : key == 'add' ? new RuleForm()
          : this.fromDialogData.ruleForm;
      let dealKey = {
        'add': () => {
          this.isShowTableDialog = true;
        },
        'update': () => {
          curRowData
            ? this.isShowTableDialog = true
            : this.$message('请选择要修改的数据');
        },
        'delete': () => {
          curRowData
            ? (async () => {
              let messageStatus = '';
              try {
                const { data, status } = await api.deleteData('/receivesettlement', this.fromDialogData.ruleForm.itemCode);
                messageStatus = status
              } catch (e) { console.log(e) }
              utools.alertMessage.bind(this)(messageStatus)
              this.tabRequest();
            })() : this.$message('请选择要删除的数据');
        },
      }
      this.fromDialogData.keyApi = key == 'add' ? 'addData' : 'editData';
      key && dealKey[key].bind(this)();
      this.fromDialogData.ruleForm.billNo = this.RemittanceForm.billNo;
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
        const { data, status } = await api[this.fromDialogData.keyApi]('/receivesettlement', this.fromDialogData.ruleForm);
        messageStatus = status
      } catch (e) { console.log(e) }
      utools.alertMessage.bind(this)(messageStatus)
      this.tabRequest();
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      let saveObj = utools.getSession('saveMark')
      if (!saveObj) {
        try {
          const {
            data
          } = await api.getremittanceCode()
          this.RemittanceForm.billNo = data;
          this.RemittanceForm.orderStatus = '1';
        } catch (e) { console.log(e) }
      }
    },
    // 加载列表
    async tabRequest (params = {}) {
      this.tableData = [], this.count = 0;
      try {
        if (!this.RemittanceForm.billNo) return;
        const {
          data: {
            list,
            count
          }
        } = await api.querySearch('/remittanceitem', {          ...params,
          billNo: this.RemittanceForm.billNo
        });
        this.tableData = list, this.pageCount = count;
      } catch (e) { console.log(e) }
    },
    // 初始化数据
    async initData () {
      api.initSelect(this.RemittanceFormKey);
      let obj = utools.getSession('pubchaseOrder');
      this.status == 'update' ? (
        this.RemittanceForm = obj
      ) : await this.loadCodeNo();
      this.tabRequest();
      if (this.status == 'add') {  //单据状态
        this.RemittanceForm.status = '1';
      } else {
        this.RemittanceForm.status = obj.status;
      }
    },
  },
  created () {
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.RemittanceForm = formData);
    this.status = status;
    this.initData();
  },

  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.RemittanceForm, status: this.status },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.tableWrapper {
  margin-top: 30px;
}
</style>
