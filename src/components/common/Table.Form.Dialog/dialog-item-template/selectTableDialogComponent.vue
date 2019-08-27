<template>
  <div>
    <!-- 查询栏 -->
    <query-bar
      v-if="queryBarVisible"
      :ruleForm="ruleForm"
      :formConfig="formConfig"
      :btnObj="btnObj"
      @handleBtnClickType="handleBtnClick"
    ></query-bar>
    <!-- 主表格 -->
    <el-table
      ref="multipleTable"
      :data="popoverList"
      tooltip-effect="dark"
      :show-overflow-tooltip='true'
      style="width: 100%"
      max-height="600"
      border
      @selection-change="handleSelectmultipleTable"
      @row-click="activeRow"
      @row-dblclick='tableDbclick'
    >
      <el-table-column
        type="selection"
        width="55"
      ></el-table-column>
      <el-table-column
        v-for="(item,index) in popoverListKey"
        :key="index"
        :prop="item.key || item.prop"
        :label="item.name || item.label"
        :type="item.type"
        :width="item.width"
        :show-overflow-tooltip='true'
      >
      </el-table-column>

      <!-- 插槽 -->
      <template v-if="addSlot.label">
        <el-table-column
          label="操作"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleSlotEvent( popoverList[scope.$index])"
              type="text"
              size="small"
            >
              {{addSlot.label}}
            </el-button>
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
      class='TableComponent-2019-7-18'
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
import TableComponent from "@/components/common/Table.Form.Dialog/dialog-item-template/TableDialogComponent.vue";
import Pagination from "@/components/common/Pagination.vue";
import QueryBar from "@/components/common/Table.Form.Dialog/query-bar/DialogQueryBar.vue";

export default {
  data: _ => ({
    dialogVisible: false,
    dbclickData: {}
  }),
  props: {
    /**
     * @property popoverListKey 配置表
     * @property popoverList 表格数据
     * @property ruleForm 搜索栏表单输入的数据
     * @property formConfig 搜索栏表单 的配置集合
     * @property btnObj 搜索栏的按钮集合
     * @property isSubTable 是否是子表
     * @property addSlot slot 集合
     */
    popoverListKey: {
      type: Array,
      required: true
    },
    popoverList: {
      type: Array,
      required: true
    },
    multipleTable: {
      type: Array,
      required: true
    },
    isSubTable: Boolean,
    queryBarVisible: Boolean,
    ruleForm: Object,
    formConfig: Array,
    btnObj: Array,
    count: Number,
    addSlot: Object
  },
  methods: {
    /**
     * @method handleBtnClick 查询栏 按钮点击事件
     * @method handleSelectmultipleTable 多选表格数据事件
     * @method handlePageChange 分页条点击事件
     * @method activeRow 单击某一行数据 事件 列为该数据被选中
     */
    handleBtnClick (val = "") {
      this.$emit("dialogQueryBarClick", val);
    },
    handleSelectmultipleTable (val = []) {
      this.$emit("update:multipleTable", val);
    },
    handlePageChange (val = {}) {
      Promise.all([
        this.$emit("update:pageData", val),
        this.$emit("update:multipleTable", [])
      ]);
      this.$refs.multipleTable.clearSelection(); // 清空多选
    },
    activeRow (data) {
      if (data) {
        const temp = Array.isArray(data) ? data : [data];
        temp.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      }
    },
    handleCloseDialog () {
      this.dialogVisible = false, this.dbclickData = {}
    },
    tableDbclick (row) {
      this.dbclickData = row, this.dialogVisible = true
    },

    // 点击slot 事件
    handleSlotEvent (data) {
      this.$emit('handleSlotEvent', data)
    }
  },
  components: {
    TableComponent,
    Pagination,
    QueryBar
  }
};
</script>