<template>
  <div class="Box">
    <!-- 操作按钮 -->
    <preserve-btn
      :isLoading='isLoading'
      :form='form.data'
      @handleRollback='handleRollback'
      @handlePreserve='handlePreserve'
      @handleVerify="handleVerify"
    ></preserve-btn>
    <!-- 主form -->
    <form-component
      :formModel="form['data']"
      :inputKey="form['formConfig']"
      @handlerFormVerify="handlerFormVerify"
      @handlerFormConfigClickSearch="rousePopover"
    ></form-component>
    <!-- 子列表 -->
    <el-tabs
      v-model="table.tabActiveName"
      type="card"
      class="handleTableHeight"
      @tab-click="handlerTabClick"
    >
      <el-tab-pane
        v-for="item in tabObj"
        :key="item.name"
        :label="item.label"
        :name="item.name"
        :disabled="table.isTabDisabled"
      >
      </el-tab-pane>
      <div v-if="!table.isTabDisabled">
        <div class="mb-10">
          <el-button
            v-for="item in table.btnList"
            :key="item.key"
            :type="item.type"
            @click="handleTabBtnClick(item.key)"
          >{{item.name}}</el-button>
        </div>
        <el-table
          :data="table.tableData"
          border
          stripe
          highlight-current-row
          @row-click="clickTableRow"
          ref="singleTable"
        >
          <el-table-column
            v-for='item in table.tableConfig'
            :key="item.label"
            :prop="item.prop"
            :label="item.label"
          ></el-table-column>
        </el-table>
        <pagination-component
          :count='table.pageCount'
          @handlePageChange='handleTabPageChange'
        ></pagination-component>
      </div>
    </el-tabs>
    <!-- form 弹窗 -->
    <popover-component
      :isShowPopover='formDialog.isShowPopover'
      :popoverType="'form'"
      :formData='formDialog'
      :itemName='formDialog.itemName'
      @handlerFormVerify="handlerPopFormVerify"
      @changeisShowPopover="closeFormDialog"
      @formClickPreservation="handlePopFormSubmit"
      @handlerFormConfigClickSearch='rousePopover'
    ></popover-component>
    <!-- table 弹出框 -->
    <popover-component
      :isShowPopover='tableDialog.isShowPopover'
      :itemName='tableDialog.itemName'
      :popoverType="tableDialog.popoverType"
      :ruleForm='tableDialog.ruleForm'
      :formConfig='tableDialog.queryBarConfig'
      :btnObj='tableDialog.btnObj'
      :popoverList='tableDialog.data'
      :popoverListKey='tableDialog.tableConfig'
      :count='tableDialog.count'
      @handleBtnClickType="handleTableDialogClick"
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

import formConfig from "@/domain/formconfig/basicdata/WarehouseQuotation";
import api from "@/assets/js/appHelper.js";
// 引入vuex
import { mapGetters, mapMutations } from 'vuex'

