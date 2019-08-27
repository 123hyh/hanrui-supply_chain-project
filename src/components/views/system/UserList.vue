<template>
  <div class="table">
    <el-col :span="24">
      <breadcrumb-navigation />
      <div class="container pd-10">
        <!-- 查询栏 -->
        <div class="handle-box">
          <el-form
            :inline="true"
            :model="queryUser"
            ref="queryUser"
          >
            <el-form-item
              label="所在部门"
              prop="department"
            >
              <SelectTree
                v-model="queryUser.department"
                :options="treeData"
                :defaultProps="defaultProps"
                :value="queryUser.department"
                @getValue="getValue($event)"
                ref="selectTree"
              />
            </el-form-item>
            <el-form-item
              label="用户姓名"
              prop="userName"
            >
              <el-input
                v-model="queryUser.userName"
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
            <el-button
              type="danger"
              @click="goReset"
            >重置密码</el-button>
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
            prop="gender"
            label="性别"
            width="100px"
            :formatter="formatter"
          ></el-table-column>
          <el-table-column
            prop="departmentName"
            label="部门"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="position"
            label="职位"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="电话"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="200px"
          ></el-table-column>
          <el-table-column
            prop="birthday"
            label="生日"
            width="150px"
          ></el-table-column>
          <el-table-column
            prop="locked"
            label="锁定"
            width="100px"
          ></el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            ref="pager"
            @size-change="handleSizeChange"
            background
            :page-sizes="[10, 20, 30, 40]"
            :page-size.sync="queryUser.pageSize"
            :current-page.sync="queryUser.pageIndex"
            layout="sizes, total, prev, pager, next"
            :total="queryUser.total"
            @current-change="goPage"
          ></el-pagination>
        </div>
      </div>
      <user-form
        :show="popForm"
        @closeform="closeForm"
        :treeData="treeData"
        :defaultProps="defaultProps"
        @newTableData="getTableData"
      ></user-form>
      <!-- 删除提示框 -->
      <el-dialog
        title="提示"
        :visible.sync="delVisible"
        width="300px"
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

      <el-dialog
        title="提示"
        :visible.sync="delVisibleReset"
        width="300px"
      >
        <div class="del-dialog-cnt">是否确认重置？</div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="delVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="ResetRow"
          >确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="重置成功，新密码为"
        :visible.sync="newdia"
        width="300px"
      >
        <div class="del-dialog-cnt newmun">{{newpwd}}</div>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button
            type="primary"
            @click="newdia = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
  </div>
</template>

<script>
import Vue from 'vue'
import api from "@/assets/js/appHelper.js";
import UserForm from "./UserForm";
import SelectTree from "@/components/common/SelectTree.vue";
export default {
  components: {
    UserForm,
    SelectTree
  },
  data () {
    return {
      // 树状图
      treeData: [],
      defaultProps: {
        value: "departmentCode",
        children: "children",
        label: "departmentName"
      },
      newpwd: "",
      newdia: false,
      // 查询条件
      queryUser: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),
      // 表格数据
      tableData: [],
      // 确认删除弹窗
      delVisible: false,
      delVisibleReset: false,
      // 弹窗是否关闭
      popForm: false,
      departmentC: ''
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 获取所有部门
    async getDeptList () {
      var res = await api.queryAll("/department");
      this.treeData = this.getJson(res.data.list, "");
    },
    // 递归数据格式
    getJson (items, str) {
      var json = [];
      for (var item of items) {
        if (item.parentDepartment == str) {
          json.push(item);
          item.children = this.getJson(items, item.departmentCode);
        }
      }
      return json;
    },
    // 下拉回传
    getValue (value) {
      this.queryUser.department = value;
    },
    // 查询数据
    queryPage () {
      api.querySearch("/user", this.queryUser).then(result => {
        this.tableData = result.data.list;
        this.queryUser.total = result.data.count;
        this.$store.state.other.curRowData = {}; // 清空当前行数据
      });
    },
    // 翻页处理
    goPage (val) {
      this.queryUser.pageIndex = val;
      this.queryPage()
    },
    // 改变每页行数
    handleSizeChange (val) {
      this.queryUser.pageIndex = '1';
      this.queryUser.pageSize = val;
      this.queryPage();
    },
    // 新增
    goCreate () {
      this.$store.commit("btnType", "create"); //判断是否新增修改删除
      this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
    },
    // 新增回调
    getTableData (newData) {
      if (newData) {
        //如果有新编号，就再查询一遍
        this.queryPage();
      }
    },
    // 修改
    goUpdate () {
      if (this.$store.state.other.curRowData.userCode) {
        this.$store.commit("btnType", "update"); //判断是否新增修改删除
        this.formEvents.$emit("openform"); // 子组件向父组件传参=>打开弹窗
      } else {
        this.$message.error("请选择要修改的数据");
      }
    },
    // 删除
    goDelete () {
      if (this.$store.state.other.curRowData.id) {
        this.delVisible = true;
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },
    // 确定删除
    deleteRow () {
      // 删除
      let self = this;
      api
        .deleteData("/user", this.$store.state.other.curRowData.userCode)
        .then(function (res) {
          if (res.status == 200) {
            // 提交成功后...
            self.$message.success('删除成功!');
            self.queryPage(); //数据刷新
            self.delVisible = false;
          }
        });
    },
    // 重置
    goReset () {
      if (this.$store.state.other.curRowData.id) {
        this.delVisibleReset = true;
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },
    // 确认重置
    ResetRow () {
      var _this = this;
      api
        .query(
          "/user/resetpassword/" + this.$store.state.other.curRowData.userCode,
          ""
        )
        .then(result => {
          // 重置成功后...
          if (result.status == 200) {
            _this.delVisibleReset = false;
            _this.newpwd = result.data;
            _this.newdia = true;
          }
        });
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      let self = this;
      api.searchOneData("/user", row.userCode).then(result => {
        self.$store.commit("curRowData", row);
      });
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.goUpdate();
    },
    // 关闭弹窗
    closeForm () {
      this.popForm = false;
    },
    // 格式化
    formatter (row, column) {
      if (row.gender == "male") {
        return "男";
      }
      if (row.gender == "female") {
        return "女";
      }
    },
    formatterdept (row, column) {
      this.gete(this.treeData, row.department);
      return this.departmentC
    },
    // 递归查找部门中文字段
    gete (treeData, department) {
      var _this = this
      treeData.forEach(element => {
        if (element.departmentCode == department) {
          _this.departmentC = element.departmentName
          return;
        } else {
          if (element.children) {
            _this.gete(element.children, department)
          } else {
            return;
          }
        }
      })
    },
  },
  provide () {
    return {
      formEvents: this.formEvents
    };
  },
  created () {
    // 加载部门
    this.getDeptList();
    // 加载列表数据
    this.queryPage();
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
.newmun {
  font-size: 32px;
}
</style>
