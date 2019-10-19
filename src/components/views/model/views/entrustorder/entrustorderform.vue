<template>
  <div class="mystyle">
    <!-- <el-page-header @back="goBack" content="委托订单列表" class="header"></el-page-header> -->
    <!-- 导出提示选择 -->
    <el-dialog
      :visible.sync="downFileDialog.visible"
      center
      style="text-align:center"
      title="选择下载类型"
      v-dialogDrag
      width="255px"
    >
      <el-radio-group v-model="downFileDialog.data.type">
        <el-radio label="entrustOrder">委托订单</el-radio>
        <el-radio label="paymentNotification">付款通知单</el-radio>
      </el-radio-group>
      <span class="dialog-footer" slot="footer">
        <el-button @click="downFileDialog.visible = false">取 消</el-button>
        <el-button @click="handleExport" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 操作按钮 -->
    <preserve-btn
      :beforeSubmitCb="beforeSubmitCb"
      :form="data"
      :isLoading="loading"
      @handleExport="()=> {
        downFileDialog.visible = true; 
        downFileDialog.data.type=''
        }"
      @handlePreserve="operation('save')"
      @handleRollback="goBack"
    ></preserve-btn>
    <data-form
      :configs.sync="configs"
      :data.sync="data"
      :operationConfigs="optionConfigs"
      @handlerOperation="operation"
      @handlerPointSelection="pointSelection"
      ref="mainform"
      v-loading="loading"
    >
      <template v-slot>
        <div class="formHead">{{formHead}}</div>
      </template>
    </data-form>
    <el-tabs v-if="tabIsDisabled" v-model="activeName">
      <el-tab-pane label="商品信息" name="goods">
        <div class="operationDiv" v-if="isClassifyJurisdiction">
          <el-button @click="childOperationGood('cation')" size="small" type="primary">修改</el-button>
        </div>
        <data-table
          :configs.sync="goods.configs"
          :count.sync="goods.count"
          :data.sync="goods.data"
          :noneRules="true"
          :operationConfigs="goods.optionConfigs"
          :ruleData.sync="goods.ruleData"
          @handlerCellDblclick="cellDblclick"
          @handlerCurrentSelected="childCurrentSelected"
          @handlerOperation="childOperationGood"
          @handlerRuleChange="childRuleChange"
          v-loading="goods.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane
        label="报关信息"
        name="custom"
        v-if="data.entrustOrderType == '1' || data.entrustOrderType == '2'"
      >
        <data-form
          :configs="customConfigsFormfile"
          :data.sync="custom.data"
          :operationConfigs="custom.optionConfigs"
          @handlerOperation="childFormOperation"
          @handlerPointSelection="childPointSelection"
          ref="customform"
          v-loading="custom.loading"
        ></data-form>
      </el-tab-pane>
      <el-tab-pane label="买方接货信息" name="buyer">
        <data-table
          :configs.sync="buyer.configs"
          :count.sync="buyer.count"
          :data.sync="buyer.data"
          :noneRules="true"
          :operationConfigs="buyer.optionConfigs"
          :ruleData.sync="buyer.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="buyer.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="卖方交货信息" name="seller">
        <data-table
          :configs.sync="seller.configs"
          :count.sync="seller.count"
          :data.sync="seller.data"
          :noneRules="true"
          :operationConfigs="seller.optionConfigs"
          :ruleData.sync="seller.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="seller.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="受托方收款" name="trusteereceipt">
        <data-table
          :configs.sync="trusteereceipt.configs"
          :count.sync="trusteereceipt.count"
          :data.sync="trusteereceipt.data"
          :noneRules="true"
          :operationConfigs="trusteereceipt.optionConfigs"
          :ruleData.sync="trusteereceipt.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="trusteereceipt.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="受托方付款" name="trusteepanyment">
        <data-table
          :configs.sync="trusteepanyment.configs"
          :count.sync="trusteepanyment.count"
          :data.sync="trusteepanyment.data"
          :noneRules="true"
          :operationConfigs="trusteepanyment.optionConfigs"
          :ruleData.sync="trusteepanyment.ruleData"
          @handlerCurrentSelected="childCurrentSelected"
          @handlerOperation="childOperationTrusteepanyment"
          @handlerRuleChange="childRuleChange"
          v-loading="trusteepanyment.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="收货信息" name="receive">
        <data-table
          :configs.sync="receive.configs"
          :count.sync="receive.count"
          :data.sync="receive.data"
          :noneRules="true"
          :operationConfigs="receive.optionConfigs"
          :ruleData.sync="receive.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="receive.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="转款信息" name="transfer">
        <data-table
          :configs.sync="transfer.configs"
          :count.sync="transfer.count"
          :data.sync="transfer.data"
          :noneRules="true"
          :operationConfigs="transfer.optionConfigs"
          :ruleData.sync="transfer.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="transfer.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="付款信息" name="panyment">
        <data-table
          :configs.sync="panyment.configs"
          :count.sync="panyment.count"
          :data.sync="panyment.data"
          :noneRules="true"
          :operationConfigs="panyment.optionConfigs"
          :ruleData.sync="panyment.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="panyment.loading"
        ></data-table>
      </el-tab-pane>
      <el-tab-pane label="收货与报关明细" name="detail">
        <data-table
          :configs.sync="detail.configs"
          :count.sync="detail.count"
          :data.sync="detail.data"
          :noneRules="true"
          :operationConfigs="detail.optionConfigs"
          :ruleData.sync="detail.ruleData"
          @handlerRuleChange="childRuleChange"
          v-loading="detail.loading"
        ></data-table>
      </el-tab-pane>
    </el-tabs>
    <!--统计--->
    <el-divider content-position="left" v-if="tabIsDisabled">统计</el-divider>
    <data-table
      :configs.sync="goodsAll.statisticsConfigs"
      :count="1"
      :data.sync="goodsAll.statisticsData"
      :ruleData="{}"
      v-if="tabIsDisabled"
      v-loading="goodsAll.statisticsloading"
    ></data-table>
    <data-form
      :configs.sync="configsOthor"
      :data.sync="data"
      @handlerPointSelection="pointSelection"
      ref="othorform"
      v-if="tabIsDisabled"
      v-loading="loading"
    ></data-form>
    <!--弹窗--->
    <data-table-dialog
      :configs.sync="tableDialog.configs"
      :count.sync="tableDialog.count"
      :data.sync="tableDialog.data"
      :loading="tableDialog.loading"
      :operationConfigs="tableDialog.optionConfigs"
      :ruleConfigs.sync="tableDialog.ruleConfigs"
      :ruleData.sync="tableDialog.ruleData"
      :title.sync="tableDialog.title"
      :visible.sync="tableDialog.visible"
      @handlerCurrentSelected="tableDialogcurrentSelected"
      @handlerOperation="tableDialogOperation"
      @handlerRuleChange="tableDialogRuleChange"
      @handlerRuleEvent="tableDialogRuleEvent"
      v-dialogDrag
    ></data-table-dialog>
    <!-- 商品信息表单弹窗 -->
    <data-form-dialog
      :configs="goodsConfigsFormfile"
      :data.sync="goodsformDialog.data"
      :loading="goodsformDialog.loading"
      :operationConfigs.sync="goodsformDialog.optionConfigs"
      :title.sync="goodsformDialog.title"
      :visible.sync="goodsformDialog.visible"
      @handlerButtonClick="fromDialogPointSelectionGoods"
      @handlerOperation="fromDialogOperationGood"
      @handlerPointSelection="fromDialogPointSelectionGoods"
      ref="goodsform"
      v-dialogDrag
    ></data-form-dialog>
    <data-form-dialog
      :configs.sync="trusteepanymentformDialog.configs"
      :data.sync="trusteepanymentformDialog.data"
      :loading="trusteepanymentformDialog.loading"
      :operationConfigs.sync="trusteepanymentformDialog.optionConfigs"
      :title.sync="trusteepanymentformDialog.title"
      :visible.sync="trusteepanymentformDialog.visible"
      @handlerOperation="fromDialogOperationTrusteepanyment"
      @handlerPointSelection="fromDialogPointSelectionTrusteepanyment"
      ref="trusteepanymentform"
      v-dialogDrag
    ></data-form-dialog>
    <data-form-dialog
      :configs.sync="classification.configs"
      :data.sync="classification.data"
      :loading="classification.loading"
      :operationConfigs.sync="classification.optionConfigs"
      :title.sync="classification.title"
      :visible.sync="classification.visible"
      @handlerOperation="fromDialogOperationClassification"
      ref="classification"
      v-dialogDrag
    ></data-form-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import DataForm from '../../components/Model/dataForm.vue'