let ColumnData = '';
export default {
  components: {
    FormComponent,
    PopoverComponent,
    PaginationComponent,
  },
  data: () => ({
    status: 'update', //主表的状态
    isLoading: false,
    // 主form
    form: {
      validate: new Function, //表单验证回调
      data: { tenantId: 'hfy' },
      formConfig
    },
    // 列表弹窗
    tableDialog: {
      isShowPopover: false, // 弹窗显示
      itemName: '',// 弹窗标题
      popoverType: 'table', // 弹出框
      queryBarConfig: [], // 弹出框查询栏
      btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
      ruleForm: { tenantId: 'hfy' }, // 查询栏的model绑定
      data: [],
      tableConfig: [],
      count: 0, // 分页数据总条数
    },
    // form 弹窗

    formDialog: {
      isShowPopover: false,
      itemName: '', // 表单标题
      validate: new Function, //表单验证回调
      paper: {},
      btnType: '',
      ruleForm: { tenantId: 'hfy' },
      formConfig: [],
    },
    // 子列表
    table: {
      isTabDisabled: true,
      tabActiveName: '',
      itemTabObj: {},
      tableData: [],
      tableConfig: [],
      pageCount: 0,
      clickRow: {},
      btnList: [
        { type: '', key: 'add', name: '新增' },
        { type: '', key: 'update', name: '修改' },
        { type: '', key: 'delete', name: '删除' },
      ]
    },
  }),
  computed: {
    ...mapGetters(['getActivePathData']),
    tabObj: () => ([
      { name: 'item', label: '基本信息', code: 'GYCW', codeName: 'itemCode' },
    ]),
    DialogRequest: () => ({
      'companyName': (data = {}) => api.querycompanyinfoSearch(data),
      'clientName': (data = {}) => api.queryclientSearch(data),
      'warehouseName': (data = {}) => api.querywarehouseSearch(data),
      'financeProjectName': (data = {}) => api.queryfinanceprojectSearch(data),
    }),
    tableConfigs: () => ({
      companyName: {
        title: '公司列表',
        searchCode: 'companyCode',
        config: _ => require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
      },
      clientName: {
        title: '委托方',
        searchCode: 'clientNo',
        config: _ => require('@/domain/tableconfig/business/Client.js').default,
      },
      warehouseName: {
        title: '仓库',
        searchCode: 'warehouseCode',
        config: _ => require('@/domain/tableconfig/basicdata/Warehouse.js').default,
      },
      financeProjectName: {
        title: '财务计费项目',
        searchCode: 'financeProjectCode',
        config: _ => require('@/domain/tableconfig/basicdata/FinanceProject.js').default,
      },
    }),
    // 子表的增删改查
    clickTypeAsync () {
      return {
        'search': async (page) => {
          try {
            const { data: { list, count } } = await api.querySearch(this.table.itemTabObj.tabApi, { ...page });
            list && (this.utools.turnCodeBoolean(list), this.table.tableData = list, this.table.pageCount = count);
          } catch (e) { console.log(e); this.utools.alertMessage.bind(this)(status, e.message) }
        },
        'add': () => (this.formDialog.isShowPopover = true, this.formDialog.ruleForm = { tenantId: 'hfy', billCode: this.form.data.billCode }, this.loadTabCodeNo()),
        'update': () => {          this.utools.titleCallBack.bind(this)(this.table.clickRow, async () => {
            try {
              // let itemCode = this.table.clickRow[this.table.itemTabObj['codeName']]
              let itemCode = this.table.clickRow['itemCode']
              const { data } = await api.searchOneApi(this.table.itemTabObj.tabApi, itemCode);
              console.log(data)
              this.formDialog.ruleForm = this.table.clickRow = data;
              this.formDialog.isShowPopover = true;
            } catch (e) { console.log(e); this.utools.alertMessage.bind(this)(status, e.message) }
          })        },
        'delete': () => {
          this.utools.titleCallBack.bind(this)(this.table.clickRow, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                const { status, data: { list, count } } = await api.deleteData(this.table.itemTabObj.tabApi, this.table.clickRow.itemCode);
                this.utools.alertMessage.bind(this)(status, null, '删除')
                this.clickTypeAsync['search']()
              } catch (e) { console.log(e); this.utools.alertMessage.bind(this)(status, e.message) }
            })
          })
        },
      }
    }
  },
  watch: {
  },
  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),
    /************************** 弹窗methods start *******************/
    handleTableDialogClick () { //点击列表弹窗查询栏按钮事件
      this.rousePopover(this.dialogTarget, null, this.tableDialog.ruleForm)
    },
    // 列表弹窗确认事件
    handlerSubPreservation (data) {
      switch (this.dialogTarget) {
        case 'companyName':
          this.form.data = { ...this.form.data, companyName: data.companyName, companyCode: data.companyCode };
          break;
        case 'clientName':
          this.form.data = { ...this.form.data, clientName: data.clientName, clientNo: data.clientNo };
          break;
        case 'warehouseName':
          this.form.data = { ...this.form.data, warehouseName: data.warehouseName, warehouseCode: data.warehouseCode };
          break;
        case 'financeProjectName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, financeProjectName: data.financeProjectName, financeProjectCode: data.financeProjectCode };
          break;
        default:
          this.form.data = { ...this.form.data, ...data };
          break;
      }
    },
    // 点击放大镜
    rousePopover (params, tableconfigitem, queryData) {
      this.dialogTarget = params;
      // 弹窗条件
      params ? (async () => {
        try {
          const { data: { list, count } } = await this.DialogRequest[params](queryData);
          console.log(list)
          this.tableDialog = { ...this.tableDialog, data: list, count: count, itemName: this.tableConfigs[params]['title'], queryBarConfig: [{ label: "编码", moduleBind: this.tableConfigs[params]['searchCode'], isInput: true }], tableConfig: this.tableConfigs[params]['config'](), isShowPopover: true }
        } catch (error) {
          this.utools.alertMessage.bind(this)('', '获取数据失败, 请重试')
          console.log(error)
        }
      })() : this.tableDialog.isShowPopover = false;
      // this.handlerSubPreservation()
    },
    //table弹窗分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper }
      this.handleTableDialogClick(); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    handlerFormVerify ({ formModel: { validate } }) {
      this.form.validate = validate;
    },
    handlerPopFormVerify ({ formModel: { validate } }) {
      this.formDialog.validate = validate;
    },
    isVerify () {
      let isVerify = false;
      this.form.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    isPopFormVerify () {
      let isVerify = false;
      this.formDialog.validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    handleRollback () { // 返回
      this.$router.push('M0711')
    },

    handleVerify () { // 审核
      console.log('handleVerify')
    },
    /*************** 供应链供应商methods start******************/
    //保存主表单
    async handlePreserve () {
      if (this.isVerify()) {
        this.isLoading = true;
        try {
          let apiType = this.status === 'add' ? 'addwarehousequotationData' : 'editwarehousequotationData';
          var {
            data,
            status
          } = await api[apiType](this.form.data);
          this.status === 'add' &&
            (this.table.isTabDisabled = false,
              this.table.tabActiveName = 'item',
              this.handlerTabClick({ name: this.table.tabActiveName }));
          this.$set(this.formDialog.ruleForm, 'status', '1')
        } catch (e) { console.log(e) }
        finally {
          this.isLoading = false
        }
        this.utools.alertMessage.bind(this)(status);
      }
    },
    // 切换页签
    handlerTabClick ({
      name
    } = tab, event) {
      this.table.itemTabObj = { ...this.tabObj.filter(item => item.name == name)[0], tabApi: `/warehousequotation${name}` };
      let upperCaseName = this.utools.capitalize(name);
      this.table.tableConfig = require("@/domain/tableconfig/basicdata/WarehouseQuotation" + upperCaseName).default;
      this.formDialog.formConfig = require("@/domain/formconfig/basicdata/WarehouseQuotation" + upperCaseName).default;
      api.initSelect(this.formDialog.formConfig);
      this.handleTabPageChange({ pageIndex: 1 })
      this.table.clickRow = {}; // 清空当前行数据
    },
    // 子列表分页
    handleTabPageChange (paper) {
      this.handleTabBtnClick('search', paper)
    },
    // 显示子表form 弹窗
    handleTabBtnClick (clickType, page) {
      this.formDialog.btntype = clickType;
      this.clickTypeAsync[clickType](page);
    },
    // 弹窗提交
    async handlePopFormSubmit () {
      if (this.isPopFormVerify()) {
        try {
          let apiType = this.formDialog.btntype === 'add' ? 'addData' : 'editData';
          const {
            data,
            status
          } = await api[apiType](this.table.itemTabObj.tabApi, this.formDialog.ruleForm);
          this.utools.alertMessage.bind(this)(status);
          this.clickTypeAsync['search']()
          status == 200 && (this.formDialog.isShowPopover = false)
        } catch (e) { console.log(e) }
      }
    },
    // 取消 form 弹窗
    closeFormDialog () {
      if (!this.formDialog.isShowPopover) return;
      this.formDialog.isShowPopover = !this.formDialog.isShowPopover;
    },
    // 选中当前行
    clickTableRow (row) {
      // 获取修改内容
      this.table.clickRow = row;
      console.log(row)
      this.$refs.singleTable.toggleRowSelection(row)
    },
    async loadCodeNo () { //加载编号
      try {
        let { data } = await api.getCodewarehousequotation()
        this.form.data.billCode = data;
      } catch (e) {
        console.log(e)
      }
    },
    async loadTabCodeNo () { //加载子列表编号
      try {
        console.log(this.table.itemTabObj);
        const { data } = await api.getCommonCodeNo(this.table.itemTabObj.code)
        this.formDialog.ruleForm = { ...this.formDialog.ruleForm, [this.table.itemTabObj['codeName']]: data };
      } catch (e) {
        console.log(e)
      }
    },
    /*************************** 供应链供应商methods end ****************** */
    initData () {
      api.initSelect(this.form.formConfig);
      const { formData, status } = this.getActivePathData(this.$route.path);
      formData && (this.form.data = formData);
      this.status = status;
      const { jumpType, ...params } = this.utools.getSession(this.$route.name);
      jumpType ? (this.status = jumpType, this.loadCodeNo()) :
        (this.form.data = params, this.table.isTabDisabled = false, this.table.tabActiveName = 'item',
          this.handlerTabClick({ name: this.table.tabActiveName }));
    },
  },
  created () {
    this.initData()
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.form.data, status: this.status },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.form-layout {
  > div {
    flex-basis: 20vw;
    height: 15px;
  }
}
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.handleTableHeight {
  height: 48vh;
  margin-top: 20px;
}
</style>
