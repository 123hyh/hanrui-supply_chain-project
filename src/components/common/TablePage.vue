<template>
  <div class="table-page">
    <el-table
      :data="tableData"
      border
      highlight-current-row
      @row-click="rowClick"
      @row-dblclick='tableDbclick'
      ref="leftTable"
      :height="height"
    >
      <el-table-column
        v-for="item in tableHeader"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </el-table>
    <pagination
      v-if="showPager"
      @handlePageChange="pageChange"
      :count="dataCount"
    ></pagination>
    <!-- 双击显示详情弹窗 -->
    <el-dialog
    v-dialogDrag
      class="TableComponent-2019-7-18"
      v-if='isSubTable'
      title="详情"
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleCloseDialog"
    >
      <div class="layout">
        <p
          v-for="item of tableHeader"
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
/**
 * 
 */
import Pagination from "@/components/common/Pagination.vue";
import api from "@/assets/js/appHelper";
export default {

  components: { Pagination },
  props: {
    isSubTable: {
      type: Boolean,
      default: false
    },
    height: {//表格高度
      type: Number,
      default: 400
    },
    tableHeader: Array,//表头
    tableAjax: {//请求参数
      type: Object,
      default: {
        api: "",
        params: {}
      }
    },
    propTableData: Array,//表格数据
    propCount: {
      type: Number,
      default: 0
    },
    showPager: {//是否显示页码
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tableData: this.propTableData,
      dataCount: this.propCount,
      curRow: {},
      pager: {
        pageIndex: 1,
        pageSize: 10
      },
      dialogVisible: false,
      dbclickData: {}
    };
  },
  methods: {
    handleCloseDialog () {
      this.dialogVisible = false;
    },
    //请求表格数据
    async requestTable (pager) {
      try {
        const { data } = await api[this.tableAjax.api]({
          ...this.tableAjax.params,
          ...pager ? pager : { pageIndex: 1, pageSize: 10 }
        });
        this.tableData = data.list;
        this.dataCount = data.count;
        this.$emit('rowClick', {})
        this.$emit('tableChange', {
          tableData: this.tableData,
          dataCount: this.dataCount
        })
      } catch (error) {
        console.log(error)
      }
    },
    //翻页请求数据
    pageChange: function (pager) {
      this.pager = pager
      this.requestTable(pager)
    },
    //选中行
    rowClick: function (row) {
      this.$emit('rowClick', row)
    },
    tableDbclick (row) {
      this.dialogVisible = true;
      this.dbclickData = row
    }
  },
  watch: {
    dialogVisible (cur) {
      !cur && (this.dbclickData = {})
    }
  }
};
</script>

<style lang='less' scoped>
</style>