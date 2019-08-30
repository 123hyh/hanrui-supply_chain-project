<template>
  <div class="Box import-custom-order-form">

    <!-- 操作按钮 -->
    <preserve-btn
      :form='form.data'
      @handlePreserve='handlePreserve'
      @handleRollback='handlebackspacing'
      :isLoading='isLoading'
    ></preserve-btn>

    <!-- 输入框 -->
    <form-component
      :formModel="form.data"
      :formConfig="form.formConfig"
      @handlerSearchClick='handlerFormConfigClickSearch'
    >
    </form-component>

    <!-- 表格 -->
    <el-button
      @click="openTabForm()"
      v-show='(+form.data.status || 0) < 1'
    >新增</el-button>

    <section v-show="table.isshow">

      <!-- 分割条 -->
      <div class="cut-off-rule">商品明细</div>
      <table-component
        :isSubTable='true'
        :tableData="table.tableData"
        :tableDataKey="table.tableConfig"
        :isShowTabTable="true"
        :tabName="(+form.data.status || 0)<=1 ? 'basic':'' "
        @TableClickRowData="TableClickRowData"
        @handlerTableBtnClick='handlerTableBtnClick'
      ></table-component>
      <pagination-component
        :count="table.pageCount"
        @handlePageChange="handleTablePageChange"
      ></pagination-component>
    </section>

    <!-- 表格弹窗 -->
    <popover-components
      :popoverType="tableDialog.popoverType"
      :itemName='tableDialog.title'
      :formConfig='tableDialog.queryBarObj'
      :btnObj='tableDialog.btnObj'
      :isShowPopover.sync="tableDialog.isshow"
      :popoverList='tableDialog.data'
      :popoverListKey='tableDialog.tableConfig'
      :ruleForm='tableDialog.ruleForm'
      :count='tableDialog.count'
      @handleBtnClickType="handleBtnClick"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
      @handlePageChange="handlePageChange"
    ></popover-components>

    <popover-components
      itemName='商品明细'
      :isShowPopover.sync='formDialog.isshow'
      popoverType='form'
      :formData="formDialog"
      :calculate='calculateItem'
      @formClickPreservation="handlerTableFormPreservation"
      @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
    ></popover-components>
    <div>
    </div>
  </div>
</template>
<script>
// 公共方法
import api from "@/assets/js/appHelper.js";

