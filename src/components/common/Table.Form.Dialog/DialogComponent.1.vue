/* 带提交状态的弹窗 */
<template>
  <div class="form-table-dialog">
    <!--弹出框组件 -->
    <el-dialog
      v-dialogDrag
      :title="itemName"
      :visible.sync="isShowPopover"
      @close.native="handleClose"
      :width="width"
      :close-on-click-modal="false"
      close-on-press-escape
      :before-close="handleClose"
    >
      <!-- 中间主体组件 -->
      <keep-alive>
        <!-- 缓存该组件 -->
        <components
          :is="componentType"
          :popoverListKey="popoverListKey"
          :popoverList="popoverList"
          :count="count"
          :queryBarVisible="queryBarVisible"
          :ruleForm="ruleForm"
          :formConfig="formConfig"
          :btnObj="btnObj"
          :formData="formData"
          @handlerSearchClick="handlerFormConfigClickSearch"
          @handlerFormVerify="handlerFormVerify"
          @dialogQueryBarClick="handleBtnClick"
          :btnTarget.sync="btnTarget"
          :multipleTable.sync="multipleTable"
          :pageData.sync="pageData"
          :activeRow.sync="clickCurrentRowData"
        ></components>
      </keep-alive>
      <!-- 弹窗底部的按钮 -->
      <div class="btn-right">
        <el-button
          v-for="({label,type}, index) in btnList"
          :key="index"
          :loading="( type === 'submit' || type === 'insert' ) ? saveLoading : false "
          :disabled="type === 'submit' && !billsStatus"
          @click.stop="handlerBtnClickEvent($event, type)"
        >{{label}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    // 设置按钮的个数
    btnList() {
      let list = [{ label: "取消", type: "cancel" }];
      if (this.popoverType === "form") {
        // 状态 1=>保存状态； 2=>提交状态；3=>审核中； 4=>审核通过；
        switch (this.billsStatus) {
          case "":
          case undefined:
          case null:
            list.unshift({ label: "保存", type: "insert" });
            break;
          case "2":
            break;
          default:
            list.unshift(
              { label: "保存", type: "insert" },
              { label: "提交", type: "submit" }
            );
        }
      } else {
        list.unshift({ label: "确定", type: "ok" });
      }
      return list;
    },
    /* 动态组件的值 */
    componentType() {
      let obj = {
        table: "TableDialogComponent",
        form: "FormDialogComponent",
        selectTable: "selectTableDialogComponent"
      };
      return obj[this.popoverType];
    }
  },
  components: {
    FormDialogComponent: () =>
      import("@/components/common/Table.Form.Dialog/dialog-item-template/FormDialogComponent.vue"),
    TableDialogComponent: () =>
      import("@/components/common/Table.Form.Dialog/dialog-item-template/TableDialogComponent.vue"),
    selectTableDialogComponent: () =>
      import("@/components/common/Table.Form.Dialog/dialog-item-template/selectTableDialogComponent.vue")
  },
  data() {
    return {
      clickCurrentRowData: {}, // 当前选择行数据
      multipleTable: [], // 当前多选的行数据
      btnTarget: "", // 当前点击按钮的 类型
      pageData: {} // 分页数据
    };
  },
  watch: {
    /**
     * @property isShowPopover 监听弹窗可见 清空 点中的数据 和 多选表格选中的数据
     * @method pageData 监听分页参数的 变化 ，emit到父组件
     */
    isShowPopover: {
      handler(newVal) {
        if (this.popoverType !== "form") {
          this.clickCurrentRowData = {};
          this.multipleTable = [];
        }
      },
      deep: true,
      immediate: true
    },
    pageData: {
      handler() {
        this.handlePageChange();
      },
      deep: true
    }
  },
  props: {
    /**
     * @property { String } width 弹窗的宽度
     * @property { itemName } 弹窗的标题
     * @property { Object } formConfig 查询栏的form配置
     * @property { Object } ruleForm 查询栏输入框绑定的对象
     * @property { Array } btnObj 查询栏按钮配置集合
     * @property { Boolean } isShowPopover 控制弹窗是否可见
     * @property { Boolean } queryBarVisible 弹窗为表格时 控制 查询栏是否可见
     * @property { Array } popoverList 表格弹窗的数据
     * @property { Array } popoverListKey 表格弹窗的配置
     * @property { String } currencySelectInputKey 表格当前选中数据对应的输入框
     * @property { String } popoverType 弹窗的类型
     * @property { Number } count 表格数据的总条数
     * @property { Object } formData : { ruleForm , formConfig } ruleForm 表单所绑定的对象 , formConfig 表单的配置
     * @property { String } billsStatus 当前的 单据状态
     * @property { Boolean } saveLoading 保存 或者 提交时按钮的loading 状态
     */
    width: {
      type: String,
      required: false,
      default: "50%"
      // default: '720px' // 2019-5-6 update 黄裕辉
    },
    itemName: {
      type: String,
      required: false
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
    // table
    isShowPopover: {
      type: Boolean,
      default: false
    },
    queryBarVisible: {
      type: Boolean,
      default: true
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
      default: "table"
    },
    saveLoading: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    },
    // from类型弹窗
    formData: {
      type: Object,
      default: () => ({})
    },
    // 单据状态 （控制操作按钮的显示） 可不传 ，不传的话 会取parent的表单的数据中的status
    billsStatus: {
      type: String,
      default: ""
    }
  },
  methods: {
    // 底部按钮点击事件
    handlerBtnClickEvent(e, type) {
      this.btnTarget = type;
      switch (type) {
        case "insert":
          this.$emit("formClickPreservation");
          break;
        case "ok":
          this.clickPreservation(e);
          break;
        case "cancel":
          this.handleClose();
          break;
        case "submit":
          this.clickDialogAffirm();
          break;
        default:
          console.error("未配置该按钮事件");
      }
    },
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     * @method clickPreservation 点击保存操作及提示
     * @method handlePageChange 分页事件
     */
    handleBtnClick(params) {
      this.$emit("handleBtnClickType", params);
    },
    clickPreservation(e) {
      if (Object.keys(this.clickCurrentRowData).length) {
        this.$emit(
          "handlerSubPreservation",
          this.clickCurrentRowData,
          this.currencySelectInputKey
        );
        this.handleClose(e);
      } else if (this.multipleTable.length !== 0) {
        this.$emit(
          "handlerSubPreservation",
          this.multipleTable,
          this.currencySelectInputKey
        );
        this.handleClose(e);
      } else {
        this.$message({
          // 提示
          message: "请选择一条数据",
          type: "warning"
        });
      }
    },
    // 点击分页条事件
    handlePageChange() {
      this.$emit("handlePageChange", this.pageData);
    },
    // before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
    handleClose(done) {
      this.$emit("update:isShowPopover", false);
    },
    handlerFormConfigClickSearch(params) {
      this.$emit("handlerFormConfigClickSearch", params);
    },
    /* emit 验证规则 */
    handlerFormVerify(rules) {
      this.$emit("update:verificationRules", rules);
    },
    // 点击提交后 确认框点击确定事件
    clickDialogAffirm() {
      this.$confirm("一旦提交将无法修改，是否确定提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit(
          "handleFormDialogClickSubmitEvent" /* "formClickPreservation" */,
          { type: this.btnTarget }
        );
      });
    }
  }
};
</script>
<style lang='less'>
.form-table-dialog {
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
}
</style>
