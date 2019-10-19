<template>
  <div>
    <preserve-btn
      :form='form.ruleForm'
      @handlePreserve='handlePreserve'
      @handleRollback="_ => $router.push('/M0601')"
      :isLoading='isLoading'
    ></preserve-btn>

    <!-- 页签  @tab-click="handleClick"-->
    <el-tabs
      v-model="activeTabName"
      type="card"
    >
      <el-tab-pane
        v-for="item of tabsList"
        :key="item.label"
        :label="item.label"
        :name="item.name"
      />
    </el-tabs>

    <!-- 页签表单 -->
    <form-component
      :formModel='form.ruleForm'
      :formConfig='form.formConfig[activeTabName]'
      @handlerSearchClick='handleClickFormSearch'
    ></form-component>

    <!-- 表格弹窗 -->
    <table-dialog
      :itemName='tableDialog.title'
      :isShowPopover.sync='tableDialog.visible'
      :popoverList='tableDialog.list'
      :popoverListKey='tableDialog.config'
      :count='tableDialog.count'
      :activeRow.sync='tableDialog.activeRow'
      :formConfig='tableDialog.queryBarConfig.formConfig'
      :ruleForm='tableDialog.queryBarConfig.data'
      :btnObj='tableDialog.queryBarConfig.btnObj'
      @handleBtnClickType='handleTableDialogPageChange'
      @handlePageChange='handleTableDialogPageChange'
      @handlerSubPreservation='handlerTableDialogPreservation'
    ></table-dialog>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import api from "@/assets/js/appHelper.js";
import utools from '@/domain/common/utools.js'
const { cloneObj } = utools
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import TableDialog from '@/components/common/Table.Form.Dialog/TableComponent.vue'



import materielBase from '@/domain/formconfig/basicdata/MaterielBase.js'
import materielFinance from '@/domain/formconfig/basicdata/MaterielFinance.js'
import materielCustom from '@/domain/formconfig/basicdata/MaterielCustom.js'
import materielLogistics from '@/domain/formconfig/basicdata/MaterielLogistics.js'
const habndleListGroup = function (item) { return { ...item, group: this } };



import productTax from '@/domain/formconfig/basicdata/ProductTax.js'
import customsMateriel from '@/domain/formconfig/basicdata/CustomsMateriel.js'
import customsTariff from '@/domain/formconfig/basicdata/CustomsTariff.js'
import secondUnitOfMeasure from "@/domain/tableconfig/basicdata/SecondUnitOfMeasure.js";

// 物料海关的分栏集合
const materielCustomList = (() => ({
  list: [
    ...materielCustom.map(habndleListGroup, '1'),
    ...productTax.map(habndleListGroup, '2'),
    ...customsMateriel.map(habndleListGroup, '3'),
    ...customsTariff.map(habndleListGroup, '4'),
  ],
  otherConfig: {
    title: {
      '1': {
        visible: true,
        text: '物料海关'
      },
      '2': {
        visible: true,
        text: '关务客品税号'
      },
      '3': {
        visible: true,
        text: '物料税号'
      },
      '4': {
        visible: true,
        text: '关务税则'
      }
    }
  }
}))()

// tabledialog
import measurement from '@/domain/tableconfig/basicdata/Measurement'
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo'
import supervisionCondition from "@/domain/tableconfig/basicdata/SupervisionCondition.js";
import client from '@/domain/tableconfig/business/Client.js'
import exemption from '@/domain/tableconfig/basicdata/Exemption.js'
import brand from '@/domain/tableconfig/basicdata/Brand.js'
import origin from '@/domain/tableconfig/basicdata/Origin.js'
import domesticDestination from '@/domain/tableconfig/basicdata/DomesticDestination'
import deliveredGoodsPlace from "@/domain/tableconfig/basicdata/DeliveredGoodsPlace.js";
import institution from '@/domain/tableconfig/basicdata/Institution'





