<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
    <h1 class="cut-off-rule">欠款明细</h1>
      <!-- 查询栏 -->
      <query-bar
        :btnObj="btnObj"
        :formConfig="queryBarFormConfig"
        :ruleForm="ruleForm"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :count="tableCount"
        :dialog="false"
        :popoverList="tableData"
        :popoverListKey="tableconfig"
        :queryBarVisible="false"
        @dblclickTableRow="dblclickTableRow"
        @handlePageChange="handleChange"
      ></table-component>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import utools from '@/domain/common/utools.js'

import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import QueryBar from '@/components/common/DialogQueryBar.vue'

import tableconfig from '@/domain/tableconfig/finance/Areears.js'
import ruleForm from '@/domain/entities/basicdata/EmployeeInfo'
import formConfig from '@/domain/formconfig/basicdata/EmployeeInfo'
import { mapGetters } from 'vuex'

export default {
  components: {
    QueryBar,
    TableComponent
  },

  data: () => ({
    tableconfig,
    tableData: [],
    tableCount: 0,
    ruleForm: {},
    btnObj: [
      { type: 'search', label: '查询' },
      { type: 'export', label: '导出' }
    ]
  }),

  computed: {
    ...mapGetters(['orderStatus']),

    queryBarFormConfig() {
      return [
        { label: '客户', moduleBind: 'customerName', isInput: true },
        { label: '委托方', moduleBind: 'clientName', isInput: true },
        {
          label: '是否已付款',
          moduleBind: 'paid',
          isSelect: true,
          selectOption: [
            { itemKey: true, itemValue: '是' },
            { itemKey: false, itemValue: '否' }
          ]
        }
      ]
    },

    clickTypeAsync() {
      return {
        search: async (page = {}) => {
          try {
            const {
              data: { list, count }
            } = await api.getArrearsList({
              ...this.ruleForm,
              ...page
            })
            ;(this.tableData = list.map(item => {
              // 英转中
              item.paid = item.paid ? '是' : '否'
              item.guaranteeCustomers = item.guaranteeCustomers ? '是' : '否'
              return item
            })),
              (this.tableCount = count)
          } catch (e) {
            this.$message.error('获取列表数据失败，请重试！')
            console.log(e)
          }
        },
        export: this.handleExport
      }
    }
  },
  methods: {
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
    handleBtnClick(clickType, page) {
      this.clickTypeAsync[clickType](page)
    },
    handleChange(param) {
      //列表翻页
      this.handleBtnClick('search', param)
    },
    dblclickTableRow(row) {
      this.formDialog.clickRow = utools.cloneObj(row)
      this.handleBtnClick('update')
    },
    // 导出表格
    async handleExport() {
      try {
        const { data, headers } = await api.exportArrears({})
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
          a.click();
          window.URL.revokeObjectURL(href)
        }
        downloadFile.call(this, data)
      } catch (error) {
        console.log(error)
        this.$message.error('导出失败，请重试！')
      }
    }
  },
  created() {
    this.handleBtnClick('search')
  }
}
</script>
