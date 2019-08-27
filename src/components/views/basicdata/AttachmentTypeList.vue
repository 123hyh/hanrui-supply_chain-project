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
      :isShowPopover.sync='formDialog.isShowPopover'
      popoverType='form'
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
import QueryBar from '@/components/common/QueryBar'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/AttachmentType'
import ruleForm from '@/domain/entities/basicdata/AttachmentType'
import formConfig from '@/domain/formconfig/basicdata/AttachmentType'
import { mapGetters } from 'vuex'

export default {
  watch: {
    'formDialog.isShowPopover' (val) {
      if (!val) this.formDialog.resetFields(); // 重置表单
    }
  },
  components: {
    QueryBar,
    PopoverComponent: () => import('@/components/common/Table.Form.Dialog/DialogComponent.vue'),
    TableComponent
  },
  data: () => ({
    tableconfig,
    menuName: '附件上传类型',
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
      resetFields: eval, // 重置表单
      itemName: '附件上传类型'
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
        { label: "编码", moduleBind: "attachmentTypeCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    clickTypeAsync () {
      return {
        'search': async (page) => {
          try {
            const { data: { list = [], count = 0 } } = await api.queryattachmenttypeSearch({ ...this.ruleForm, ...page });
            this.utools.turnCodeBoolean(list), this.tableData = list, this.tableCount = count;
          } catch (e) {
            this.$message.error('查询列表数据失败，请重试！');
            console.log(e)
          }
        },
        'add': () => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            attachmentTypeCode: this.formDialog.ruleForm.attachmentTypeCode
          }),
        'update': () => {
          this.utools.titleCallBack.call(
            this,
            this.formDialog.clickRow,
            async () => {
              const { data } = await api.searchOneattachmenttypeData(this.formDialog.clickRow.attachmentTypeCode);
              this.formDialog.ruleForm = this.formDialog.clickRow = data;
              this.formDialog.isShowPopover = true;
            }
          )
        },
        'delete': () => {
          this.utools.titleCallBack.call(this,
            this.formDialog.clickRow,
            () => {
              this.utools.removeReceiptsTips.call(this,
                async () => {
                  const { status, data: { list, count } } = await api.deleteattachmenttypeData(this.formDialog.clickRow.attachmentTypeCode);
                  this.clickTypeAsync['search']();
                }
              )
            }
          )
        },
      }
    }
  },
  methods: {
    //table
    handlerSubPreservation (rowData, key) {
      const { scheduleBaseCode, port, platesNo, planDate } = rowData;
      if (this.tabForm[key] !== undefined) {
        if (key.includes('deliveryNo')) {
          for (let [keys, value] in Object.entries({ [key]: scheduleBaseCode, entryPort: port, conveyance: platesNo, loadingTime: planDate })) {
            this.$set(this.tabForm, keys, value)
          }
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop }
    },
    rousePopover (key) {
      console.log(key);
      if (this.formDialog.ruleForm.status === '2') return;
      if (this.tabForm[key] !== undefined) {
        let popover = {
          'deliveryNo': {
            queryCode: 'busEntrustNo',
            apiKey: '/hkschedulebase',
            itemName: '上货计划',
            configUrl: 'logistics/HkscheduleBase',
          },
        }
        let allKey = ['deliveryNo', 'destination', 'packagingType', 'receiveUnit', 'overseaShipper', 'storagePlace', 'supervisionType', 'containerCode', 'exemption', 'originCountry', 'inspectionWay']
        let thisKey = unitArr.includes(key) ? 'busiUnit' : countryArr.includes(key) ? 'originCountry' : officeArr.includes(key) ? 'iqOffice' : allKey.includes(key) ? key : 'category';
        this.popoverParamsFn(popover[thisKey])
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
      this.handleBtnClick('search');
    },

    /************************** 弹窗methods end *******************/
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
        this.formDialog.resetFields = resetFields;
    },
    isVerify () {
      let isVerify = false;
      this.formDialog.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    // 弹窗按钮事件
    async handlerOtherSubmit ({ type = '' } = {}) {
      type ? this.submitStatus() : this.saveForm()
    },
    // 表单保存
    async saveForm () {
      if (this.isVerify()) {
        this.utools.saveReceiptsTips.call(this, async () => {
          let apiType = this.formDialog.btnKey === 'add' ? 'addattachmenttypeData' : 'editattachmenttypeData';
          const {
            data,
            status
          } = await api[apiType](this.formDialog.ruleForm);
          this.formDialog.ruleForm.status = data.status;
          this.clickTypeAsync['search']();
        })
      }
    },
    // 单据提交
    async submitStatus () {
      this.utools.sbumitReceiptsTips.call(this, async () => {
        const { status } = await api.updateBillStatus({
          type: 'submit',
          code: this.formDialog.ruleForm.attachmentTypeCode
        });
        this.formDialog.isShowPopover = false;
      })
    },

    //列表分页
    handleChange (param) {
      this.handleBtnClick('search', param)
    },

    // 表格双击操作
    dblclickTableRow (row) {
      if (!(JSON.stringify(row) === JSON.stringify(this.formDialog.clickRow))) {
        this.formDialog.clickRow = row;
      }
      this.handleBtnClick('update');
    },

    //加载单据编号
    async loadCodeNo () {
      // 新增时获取采购订单编号
      try {
        const {
          data
        } = await api.getattachmenttypeCode()
        this.formDialog.ruleForm.attachmentTypeCode = data;
      } catch (e) { console.log(e) }
    },
  },
  created () {
    api.initSelect(this.formDialog.formConfig)
    this.handleBtnClick('search');
  },
}
</script>