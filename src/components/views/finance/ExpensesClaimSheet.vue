<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 附件上传类型
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 查询栏 -->
      <div class="handle-box">
        <el-form
          :inline="true"
          :model="queryPayapply"
          :rules="rules"
          ref="queryPayapply"
          class="form-layout flex-content"
        >
          <el-form-item label="单据编号" prop="code">
            <el-input v-model="queryPayapply.code" style="width: 150px"></el-input>
          </el-form-item>
          <el-form-item label="是否审核">
            <el-select v-model="queryPayapply.region" placeholder="请选择">
              <el-option label="是" value="shanghai"></el-option>
              <el-option label="否" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button type="primary" @click="queryPage">查询</el-button>
            <el-button type="primary" @click="goCreate">新增</el-button>
            <el-button type="primary" @click="goUpdate">修改</el-button>
            <el-button type="danger" @click="goDelete">删除</el-button>
            <el-button type="danger" @click="resetForm('queryPayapply')">重置</el-button>
          </div>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        :highlight-current-row="true"
        @row-click="clickRow"
        ref="moviesTable"
      >
        <el-table-column prop="billNo" label="单据编号" width="100px"></el-table-column>
        <el-table-column prop="payType" label="付款类型" width="100px"></el-table-column>
        <el-table-column prop="state" label="状态" width="100px"></el-table-column>
        <el-table-column prop="company" label="公司" width="100px"></el-table-column>
        <el-table-column prop="receiverDepartmentType" label="收款单位类型" width="100px"></el-table-column>
        <el-table-column prop="receiverDepartment" label="收款单位" width="100px"></el-table-column>
        <el-table-column prop="plannedPayDate" label="计划付款日期" width="100px"></el-table-column>
        <el-table-column prop="payMoneyType" label="付款币别" width="100px"></el-table-column>
        <el-table-column prop="bizDate" label="业务日期" width="100px"></el-table-column>
        <el-table-column prop="settlementMethod" label="结算方式" width="100px"></el-table-column>
        <el-table-column prop="receiverAccount" label="收款账号" width="100px"></el-table-column>
        <el-table-column prop="accountName" label="开户名称" width="100px"></el-table-column>
        <el-table-column prop="payBank" label="付款银行" width="100px"></el-table-column>
        <el-table-column prop="payerPhone" label="付款人电话" width="100px"></el-table-column>
        <el-table-column prop="payState" label="付款状态" width="100px"></el-table-column>
        <el-table-column prop="receiverCountry" label="收款国家" width="100px"></el-table-column>
        <el-table-column prop="receiverRegion" label="收款地区" width="100px"></el-table-column>
        <el-table-column prop="swiftCode" label="SWIFT" width="100px"></el-table-column>
        <el-table-column prop="destination" label="目的地" width="100px"></el-table-column>
        <el-table-column prop="multipleBill" label="是否来源多张单" width="100px"></el-table-column>
        <el-table-column prop="payAmount" label="实付合计" width="100px"></el-table-column>
        <el-table-column prop="department" label="部门" width="100px"></el-table-column>
        <el-table-column prop="backAddress" label="银行地址" width="100px"></el-table-column>
        <el-table-column prop="receiverProvence" label="收款方省" width="100px"></el-table-column>
        <el-table-column prop="delegateBillNoFY" label="是否FY委托单号" width="100px"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100px"></el-table-column>
        <el-table-column prop="refundAllowedWhenArrears" label="有欠款时允许退款" width="100px"></el-table-column>
        <el-table-column prop="receiverCityCountry" label="收款方市县" width="100px"></el-table-column>
        <el-table-column prop="auditDateExchangeRate" label="审核日汇率" width="100px"></el-table-column>
        <el-table-column prop="auditor" label="审核人" width="100px"></el-table-column>
        <el-table-column prop="auditTime" label="审核时间" width="100px"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryPayapply.pageSize"
          :current-page.sync="queryPayapply.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryPayapply.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

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


export default {
  components: {},
  data() {
    return {
      // 查询条件
      queryPayapply: {
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      rules: {
        code: [
          {
            message: "",
            trigger: "blur"
          }
        ],
        classifyName: [
          {
            message: "",
            trigger: "blur"
          }
        ],
        creator: [
          {
            message: "",
            trigger: "blur"
          }
        ],
        createTimeFrom: [
          {
            message: "",
            trigger: "change"
          }
        ],
        createTimeTo: [
          {
            message: "",
            trigger: "change"
          }
        ]
      },
      // 表格数据
      tableData: [],
      // 事件bus
      formEvents: new Vue(),
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 查询数据
    queryPage(index, pageSize) {
      this.queryPayapply.pageIndex = 1; //页签调到第一页
      appHelper.query("/payapply/search", this.queryPayapply).then(result => {
        this.tableData = result.data.list;
        this.queryPayapply.total = result.data.count;
        this.$store.state.curRowData = {}; // 清空当前行数据
      });
    },
    // 翻页处理
    goPage(index, pageSize) {
      let pager = this.$refs.pager; //每页的数据对象 翻页更新
      let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
      pageSize = pager.pageSize ? pager.pageSize : pageSize;
      this.queryPayapply.pageIndex = index; //页签调到第一页
      this.queryPayapply.pageSize = pageSize; //页签调到第一页
      this.$axios
        .post(appHelper.apiPath("/payapply/search"), this.queryPayapply)
        .then(function(result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
          // 设置分页
          pager.total = result.data.total;
        });
    },
    // 改变每页行数
    handleSizeChange() {
      this.$refs.pager.pageSize = this.queryPayapply.pageSize; //改变每页行数
      this.goPage(this.queryPayapply.pageIndex, this.queryPayapply.pageSize);
    },
    // 新增
    goCreate() {
      this.$router.push({
        name: "AddAndChangeExpensesClaimSheet",
        params: { jumpType: "add" }
      });
    },
    // 新增
    getTableData(newData) {
      if (newData.code) {
        //如果有新编号，就再查询一遍
        this.queryPage();
      }
    },

    // 修改
    goUpdate() {
      this.$router.push({
        name: "AddAndChangeExpensesClaimSheet",
        params: { jumpType: "change" }
      });
    },

    // 删除
    goDelete() {
      if (this.$store.state.curRowData.code) {
        this.delVisible = true;
      } else {
        this.$message.error("请选择要删除的数据");
      }
    },
    // 确定删除
    deleteRow() {
      // 删除
      let self = this;
      appHelper
        .deleteData("/payapply/" + this.$store.state.curRowData.code)
        .then(function(res) {
          console.log(res);
          if (res.status == "200") {
            // 提交成功后...
            self.$alert("删除成功", "删除", {
              confirmButtonText: "确定",
              callback: action => {
                self.queryPage(); //数据刷新
                self.delVisible = false;
              }
            });
          }
        });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 选中当前行
    clickRow(row) {
      // 获取修改内容
      let self = this;
      appHelper.get("/payapply/searchOne/" + row.code).then(function(res) {
        if (res.status == "200") {
          self.$store.commit("curRowData", row);
        }
      });
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    // 关闭弹窗
    closeForm() {
      this.popForm = false;
    }
  },
  provide() {
    return {
      formEvents: this.formEvents
    };
  },
  created() {
    // 加载列表数据
    this.queryPage();
  }
};
</script>

<style scoped lang='less'>
.form-layout {
  height: 50px;
  > div {
    margin: 0;
  }
}
.flex-content {
  justify-content: space-around;
}
</style>