import optionConfigs from './opform'
import configs from './form'
import configsOthor from './formothor'
import utils from '../../util/config'
import api from '../../api'
import dialogDataUtil from './dialogDataUtil'
// 表格
import DataTable from '../../components/Model/dataTable.vue'
import childoptionConfigs from './optable'
import goodsConfigsTable from './goodsTable'
import statisticsConfigsTable from './statisticsTable'
import buyerConfigs from './buyerTable'
import sellerConfigs from './sellerTable'
import trusteereceiptConfigs from './trusteereceiptTable'
import trusteepanymentConfigs from './trusteepanymentTable'
import receiveConfigs from './receiveTable'
import transferConfigs from './transferTable'
import panymentConfigs from './panymentTable'
import detailConfigs from './detailTable'
// 表单
import customConfigsForm from './customForm'
import customImportedConfigsForm from './customForm/customForm-Imported'
import customExitConfigsForm from './customForm/customForm-Exit'
// 弹窗表单
import DataFormDialog from '../../components/Model/dataFormDialog.vue'
import DataTableDialog from '../../components/Model/dataTableDialog.vue'
import childoptionDialog from './opformDialog'
import goodsConfigsForm from './goodsForm'
import goodsImportedConfigsForm from './goodsForm/goodsForm-Imported'
import goodsExitConfigsForm from './goodsForm/goodsForm-Exit'
import goodsDomesticConfigsForm from './goodsForm/goodsForm-Domestic'
import trusteepanymentConfigsForm from './trusteepanymentForm'
import classificationConfigsForm from './classificationForm'

