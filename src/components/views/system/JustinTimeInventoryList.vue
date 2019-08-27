<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :formConfig="queryBar.queryBarFormConfig"
        :ruleForm="queryBar.data"
        @handleBtnClickType="handleBtnClickType"
      ></query-bar>
      <!-- 表格 -->
      <table-component
        :dialog='false'
        :popoverList='table.list'
        :popoverListKey='table.config'
        :count='table.count'
        :activeRow.sync='table.activeRow'
        @handlePageChange='handlePageChange'
      ></table-component>
    </div>
  </div>
</template>
<script>

import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'

export default {
  components: {
    QueryBar,
    TableComponent,
  },
  data: _ => ({
    queryBar: {
      queryBarFormConfig: [
        {
          label: '仓库', moduleBind: 'a', isSelect: true, selectOption: [
            { itemValue: '香港仓库', itemKey: '1' },
            { itemValue: '深圳仓库', itemKey: '2' },
            { itemValue: '福田仓库', itemKey: '3' },
            { itemValue: '蛇口仓库', itemKey: '4' },
          ]
        },
        { label: '物料名称', moduleBind: 'b', isInput: true },
        { label: '物料编码', moduleBind: 'c', isInput: true }
      ],
      data: {}
    },
    table: {
      list: [],
      config: [
        { prop: 'id', label: '序号' },
        { prop: 'code', label: '物料编码' },
        { prop: 'name', label: '物料名称' },
        { prop: 'x', label: '规格型号' },
        { prop: 'y', label: '批次' },
        { prop: 'z', label: '仓库代码' },
        { prop: 'w', label: '仓库名称' },
        { prop: 'q', label: '库位' },
        { prop: 'a', label: '基本计量单位' },
        { prop: 'b', label: '即时库存' },
        { prop: 'c', label: '库存可用数量' }
      ],
      count: 0,
      activeRow: {}
    }
  }),
  methods: {

    // 查询栏按钮点击
    handleBtnClickType () { },

    // 表格分页事件
    handlePageChange () { }
  }
}
</script>