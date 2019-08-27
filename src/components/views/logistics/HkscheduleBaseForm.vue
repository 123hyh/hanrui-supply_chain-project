<template>
  <div class="AddCreditBox Hkschedule-base-form">
    <!-- 保存 返回 按钮 -->
    <div class="btnBottom">
      <preserve-btn
        :form='domainMap.HkscheduleBaseEntity'
        @handlePreserve="handlePreserve"
        @handleRollback="handleRollback"
        :isLoading="isLoading"
      ></preserve-btn>
    </div>
    <!-- tab -->
    <div>
      <el-tabs
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          label="基本信息"
          name="HkscheduleBase"
        ></el-tab-pane>
        <el-tab-pane
          label="相关信息"
          name="HkscheduleRele"
          :disabled="tabIsDisable"
        ></el-tab-pane>
        <el-tab-pane
          label="核对信息"
          name="HkschedulCheckingInfo"
          :disabled="tabIsDisable"
        ></el-tab-pane>
        <!-- 输入框 -->
        <div class="handleTableHeight">
          <form-template
            :entity="columnData"
            :formConfig="columnDataKey"
          >
          </form-template>
        </div>
      </el-tabs>
    </div>
    <div v-if="!tabIsDisable">
      
      <!-- 分割条 -->
      <div class="cut-off-rule">香港收货入库</div>

      <el-button  @click="handlerFormConfigClickSearch()">新增</el-button>
      <el-button  @click="delectrow()">删除</el-button>

      <table-component
        :isSubTable='true'
        :tableData="table.tableData"
        :tableDataKey="table.tableConfig"
        :isShowTabTable="true"
        :tabName="1"
        @TableClickRowData="TableClickRowData"
      ></table-component>

      <pagination-component
        :count="table.pageCount"
        @handlePageChange="handleTablePageChange"
      ></pagination-component>

      <!-- 表格弹窗 -->
    <popover-components
      :popoverType="tableDialog.popoverType"
      :itemName='tableDialog.title'
      :formConfig='tableDialog.queryBarObj'
      :btnObj='tableDialog.btnObj'
      :isShowPopover.sync="tableDialog.isshow"
      :popoverList='tableDialog.data'
      :popoverListKey='tableDialog.tableDialogConfig'
      :ruleForm='tableDialog.ruleForm'
      :count='tableDialog.count'
      @handleBtnClickType="dialoghandleBtnClick"
      @changeisShowPopover="closeTableDialog"
      @handlerSubPreservation="tableDialogPreservation"
      @handlePageChange="handlePageChange"
    ></popover-components>

    </div>
  </div>
</template>
<script>
import api from "@/assets/js/appHelper.js"
import utools from '@/domain/common/utools.js'
// 引入公共的table组件
import TabTable from "@/components/common/TabTable.vue"
import FormTemplate from "@/components/common/form/index"
//基本信息
import HkscheduleBaseEntity from "@/domain/entities/logistics/HkscheduleBase"
import HkscheduleBaseForm from "@/domain/formconfig/logistics/HkscheduleBase"
//相关信息
import HkscheduleReleEntity from "@/domain/entities/logistics/HkscheduleRele"
import HkscheduleReleForm from "@/domain/formconfig/logistics/HkscheduleRele"
//核对信息
import HkschedulCheckingInfoEntity from "@/domain/entities/logistics/HkschedulCheckingInfo"
import HkschedulCheckingInfoForm from "@/domain/formconfig/logistics/HkschedulCheckingInfo"

import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import PaginationComponent from "@/components/common/Pagination.vue";
import PopoverComponents from '@/components/common/Table.Form.Dialog/TableComponent.vue'
// 子表
import tableConfig from '@/domain/tableconfig/custom/ImportCustomGoods';
// 多选
import tableDialogConfig from '@/domain/tableconfig/logistics/GodownEntry.js'

import { mapMutations, mapGetters } from 'vuex'

