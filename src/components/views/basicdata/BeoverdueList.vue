<template>
  <div class="table">
    <breadcrumb-navigation />
    <div class="container pd-10">
      <el-form :inline="true">
      <el-form-item label="委托单号" style="width:20rem">
        <el-input v-model="ruleForm.entrustOrderNo" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="委托方名称" style="width:20rem">
        <el-input v-model="ruleForm.clientName" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="创建人" style="width:20rem">
        <el-input v-model="ruleForm.creator" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="创建时间">
        <el-date-picker v-model="ruleForm.createTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:9rem"></el-date-picker>
      </el-form-item>
      <el-form-item label="至">
        <el-date-picker v-model="ruleForm.createTime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:9rem"></el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="收款单号" style="width:20rem">
        <el-input v-model="ruleForm.receiptNo" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="已计结算" style="width:20rem">
        <el-input v-model="ruleForm.hasSettlement" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="不计结算" style="width:20rem">
        <el-input v-model="ruleForm.hasSettlement" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="收款时间">
        <el-date-picker v-model="ruleForm.collectionDate" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:9rem"></el-date-picker>
      </el-form-item>
      <el-form-item label="至">
        <el-date-picker v-model="ruleForm.collectionDate" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width:9rem"></el-date-picker>
      </el-form-item>
      <br>
      <el-form-item label="认款单号" style="width:20rem">
        <el-input v-model="ruleForm.receiptNo" style="width:9rem"></el-input>
      </el-form-item>
      <el-form-item label="无收款认款单逾期利息" style="width:20rem">
        <el-checkbox v-model="ruleForm.hasWriteoff"></el-checkbox>
      </el-form-item>
      <el-form-item label="已申请核销" style="width:20rem">
        <el-checkbox v-model="ruleForm.hasWriteoff"></el-checkbox>
      </el-form-item>
      <!-- <el-form-item label="创建时间" style="width:27rem">
        <el-date-picker v-model="ruleForm.collectionDate" type="daterange" range-separator="至" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </el-form-item> -->
      </el-form>
      <!-- 查询栏 -->
      <!-- <query-bar
        class="queryBar"
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <query-bar
        class="queryBar"
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig2"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <query-bar
        class="queryBar"
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig3"
        @handleBtnClickType="handleBtnClick"
      ></query-bar> -->
      <div class="optionbtn">
        <el-button
          type="primary"
          :class="{[setThemeClass]: true}"
          @click="option('search')"
        >查询</el-button>
        <el-button
          type="primary"
          :class="{[setThemeClass]: true}"
          @click="option('verification')"
        >申请核销</el-button>
        <el-button
          type="primary"
          :class="{[setThemeClass]: true}"
          @click="option('generate')"
        >生成应收结算单</el-button>
        <el-button
          type="primary"
          :class="{[setThemeClass]: true}"
          @click="option('add')"
        >添加备注</el-button>
      </div>
      <el-table
        :data="tableData.list"
        border
        highlight-current-row
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        @selection-change="handleSelectionChange"
        ref="moviesTable"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          v-for="item in tableconfig"
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          align="center"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="tableData.total"
        ></pagination>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      close-on-press-escape
      :title="title"
      :visible.sync="dialogFormVisible"
      width="30%"
    >
      <el-form
        :model="upfrom"
        v-if="action == 'One'"
      >
        <el-form-item
          label="申请核销原因"
          label-width="120px"
        >
          <el-input
            type="textarea"
            v-model="upfrom.writeoffReason"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="批号"
          label-width="120px"
        >
          <el-input
            v-model="upfrom.batchNo"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="原因归类"
          label-width="120px"
        >
          <el-select
            v-model="upfrom.reasonType"
            placeholder="请选择原因归类"
          >
            <el-option
              v-for="option in selectOption"
              :key="option['itemValue']"
              :label="option['itemValue']"
              :value="option['itemKey']"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        :model="upfrom"
        v-else
      >
        <el-form-item
          label="商务备注"
          label-width="120px"
        >
          <el-input
            type="textarea"
            v-model="upfrom.salesRemark"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="业务备注"
          label-width="120px"
        >
          <el-input
            type="textarea"
            v-model="upfrom.bizRemark"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="说明"
          label-width="120px"
        >
          <el-input
            v-model="upfrom.remark"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="update"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import api from "@/assets/js/appHelper";
import Pagination from "@/components/common/Pagination";
import QueryBar from "@/components/common/QueryBar";
import tableconfig from "@/domain/tableconfig/basicdata/Beoverdue";

