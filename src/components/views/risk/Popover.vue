<template>
  <div>
    <!--弹出框组件 -->
    <el-dialog :title="title" :visible.sync="isShow" @close="closeDialog">
      <div v-if="!isPopoverSelection">
        <el-table
          :data="popoverList"
          :highlight-current-row="true"
          max-height="600"
          border
          style="width: 100%"
          @row-click="activeRow"
        >
          <el-table-column
            v-for="(item,index) in popoverListKey"
            :key="index"
            :prop="item.key"
            :label="item.name"
          ></el-table-column>
        </el-table>
      </div>

      <!-- 多选框表格 -->
      <div v-else>  
        <el-table
          ref="multipleTable"
          :data="popoverList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column
            v-for="(item,index) in popoverListKey"
            :key="index"
            :label="item.name"
            :prop="item.key"
          ></el-table-column>
        </el-table>
      </div>
      <div class="btn-right">
        <el-button @click="clickPreservation">保存</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    <pagin-component :count='count' @handlePageChange='handlePageChange'></pagin-component>
    </el-dialog>
  </div>
</template>
<script>
import PaginComponent from '@/components/common/Pagination.vue'
export default {
  data() {
    return {
      isShow: false,
      clickData: []
      /* clickData: { }, // 当前选择行数据
      multipleTable: [], // 当前多选的行数据 */
    };
  },
  watch: {
    isShowPopover: {
      handler(newVal) {
        this.isShow = newVal;
      },
      deep: true
    }
  },
  props: {
    isShowPopover: {
      type: Boolean,
      default: false
    },
    popoverList: {
      type: Array,
      required: true
    },
    popoverListKey: {
      type: Array,
      required: true
    },
    isPopoverSelection: {
      type: Boolean,
      required: true
    },
    title:{
      type: String,
      default: ''
    },
    count: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * @method changeisShowPopover 处理弹窗显示隐藏
     * @method activeRow  当前点击行的数据
     * @method clickPreservation 点击保存操作及提示
     * @method closeDialog  关闭弹窗
     */
    changeisShowPopover(is) {
      this.$emit("changeisShowPopover", "", is);
    },
    activeRow(data) {
      this.clickData = data;
    },
    clickPreservation() {
        this.$emit(
          "handlerSubPreservation",
          this.clickData,
        );
        this.closeDialog();
    },
    closeDialog() {
      this.$emit('closeDialog')
    },
    handleSelectionChange(val) {
      this.clickData = val;
    },
    handlePageChange(data){
      this.$emit('handlePageChange',data)
    }
  },
  components:{
    PaginComponent
  }
};
</script>
<style lang='less'>
.btn-right {
  text-align: right;
  margin: 25px 0 0 0;
  & > button {
    margin-left: 30px !important;
  }
}
</style>