const selectKey = [{
  label: 'itemValue',
  value: 'itemKey'
}]
let ColumnData = ''
export default {
  name: "HkscheduleBaseForm",
  components: {
    Popover: () => import("@/components/common/Popover.vue"),
    TabTable,
    FormTemplate,
    TableComponent,
    PaginationComponent,
    PopoverComponents
  },
  data () {
    return {
      tabIsDisable: true,
      status: '',
      isLoading: false,
      routeCode: "",
      domainMap: {
        "HkscheduleBaseEntity": {},
        "HkscheduleReleEntity": {},
        "HkschedulCheckingInfoEntity": {},
      },
      // tab菜单切换控制
      tabActiveName: "HkscheduleBase",
      // 新增form
      columnData: {},
      columnDataKey: [],
      /*************弹窗data 组件参数 *****************/
      isShowPopover: false, // 弹出框
      itemName: '香港上货计划单',
      // querybar
      apiKey: '',
      queryPopForm: {
        pageIndex: 1,
        pageSize: 10
      },
      searchFormConfig: [],
      // table
      popoverList: [], // 弹出框需要的数据
      popoverListKey: [], // 弹出框表头显示列的key值
      currencySelectInputKey: "", // 当前选中数据对应的输入框
      /************* 弹窗data end *****************/
      table: {
        isshow: false,
        tableData: [],
        tableConfig,
        pageCount: 0,
        tempData: []
      },
      clickRowData:{},
      tableDialog: {
        popoverType: 'selectTable',
        isshow: false,
        ruleForm: {},
        count: 0,
        title: '香港收货入库',
        queryBarObj: [{ label: "编码", moduleBind: "companyCode", isInput: true }], // 弹出框查询栏
        btnObj: [{ type: "search", label: "查询" }], // 查询栏按钮
        data: [],
        tableDialogConfig
      },
    }
  },
  computed: {
    ...mapGetters(['getActivePathData']),
    statuscop () {
      return this.columnData.status
    }
  },
  created () {
    this.routeCode = this.$route.query.scheduleBaseCode
    this.getHkschedulebase().then(_ => {
      this.handlerTabClick({ name: 'HkscheduleBase' })
      api.initSelect(this.columnDataKey)
    })
    {
      this.status === 'update' &&
        !utools.judgeNullObj(this.domainMap.HkscheduleReleEntity) &&
        !utools.judgeNullObj(this.domainMap.HkschedulCheckingInfoEntity) && (
          this.getHkschedulerele(),
          this.getHkschedulcheckinginfo()
        )
    }
  },
  watch: {
    tabActiveName (cur, pre) {
    }
  },
  methods: {
    ...mapMutations([
      'addbreadCrumbsList'
    ]),
    async handleTablePageChange (pageData = {}) {
      try {
        const { data: { list, count } } = await api.queryimportcustomgoodsSearch({ ...page, planOrderNo: this.form.data.planOrderNo });
        this.table = { ...this.table, tableData: list, pageCount: count };
      } catch (error) {
        console.log(error)
      }
    },
    async getHkschedulebase () {
      const { formData: {
        HkscheduleBaseEntity: HkscheduleBaseEntitys,
        HkscheduleReleEntity,
        HkschedulCheckingInfoEntity
      }, status } = this.getActivePathData(this.$route.path);
      this.status = status;
      status === 'update' && (this.tabIsDisable = false);
      if (HkscheduleBaseEntitys) {
        this.domainMap = { HkscheduleBaseEntity: HkscheduleBaseEntitys, HkscheduleReleEntity, HkschedulCheckingInfoEntity }
        this.routeCode = HkscheduleBaseEntitys.scheduleBaseCode
      } else {
        this.domainMap.HkscheduleBaseEntity = new HkscheduleBaseEntity()
      }
      if (status === 'add') {
        let { data } = await api.getCommonCodeNo("HKJH");
        this.domainMap.HkscheduleBaseEntity.scheduleBaseCode = data
      }
      return
    },
    async getHkschedulerele () {
      if (this.routeCode) {
        let { data } = await api.getHkschedulerele(this.routeCode)
        this.domainMap.HkscheduleReleEntity = data || new HkscheduleReleEntity()
      } else {
        this.domainMap.HkscheduleReleEntity = new HkscheduleReleEntity()
      }
    },
    async getHkschedulcheckinginfo () {
      if (this.routeCode) {
        let { data } = await api.getHkschedulcheckinginfo(this.routeCode)
        this.domainMap.HkschedulCheckingInfoEntity = data || new HkschedulCheckingInfoEntity()
      } else {
        this.domainMap.HkschedulCheckingInfoEntity = new HkschedulCheckingInfoEntity()
      }
    },
    //保存-基本信息
    async saveHkschedulebase () {
      if (this.status === 'add') {
        return api.addHkschedulebase(this.columnData)
      }
      return api.updateHkschedulebase(this.columnData)
    },
    //保存-相关信息
    saveHkschedulerele () {
      if (this.columnData.scheduleBaseCode) {
        return api.updateHkschedulerele(this.columnData)
      } else {
        this.columnData.scheduleBaseCode = this.domainMap.HkscheduleBaseEntity.scheduleBaseCode
        return api.addHkschedulerele(this.columnData)
      }
    },
    //保存-核对信息
    saveHkschedulcheckinginfo () {
      /* if (this.columnData.scheduleBaseCode) {
        return api.updateHkschedulcheckinginfo({ ...this.columnData, scheduleBaseCode: this.domainMap.HkscheduleBaseEntity.scheduleBaseCode })
      } else {
        this.columnData.scheduleBaseCode = this.domainMap.HkscheduleBaseEntity.scheduleBaseCode
        return api.addHkschedulcheckinginfo(this.columnData)
      } */
      if (!this.domainMap.HkscheduleBaseEntity.scheduleBaseCode) {
        utools.alertMessage.call(this, 0, '单据编号不能为空');
        return
      };
      return api.addHkschedulcheckinginfo({
        ...this.columnData,
        scheduleBaseCode: this.domainMap.HkscheduleBaseEntity.scheduleBaseCode
      })
    },
    //保存主表单
    async handlePreserve () {
      let Scode = 0;
      try {
        this.isLoading = true
        let fn
        switch (this.tabActiveName) {
          case "HkscheduleBase":
            fn = this.saveHkschedulebase
            break
          case "HkscheduleRele":
            fn = this.saveHkschedulerele
            break
          case "HkschedulCheckingInfo":
            fn = this.saveHkschedulcheckinginfo
        }
        const { data, status } = await fn();
        this.status = 'update', this.tabIsDisable = false;
        Scode = status;
        if (data) {
          if (this.tabActiveName === 'HkscheduleBase') {
            this.domainMap.HkscheduleBaseEntity = { ...this.domainMap.HkscheduleBaseEntity, status: '1' }
          }
          this.tabActiveName === 'HkscheduleBase' && this.status === 'add' && (this.tabIsDisable = false)
          this.$message({ type: 'success', message: '保存成功!' })
        } else {
          this.$message.error('保存失败!')
        }
        /* promis.then(data => {
          this.isLoading = false

        }); */
      } catch (error) {
        console.log(error)
      } finally {
        utools.alertMessage.call(this, Scode, '保存失败')
        this.isLoading = false
      }
    },
    //tab切换
    handlerTabClick ({ name }) {
      switch (this.tabActiveName) {
        case "HkscheduleBase":
          this.columnData = this.domainMap.HkscheduleBaseEntity
          this.columnDataKey = HkscheduleBaseForm
          break
        case "HkscheduleRele":
          this.columnData = this.domainMap.HkscheduleReleEntity
          this.columnDataKey = HkscheduleReleForm
          break
        case "HkschedulCheckingInfo":
          this.columnData = this.domainMap.HkschedulCheckingInfoEntity
          this.columnDataKey = HkschedulCheckingInfoForm
          break
      }
    },
    handleRollback () {
      this.$router.push('M0504')
    },
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick: (() => {
      var obj = null
      return function (type, clear) {
        console.log(type, clear)
        if (clear) {
          obj = null
        } else {
          !obj && (obj = this.handleBtnClickObj())
          obj[type].bind(this)()
        }
      }
    })(),
    handleBtnClickObj () {
      return {
        search: async () => {
          try {
            var { data: { count, list } } = await api.querySearch(this.apiKey, this.queryPopForm)
            this.queryPopForm.total = count
            this.popoverList = list
          } catch (e) {
            console.log(e)
          }
          // 清空查询数据
          this.searchFormConfig.map((e, i) => {
            if (this.queryPopForm[e.moduleBind])
              this.queryPopForm[e.moduleBind] = ''
          })
        },
      }
    },
    //选中数据
    handlerSubPreservation (rowData, key) {
      if (this.columnData[key] != undefined) {
        this.columnData[key] = rowData[key]
      }
    },
    rousePopover (type, is, currencySelectInputKey) {
      this.searchFormConfig = []
      if (this.columnData[type] != undefined) {
        if (type == "trips") {
          this.searchFormConfig.push({ label: '车次编号', moduleBind: "trainNo", isInput: true })
          this.apiKey = '/trainnumber'
          this.itemName = '车次'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "trainNumberCode", name: "单据编码" },
            { key: "trainNumberName", name: "车次名称" },
            { key: "trainNo", name: "车次编号" },
          ]
        } else if (type == "startWarehouse") {
          this.searchFormConfig.push({ label: '仓库编码', moduleBind: "warehouseCode", isInput: true })
          this.apiKey = '/warehouse'
          this.itemName = '起运地'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "warehouseCode", name: "仓库编码" },
            { key: "warehouseName", name: "仓库名称" },
            { key: "warehouseGroup", name: "仓库组织" },
            { key: "warehouseStatus", name: "状态" },
            { key: "address", name: "仓库地址" },
          ]
        } else if (type == "carrier") {
          this.searchFormConfig.push({ label: '编码', moduleBind: "customerNo", isInput: true })
          this.apiKey = '/carrierbase'
          this.itemName = '承运商'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "carrierCode", name: "承运商编码" },
            { key: "carrierName", name: "承运商中文名称" },
            { key: "carrierForeignName", name: "承运商外文名称" },
            { key: "carrierAddress", name: "详细地址" },
            { key: "representative", name: "法人代表" },
          ]
        } else if (type == "endWarehouse") {
          this.searchFormConfig.push({ label: '仓库编码', moduleBind: "warehouseCode", isInput: true })
          this.apiKey = '/warehouse'
          this.itemName = '目的地'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "warehouseCode", name: "仓库编码" },
            { key: "warehouseName", name: "仓库名称" },
            { key: "warehouseGroup", name: "仓库组织" },
            { key: "warehouseStatus", name: "状态" },
            { key: "address", name: "仓库地址" },
          ]
        } else if (type == "platesNo") {
          this.searchFormConfig.push({ label: '车辆信息编码', moduleBind: "vehicleInfoCode", isInput: true })
          this.apiKey = '/vehicleinfo'
          this.itemName = '车牌号'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "vehicleInfoCode", name: "车辆信息编码" },
            { key: "vehicleNo", name: "车牌号" },
            { key: "carType", name: "车型" },
            { key: "load", name: "载重" },
            { key: "pachageNo", name: "可载件数" },
          ]
        } else if (type == "containerCode") {
          this.searchFormConfig.push({ label: '编码', moduleBind: "containerCode", isInput: true })
          this.apiKey = '/container'
          this.itemName = '集装箱代码'
          this.popoverListKey = [
            // 设置表格的表头
            { key: "containerCode", name: "集装箱编码" },
            { key: "containerName", name: "名称" },
            { key: "containerAbb", name: "简称" },
            { key: "containerSpecification", name: "集装箱规格" },
            { key: "description", name: "描述" },
          ]
        }
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [type]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.apiKey, this.queryPopForm)
            this.queryPopForm.total = count
            this.popoverList = list
          } catch (error) {
            console.log(error)
          }
        },
      }
      this.currencySelectInputKey = type // 设置当前点击输入框key
      type && currencyObj[type]()
      this.isShowPopover = !this.isShowPopover
    },
    //分页
    handlePageChange (paper) {
      this.queryPopForm.pageIndex = paper.pageIndex
      this.queryPopForm.pageSize = paper.pageSize
      this.handleBtnClick('search') //翻页查询
    },
    /************************** 弹窗methods end *******************/

    // 分页查询香港入库单
    async handlerFormConfigClickSearch () {
      try {
        const { data: { list, count } } = await api.queryGodownentry(this.tableDialog.ruleForm);
        this.tableDialog = { ...this.tableDialog, data: list, count: count, isshow: true }
      } catch (error) {
        this.utools.alertMessage.bind(this)('', '获取数据失败, 请重试')
        console.log(error)
      }
    },
    // 点击查询栏按钮事件
    dialoghandleBtnClick () {
      this.handlerFormConfigClickSearch()
    },
    //分页
    handlePageChange (paper) {
      this.tableDialog.ruleForm = { ...this.tableDialog.ruleForm, ...paper }
      this.dialoghandleBtnClick(); //翻页查询
    },
    // 列表弹窗确认事件
    async tableDialogPreservation (val) {

      for (let i = 0; i < val.length; i++) {
        try {
          // 通过收货入库中的收货登记单号查询委托单 
          // const { delegete } = await api.searchOnehkreceiveregisterData(val[i].delegeteBillNo);
          // if(delegete){
          //   console.log(delegete)
          // }
          //  添加接口
          const { data = [] } = await api.getEntrustOrdersGoodsList(data.map(item => item.entrustOrderNo));
          
        } catch (error) {
          this.$message.error('获取该委托订单的商品信息失败，请重试！')
          console.log(error)
        }
      }
      this.closeTableDialog()
    },
    closeTableDialog () {
      if (!this.tableDialog.isshow) return;
      this.tableDialog.isshow = !this.tableDialog.isshow;
    },
    // 选中商品明细单行
    TableClickRowData (data) {
      this.clickRowData = data;
    },
    // 删除
    async delectrow(){
      try {
          //  删除
          await api.searchOnehkreceiveregisterData(this.clickRowData.bill);
          this.$message.error('删除成功！')
        } catch (error) {
          this.$message.error('删除失败！')
          console.log(error)
        }
    }

  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.domainMap, status: this.status },
      path: this.$route.path,
    });
    next();
  },
}
</script>
<style lang="less">
.Hkschedule-base-form,
.AddCreditBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .form-layout {
    > div {
      flex-basis: 20vw;
    }
  }
  .btnBottom {
    margin-bottom: 10px;
  }
  .el-form-item__label {
    white-space: nowrap;
  }
}
</style>
