<template>
  <div class="Box">
    <!-- 弹出框 -->
    <component
      :ruleForm="queryPopForm"
      :formConfig="formConfig"
      :btnObj="btnObj"
      @handleBtnClickType="handleBtnClick"
      :itemName="itemName"
      :is="showComponent"
      :isShowPopover="isShowPopover"
      @changeisShowPopover="rousePopover"
      @handlerSubPreservation="handlerSubPreservation"
      :popoverList="popoverList"
      :currencySelectInputKey="currencySelectInputKey"
      :popoverListKey="popoverListKey"
      :popoverType="popoverType"
      @handlePageChange="handlePageChange"
      :count="queryPopForm.total"
    ></component>
    <!-- 操作按钮 -->
    <preserve-btn
      :billsStatus="clientevaluationForm.status"
      :form='clientevaluationForm'
      :isLoading='isLoading'
      @handleRollback='handleRollback'
      @handlePreserve='handlePreserve'
      @handleSubmit="handleSubmit"
      @handleVerify="handleVerify"
    ></preserve-btn>
    <!-- 输入框 -->
    <div>
      <form-config
        :formModel='clientevaluationForm'
        :inputKey='clientevaluationKey'
        @handlerFormConfigClickSearch='rousePopover'
        @handlerFormVerify="handlerFormVerify"
      ></form-config>
    </div>
    <!-- tab -->
    <div>
      <el-tabs
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          label="评估结果"
          name="result"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <el-tab-pane
          label="客户其他信息"
          name="other"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <el-tab-pane
          label="业务员介绍及拜访信息"
          name="audit"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <el-tab-pane
          label="部门经理意见"
          name="manager"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <el-tab-pane
          label="风控财务人员拜访意见"
          name="visitor"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <el-tab-pane
          label="风控委员会评估意见"
          name="committee"
          :disabled='tabIsDisabled'
        ></el-tab-pane>
        <!-- 表格 -->
        <div class="handleTableHeight">
          <div
            class="mb-10"
            v-if="!tabIsDisabled"
          >
            <el-row>
              <el-col :span="24">
                <!-- 操作 -->
                <el-button @click="openTabForm('create')">新增</el-button>
                <el-button @click="openTabForm('update')">修改</el-button>
                <el-button @click="openTabForm('delete')">删除</el-button>
              </el-col>
            </el-row>
          </div>

          <table-component
            :isSubTable='true'
            :dialog='false'
            :popoverList='dataTab'
            :popoverListKey='columnDataTable'
            :count='queryTableData.total'
            :activeRow.sync='curRowData'
            @handlePageChange='handleTabPageChange'
          ></table-component>
        </div>
      </el-tabs>
    </div>
    <!--弹出层： 委托方评估form -->
    <el-dialog
      :visible.sync="popFormTab"
      :close-on-click-modal="false"
      width="45%"
      title="委托方评估"
    >
      <form-config
        :formModel='columnData'
        :inputKey='columnDataKey'
        @handlerFormConfigClickSearch='rousePopover'
        @handlerFormVerify="handlerFormVerify"
      ></form-config>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button
          type="primary"
          @click="saveTab"
        >保存</el-button>
        <el-button
          type="cancel"
          @click="closeTabForm"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// 引入公共的table组件
import FormConfig from "@/components/common/FormConfig";
import Pagination from "@/components/common/Pagination.vue";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'


