<template>
  <!-- 网上订单 -->
  <div>
    <breadcrumb-navigation />
    <query-bar
      :formConfig='queryBar.grid'
      :ruleForm='queryBar.data'
      @handleBtnClickType='queryBtnClickType'
    ></query-bar>
    <table-component
      :tableData='table.tableData'
      :tableDataKey='table.tableDataKey'
      @TableClickRowData=' data => {this.activeRowData = data}'
      @handleDbclickTable="handleDbclickTable"
    ></table-component>
    <pagination-component
      :count='table.count'
      @handlePageChange="getTableData"
    ></pagination-component>
  </div>
</template>
<script>
// 组件 
import QueryBar from '@/components/common/QueryBar.vue'
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'
// 工具
import api from '@/assets/js/appHelper.js'
import utools from '@/domain/common/utools.js'
import { mapMutations } from 'vuex'
export default {
  created () {
    this.getTableData()
  },
  data () {
    return {
      activeRowData: {},
      queryBar: {
        data: {},
        grid: [
          {
            isInput: true,
            label: "编码",
            moduleBind: "clientBillNo",
          },
          {
            isInput: true,
            label: "接单人",
            moduleBind: "salesmanName",
          },
          {
            isInput: true,
            label: "跟单人",
            moduleBind: "followPersonName",
          },
          {
            isSelect: true,
            selectOption: [
              { itemValue: '未受理', itemKey: 0 },
              { itemValue: '已受理', itemKey: 2 },
              { itemValue: '已退回', itemKey: 3 },
              { itemValue: '已转委托单', itemKey: 4 },
              { itemValue: '全部', itemKey: '' },
            ],
            label: "订单状态",
            moduleBind: "state",
          },
        ]
      },
      table: {
        tableData: [],
        tableDataKey: [
          { label: "订单号", prop: "clientBillNo" },
          {
            prop: 'updateTime',
            label: '系统时间',
            width: '155'
          },
          { label: "业务类型", prop: "bizTypeName" },
          { label: "单据类型", prop: "billTypeName" },
          { label: "客户", prop: "customerName" },
          { label: "供应商", prop: "supplierName" },
          { label: "跟单人", prop: "followPersonName" },
          { label: "接单人", prop: "salesmanName" },
          { label: "订单总金额(万)", prop: "totalAmount" },
          { label: "币种", prop: "purchaseCurrencyName" },
          { label: "订单状态", prop: "stateName" }]
      },
      count: 0
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    getTableData (pageData) {
      return new Promise(async (resolve, reject) => {
        const { data: { list, count }, status } = await api.getOnlineOrderList(pageData);
        this.table = { ...this.table, tableData: list, count };
        resolve({ getTableData: status })
      })
    },
    handleDbclickTable (data) {
      this.activeRowData = data
      this.queryBtnClickType('update');
    },
    OnlineOrderEdit () {
      if (!Object.keys(this.activeRowData).length) {
        utools.alertMessage.call(this, '', '请选择一条数据操作');
        return;
      }
      this.addbreadCrumbsList({
        path: '/OnlineOrderEdit',
        title: '网上订单信息',
        data: {
          status: 'update',
          data: this.activeRowData
        }
      })
      this.$router.push({ name: 'OnlineOrderEdit' })
    },
    queryBtnClickType (type) {
      if (!type) return;
      let ProcessingConfig = {
        search: () => {
          this.getTableData(this.queryBar.data)
        },
        update: () => { this.OnlineOrderEdit() }
      }
      ProcessingConfig[type]()
    }
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent
  }
}
</script>
