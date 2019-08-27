<template>
  <div class="TableComponent-2019-7-18">
    <query-bar
      v-if="queryBarVisible"
      :ruleForm="ruleForm"
      :formConfig="formConfig"
      :btnObj="btnObj"
      @handleBtnClickType="handleBtnClick"
    ></query-bar>
    <el-table
      :data="popoverList"
      tooltip-effect="dark"
      :highlight-current-row="true"
      max-height="600"
      border
      style="width: 100%"
      @row-click="activeRow"
      @row-dblclick='tableDbclick'
    >
      <!-- <el-table-column
        v-for="(item,index) in configList"
        :show-overflow-tooltip='true'
        :key="index"
        :prop="item.key || item.prop"
        :label="item.name || item.label"
        :width="!index && 200"
      ></el-table-column> -->
    <template v-for="(item,index) in configList">
      <el-table-column
        v-if="item.template !== true"
        :show-overflow-tooltip='true'
        :key="index"
        :prop="item.key || item.prop"
        :label="item.name || item.label"
        :width="!index && 200">
      </el-table-column>
      <el-table-column
        v-else
        :key="index"
        fixed="right"
        :prop="item.key || item.prop"
        :label="item.name || item.label"
        :width="!index && 200">
        <template slot-scope="scope">
          <slot :default='scope.row'></slot>
        </template>
      </el-table-column>
    </template>
    </el-table>
    <pagination
      @handlePageChange="handlePageChange"
      :count="count"
    ></pagination>

    <!-- 双击显示详情弹窗 -->
    <el-dialog
      v-if='isSubTable'
      title="详情"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleCloseDialog"
    >
      <div class="layout">
        <p
          v-for="item of popoverListKey"
          :key='item.prop'
        >
          <span>{{item.label}}：</span>
          <span>{{dbclickData[item.prop]}}</span>
        </p>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import Pagination from "@/components/common/Pagination.vue";
import QueryBar from "@/components/common/Table.Form.Dialog/query-bar/DialogQueryBar.vue";
export default {
  data: _ => ({
    dialogVisible: false,
    dbclickData: {}
  }),
  computed: {
    configList () {
      return this.popoverListKey.filter(item => !item.hide)
    }
  },
  watch: {
    dialogVisible (cur) {
      // 清空点击数据
      !cur && (this.dbclickData = {})
    }
  },
  props: {
    /**
     * @property popoverListKey 配置表
     * @property popoverList 表格数据
     * @property ruleForm 搜索栏表单输入的数据
     * @property formConfig 搜索栏表单 的配置集合
     * @property btnObj 搜索栏的按钮集合
     * @property isSubTable 当前是否是子表 如果是 才运行双击查看详情弹窗
     */
    popoverListKey: {
      type: Array,
      required: true
    },
    popoverList: {
      type: Array,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    isSubTable: Boolean,

    queryBarVisible: Boolean,
    ruleForm: Object,
    formConfig: Array,
    btnObj: Array
  },
  methods: {

    tablebtn(){
      this.$emit("formClickPreservation");
    },

    handleBtnClick (val = "") {
      this.$emit("dialogQueryBarClick", val);
    },

    handlePageChange (val = {}) {
      this.$emit("update:pageData", val);
    },

    activeRow (data = {}) {
      this.$emit("update:activeRow", data),
        this.$emit('rowClickData', data)
    },

    // 双击表格事件
    tableDbclick (row, e) {
      this.dbclickData = row,
        this.dialogVisible = true;
      // 向上触发双击事件
      this.$emit('dblclickTableRow', row)
    },
    handleCloseDialog () {
      this.dialogVisible = false;
    }
  },
  components: {
    Pagination,
    QueryBar
  }
};
</script>
<style lang="less">
</style>
