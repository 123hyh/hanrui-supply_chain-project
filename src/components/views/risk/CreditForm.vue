/* 融资授信 */
<template>
  <div class="AddCreditBox">
    <div class="loadingClass" element-loading-spinner="el-icon-refresh"></div>
    <!-- 保存 返回 按钮 -->
    <div class="btnBottom">
      <!-- <el-button type="primary" @click.stop="handlePreserve">保存</el-button>
      <el-button type="primary" @click.stop="handleRollback">返回</el-button>-->
      <preserve-btn
        :form="ruleForm"
        :isLoading="isLoading"
        @handlePreserve="handlePreserve"
        @handleRollback="handleRollback"
      ></preserve-btn>
    </div>
    <diaLog-component
      :btnObj="dialogData.btnObj"
      :count="dialogPaging"
      :formConfig="dialogData.queryConfig"
      :isShowPopover="isShowPopover"
      :itemName="dialogData.itemName"
      :popoverList="popoverList"
      :popoverListKey="popoverListKey"
      :ruleForm="dialogData.ruleForm"
      @changeisShowPopover="closeDialog"
      @handleBtnClickType="rousePopover"
      @handlePageChange="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
    ></diaLog-component>

    <!-- 输入框 -->
    <form-component
      :formModel="ruleForm"
      :inputKey="formConfig"
      @handlerFormConfigClickSearch="rousePopover"
      @handlerFormVerify="handlerFormVerify"
    ></form-component>
    <!-- 页签 -->
    <div>
      <el-tabs @tab-click="handlerTabClick" type="card" v-model="tabActiveName">
        <el-tab-pane
          :disabled="tabDisbale"
          :key="item.name"
          :label="item.label"
          :name="item.name"
          v-for="item of tabObj"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <table-component
      :count="pagingCount"
      :dialog="false"
      :isSubTable="true"
      :popoverList="tabTableData"
      :popoverListKey="tableDataKey"
      @handlePageChange="handlePageChange"
    ></table-component>
  </div>
</template>
<script>
const btnObj = [{ type: 'search', label: '查询' }]
import api from '@/assets/js/appHelper.js'
import QueryBar from '@/components/common/QueryBar.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import formConfig from '@/domain/formconfig/risk/Credit.js'
import CreditForm from '@/domain/entities/risk/Credit.js'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

import { mapMutations, mapGetters, mapActions } from 'vuex'
/**
 * @param pawnTableDataKey 抵押物
 * @param depositsTableDataKey  保证金
 * @param ensureTableDataKey  担保
 * @param noEnsureTableDataKey  无担保授信
 */

import pawnTableDataKey from '@/domain/tableconfig/risk/Pawn.js'
import depositsTableDataKey from '@/domain/tableconfig/risk/Deposits.js'
import ensureTableDataKey from '@/domain/tableconfig/risk/Ensure.js'
import noEnsureTableDataKey from '@/domain/tableconfig/risk/Noensure.js'
import mixins from '@/components/views/risk/mixins.js'

import FormComponent from '@/components/common/FormConfig.vue'

import utools from '@/domain/common/utools.js'

