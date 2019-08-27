<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-menu"></i> 认款后逾期利息表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarFormConfig"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData.list"
        border
        highlight-current-row
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
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
        <pagination @handlePageChange="handleChange" :count="tableData.total"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import api from "@/assets/js/appHelper";
import Pagination from "@/components/common/Pagination";
import QueryBar from "@/components/common/QueryBar";
import tableconfig from '@/domain/tableconfig/finance/InvoiceReceipt'

export default {
  components: {
    QueryBar,
    Pagination
  },
  computed: {},
  data: () => ({
    queryBarFormConfig: [
	  { label: "单据编号", moduleBind: "billNo", isInput: true }
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
    curRowData: ""
  }),
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    // 点击查询栏按钮事件
    handleBtnClick: (() => {
      var obj = null;
      return function(type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.handleBtnClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    // 查询栏按钮绑定的事件
    handleBtnClickObj() {
      return {
        search() {
          this.goStartPage();
        },
        add() {
          this.handleJump("create", "");
        },
        async update() {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.warning("请选择要修改的数据");
          } else {
            this.handleJump("update", this.curRowData);
          }
        },
        delete() {
          if (JSON.stringify(this.curRowData) == "{}") {
            this.$message.warning("请选择要删除的数据");
          } else {
            this.$alert("删除不可恢复，是否确定删除？", "删除", {
              showCancelButton: true,
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              beforeClose: (action, instance, done) => {
                if (action === "confirm") {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = "执行中...";
                  setTimeout(() => {
                    // 删除
                    api.removeinvoicereceipt(this.curRowData.billNo).then(res => {
                      if (res) {
                        this.$message.success("删除成功");
                        this.goStartPage();
                      }
                    });
                    done();
                    setTimeout(() => {
                      instance.confirmButtonLoading = false;
                    }, 300);
                  }, 1000);
                } else {
                  done();
                }
              }
            });
          }
        }
      };
    },
    // 跳转操作
    handleJump(param, data) {
      this.addbreadCrumbsList({
        title: "/发票签收单",
        data: { status: param, formData: data },
        path: "/InvoiceReceiptForm"
      });
      this.$router.push({
        name: "InvoiceReceiptForm"
      });
    },
    // 查询
    async queryData() {
      try {
        const { data } = await api.queryinvoicereceiptSearch(this.ruleForm);
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
    //页签调到第一页 查询
    goStartPage() {
      this.ruleForm.pageIndex = 1;
      this.queryData();
    },
    //切换页码和大小 查询
    handleChange(paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;
      this.queryData();
    },
    clickRow(row) {
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row);
    },
    dblclickTableRow(row) {
      this.clickRow(row);
      this.handleBtnClick("update");
    }
  },
  created() {
    this.goStartPage();
  },
  beforeDestroy() {
    this.handleBtnClick("", 1);
  }
};
</script>

<style scoped lang='less'>
</style>
