<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <div class="handle-box">
        <el-form
          :inline="true"
          :model="queryPaymentsettlement"
          :rules="rules"
          ref="queryPaymentsettlement"
        >
          <el-form-item
            label="编码"
            prop="code"
          >
            <el-input
              v-model="queryPaymentsettlement.code"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="名称"
            prop="classifyName"
          >
            <el-input
              v-model="queryPaymentsettlement.name"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="制单人"
            prop="creator"
          >
            <el-input
              v-model="queryPaymentsettlement.creator"
              style="width: 150px"
            ></el-input>
          </el-form-item>
          <el-form-item label="制单时间">
            <el-col :span="11">
              <el-form-item prop="createTimeFrom">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="queryPaymentsettlement.createTimeFrom"
                  type="date"
                  style="width: 150px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col
              class="line"
              :span="2"
            >&nbsp;&nbsp;~</el-col>
            <el-col :span="11">
              <el-form-item prop="createTimeTo">
                <el-date-picker
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="queryPaymentsettlement.createTimeTo"
                  type="date"
                  style="width: 150px"
                ></el-date-picker>
              </el-form-item>
            </el-col>
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
            @click="resetForm('queryPaymentsettlement')"
          >重置</el-button>
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
        <el-table-column
          prop="billNo"
          label="单据编号"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="settlementType"
          label="结算类型"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="plannedPayDate"
          label="计划付款日期"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="delegeteBillNo"
          label="委托单号"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="bizDate"
          label="业务日期"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="delegate"
          label="委托方"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="bizType"
          label="业务类型"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="reportGateType"
          label="报关类型"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="settlementMoney"
          label="结算币种"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="settlementMethod"
          label="结算方式"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="receiverAccount"
          label="收款账号"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="settlementUnitType"
          label="结算单位类型"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="settlementUnit"
          label="结算单位"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="receiverAccountName"
          label="收款账号名称"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="companyName"
          label="公司名"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="auditAgain"
          label="是否已复审"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="receiverBank"
          label="收款银行"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="Initialization"
          label="是否初始化"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="delegeteBillNoFY"
          label="FY委托单号"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="amountAll"
          label="合计总金额"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="收款人电话"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="locked"
          label="是否已锁定"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="lockRemark"
          label="锁定备注"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="temporaryAdvancePayTax"
          label="临时垫税"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="billCreator"
          label="制单人"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="billCreateDate"
          label="制单日期"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="auditor"
          label="审核人"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="auditTime"
          label="审核时间"
          width="100px"
        ></el-table-column>
        <el-table-column
          prop="advancePayTax"
          label="是否垫税"
          width="100px"
        ></el-table-column>

      </el-table>
      <div class="pagination">
        <el-pagination
          ref="pager"
          @size-change="handleSizeChange"
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size.sync="queryPaymentsettlement.pageSize"
          :current-page.sync="queryPaymentsettlement.pageIndex"
          layout="sizes, total, prev, pager, next"
          :total="queryPaymentsettlement.total"
          @current-change="goPage"
        ></el-pagination>
      </div>
    </div>

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
import appHelper from "../../../assets/js/appHelper";


export default {
  data () {

    return {
      // 查询条件
      queryPaymentsettlement: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
      },
      rules: {
        code: [{
          message: '',
          trigger: 'blur'
        }],
        classifyName: [{
          message: '',
          trigger: 'blur'
        }],
        creator: [{
          message: '',
          trigger: 'blur'
        }],
        createTimeFrom: [{
          message: '',
          trigger: 'change'
        }],
        createTimeTo: [{
          message: '',
          trigger: 'change'
        }],
      },
      // 表格数据
      tableData: [],
      // 确认删除弹窗
      delVisible: false,
      // 弹窗是否关闭
      popForm: false,
    };
  },
  computed: {},
  watch: {

  },
  methods: {
    // 查询数据
    queryPage (index, pageSize) {
      this.queryPaymentsettlement.pageIndex = 1; //页签调到第一页
      appHelper.query("/paymentsettlement/search", this.queryPaymentsettlement).then(result => {
        this.tableData = result.data.list;
        this.queryPaymentsettlement.total = result.data.count;
        this.$store.state.curRowData = {}; // 清空当前行数据
      });
    },
    // 翻页处理
    goPage (index, pageSize) {
      let pager = this.$refs.pager; //每页的数据对象 翻页更新
      let vmTblData = this.tableData; //把第一页的数据重新赋值进行修改
      pageSize = pager.pageSize ? pager.pageSize : pageSize;
      this.queryPaymentsettlement.pageIndex = index; //页签调到第一页
      this.queryPaymentsettlement.pageSize = pageSize; //页签调到第一页
      this.$axios
        .post(appHelper.apiPath("/paymentsettlement/search"), this.queryPaymentsettlement)
        .then(function (result) {
          // 替换数据
          vmTblData.splice(0, vmTblData.length, ...result.data.list); //用result.data.list来代替vmTblData
          // 设置分页
          pager.total = result.data.total;
        });
    },
    // 改变每页行数
    handleSizeChange () {
      this.$refs.pager.pageSize = this.queryPaymentsettlement.pageSize; //改变每页行数
      this.goPage(this.queryPaymentsettlement.pageIndex, this.queryPaymentsettlement.pageSize);
    },
    // 新增
    goCreate () {
      this.$router.push({        name: 'AddAndChangePaymentsettlement', params: {
          jumpType: 'add'
        }      })
    },
    // 新增
    getTableData (newData) {
      if (newData.code) { //如果有新编号，就再查询一遍
        this.queryPage();
      }
    },

    // 修改
    goUpdate () {
      this.$router.push({        name: 'AddAndChangePaymentsettlement', params: {
          jumpType: 'change'
        }      })
    },

    // 删除
    goDelete () {
      if (this.$store.state.curRowData.code) {
        this.delVisible = true;
      } else {
        this.$message.error('请选择要删除的数据');
      }
    },
    // 确定删除
    deleteRow () {
      // 删除
      let self = this;
      appHelper
        .deleteData("/paymentsettlement/" + this.$store.state.curRowData.code)
        .then(function (res) {
          console.log(res)
          if (res.status == '200') {
            // 提交成功后...
            self.$alert('删除成功', '删除', {
              confirmButtonText: '确定',
              callback: action => {
                self.queryPage(); //数据刷新
                self.delVisible = false;
              }
            });
          }
        });
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    // 选中当前行
    clickRow (row) {
      // 获取修改内容
      let self = this;
      appHelper
        .get("/paymentsettlement/searchOne/" + row.code)
        .then(function (res) {
          if (res.status == '200') {
            self.$store.commit('curRowData', row)
          }
        });
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    // 关闭弹窗
    closeForm () {
      this.popForm = false;
    },
  },
  provide () {
    return {
      formEvents: this.formEvents
    };
  },
  created () {
    // 加载列表数据
    this.queryPage();
  },
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