import ClientEvaluation from "@/domain/entities/business/ClientEvaluation";
import ClientEvaluationFormConfig from "@/domain/formconfig/business/ClientEvaluation";
import api from "@/assets/js/appHelper.js";
// 引入vuex
import { mapGetters, mapActions, mapMutations } from 'vuex'
let ColumnData = '';
export default {
  components: {
    Popover: () => import("@/components/common/Popover.vue"),
    FormConfig,
    Pagination,
    TableComponent
  },
  data () {
    return {
      //  弹窗data 组件参数
      isShowPopover: false, // 弹出框
      showComponent: "Popover",
      itemName: '委托方评估',
      // querybar
      apiKey: '/clientevaluation',
      queryPopForm: {
        pageIndex: 1,
        pageSize: 10,
        total: 100,
      },
      formConfig: [],
      btnObj: [
        { type: "search", label: "查询" },
      ],
      // table
      popoverList: [], // 弹出框需要的数据
      popoverListKey: [], // 弹出框表头显示列的key值
      currencySelectInputKey: "", // 当前选中数据对应的输入框
      popoverType: 'table', // 弹出框的表格类型
      /************* 弹窗data end *****************/
      tabIsDisabled: true, // 禁用tab
      tabActiveName: "", // 激活tab菜单
      // 主form
      verify: {}, // 表单验证
      curRowData: '',
      isLoading: false,
      jumpType: '',
      clientevaluationForm: new ClientEvaluation(),
      clientevaluationKey: ClientEvaluationFormConfig,
      /*********** 委托方评估data start***********/
      // table
      dataTab: [],
      // table - 列
      columnDataTable: '',
      // 查询条件 form
      queryTableData: {},
      // 新增form
      columnData: '',
      columnDataKey: '',
      //form弹出框
      popFormTab: false,

      /*********** 委托方评估data end***********/
    };
  },
  computed: {
    ...mapGetters([
      'btnType', 'getActivePathData'
    ]),
  },
  watch: {
    clientevaluationForm: {
      handler (newVal, old) {
        console.log(newVal)
      }
    },
    deep: true,
  },
  methods: {
    /************************** 弹窗methods start *******************/
    /**
     * @method handleBtnClick 点击查询栏按钮事件
     * @method ...mapMutations vuex提交事件 ：addBtnType
     * 
     */
    ...mapMutations([
      'addBtnType', 'addbreadCrumbsList'
    ]),
    handleBtnClick: (() => {
      var obj = null;
      return function (type, clear) {
        console.log(type, clear)
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
        search: async () => {
          try {
            var { data: { count, list } } = await api.querySearch(this.apiKey, this.queryPopForm)
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (e) {
            console.log(e)
          }
          // 清空查询数据
          this.formConfig.map((e, i) => {
            if (this.queryPopForm[e.moduleBind])
              this.queryPopForm[e.moduleBind] = '';
          })
        },
      };
    },
    //table
    handlerSubPreservation (rowData, key) {
      console.log(rowData, key);
      if (this.clientevaluationForm[key] != undefined) {
        this.clientevaluationForm[key] = rowData['employeeInfoName'];
        this.clientevaluationForm['visitorCode'] = rowData['employeeInfoCode'];
      }
    },
    rousePopover (key) {
      if (this.clientevaluationForm[key] != undefined) {
        if (key == 'visitorName') {
          this.formConfig = [
            { label: "职员编码", moduleBind: "employeeInfoCode", isInput: true },
          ],
            this.apiKey = '/employeeinfo';
          this.itemName = '员工资料';
          this.popoverListKey = [
            // 设置表格的表头
            { key: "employeeInfoCode", name: "职员编码" },
            { key: "employeeInfoName", name: "名字" },
            { key: "gender", name: "性别" },
            { key: "idCardNo", name: "身份证号码" },
            { key: "birthAddress", name: "出生地址" },
            { key: "department", name: "部门" },
          ];
        }
      }
      let currencyObj = {
        // 配置当前点击请求对象
        [key]: async () => {
          try {
            let { data: { count, list } } = await api.querySearch(this.apiKey, this.queryPopForm)
            this.queryPopForm.total = count;
            this.popoverList = list;
          } catch (error) {
            console.log(error);
          }
        },
      }
      this.currencySelectInputKey = key; // 设置当前点击输入框key
      key && currencyObj[key]();
      this.isShowPopover = !this.isShowPopover;
    },
    //分页
    handlePageChange (paper) {
      this.queryPopForm = { ...this.queryPopForm, ...paper }
      this.handleBtnClick('search'); //翻页查询
    },
    /************************** 弹窗methods end *******************/
    handlerFormVerify ($refs) {
      this.verify = $refs;
    },
    isVerify () {
      let isVerify = false;
      this.verify["formModel"].validate(valid => {
        isVerify = valid;
      });
      return isVerify;
    },
    //分页
    async handleTabPageChange (paper) {
      const {
        data: { list, count }
      } = await api.querySearch('/clientevaluation' + this.tabActiveName, paper)
      this.dataTab = list;
      this.utools.turnCodeBoolean(this.dataTab);
      this.queryTableData.total = count;
    },
    handleRollback () {
      this.$router.push('M0203')
    },
    handleSubmit () {
      this.utools.submitBusinessStatus({
        code: this.clientevaluationForm.clientEvaluationNo,
        ctx: this,
        target: 'clientevaluationForm'
      });
    },
    handleVerify () {
      console.log('handleVerify');
    },
    // 第一个字母转大写
    capitalize ([first, ...rest]) {
      return first.toUpperCase() + rest.join('')
    },
    async handlerTabClick ({
      name
    } = tab, event) {
      switch (name) {
        case 'audit':
        case 'manager':
        case 'visitor':
        case 'committee':
          this.tabActiveName = name = 'audit'
          break;
        default:
          break;
      }
      ColumnData = require("@/domain/entities/business/ClientEvaluation" + this.capitalize(name)).default;
      this.columnData = new ColumnData();
      this.columnDataTable = require("@/domain/tableconfig/business/ClientEvaluation" + this.capitalize(name)).default;
      this.columnDataKey = require("@/domain/formconfig/business/ClientEvaluation" + this.capitalize(name)).default;
      api.initSelect(this.columnDataKey)
      this.handleTabPageChange({ pageIndex: 1, clientEvaluationNo: sessionStorage.clientEvaluationNo })
      this.curRowData = {}; // 清空当前行数据
    },
    /*************** 委托方评估methods start******************/
    //保存主表单
    async handlePreserve () {
      if (this.jumpType == 'update') {
        if (this.isVerify()) {
          this.isLoading = true;
          try {
            const {
              data
            } = await api.editclientevaluationData(this.clientevaluationForm);

            if (data) {
              // 提交成功后...
              this.$alert('修改成功', '修改', {
                confirmButtonText: '确定',
                callback: action => {
                  this.tabIsDisabled = false;
                  this.tabActiveName = 'result';
                  this.handlerTabClick({ name: this.tabActiveName });//初始化tab
                }
              });
            }
          } catch (e) {
            //TODO handle the exception
            console.log(e)
          } finally {
            this.isLoading = false;
          }
        }
      } else {
        if (this.isVerify()) {
          this.isLoading = true;
          try {
            const {
              data
            } = await api.addclientevaluationData(this.clientevaluationForm);
            this.jumpType = 'update';
            this.clientevaluationForm = { ...this.clientevaluationForm, status: data.status || '1' }
            if (data) {
              // 提交成功后...
              this.$alert('保存成功', '新增', {
                confirmButtonText: '确定',
                callback: action => {
                  this.tabIsDisabled = false;
                  this.tabActiveName = 'result';
                  this.handlerTabClick({ name: this.tabActiveName });//初始化tab
                }
              });
            }
          } catch (e) { console.log(e) }
          finally {
            this.isLoading = false;
          }
        }
      }
    },
    // 新增修改
    async saveTab () {
      if (this.isVerify()) {
        // 验证成功
        if (this.btnType == 'create') {
          const {
            data: addData
          } = await api.addData('/clientevaluation' + this.tabActiveName, this.columnData)
          if (addData) {
            // 提交成功后...
            this.$alert('保存成功', '新增', {
              confirmButtonText: '确定',
              callback: action => {
                this.popFormTab = false; //关闭弹窗
                this.handlerTabClick({ name: this.tabActiveName });//初始化tab
              }
            });
          }
        } else {
          const {
            data: editData
          } = await api.editData('/clientevaluation' + this.tabActiveName, this.columnData)
          if (editData) {
            // 提交成功后...
            this.$alert('修改成功', '修改', {
              confirmButtonText: '确定',
              callback: action => {
                this.popFormTab = false; //关闭弹窗
                this.handlerTabClick({ name: this.tabActiveName });//初始化tab
              }
            });
          }
        }
      }
    },
    // 是否新增修改
    async openTabForm (btnType) {
      let curRowData = this.curRowData;
      if (btnType == 'update' && JSON.stringify(curRowData) != '{}') {
        const {
          data: searchOneData
        } = await api.searchOneData('/clientevaluation' + this.tabActiveName, { itemCode: curRowData.itemCode })
        curRowData = searchOneData;
      }
      // 拿数据
      this.columnData = btnType == 'create' ? new ColumnData() : curRowData;
      //显示空选提示语
      if (btnType != 'create' && JSON.stringify(curRowData) == '{}') {
        this.$message.error('请选择数据');
      } else if (btnType != 'delete') {
        this.columnData.clientEvaluationNo = sessionStorage.clientEvaluationNo;
        this.addBtnType(btnType);
        this.popFormTab = true;
      }
      // 确认删除
      if (btnType == 'delete' && JSON.stringify(curRowData) != '{}') {
        this.utools.deleteMessage.bind(this)(async () => {
          try {
            const { data, status } = await api.deleteData('/clientevaluation' + this.tabActiveName, curRowData.itemCode)
            this.utools.alertMessage.bind(this)(status, null, '删除')
            this.handlerTabClick({ name: this.tabActiveName }); //数据刷
          } catch (e) { console.log(e) }
        })
      }
    },
    async loadCodeNo () { //加载编号
      let { data } = await api.getclientevaluationCode()
      sessionStorage.clientEvaluationNo = this.clientevaluationForm.clientEvaluationNo = data;
    },
    // 取消弹窗
    closeTabForm () {
      this.popFormTab = false;
    },
    // 选中当前行
    clickTabRow (row) {
      // 获取修改内容
      this.curRowData = row;
      this.$refs.moviesTable.toggleRowSelection(row)
    },
    /*************************** 委托方评估methods end ****************** */
  },
  created () {
    api.initSelect(this.clientevaluationKey);
    // 切换路由数据保存
    const { formData, status } = this.getActivePathData(this.$route.path);
    formData && (this.clientevaluationForm = formData);
    this.jumpType = status;
    if (this.jumpType == 'update') {
      this.tabIsDisabled = false;
      this.tabActiveName = 'result';
      this.handlerTabClick({ name: this.tabActiveName })
      this.clientevaluationForm = JSON.parse(sessionStorage.curRowData);
      sessionStorage.clientEvaluationNo = this.clientevaluationForm.clientEvaluationNo;
    } else {
      this.loadCodeNo(); //加载编号
    }
  },
  // 切换路由数据保存
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.clientevaluationForm, status: this.jumpType },
      path: this.$route.path,
    });
    next();
  }
};
</script>
<style lang="less" scoped>
.form-layout {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 20vw;
    height: 15px;
  }
}
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.handleTableHeight {
  height: 48vh;
}
</style>
