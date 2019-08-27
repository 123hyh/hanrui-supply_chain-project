<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <div class="handle-box">
        <el-form
          :inline="true"
          :model="queryRole"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input
              v-model="queryRole.roleName"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="queryPage"
          >查询</el-button>
          <el-button
            type="primary"
            @click="goCreate"
          >新增</el-button>
          <el-button
            type="primary"
            @click="goUpdate"
          >修改</el-button>
          <el-button
            type="danger"
            @click="goDelete"
          >删除</el-button>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        :highlight-current-row="true"
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <!-- <el-table-column prop="roleCode" label="角色编码" width="250px"></el-table-column> -->
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="250px"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="角色说明"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryRole.pageSize"
          :current-page.sync="queryRole.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryRole.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <role-form
      :show="popForm"
      @closeform="closeForm"
      @newTableData="getTableData"
    ></role-form>
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
import Vue from 'vue'
import api from '@/assets/js/appHelper.js'
import RoleForm from './RoleForm'

export default {
  components: {
    RoleForm
  },
  data () {
    return {
      // 查询条件
      queryRole: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),
      // 验证规则
      rules: {
        roleCode: [api.validateRule.required('角色编码')],
        roleName: [api.validateRule.required('角色名称')]
      },
      // 表格数据
      tableData: [],
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 查询数据
    queryPage () {
      api.querySearch('/role', this.queryRole).then(result => {
        this.tableData = result.data.list
        this.queryRole.total = result.data.count
        this.$store.state.other.curRowData = {} // 清空当前行数据
      })
    },
    // 翻页处理
    goPage (val) {
      this.queryRole.pageIndex = val
      this.queryPage()
    },
    // 改变每页行数
    handleSizeChange (val) {
      this.queryRole.pageSize = val
      this.queryPage()
    },
    // 新增
    goCreate () {
      this.$store.commit('btnType', 'create') //判断是否新增修改删除
      this.formEvents.$emit('openform') // 子组件向父组件传参=>打开弹窗
    },
    // 新增
    getTableData (newData) {
      if (newData.id) {
        //如果有新编号，就再查询一遍
        this.queryPage()
      }
    },
    // 修改
    goUpdate () {
      if (this.$store.state.other.curRowData.id) {
        this.$store.commit('btnType', 'update') //判断是否新增修改删除
        this.formEvents.$emit('openform') // 子组件向父组件传参=>打开弹窗
      } else {
        this.$message.error('请选择要修改的数据')
      }
    },

    // 删除
    goDelete () {
      if (this.$store.state.other.curRowData.id) {
        this.delVisible = true
      } else {
        this.$message.error('请选择要删除的数据')
      }
    },
    // 确定删除
    deleteRow () {
      // 删除
      let self = this
      api
        .deleteData('/role', this.$store.state.other.curRowData.roleCode)
        .then(function (res) {
          if (res.status == 200) {
            // 提交成功后...
            self.$alert('删除成功', '删除', {
              confirmButtonText: '确定',
              callback: action => {
                self.queryPage() //数据刷新
                self.delVisible = false
              }
            })
          }
        })
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      let self = this
      api.searchOneData('/user', row).then(result => {
        self.$store.commit('curRowData', row)
      })
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.goUpdate();
    },
    // 关闭弹窗
    closeForm () {
      this.popForm = false
    }
  },
  provide () {
    return {
      formEvents: this.formEvents
    }
  },
  created () {
    // 加载列表数据
    this.queryPage()
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
