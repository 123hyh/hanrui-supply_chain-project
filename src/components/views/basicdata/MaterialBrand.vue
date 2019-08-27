<template>
  <div class="container pd-10">
    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <table-component
      :queryBarVisible='false'
      :dialog="false"
      :popoverList="table.list"
      :popoverListKey='table.config'
      :count="table.count"
      :activeRow.sync="table.activeRow"
      @handlePageChange="handlePageChange"
    ></table-component>
  </div>
</template>

<script>
// 接口 工具
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";
const { isNull } = utools;

// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from "@/components/common/Table.Form.Dialog/TableComponent.vue";

// 注册表
import tableConfig from "@/domain/tableconfig/basicdata/MaterialBrand.js";
export default {
  created () {
    this.getTablePageData()
  },

  data: _ => ({
    queryBar: {
      data: {}
    },
    table: {
      list: [],
      config: tableConfig,
      count: 0,
      activeRow: {}
    }
  }),

  components: {
    QueryBar,
    TableComponent
  },


  computed: {
    queryBarFormConfig () {
      return [
        { label: "规格型号", moduleBind: "specificationType", isInput: true },
      ]
    },
  },

  methods: {

    // 查询栏按钮事件
    handleBtnClickType () {
      this.getTablePageData()
    },

    // 表格分页事件
    handlePageChange (data) {
      this.getTablePageData(data)
    },
    async getTablePageData (data = {}) {
      try {
        const { data: { list, count } } = await api.getMaterielbrandData({ ...data, ...this.queryBar.data });
        this.table.list = list,
          this.table.count = count;
      } catch (error) {
        this.$message.error('获取列表数据失败，请重试！')
        console.log(error)
      }
    }
  }

}
</script>