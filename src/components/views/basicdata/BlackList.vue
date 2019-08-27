<template>
  <div class="container pd-10">

    <!-- 查询栏 -->
    <query-bar
      :ruleForm="queryBar.data"
      :formConfig="queryBarFormConfig"
      @handleBtnClickType="handleBtnClick"
    ></query-bar>

    <!-- 表格 -->
    <table-component
      :dialog='false'
      :queryBarVisible='false'
      :activeRow.sync='table.activeRow'
      :popoverList='table.list'
      :count='table.count'
      :popoverListKey='table.config'
      @dblclickTableRow='dblclickTableRow'
      @handlePageChange='handleChange'
    ></table-component>
  </div>
</template>
<script>

import api from '@/assets/js/appHelper'
import QueryBar from '@/components/common/QueryBar'
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
import utools from '@/domain/common/utools.js'

// 表格配置
import client from '@/domain/tableconfig/business/Client.js'
import carrierBase from '@/domain/tableconfig/basicdata/CarrierBase.js'
import customer from '@/domain/tableconfig/basicdata/Customer.js'
import supplierBase from '@/domain/tableconfig/basicdata/SupplierBase.js'

export default {

  name: 'BlackList',

  created () {
    this.handleBtnClick('search')
  },
  
  data: _ => ({
    table: {
      list: [],
      count: 0,
      config: [],
      activeRow: {}
    },
    queryBar: {
      data: {
        type: '0'
      }
    }
  }),

  computed: {
    tableConfig () {
      return new Map([
        ['0', client],
        ['1', carrierBase],
        ['2', customer],
        ['3', supplierBase]
      ])
    },
    queryBarFormConfig () {
      return [
        {
          label: '类型', moduleBind: 'type', isSelect: true, selectOption: [
            { itemKey: '0', itemValue: '委托方' },
            { itemKey: '1', itemValue: '承运商' },
            { itemKey: '2', itemValue: '客户' },
            { itemKey: '3', itemValue: '供应商' }
          ]
        }
      ]
    },

    port () {
      return new Map([
        ['0', api.queryclientSearch],
        ['1', api.querycarrierbaseSearch],
        ['2', api.getCustomerList],
        ['3', api.querysupplierbaseSearch]
      ])
    }
  },

  components: {
    QueryBar,
    TableComponent
  },

  methods: {

    // 表格双击事件
    dblclickTableRow () { },

    // 表格分页事件
    async handleChange (pageData = {}) {
      try {
        const type = this.queryBar.data.type;
        const { data: { list, count } } = await this.port.get(type).call(api, {...pageData, hasBlack: true});
        this.table.list = list,
          this.table.count = count;
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error)
      }

    },

    // 查询栏点击操作
    handleBtnClick (type) {
      switch (type) {
        case 'search':
          this.handleToggleTableConfig()
      }
    },
    // 点击查询按钮 取当前类型的表格配置 和 请求表格数据
    async handleToggleTableConfig () {
      const type = this.queryBar.data.type;
      // 设置表格配置
      this.table.config = this.tableConfig.get(type), this.table.list = [];
      this.handleChange()
    },
  }
}
</script>