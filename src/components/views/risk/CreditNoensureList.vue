<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 融资授信无授信担保
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
        <div class="handle-box">
            <el-form :inline="true">
                <el-form-item label="编码">
                    <el-input v-model="queryCreditNoensure.itemCode" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="名称">
                    <el-input v-model="queryCreditNoensure.name" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单人">
                    <el-input v-model="queryCreditNoensure.creator" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="制单时间">
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryCreditNoensure.createTimeFrom"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>~
                    <el-date-picker
                            value-format="yyyy-MM-dd HH:mm:ss"
                            v-model="queryCreditNoensure.createTimeTo"
                            type="date"
                            style="width: 150px"
                    ></el-date-picker>
                </el-form-item>
                <el-button type="primary" @click="queryData">查询</el-button>
                <el-button type="primary" @click="goCreate">新增</el-button>
                <el-button type="primary" @click="goUpdate">修改</el-button>
                <el-button type="danger" @click="goDelete">删除</el-button>
            </el-form>
        </div>
      <!-- 表格 -->
      <el-table :data="tableData" border :highlight-current-row="true">
				<el-table-column prop="itemCode" label="表业务主键编号"></el-table-column>
				<el-table-column prop="creditNo" label="融资授信单号"></el-table-column>
				<el-table-column prop="noCreditNo" label="授信单号"></el-table-column>
				<el-table-column prop="customerCode" label="委托方编码"></el-table-column>
				<el-table-column prop="customerName" label="委托方名称"></el-table-column>
				<el-table-column prop="creditCompanyCode" label="授信公司编码"></el-table-column>
				<el-table-column prop="creditCompanyName" label="授信公司名称"></el-table-column>
				<el-table-column prop="creditCurrency" label="授信币种"></el-table-column>
				<el-table-column prop="exchangeRate" label="汇率"></el-table-column>
				<el-table-column prop="startDate" label="开始日"></el-table-column>
				<el-table-column prop="endDate" label="截止日"></el-table-column>
				<el-table-column prop="creditLimit" label="授信期限"></el-table-column>
				<el-table-column prop="status" label="单据状态"></el-table-column>
				<el-table-column prop="repealPersonId" label="撤保人"></el-table-column>
				<el-table-column prop="repealTime" label="撤保时间"></el-table-column>
				<el-table-column prop="repealReason" label="撤保理由"></el-table-column>
				<el-table-column prop="creditType" label="授信类别"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column prop="auditor" label="审核人"></el-table-column>
				<el-table-column prop="auditTime" label="审核时间"></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          background
          :page-size="queryCreditNoensure.pageSize"
          :current-page="queryCreditNoensure.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryCreditNoensure.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

    <creditNoensure-form :show="popForm" @closeform="closeForm"></creditNoensure-form>

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
import appHelper from "../../../assets/js/appHelper";
import CreditNoensureForm from "./CreditNoensureForm";


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
      queryCreditNoensure: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      // 事件bus
      formEvents: new Vue(),

      popForm: false
    };
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
    queryPage() {
      appHelper.query("/creditnoensure/search", this.queryCreditNoensure).then(result => {
        this.tableData = result.data.list;
        this.queryCreditNoensure.total = result.data.count;
      });
    },

    queryData(){
      this.queryCreditNoensure.pageIndex = 1;
      
      this.queryPage();
    },
    // 翻页处理
    goPage: function(index) {
      let pager = this.$refs.pager;
      let vmTblData = this.tableData;

      this.$axios
        .post(appHelper.apiPath("/creditnoensure/search"), {
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
      this.popForm = false;
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
    CreditNoensureForm
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
