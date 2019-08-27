/* 弹窗公共组件 */
<template>
  <div>
    <!--弹出框组件 -->
    <el-dialog
      v-dialogDrag
      :title="itemName"
      :visible.sync="isShow"
      @close.native="closePopover($event)"
      :width="popoverType === 'form' ?'1100px': width"
      :close-on-click-modal='false'
      close-on-press-escape
      :before-close="handleClose"
    >
      <!-- 查询栏 -->
      <div v-if=" popoverType!='form' ">
        <query-bar
          v-if="popoverType!='form'"
          :ruleForm="ruleForm"
          :formConfig="formConfig"
          :btnObj="btnObj"
          @handleBtnClickType="handleBtnClick"
        ></query-bar>
        <div v-if="popoverType=='table'">
          <el-table
            :data="popoverList"
            :highlight-current-row="true"
            border
            style="width: 100%"
            @row-click="handleClickRow"
          >
            <el-table-column
              v-for="(item,index) in popoverListKey"
              :key="index"
              :prop="item.key || item.prop"
              :label="item.name || item.label"
            ></el-table-column>
          </el-table>
        </div>

        <!-- 多选框表格 -->
        <div v-else-if="popoverType=='selectTable'">
          <el-table
            ref="multipleTable"
            :data="popoverList"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
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
            >
              <template slot-scope="scope">
                {{scope.row[item.prop] | booltoString}}
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- <div v-else> -->
        <!-- <form-config 
				:formModel="formModel" 
				:inputKey="inputKey" 
				@handlerFormConfigClickSearch='rousePopover'
          ></form-config>-->
        <!-- </div> -->
        <pagination
          v-if="popoverType!='form'"
          @handlePageChange="handlePageChange"
          :count="count"
        ></pagination>
      </div>
      <div v-else>
        <form-config
          ref="formModel"
          :formModel='formData.ruleForm'
          :inputKey='formData.formConfig'
          @handlerFormConfigClickSearch='handlerFormConfigClickSearch'
          @handlerFormVerify="handlerFormVerify"
        ></form-config>
      </div>
      <div class="btn-right">
        <el-button
          @click.stop="clickPreservation($event)"
          :loading="loading"
        >确定</el-button>
        <el-button @click.stop="closePopover($event)">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QueryBar from '@/components/common/DialogQueryBar.vue';
import Pagination from '@/components/common/Pagination.vue';
import FormConfig from '@/components/common/FormConfig.vue';
export default {
  name: 'popover',
  components: {
    QueryBar,
    FormConfig,
    Pagination
  },
  data () {
    return {
      isShow: false,
      clickCurrentRowData: {}, // 当前选择行数据
      multipleTable: [], // 当前多选的行数据
    };
  },
  filters: {
    booltoString (bool) {
      return Object.prototype.toString.call(bool).slice(8, -1) != 'Boolean' ? bool : bool ? '是' : '否'
    }
  },
  watch: {
    isShowPopover: {
      handler (newVal) {
        this.isShow = newVal;
        this.clickCurrentRowData = {}
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    // el-deloion
    width: {
      type: String,
      required: false,
      default: '50%',
      // default: '720px' // 2019-5-6 update 黄裕辉
    },
    // queryBar
    formConfig: {
      type: Array,
      default: () => []
    },
    ruleForm: {
      type: Object,
      default: () => ({})
    },
    btnObj: {
      type: Array,
      // required: false,
      default: () => [] /* ()=>[
				{ type: "search", label: "查询" },
			] */
    },
    itemName: {
      type: String,
      required: false
    },
    // table
    isShowPopover: {
      type: Boolean,
      default: false
    },
    popoverList: {
      type: Array,
      required: false
    },
    popoverListKey: {
      type: Array,
      required: false
    },
    currencySelectInputKey: {
      type: String,
      default: ""
    },
    popoverType: {
      type: String,
      default: 'table'
    },
    //form
    // 		formModel: {
    // 			type: Object,   
    // 			required: true
    // 		},
    // 		inputKey: {
    // 			type: Array,
    // 			required: true
    // 		},
    //分页
    count: {
      type: Number,
      default: 0
    },
    // from类型弹窗
    formData: {
      type: Object,
      default: () => ({})
      // required: false
    },
  },
  methods: {
		/**
		 * @method handleBtnClick 点击查询栏按钮事件
		 */
    handleBtnClick (params) {
      this.$emit("handleBtnClickType", params);
    },
    /**
     * @method changeisShowPopover 处理弹窗显示隐藏
     * @method handleClickRow  当前点击行的数据
     * @method clickPreservation 点击保存操作及提示
     * @method closePopover 关闭弹窗
     */
    changeisShowPopover (is) {
      this.$emit('update:isShowPopover', false)
      this.$emit("changeisShowPopover", "", is);
    },
    handleClickRow (data) {
      this.clickCurrentRowData = data;
    },
    //多选value
    handleSelectionChange (val) {
      this.multipleTable = val;
    },
    clickPreservation (e) {
      //
      if (this.popoverType != 'form') {
        if (Object.keys(this.clickCurrentRowData).length) {
          this.$emit(
            "handlerSubPreservation",
            this.clickCurrentRowData,
            this.currencySelectInputKey
          );
          this.closePopover(e);
        } else if (this.multipleTable.length !== 0) {
          this.$emit(
            "handlerSubPreservation",
            this.multipleTable,
            this.currencySelectInputKey
          );
          this.closePopover(e);
        } else {
          this.$message({
            // 提示
            message: "请选择一条数据",
            type: "warning"
          });
        }
      } else {
        this.$emit(
          "formClickPreservation"
        );
        // this.closePopover(e);
      }
    },
    closePopover (e) {
      e = e || window.e;
      e.cancelBubble = true;
      // this.isShow = !this.isShow;
      this.changeisShowPopover(this.isShow);
    },
    //form
    // 		rousePopover(key){
    // 			this.$emit('rousePopover', key);
    // 		},
    // 分页
    handlePageChange (paper) {
      this.$emit("handlePageChange", paper);
    },
    // before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
    handleClose (done) {
      // 			let popDiv = document.getElementsByClassName('el-dialog__headerbtn')[0];
      // 			popDiv.addEventListener('click',()=>done())

      this.changeisShowPopover();
    },
    handlerFormConfigClickSearch (params) {
      this.$emit('handlerFormConfigClickSearch', params)
    },
    /* emit 验证规则 */
    handlerFormVerify ($refs) {
      this.$emit('handlerFormVerify', $refs)
    }
  },
};
</script>
<style lang='less' scoped>
.btn-right {
  text-align: right;
  margin: 25px 0 0 0;
  & > button {
    margin-left: 30px !important;
  }
}
/* .el-dialog__body{
  >div{
    >div{
      max-height: 80vh;
      overflow: scroll
    }
  }
} */
</style>
