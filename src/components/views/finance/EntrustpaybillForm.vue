<template>
  <div class="entrustpaybill-form">
    <!-- 顶部操作按钮 -->
    <preserve-btn
      :form="form.data"
      :isLoading="topBtn.isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback=" ()=> $router.push({ path: '/M0801' }) "
    ></preserve-btn>

    <!-- 输入框 -->
    <form-component
      :formConfig="form.config"
      :formModel="form.data"
      @handlerFormVerify="handlerFormVerify"
      @handlerSearchClick="handlerSearchClick"
    >
      <!-- 插槽 start -->

      <!-- 委托订单 委托方 查询栏 -->
      <div class="order-search">
        <div class="btn-grid" v-if="status != 'update'">
          <el-button
            :key="item.type"
            @click.stop="handleSearchClick(item.type)"
            size="small"
            v-for="item of searchSet.btnObj"
          >{{item.label}}</el-button>
        </div>
        <select-table
          :count="searchSet.table.count"
          :dialog="false"
          :multipleTable.sync="searchSet.multipleTable"
          :popoverList="searchSet.table.list"
          :popoverListKey="searchSet.table.config"
          @handlePageChange="handleSearchPageChange"
          popoverType="selectTable"
        ></select-table>

        <!-- 页签 -->
        <div>
          <el-tabs type="card" v-model="tabs.active">
            <el-tab-pane label="代收款明细" name="collection"></el-tab-pane>
          </el-tabs>

          <!-- 子表 -->
          <div>
            <div class="item-btn" v-if="form.data.status != '2'">
              <el-button
                :key="item.key"
                @click.stop="handleItemBtnClick(item.key)"
                v-for="item of table.btnList"
              >{{item.label}}</el-button>
            </div>
            <table-component
              :activeRow.sync="table.activeRow"
              :isSubTable="true"
              :tableData="table.data"
              :tableDataKey="table.config"
            ></table-component>
            <pagination-component
              :count="table.count"
              @handlePageChange="handleItemTablePageChange"
            ></pagination-component>
          </div>
        </div>
      </div>
      <!-- 插槽 end -->
    </form-component>

    <!-- 表格弹窗 -->
    <table-dialog
      :btnObj="tableDialog.btnObj"
      :count="tableDialog.count"
      :formConfig="tableDialog.queryConfig"
      :isShowPopover="tableDialog.visible"
      :itemName="tableDialog.itemName"
      :popoverList="tableDialog.list"
      :popoverListKey="tableDialog.config"
      :ruleForm="tableDialog.ruleForm"
      @changeisShowPopover="closeTableDialog"
      @handleBtnClickType="handleTableDialog"
      @handlePageChange="handleTableDialog"
      @handlerSubPreservation="handlerTableDialogSubPreservation"
    ></table-dialog>
    <!-- form弹窗 -->
    <dialog-component
      :formData="{
        ruleForm: table.formDialog.data,
        formConfig: table.formDialog.formConfig
      }"
      :isShowPopover.sync="table.formDialog.visible"
      :itemName="table.formDialog.itemName"
      @formClickPreservation="handleItemDialogPreservation"
      popoverType="form"
    ></dialog-component>
  </div>
</template>
<script>
// 组件
import TableComponent from '@/components/common/TabTable.vue'
import FormComponent from '@/components/common/form-template/FormComponent.vue'
import SearchComponent from '@/components/common/finance-component/SearchComponent.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
import selectTable from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import DialogComponent from '@/components/common/Table.Form.Dialog/NewDialogComponent.vue'

// 配置
import formConfig from '@/domain/formconfig/finance/Entrustpaybill.js'
import EntrustpaybillItem from '@/domain/tableconfig/finance/EntrustpaybillItem.js'
import EntrustpaybillItemForm from '@/domain/formconfig/finance/EntrustpaybillItem.js'
import EntrustpaybillSearch from '@/domain/formconfig/finance/EntrustpaybillSearch.js'
import companyInfo from '@/domain/tableconfig/basicdata/CompanyInfo.js'
import customer from '@/domain/tableconfig/basicdata/Customer.js'
import employeeInfo from '@/domain/tableconfig/basicdata/EmployeeInfo.js'
import supplierBase from '@/domain/tableconfig/basicdata/SupplierBase.js'
import entrustOrder from '@/domain/tableconfig/commerce/EntrustOrder.js'
import receipt from '@/domain/tableconfig/finance/Receipt'
import supplierBank from '@/domain/tableconfig/basicdata/SupplierBank.js'