const selectKey = [{ label: 'itemValue', value: 'itemKey' }]
export default {
  name: 'CreditForm',
  mixins: [mixins],
  data() {
    return {
      tabActiveName: '', // 激活tab菜单
      tabATableTitle: '',
      //  弹出框组件参数
      isShowPopover: false, // 弹出框
      dialogData: {
        ruleForm: {}
      },
      searchType: '',
      dialogPaging: 0,
      showComponent: 'Popover',
      tabDisbale: false,
      popoverList: [], // 弹出框需要的数据
      popoverListKey: [], // 弹出框表头显示列的key值
      currencySelectInputKey: '', // 当前选中数据对应的输入框
      isPopoverSelection: false, // 弹出框的表格类型
      tableDataKey: pawnTableDataKey, //  tab下表格显示的键
      tableDataKeyObj: {
        // tabledataKey取值Obj
        pawn: pawnTableDataKey,
        cashDeposit: depositsTableDataKey,
        guarantee: ensureTableDataKey,
        unsecuredCreditGranting: noEnsureTableDataKey,
        exportTaxCredit: noEnsureTableDataKey,
        exportPriceCredit: noEnsureTableDataKey
      },
      selectData: {},
      jumpType: '', // 父级跳转类型
      verify: {}, // 表单验证
      ruleForm: {} /* new CreditForm */,
      tabTableData: [],
      formConfig: utools.cloneObj(formConfig),
      popTitleObj: {
        pawn: '新增抵押物',
        cashDeposit: '新增保证金',
        guarantee: '新增担保',
        unsecuredCreditGranting: '新增无担保授信',
        exportTaxCredit: '新增出口税金授信',
        exportPriceCredit: '新增出口价款授信'
      },
      pagingCount: 0, // 分页数据总条数
      isLoading: false
    }
  },
  components: {
    Popover: () => import('@/components/views/risk/Popover.vue'),
    DiaLogComponent: () => import('@/components/common/Popover.vue'),
    QueryBar,
    FormComponent,
    PaginationComponent,
    TableComponent
  },
  watch: {
    jumpType(cur) {
      cur === 'add' && (this.tabDisbale = true)
    },
    'ruleForm.exchangeRate': {
      handler(cur, pre) {
        if (cur === undefined) return
        this.ruleForm.homeCurrencyAmount =
          (typeof this.ruleForm.totalAmount !== 'number'
            ? 0
            : this.ruleForm.totalAmount) * cur
      },
      deep: true
    },
    'ruleForm.creditLimitRate': {
      handler(cur, pre) {
        if (cur === undefined) return
        this.ruleForm.creditLimitAmount =
          (typeof this.ruleForm.totalAmount !== 'number'
            ? 0
            : this.ruleForm.totalAmount) * cur
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['getActivePathData']),
    tableConfigBind: _ => ({
      customerName: _ =>
        require('@/domain/tableconfig/business/Client.js').default,
      agreementName: _ =>
        require('@/domain/tableconfig/business/Agreement.js').default,
      creditCompanyName: _ =>
        require('@/domain/tableconfig/basicdata/CompanyInfo.js').default
    }),
    btnClickAsync() {
      return {
        customerName: (data = {}) =>
          api.queryclientSearch({
            ...data,
            clientNo: this.dialogData.ruleForm.entrustOrderNo,
            status: '2'
          }),
        agreementName: (data = {}) =>
          api.getAssignmentAgreementData({
            ...data,
            agreementNo: this.dialogData.ruleForm.agreementNo,
            customerCode: this.ruleForm.customerCode,
            status: '2'
          }),
        creditCompanyName: (data = {}) =>
          api.getCreditCompanyNameData({
            ...data,
            companyCode: this.dialogData.ruleForm.companyCode,
            status: '2'
          })
      }
    },
    setDialogTitleAndQuery: _ => ({
      customerName: {
        itemName: '委托方',
        queryConfig: [
          { isInput: true, label: '委托方编码', moduleBind: 'entrustOrderNo' }
        ],
        btnObj
      },
      agreementName: {
        itemName: '协议管理',
        queryConfig: [
          { isInput: true, label: '协议管理编码', moduleBind: 'agreementNo' }
        ],
        btnObj
      },
      creditCompanyName: {
        itemName: '公司',
        queryConfig: [
          { isInput: true, label: '公司编码', moduleBind: 'companyCode' }
        ],
        btnObj
      }
    }),
    tabObj: _ => [
      { label: '抵(质)押物', name: 'pawn' },
      { label: '保证金(押金)', name: 'cashDeposit' },
      { label: '担保', name: 'guarantee' },
      { label: '无担保授信', name: 'unsecuredCreditGranting' },
      { label: '出口税金授信', name: 'exportTaxCredit' },
      { label: '出口价款授信', name: 'exportPriceCredit' }
    ]
  },
  methods: {
    /**
     * @method handlePageChange 分页处理
     * @method  closeDialog 关闭弹窗
     * @method  handlerSubPreservation 处理弹窗选中的数据
     * @method  rousePopover 唤醒弹出框及处理弹出框需要的数据
     */
    ...mapActions(['getExchange']),
    ...mapMutations(['addbreadCrumbsList']),
    async handlePageChange(data) {
      try {
        let {
          data: { list, count }
        } = await this.getClickTabData()[this.tabActiveName]({
          ...data,
          ...this.setTabRequestData()
        })
        this.tabTableData = list
        this.pagingCount = count
      } catch (error) {
        console.log(error)
      }
    },

    handlerFormVerify($refs) {
      this.verify = $refs
    },

    closeDialog() {
      if (!this.isShowPopover) return
      this.isShowPopover = !this.isShowPopover
    },

    async handlerSubPreservation(rowData) {
      let obj = this.ruleForm
      switch (this.currencySelectInputKey) {
        case 'customerName': {
          let {
            clientNo,
            clientName,
            registerCurrencyName,
            registerCurrency,
            exportMaxTaxLimit
          } = rowData
          this.ruleForm = {
            ...this.ruleForm,
            customerCode: clientNo,
            customerName: clientName,
            currencyName: registerCurrencyName,
            currency: registerCurrency,
            exchangeRate: this.exchangeRateList[registerCurrency],
            exportMaxTaxLimit: exportMaxTaxLimit
          }
          this.handlerlineOfCredit()
          this.getClickTabData()
          break
        }
        case 'agreementName': {
          this.ruleForm = {
            ...this.ruleForm,
            assignmentAgreement: rowData['agreementNo'],
            agreementName: rowData['agreementName']
          }
          break
        }
        case 'creditCompanyName': {
          this.ruleForm = {
            ...this.ruleForm,
            creditCompanyCode: rowData['companyCode'],
            creditCompanyName: rowData['companyName']
          }
          break
        }
      }
    },
    // 计算 选择委托方 的 总信用额度
    async handlerlineOfCredit() {
      try {
        let set = this.getClickTabData()
        const data = await Promise.all([
          set['pawn'](),
          set['cashDeposit'](),
          set['guarantee'](),
          set['unsecuredCreditGranting']({
            customerCode: this.ruleForm.customerCode,
            creditType: '1'
          }),
          set['exportTaxCredit']({
            customerCode: this.ruleForm.customerCode,
            creditType: '2'
          }),
          set['exportPriceCredit']({
            customerCode: this.ruleForm.customerCode,
            creditType: '3'
          })
        ])
        let creditTypeSet = data.slice(3)
        // 求 总信用 额度
        this.ruleForm.totalAmount = data.reduce((cur, { data: { list } }) => {
          return (cur += list.reduce((cur, pre) => {
            return (cur += +(
              pre['mortgageValue'] ||
              pre['depositsCurrency'] ||
              pre['ensureAmount'] ||
              pre['creditAmount'] ||
              0
            ))
          }, 0))
        }, 0)
        // 求[出口垫税，出口价款，非出口信用]额度
        creditTypeSet.forEach(({ data: { list } }, i) => {
          let len = !!list.length
          switch (i) {
            case 0:
              this.ruleForm.creditLimit = !len
                ? 0
                : list.reduce(
                    (cur, pre) => (cur += +(pre['creditAmount'] || 0)),
                    0
                  ) / 10000
              break
            case 1:
              this.ruleForm.exportMaxTaxLimit = !len
                ? 0
                : list.reduce(
                    (cur, pre) => (cur += +(pre['creditAmount'] || 0)),
                    0
                  ) / 10000
              break
            case 2:
              this.ruleForm.exportAmountLimit = !len
                ? 0
                : list.reduce(
                    (cur, pre) => (cur += +(pre['creditAmount'] || 0)),
                    0
                  ) / 10000
              break
          }
        }, this)
        // 求 折本位币
        this.ruleForm.homeCurrencyAmount =
          (this.ruleForm.totalAmount * this.ruleForm.exchangeRate) / 10000
        // 求 放贷授信额度金额
        this.ruleForm.creditLimitAmount =
          (this.ruleForm.totalAmount * this.ruleForm.creditLimitRate) / 10000
        this.ruleForm.totalAmount /= 10000
        this.tabDisbale = false
        // 清空 委托协议
        ;(this.ruleForm.agreementNo = ''), (this.ruleForm.agreementName = '')
      } catch (error) {
        console.log(error)
      }
    },

    async rousePopover(data) {
      if (data !== 'search' && !(data instanceof Object)) {
        this.searchType = data
        this.currencySelectInputKey = data
      }
      if (data === 'agreementName' && !this.ruleForm.customerCode) {
        this.$message({
          center: true,
          type: 'error',
          message: '请选择委托方'
        })
        return
      }
      const {
        data: { list, count }
      } = await this.btnClickAsync[this.searchType](
        data instanceof Object && data
      )
      this.dialogPaging = 0
      ;(this.popoverList = list), (this.dialogPaging = count)
      this.dialogData = {
        ...this.dialogData,
        ...this.setDialogTitleAndQuery[this.searchType]
      }
      this.popoverListKey = this.tableConfigBind[this.searchType]()
      this.isShowPopover = true
    },

    initValueBind() {
      const { formData = {}, status } = this.getActivePathData(this.$route.path)
      formData && (this.ruleForm = formData)
      this.jumpType = status
      this.jumpType == 'update' &&
        ((this.tabActiveName = 'pawn'), (this.tabATableTitle = '新增抵押物'))
      // this.setValue(this.ruleForm)
    },

    setValue(params) {
      // 初始化下拉框的value值转换
      for (let item of Object.keys(params)) {
        if (utools.setSelectKey()[item]) {
          this.ruleForm[item] = utools.setSelectKey()[item][params[item]]
        } else {
          this.ruleForm[item] = params[item]
        }
      }
    },

    async handlerTabClick({ name, ...obj } = (tab = {})) {
      /**
       * 1  设置弹窗标题
       * 2  点击清空table数据
       * 3  设置表格的键
       */
      this.tabATableTitle = this.popTitleObj[name]
      ;(this.tabTableData = []), (this.tableDataKey = [])
      this.tableDataKey = this.tableDataKeyObj[name]
      try {
        let {
          data: { list, count }
        } = await this.getClickTabData()[name](this.setTabRequestData())
        this.tabTableData = list
        this.pagingCount = count
      } catch (error) {
        console.log(error)
      }
    },

    setTabRequestData() {
      let data = { creditNo: this.ruleForm.creditNo }
      switch (this.tabActiveName) {
        case 'unsecuredCreditGranting':
          data = { customerCode: this.ruleForm.customerCode, creditType: '1' }
          break
        case 'exportTaxCredit':
          data = { customerCode: this.ruleForm.customerCode, creditType: '2' }
          break
        case 'exportPriceCredit':
          data = { customerCode: this.ruleForm.customerCode, creditType: '3' }
          break
        default:
          break
      }
      data.customerCode = this.ruleForm.customerCode
      return data
    },
    getClickTabData() {
      /**
       * @method cashDeposit 获取保证金分页查询列表
       * @method guarantee  担保单分页查询
       * @method unsecuredCreditGranting  无担保授信分页查询
       */
      return {
        pawn: _ => api.getPawnList({ debtorCode: this.ruleForm.customerCode }),
        cashDeposit: _ =>
          api.getCashDepositManagement({
            customerCode: this.ruleForm.customerCode
          }),
        guarantee: _ =>
          api.getEnsureManageList({
            securedUnitCode: this.ruleForm.customerCode
          }),
        unsecuredCreditGranting: (data = {}) => api.getNoEnsureManageList(data),
        exportTaxCredit: (data = {}) => api.getNoEnsureManageList(data),
        exportPriceCredit: (data = {}) => api.getNoEnsureManageList(data)
      }
    },
    async handlePreserve() {
      this.isLoading = true
      try {
        if (this.jumpType == 'add') {
          if (this.isVerify()) {
            const { data, status } = await api.addCredit(this.ruleForm)
            this.ruleForm = { ...this.ruleForm, status: data.status || '1' }
            this.tabActiveName = 'pawn'
            this.jumpType = 'update'
            utools.alertMessage.call(this, status)
          }
        } else {
          //  处理 表单 验证更新
          if (this.isVerify()) {
            const { data } = await api.changeCredit(this.ruleForm)
            data.toUpperCase() == 'OK' &&
              this.$message({
                message: '修改数据成功',
                type: 'success'
              })
            this.tabActiveName = 'pawn'
          } else {
            this.$message({
              message: '修改数据失败，请检查',
              type: 'warning'
            })
            return false
          }
        }
      } catch (error) {
        this.$message.error(error.message)
        console.log(error)
      } finally {
        this.isLoading = false
      }
    },
    isVerify() {
      let isVerify = false
      this.verify['formModel'].validate(valid => {
        isVerify = valid
      })
      return isVerify
    },
    handleRollback() {
      this.$router.push('M0306')
    },
    async initData() {
      api.initSelect(this.formConfig)
      if (this.jumpType == 'update') {
        let creditNo = this.ruleForm.creditNo
        let {
          data: { list, count }
        } = await this.getClickTabData()[this.tabActiveName]()
        this.tabTableData = list
      } else {
        // 修改时初始化操作
        // 新增时请求获取编码
        const { data } = await api.getCreditNo()
        this.ruleForm['creditNo'] = data
      }
    },
    async handlerTabDelete({ itemCode } = data) {
      if (!itemCode) return
      const { status } = await this.tabDeleteData()[this.tabActiveName](
        itemCode
      )
      status == 200
        ? this.$message({
            message: '删除成功',
            type: 'success',
            center: true
          })
        : this.$message({
            message: '删除失败',
            type: 'error',
            center: true
          })
    },
    // 页签下的删除按钮操作
    tabDeleteData() {
      return {
        pawn: data => api.deletePawnData(data)
      }
    }
  },
  created() {
    this.initValueBind()
    this.initData()
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.ruleForm, status: this.jumpType },
      path: this.$route.path
    })
    next()
  }
}
</script>
<style scoped lang='less'>
.loadingClass {
  position: relative;
  width: 100;
}

.form-layout {
  display: flex;
  flex-wrap: wrap;

  > div {
    flex-basis: 20vw;
    margin-bottom: 5px;
  }
}

.AddCreditBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.handleTableHeight {
  height: 48vh;
}

.btnBottom {
  margin-bottom: 10px;
}
</style>
