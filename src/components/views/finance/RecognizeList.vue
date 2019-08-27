/** 认款单 **/
<template>
  <div>
    <query-bar
      :ruleForm="ruleForm"
      :formConfig="queryBarParams.formConfig"
      :btnObj="queryBarParams.btnObj"
      @handleBtnClickType="queryClick"
    ></query-bar>
    <!-- 表格 -->
    <el-table :data="tableData" height="250" border style="width: 100%">
      <el-table-column prop="date" label="单据编号" width="180"></el-table-column>
      <el-table-column prop="name" label="业务日期" width="180"></el-table-column>
      <el-table-column prop="address" label="是否生成凭证"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="收款折应收币别汇率"></el-table-column>
      <el-table-column prop="address" label="收款认款金额"></el-table-column>
      <el-table-column prop="address" label="余额是否收取"></el-table-column>
      <el-table-column prop="address" label="应收认款金额"></el-table-column>
      <el-table-column prop="address" label="备注"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import QueryBar from "@/components/common/QueryBar.vue";
export default {
  data: () => ({
    ruleForm: {},
    queryBarParams: {
      btnObj: [
        { type: "search", label: "查询" },
        { type: "add", label: "新增" },
        { type: "update", label: "操作" },
        { type: "delete", label: "删除" }
      ],
      formConfig: [
        { label: "委托单号", moduleBind: "entrustNo", isInput: true },
        { label: "状态", moduleBind: "status", isSelect: true },
        { label: "公司", moduleBind: "company", isInput: true },
        { label: "收款单号", moduleBind: "receiptNo", isInput: true },
        { label: "客户", moduleBind: " client", isInput: true },
        { label: "创建时间", moduleBind: "createTimeFrom", isDate: true }
      ]
    },
    tableData: []
  }),
  components: {
    QueryBar
  },
  methods: {
    /**
     * @method queryClick 点击查询栏按钮事件
     */
    queryClick: (() => {
      var obj = null;
      return function(type, clear) {
        if (clear) {
          obj = null;
        } else {
          !obj && (obj = this.queryClickObj());
          obj[type].bind(this)();
        }
      };
    })(),
    queryClickObj() {
      return {
        search() {},
        add() {
          this.handleJump("add");
        },
        update() {
          this.handleJump("update");
        },
        delete() {}
      };
    },
    handleJump(param) {
      this.$router.push({ name: "RecognizeForm", params: { jumpType: param } });
    }
  },
  mounted() {},
  beforeDestroy() {
    this.queryClick("", 1);
  }
};
</script>
<style lang="less" scoped>
</style>