// 弹窗配置
import client from '@/domain/tableconfig/business/Client'

import utools from '@/domain/common/utools.js'
import api from '@/assets/js/appHelper.js'

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'entrustpaybillForm',

  created() {
    ;(async () => {
      // 业务类型下拉
      await api.getEnum('businessTypeG').then(result => {
        this.sellist = result.data
      })
      this.initData()
    })()
  },

  watch: {
    status: {
      handler(cur, pre) {
        if (cur === pre || !cur) return
        const isAdd = cur === 'add'
        utools.setFormConfig(this.form.config.list, [
          {
            key: 'entrustOrderNo',
            btn: isAdd
          }
        ])
      },
      deep: true,
      immediate: true
    },
    // 收款方变化时 清空 收款的信息
    'form.data.receiverUserName'(cur, pre) {
      if (!pre) return
      this.resetproceedsData()
    },
    'form.data.incidentalPayerType'(cur, pre) {
      if (!pre) return
      this.form.data = {
        ...this.form.data,
        incidentalPayer: '',
        incidentalPayerName: ''
      }
    },
    'form.data.serviceChargePayerType'(cur, pre) {
      if (!pre) return
      this.form.data = {
        ...this.form.data,
        serviceChargePayer: '',
        serviceChargeName: ''
      }
    },
    'form.data.payNature'(cur, pre) {
      if (!pre) return
      this.getStatistics()
    },
    'form.data.payMontyType'(cur, pre) {
      if (!cur) return
      this.getexchangeratetodata()
    },
    // 这里获取订单汇率
    'table.formDialog.data.reportGateType'(cur, pre) {
      if (!cur) return
      // 报关类型
      let sel = []
      const fn = new Map([
        ['1', item => +item.itemKey <= 2],
        ['2', item => +item.itemKey >= 3 && +item.itemKey <= 4],
        ['3', item => +item.itemKey === 2],
        ['4', item => +item.itemKey >= 5 && +item.itemKey <= 6]
      ]).get(this.table.formDialog.data.reportGateType)
      sel.push(...this.sellist.filter(fn))

      for (let con of this.table.formDialog.formConfig.list) {
        if (con.key == 'bizType') {
          con.selectOption = sel
        }
      }

      /*  if (this.table.formDialog.data.reportGateType == "1") {
         sel.push(...this.sellist.filter(item => +item.itemKey <= 2));
         sel.push(this.sellist[0]);
         sel.push(this.sellist[1]);
       }
       if (this.table.formDialog.data.reportGateType == "2") {
         sel.push(...this.sellist.filter(item => +item.itemKey >= 3 && +item.itemKey <= 4));
 
         sel.push(this.sellist[2]);
         sel.push(this.sellist[3]);
       }
       if (this.table.formDialog.data.reportGateType == "3") {
         sel.push(this.sellist[1]);
       }
       if (this.table.formDialog.data.reportGateType == "4") {
         sel.push(this.sellist[4]);
         sel.push(this.sellist[5]);
       } */
    }
  },

  computed: {
    ...mapGetters(['getActivePathData'])
  },

  data: _ => ({
    status: '',
    form: {
      data: {},
      config: utools.cloneObj(formConfig),
      example: {},
      searchTarget: ''
    },

    topBtn: {
      isLoading: false
    },

    tabs: {
      active: 'collection'
    },
    sellist: [], //业务类型下拉项
    table: {
      data: [],
      storageData: [],
      count: 0,
      config: EntrustpaybillItem,
      activeRow: {},
      btnList: [
        { label: '修改', visible: true, key: 'update' },
        { label: '删除', visible: true, key: 'remove' }
      ],
      formDialog: {
        visible: false,
        data: {},
        formConfig: utools.cloneObj(EntrustpaybillItemForm),
        itemName: '代收款明细'
      }
    },

    tableDialog: {
      visible: false,
      list: [],
      config: [],
      count: 0,
      ruleForm: {},
      queryConfig: [],
      itemName: '',
      btnObj: [{ type: 'search', label: '查询' }]
    },

    searchSet: {
      btnObj: [
        { type: 'search', label: '按订单单张导入' },
        { type: 'clientSearch', label: '按委托方批量导入' },
        { type: 'insert', label: '加入代收款明细' }
      ],
      btnTarget: '',
      table: {
        list: [],
        count: 0,
        config: EntrustpaybillSearch
      },
      multipleTable: []
    }
  }),

  components: {
    tableDialog: () => import('@/components/common/Popover.vue'),
    TableComponent,
    FormComponent,
    SearchComponent,
    PaginationComponent,
    selectTable,
    DialogComponent
  },

  beforeRouteLeave(to, from, next) {
    let param = {
      data: {
        status: this.status,
        formData: this.form.data
      },
      path: this.$route.path
    }
    this.status === 'add' &&
      (param.data = {
        ...param.data,
        itemTable: this.table,
        searchTable: this.searchSet.table,
        multipleTable: this.searchSet.multipleTable
      })
    this.addbreadCrumbsList(param)
    next()
  },

  methods: {
    ...mapMutations(['addbreadCrumbsList']),

    // 初始化表单
    initData() {
      const {
        code,
        formData,
        status,
        itemTable,
        searchTable,
        multipleTable
      } = this.getActivePathData(this.$route.path)
      this.status = status
      itemTable && (this.table = itemTable)
      searchTable && (this.searchSet.table = searchTable)
      code && ((this.form.data.billNo = code), this.getFormData(code)) // 获取主表单数据
      formData && (this.form.data = formData)
      status === 'update' && this.getitemTableData() // 获取子表信息
      status !== 'update' &&
        ((this.form.data.payType = '7'),
        (this.form.data.financeproject = '货款')) // 付款类型   financeproject为生成应收结算单的款项明细中文
      !this.form.data.billNo && this.getCode() // 获取单据编号
    },

    // 获取表单编码
    async getCode() {
      try {
        const { data } = await api.getEntrustpaybillCode()
        this.form.data = { ...this.form.data, billNo: data }
      } catch (error) {
        console.log(error)
      }
    },

    // 获取主单据data
    async getFormData(code) {
      try {
        const { data } = await api.getOneentrustpaybillData(code)
        this.form.data = data
      } catch (error) {
        this.$message({
          type: 'error',
          message: '获取单据数据失败，请刷新！'
        })
        console.log(error)
      }
    },

    // 获取子表数据(只有修改状态)
    async getitemTableData() {
      try {
        const {
          data: { list, count },
          advanceAmountCount = 0
        } = await api.getEntrustpaybillItemList({
          billNo: this.form.data.billNo
        })
        this.table = {
          ...this.table,
          data: this.utools.cloneObj(list.slice(0, 10)),
          count,
          storageData: list
        }
        this.getStatistics()
      } catch (error) {
        console.log(error)
      }
    },

    // 接受 from验证规则
    handlerFormVerify(obj) {
      this.form.example = obj
    },

    isVerify() {
      let isVerify = false
      isVerify = (() => {
        var is = Object.keys(this.form.example).map(function(item) {
          let res
          for (let elem of this.form.example[item]) {
            elem.validate(valid => {
              res = valid
            })
          }
          return res
        }, this)
        const findFalse = is.find(item => !item)
        return findFalse === undefined ? true : false
      })()

      return isVerify
    },

    // 保存表单
    async handlePreserve() {
      if (!this.isVerify()) {
        return
      }
      // 新增 和 修改的处理
      if (this.status === 'add' && !this.table.storageData.length) {
        this.$message({
          type: 'error',
          message: '请添加代收款明细'
        })
        return
      }
      // var flog = {};
      // this.table.storageData.forEach((e, i) => {
      //   if (e.needPay > e.needPayMax) {
      //     flog.data = true
      //     flog.text = e
      //   }
      // })
      // if (flog.data) {
      //   this.$message({
      //     type: 'error',
      //     message: '代收款明细：' + flog.text.billNo + '此次需付款金额不可超过' + flog.text.needPayMax
      //   })
      //   return
      // }
      let state = 200
      this.topBtn.isLoading = true
      try {
        let param = { data: this.form.data }
        this.status === 'add'
          ? (param.data.entrustpaybillItemList = this.table.storageData)
          : (param.method = 'PUT')
        const { status } = await api.changeEntrustpaybillData(param)
        this.status === 'add' && this.$set(this.form.data, 'status', '1')
        this.status = 'update'
        this.topBtn.isLoading = false
        this.utools.alertStatusMessage.call(this, {
          status: state,
          msg: { error: '保存失败，请重试!', success: '保存成功！' }
        })
      } catch (error) {
        this.topBtn.isLoading = false
        if (error.status == '500' && error.message) {
          this.$message({
            type: 'error',
            message: error.message
          })
          return
        }
        state = 0
        console.log(error)
      } finally {
        // this.topBtn.isLoading = false;
        // this.utools.alertStatusMessage.call(this, { status: state, msg: { 'error': '保存失败，请重试!', 'success': '保存成功！' } })
      }
    },

    // 操作栏位按钮  事件
    handleSearchClick(target) {
      this.searchSet.btnTarget = target
      switch (target) {
        case 'search':
          this.queryEntrustOrder()
          break
        case 'clientSearch':
          this.queryEntrust()
          break
        case 'insert':
          this.handleSearchClickInsert()
      }
    },

    // 按订单单张导入 事件
    queryEntrustOrder() {
      if (!this.form.data.entrustOrderNo) {
        this.$message({
          type: 'warning',
          message: '请先输入委托订单号!'
        })
        return
      }

      this.getEntrustOrderData({
        entrustOrderNo: this.form.data.entrustOrderNo
      })
    },

    // 查询委托订单
    async getEntrustOrderData(data = {}) {
      let param =
        Object.prototype.toString.call(data).slice(8, -1) === 'Object'
          ? data
          : {}
      try {
        const {
          data: { list, count }
        } = await api.queryentrustorderSearch(param)
        this.searchSet.table = { ...this.searchSet.table, list, count }
      } catch (error) {
        console.log(error)
      }
    },

    // 按委托方查询查询委托订单 事件
    queryEntrust(data) {
      let param = typeof data === 'object' ? data : {}
      if (!this.form.data.delegete) {
        this.$message({
          type: 'warning',
          message: '请先输入委托方!'
        })
        return
      }
      this.getEntrustOrderData({
        ...param,
        clientCode: this.form.data.delegete,
        withoutEnPayment: true,
        status: '2'
      })
    },

    // 按委托方查询查询 分页事件
    handleSearchPageChange(data = {}) {
      this.queryEntrust(data)
    },

    // 点击加入代收款明细 事件
    async handleSearchClickInsert() {
      const list = this.searchSet.multipleTable
      if (!list.length) {
        this.$message({
          type: 'warning',
          message: '请先选择你需要加入的委托订单！'
        })
        return
      }
      const supplierCode = list[0].supplierCode
      if (!list.every(item => item.supplierCode === supplierCode)) {
        this.$message({
          type: 'warning',
          message: '请保证所选的订单是同一个供应商！'
        })
        return
      }
      if (!this.form.data.payMoneyRMBexchangeRate) {
        this.$message({
          type: 'warning',
          message: '请选择单据付款币别！'
        })
        return
      }
      try {
        //   只是查询对应   没有保存子表   只有新建单据可触发操作
        const { data } = await api.insertEntrustpaybillItemData({
          ...this.form.data,
          entrustOrderNos: list.map(item => item.entrustOrderNo)
        })
        var sdata = data
        // 汇差金额=卖方销售金额*主表 付款币别：人民币汇率 --卖方销售金额*汇率(卖方销售)
        if (!this.form.data.payMoneyRMBexchangeRate) {
          this.$message({
            type: 'warning',
            message: '请选择单据付款币别！'
          })
          return
        }
        sdata.forEach(e => {
          e.remittanceAmount =
            (e.sellerAmount - e.sellerAmount || 0) *
            this.form.data.payMoneyRMBexchangeRate
        })
        this.table.storageData = sdata
        console.log(sdata)
        this.table = {
          ...this.table,
          data: this.utools.cloneObj(sdata.slice(0, 10)),
          count: sdata.length,
          storageData: sdata
        }
        this.getStatistics()
      } catch (error) {
        this.$message({
          type: 'error',
          message: '加入待付款失败，请重试！'
        })
        console.log(error)
      }
    },

    // 代收款明细子表按钮事件
    handleItemBtnClick(key) {
      if (!Object.keys(this.table.activeRow).length)
        return this.$message({
          type: 'warning',
          message: '请选中你所需要操作的数据！'
        })

      if (key === 'remove') {
        this.handlerRemoveItemTable()
      } else {
        this.table.formDialog = {
          ...this.table.formDialog,
          visible: true,
          data: this.utools.cloneObj(this.table.activeRow)
        }
      }
    },

    // 子表修改
    async handleItemDialogPreservation() {
      if (this.status === 'add') {
        const { itemCode } = this.table.formDialog.data,
          fn = item => item.itemCode === itemCode,
          index = this.table.data.findIndex(fn),
          sIndex = this.table.storageData.findIndex(fn)
        if (~index) {
          let data = this.table.formDialog.data
          this.table.data[index] = data
          this.table.storageData[sIndex] = data
          this.table.data = [...this.table.data]
          this.table.formDialog.visible = false
          this.$message({ type: 'success', message: '修改成功' })
        }
        this.getStatistics()
      } else {
        try {
          const { data } = await api.updateEntrustpaybillItem(
            this.table.formDialog.data
          )
          this.table.formDialog.visible = false
          this.getitemTableData()
          this.$message({ type: 'success', message: '修改成功' })
        } catch (error) {
          if (error.status == '400' && error.message) {
            this.$message({
              type: 'error',
              message: error.message
            })
          } else {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
            console.log(error)
          }
        }
      }
    },

    // 代收款明细删除
    handlerRemoveItemTable() {
      if (this.table.data.length <= 1) {
        return this.$message({
          type: 'warning',
          message: '至少保留一条代收款明细！'
        })
      }
      utools.deleteMessage.call(this, async () => {
        let sCode = 200
        try {
          if (this.status === 'add') {
            const { itemCode } = this.table.activeRow
            this.table.data.splice(
              (() =>
                this.table.data.findIndex(
                  item => item.itemCode === itemCode
                ))(),
              1
            )
            this.table.storageData.splice(
              (() =>
                this.table.storageData.findIndex(
                  item => item.itemCode === itemCode
                ))(),
              1
            )
            this.getStatistics()
          } else {
            const { data } = await api.removeEntrustpaybillItem(
              this.table.activeRow.itemCode
            )
            this.getitemTableData()
          }
        } catch (error) {
          sCode = 0
          console.log(error)
        } finally {
          this.$message({
            type: sCode ? 'success' : 'error',
            message: sCode ? '删除成功！' : '删除失败，请重试！'
          })
        }
      })
    },

    // 分页
    handleItemTablePageChange({ pageIndex = 1, pageSize = 10 } = {}) {
      if (this.status === 'add') {
        const index = (pageIndex - 1) * pageSize
        this.table.data = this.utools.cloneObj(
          this.table.storageData.slice(index, pageSize)
        )
      }
    },

    // 点选
    handlerSearchClick(target) {
      this.form.searchTarget = target
      /* 弹窗限制 */
      if (target === 'payeeAccount' && !this.form.data.receiverUser)
        return this.$message({
          type: 'warning',
          message: '请先完成收款方！'
        })

      if (target === 'receiptsBill' && !this.form.data.delegeteName)
        return this.$message({
          type: 'warning',
          message: '请先完成委托方！'
        })

      if (target === 'receiverUserName' && !(this.table.data[0] || {}).backCode)
        return this.$message.warning('请添加代收款明细')

      if (target === 'receiptsBill' && !this.form.data.delegeteName)
        return this.$message({
          type: 'warning',
          message: '请选录入委托单号！'
        })
      this.setTableDialog(target)
      this.handleTableDialog()
    },

    // 设置表格弹窗
    setTableDialog(target) {
      let input = [{ isInput: true, label: '编码', moduleBind: '' }],
        [one] = input,
        itemName
      let initCompanyInfo = {
          itemName: '',
          config: companyInfo,
          queryBar: [{ isInput: true, label: '公司名称',moduleBind: 'companyName' }]
        },
        initClient = {
          itemName: '',
          config: client,
          queryBar: []
        },
        initSupplierBase = {
          itemName: '供应商',
          config: supplierBase,
          queryBar: [{isInput: true,label: '名称',moduleBind: 'supplierName'}]
        },
        cost = {
          // 费用承担方
          '1': {
            ...initCompanyInfo,
            itemName: '公司'
          },
          '2': {
            ...initClient,
            itemName: '委托方',
            queryBar: [{ isInput: true, label: '委托方名称', moduleBind: 'clientName' }]
          },
          '3': { itemName: '客户', config: customer, queryBar: [{isInput: true, label: '客户名称',moduleBind: 'customerName'}] },
          '4': {
            itemName: '业务员',
            config: employeeInfo,
            queryBar: [{isInput: true,label: '名字',moduleBind: 'employeeInfoName'}]
          },
          '7': {
            itemName: '供应商',
            config: supplierBase,
            queryBar: [{isInput: true,label: '供应商名称', moduleBind: 'supplierName'}]
          }
        }
      // 配置
      let config = {
        delegeteName: { ...initClient, itemName: '委托方' },
        entrustOrderNo: {
          itemName: '委托订单',
          config: entrustOrder,
          queryBar: [{ ...one, moduleBind: 'entrustOrderNo' }]
        },
        trusteeName: { ...initCompanyInfo, itemName: '受托方' },
        agentName: {
          ...initCompanyInfo,
          itemName: '代理方',
          queryBar: [
            {
              isInput: true,
              label: '名称',
              moduleBind: 'companyName'
            }
          ]
        },
        serviceChargeName: cost,
        receiverUserName: {
          ...initSupplierBase,
          itemName: '收款方用户名'
        },
        receiptsBill: {
          itemName: '收款单',
          config: receipt,
          queryBar: [{isInput: true, label: '收款单号',moduleBind:'billNo'}]
        },
        incidentalPayerName: cost,
        payeeAccount: {
          itemName: '银行信息',
          config: supplierBank,
          queryBar: []
        }
      }
      this.tableDialog = {
        ...this.tableDialog,
        ...this.settableDialogColumn(target, config[target]),
        visible: true,
        list: [],
        count: 0,
        ruleForm: {}
      }
    },

    // 表格弹窗 请求数据
    handleTableDialog: (() => {
      let clientProt = api.queryclientSearch,
        companyInfoProt = api.querycompanyinfoSearch,
        customerProt = api.getCustomerList,
        employeeinfoProt = api.queryemployeeinfoSearch,
        supplierProt = api.querysupplierbaseSearch,
        cost = {
          //手续费承担方 杂费承担方 根据 手续费承担方类型 调用不同接口
          '1': companyInfoProt,
          '2': clientProt,
          '3': customerProt,
          '4': employeeinfoProt,
          '7': supplierProt
        },
        port = {
          entrustOrderNo: api.queryincompletepayment,
          delegeteName: clientProt, // 委托方
          trusteeName: companyInfoProt, // 受托方
          agentName: companyInfoProt, // 代理费
          serviceChargeName: cost,
          receiverUserName: supplierProt,
          receiptsBill: api.queryReceiptSearch,
          incidentalPayerName: cost,
          payeeAccount: api.querysupplierbankSearch
        }
      return async function(param = {}) {
        console.log(this.form.searchTarget)

        const paramData =
          Object.prototype.toString.call(param).slice(8, -1) === 'Object'
            ? param
            : {}
        try {
          const target = this.form.searchTarget
          const {
            data: { list, count }
          } = await this.setRequestPort(target, port[target]).call(
            api,
            this.setTableDialogRequestParam(target, paramData)
          )
          ;(this.tableDialog.list = list), (this.tableDialog.count = count)
        } catch (error) {
          this.$message({
            type: 'error',
            message: '获取数据失败，请重试！'
          })
          console.log(error)
        }
      }
    })(),

    // 设置表格弹窗的请求接口
    setRequestPort(target, config) {
      // 业务场景配置接口
      let requestConfig = {
        serviceChargeName: config[this.form.data.serviceChargePayerType], // 手续费承担方的处理
        incidentalPayerName: config[this.form.data.incidentalPayerType] // 赞费承担方的处理
      }
      return target in requestConfig ? requestConfig[target] : config
    },

    // 设置表格弹窗请求参数
    setTableDialogRequestParam(target, paramData) {
      const WHITE_LIST = ['agentName']
      WHITE_LIST.includes(target) && (paramData.status = '2')
      let obj = {
        delegeteName: () => (paramData.hasEntPayment = true),
        payeeAccount: () => (paramData.billNo = this.form.data.receiverUser),
        serviceChargeName: () =>
          this.form.data.serviceChargePayerType !== '2' &&
          (paramData.status = '2'),
        incidentalPayerName: () =>
          this.form.data.incidentalPayerType !== '2' &&
          (paramData.status = '2'),
        entrustOrderNo: () => ({}), // 查询未全部委托付款的委托订单
        receiptsBill: () => (
          (paramData.status = '2'),
          (paramData.hasSub = true),
          (paramData.payer = this.form.data.delegete)
        ),
        receiverUserName: () =>
          (paramData.supplierCode = (this.table.data[0] || {}).backCode) // 查询当前代收款明细中的卖方（供应商）
      }
      target in obj && obj[target]()
      return { ...paramData, ...this.tableDialog.ruleForm }
    },

    // 设置表格弹窗的列
    settableDialogColumn(target, config) {
      let obj = {
        serviceChargeName: config[this.form.data.serviceChargePayerType],
        incidentalPayerName: config[this.form.data.incidentalPayerType]
      }
      let param = target in obj ? obj[target] : config
      // 设置查询条件
      param.queryConfig = param.queryBar

      return param
    },

    // 表格点击确定后取数
    handlerTableDialogSubPreservation({
      entrustOrderNo,
      clientCode,
      matPayment,
      clientName,
      trusteeCode,
      trusteeName,
      billNo,
      receiptsAmount,
      receiveBank,
      supplierCode,
      supplierName,
      national,
      cityName,
      fax,
      bankNo,
      bankName,
      bankArea,
      bankAddress,
      companyCode,
      companyName,
      clientNo,
      customerNo,
      customerName,
      employeeInfoCode,
      employeeInfoName,
      supplierCurrency
    } = {}) {
      const target = this.form.searchTarget

      let servicePayer =
          new Map([
            // 服务费的选择
            ['1', [companyCode, companyName]],
            ['2', [clientNo, clientName]],
            ['3', [customerNo, customerName]],
            ['4', [employeeInfoCode, employeeInfoName]],
            ['7', [supplierCode, supplierName]]
          ]).get(
            this.form.data[
              target === 'serviceChargeName'
                ? 'serviceChargePayerType'
                : 'incidentalPayerType'
            ]
          ) || [],
        strategy = {
          delegeteName: {
            delegeteName: clientName,
            delegete: clientNo
          },
          entrustOrderNo: {
            entrustOrderNo,
            delegeteName: clientName,
            delegete: clientCode,
            trusteeName,
            trustee: trusteeCode,
            agentName: trusteeName,
            agent: trusteeCode,
            payMontyType: supplierCurrency,
            payNature: matPayment ? '1' : '2'
          },
          receiptsBill: {
            receiptsBill: billNo,
            receiptsAmount,
            ownReceiveBankName: receiveBank
          },
          agentName: { agent: companyCode, agentName: companyName },
          receiverUserName: {
            receiverUser: supplierCode,
            receiverUserName: supplierName,
            country: national,
            city: cityName,
            payeeFax: fax
          },
          payeeAccount: {
            payeeAccount: bankNo,
            receiveBank: bankName,
            destination: bankArea,
            receiveBankAddress: bankAddress
          },
          serviceChargeName: {
            serviceChargePayer: servicePayer[0],
            serviceChargeName: servicePayer[1]
          },
          incidentalPayerName: {
            incidentalPayer: servicePayer[0],
            incidentalPayerName: servicePayer[1]
          }
        }[target]
      this.form.data = { ...this.form.data, ...strategy }
      // 保存后的后续操作
      this.saveTableDialogFollowUp(target)
    },

    // 收款方变化时清空收款人
    resetproceedsData() {
      this.form.data = {
        ...this.form.data,
        payeeAccount: '',
        receiveBank: '',
        destination: '',
        receiveBankAddress: ''
      }
    },

    // 表格弹窗保存后的后续处理
    saveTableDialogFollowUp(target) {
      let obj = {
        entrustOrderNo: () => (
          // 点击对象为委托订单时清空 查询表格的数据
          (this.searchSet.table = {
            ...this.searchSet.table,
            list: [],
            count: 0
          }),
          (this.table = {
            ...this.table,
            data: [],
            storageData: [],
            count: 0
          })
        ),
        receiverUserName: () => this.getSupplierfinanceData(),
        payeeAccount: () => this.handleAccountBeenPaidChecked()
      }
      target in obj && obj[target]()
    },
    // 处理账号是否付过勾选动作
    async handleAccountBeenPaidChecked() {
      try {
        const {
          data: { count }
        } = await api.getEntrustpaybillData({
          payeeAccount: this.form.data.payeeAccount
        })
        count && this.$set(this.form.data, 'accountBeenPaid', true)
      } catch (error) {
        console.log(error)
      }
    },

    // 获取单条 供应商的财务资料
    async getSupplierfinanceData() {
      try {
        const {
          data: { settlementType, moblephone }
        } = await api.getOneSupplierfinanceData(this.form.data.receiverUser)
        this.form.data = {
          ...this.form.data,
          settlementMethod: settlementType,
          payeePhone: moblephone
        } /* 欠缺一个开票名称 2019-6-27 */
      } catch (error) {
        this.$message({
          type: 'error',
          message: '获取该收款方的财务资料信息失败，请重新选择收款方!'
        })
        console.log(error)
      }
    },

    // 关闭表格弹窗
    closeTableDialog() {
      ;(this.tableDialog.ruleForm = {}), (this.tableDialog.visible = false)
    },

    // 统计金额
    getStatistics() {
      var mun = 0
      this.table.storageData.map(e => {
        mun += e.needPay || 0
      })
      if (this.form.data.payNature == '1') {
        this.form.data.advancePaymentAmount = mun
        this.form.data.payForOthersAmount = ''
      } else {
        this.form.data.advancePaymentAmount = ''
        this.form.data.payForOthersAmount = mun
      }
      this.form.data = { ...this.form.data }
    },

    // 查询 付款币别：人民币汇率 汇率
    async getexchangeratetodata() {
      // this.form.data.payMoneyRMBexchangeRate = ''
      if (this.form.data.createTime) {
        // 建单日期
        var time = this.form.data.createTime.slice(0, 10)
      } else {
        // 当前日期
        var time = new Date().toJSON().slice(0, 10)
      }
      // 选择的币别（中文）
      var currency = ''
      for (let con of this.form.config.list) {
        if (con.key == 'payMontyType') {
          if (con.selectOption.length) {
            currency =
              con.selectOption[this.form.data.payMontyType - 1].itemValue || ''
          }
        }
      }
      if (!currency) return
      if (currency == '人民币') {
        this.form.data.payMoneyRMBexchangeRate = '1.0000'
        return
      }
      try {
        const vdata = await api.gettimeExchangerate(time)
        var list = vdata.data
        for (let i = 0; i < list.length; i++) {
          var exchangerate = ''
          list.forEach(b => {
            if (currency == b.currency) {
              exchangerate = b.cenPrice
            }
          })
          this.form.data.payMoneyRMBexchangeRate = exchangerate
          this.form.data = { ...this.form.data }
          return
        }
        this.$message.warning('请录入系统汇率')
      } catch (e) {
        console.log(e)
      }
    }
  },

  beforeDestroy() {
    this.handlerSearchClick = null
  }
}
</script>
<style lang="less">
.entrustpaybill-form {
  .item-btn {
    margin-bottom: 20px;
  }
  .order-search {
    padding: 20px 0;
    box-sizing: border-box;
    border-top: 1px solid #eaebec;
  }
  /*  .btn-grid {
        display: grid;
        padding: 0 20px;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
    } */
}
</style>