export default {
  name: 'MaterielBaseForm',
  components: {
    FormComponent,
    TableDialog
  },
  data: _ => {
    return {
      activeTabName: 'materielBase',
      isLoading: false,
      status: '',
      form: {
        ruleForm: {},
        formConfig: {
          materielBase: cloneObj(materielBase),
          materielFinance: cloneObj(materielFinance),
          materielCustom: cloneObj(materielCustomList),
          materielLogistics: cloneObj(materielLogistics),
        },
        searchTarget: ''
      },
      tableDialog: {
        visible: false,
        title: '',
        list: [],
        config: [],
        count: 0,
        activeRow: {},
        queryBarConfig: {
          formConfig: [],
          data: {},
          btnObj: [{ type: "search", label: "查询" }]
        }
      },
      tabsList: [
        { name: 'materielBase', label: '物料基础信息' },
        { name: 'materielFinance', label: '物料财务信息' },
        { name: 'materielCustom', label: '物料海关信息' },
        { name: 'materielLogistics', label: '物料物流信息' },
        /*  { name: 'productTax', label: '关务客品税号' },
         { name: 'customsMateriel', label: '物料税号表' },
         { name: 'customsTariff', label: '关务税则表' } */
      ]
    }  },

  created () {
    const { formData = {}, status } = this.getActivePathData(this.$route.path), IS_ADD = status === 'add';
    formData && (this.form.ruleForm = formData);
    IS_ADD && !formData.materielCode && this.getBillsCode(); // 获取单据编号
    this.status = status;
    // 修改状态是获取单据数据
    !IS_ADD && Object.keys(formData).length === 1 && formData.materielCode && this.getBillsData();
  },

  computed: {
    ...mapGetters(['getActivePathData']),
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),

    async getBillsData () {
      try {
        const { data } = await api.getMaterielbaseData(this.form.ruleForm.materielCode);
        this.$set(this.form, 'ruleForm', data)
      } catch (error) {
        console.log(error)
      }
    },

    // 保存单据
    async handlePreserve () {
      let sCode = 200;
      this.isLoading = true;
      try {
        const { data } = await api.changeMaterielBaseData(this.form.ruleForm, this.status === 'add' ? 'POST' : 'PUT');
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.isLoading = false;
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '保存成功！' : '保存失败，请重试！'
        })
      }
    },

    // 获取单据编号
    async getBillsCode () {
      try {
        const { data } = await api.getMaterielBaseCode();
        this.$set(this.form.ruleForm, 'materielCode', data);
      } catch (error) {
        this.$message.error('获取单据编号失败，请重试！')
        console.log(error)
      }
    },

    // 表单弹窗search按钮点击
    handleClickFormSearch (target) {
      this.form.searchTarget = target;
      this.setTableDialog(target);
      this.getTableDialogPageData();
    },

    // 设置表格弹窗
    setTableDialog (target) {
      const mCode = 'measurementCode',
        moduleBind = {
          measurementUnitName: mCode,
          accContactName: 'employeeInfoCode',
          superConditionName: 'billCode',
          custFirstUnitName: mCode,
          custSecondUnitName: mCode,
          clientName: 'clientNo',
          lengthUnitName: mCode,
          weightUnitName: mCode,
          volumeUnitName: mCode,
          exemptionName: 'exemptionCode',
          brandName: 'brandCode',
          originName: 'originCode',
          originCountryName: 'originCode',
          domesticDestinationName: 'domesticDestinationCode',
          goodsPlaceName: 'goodsPlaceCode',
          inspectionNo: 'institutionCode',
          finalCountryName: 'originCode'
        }[target],
        queryBarConfig = { formConfig: [{ moduleBind, label: '编码', isInput: true }], data: {}, btnObj: this.tableDialog.queryBarConfig.btnObj };
      this.tableDialog = {
        ...this.tableDialog,
        visible: true,
        list: [],
        count: 0,
        ...{
          measurementUnitName: {
            title: '计量单位', config: measurement
          },
          customsUnitName: { title: '海关法定计量单位', config: measurement },
          accContactName: { title: '会计联系人', config: employeeInfo },
          superConditionName: { title: '监管条件', config: supervisionCondition },
          lengthUnitName: { title: '长度单位', config: measurement },
          weightUnitName: { title: '重量单位', config: measurement },
          volumeUnitName: { title: '体积单位', config: measurement },
          clientName: { title: '委托方', config: client },
          secondUnitName: { title: '第二计量单位', config: [] },
          custFirstUnitName: { title: '第一计量单位', config: measurement },
          custSecondUnitName: { title: '第二计量单位', config: secondUnitOfMeasure },
          exemptionName: { title: '征免性质', config: exemption },
          brandName: { title: '品牌', config: brand },
          originName: { title: '原产国', config: origin },
          originCountryName: { title: '原产国', config: origin },
          domesticDestinationName: { title: '境内目的地', config: domesticDestination },
          goodsPlaceName: { title: '境内货源地', config: deliveredGoodsPlace },
          inspectionNo: { title: '检验检疫机关', config: institution },
          finalCountryName: { title: '最终目的地', config: origin }
        }[target]
      };
      this.tableDialog.queryBarConfig = queryBarConfig
    },

    // 获取表格弹窗的分页数据
    getTableDialogPageData: (() => {
      const {
        getMeasurement: measurement,
        queryemployeeinfoSearch,
        getSupervisionConditionList,
        queryclientSearch,
        getSecondMeasurementPageData,
        getExemptionList,
        getBrandList,
        getOriginList,
        querydomesticdestinationSearch,
        getDeliveredGoodsPlaceList,
        queryinstitutionSearch
      } = api;

      let config = {
        measurementUnitName: measurement,
        customsUnitName: measurement,
        accContactName: queryemployeeinfoSearch,
        superConditionName: getSupervisionConditionList,
        lengthUnitName: measurement,
        weightUnitName: measurement,
        volumeUnitName: measurement,
        clientName: queryclientSearch,
        secondUnitName: new Function(),
        custFirstUnitName: measurement,
        custSecondUnitName: getSecondMeasurementPageData,
        exemptionName: getExemptionList,
        brandName: getBrandList,
        originName: getOriginList,
        originCountryName: getOriginList,
        domesticDestinationName: querydomesticdestinationSearch,
        goodsPlaceName: getDeliveredGoodsPlaceList,
        inspectionNo: queryinstitutionSearch,
        finalCountryName: getOriginList
      };
      return async function () {
        const WHITE = [
          'brandName', 'originName', 'originCountryName', 'domesticDestinationName', 'goodsPlaceName', 'measurementUnitName', 'accContactName', 'superConditionName',
          'custFirstUnitName', 'custSecondUnitName', 'lengthUnitName', 'weightUnitName', 'volumeUnitName', 'inspectionNo', 'finalCountryName'
        ], TARGET = this.form.searchTarget;
        try {
          let param = typeof arguments[0] === 'string' ? {} : arguments[0]; // 防止是别的类型

          const { data: { list, count } } = await config[TARGET].call(api, {
            ...param,
            ...this.tableDialog.queryBarConfig.data,
            status: WHITE.includes(TARGET) ? '2' : ''
          });
          this.tableDialog.list = list, this.tableDialog.count = count;
        } catch (error) {
          this.$message.error('获取数据失败，请重试！')
          console.log(error)
        }
      }
    })(),

    // 表格弹窗点击确定
    handlerTableDialogPreservation (data = {}) {
      const {
        measurementCode, measurementUnit,
        employeeInfoCode, employeeInfoName, position,
        billCode, billName,
        clientNo, clientName,
        exemptionCode, exemptionName,
        brandCode, brandName, brandAbb, description: brandDes,
        originCode, originName, originAbb, description: originDes,
        domesticDestinationCode, domesticDestinationName,
        goodsPlaceName, goodsPlaceCode,
        institutionCode, institutionName
      } = data;
      let activeData = {
        measurementUnitName: { measurementUnit: measurementCode, measurementUnitName: measurementUnit },
        customsUnitName: { customsUnit: measurementCode, customsUnitName: measurementUnit },
        accContactName: { accContact: employeeInfoCode, accContactName: employeeInfoName, resign: position },
        superConditionName: { superCondition: billCode, superConditionName: billName },
        lengthUnitName: { lengthUnit: measurementCode, lengthUnitName: measurementUnit },
        weightUnitName: { weightUnit: measurementCode, weightUnitName: measurementUnit },
        volumeUnitName: { volumeUnit: measurementCode, volumeUnitName: measurementUnit },
        clientName: { clientNo, clientName },
        secondUnitName: {},
        custFirstUnitName: { custFirstUnit: measurementCode, custFirstUnitName: measurementUnit },
        custSecondUnitName: { custSecondUnit: measurementCode, custSecondUnitName: measurementUnit },
        exemptionName: { exemption: exemptionCode, exemptionName: exemptionName },
        brandName: { brandCode, brandName, brandAbb, brandDes },
        originName: { originCode, originName, originAbb, originDes },
        originCountryName: { originCountryName: originName, originCountry: originCode },
        domesticDestinationName: { domesticDestinationName, domesticDestination: domesticDestinationCode },
        goodsPlaceName: { goodsPlaceName, goodsPlace: goodsPlaceCode },
        inspectionNo: { inspectionNo: institutionCode, inspectionName: institutionName },
        finalCountryName: { finalCountryName: originName, finalCountry: originCode }
      }[this.form.searchTarget];

      for (let key in activeData) {
        if (!activeData.hasOwnProperty(key)) return;
        this.$set(this.form.ruleForm, key, activeData[key])
      }
    },

    // 表格弹窗的分页事件
    handleTableDialogPageChange (pageData) {
      this.getTableDialogPageData(pageData)
    }
  },

  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.form.ruleForm, status: this.status },
      path: this.$route.path,
    });
    next();
  }
}
</script>