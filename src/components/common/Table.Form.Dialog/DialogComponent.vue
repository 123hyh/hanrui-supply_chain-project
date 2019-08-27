/* 带提交状态的弹窗 */
<template>
  <div>
    <!--弹出框组件 -->
    <el-dialog
      v-dialogDrag
      :title="itemName"
      :visible.sync="isShow"
      @close.native="closePopover($event)"
      :width="popoverType === 'form' ? '1020px' : width"
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
            max-height="600"
            border
            style="width: 100%"
            @row-click="activeRow"
          >
            <el-table-column
              v-for="(item,index) in popoverListKey"
              :key="index"
              :prop="item.key || item.prop"
              :label="item.name || item.label"
              :width="!index && 200"
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
            max-height="600"
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
            ></el-table-column>
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
        <template v-if='btnObj.length'>
          <btn-component
            :btnList='btnObj'
            @handleItemBtnClick=" type => $emit('handleItemBtnClick', type)"
          ></btn-component>
        </template>
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
          v-for="({label,type}, index) in btnList"
          :key="index"
          :disabled="type === 'submit' && !billsStatus"
          @click.stop="handlerBtnClickEvent($event,type)"
        >{{label}}</el-button>

        <!-- <el-button @click.stop="clickPreservation($event)">确定</el-button>
        <el-button @click.stop="closePopover($event)">取消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script>
import QueryBar from '@/components/common/DialogQueryBar.vue';
import Pagination from '@/components/common/Pagination.vue';
import FormConfig from '@/components/common/FormConfig.vue';
import BtnComponent from '@/components/common/BtnComponent.vue'
import submitPathConfig from '@/domain/common/submitPortConfig/submitModulePortConfig.js'
import api from "@/assets/js/appHelper.js";

export default {
  inject: { path: { default: '' } }, // 当前路由
  computed: {
    // 设置按钮的个数
    btnList () {
      let list = [{ label: '取消', type: 'cancel' }];
      if (this.popoverType === 'form') {
        // 状态 1=>保存状态； 2=>提交状态；3=>审核中； 4=>审核通过；
        switch (this.billsStatus) {
          case '':
          case undefined:
          case null:
            list.unshift({ label: '保存', type: 'insert' }); break;
          case '2':
            break;
          default: list.unshift(
            { label: '保存', type: 'insert' },
            { label: '提交', type: 'submit' }
          );
        }
      } else {
        list.unshift({ label: '确定', type: 'ok' })
      }
      return list
    }
  },
  components: {
    QueryBar,
    FormConfig,
    Pagination,
    BtnComponent
  },
  data () {
    return {
      isShow: false,
      clickCurrentRowData: {}, // 当前选择行数据
      multipleTable: [], // 当前多选的行数据
      btnTarget: '', // 当前点击按钮的 类型
    };
  },
  watch: {
    isShowPopover: {
      handler (newVal) {
        this.isShow = newVal;
        this.clickCurrentRowData = {}
      },
      deep: true,
      immediate: true
    },
  },
  props: {
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
    // 单据状态 （控制操作按钮的显示） 可不传 ，不传的话 会取parent的表单的数据中的status
    billsStatus: {
      type: String,
      default: ''
    }
  },
  methods: {
    handlerBtnClickEvent (e, type) {
      this.btnTarget = type;
      switch (type) {
        case 'insert':
        case 'ok':
          this.clickPreservation(e); break;
        case 'cancel':
          this.closePopover(e); break;
        case 'submit':
          this.clickDialogAffirm(); break
        default:
          console.error('未配置该按钮事件')
      }
    },
		/**
		 * @method handleBtnClick 点击查询栏按钮事件
		 */
    handleBtnClick (params) {
      this.$emit("handleBtnClickType", params);
    },
    /**
     * @method changeisShowPopover 处理弹窗显示隐藏
     * @method activeRow  当前点击行的数据
     * @method clickPreservation 点击保存操作及提示
     * @method closePopover 关闭弹窗
     */
    changeisShowPopover (is) {
      this.$emit("update:isShowPopover", false);
      this.$emit("changeisShowPopover", "", is);
    },
    activeRow (data) {
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
    },
    // 确认框点击确定事件
    clickDialogAffirm () {
      this.$confirm('一旦提交将无法修改，是否确定提交?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitBills()
      })
    },
    // 单据的提交
    async submitBills () {
      let sCode = 200;
      const { location: path } = this.path;
      const routerPath = path || this.$route.path
      if (!submitPathConfig[routerPath])
        /* 没有注册 接口的处理 */
        throw new Error(
          `error-message: 请先在接口配置表当中注册，configPath: src/domain/common/submitPortConfig/submitModulePortConfig.js`
        );
      try {
        const reqPath = submitPathConfig[routerPath];
        const { status } = await api.submitUpdate(`${reqPath}/billflow/submit`, this.formData.ruleForm);
        this.formData.ruleForm.status = '2';
        this.$emit('update:isShowPopover', false)
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '提交成功！' : '提交失败，请重试！'
        })
      }
    },
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