export default {
  components: {
    DataForm,
    DataTable,
    DataFormDialog,
    DataTableDialog
  },
  data: () => ({
    // 主表
    loading: false,
    optionConfigs: [],
    data: {},
    configs: JSON.parse(JSON.stringify(configs)),
    configsOthor: JSON.parse(JSON.stringify(configsOthor)),
    // tabs栏
    activeName: 'goods',
    goods: {
      loading: false,
      optionConfigs: [
        { label: '增加', event: 'add', type: 'primary' },
        { label: '修改', event: 'upd', type: 'primary' },
        { label: '删除', event: 'del', type: 'danger' },
        { label: '导入', event: 'import', type: 'primary' },
        { label: '导出', event: 'export', type: 'primary' }
      ],
      ruleData: {},
      data: [],
      count: 0,
      configs: goodsConfigsTable,
      currentRow: ''
    },
    custom: {
      loading: false,
      optionConfigs: [{ label: '保存', event: 'save', type: 'primary' }],
      data: {},
      configs: customConfigsForm,
      configsImported: JSON.parse(JSON.stringify(customImportedConfigsForm)),
      configsExit: JSON.parse(JSON.stringify(customExitConfigsForm))
    },
    buyer: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: buyerConfigs,
      currentRow: ''
    },
    seller: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: sellerConfigs,
      currentRow: ''
    },
    trusteereceipt: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: trusteereceiptConfigs,
      currentRow: ''
    },
    trusteepanyment: {
      loading: false,
      optionConfigs: childoptionConfigs,
      ruleData: {},
      data: [],
      count: 0,
      configs: trusteepanymentConfigs,
      currentRow: ''
    },
    receive: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: receiveConfigs,
      currentRow: ''
    },
    transfer: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: transferConfigs,
      currentRow: ''
    },
    panyment: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: panymentConfigs,
      currentRow: ''
    },
    detail: {
      loading: false,
      ruleData: {},
      data: [],
      count: 0,
      configs: detailConfigs,
      currentRow: ''
    },
    tableDialog: {
      // 项
      item: {},
      // 默认
      visible: false,
      loading: false,
      optionConfigs: childoptionDialog,
      currentRow: '',
      // 动态获取
      title: '',
      ruleData: {},
      ruleConfigs: [],
      data: [],
      count: 0,
      configs: {}
    },
    goodsAll: {
      data: [],
      countData: {},
      // 展示数据
      statisticsloading: false,
      statisticsData: [],
      statisticsConfigs: statisticsConfigsTable
    },
    goodsformDialog: {
      title: '委托订单',
      visible: false,
      loading: false,
      optionConfigs: childoptionDialog,
      data: {},
      configs: goodsConfigsForm,
      configsImported: JSON.parse(JSON.stringify(goodsImportedConfigsForm)),
      configsExit: JSON.parse(JSON.stringify(goodsExitConfigsForm)),
      configsDomestic: JSON.parse(JSON.stringify(goodsDomesticConfigsForm))
    },
    trusteepanymentformDialog: {
      title: '受托方付款',
      visible: false,
      loading: false,
      optionConfigs: childoptionDialog,
      data: {},
      configs: trusteepanymentConfigsForm
    },
    classification: {
      title: '归类信息',
      visible: false,
      loading: false,
      optionConfigs: childoptionDialog,
      data: {},
      configs: classificationConfigsForm
    },
    writeback: false, // 回写
    childwriteback: false, // 回写
    childType: '', // 子表操作类型
    standardcurrency: '3', // 本位币
    formulalist: '', //  公式

    downFileDialog: {
      visible: false,
      data: { type: '' }
    }
  }),
  computed: {
    ...mapGetters(['getActivePathData', 'userInfo', 'getListBtn']),
    // 状态
    status() {
      return this.data.status
    },
    // 是否已创建
    tabIsDisabled() {
      return Boolean(this.status)
    },
    // 是否不可编辑
    controlDisabled() {
      return Boolean(
        this.status &&
          (this.status == '2' ||
            this.status.charAt(0) == '3' ||
            this.status == '4' ||
            this.status.charAt(0) == '5')
      )
    },
    // 抬头
    rise() {
      if (this.data.entrustOrderType && this.data.bizType) {
        if (
          this.data.entrustOrderType == 1 ||
          this.data.entrustOrderType == 2
        ) {
          if (this.data.bizType == 1 || this.data.bizType == 3) {
            return 'single' // 单抬头
          } else {
            return 'double' // 双抬头
          }
        } else {
          return 'other' // 其他
        }
      }
    },
    // 标题
    formHead() {
      var selectVal = ''
      if (
        this.data.entrustOrderType &&
        utils.getConfigFormOfSelect(
          this.configs,
          'entrustOrderType',
          this.data.entrustOrderType
        )
      ) {
        selectVal = utils.getConfigFormOfSelect(
          this.configs,
          'entrustOrderType',
          this.data.entrustOrderType
        )
      }
      if (selectVal) {
        if (this.rise == 'single') {
          return selectVal + '(单抬头)'
        } else if (this.rise == 'double') {
          return selectVal + '(双抬头)'
        } else if (this.rise == 'other') {
          return selectVal
        }
      }
    },

    // 卖方汇率条件
    orderExchangeRate() {
      if (this.data.signDate && this.data.supplierCurrency) {
        let date = this.data.signDate.slice(0, 10)
        let currencyName = utils.getConfigFormOfSelect(
          this.configs,
          'supplierCurrency',
          this.data.supplierCurrency
        )
        return JSON.stringify({ date, currencyName })
      }
    },

    // 买方汇率条件
    buyerExchangeRate() {
      if (this.data.signDate && this.data.currency) {
        let date = this.data.signDate.slice(0, 10)
        let currencyName = utils.getConfigFormOfSelect(
          this.configs,
          'currency',
          this.data.currency
        )
        return JSON.stringify({ date, currencyName })
      }
    },

    // 协议公式  依赖条件
    calculationFormula() {
      if (this.data.solutionNo) {
        return JSON.stringify({ solutionNo: this.data.solutionNo })
      }
    },

    // 报关表单
    customConfigsFormfile() {
      if (this.data.entrustOrderType == '1') {
        return this.custom.configsImported
      }
      if (this.data.entrustOrderType == '2') {
        return this.custom.configsExit
      }
      return this.custom.configs
    },

    // 商品弹窗表单
    goodsConfigsFormfile: {
      get() {
        // 进口 没有报关相关的项
        // 出口 没有出口退税项
        // 其他 买方货款汇率单价可录入
        if (this.data.entrustOrderType == '1') {
          var configs = JSON.parse(
            JSON.stringify(this.goodsformDialog.configsImported)
          )
          // 保运杂
          if (this.data.dealMode == '2') {
            //CIF && 进口
            configs = utils.setConfigForm(configs, 'freightRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'premiumRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'extrasRate', {
              disabled: true
            })
          }
          if (this.data.dealMode == '3') {
            //C&F && 进口
            configs = utils.setConfigForm(configs, 'freightRate', {
              disabled: true
            })
          }
          if (this.data.dealMode == '4') {
            //C&I && 进口
            configs = utils.setConfigForm(configs, 'premiumRate', {
              disabled: true
            })
          }
          return configs
        }
        if (this.data.entrustOrderType == '2') {
          var configs = this.goodsformDialog.configsExit
          // 保运杂
          if (this.data.dealMode == '1') {
            //FOB && 出口
            configs = utils.setConfigForm(configs, 'freightRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'premiumRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'extrasRate', {
              disabled: true
            })
          }
          if (this.data.dealMode == '3') {
            //C&F && 进口
            configs = utils.setConfigForm(configs, 'premiumRate', {
              disabled: true
            })
          }
          if (this.data.dealMode == '4') {
            //C&I && 进口
            configs = utils.setConfigForm(configs, 'freightRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'premiumRate', {
              disabled: true
            })
            configs = utils.setConfigForm(configs, 'extrasRate', {
              disabled: true
            })
          }
          return configs
        }
        if (this.data.entrustOrderType == '3') {
          var configs = this.goodsformDialog.configsDomestic
          // 买方采购
          configs = utils.setConfigForm(configs, 'buyerExchangeRate', {
            disabled: false
          })
          configs = utils.setConfigForm(configs, 'buyerPrice', {
            disabled: false
          })
          return configs
        }
        if (this.data.entrustOrderType == '4') {
          var configs = this.goodsformDialog.configsDomestic
          // 保运杂
          configs = utils.setConfigForm(configs, 'freightRate', {
            disabled: true
          })
          configs = utils.setConfigForm(configs, 'premiumRate', {
            disabled: true
          })
          configs = utils.setConfigForm(configs, 'extrasRate', {
            disabled: true
          })
          configs = utils.setConfigForm(configs, 'drawbackRate', {
            disabled: true
          })
          // 买方采购
          configs = utils.setConfigForm(configs, 'buyerExchangeRate', {
            disabled: false
          })
          configs = utils.setConfigForm(configs, 'buyerPrice', {
            disabled: false
          })
          return configs
        }
        return this.goodsformDialog.configs
      },
      set(fn) {
        // 可设置表单配置文件
        fn()
      }
    },
    // 判断是否有权限 归类
    isClassifyJurisdiction() {
      const { parentRoute } = this.$route.meta
      const is = (this.getListBtn[parentRoute] || []).includes('classify')
      return is && (this.status.charAt(0) == '2' || status.charAt(0) == '3')
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    // 返回
    goBack() {
      //   this.$router.go(-1)
      this.$router.push({
        path: '/M0402'
      })
    },

    // *********************************主表*****************************

    // 获取表单下拉
    async loadConfigSelect() {
      this.loading = true
      this.configs = [...(await utils.setConfigFormSelect(this.configs))]
      this.configsOthor = [
        ...(await utils.setConfigFormSelect(this.configsOthor))
      ]
      this.loading = false
    },

    // 操作按钮事件
    operation(val) {
      if (val == 'save') {
        this.$refs['mainform'].$refs['form'].validate(async valid => {
          if (this.status) {
            this.$refs['othorform'].$refs['form'].validate(async validothor => {
              if (!validothor) {
                valid = false
              }
            })
          }
          if (valid) {
            try {
              this.loading = true
              const { data } = await (this.status
                ? api.editEntrustorderData(this.data)
                : api.addEntrustorderData(this.data))
              this.$message({
                message: '保存成功',
                type: 'success',
                center: true
              })
              if (!this.data.status) {
                this.$set(this.data, 'status', '1')
                this.$set(this.data, 'entrustOrderNo', data.entrustOrderNo)
              }
            } catch (error) {
              this.$message({
                message: '保存失败',
                type: 'warning',
                center: true
              })
              return Promise.reject(error)
            } finally {
              this.loading = false
            }
          }
        })
      }
      if (val == 'sub') {
        this.$message({ message: '提交', type: 'success', center: true })
      }
    },

    // 点选
    async pointSelection(data, item) {
      var limit = dialogDataUtil.limitSelectionTable(data, item)
      if (limit) {
        return this.$message({ message: limit, type: 'warning', center: true })
      }
      this.tableDialog.itemform = ''
      this.tableDialog.item = item
      this.tableDialog.visible = true
      // 使用 await element dialog加载好了再修改条件 触发更新异步调用
      this.tableDialog = {
        ...this.tableDialog,
        ...(await dialogDataUtil.getSelectionTableRule(data, item))
      }
    },

    // *********************************子表表格*****************************

    // 获取列表数据
    async childGetTableList(activeName) {
      try {
        this[activeName].loading = true
        const { list, count } = await utils.getConfigTable(
          this[activeName].configs.api,
          this[activeName].ruleData
        )
        this[activeName].data = list
        this[activeName].count = count
        this[activeName].currentRow = ''
      } catch (error) {
        this.$message({
          message: '获取数据失败',
          type: 'warning',
          center: true
        })
        return Promise.reject(error)
      } finally {
        this[activeName].loading = false
      }
    },

    // 修改搜索条件
    childRuleChange(ruleData) {
      this[this.activeName].ruleData = ruleData
    },

    // 选中当前行
    childCurrentSelected(currentRow) {
      this[this.activeName].currentRow = currentRow
    },

    cellDblclick(currentRow) {
      if (this.isClassifyJurisdiction && this.activeName == 'goods') return
      this.childOperationGood('upd')
    },

    // 商品操作按钮事件
    async childOperationGood(val) {
      if (val == 'add') {
        this.childType = 'add'
        this.childwriteback = true
        this.goodsformDialog.data = {}

        // 处理响应数据，避免输入无响应
        ;(() => {
          var ob = ['arrivalGoodsName', 'arrivalGoodsModel']
          for (let key of ob) {
            this.$set(this.goodsformDialog.data, key, '')
          }
        })()
        this.goodsformDialog.data.entrustOrderNo = this.data.entrustOrderNo
        this.goodsformDialog.data.serviceCurrency = this.standardcurrency // 服务费币别本位币
        await this.gethgtimeExchangerate() //海关汇率
        // 子表受主表影响的字段-------	卖方币别，买方币别，服务费率(定额服务费)，货款汇率
        this.goodsformDialog.data.sellerCurrency = this.data.supplierCurrency
        this.goodsformDialog.data.buyerCurrency = this.data.currency
        this.goodsformDialog.data.serviceExchangeRate = this.data.serviceTaxRate
        this.goodsformDialog.data.buyerExchangeRate = parseFloat(
          parseFloat(
            this.data.orderExchangeRate / this.data.buyerExchangeRate
          ).toFixed(6)
        )
        this.goodsformDialog.data = { ...this.goodsformDialog.data }
        this.goodsformDialog.visible = true
        this.$nextTick(async () => {
          this.childwriteback = false
        })
      }
      if (val == 'upd') {
        if (!this.goods.currentRow) {
          return this.$message({
            message: '请选择记录',
            type: 'warning',
            center: true
          })
        }
        this.childType = 'upd'
        this.childwriteback = true
        this.goodsformDialog.data = JSON.parse(
          JSON.stringify(this.goods.currentRow)
        )
        this.goodsformDialog.visible = true
        this.$nextTick(async () => {
          this.childwriteback = false
        })
      }
      if (val == 'del') {
        if (!this.goods.currentRow) {
          return this.$message({
            message: '请选择记录',
            type: 'warning',
            center: true
          })
        }
        try {
          this.goods.loading = true
          const data = api.delEntrustorderGoodsData(
            this.goods.currentRow.itemCode
          )
          this.$message({ message: '删除成功', type: 'success', center: true })
          this.goods.loading = false
          this.childGetTableList('goods')
          this.childGetTableGoodAll()
        } catch (error) {
          this.$message({ message: '删除失败', type: 'warning', center: true })
          return Promise.reject(error)
        } finally {
          this.custom.loading = false
        }
      }
      if (val == 'cation') {
        if (!this.goods.currentRow) {
          return this.$message({
            message: '请选择记录',
            type: 'warning',
            center: true
          })
        }
        this.goodsformDialog.configsImported = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsImported)
        ]
        this.goodsformDialog.configsExit = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsExit)
        ]
        this.goodsformDialog.configsDomestic = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsDomestic)
        ]
        this.trusteepanymentformDialog.configs = [
          ...utils.setConfigFormOfNotText(
            this.trusteepanymentformDialog.configs
          )
        ]
        // 设置归类的显示
        if (this.goods.currentRow.goodsName) {
          this.goodsConfigsFormfile = () => {
            // 设置其他栏位不允许修改
            for (let item of this.goodsConfigsFormfile) {
              for (let elem of item.items) {
                elem.disabled = true
                elem.type === 'inputbutton' && (elem.type = 'input')
              }
            }
            utils.setConfigForm(this.goodsConfigsFormfile, 'customsGoodsCode', {
              disab: true,
              type: 'input',
              disabled: true
            })
          }
        } else {
          // 设置归类的显示
          this.goodsConfigsFormfile = () => {
            // 设置其他栏位不允许修改
            for (let item of this.goodsConfigsFormfile) {
              for (let elem of item.items) {
                elem.disabled = true
                elem.type === 'inputbutton' && (elem.type = 'input')
              }
            }
            utils.setConfigForm(this.goodsConfigsFormfile, 'customsGoodsCode', {
              disab: false,
              type: 'inputbutton',
              disabled: false
            })
          }
        }
        this.childType = 'cation'
        this.childwriteback = true
        this.goodsformDialog.data = JSON.parse(
          JSON.stringify(this.goods.currentRow)
        )
        this.goodsformDialog.visible = true
        this.$nextTick(async () => {
          this.childwriteback = false
        })
      }
    },

    // 受托方付款操作按钮事件
    async childOperationTrusteepanyment(val) {
      if (val == 'add') {
        this.childType = 'add'
        this.trusteepanymentformDialog.data = {}
        this.trusteepanymentformDialog.data.entrustOrderNo = this.data.entrustOrderNo
        this.trusteepanymentformDialog.visible = true
      }
      if (val == 'upd') {
        if (!this.trusteepanyment.currentRow) {
          return this.$message({
            message: '请选择记录',
            type: 'warning',
            center: true
          })
        }
        this.childType = 'upd'
        this.trusteepanymentformDialog.data = JSON.parse(
          JSON.stringify(this.trusteepanyment.currentRow)
        )
        this.trusteepanymentformDialog.visible = true
      }
      if (val == 'del') {
        if (!this.trusteepanyment.currentRow) {
          return this.$message({
            message: '请选择记录',
            type: 'warning',
            center: true
          })
        }
        try {
          this.trusteepanyment.loading = true
          const data = api.delEntrustorderTrusteepanymentData(
            this.trusteepanyment.currentRow.itemCode
          )
          this.$message({ message: '删除成功', type: 'success', center: true })
          this.trusteepanyment.loading = false
          this.childGetTableList('trusteepanyment')
        } catch (error) {
          this.$message({ message: '删除失败', type: 'warning', center: true })
          return Promise.reject(error)
        } finally {
          this.custom.loading = false
        }
      }
    },

    // 查询当月海关汇率
    async gethgtimeExchangerate() {
      let date = this.data.signDate.slice(0, 7)
      let currencyName = utils.getConfigFormOfSelect(
        this.configs,
        'supplierCurrency',
        this.data.supplierCurrency
      )
      let val = await utils.getCustomsExchangerate(date, currencyName)
      this.$set(this.goodsformDialog.data, 'customsExchangeRate', val)
      if (!val) {
        this.$message({
          message: '获取海关汇率失效',
          type: 'warning',
          center: true
        })
      }
    },

    // *********************************子表表单（报关信息）*****************************

    // 获取下拉
    async childloadConfigSelect(activeName) {
      this[activeName].loading = true
      if (activeName == 'custom') {
        this.custom.configsImported = [
          ...(await utils.setConfigFormSelect(this.custom.configsImported))
        ]
        this.custom.configsExit = [
          ...(await utils.setConfigFormSelect(this.custom.configsExit))
        ]
      }
      this[activeName].loading = false
    },

    // 回写表单
    async childGetFormList() {
      try {
        this.custom.loading = true
        this.custom.data = {
          ...this.custom.data,
          ...(await api.getVal('entrustcustom/' + this.data.entrustOrderNo))[
            'data'
          ]
        }
      } catch (error) {
        this.$message({
          message: '获取数据失败',
          type: 'warning',
          center: true
        })
        return Promise.reject(error)
      } finally {
        this.custom.loading = false
      }
    },

    // 操作按钮事件
    childFormOperation(val) {
      this.$refs['customform'].$refs['form'].validate(async valid => {
        if (valid) {
          try {
            this.custom.loading = true
            const data = api.saveEntrustorderCustomData(this.custom.data)
            this.$message({
              message: '保存成功',
              type: 'success',
              center: true
            })
            this.custom.loading = false
          } catch (error) {
            this.$message({
              message: '保存失败',
              type: 'warning',
              center: true
            })
            return Promise.reject(error)
          } finally {
            this.custom.loading = false
          }
        }
      })
    },

    // 点选
    async childPointSelection(data, item) {
      var limit = dialogDataUtil.limitSelectionTable(data, item)
      if (limit) {
        return this.$message({ message: limit, type: 'warning', center: true })
      }
      this.tableDialog.itemform = 'custom'
      this.tableDialog.item = item
      this.tableDialog.visible = true
      this.tableDialog = {
        ...this.tableDialog,
        ...(await dialogDataUtil.getSelectionTableRule(data, item))
      }
    },

    // *********************************弹窗表单*****************************

    // 下拉
    async DialogloadConfigSelect(activeName) {
      this[activeName].loading = true
      if (activeName == 'goodsformDialog') {
        this.goodsformDialog.configsImported = [
          ...(await utils.setConfigFormSelect(
            this.goodsformDialog.configsImported
          ))
        ]
        this.goodsformDialog.configsExit = [
          ...(await utils.setConfigFormSelect(this.goodsformDialog.configsExit))
        ]
        this.goodsformDialog.configsDomestic = [
          ...(await utils.setConfigFormSelect(
            this.goodsformDialog.configsDomestic
          ))
        ]
      }
      if (activeName == 'trusteepanymentformDialog') {
        this.trusteepanymentformDialog.configs = [
          ...(await utils.setConfigFormSelect(
            this.trusteepanymentformDialog.configs
          ))
        ]
      }
      this[activeName].loading = false
    },

    // 商品操作按钮事件
    async fromDialogOperationGood(val) {
      if (val == 'cancel') {
        this.goodsformDialog.visible = false
      }
      if (val == 'confirm') {
        for (let item of this.goodsAll.data) {
          if (
            this.childType == 'add' &&
            item['arrivalGoodsCode'] ==
              this.goodsformDialog.data.arrivalGoodsCode
          ) {
            return this.$message({
              message: '该商品已存在',
              type: 'warning',
              center: true
            })
          }
        }
        this.$refs['goodsform'].$refs['formDialog'].$refs['form'].validate(
          async valid => {
            if (valid) {
              try {
                this.goodsformDialog.visible = true
                const data = (this.childType == 'upd'
                  ? await api.editEntrustorderGoodsData(
                      this.goodsformDialog.data
                    )
                  : await api.addEntrustorderGoodsData(
                      this.goodsformDialog.data
                    ))['data']
                this.$message({
                  message: '保存成功',
                  type: 'success',
                  center: true
                })
                this.goodsformDialog.visible = false
                this.childGetTableList('goods')
                this.childGetTableGoodAll()
              } catch (error) {
                this.$message({
                  message: '保存失败',
                  type: 'warning',
                  center: true
                })
                return Promise.reject(error)
              } finally {
                this.loading = false
              }
            } else {
              return false
            }
          }
        )
      }
    },

    // 受托方付款操作按钮事件
    async fromDialogOperationTrusteepanyment(val) {
      if (val == 'cancel') {
        this.trusteepanymentformDialog.visible = false
      }
      if (val == 'confirm') {
        this.$refs['trusteepanymentform'].$refs['formDialog'].$refs[
          'form'
        ].validate(async valid => {
          if (valid) {
            try {
              this.trusteepanymentformDialog.visible = true
              const data = (this.childType == 'upd'
                ? await api.editEntrustorderTrusteepanymentData(
                    this.trusteepanymentformDialog.data
                  )
                : await api.addEntrustorderTrusteepanymentData(
                    this.trusteepanymentformDialog.data
                  ))['data']
              this.$message({
                message: '保存成功',
                type: 'success',
                center: true
              })
              this.trusteepanymentformDialog.visible = false
              this.childGetTableList('trusteepanyment')
            } catch (error) {
              this.$message({
                message: '保存失败',
                type: 'warning',
                center: true
              })
              return Promise.reject(error)
            } finally {
              this.loading = false
            }
          } else {
            return false
          }
        })
      }
    },

    // 归类事件
    async fromDialogOperationClassification(val) {
      if (val == 'cancel') {
        this.classification.visible = false
      }
      if (val == 'confirm') {
        if (
          await this.$confirm(
            '确定修改当前商品信息,并产生一条物料基础信息？',
            '提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }
          )
        ) {
          // 1先计算该商品的金额，在保存，插入一条物料信息
          let {
            goodsName, // 商品名称
            hsCode,
            mostFavoredNationTaxRate, // 最惠国 --> 关税税率(%)
            consumeTaxRate, // 消费税率 exciseTaxRate
            vatTaxRate, // 增值税率
            exportReturnTaxRate, // 出口退税
            customsSupervisionCondition // 监管条件
          } = this.classification.data
          // 获取增值税下拉
          const { data: res } = await api.getEnum('valueAddedTax')
          const selectOption = res.filter(
            item => item.itemValue === `${vatTaxRate}%`
          )
          vatTaxRate = (selectOption[0] || {}).itemKey
          // 空值的处理
          function transfer(data) {
            return data === '-' ? '' : data
          }
          // 获取物料商品编码
          const { data: materielCode } = await api.getCode('WLJC')
          let data = {
            goodsName,
            taxNo: hsCode,
            customTaxRate: transfer(mostFavoredNationTaxRate),
            vatTaxRate: transfer(vatTaxRate),
            drawbackRate: transfer(exportReturnTaxRate),
            exciseTaxRate: transfer(consumeTaxRate),
            goodsCode: materielCode
          }
          // 遍历修改商品信息的字段
          for (let key in data) {
            if (data.hasOwnProperty(key)) {
              this.$set(this.goodsformDialog.data, key, data[key])
            }
          }
          // 处理商品信息的字段转换
          const goodsData = (() => {
            const {
                hsCode,
                goodsName,
                declareFactor,
                unitOne,
                unitTwo,
                mostFavoredNationTaxRate,
                generalTax,
                generalTaxRate,
                tempTaxRate,
                consumeTaxRate,
                exportReturnTaxRate,
                customsSupervisionCondition,
                inspectionType
              } = this.classification.data,
              {
                arrivalGoodsModel,
                arrivalGoodsName,
                sellerUnitName,
                brandName,
                sourceAreaName
              } = this.goodsformDialog.data
            return {
              customsCode: hsCode,
              customsAbbreviation: goodsName,
              declareElements: declareFactor,
              custFirstUnit: unitOne,
              custSecondUnit: unitTwo,
              customsRate: transfer(mostFavoredNationTaxRate),
              generalTax: transfer(generalTaxRate),
              temporaryTax: transfer(tempTaxRate),
              exciseTaxRate: transfer(consumeTaxRate),
              rebateRate: transfer(exportReturnTaxRate),
              valueAddRate: transfer(vatTaxRate),
              superCondition: customsSupervisionCondition,
              inspectionType: inspectionType,
              specificationType: arrivalGoodsModel,
              tradeName: arrivalGoodsName,
              measurementUnitName: sellerUnitName,
              brandName,
              originName: sourceAreaName
            }
          })()
          //保存当前商品信息和插入一条商品信息
          this.$nextTick(async () => {
            try {
              const data = await Promise.all([
                api.editEntrustorderGoodsData(this.goodsformDialog.data),
                api.changeMaterielBaseData({ materielCode, ...goodsData })
              ])
              this.$message.success('修改成功，并新增一条物料商品信息。')
              // 关闭弹窗
              this.classification.visible = false
              this.goodsformDialog.visible = false
              this.childGetTableList('goods')
              this.childGetTableGoodAll()
            } catch (error) {
              this.$message.error('修改数据失败！')
              console.log(error)
            }
          })
        }
      }
    },

    // 点选
    async fromDialogPointSelectionGoods(data, item) {
      var limit = dialogDataUtil.limitSelectionTable(data, item)
      if (limit) {
        return this.$message({ message: limit, type: 'warning', center: true })
      }
      // 归类特殊处理
      if (item.name == 'customsGoodsCode') {
        try {
          var { data: getData } = await api.getReportingElements(
            data.customsGoodsCode
          )
        } catch (error) {
          console.log(error)
          return this.$message.error('申报编码无效')
        }
        /* const {
						hsCode, // 编码
						goodsName, // 商品名称
						declareFactor, // 申报要素
						unitOne, // 法定第一单位
						unitTwo, // 法定第二单位
						mostFavoredNationTaxRate, // 最惠国进口税率
						generalTaxRate, // 普通进口税率
						tempTaxRate, // 暂定进口税率
						consumeTaxRate, // 消费税率
						exportReturnTaxRate, // 出口退税率
						vatTaxRate, // 增值税率
						exportTaxRate, // 出口关税率
						customsSupervisionCondition, // 海关监管条件
						inspectionType, // 检验检疫类别
						goodsDescription // 商品描述
					} = data */
        const keyList = [
          'mostFavoredNationTaxRate',
          'generalTaxRate',
          'tempTaxRate',
          'consumeTaxRate',
          'exportReturnTaxRate',
          'vatTaxRate',
          'exportTaxRate'
        ]
        for (let item of keyList) {
          getData[item] = getData[item].replace('%', '')
        }
        this.classification.data = getData
        this.classification.visible = true
        return
      }
      this.tableDialog.itemform = 'goodsformDialog'
      this.tableDialog.item = item
      this.tableDialog.visible = true
      this.tableDialog = {
        ...this.tableDialog,
        ...(await dialogDataUtil.getSelectionTableRule(data, item))
      }
    },

    // 点选
    async fromDialogPointSelectionTrusteepanyment(data, item) {
      var limit = dialogDataUtil.limitSelectionTable(data, item)
      if (limit) {
        return this.$message({ message: limit, type: 'warning', center: true })
      }
      this.tableDialog.itemform = 'trusteepanymentformDialog'
      this.tableDialog.item = item
      this.tableDialog.visible = true
      this.tableDialog = {
        ...this.tableDialog,
        ...(await dialogDataUtil.getSelectionTableRule(data, item))
      }
    },

    // 商品自动计算
    autoCalculation(data) {
      data = { ...this.data, ...data }
      // 增值税处理
      if (data.vatTaxRate == '1') data.vatTaxRate = 13
      if (data.vatTaxRate == '2') data.vatTaxRate = 9
      if (data.vatTaxRate == '3') data.vatTaxRate = 16
      if (data.vatTaxRate == '4') data.vatTaxRate = 10
      if (data.vatTaxRate == '5') data.vatTaxRate = 0
      let ratio = [
        'serviceTaxRate',
        'freightRate',
        'premiumRate',
        'extrasRate',
        'customTaxRate',
        'increaseTaxRate',
        'exciseTaxRate',
        'vatTaxRate',
        'otherTaxRate',
        'serviceExchangeRate',
        'drawbackRate'
      ]
      let caleData = utils.getCalcConfig(
        data,
        this.goodsConfigsFormfile,
        this.formulalist,
        ratio
      )
      return caleData
    },

    // *********************************弹窗表格*****************************

    // 更换搜索条件
    async tableDialogRuleChange(val) {
      this.tableDialog.ruleData = { ...this.tableDialog.ruleData, ...val }
    },

    //  更换条件查询
    async tableDialogRuleEvent(newVal, oldVal) {
      if (
        oldVal &&
        newVal.pageIndex === oldVal.pageIndex &&
        newVal.pageIndex !== 1
      ) {
        // 如果存在页码之外的条件变更，且不在第一页
        this.$set(this.tableDialog.ruleData, 'pageIndex', 1)
      } else {
        try {
          this.tableDialog.loading = true
          const { list, count } = (await api.getList(
            this.tableDialog.configs['api'],
            this.tableDialog.ruleData
          ))['data']
          this.tableDialog.data = list
          this.tableDialog.count = count
        } catch (error) {
          return Promise.reject(error)
        } finally {
          this.tableDialog.loading = false
        }
      }
    },

    // 选中行
    tableDialogcurrentSelected(currentRow) {
      this.tableDialog.currentRow = currentRow
    },
    // 操作
    async tableDialogOperation(val) {
      if (val == 'confirm') {
        if (
          !this.tableDialog.currentRow ||
          JSON.stringify(this.tableDialog.currentRow) == '{}'
        ) {
          return this.$message({
            message: '请选择数据',
            type: 'warning',
            center: true
          })
        }
        if (this.tableDialog.itemform) {
          var writeVla = await dialogDataUtil.writeSelectionTable(
            this.tableDialog.item,
            this.tableDialog.currentRow,
            this[this.tableDialog.itemform].data
          )
        } else {
          var writeVla = await dialogDataUtil.writeSelectionTable(
            this.tableDialog.item,
            this.tableDialog.currentRow,
            this.data
          )
        }
        if (this.tableDialog.itemform) {
          this[this.tableDialog.itemform].data = {
            ...this[this.tableDialog.itemform].data,
            ...writeVla
          }
        } else {
          this.data = { ...this.data, ...writeVla }
        }
        this.tableDialog.visible = false
      }
      if (val == 'cancel') {
        this.tableDialog.visible = false
      }
    },

    // 获取全部商品列表数据
    async childGetTableListAllGood() {
      try {
        this.goods.loading = true
        this.goodsAll.statisticsloading = true
        const data = await utils.getConfigTable(this['goods'].configs.api, {
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.goodsAll.data = data.list
        this.goodsAll.countData = data
      } catch (error) {
        this.$message({
          message: '获取数据失败',
          type: 'warning',
          center: true
        })
        return Promise.reject(error)
      } finally {
        this.goods.loading = false
        this.goodsAll.statisticsloading = false
      }
    },

    // 统计
    async childGetTableGoodAll() {
      try {
        // 获取所有商品
        await this.childGetTableListAllGood()
        // 计算统计数据
        let data = {
          goodsValue: 0 /* 卖方销售货价 */,
          costAmountCount: 0 /* 运保杂费额 */,
          customTotalAmount: 0 /* 关税税额 */,
          exciseTaxCount: 0 /* 消费税额 */,
          vatTotalAmount: 0 /* 进口环节增值税税额 */,
          otherTaxAmountCount: 0 /* 其他税金 */,
          priceTaxCount: 0 /* 价税合计 */,
          totalServiceCharge: 0 /* 服务费 */,
          netWeightCount: 0 /* 净重 */,
          grossWeightCount: 0 /*  毛重 */,
          trusteePayGoodsAmount: 0 /* 受托方应付货款总额 */
        }
        const statisticsTable = {
          goodsValue: 'sellerGoodsValue',
          costAmountCount: 'costAmount',
          customTotalAmount: 'customTaxAmount',
          exciseTaxCount: 'exciseTax',
          vatTotalAmount: 'vatTaxAmount',
          otherTaxAmountCount: 'otherTaxAmount',
          priceTaxCount: 'priceTax',
          totalServiceCharge: 'serviceFee',
          netWeightCount: 'netWeight',
          grossWeightCount: 'grossWeight',
          trusteePayGoodsAmount: 'sellerGoodsValue'
        }
        for (let item of this.goodsAll.data) {
          for (let key in statisticsTable) {
            if (item.hasOwnProperty(statisticsTable[key])) {
              data[key] = parseFloat(
                parseFloat(item[statisticsTable[key]] + data[key]).toFixed(6)
              )
            }
          }
        }
        // 填充统计表格
        this.$set(this.goodsAll, 'statisticsData', [this.data])
        // 填充统计表单
        for (let key in data) {
          this.$set(this.data, key, data[key])
        }
        // 默认本位币
        this.$set(this.data, 'sellerCurrency', this.data.supplierCurrency)
        this.$set(this.data, 'customCurrency', this.standardcurrency)
        this.$set(this.data, 'vatCurrency', this.standardcurrency)
        this.$set(this.data, 'serviceCurrency', this.standardcurrency)
        this.$set(this.data, 'trusteeCurrency', this.standardcurrency)
        this.$set(this.data, 'invoiceCurrency', this.standardcurrency)
        this.$set(this.data, 'advanceCurrency', this.standardcurrency)
        this.$set(this.data, 'srefundCurrency', this.data.supplierCurrency)
        this.$set(this.data, 'paidCurrency', this.data.supplierCurrency)
        // 低消差额 最低消费额 - 服务费总和
        this.$set(
          this.data,
          'minimumCharge',
          this.data.minCharge - this.data.totalServiceCharge
        )
        this.statisticsOther()
      } catch (error) {
        this.$message({
          message: '获取数据失败',
          type: 'warning',
          center: true
        })
        return Promise.reject(error)
      } finally {
        this.goodsAll.statisticsloading = false
      }
    },

    // 其他统计
    statisticsOther() {
      // 低消处理后的服务费
      if (this.data.minimumCharge > 0) {
        var totalServiceCharge = this.data.minCharge
      } else {
        var totalServiceCharge = this.data.totalServiceCharge
      }

      //  应开票金额
      // 	进出口 单：价税合计+服务费(底消处理后)+杂费（代理报检费和检疫费）
      // 	进出口 双：服务费+杂费
      // 	本港 :  货值（转人命币）+服务费+杂费
      var invoiceAmount = 0
      if (this.rise == 'single') {
        invoiceAmount =
          (this.data.priceTaxCount || 0) +
          (totalServiceCharge || 0) +
          (this.data.agencyFee || 0) +
          (this.data.quarantineFee || 0)
      } else if (this.rise == 'double') {
        invoiceAmount =
          (totalServiceCharge || 0) +
          (this.data.agencyFee || 0) +
          (this.data.quarantineFee || 0)
      } else if (this.rise == 'other' || this.data.entrustOrderType == 3) {
        invoiceAmount =
          (totalServiceCharge || 0) +
          (this.data.agencyFee || 0) +
          (this.data.quarantineFee || 0) +
          (this.data.goodsValue || 0) / (this.data.buyerExchangeRate || 1)
      }
      invoiceAmount = parseFloat(parseFloat(invoiceAmount).toFixed(2))
      this.$set(this.data, 'invoiceAmount', invoiceAmount)

      // 预计应收总额
      // 	进出口 单双：价税合计+服务费+杂费(勾选是否垫货款)   or 价税合计 - 货值（转人命币）+服务费+杂费(不勾选是否垫货款)
      // 	本港 :  货值（转人命币）+服务费+杂费
      var advanceAmount = 0
      if (this.data.entrustOrderType == 1 || this.data.entrustOrderType == 2) {
        if (this.data.matPayment) {
          advanceAmount =
            (this.data.priceTaxCount || 0) +
            (totalServiceCharge || 0) +
            (this.data.agencyFee || 0) +
            (this.data.quarantineFee || 0)
        } else {
          advanceAmount =
            (this.data.priceTaxCount || 0) +
            (totalServiceCharge || 0) +
            (this.data.agencyFee || 0) +
            (this.data.quarantineFee || 0) -
            (this.data.goodsValue || 0) / (this.data.buyerExchangeRate || 1)
        }
      } else if (this.data.entrustOrderType == 3) {
        advanceAmount =
          (totalServiceCharge || 0) +
          (this.data.agencyFee || 0) +
          (this.data.quarantineFee || 0) +
          (this.data.goodsValue || 0) / (this.data.buyerExchangeRate || 1)
      }
      advanceAmount = parseFloat(parseFloat(advanceAmount).toFixed(2))
      this.$set(this.data, 'advanceAmount', advanceAmount)
    },

    // 重新计算所有商品
    async updEntrustorderGoodsReplaceData() {
      if (!this.goodsAll.data.length) return
      var data = []
      for (let item of this.goodsAll.data) {
        let upobj = {}
        // 子表受主表影响的字段-------	卖方币别，买方币别，服务费率(定额服务费)，货款汇率
        upobj.sellerCurrency = this.data.supplierCurrency
        upobj.buyerCurrency = this.data.currency
        upobj.serviceExchangeRate = this.data.serviceTaxRate
        upobj.buyerExchangeRate = parseFloat(
          parseFloat(
            this.data.orderExchangeRate / this.data.buyerExchangeRate
          ).toFixed(6)
        )
        item = { ...item, ...upobj }
        // 若是公式存在引用的先后顺序，这里需要循环公式每次更新 如：公式a+b=c,c+d=e,a,b变换但是e的公式先执行，e不会触发最新值，这里暂时不考虑
        let caleData = this.autoCalculation(item, this.formulalist)
        // console.log(caleData)
        item = { ...item, ...caleData }
        // console.log(item)
        data.push(item)
      }
      try {
        this.goods.loading = true
        this.goodsAll.statisticsloading = true
        await api.updEntrustorderGoodsReplaceData(
          this.data.entrustOrderNo,
          data
        )
        await api.editEntrustorderData(this.data)
        this.childGetTableList('goods')
        // 获取统计数据
        this.childGetTableGoodAll()
        this.$message({
          message: '商品信息已重新计算',
          type: 'success',
          center: true
        })
      } catch (error) {
        this.$message({
          message: '更新商品信息失败',
          type: 'warning',
          center: true
        })
        return Promise.reject(error)
      } finally {
        this.goods.loading = false
        this.goodsAll.statisticsloading = false
      }
    },

    async beforeSubmitCb() {
      var vothor = true
      this.$refs['othorform'].$refs['form'].validate(async validothor => {
        if (!validothor) {
          vothor = false
        }
        if (!this.goods.data.length) {
          vothor = false
          this.$message.warning('请检查商品是否为空！')
        }
      })
      return vothor
    },

    // 导出委托订单
    async handleExport() {
      try {
        // 接口配置
        const port = new Map([
          ['entrustOrder', 'exportEntrustOrder'],
          ['paymentNotification', 'exportPaymentNotification']
        ]).get(this.downFileDialog.data.type)

        if (port === undefined)
          return this.$message.warning('请选择需导出的类型')
        const { data, headers } = await api[port](this.data.entrustOrderNo)
        function downloadFile(data) {
          var a = document.createElement('a')
          data = new Blob([data], { type: headers['content-type'] })
          var href = window.URL.createObjectURL(data)
          a.href = href
          const finame = (() => {
            const disposition = headers['content-disposition']
            let i = disposition.indexOf('=')
            return disposition.slice(i + 1)
          })()
          a.download = decodeURI(finame)
          a.click()
          this.downFileDialog.visible = false
          window.URL.revokeObjectURL(href)
        }
        downloadFile.call(this, data)
      } catch (error) {
        this.$message.error(`导出失败，请重试！`)
        console.log(error)
      }
    }
  },
  async created() {
    // 初始化配置
    this.writeback = true
    this.data = {
      ...utils.inntForm(this.data, this.configs),
      ...utils.inntForm(this.data, this.configsOthor)
    }
    await this.loadConfigSelect()
    // ------状态对应回写
    // 默认
    this.data.trusteeCode = 'GSXX2019072300015'
    this.data.trusteeName = '深圳市讯宇供应链管理有限公司'
    const data = {
      departmentCode: this.userInfo.department,
      purchaseUnitCode: this.userInfo.department,
      purchaseUnitName: this.userInfo.departmentName
    }
    for (let key in data) {
      this.$set(this.data, key, data[key])
    }
    this.$set(
      this.data,
      'signDate',
      new Date().toJSON().slice(0, 10) + ' 00:00:00'
    )
    // 修改
    const { formData = {} } = this.getActivePathData(this.$route.path) || {}
    for (let key in formData) {
      this.$set(this.data, key, formData[key])
    }
    this.$nextTick(async () => {
      this.writeback = false
    })
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: {
        formData: this.data,
        status:
          sessionStorage.getItem('btnType') == 'update' ? 'update' : 'create'
      },
      path: this.$route.path
    })
    next()
  },
  watch: {
    // 底部表单的最低消费差额 为 负数时不显示
    'data.minimumCharge'(val, old) {
      utils.setConfigForm(this.configsOthor, 'minimumCharge', {
        none: val <= 0
      })
      utils.setConfigForm(this.configsOthor, 'UnminimumCharge', {
        none: val > 0
      })
    },
    // 单据生效数据
    tabIsDisabled(newVal, oldVal) {
      // 初始化子项
      if (newVal) {
        utils.setConfigForm(this.configs, 'entrustOrderNo', { disab: false }) // 委托订单号 显示
        // 初始化表格（触发拉去数据）
        this.goods.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.buyer.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.seller.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.trusteereceipt.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.trusteepanyment.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.receive.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.transfer.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.panyment.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        this.detail.ruleData = utils.inntTable({
          entrustOrderNo: this.data.entrustOrderNo
        })
        // 初始化表单回写表单
        this.custom.data = utils.inntForm(this.custom.data, this.custom.configs)
        this.childloadConfigSelect('custom')
        this.childGetFormList()
        // 初始化弹窗表单
        this.goodsformDialog.data = utils.inntForm(
          this.goodsformDialog.data,
          this.goodsformDialog.configs
        )
        this.DialogloadConfigSelect('goodsformDialog')
        this.trusteepanymentformDialog.data = utils.inntForm(
          this.trusteepanymentformDialog.data,
          this.trusteepanymentformDialog.configs
        )
        this.DialogloadConfigSelect('trusteepanymentformDialog')
        // 获取统计数据
        this.childGetTableGoodAll()
      }
    },
    // 样式和按钮
    controlDisabled(newVal, oldVal) {
      if (newVal) {
        this.configs = [...utils.setConfigFormOfText(this.configs)]
        this.configsOthor = [...utils.setConfigFormOfText(this.configsOthor)]
        this.custom.configsImported = [
          ...utils.setConfigFormOfText(this.custom.configsImported)
        ]
        this.custom.configsExit = [
          ...utils.setConfigFormOfText(this.custom.configsExit)
        ]
        // 这里不锁定  商品信息归类需要编辑
        this.goodsformDialog.optionConfigs = []
        this.goodsformDialog.configsImported = [
          ...utils.setConfigFormOfText(this.goodsformDialog.configsImported)
        ]
        this.goodsformDialog.configsExit = [
          ...utils.setConfigFormOfText(this.goodsformDialog.configsExit)
        ]
        this.goodsformDialog.configsDomestic = [
          ...utils.setConfigFormOfText(this.goodsformDialog.configsDomestic)
        ]
        this.trusteepanymentformDialog.configs = [
          ...utils.setConfigFormOfText(this.trusteepanymentformDialog.configs)
        ]
        // 按钮
        this.optionConfigs = []
        this.goods.optionConfigs = []
        this.custom.optionConfigs = []
        this.trusteepanyment.optionConfigs = []
      } else {
        this.configs = [...utils.setConfigFormOfNotText(this.configs)]
        this.configsOthor = [...utils.setConfigFormOfNotText(this.configsOthor)]
        this.custom.configsImported = [
          ...utils.setConfigFormOfNotText(this.custom.configsImported)
        ]
        this.custom.configsExit = [
          ...utils.setConfigFormOfNotText(this.custom.configsExit)
        ]
        this.goodsformDialog.optionConfigs = childoptionDialog
        this.goodsformDialog.configsImported = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsImported)
        ]
        this.goodsformDialog.configsExit = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsExit)
        ]
        this.goodsformDialog.configsDomestic = [
          ...utils.setConfigFormOfNotText(this.goodsformDialog.configsDomestic)
        ]
        this.trusteepanymentformDialog.configs = [
          ...utils.setConfigFormOfNotText(
            this.trusteepanymentformDialog.configs
          )
        ]
        // 按钮
        this.optionConfigs = []
        this.goods.optionConfigs = childoptionConfigs
        this.custom.optionConfigs = [
          { label: '保存', event: 'save', type: 'primary' }
        ]
        this.trusteepanyment.optionConfigs = childoptionConfigs
      }
    },

    'goods.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.goods.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('goods')
        }
      },
      deep: true
    },
    'buyer.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.buyer.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('buyer')
        }
      },
      deep: true
    },
    'seller.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.seller.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('seller')
        }
      },
      deep: true
    },
    'trusteereceipt.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.trusteereceipt.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('trusteereceipt')
        }
      },
      deep: true
    },
    'trusteepanyment.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.trusteepanyment.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('trusteepanyment')
        }
      },
      deep: true
    },
    'receive.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.receive.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('receive')
        }
      },
      deep: true
    },
    'transfer.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.transfer.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('transfer')
        }
      },
      deep: true
    },
    'panyment.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.panyment.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('panyment')
        }
      },
      deep: true
    },
    'detail.ruleData': {
      handler(newVal, oldVal) {
        if (newVal.pageIndex === oldVal.pageIndex && newVal.pageIndex !== 1) {
          // 如果存在页码之外的条件变更，且不在第一页
          this.$set(this.detail.ruleData, 'pageIndex', 1)
        } else {
          this.childGetTableList('detail')
        }
      },
      deep: true
    },

    // *****************报关操作

    // 收货单位类型
    'custom.data.receiveUnitType'(newVal, oldVal) {
      if (this.status && !oldVal) return // 回写
      this.custom.data.receiveUnitCode = ''
      this.custom.data.receiveUnitName = ''
    },

    // 报关卖方类型
    'custom.data.sellerType'(newVal, oldVal) {
      if (this.status && !oldVal) return // 回写
      this.custom.data.sellerCode = ''
      this.custom.data.sellerName = ''
    },

    // **************商品操作

    // 通过计算属性更新卖方汇率
    async orderExchangeRate(newVal, oldVal) {
      if (this.status && !oldVal) return // 修改回写
      let obj = JSON.parse(newVal)
      let val = await utils.getExchangeRate(obj.date, obj.currencyName)
      this.$set(this.data, 'orderExchangeRate', val)
      if (!val) {
        this.$message({
          message: '获取汇率失效',
          type: 'warning',
          center: true
        })
      }
    },

    // 通过计算属性更新买方汇率依赖
    async buyerExchangeRate(newVal, oldVal) {
      if (this.status && !oldVal) return // 修改回写
      let obj = JSON.parse(newVal)
      let val = await utils.getExchangeRate(obj.date, obj.currencyName)
      this.$set(this.data, 'buyerExchangeRate', val)
      if (!val) {
        this.$message({
          message: '获取汇率失效',
          type: 'warning',
          center: true
        })
      }
    },

    // 公式依赖
    async calculationFormula(newVal, oldVal) {
      if (!newVal) return
      let obj = JSON.parse(newVal)
      this.formulalist = await utils.getCalculationFormula(obj.solutionNo)
      let defaultlist = [
        { formula: 'sellerGoodsValue=sellerQuantity*sellerPrice' },
        {
          formula:
            'priceTax=sellerGoodsValue*orderExchangeRate+customTaxAmount+exciseTax+vatTaxAmount+otherTaxAmount'
        },
        { formula: 'buyerPrice=buyerGoodsValue/sellerQuantity' },
        { formula: 'buyerGoodsValue=(priceTax+serviceFee)/buyerRate' }
      ]
      for (let item of defaultlist) {
        this.formulalist.push(item)
      }
    },

    // 卖方汇率
    'data.orderExchangeRate'(newVal, oldVal) {
      if (!this.status) return // 新增
      if (this.status && !oldVal) return // 回写
      // 所有重新计算
      this.updEntrustorderGoodsReplaceData()
    },

    // 买方汇率
    'data.buyerExchangeRate'(newVal, oldVal) {
      if (!this.status) return // 新增
      if (this.status && !oldVal) return // 回写
      // 所有重新计算
      this.updEntrustorderGoodsReplaceData()
    },

    // 服务费率
    'data.serviceTaxRate'(newVal, oldVal) {
      if (!this.status) return // 新增
      if (this.status && !oldVal) return // 回写
      // 所有重新计算
      this.updEntrustorderGoodsReplaceData()
    },

    // 公式
    formulalist(newVal, oldVal) {
      if (!this.status) return // 新增
      if (this.status && !oldVal) return // 回写
      // 所有重新计算
      this.updEntrustorderGoodsReplaceData()
    },

    // 单条重新计算
    'goodsformDialog.data': {
      handler(newVal, oldVal) {
        if (this.childwriteback) return
        let caleData = this.autoCalculation(
          this.goodsformDialog.data,
          this.formulalist
        )
        for (let key in caleData) {
          this.$set(this.goodsformDialog.data, key, caleData[key])
        }
      },
      deep: true
    },

    async 'goodsformDialog.data.arrivalGoodsModel'(newVal, oldVal) {
      if (this.childwriteback) return
      // 归类状态时不允许清除
      const statusNumber = +this.status.charAt()
      if (statusNumber >= 2 && statusNumber < 6) return
      // 来货规格型号
      if (newVal) {
        // 录入
        try {
          const { list } = (await api.getList('materielbase', {
            specificationType: newVal
          }))['data']
          if (list.length > 0) {
            // 录入
            let rowData = list[0]
            this.goodsformDialog.data['orderModel'] = rowData['materielCode'] //来货编码
            this.goodsformDialog.data['arrivalGoodsName'] = rowData['tradeName'] //来货名称
            this.goodsformDialog.data['goodsCode'] = rowData['materielCode'] //商品编码
            this.goodsformDialog.data['goodsName'] =
              rowData['customsAbbreviation'] //商品名称
            this.goodsformDialog.data['sellerUnit'] = rowData['measurementUnit'] //成交单位编码
            this.goodsformDialog.data['sellerUnitName'] =
              rowData['measurementUnitName'] //成交单位
            this.goodsformDialog.data['arrivalGoodsCode'] =
              rowData['materielCode']
            this.goodsformDialog.data['taxNo'] = rowData['taxNo'] // 税号
            this.goodsformDialog.data['attachNo'] = rowData['attachNo'] // 附号
            this.goodsformDialog.data['customTaxRate'] = rowData['customsRate'] // 关税税率
            this.goodsformDialog.data['increaseTaxRate'] = rowData['levyRate'] // 关税加征
            this.goodsformDialog.data['superviseMode'] =
              rowData['superCondition'] // 监管条件
            this.goodsformDialog.data['superviseModeName'] =
              rowData['superConditionName'] //监管条件
            this.goodsformDialog.data['vatTaxRate'] = rowData['valueAddRate'] //进口增值税率
            this.goodsformDialog.data['brand'] = rowData['brandCode']
            this.goodsformDialog.data['brandName'] = rowData['brandName'] //品牌名称
            this.goodsformDialog.data['sourceArea'] = rowData['originCode']
            this.goodsformDialog.data['sourceAreaName'] = rowData['originName'] //产地
            // 更换商品清空
            this.goodsformDialog.data['sellerQuantity'] = '' //成交数量
            this.goodsformDialog.data['sellerPrice'] = '' //单价
            return
          }
        } catch (e) {
          return Promise.reject(error)
        }
      }
      // 清除
      this.goodsformDialog.data['orderModel'] = '' //来货编码
      this.goodsformDialog.data['arrivalGoodsName'] = '' //来货名称
      this.goodsformDialog.data['goodsCode'] = '' //商品编码
      this.goodsformDialog.data['goodsName'] = '' //商品名称
      this.goodsformDialog.data['sellerUnit'] = '' //成交单位编码
      this.goodsformDialog.data['sellerUnitName'] = '' //成交单位
      this.goodsformDialog.data['arrivalGoodsCode'] = ''
      this.goodsformDialog.data['taxNo'] = '' // 税号
      this.goodsformDialog.data['attachNo'] = '' // 附号
      this.goodsformDialog.data['customTaxRate'] = '' // 关税税率
      this.goodsformDialog.data['increaseTaxRate'] = '' // 关税加征
      this.goodsformDialog.data['superviseMode'] = '' // 监管条件
      this.goodsformDialog.data['superviseModeName'] = '' //监管条件
      this.goodsformDialog.data['vatTaxRate'] = '' //进口增值税率
      this.goodsformDialog.data['sellerQuantity'] = '' //成交数量
      this.goodsformDialog.data['sellerPrice'] = '' //单价
    },

    // ********************统计操纵

    // 代理报检费
    'data.agencyFee'(newVal, oldVal) {
      if (this.writeback) return
      this.statisticsOther()
    },

    // 检疫费
    'data.quarantineFee'(newVal, oldVal) {
      if (this.writeback) return
      this.statisticsOther()
    }
  }
}
</script>

