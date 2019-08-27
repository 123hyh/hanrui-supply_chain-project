<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :dialog="false"
        :queryBarVisible='false'
        :popoverList="tableData"
        :popoverListKey='tableconfig'
        :count="tableCount"
        @dblclickTableRow='dblclickTableRow'
        :activeRow.sync="formDialog.clickRow"
        @handlePageChange="handleChange"
      ></table-component>

    </div>
    <popover-component
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData='formDialog'
      :itemName='formDialog.itemName'
      @formClickPreservation="handlerOtherSubmit"
      @handlerFormConfigClickSearch='rousePopover'
      @handlerFormVerify="handlerFormVerify"
    ></popover-component>
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
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'

import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";
import QueryBar from '@/components/common/QueryBar'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/EmployeeInfo'
import ruleForm from '@/domain/entities/basicdata/EmployeeInfo'
import formConfig from '@/domain/formconfig/basicdata/EmployeeInfo'
import { mapGetters } from 'vuex'

export default {
  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields()
    }
  },
  components: {
    QueryBar,
    TableComponent,
    PopoverComponent,
  },

  data: () => ({
    tableconfig,
    tableData: [],
    tableCount: 0,
    ruleForm: {},

    formDialog: {
      isShowPopover: false,
      paper: {},
      ruleForm: new ruleForm(),
      formConfig,
      btnKey: '',
      clickRow: {},
      validate: eval, //表单验证回调
      resetFields: eval,
      itemName: '员工档案'
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
      busiUnit: 'busiUnit',//改变的经营单位弹出列表
    },
  }),

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "employeeInfoCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },

    clickTypeAsync () {
      return {
        'search': async (page = {}) => {
          try {
            const { data: { list, count } } = await api.queryemployeeinfoSearch({ ...this.ruleForm, ...page });
            this.tableData = list, this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': () => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            employeeInfoCode: this.formDialog.ruleForm.employeeInfoCode
          }
        ),

        'update': () => {
          this.utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            async () => {
              try {
                const { data } = await api.searchOneemployeeinfoData(this.formDialog.clickRow.employeeInfoCode);
                this.formDialog.ruleForm = this.formDialog.clickRow = data;
                this.formDialog.isShowPopover = true;
              } catch (e) {
                this.$message.error('获取数据失败，请重试！')
                console.log(e)
              }
            }
          )
        },

        'delete': () => {
          utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            utools.removeReceiptsTips.bind(
              this,
              async () => {
                await api.deleteemployeeinfoData(this.formDialog.clickRow.employeeInfoCode);
                this.clickTypeAsync.search()
              }
            )
          )
        },
      }
    }
  },
  methods: {
    //table
    handlerSubPreservation (rowData, key) {
      console.log(rowData, key);
      if (this.formDialog.ruleForm[key] !== undefined) {
        if (key.includes('department')) {
          this.formDialog.ruleForm[key] = rowData['departmentName'];
          this.formDialog.ruleForm['departmentCode'] = rowData['departmentCode'];
        } else if (key.includes('leader')) {
          this.formDialog.ruleForm[key] = rowData['employeeInfoName'];
          this.formDialog.ruleForm['leaderCode'] = rowData['employeeInfoCode'];
        } else {
          this.formDialog.ruleForm[key] = rowData[key];
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop }
    },
    rousePopover (key) {
      this.popover.ruleForm = {};
      console.log(key)
      if (this.formDialog.ruleForm[key] !== undefined) {
        let popover = {
          'department': {
            queryCode: 'departmentCode',
            apiKey: '/department',
            itemName: '部门',
            configUrl: 'system/Department',
          },
          'leader': {
            queryCode: 'employeeInfoCode',
            apiKey: '/employeeinfo',
            itemName: '员工档案',
            configUrl: 'basicdata/EmployeeInfo',
          },
          'deliveryNo': {
            queryCode: 'busEntrustNo',
            apiKey: '/hkschedulebase',
            itemName: '上货计划',
            configUrl: 'logistics/HkscheduleBase',
          },
        }
        let allKey = ['department', 'leader']
        let thisKey = allKey.includes(key) ? key : 'deliveryNo';
        this.popoverParamsFn(popover[thisKey])
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, { ...this.popover.ruleForm, status: key === 'department' ? '' : '2' })
            this.popover.count = count;
            this.popover.queryBarObj = [
              { label: "编码", moduleBind: this.popover.queryCode, isInput: true },
            ];
            this.popover.popoverListKey = require('@/domain/tableconfig/' + this.popover.configUrl).default;
            this.popover.popoverList = list;
          } catch (error) {
            console.log(error);
          }
          this.popover.ruleForm = {};
        },
      }
      this.popover.currencySelectInputKey = key;
      key && currencyObj[key]();
      this.popover.isShowPopover = !this.popover.isShowPopover;
    },
    //分页
    async handlePageChange (paper) {
      let { data: { count, list } } = await api.querySearch(this.popover.apiKey, { ...this.popover.ruleForm, ...paper })
      this.popover.popoverList = list;
    },
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page) {
      this.formDialog.btnKey = clickType;
      this.clickTypeAsync[clickType](page);
    },
    /**
     * @method handlerFormVerify 设置验证规则
     */
    handlerFormVerify ({ formModel: { validate, resetFields } }) {
      this.formDialog.validate = validate;
      this.formDialog.resetFields = resetFields
    },

    // 弹窗按钮事件
    async handlerOtherSubmit () {
      this.saveForm()
    },

    // 保存单据
    async saveForm () {
      this.formDialog.validate(async valid => {
        if (valid) {
          utools.saveReceiptsTips.call(
            this,
            async () => {
              let apiType = this.formDialog.btnKey === 'add' ? 'addemployeeinfoData' : 'editemployeeinfoData';
              const {
                data,
                status
              } = await api[apiType](this.formDialog.ruleForm);
              this.formDialog.ruleForm.status = data.status;
              this.clickTypeAsync.search()
            }
          )
        }
      })
    },
    // 取消弹窗
    closeFormDialog () {
      if (!this.formDialog.isShowPopover) return;
      this.formDialog.isShowPopover = !this.formDialog.isShowPopover;
      this.setCurrent('')
    },
    // 取消选择
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row);
      this.formDialog.clickRow = {};
    },
    handleChange (param) { //列表翻页
      this.handleBtnClick('search', param)
    },
    clickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.formDialog.clickRow))) {
        this.formDialog.clickRow = row;
      }
    },
    dblclickTableRow (row) {
      this.formDialog.clickRow = utools.cloneObj(row);
      this.handleBtnClick('update');
    },

    //加载编号
    async loadCodeNo () {
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getemployeeinfoCode()
        this.formDialog.ruleForm.employeeInfoCode = data;
      } catch (e) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(e)
      }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig)
    this.handleBtnClick('search');
  },
}
</script>
