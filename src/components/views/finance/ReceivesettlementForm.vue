<template>
  <div class="receivesettlement-form">
    <!-- 操作按钮 -->
    <preserve-btn
      :form="form.data"
      :isLoading="form.isLoading"
      @handlePreserve="handlePreserve"
      @handleRollback="handlebackspacing"
    ></preserve-btn>
    <!-- 表单 -->
    <form-component
      :formModel="form.data"
      :inputKey="form.config"
      @handlerFormConfigClickSearch="handlerSearchClick"
    ></form-component>
    <!-- 页签 -->
    <div style="margin-top: 20px;">
      <el-tabs @tab-click="handleClick" type="card" v-model="active">
        <el-tab-pane label="项目明细" name="chargeinformation"></el-tab-pane>
        <el-tab-pane label="物料信息" name="materialinformation"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 表格 -->
    <table-component :isSubTable="true" :tableData="tableDataList" :tableDataKey="table.config"></table-component>
    <!-- 分页 -->
    <pagination :count="table.data.count" @handlePageChange="handleChange" ref="pagination"></pagination>
    <!-- 表格弹窗 -->
    <popover-component
      :btnObj="tableDialog.btnObj"
      :count="tableDialog.data.count"
      :currencySelectInputKey="tableDialog.itemKey"
      :formConfig="tableDialog.queryConfig"
      :isShowPopover="tableDialog.isshow"
      :itemName="tableDialog.itemName"
      :popoverList="tableDialog.data.list"
      :popoverListKey="tableDialog.config"
      :ruleForm="tableDialog.ruleForm"
      @changeisShowPopover="closeTableDialog"
      @handleBtnClickType="handleTableDialogClick"
      @handlePageChange="handlePageChange"
      @handlerSubPreservation="tableDialogPreservation"
    ></popover-component>
  </div>
</template>
<script>
// 组件
import FormComponent from '@/components/common/FormConfig.vue'
import TableComponent from '@/components/common/TabTable.vue'
import Pagination from '@/components/common/Pagination'
import PopoverComponent from '@/components/common/Popover.vue'
import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'

// 表单表格
import entities from '@/domain/entities/finance/Receivesettlement'
import formConfig from '@/domain/formconfig/finance/Receivesettlement'
// 子表
import entitiesOne from '@/domain/entities/finance/ReceivesettlementMateriel'
import tableConfigOne from '@/domain/tableconfig/finance/ReceivesettlementMateriel'
import formConfigOne from '@/domain/formconfig/finance/ReceivesettlementMateriel'
import entitiesTwo from '@/domain/entities/finance/ReceivesettlementFee'
import tableConfigTwo from '@/domain/tableconfig/finance/ReceivesettlementFee'
import formConfigTwo from '@/domain/formconfig/finance/ReceivesettlementFee'
// 弹窗
import entrustOrder from '@/domain/tableconfig/commerce/EntrustOrder.js'
import SupplierBase from '@/domain/tableconfig/basicdata/SupplierBase.js'
import Client from '@/domain/tableconfig/business/Client.js'
import Customer from '@/domain/tableconfig/basicdata/Customer.js'
import CompanyInfo from '@/domain/tableconfig/basicdata/CompanyInfo.js'
import Department from '@/domain/tableconfig/system/Department.js'
import taxTypeName from '@/domain/tableconfig/basicdata/TaxCategory.js'
import FinanceProject from '@/domain/tableconfig/basicdata/FinanceProject'