// 公共组件
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import TabTable from "@/components/common/TabTable.vue";
import PaginationComponent from "@/components/common/Pagination.vue";
import FormModuleHead from '@/components/common/FormModuleHead.vue'
// 注册表
import formConfig from "@/domain/formconfig/custom/ImportCustomOrder";
import tableConfig from '@/domain/tableconfig/custom/ImportCustomGoods';
import itemFormConfig from '@/domain/formconfig/custom/ImportCustomGoods'
import PopoverComponents from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import { mapGetters, mapMutations } from 'vuex'
import utools from '@/domain/common/utools.js'
import { debuglog } from 'util';
const { cloneObj } = utools;
export default {
  name: 'ImportCustomOrderForm',
  computed: {
    ...mapGetters(['getActivePathData', 'exchangeRate']),
    calculateItem () {
      return {
        targetCurrencyToRmb: (this.formDialog.ruleForm.originalCurrencyToRmb || 0) * (this.formDialog.ruleForm.quantity || 0), // 目标币到人民币 = 数量 * 原币别到人民币
      }
    },
    DialogRequest () {
      return {
        waitCustomList: (data = {}) => api.queryprecustomsSearch(data),
        businessUnitName: (data = {}) => api.querycompanyinfoSearch(data),
        transportMachine: (data = {}) => api.queryconveyanceSearch(data),
        deliveryOrderNo: (data = {}) => api.queryHkschedulebase(data),
        scheduleBaseCode: (data = {}) => api.queryHkschedulebase(data),
        carNumber: (data = {}) => api.queryTrainnumber(data),
        packageKind: (data = {}) => api.querypackagetypeSearch(data),
        entrustOrderNo: (data = {}) => api.queryentrustorderSearch(data),
        goodsName: (data = {}) => api.getEntrustGoods(data),
        taxNo: (data = {}) => api.getCustomsMaterielList(data),
        brand: (data = {}) => api.getBrandList(data),
        sourceArea: (data = {}) => api.getOriginList(data),
        superviseTerm: (data = {}) => api.getSupervisionConditionList(data),
        exemption: (data = {}) => api.getExemptionList(data),
        unitName: (data = {}) => api.getMeasurement(data),
        superviseMode: (data = {}) => api.getSupervisionModeList(data)
      }
    },
    tableConfigs: () => ({
      waitCustomList: {
        title: '待报关列表',
        searchCode: 'preCustomsCode',
        config: _ => require('@/domain/tableconfig/logistics/Precustoms.js').default,
      },
      businessUnitName: {
        title: '公司列表',
        searchCode: 'CompanyCode',
        config: _ => require('@/domain/tableconfig/basicdata/CompanyInfo.js').default,
      },
      transportMachine: {
        title: '运输工具',
        searchCode: 'conveyanceCode',
        config: _ => require('@/domain/tableconfig/basicdata/Conveyance.js').default,
      },
      deliveryOrderNo: {
        title: '香港上货计划',
        searchCode: 'scheduleBaseCode',
        config: _ => require('@/domain/tableconfig/logistics/HkscheduleBase.js').default,
      },
      scheduleBaseCode: {
        title: '香港上货计划',
        searchCode: 'scheduleBaseCode',
        config: _ => require('@/domain/tableconfig/logistics/HkscheduleBase.js').default,
      },
      carNumber: {
        title: '车次列表',
        searchCode: 'trainNumberCode',
        config: _ => require('@/domain/tableconfig/basicdata/TrainNumber.js').default,
      },
      packageKind: {
        title: '包装种类',
        searchCode: 'packageCode',
        config: _ => require('@/domain/tableconfig/basicdata/PackageType.js').default,
      },
      entrustOrderNo: {
        title: '委托订单',
        searchCode: 'entrustOrderNo',
        config: _ => require('@/domain/tableconfig/commerce/EntrustOrder.js').default,
      },
      goodsName: {
        title: '委托订单-商品明细',
        searchCode: 'goodsCode',
        config: _ => require('@/domain/tableconfig/commerce/EntrustGoods.js').default,
      },
      taxNo: {
        title: '物料税号',
        searchCode: 'customsMaterielCode',
        config: _ => require('@/domain/tableconfig/basicdata/CustomsMateriel.js').default,
      },
      brand: {
        title: '品牌',
        searchCode: 'brandCode',
        config: _ => require('@/domain/tableconfig/basicdata/Brand.js').default,
      },
      sourceArea: {
        title: '产地表',
        searchCode: 'originCode',
        config: _ => require('@/domain/tableconfig/basicdata/Origin.js').default,
      },
      superviseTerm: {
        title: '监管条件',
        searchCode: 'billCode',
        config: _ => require('@/domain/tableconfig/basicdata/SupervisionCondition.js').default,
      },
      exemption: {
        title: '征免性质',
        searchCode: 'exemptionCode',
        config: _ => require('@/domain/tableconfig/basicdata/Exemption.js').default,
      },
      superviseMode: {
        title: '监管方式',
        searchCode: 'supervisionModeCode',
        config: _ => require('@/domain/tableconfig/basicdata/SupervisionMode.js').default,
      },
      unitName: {
        title: '计量单位',
        searchCode: 'measurementCode',
        config: _ => require('@/domain/tableconfig/basicdata/Measurement.js').default,
      },
    }),
    // 商品明细按钮事件
    clickTypeGoodsAsync () {
      return {
        'search': async () => {
          const { data: { list, count } } = await api.querySearch(`/${this.table.tableName}`, this.formDialog.paper);
          list && (this.utools.turnCodeBoolean(list), this.tableData = list, this.pageCount = count);
        },
        'add': () => (this.formDialog.isShowPopover = true, this.formDialog.ruleForm = { ...new RuleForm(), customsFormCode: this.CustomsHead.customsFormCode }),
        'edit': () => {          this.utools.titleCallBack.bind(this)(this.clickRowData, async () => {
            try {
              const { data } = await api.searchOneData(`/${this.tableName}`, { itemCode: this.clickRowData.itemCode });
              this.formDialog.ruleForm = this.clickRowData = data;
              this.formDialog.isShowPopover = true;
            } catch (e) { console.log(e) }
          })        },
        'delete': () => {
          this.utools.titleCallBack.bind(this)(this.clickRowData, () => {
            this.utools.deleteMessage.bind(this)(async () => {
              try {
                var { status, data: { list, count } } = await api.deleteimportcustomgoodsData(this.clickRowData.itemCode);
                this.initTableData();
              } catch (e) { console.log(e) }
              this.utools.alertMessage.bind(this)(status, null, '删除')
            })
          })
        },
      }
    }
  },
  components: {
    FormComponent,
    TableComponent: TabTable,
    FormModuleHead,
    PaginationComponent,
    PopoverComponents
  },
  data () {
    return {
      tableBtnType: '',
      dialogTarget: '',
      status: 'update',
      isLoading: false,
      form: {
        data: {},
        formConfig: cloneObj(formConfig)
      },
      formDialog: {
        isshow: false,
        ruleForm: {},
        formConfig: itemFormConfig
      },
      table: {
        isshow: false,
        tableData: [],
        tableConfig,
        pageCount: 0,
        tempData: []
      },
      tableDialog: {
        popoverType: '',
        isshow: false,
        ruleForm: {},
        count: 0,
        title: '报关计划单-基础信息',
        queryBarObj: [{ label: "编码", moduleBind: "companyCode", isInput: true }], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        data: [],
        tableConfig: []
      },
      clickRowData: {},
    };
  },
  watch: {
    'status': {
      /* 控制委托单 的btn按钮 */
      handler (cur, pre) {
        this.utools.setFormConfig(this.form.formConfig, [
          { key: 'entrustOrderNo', btn: cur === 'add' ? true : false }
        ])
      },
      deep: true,
      immediate: true
    },
    'form.data.unitType': {
      handler (cur, pre) {
        if (+this.form.data.status <= 1) {
          for (let item of this.form.formConfig) {
            switch (item.key) {
              case 'businessUnitName':
              case 'declarationUnitName':
              case 'receiveUnitName':
                item.btn = (cur == '1');
                break;
              default:
                break;
            }
          }
        }
      },
      deep: true
    },
    // 监听商品明细的按钮类型
    'tableBtnType': {
      handler (cur, pre) {
        for (let item of this.formDialog.formConfig) {
          switch (item.key) {
            case 'orderNos':
              item.btn = (cur == 'add');
              break;
            default:
              break;
          }
        }
      },
      deep: true
    },
    'formDialog.ruleForm': {
      handler (cur, pre) {
        if(!cur)return
          this.utools.resCalcConfig(
            this.formDialog.ruleForm,
            this.formDialog.formConfig,
            this.formDialog.ruleForm
          );
      },
      deep: true
    },
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    async getsolutionformula(){
      try {
          const { data } = await api.getsolutionformula({
            billNo: this.formDialog.ruleForm.solutionNo,
            pageIndex: "",
            pageSize: ""
          });
          this.utools.setCalcconfigObj(
            this.formDialog.formConfig,
            data.list
          );
        } catch (error) {
          console.log(error);
        }
    }, 

    async initTableData (page = {}) {
      try {
        const { data: { list, count } } = await api.queryimportcustomgoodsSearch({ ...page, planOrderNo: this.form.data.planOrderNo });
        this.table = { ...this.table, tableData: list, pageCount: count };
      } catch (error) {
        console.log(error)
      }
    },
    openTabForm () {
      this.handlerFormConfigClickSearch('entrustOrderNo')
    },
    // 点击放大镜
    async handlerFormConfigClickSearch (params, obj, queryData) {
      this.dialogTarget = params;
      const unitArr = ['declarationUnitName', 'receiveUnitName'];
      params = unitArr.includes(params) ? 'businessUnitName' : params;
      this.tableDialog.popoverType = (params == 'orderNos' || params == 'entrustOrderNo') ? 'selectTable' : 'table'; // 委托单号是多选表格
      // 弹窗条件
      queryData = params == 'goodsName' ? { ...queryData, entrustOrderNos: [this.formDialog.ruleForm.orderNos] } : queryData;
      try {
        const { data: { list, count } } = await this.DialogRequest[params]({ ...queryData, ...this.setReqStatus() });
        this.tableDialog = { ...this.tableDialog, data: list, count: count, title: this.tableConfigs[params]['title'], queryBarObj: [{ label: "编码", moduleBind: this.tableConfigs[params]['searchCode'], isInput: true }], tableConfig: this.tableConfigs[params]['config'](), isshow: true }
      } catch (error) {
        this.utools.alertMessage.bind(this)('', '获取数据失败, 请重试')
        console.log(error)
      }
    },
    setReqStatus () {
      console.log(this.dialogTarget)
      const WHITE_LIST = [
        'receiveUnitName', 'carNumber', 'businessUnitName', 'transportMachine', 'declarationUnitName', 'deliveryOrderNo', 'scheduleBaseCode', 'packageKind',
        'goodsName', 'unitName', 'superviseTerm', 'exemption'
      ];
      return { status: WHITE_LIST.includes(this.dialogTarget) ? '2' : '' }
    },
    handleBtnClick () { //点击查询栏按钮事件
      this.handlerFormConfigClickSearch(this.dialogTarget, null, this.tableDialog.ruleForm)
    },
    // 选中商品明细单行
    TableClickRowData (data) {
      this.clickRowData = data;
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
    },
    closeFormDialog () {
      if (!this.formDialog.isshow) return;
      this.formDialog.isshow = !this.formDialog.isshow;
    },
    // 列表弹窗确认事件
    tableDialogPreservation (data) {
      switch (this.dialogTarget) {
        case 'waitCustomList':
          this.form.data = { ...this.form.data, waitCustomList: data.preCustomsCode, flightNo: data.voyageNo, grossWeight: data.grossWeight, carSort: data.vehicleSequence };
          break;
        case 'businessUnitName':
        case 'declarationUnitName':
        case 'receiveUnitName':
          this.form.data = { ...this.form.data, [this.dialogTarget]: data.companyName, [this.dialogTarget.replace(/Name/g, "Code")]: data.companyCode };
          break;
        case 'transportMachine':
          this.form.data = { ...this.form.data, transportMachine: data.conveyanceName, transportMachineCode: data.conveyanceCode };
          break;
        case 'deliveryOrderNo':
          this.form.data = { ...this.form.data, deliveryOrderNo: data.loadingBillNo, carNumber: data.trips, containerNo: data.containerNo };
          break;
        case 'scheduleBaseCode':
          this.form.data = { ...this.form.data, scheduleBaseCode: data.scheduleBaseCode };
          this.form.data = { ...this.form.data, deliveryOrderNo: data.loadingBillNo, carNumber: data.trips, containerNo: data.containerNo };
          break;
        case 'carNumber':
          this.form.data = { ...this.form.data, carNumber: data.trainNumberCode };
          break;
        case 'packageKind':
          // this.form.data = { ...this.form.data, packageKind: data.packageTypeName, packageKindCode: data.packageTypeCode };
          this.form.data = { ...this.form.data, packageKind: data.packageTypeCode };
          break;
        case 'entrustOrderNo':
          this.form.data = { ...this.form.data, dealMode: data.dealMode, customType: data.reportGateType };
          this.getEntrustOrdersGoodsList(data); //获取委托订单的商品信息
          break;
        case 'goodsName':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, ...data, orderNos: [data.entrustOrderNo],/* goodsName: data.goodsName, goodsCode: data.goodsCode, */ goodsModel: data.arrivalGoodsModel };
          break;
        case 'taxNo':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, taxNo: data.taxNo };
          break;
        case 'brand':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, brand: data.brandName, brandCode: data.brandCode };
          break;
        case 'sourceArea':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, sourceArea: data.originName, sourceAreaCode: data.originCode };
          break;
        case 'superviseTerm':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, superviseTerm: data.billName, superviseTermCode: data.billCode };
          break;
        case 'exemption':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, exemption: data.exemptionName, exemptionCode: data.exemptionCode };
          break;
        case 'superviseMode':
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, superviseMode: data.supervisionModeName, superviseModeCode: data.supervisionModeCode };
          break;
        // 计量单位
        case "unitName": {
          this.formDialog.ruleForm = { ...this.formDialog.ruleForm, unit: data.measurementCode, unitName: data.measurementUnit };
          break;
        }
      }
    },
    // 获取委托委托订单商品信息
    async getEntrustOrdersGoodsList (val) {
      this.table.tempData = [],
        this.table.pageCount = 0;
      try {
        const { data = [] } = await api.getEntrustOrdersGoodsList(val.map(item => item.entrustOrderNo));
        this.table = {
          ...this.table,
          tempData: cloneObj(data.goodsList),
          tableData: cloneObj(data.goodsList.slice(0, 10)),
          pageCount: data.goodsList.length,
          isshow: true
        };
        this.$set(this.form.data, 'totalAmount', data.cusTotalCount || 0)
      } catch (error) {
        this.$message.error('获取该委托订单的商品信息失败，请重试！')
        console.log(error)
      }
    },
    // 商品明细按钮事件
    async handlerTableBtnClick (type) {
      this.tableBtnType = type;
      /* 新增和修改是不同的操作方式 */
      if (this.status === 'add') {
        if (type === 'delete') {
          const { itemCode } = this.clickRowData,
            { tableData, tempData } = this.table,
            cb = item => item.itemCode === itemCode;
          this.utools.deleteMessage.call(this, () => {
            const TABLE_INDEX = tableData.findIndex(cb),
              TEMP_INDEX = tempData.findIndex(cb);
            ~TABLE_INDEX && this.table.tableData.splice(TABLE_INDEX, 1);
            ~TEMP_INDEX && this.table.tempData.splice(TEMP_INDEX, 1)
          })
          return;
        }
        this.tableStatusActAdd();
        // 添加计算栏位
        this.table.tableConfig = tableConfig
        this.getsolutionformula()
      } else {
        if (type !== 'delete') {
          if (type === 'add') {
            this.formDialog.ruleForm = { planOrderNo: this.form.data.planOrderNo }
          } else {
            try {
              const { data } = await api.searchOneimportcustomgoodsData(this.clickRowData.itemCode);
              this.formDialog.ruleForm = this.clickRowData = { ...data, orderNos: JSON.stringify([data.orderNo]).replace(/\[|]|"/g, '') };
            } catch (e) { console.log(e) }
          }
          this.formDialog.isshow = true;
        } else {
          this.clickTypeGoodsAsync[type]()
          // 添加计算栏位
          this.table.tableConfig = tableConfig
          this.getsolutionformula()
        }
      }
    },

    // 新增 时 表格的操作
    tableStatusActAdd () {
      this.formDialog = { ...this.formDialog, isshow: true, ruleForm: this.clickRowData }
    },
    handleTablePageChange (pageData = {}) {
      if (this.status === 'add') {
        const { tempData } = this.table,
          { pageIndex = 1, pageSize = 10 } = pageData,
          index = (pageIndex - 1) * pageSize;
        this.table.tableData = this.utools.cloneObj(tempData.slice(index, pageSize));
        return;
      }
      this.initTableData(pageData);
    },
    async handlePreserve () {
      if(this.status === 'add' && (!this.table.tempData.length)){
        this.$message({
            type: 'error',
            message: '请添加商品明细'
        })
        return 
      }
      this.isLoading = true;
      let code = 0;
      try {
        const IS_ADD = this.status === 'add';
        const data = { ...this.form.data };
        IS_ADD && (data.importCustomGoods = [], data.importCustomGoods = this.table.tempData);
        const { status } = await api.changeImportCustomOrderData({ data, method: IS_ADD ? 'POST' : 'PUT' });
        !this.form.data.status && this.$set(this.form.data, 'status', '1');
        this.status = 'update';
        code = status;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false
      }
      this.utools.alertMessage.bind(this)(code);
      this.table.isshow = true
    },
    //分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper }
      this.handleBtnClick(); //翻页查询
    },
    // 商品明细form表单保存事件
    async handlerTableFormPreservation () {
      if (this.status === 'add') {
        const { itemCode } = this.formDialog.ruleForm,
          cb = item => item.itemCode === itemCode,
          tableDataIndex = this.table.tableData.findIndex(cb),
          tempDataIndex = this.table.tempData.findIndex(cb);
        if (!~tableDataIndex) return this.$message({ type: 'warning', message: '没有该条商品！！' });
        ~tableDataIndex && (this.table.tableData[tableDataIndex] = { ...this.formDialog.ruleForm, ...this.calculateItem });
        ~tempDataIndex && (this.table.tempData[tempDataIndex] = { ...this.formDialog.ruleForm, ...this.calculateItem });
        this.$message({ type: 'success', message: '修改成功' });
        this.formDialog.isshow = false;
      } else {
        let apiUrl = this.tableBtnType == 'add' ? 'addimportcustomgoodsData' : 'editimportcustomgoodsData';
        if (JSON.stringify(this.formDialog.ruleForm) === '{}')
          return this.utools.alertMessage.bind(this)('', '请输入内容');
        let message = '';
        try {
          var { status, data } = await api[apiUrl]({ ...this.formDialog.ruleForm, planOrderNo: this.form.data.planOrderNo, ...this.calculateItem });
          this.initTableData()
        } catch (e) { console.log(e); message = e.message; }
        this.utools.alertMessage.bind(this)(status, message); if (status == 200) this.formDialog.isshow = false;
      }
    },
    handlebackspacing () {
      this.$router.push({
        path: '/M0604'
      })
    },
    async getImportCustomOrderCode () {
      try {
        const { data } = await api.getImportCustomOrderCode();
        this.$set(this.form.data, 'planOrderNo', data)
      } catch (error) {
        console.log(error)
      }
    },
    initData () {
      const { formData = {}, status, table = {} } = this.getActivePathData(this.$route.path);
      this.status = status;
      if (this.status === 'add') {
        this.table = { ...this.table, ...table, };
        table.tempData && (this.table.tableData = this.utools.cloneObj(this.table.tempData.slice(0, 10)))
        this.form.data = { ...formData };
        !this.form.data.planOrderNo && this.getImportCustomOrderCode()
      } else {
        formData && (this.form.data = { ...formData, source: '1' }),
          this.table.isshow = true,
          this.initTableData();

      }
    }
  },
  created () {
    this.initData()
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    const data = {
      data: { formData: this.form.data, status: this.status },
      path: this.$route.path,
    }
    this.status === 'add' && (data.data.table = this.table)
    this.addbreadCrumbsList(data);
    next();
  }
};
</script>
<style lang="less">
.import-custom-order-form,
.Box {
}
</style>