export default {
  components: {
    QueryBar,
    Pagination
  },
  computed: {
    ...mapGetters(["getTheme", "getListBtn"]),
    setThemeClass () {
      let obj = {
        "#409EFF": "theme-color-blur",
        "#FF8C02": "theme-color-warning",
        "#242F42": "theme-color-info"
      };
      return obj[this.getTheme];
    }
  },
  data: () => ({
    queryBarFormConfig: [
      { label: "委托单号", moduleBind: "entrustOrderNo", isInput: true },
      // {label: "委托方", moduleBind: "billNo", isInput: true },
      { label: "委托方名称", moduleBind: "clientName", isInput: true },
      { label: "创建人", moduleBind: "creator", isInput: true },
      { label: "创建时间", moduleBind: "createTimeFrom", isDate: true },
      { label: "至", moduleBind: "createTimeTo", isDate: true }
    ],
    queryBarFormConfig2: [
      { label: "已计结算", moduleBind: "hasSettlement", isInput: true },
      { label: "不计结算", moduleBind: "billNo", isInput: true },
      { label: "收款时间", moduleBind: "collectionDate", isDate: true },
      { label: "至", moduleBind: "collectionDate", isDate: true }
    ],
    queryBarFormConfig3: [
      { label: "收款单号", moduleBind: "receiptNo", isInput: true },
      { label: "认款单号", moduleBind: "billNo", isInput: true },
      { label: "无收款认款单逾期利息", moduleBind: "billNo", checkbox: true },
      { label: "已申请核销", moduleBind: "hasWriteoff", checkbox: true }
    ],
    ruleForm: {
      pageIndex: 1,
      pageSize: 10
    },
    tableconfig,
    tableData: {
      list: [],
      total: 0
    },
    curRowData: "",
    multipleSelection: [],
    dialogFormVisible: false,
    title: "申请核销",
    action: "",
    upfrom: {},
    selectOption: []
  }),
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    option (obj) {
      this.handleBtnClick(obj);
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    // 点击查询栏按钮事件
    handleBtnClick: (() => {
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    // 查询栏按钮绑定的事件
    handleBtnClickObj () {
      return {
        search () {
          this.goStartPage();
        },
        verification () {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.warning("请选择要申请核销的数据");
            return;
          } else {
            this.action = "One";
            this.title = "申请核销";
            this.upfrom = this.curRowData;
            this.upfrom.feeProject = this.curRowData.feeProjectCode
            this.dialogFormVisible = true;
          }
        },
        async generate () {
          if (this.multipleSelection.length == 0) {
            this.$message.warning("请选择要生成应收结算单的数据");
            return;
          } else {
            try {
              var { data } = await api.savelistbyreceivesettlement(this.multipleSelection);
              this.$router.push("M0805");
            } catch (e) {
              console.log(e);
            }
            // this.handleJump("update", data);
          }
        },
        add () {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.warning("请选择要添加备注的数据");
            return;
          } else {
            this.action = "Two";
            this.title = "添加备注";
            this.upfrom = this.curRowData;
            this.upfrom.feeProject = this.curRowData.feeProjectCode
            this.dialogFormVisible = true;
          }
        }
      };
    },
    // 查询
    async queryData () {
      try {
        const { data } = await api.queryoverdueinterestSearch(this.ruleForm);
        this.tableData.list = data.list;
        this.tableData.total = data.count;
        this.curRowData = {};
        this.$refs.moviesTable.setCurrentRow(
          this.tableData.list.filter(
            e => e[this.$route.query.key] == this.$route.query.code
          )[0] || ""
        );
        if (
          !this.tableData.list.filter(
            e => e[this.$route.query.key] == this.$route.query.code
          )[0] &&
          this.tableData.list.length > 0
        ) {
          this.ruleForm[this.$route.query.key] = this.$route.query.code;
          this.queryData();
        }
      } catch (e) {
        console.log(e);
      }
    },
    async update () {
      try {
        var { data, status } = await api.saveoverdueinterest(this.upfrom);
        if (status == "200") {
          this.$message.success("修改成功");
          this.dialogFormVisible = false;
          this.queryData();
        }
      } catch (e) {
        this.$message.error("修改失败，请重试");
        return;
      }
    },
    // 跳转应收结算单
    handleJump (param, data) {
      this.addbreadCrumbsList({
        title: "/应收结算单",
        data: { status: param, formData: data },
        path: "/ReceivesettlementForm"
      });
      this.$router.push({
        name: "ReceivesettlementForm"
      });
    },
    //页签调到第一页 查询
    goStartPage () {
      this.ruleForm.pageIndex = 1;
      this.queryData();
    },
    //切换页码和大小 查询
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      this.queryData();
    },
    clickRow (row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow (row) {
      this.clickRow(row);
    }
  },
  created () {
    this.goStartPage();
    api.getEnum("reasonType").then(result => {
      this.selectOption = result.data;
    });
  },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
};
</script>

<style scoped lang='less'>
.optionbtn {
  text-align: right;
  margin-bottom: 20px;
}
</style>
