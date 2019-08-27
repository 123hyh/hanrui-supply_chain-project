/** 认款单 **/
<template>
  <div>
    <breadcrumb-navigation />
    <div class="container pd-10">
      <query-bar
        :ruleForm="ruleForm"
        :formConfig="queryBarParams.formConfig"
        :btnObj="queryBarParams.btnObj"
        @handleBtnClickType="queryClick"
      ></query-bar>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        :height="'75vh'"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="单据编号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="转出委托单号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="委托方"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="转出查款单号"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="转出收款单号"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="可转金额"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="转出金额"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="转出币别"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="到账日期"
        ></el-table-column>
        <el-table-column
          prop="address"
          label="单据状态"
        ></el-table-column>
      </el-table>
      <!-- 分页条 -->
      <pagina-tion :count='1'></pagina-tion>
    </div>
  </div>
</template>
<script>
import QueryBar from "@/components/common/QueryBar.vue";
import PaginaTion from '@/components/common/Pagination.vue'
export default {
  data: () => ({
    ruleForm: {},
    queryBarParams: {
      btnObj: [
        { type: "search", label: "查询" },
        { type: "add", label: "新增" },
        { type: "update", label: "修改" },
        { type: "delete", label: "删除" }
      ],
      formConfig: [
        { label: "编码", moduleBind: "", isInput: true },
        { label: "名称", moduleBind: "", isInput: true },
        { label: "制单人", moduleBind: "remittanceNo", isInput: true },
        { label: "制单时间", moduleBind: "createTimeFrom", isDate: true },
        { label: "~", moduleBind: "createTimeTo", isDate: true },
      ]
    },
    tableData: []
  }),
  components: {
    QueryBar,
    PaginaTion
  },
  methods: {
    /**
     * @method queryClick 点击查询栏按钮事件
     */
    queryClick: (() => {
      var obj = null;
      return function (type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.queryClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    queryClickObj () {
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
      this.$router.push({ name: "AllocationOrderForm", params: { jumpType: param } });
    }
  },
  mounted () { },
  beforeDestroy () {
    this.queryClick("", 1);
  }
};
</script>
<style lang="less" scoped>
</style>
