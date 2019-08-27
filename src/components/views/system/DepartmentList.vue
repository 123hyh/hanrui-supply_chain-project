<template>
  <el-container>
    <el-aside width="200px">
      <el-tree
        :data="dept"
        :props="defaultProps"
        empty-text="暂无部门"
        :default-expanded-keys="defaultexpanded"
        node-key="departmentCode"
      ></el-tree>
    </el-aside>
    <el-main>
      <div class="table">
        <div class="crumbs">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>
              <i class="el-icon-menu"></i> 部门管理
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="container pd-10">
          <!-- 查询栏 -->
          <div class="handle-box">
            <el-form :inline="true" :model="queryDepartment">
              <el-form-item label="部门名称" prop="departmentName">
                <el-input v-model="queryDepartment.departmentName" style="width: 150px"></el-input>
              </el-form-item>
              <el-button type="primary" @click="queryPage">查询</el-button>
              <el-button type="primary" @click="goCreate">新增</el-button>
              <el-button type="primary" @click="goUpdate">修改</el-button>
              <el-button type="danger" @click="goDelete">删除</el-button>
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
            <el-table-column prop="departmentName" label="部门名称"></el-table-column>
            <el-table-column :formatter="formatter" label="上级部门"></el-table-column>
            <el-table-column prop="remark" label="部门说明"></el-table-column>
          </el-table>
          <!-- 翻页 -->
          <div class="pagination">
            <el-pagination
              ref="pager"
              @size-change="handleSizeChange"
              background
              :page-sizes="[10, 20, 30, 40]"
              :page-size.sync="queryDepartment.pageSize"
              :current-page.sync="queryDepartment.pageIndex"
              layout="sizes, total, prev, pager, next"
              :total="queryDepartment.total"
              @current-change="goPage"
            ></el-pagination>
          </div>
        </div>
        <department-form
          :show="popForm"
          @closeform="closeForm"
          @newTableData="getTableData"
          :dept="dept"
          :defaultProps="defaultProps"
        ></department-form>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
          <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="delVisible = false">取 消</el-button>
            <el-button type="primary" @click="deleteRow">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import Vue from 'vue'
import api from '@/assets/js/appHelper.js'
import DepartmentForm from './DepartmentForm'
export default {
  components: {
    DepartmentForm
  },

  data() {
    return {
      alldeptll:[],
      // 部门树
      dept: [],
      defaultProps: {
        value: 'departmentCode',
        children: 'children',
        label: 'departmentName'
      },
      // 表格数据
      tableData: [],
      // 默认展开
      defaultexpanded: [],
      // 查询条件
      queryDepartment: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),
      // 弹窗是否关闭
      popForm: false,
      // 确认删除弹窗
      delVisible: false,
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取所有部门 和 树
    async getDeptList() {
      var res = await api.queryAll('/department')
      this.alldeptll = res.data.list
      this.dept = this.getJson(res.data.list, '')
      if (this.dept.length > 0) {
        this.defaultexpanded = [this.dept[0].departmentCode]
      }
    },
    // 递归数据格式
    getJson(items, str) {
      var json = []
      for (var item of items) {
        if (item.parentDepartment == str) {
          json.push(item)
          item.children = this.getJson(items, item.departmentCode)
        }
      }
      return json
    },
    // 查询列表
    queryPage() {
      api.querySearch('/department', this.queryDepartment).then(result => {
        this.tableData = result.data.list
        this.queryDepartment.total = result.data.count
      })
    },
    // 格式化
    formatter(row, column) {
      var t = ''
      this.alldeptll.forEach(item => {
        if (row.parentDepartment == item.departmentCode) {
          t =  item.departmentName
        }
      })
      return t
    },
    // 翻页处理
    goPage(val) {
      this.queryDepartment.pageIndex = val
      this.queryPage()
    },
    // 改变每页行数
    handleSizeChange(val) {
      this.queryOrigin.pageIndex = 1;
      this.queryDepartment.pageSize = val
      this.queryPage()
    },
    // 新增
    goCreate() {
      this.$store.commit('btnType', 'create') //判断是否新增修改删除
      this.formEvents.$emit('openform') // 子组件向父组件传参=>打开弹窗
    },
    // 排除特定数据递归数据格式
    getJsonup(items, str, departmentCode) {
      var json = []
      for (var item of items) {
        if (item.parentDepartment == str && item.departmentCode != departmentCode) {
          json.push(item)
          item.children = this.getJsonup(items, item.departmentCode,departmentCode)
        }
      }
      return json
    },
    // 选中当前行
    clickRow(row) {
      // 获取修改内容
      let self = this
      api.searchOneData('/department', row.departmentCode).then(result => {
        self.$store.commit('curRowData', row)
      })
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.goUpdate();
    },
    // 修改
    goUpdate() {
      if (this.$store.state.other.curRowData) {
        this.dept = this.getJsonup(this.alldeptll, '',this.$store.state.other.curRowData.departmentCode)
        this.$store.commit('btnType', 'update') //判断是否新增修改删除
        this.formEvents.$emit('openform') // 子组件向父组件传参=>打开弹窗
      // this.popForm = true
      } else {
        this.$message.error('请选择要修改的数据')
      }
    },
    // 新增成功/修改成功
    getTableData(newData) {
      if (newData.departmentCode) {
        //如果有新编号，就再查询一遍
        this.queryDepartment.pageIndex = 1
        this.queryPage()
        this.getDeptList()
      }
    },
    // 删除
    goDelete() {
      if (this.$store.state.other.curRowData) {
        this.delVisible = true
      } else {
        this.$message.error('请选择要删除的数据')
      }
    },
    // 确定删除
    deleteRow() {
      this.delVisible = false
      // 删除
      let self = this
      api
        .deleteData('/department', this.$store.state.other.curRowData.departmentCode)
        .then(function(res) {
          if (res.status == '200') {
                self.$message.success('删除成功!');
                self.queryPage() //数据刷新
                self.delVisible = false
                self.getDeptList()
          }
        })
    },
    // 关闭弹窗
    closeForm() {
      this.popForm = false
    }
  },
  provide() {
    return {
      formEvents: this.formEvents
    }
  },
  created() {
    // 加载部门
    this.getDeptList()
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
.el-form-item__error{
  left: 100%;
}
</style>
