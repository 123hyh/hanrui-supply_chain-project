<template>
  <div class="table">
    <breadcrumb-navigation />
    <!-- 查询栏 -->
    <query-bar
      :btnObj="btnObj"
      :formConfig="queryBarFormConfig"
      :ruleForm="queryBar.data"
      @handleBtnClickType="handleBtnClickType"
    ></query-bar>
    <!-- 表格 -->
    <table-component
      :tableData='tableData'
      :tableDataKey='tableConfig'
      @TableClickRowData='currentTableChange'
      @handleDbclickTable="handleDbclickTable"
    ></table-component>
    <!-- 分页 -->
    <pagination-component
      :count='queryPage.total'
      @handlePageChange='queryHkoutstore'
    ></pagination-component>
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appHelper from "@/assets/js/appHelper"
import tableConfig from '@/domain/tableconfig/logistics/Hkoutstore.js'
// 组件
import QueryBar from "@/components/common/QueryBar.vue";
import PaginationComponent from '@/components/common/Pagination.vue'
import TableComponent from '@/components/common/TabTable.vue'

import { mapMutations, mapGetters } from 'vuex'

export default {
  name: "HkoutstoreList",
  props: {
    btnObj: {
      type: Array,
      default: () => [
        { label: "查询", type: "search" },
        { label: "新增", type: "add" },
        { label: "操作", type: "update" },
        { label: "删除", type: "delete" }
      ]
    }
  },
  data () {
    return {
      tableConfig,
      delVisible: false,
      idx: -1,

      // 表格数据
      tableData: [],
      // 查询条件
      queryPage: {
        total: 0
      },
      queryBar: {
        data: {}
      },
      popForm: false,
      currentRow: {},//当前选中行
    }
  },
  computed: {
    ...mapGetters(['orderStatus']),
    queryBarFormConfig () {
      return [
        { label: "编码", moduleBind: "billNo", isInput: true },
        { label: '单据状态', moduleBind: 'status', isSelect: true, selectOption: this.orderStatus },
        { label: '委托方', moduleBind: 'delegeteName', isInput: true },
        { label: '报关类型', moduleBind: 'reportGateType', isSelect: true, selectOption: [], selectKey: 'declareCustoms' },
        { label: '业务日期', moduleBind: 'bizDate', isInput: true },
        { label: '委托单号', moduleBind: 'delegeteBillNo', isInput: true },
        { label: "制单人", moduleBind: "creator", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "至", moduleBind: "createTimeTo", isDate: true },
      ]
    }
  },
  created () {
    // 加载列表数据
    this.queryData()
  },

  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    handleBtnClickType (type) {
      switch (type) {
        case 'search':
          this.queryData()
          break;
        case 'add':
          this.goCreate()
          break;
        case 'update':
          this.goUpdate()
          break;
        case 'delete':
          this.goDelete()
          break;
      }
    },
    queryHkoutstore (page = {}) {
      let typeObj = {
        '1': '香港收货入库单',
        '2': '委托订单',
        '3': '其他'
      }
      appHelper.queryHkoutstore(page).then(result => {
        this.tableData = result.data.list.map(item => { item.sourceBillTypeName = typeObj[[item.sourceBillType]]; return item })
        this.queryPage.total = result.data.count
      })
    },

    queryData () {
      this.queryHkoutstore(this.queryBar.data)
    },
    goDelete () {
      if (this.currentRow && this.currentRow.billNo) {
        this.$confirm('此操作将永久删除单据, 是否继续?', '提示', { type: 'warning' }).then(() => {
          appHelper.removeHkoutstore(this.currentRow.billNo).then(data => {
            this.queryHkoutstore()
            this.$message({ type: 'success', message: '删除成功!' })
          }).catch(() => {
            this.$message({ type: 'info', message: '删除失败' })
          })
        }).catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
        })
      } else {
        this.$message({
          message: "请选中您要删除的单据！",
          type: "warning"        })
      }
    },
    goCreate () {
      this.jumpForm('add')
    },
    goUpdate () {
      if (this.currentRow && this.currentRow.billNo) {
        this.jumpForm('update')
      } else {
        this.$message({
          message: "请选中您要修改的单据！",
          type: "warning"        })
      }
    },
    jumpForm (type) {
      let params = {
        path: "/HkoutstoreForm",
        title: '香港出库主单信息',
        data: {
          status: type
        }
      }
      type == 'update' && (params.data.formData = this.currentRow)
      this.addbreadCrumbsList(params)
      this.$router.push(`HkoutstoreForm`)
    },
    closeForm () {
      this.popForm = false
    },
    // 确定删除
    deleteRow () {
      this.tableData.splice(this.idx, 1)
      this.$message.success("删除成功")
      this.delVisible = false
    },
    currentTableChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow
    },
    handleDbclickTable (data) {
      this.currentRow = data
      this.handleBtnClickType('update');
    },
  },
  components: {
    QueryBar,
    PaginationComponent,
    TableComponent
  }
}
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
