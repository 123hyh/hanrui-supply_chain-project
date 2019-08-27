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
        <pagination :count="totalCount"></pagination>
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
import api from '@/assets/js/appHelper'
import Pagination from '@/components/common/Pagination'
import QueryBar from '@/components/common/QueryBar'

import tableconfig from '@/domain/tableconfig/commerce/ExportDeliveryPlan'
export default {
  components: {
    Pagination,
    QueryBar
  },
  data: () => ({
    tableconfig,
    menuName: '出口交货计划',
    delVisible: false,
    tableData: [],
    totalCount: 100,
    ruleForm: {},
    formConfig: [
      { label: "单据编号", moduleBind: "entrustNo", isInput: true },
      { label: "委托方", moduleBind: "status", isInput: true },
      { label: "供应商", moduleBind: "company", isInput: true },
      { label: "客户", moduleBind: "receiptNo", isInput: true },
      { label: "委托单号", moduleBind: " client", isInput: true },
      { label: "商品信息", moduleBind: "createTimeFrom", isInput: true },
      { label: "型号", moduleBind: "createTimeFrom", isInput: true },
      { label: "品牌", moduleBind: "createTimeFrom", isInput: true },
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
        name: "ExportDeliveryPlanForm",
        params: {
          jumpType: param
        }
      });
    },
    clickRow (row) {
      this.$store.commit('curRowData', row);
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    dblclickTableRow (row) {
      this.clickRow(row)
      this.handleBtnClick('update');
    },
    deleteRow () { }
  },
  mounted () { },
  beforeDestroy () {
    this.handleBtnClick("", 1);
  }
}
</script>

<style>
</style>