import { mapMutations, mapGetters } from 'vuex'
import { async, Promise } from 'q'
export default {
  components: {
    FormComponent,
    TableComponent,
    Pagination,
    PopoverComponent
  },
  data: () => ({
    form: {
      config: utools.cloneObj(formConfig),
      data: new entities(),
      isLoading: false
    },
    active: 'chargeinformation',
    tableOne: {
      config: tableConfigOne,
      data: {
        alllist: [],
        count: 0
      },
      ruleForm: {},
      rowData: {}
    },
    tableTwo: {
      config: tableConfigTwo,
      data: {
        alllist: [],
        count: 0
      },
      ruleForm: {},
      rowData: {}
    },
    tableDialog: {
      config: [],
      data: {
        list: [],
        count: 0
      },
      itemKey: '',
      itemName: '',
      queryConfig: [],
      btnObj: [{ type: 'search', label: '查询' }],
      ruleForm: {},
      isshow: false
    },
    // 单：价税合计+服务费+杂费（代理报检费和检疫费）
    single: [
      ...tableConfigOne,
      {
        prop: 'priceTax',
        label: '价税合计',
        width: '100'
      },
      {
        prop: 'serviceFee',
        label: '服务费',
        width: '100'
      },
      {
        prop: 'costAmount',
        label: '运保杂费额',
        width: '100'
      }
    ],
    // 双：服务费+杂费
    double: [
      ...tableConfigOne,
      {
        prop: 'serviceFee',
        label: '服务费',
        width: '100'
      },
      {
        prop: 'costAmount',
        label: '运保杂费额',
        width: '100'
      }
    ],
    // 	本港 :  货值（转人命币）+服务费+杂费
    other: [
      ...tableConfigOne,
      {
        prop: 'sellerGoodsValue',
        label: '卖方货价',
        width: '100'
      },
      {
        prop: 'serviceFee',
        label: '服务费',
        width: '100'
      },
      {
        prop: 'costAmount',
        label: '运保杂费额',
        width: '100'
      }
    ]
  }),
  computed: {
    ...mapGetters(['getActivePathData']),
    table() {
      if (this.active == 'materialinformation') {
        return this.tableOne
      } else {
        return this.tableTwo
      }
    },
    tableDataList() {
      let pageIndex = this.table.ruleForm.pageIndex || 1
      let pageSize = this.table.ruleForm.pageSize || 10
      let start = (pageIndex - 1) * pageSize
      let end = pageIndex * pageSize
      return this.table.data.alllist.slice(start, end) || []
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    // 保存主表
    async handlePreserve() {
      try {
        this.isLoading = true
        const { data, status } = await api.editreceivesettlementData(
          this.form.data
        )
        if (status) {
          this.$message.success('操作成功')
        }
      } catch (e) {
        this.$message.error('操作失败，请重试！')
      } finally {
        this.isLoading = false
      }
    },
    // 返回
    handlebackspacing() {
      this.$router.push('M0805')
    },
    // 查询子表
    async getItemdetail() {
      let rule = {
        billNo: this.form.data.billNo,
        pageIndex: null,
        pageSize: null
      }
      let getListOne = async _ => {
        const { data, status } = await api.queryreceivesettlementMaterielSearch(
          rule
        )
        this.tableOne.data.alllist = JSON.parse(JSON.stringify(data.list))
        this.tableOne.data.count = data.count
      }
      let getListTow = async _ => {
        const {
          data: { list = [], count = 0 },
          status
        } = await api.queryreceivesettlementFeeSearch(rule)
        this.tableTwo.data.alllist = JSON.parse(JSON.stringify(list))
        this.tableTwo.data.count = count
      }
      try {
        await Promise.all([getListTow(), getListOne()])
        this.table.data = { ...this.table.data }
        // 通过委托单类型修改表配置
        const { data, status } = await api.searchOneentrustorderData(
          this.form.data.delegeteBillNo
        )
        if (data.entrustOrderType && data.bizType) {
          if (data.entrustOrderType == 1 || data.entrustOrderType == 2) {
            if (data.bizType == 1 || data.bizType == 3) {
              this.tableOne.config = this.single // 单抬头
            } else {
              this.tableOne.config = this.double // 双抬头
            }
          } else {
            this.tableOne.config = this.other // 其他
          }
        }
      } catch (e) {
        this.$message.error('查询失败')
      }
    },
    // 切换子表
    handleClick() {
      this.$refs['pagination'].currentPage = 1
      this.table.ruleForm.pageIndex = 1
      this.table.data = { ...this.table.data }
    },
    // 表格切换页码
    handleChange(paper) {
      this.table.ruleForm.pageIndex = paper.pageIndex
      this.table.ruleForm.pageSize = paper.pageSize
      this.table.data = { ...this.table.data }
    },
    // 点选
    async handlerSearchClick(key) {
      let port = {
        delegeteBillNo: (data = {}) => api.queryentrustorderSearch(data),
        clientName: (data = {}) => api.queryclientSearch(data),
        customerName: (data = {}) => api.getCustomerList(data),
        companyName: (data = {}) => api.getCreditCompanyNameData(data),
        salesGroup: (data = {}) => api.getCreditCompanyNameData(data),
        taxCategoryName: (data = {}) => api.getTaxCategoryList(data),
        feeProjectName: (data = {}) => api.getFinanceProject(data)
      }
      const WHITE_LIST = [
        'customerName',
        'companyName',
        'salesGroup',
        'taxCategoryName'
      ]
      const REQ_DATA = {
        ...this.tableDialog.ruleForm,
        status: WHITE_LIST.includes(key) ? '2' : ''
      }
      try {
        const {
          data: { list, count }
        } = await port[key](REQ_DATA)
        this.tableDialog.data.list = list
        this.tableDialog.data.count = count
      } catch (e) {
        this.$message.error('接口未配置或获取数据失败，请重试！')
        console.log(e)
        return
      }
      let dialogconfig = {
        delegeteBillNo: {
          config: entrustOrder,
          itemKey: key,
          itemName: '委托订单',
          queryConfig: [
            {
              label: '委托订单编码',
              moduleBind: 'entrustOrderNo',
              isInput: true
            }
          ],
          isshow: true
        },
        clientName: {
          config: Client,
          itemKey: key,
          itemName: '委托方',
          queryConfig: [
            {
              label: '委托方编码',
              moduleBind: 'clientNo',
              isInput: true
            }
          ],
          isshow: true
        },
        customerName: {
          config: Customer,
          itemKey: key,
          itemName: '客户',
          queryConfig: [
            {
              label: '客户编码',
              moduleBind: 'customerNo',
              isInput: true
            }
          ],
          isshow: true
        },
        companyName: {
          config: CompanyInfo,
          itemKey: key,
          itemName: '公司',
          queryConfig: [
            {
              label: '公司编码',
              moduleBind: 'storeOrgCode',
              isInput: true
            }
          ],
          isshow: true
        },
        taxCategoryName: {
          config: taxTypeName,
          itemKey: key,
          itemName: '税种',
          queryConfig: [
            {
              label: '税种编码',
              moduleBind: 'billCode',
              isInput: true
            }
          ],
          isshow: true
        },
        salesGroup: {
          config: CompanyInfo,
          itemKey: key,
          itemName: '组织',
          queryConfig: [
            {
              label: '组织编码',
              moduleBind: 'storeOrgCode',
              isInput: true
            }
          ],
          isshow: true
        },
        feeProjectName: {
          config: FinanceProject,
          itemKey: key,
          itemName: '计费项目',
          queryConfig: [
            {
              label: '计费项目编码',
              moduleBind: 'financeProjectCode',
              isInput: true
            }
          ],
          isshow: true
        }
      }
      this.tableDialog = { ...this.tableDialog, ...dialogconfig[key] }
    },
    // 表格弹窗顶部查询事件
    handleTableDialogClick() {
      this.tableDialog.ruleForm.pageIndex = 1
      this.handlerSearchClick(this.tableDialog.itemKey)
    },
    //  表格弹窗切换页码
    handlePageChange(paper) {
      this.tableDialog.ruleForm.pageIndex = paper.pageIndex
      this.tableDialog.ruleForm.pageSize = paper.pageSize
      this.handlerSearchClick(this.tableDialog.itemKey)
    },
    // 点选回调
    async tableDialogPreservation(rowData, key) {
      if (key && rowData) {
        switch (key) {
          case 'delegeteBillNo':
            delete rowData['status']
            delete rowData['statusName']
            this.form.data = { ...this.form.data, ...rowData }
            this.form.data[key] = rowData['entrustOrderNo']
            this.form.data['customer'] = rowData['customerCode']
            this.form.data['customerName'] = rowData['customerName']
            this.form.data['receiveDate'] = rowData['advanceReceivableDate']
            this.form.data['settleCurrency'] = rowData['supplierCurrency']
            this.form.data['company'] = rowData['trusteeCode']
            this.form.data['companyName'] = rowData['trusteeName']
            this.form.data['paymentType'] = rowData['receivableMethod']
            this.form.data['settlementMethod'] = rowData['settlementMethod']
            this.form.data['salesGroupCode'] = rowData['departmentCode']
            this.form.data['salesGroup'] = rowData['purchaseUnitName']
            this.form.data['totalAmount'] = rowData['vatTotalAmount']
            this.form.data['declareCustoms'] = rowData['reportGateType']
            this.form.data['bizReceivable'] = rowData['totalServiceCharge']
            this.form.data['financialReceivables'] = rowData['advanceAmount']
            this.form.data['client'] = rowData['clientCode'] // 委托方
            this.form.data['customer'] = rowData['customerCode'] //客户
            break
          case 'clientName':
            this.form.data['client'] = rowData['clientNo']
            this.form.data[key] = rowData[key]
            break
          case 'customerName':
            this.form.data['customer'] = rowData['customerNo']
            this.form.data[key] = rowData[key]
            break
          case 'companyName':
            this.form.data['company'] = rowData['customerNo']
            this.form.data[key] = rowData[key]
            break
          case 'taxCategoryName':
            this.form.data['taxCategory'] = rowData['billCode']
            this.form.data[key] = rowData[key]
            break
          case 'salesGroup':
            this.form.data['salesGroupCode'] = rowData['companyCode']
            this.form.data[key] = rowData['companyName']
            break
          case 'feeProjectName':
            this.formDialog.ruleForm['feeProject'] =
              rowData['financeProjectCode']
            // this.formDialog.ruleForm[key] = rowData["financeProjectName"];
            break
          default:
            this.form.data[key] = rowData[key]
            break
        }
        this.form.data = { ...this.form.data }
        // this.formDialog.ruleForm = { ...this.formDialog.ruleForm };
      }
    },
    // 关闭表格弹窗回调
    closeTableDialog() {
      if (!this.tableDialog.isshow) return
      this.tableDialog.isshow = !this.tableDialog.isshow
      this.tableDialog.ruleForm = {}
    }
  },
  async created() {
    api.initSelect(this.form.config)
    const { formData = {}, status = '' } =
      this.getActivePathData(this.$route.path) || {}
    if (formData) {
      Object.assign(this.form.data, formData)
    }
    this.getItemdetail()
  },
  beforeRouteLeave(to, form, next) {
    this.addbreadCrumbsList({
      data: {
        formData: this.form.data
      },
      path: this.$route.path
    })
    next()
  }
}
</script>
<style  lang="less">

</style>
