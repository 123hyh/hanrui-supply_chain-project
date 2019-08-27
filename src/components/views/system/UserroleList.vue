<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <div class="handle-box">
        <el-form
          :inline="true"
          :model="queryUserrole"
        >
          <el-form-item label="用户姓名">
            <el-input
              v-model="queryUserrole.userName"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="queryPage"
          >查询</el-button>
          <el-button
            type="primary"
            @click="goUpdate"
          >设置</el-button>
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
        <el-table-column
          prop="userCode"
          label="用户编码"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="200px"
        ></el-table-column>
        <el-table-column
          prop="department"
          label="用户部门"
          width="200px"
        ></el-table-column>
        <el-table-column
          label="角色"
          :formatter="formatter"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryUserrole.pageSize"
          :current-page.sync="queryUserrole.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryUserrole.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>
    <userrole-form
      :show="popForm"
      @closeform="closeForm"
      @newTableData="getTableData"
      :allRole="allRole"
    ></userrole-form>
  </div>
</template>

<script>
import Vue from 'vue'
import api from '@/assets/js/appHelper.js'
import UserroleForm from './UserroleForm'

export default {
  components: {
    UserroleForm
  },
  data () {
    return {
      // 查询条件
      queryUserrole: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),
      // 表格数据
      tableData: [],
      allRole: [],
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    formatter (row, column) {
      var roleName = ''
      if (row.roleCode) {
        var roleCodeArr = row.roleCode.split('&')
        roleCodeArr.forEach(roleCode => {
          this.allRole.forEach(Role => {
            if (roleCode == Role.roleCode) {
              roleName += '[' + Role.roleName + ']   '
            }
          })
        })
      }
      return roleName
    },
    // // 查询用户角色
    async queryUserRole () {
      await api.querySearch('/userrole', this.queryUserrole).then(result => {
        this.tableData = result.data.list
        this.queryUserrole.total = result.data.count
        this.$store.state.other.curRowData = {} // 清空当前行数据
      })
    },
    // 查询所有角色
    async queryRole () {
      await api.queryAllrole().then(result => {
        this.allRole = result.data
      })
    },
    // 查询数据
    async queryPage () {
      await Promise.all([this.queryRole(), this.queryUserRole()]).then(
        values => {
          this.$store.state.other.curRowData = {} // 清空当前行数据
        }
      )
    },
    // 翻页处理
    goPage (val) {
      this.queryUserrole.pageIndex = val
      let vmTblData = this.tableData //把第一页的数据重新赋值进行修改
      api.querySearch('/userrole', this.queryUserrole).then(result => {
        // // 替换数据
        vmTblData.splice(0, vmTblData.length, ...result.data.list) //用result.data.list来代替vmTblData
      })
    },
    // 改变每页行数
    handleSizeChange (val) {
      this.queryUserrole.pageSize = val
      this.queryPage()
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      let self = this
      api.searchOneData('/userrole', row).then(result => {
        self.$store.commit('curRowData', row)
      })
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.goUpdate();
    },
    // 修改
    goUpdate () {
      if (this.$store.state.other.curRowData.userCode) {
        this.$store.commit('btnType', 'update') //判断是否新增修改删除
        this.formEvents.$emit('openform') // 子组件向父组件传参=>打开弹窗
      } else {
        this.$message.error('请选择要修改的数据')
      }
    },
    // 修改
    getTableData (newData) {
      if (newData == 'success') {
        //如果有新编号，就再查询一遍
        this.queryPage()
      }
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
    // this.queryUserRole()
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
