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
import QueryBar from '@/components/common/QueryBar'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import PopoverComponent from '@/components/common/Table.Form.Dialog/DialogComponent.vue'

import tableconfig from '@/domain/tableconfig/basicdata/CompanyInfo'
import ruleForm from '@/domain/entities/basicdata/CompanyInfo'
import formConfig from '@/domain/formconfig/basicdata/CompanyInfo'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    QueryBar,
    TableComponent,
    PopoverComponent,
  },
  data: () => ({
    tableconfig,
    menuName: '公司信息',
    tableData: [],
    tableCount: 0,
    ruleForm: {},
    formDialog: {
      clickRow: {}
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
        { label: "编码", moduleBind: "companyCode", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },

    clickTypeAsync () {
      return {
        'search': async (pageData = {}) => {
          try {
            const { data: { list = [], count = 0 } } = await api.querycompanyinfoSearch(pageData);
            this.utools.turnCodeBoolean(list),
              this.tableData = list,
              this.tableCount = count;
          } catch (e) {
            this.$message.error('查询列表数据失败，请重试！')
            console.log(e)
          }
        },
        'add': () => (
          this.formDialog.isShowPopover = true,
          this.loadCodeNo(),
          this.formDialog.ruleForm = {
            ...new ruleForm(),
            companyCode: this.formDialog.ruleForm.companyCode
          }),
        'update': () => {
          this.utools.titleCallBack.bind(this)(this.formDialog.clickRow, async () => {
            try {
              const { data } = await api.searchOnecompanyinfoData(this.formDialog.clickRow.companyCode);
              this.formDialog.ruleForm = this.formDialog.clickRow = data;
              this.formDialog.isShowPopover = true;
            } catch (e) { console.log(e) }
          })
        },
        'delete': this.removeBill
      }
    }
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    removeBill () {
      this.utools.titleCallBack.call(this, this.formDialog.clickRow, () => {
        this.utools.removeReceiptsTips.call(this, async () => {
          if ((this.formDialog.clickRow.status || 0) >= 2) return this.$message({ type: 'warning', message: '已提交或已审核的数据不能操作' })
          const { status, data: { list, count } } = await api.deletecompanyinfoData(this.formDialog.clickRow.companyCode);
          this.clickTypeAsync.search()
        })
      })
    },


    /************************** 弹窗methods start *******************/
    handlerSubPreservation (rowData, key) { // 选中行 确定
      if (this.formDialog.ruleForm[key] !== undefined) {
        if (key.includes('parentName')) {
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, [key]: rowData.companyName, parentCode: companyCode }
        } else {
          this.formDialog.ruleForm[key] = rowData[key];
        }
      }
    },
    popoverParamsFn (pop) {
      this.popover = { ...this.popover, ...pop }
    },
    rousePopover (key) {
      if (this.formDialog.ruleForm.status === '2') return;
      if (this.formDialog.ruleForm[key] !== undefined) {
        let popover = {
          'parentName': {
            queryCode: 'companyCode',
            apiKey: '/companyinfo',
            itemName: '公司列表',
            configUrl: 'basicdata/CompanyInfo',
          },
          'category': {
            queryCode: 'customsStatusCode',
            apiKey: '/customsformbase',
            itemName: '报关基础资料',
            configUrl: 'custom/CustomsFormBase',
          },
        }
        let allKey = ['parentName']
        let thisKey = allKey.includes(key) ? 'parentName' : 'category';
        this.popoverParamsFn(popover[thisKey])
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.popover.apiKey, { ...this.popover.ruleForm, status: '2' })
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
    handlePageChange (paper) {
      this.popover.ruleForm = { ...this.popover.ruleForm, ...paper }
      this.handleBtnClick('search'); //翻页查询
    },
    // table弹窗 点击 查询按钮 条件查询 / 分页 
    async tableDialogBtnSearchAndPageChange (data) {
      let rqsData = { ...this.popover.ruleForm, status: '2' };
      typeof (data) === 'object' && (rqsData = { ...rqsData, ...data });
      try {
        const { data: { list, count }, status } = await api.querycompanyinfoSearch(rqsData);
        this.popover.popoverList = list;
        this.popover.count = count;
      } catch (error) {
        console.log(error)
      }
    },
    /************************** 弹窗methods end *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick (clickType, page = {}) {
      // this.formDialog.btnKey = clickType;
      clickType === 'search' && (
        page = { ...page, ...this.ruleForm },
        this.clickTypeAsync[clickType](page)
      );
      if (clickType !== 'search' && clickType !== 'delete')
        this.jumpEdietPage(clickType);
      if (clickType === 'delete') {
        this.clickTypeAsync[clickType]()
      }
    },
    // 跳转到编辑页面
    jumpEdietPage (type) {
      if (type === 'update' && this.utools.isNull(this.formDialog.clickRow)) {
        this.$message({
          type: 'warning',
          message: '请选中一条数据操作！'
        })
        return;
      }
      let param = {
        path: '/SeCompanyInfo',
        data: {
          status: type === 'add' ? 'add' : 'update',
        },
        title: '认款单信息'
      }
      type === 'update' && (param.data.code = this.formDialog.clickRow.companyCode);
      this.addbreadCrumbsList(param);
      this.$router.push('/SeCompanyInfo')
    },

    isVerify () {
      let isVerify = false;
      this.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },



    handleChange (param) { //列表翻页
      this.handleBtnClick('search', param)
    },

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
        } = await api.getcompanyinfoCode();
        this.$set(this.formDialog.ruleForm, 'companyCode', data)
      } catch (e) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(e)
      }
    },
  },
  created () {
    this.handleBtnClick('search');
  },
}
</script>

<style lang="less">
</style>
