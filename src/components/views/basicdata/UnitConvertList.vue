<template>
  <div class="table">
    <div class="container pd-10">
      <!-- 查询栏 -->
      <div class="handle-box">
        <query-bar
          :formConfig="queryBar.grid"
          :ruleForm="queryBar.data"
          :btnObj="btnObj"
          @handleBtnClickType="handleBtnClickType"
        ></query-bar>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border :highlight-current-row="true">
        <el-table-column prop="unitConvertCode" label="附件类型编码"></el-table-column>
        <el-table-column prop="originalUnit" label="原计量单位"></el-table-column>
        <el-table-column prop="targetUnit" label="目标计量单位"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryUnitConvert.pageSize"
          :current-page="queryUnitConvert.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryUnitConvert.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <unitConvert-form :show="isShow" @closeform="closeForm"></unitConvert-form>

    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import appHelper from "@/assets/js/appHelper";
import UnitConvertForm from "./UnitConvertForm";
import QueryBar from "@/components/common/QueryBar.vue";

export default {
  data() {
    return {
      url: "./vuetable.json",
      cur_page: 1,
      multipleSelection: [],
      select_cate: "",
      select_word: "",
      del_list: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        date: "",
        address: ""
      },
      idx: -1,

      // 表格数据
      tableData: [],
      // 查询条件
      queryUnitConvert: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),

      popForm: false,
      queryBar: {
        //  搜索栏Data
        grid: [
          { label: "编码", moduleBind: "creditNo", isInput: true },
          { label: "名称", moduleBind: "name", isInput: true },
          { label: "制单人", moduleBind: "creator", isInput: true },
          { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
          { label: "至", moduleBind: "createTimeTo", isDate: true }
        ],
        data: {}
      },
      isShow: false,  //弹窗
    };
  },
  props: {
    btnObj: {
      type: Array,
      default: () => []
    }
  },
  created() {
    // 加载列表数据
    this.queryData();

    //-- 监听 form 事件
    // 新建成功
    this.formEvents.$on("formcreated", () => {
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    });
    // 修改成功
    this.formEvents.$on("formupdated", () => {
      this.$message({
        message: "添加成功！",
        type: "success"
      });
    });
  },
  computed: {
    data() {
      return this.tableData.filter(d => {
        let is_del = false;
        for (let i = 0; i < this.del_list.length; i++) {
          if (d.name === this.del_list[i].name) {
            is_del = true;
            break;
          }
        }
        if (!is_del) {
          if (
            d.address.indexOf(this.select_cate) > -1 &&
            (d.name.indexOf(this.select_word) > -1 ||
              d.address.indexOf(this.select_word) > -1)
          ) {
            return d;
          }
        }
      });
    }
  },
  methods: {
    handleBtnClickType(clickObj) {  // 搜索栏按钮点击
      switch(clickObj){
        case 'add':
          this.isShow  = true; break;
        case 'update':
          this.isShow = true; break;
      };
    },
    queryPage() {
      appHelper
        .query("/unitconvert/search", this.queryUnitConvert)
        .then(result => {
          this.tableData = result.data.list;
          this.queryUnitConvert.total = result.data.count;
        });
    },

    queryData() {
      this.queryUnitConvert.pageIndex = 1;

      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/unitconvert/search"), {
          pageIndex: index,
          pageSize: pager.pageSize
          //   queryMap: {},
          //   sorting: ["string"]
        })
        .then(function(result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list);
          // 设置分页
          pager.total = result.data.total;
        });
    },

    goCreate() {
      this.formEvents.$emit("openform");
    },
    goDelete() {},
    goUpdate() {},
    closeForm() {
      if(!this.isShow) return;
      this.isShow = !this.isShow;
    },

    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
      if (process.env.NODE_ENV === "development") {
        this.url = "/ms/table/list";
      }
      this.$axios
        .post(this.url, {
          page: this.cur_page
        })
        .then(res => {
          this.tableData = res.data.list;
        });
    },
    search() {
      this.is_search = true;
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    delAll() {
      const length = this.multipleSelection.length;
      let str = "";
      this.del_list = this.del_list.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + " ";
      }
      this.$message.error("删除了" + str);
      this.multipleSelection = [];
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      this.$set(this.tableData, this.idx, this.form);
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  },
  components: {
    UnitConvertForm,
    QueryBar
  },
  provide() {
    return {
      formEvents: this.formEvents
    };
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
