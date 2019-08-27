<template>
  <div class="table">
    <breadcrumb-navigation />
    <!-- 查询栏 -->
    <query-bar
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <!-- 表格 -->
    <table-component
      :tableData='table.tableData'
      :tableDataKey='table.config'
      :activeRow.sync='table.activeRow'
      @handleDbclickTable='dblclickTableRow'
    ></table-component>
    <pagination-component
      :count='table.count'
      @handlePageChange='queryPage'
    ></pagination-component>
  </div>
</template>

<script>
import api from "@/assets/js/appHelper.js";
import utools from "@/domain/common/utools.js";
import { mapGetters, mapMutations } from 'vuex'
// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import TableComponent from '@/components/common/TabTable.vue'
import PaginationComponent from '@/components/common/Pagination.vue'

// 配置
import tableConfig from '@/domain/tableconfig/finance/AdjustApplication.js'

export default {
  components: {
    TableComponent,
    QueryBar,
    PaginationComponent
  },

  created () {
    // 加载列表数据
    this.queryPage();
  },

  data: () => ({
    queryBar: {
      data: {}
    },
    table: {
      config: tableConfig,
      tableData: [],
      count: 0,
      activeRow: {}
    },
  }),

  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "creditNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: "名称", moduleBind: "name", isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    },
  },
  methods: {
    ...mapMutations(['addbreadCrumbsList']),
    dblclickTableRow(){
      this.handleBtnClickType('update')
    },
    // 查询栏按钮事件
    handleBtnClickType (type = 'search') {
      switch (type) {
        case 'search':
          this.queryPage(); break;
        case 'add':
          this.goRedactPage('add'); break;
        case 'update':
          this.goRedactPage('update'); break;
        case 'delete':
          this.goDelete();
      }
    },

    // 查询数据
    async queryPage (data = {}) {
      try {
        const { data: { list, count } } = await api.getAdjustApplicationData({ ...data, ...this.queryBar.data });
        this.table.tableData = list, this.table.count = count;
      } catch (error) {
        this.$message({
          type: 'error',
          message: '获取列表数据失败，请重试！'
        })
        console.log(error)
      }
    },

    // 跳转到编辑页面
    goRedactPage (type) {
      let params = {
        path: '/adjustApplicationForm',
        title: '账务调整申请单信息',
        data: {
          status: type,
        }
      };
      type === 'update' && (params.data.code = this.table.activeRow.billNo);
      this.addbreadCrumbsList(params)
      this.$router.push({
        name: "adjustApplicationForm"
      });
    },

    // 删除
    async goDelete () {
      if (this.table.activeRow.billNo) {
        let Scode = 200;
        try {
          await api
            .removeOnAdjustApplicationData(this.table.activeRow.billNo);
          this.queryPage();
        } catch (error) {
          Scode = 0;
          console.log(error)
        } finally {
          this.utools.alertStatusMessage.call(this, { status: Scode, msg: { success: '删除成功！', error: '删除失败,请重试！' } })
        }
      }
    },

  }
};
</script>

<style scoped>
.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}

.mr10 {
  margin-right: 10px;
}
</style>
