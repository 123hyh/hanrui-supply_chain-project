<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <!-- 查询栏 -->
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="formConfig"
        :btnObj="btnObj"
        @handleBtnClickType="handleBtnClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        border
        highlight-current-row
        @row-click="clickRow"
        @row-dblclick="dblclickTableRow"
        ref="moviesTable"
      >
        <el-table-column
          v-for='item in tableconfig'
          :key="item.label"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </el-table>
      <div class="pagination">
        <pagination
          @handlePageChange="handleChange"
          :count="ruleForm.total"
        ></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/commerce/ExportOrder'
export default {
  components: {
    Pagination,
    QueryBar
  },
  data: () => ({
    tableconfig,
    menuName: '出口任务单',
    tableData: [],
    ruleForm: {
      pageIndex: 1,
      pageSize: 10,
      total: 100,
    },
    formConfig: [
      { label: "委托单号", moduleBind: "entrustNo", isInput: true },
      { label: "委托方", moduleBind: "status", isInput: true },
      { label: "商务员", moduleBind: "company", isInput: true },
      { label: "开始日期", moduleBind: "receiptNo", isInput: true },
      { label: "结算日期", moduleBind: " client", isInput: true },
      { label: "深圳物流操作完成", moduleBind: "createTimeFrom", isInput: true },
    ],
    btnObj: [
      { type: "search", label: "查询" },
      { type: "add", label: "新增" },
      { type: "update", label: "修改" },
      { type: "delete", label: "删除" },
    ]
  }),
  methods: {
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     */
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
    handleBtnClickObj () {
      return {
        search () { },
        add () {
          this.handleJump("add");
        },
        update () {
          this.handleJump("update");
        },
        delete () { }
      };
    },
    handleJump (param) {
      this.$router.push({
        name: "ExportOrderForm",
        params: {
          jumpType: param
        }
      });
    },
    handleChange (paper) {
      this.ruleForm.pageIndex = paper.pageIndex;
      this.ruleForm.pageSize = paper.pageSize;

    },
    clickRow (row) {
      this.$store.commit('curRowData', row);
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('update');
    },
  },
  mounted () { },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
