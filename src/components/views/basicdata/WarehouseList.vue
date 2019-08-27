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
        :dialog='false'
        :queryBarVisible='false'
        :activeRow.sync='formDialog.clickRow'
        :popoverList='tableData'
        :count='tableCount'
        :popoverListKey='tableconfig'
        @dblclickTableRow='dblclickTableRow'
        @handlePageChange='handleChange'
      ></table-component>
    </div>
    <popover-component
      itemName='仓库信息'
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType="form"
      :billsStatus='formDialog.ruleForm.status'
      :formData='formDialog'
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
      @handleBtnClickType="tableDialogBtnSearchAndPageChange"
      @changeisShowPopover='rousePopover'
      @handlerSubPreservation="handlerSubPreservation"
      @handlePageChange="tableDialogBtnSearchAndPageChange"
    ></popover-component>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'
const { titleCallBack, deleteMessage, alertMessage, turnCodeBoolean, alertStatusMessage, saveReceiptsTips
  , removeReceiptsTips,
  sbumitReceiptsTips } = utools;
import QueryBar from '@/components/common/QueryBar'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


import tableconfig from '@/domain/tableconfig/basicdata/Warehouse'
import ruleForm from '@/domain/entities/basicdata/Warehouse'
import formConfig from '@/domain/formconfig/basicdata/Warehouse'
import { mapGetters } from 'vuex'

export default {
  components: {
    QueryBar,
    TableComponent,
    PopoverComponent,
  },
  data: () => ({
    tableconfig,
    menuName: '仓库信息',
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
      resetFields: eval
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
        { label: "编码", moduleBind: "warehouseCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    requestAddress () {
      return {
        'province': () => api.getProvince(),
        'city': (code) => api.getCity(code),
        'district': (code) => api.getDistrict(code)
      }
    },
    clickTypeAsync () {
      return {

        'search': async (page) => {
          try {
            const {
              data: {
                list = [],
                count = 0
              }
            } = await api.querywarehouseSearch({
              ...this.ruleForm,
              ...page
            });
            turnCodeBoolean.call(utools, list),
              this.tableData = list, this.tableCount = count;
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },

        'add': _ => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            warehouseCode: this.formDialog.ruleForm.warehouseCode
          }
        ),

        'update': _ => titleCallBack.call(
          this,
          this.formDialog.clickRow,
          _ => {
            this.formDialog.ruleForm = this.formDialog.clickRow,
              this.formDialog.isShowPopover = true;
          }
        ),

        'delete': _ => {
          titleCallBack.call(
            this,
            this.formDialog.clickRow,
            _ => {
              removeReceiptsTips.call(this, async _ => {
                await api.deletewarehouseData(this.formDialog.clickRow.warehouseCode);
                this.clickTypeAsync['search']()
              }
              )
            }
          )
        }
      }
    }
  },
  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields()
    },
    'formDialog.ruleForm.province': {
      handler (cur, pre) {
        if (!cur || cur === pre) return;
        pre && this.formDialog.btnKey !== 'update' && (delete this.formDialog.ruleForm.city, delete this.formDialog.ruleForm.district);
        this.getAddress('city', cur);
      },
      deep: true
    },
    'formDialog.ruleForm.city': {
      handler (cur, pre) {
        if (!cur || cur === pre) return;
        pre && this.formDialog.btnKey !== 'update' && delete this.formDialog.ruleForm.district
        this.getAddress('district', cur);
      },
      deep: true
    },
  },
  methods: {
    // 加载省市区
    async getAddress (type, code) {
      try {
        const { data } = await this.requestAddress[type](code);
        this.handleSelectOption(data, type)
      } catch (e) { console.log(e) }
    },
    handleSelectOption (data, type) {
      for (let item of this.formDialog.formConfig) {
        if (item.key === type) {
          item.selectOption = data.map(item => (
            { itemKey: item.code, itemValue: item.name }
          ));
          break;
        }
      }
    },

    /************************** 弹窗methods start *******************/
    handlerSubPreservation (rowData, key) { // 选中行 确定
      console.log(rowData, key);
      if (this.formDialog.ruleForm[key] !== undefined) {
        if (key.includes('warehouseGroup')) {
          this.formDialog.ruleForm[key] = rowData['companyName'];
          this.formDialog.ruleForm['warehouseGroup'] = rowData['companyCode'];
        } else {
          this.formDialog.ruleForm[key] = rowData[key];
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop };
    },

    rousePopover (key) {
      if (this.formDialog.ruleForm.status === '2') return;
      if (this.formDialog.ruleForm[key] !== undefined) {
        let popover = {
          'warehouseGroup': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司列表',
            configUrl: 'basicdata/CompanyInfo',
          }
        }
        let thisKey = 'warehouseGroup';
        this.popoverParamsFn(popover[thisKey])
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, { status: '2' })
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

    //分页事件
    handlePageChange (paper) {
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
      this.handleBtnClick('search'); //翻页查询
    },

    // 表格弹窗 btn查询，分页查询
    async tableDialogBtnSearchAndPageChange (data) {
      let rqsData = { ...this.popover.ruleForm, status: '2' };
      try {
        typeof (data) === 'object' && (rqsData = { ...rqsData, ...data });
        const {
          data: {
            list,
            count
          }
        } = await api.querycompanyinfoSearch(rqsData);
        this.popover.popoverList = list;
        this.popover.count = count;
      } catch (error) {
        console.log(error)
      }

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
      this.formDialog.validate = validate,
        this.formDialog.resetFields = resetFields
    },

    // 弹窗按钮事件
    async handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },
    // 保存表单
    async saveForm () {
      this.formDialog.validate(valid => {
        if (valid) {
          saveReceiptsTips.call(
            this,
            async () => {
              let apiType = this.formDialog.btnKey === 'add' ? 'addwarehouseData' : 'editwarehouseData';
              const {
                data
              } = await api[apiType](this.formDialog.ruleForm);
              this.formDialog.ruleForm.status = data.status || '1';
              this.clickTypeAsync.search()
            }
          )
        }
      }
      )
    },
    // 单据提交
    async submitStatus () {
      let { warehouseCode } = this.formDialog.ruleForm;
      sbumitReceiptsTips.call(
        this,
        async _ => {
          const { status } = await api.updateBillStatus({ type: 'submit', code: warehouseCode });
          this.formDialog.isShowPopover = false;
          this.clickTypeAsync.search()
        }
      )
    },


    handleChange (param) { //列表翻页
      this.handleBtnClick('search', param)
    },
    // 双击事件
    dblclickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.formDialog.clickRow))) {
        this.formDialog.clickRow = row;
      }
      this.handleBtnClick('update');
    },
    async loadCodeNo () { //加载编号
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getwarehouseCode()
        this.formDialog.ruleForm.warehouseCode = data;
      } catch (e) { console.log(e) }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig);
    this.getAddress('province');
    this.handleBtnClick('search');
  },
}
</script>

<style lang="less" scoped>
</style>