<style lang="less">
.mystyle {
  /* @import "../../styles/index.less"; */

  /* 自定义 */
  // 布局
  .app-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background-color: #b3c0d1;
  }

  .app-mian-container {
    overflow-y: hidden;
    overflow-x: auto;
  }

  .el-aside {
    background-color: #d1d8e0;
  }

  .model-container {
    display: flex;
    flex-direction: column;
    padding-bottom: 0;
    min-width: 1440px;
  }

  .model {
    flex: 1;
  }

  .el-footer {
    text-align: center;
    padding-top: 36px;
    font-size: 14px;
    color: #a6a6a6;
  }

  //  model
  .login {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-size: 100% 100%;
  }

  .login-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .logout-btn {
    float: right;
    margin-top: 30px;
    transform: translate(0, -50%);
  }

  .header {
    line-height: 36px;
  }

  .table,
  .form {
  }

  // 分页
  .page {
    text-align: right;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  // 按钮
  .operationDiv {
    //   text-align: right;
    margin-bottom: 20px;
  }

  .operationDialogDiv {
    text-align: right;
    margin-top: 20px;
  }

  // 表单
  .el-form {
    text-align: left;
  }

  .form-item {
    width: 300px;
    vertical-align: top;
    display: inline-block;
    padding-right: 50px;
    margin-bottom: 10px;
  }

  .form-item-long {
    width: 416px;
  }

  .form-item-big {
    width: 650px;
  }

  .form-item-text {
    width: 350px;
    vertical-align: top;
    display: inline-block;
    padding-right: 0px;
    margin-bottom: 10px;
  }

  .form-item-text-long {
    width: 466px;
  }

  .form-item-text-big {
    width: 700px;
  }

  // 下拉输入框
  .el-input {
    .el-select .el-input {
      width: 85px;
    }
  }

  .text-r input {
    text-align: right;
  }

  .el-date-editor.el-input,
  .el-select {
    width: 100%;
  }

  .el-radio {
    height: 28px;
    line-height: 28px;
  }

  // 展示
  .form-item.text {
    .colon {
      margin-right: 10px;
    }
  }

  .el-form-item__error {
    display: inline-block;
    left: auto;
    margin-left: 10px;
  }

  // 弹窗
  .el-dialog {
    min-width: 1440px;
    .el-dialog__header {
      padding: 20px;
      .el-dialog__headerbtn {
        top: 25px;
      }
    }
    .el-dialog__body {
      padding: 0 20px 30px 20px;
    }
  }

  .formHead {
    text-align: center;
  }
}
</style>
