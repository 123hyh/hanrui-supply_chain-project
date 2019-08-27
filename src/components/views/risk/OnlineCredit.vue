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
            moduleBind: "clientApplyNo",
          },
          {
            isSelect: true,
            label: "订单状态",
            selectOption: [
              { itemValue: '未受理', itemKey: 0 },
              { itemValue: '已退回', itemKey: 3 },
              { itemValue: '全部', itemKey: '' },
            ],
            moduleBind: "state",
          }
        ]
      },
      table: {
        tableData: [],
        tableDataKey: [
          { label: "申请单号", prop: "clientApplyNo", },
          {label: '系统时间',prop:'updateTime'},
          { label: "订单状态", prop: "stateName", },
          { label: "申请公司名称", prop: "applyCompanyName", },
          { label: "申请额度(万)", prop: "applyAmount", },
          { label: "币别", prop: "currency", },
          { label: "提交时间", prop: "updateTime", },
          { label: "授信开始", prop: "creditBegin", },
          { label: "授信结束", prop: "creditEnd", },
        ]
      },
      count: 0
    }
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    getTableData (pageData) {
      return new Promise(async (resolve, reject) => {
        const { data: { list, count }, status } = await api.getOnlineCreditList(pageData);
        this.table = { ...this.table, tableData: list, count };
        resolve({ getTableData: status })
      })
    },
    handleDbclickTable (data) {
      this.activeRowData = data
      this.queryBtnClickType('update');
    },
    queryBtnClickType (btnType) {
      if (!btnType) return;
      let ProcessingConfig = {
        search: () => {
          this.getTableData(this.queryBar.data);
        },
        update: () => {
          if (!Object.keys(this.activeRowData).length) {
            utools.alertMessage.call(this, '', '请选择一条数据操作');
            return;
          }
          this.addbreadCrumbsList({
            path: '/OnlineCreditEdiet',
            title: '网上授信信息',
            data: {
              status: 'update',
              formData: this.activeRowData
            }
          })
          this.$router.push({ name: 'OnlineCreditEdiet' })
        }
      }
      ProcessingConfig[btnType]()
    }
  },
  components: {
    QueryBar,
    TableComponent,
    PaginationComponent
  }
}
</script>
