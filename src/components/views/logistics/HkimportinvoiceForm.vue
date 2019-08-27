<template>
  <div class="Box">
    <!-- 保存 返回 按钮 -->
    <preserve-btn
      @handlePreserve="handlePreserve"
      @handleRollback="handleRollback"
      :form='ruleForm'
      :isLoading="isLoading"
    ></preserve-btn>
    <!-- <div v-for="(formTemp,index) in configTable" :key="index" class="block"> -->
    <!-- <div class="block-name" v-show="formTemp.name">{{formTemp.name}}</div> -->
    <div
      v-for="(formTemp,index) in configTable"
      :key="index"
    >
      <form-module-head :title="formTemp.name"></form-module-head>
      <form-template
        :entity="ruleForm"
        @on-result-change="onRuleFormChange"
        :formConfig="formTemp.list"
        parentModule="Importinvoice"
        @tableDialogPreservation="tableDialogPreservation"
      >
        <div
          slot="btn_top"
          class="mb-10"
        ></div>
      </form-template>
    </div>
    <!-- tab -->
    <div>
      <el-tabs
        class="handleTableHeight"
        v-model="tabActiveName"
        type="card"
        @tab-click="handlerTabClick"
      >
        <el-tab-pane
          label="物料信息"
          name="Hkimportinvoiceitem"
          :disabled="isTabDisabled"
        ></el-tab-pane>
        <!-- 表格 -->
        <div v-if="!isTabDisabled">
          <div
            class="mb-10"
            v-show="+ruleForm.status<=1"
          >
            <el-button @click="handlerAddCreditPawn">新增</el-button>
            <el-button @click="update">修改</el-button>
            <el-button @click="remove">删除</el-button>
          </div>

          <table-component
            :isSubTable='true'
            :dialog='false'
            :popoverList='tableData'
            :popoverListKey='tableColumn'
            :count='queryPage.total'
            @rowClickData='currentTableChange'
            @handlePageChange='queryHkimportinvoiceitem'
          ></table-component>
          <!--    <el-table
            :data="tableData"
            @current-change="currentTableChange"
            highlight-current-row
            border
            style="width: 100%"
          >
            <el-table-column
              v-for="(item,index) in tableColumn"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
            ></el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              ref="pager"
              background
              :page-size="queryPage.pageSize"
              :current-page="queryPage.pageIndex"
              layout="sizes, total, prev, pager, next"
              :total="queryPage.total"
              @current-change="pageChange"
              @size-change="sizeChange"
            ></el-pagination>
          </div> -->
        </div>
      </el-tabs>
    </div>

    <!-- 添加 -->
    <form-template
      :dialog="true"
      :visible="editDialog.visible"
      :entity="formEntity"
      @on-result-change="onFormEntityChange"
      :formConfig="formConfig"
      parentModule="Importinvoice"
      @tableDialogPreservation="tableDialogPreservation"
      @close="closeDialog"
    >
      <div
        slot="btn_buttom"
        class="el-dialog__footer"
      >
        <el-button
          type="primary"
          @click="saveForm"
        >保存</el-button>
        <el-button
          type="cancel"
          @click="closeDialog"
        >取消</el-button>
      </div>
    </form-template>
  </div>
</template>
<script>
// 主表
import HkimportinvoiceEntry from "@/domain/entities/logistics/Hkimportinvoice";
import HkimportinvoiceForm from "@/domain/formconfig/logistics/Hkimportinvoice";
// 子表
import HkimportinvoiceitemEntity from "@/domain/entities/logistics/Hkimportinvoiceitem";
import HkimportinvoiceitemForm from "@/domain/formconfig/logistics/Hkimportinvoiceitem";
import HkimportinvoiceitemTable from "@/domain/tableconfig/logistics/Hkimportinvoiceitem";

import FormTemplate from "@/components/common/form/index";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import api from "@/assets/js/appHelper";
import { mapMutations, mapGetters } from "vuex";
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
export default {
  name: 'HkimportinvoiceForm',
  components: {
    FormTemplate,
    formModuleHead,
    TableComponent
  },
  data () {
    return {
      isLoading: false,
      ruleForm: new HkimportinvoiceEntry(), // 表单输入
      configTable: HkimportinvoiceForm,
      formEntity: new HkimportinvoiceitemEntity(),
      formConfig: this.blacklist(HkimportinvoiceitemForm, [
        "billNo",
        "itemCode",
        "materialCode"
      ]),
      tableColumn: HkimportinvoiceitemTable, // tab 表格数据
      rules: {}, // 表单验证规则
      tabActiveName: "",
      isTabDisabled: true,
      tableData: [],
      // 查询条件
      queryPage: { pageIndex: 1, pageSize: 10, total: 0 },
      // 修改弹出框表单
      editDialog: { billNo: "", itemCode: "", visible: false },
      currentRow: {},//当前选中行
      jumpType: '',
      tableBtnType: '',
    };
  },
  computed: {
    ...mapGetters(["getActivePathData"])
  },
  watch: {
    // 监听商品明细的按钮类型
    'tableBtnType': {
      handler (cur, pre) {
        for (let item of this.formConfig) {
          switch (item.key) {
            case 'entrustOrderNos':
              item.btn = (cur == 'add');
              break;
            default:
              break;
          }
        }
      },
      deep: true
    },
    "ruleForm.sourceBillType": {
      handler (cur, pre) {
      },
      deep: true
    },
    "ruleForm.deliveryType": {
      handler (cur, pre) {
        if (cur == '2') {
          this.configTable[2].list[10].rules = [{ required: true, message: '必填', trigger: 'blur' }]
        } else {
          this.configTable[2].list[10].rules = []
        }
      },
      deep: true
    },
  },
  created () {
    api.initSelect(this.configTable);
    this.getHkimportinvoice();
    this.queryHkimportinvoiceitem();
  },
  beforeRouteLeave (to, form, next) {
    this.addbreadCrumbsList({
      data: { formData: this.ruleForm, status: this.jumpType },
      path: this.$route.path
    });
    next();
  },
  methods: {
    ...mapMutations(["addbreadCrumbsList"]),
    /**
     * 黑名单
     */
    blacklist (obj, blacks) {
      return obj.filter(item => {
        return !blacks.includes(item.key);
      });
    },
    onRuleFormChange (val) {
      this.ruleForm = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    onFormEntityChange (val) {
      this.formEntity = val;//④外层调用组件方注册变更方法，将组件内的数据变更，同步到组件外的数据状态中
    },
    async tableDialogPreservation (obj, target) {
      if (['carrierName', 'freightPayerName'].includes(target)) {
        // 切换源单据类型
        this.ruleForm = { ...this.ruleForm, ...obj };
      } else {
        // 页签下的表格操作
        this.jumpType === "add" && (this.formEntity = { ...this.formEntity, ...obj })
      }
    },
    handlerTabClick () { },
    handlerAddCreditPawn () {
      this.tableBtnType = 'add';
      this.formEntity = new HkimportinvoiceitemEntity();
      this.formEntity = { ...this.formEntity, billNo: this.ruleForm.billNo, clientCode: this.ruleForm.delegete }
      this.editDialog = { billNo: this.ruleForm.billNo, visible: true };
    },
    // 保存子表
    handlePreserve () {
      this.isLoading = true;
      this.editSzinstore()
        .then(data => {
          this.ruleForm = { ...this.ruleForm, status: data.status || '1' };
          this.isLoading = false;
          if (data && data.status == 200) {
            this.isTabDisabled = false; this.tabActiveName = 'Hkimportinvoiceitem';
            this.$message({ message: "保存成功", type: "success" });
          } else {
            this.$message({ message: "保存失败", type: "warning" });
          }
        })
        .then(_ => {
          this.queryHkimportinvoiceitem();
        });
    },
    async editSzinstore () {
      if (this.jumpType === 'add') {
        return api
          .saveHkimportinvoice({
            ...this.ruleForm,
            billNo: this.ruleForm.billNo
          })
          .then(data => {
            //修改url的billNo参数
            if (data && data.status == 200) {
              this.$router.push({
                query: { billNo: this.ruleForm.billNo }
              });
              this.ruleForm.billNo = this.ruleForm.billNo;
            }
            return data;
          });
      } else {
        return api.updateHkimportinvoice(this.ruleForm);
      }
    },
    //分页查询深圳入库子表
    queryHkimportinvoiceitem ({ pageIndex, pageSize } = {}) {
      this.queryPage.pageIndex = pageIndex, this.queryPage.pageSize = pageSize
      if (this.ruleForm.billNo) {
        api
          .queryHkimportinvoiceitem({
            billNo: this.ruleForm.billNo,
            ...this.queryPage
          })
          .then(data => {
            if (data.status === 200) {
              this.tableData = data.data.list;
              this.queryPage.total = data.data.count;
            }
          });
      }
    },
    // 进新增页面 加载编码
    async loadCode () {
      let res = await api.getCommonCodeNo("HKFH");
      this.ruleForm.billNo = res.data;
    },
    // 查询当条深圳入库主表
    getHkimportinvoice () {
      const {
        formData = {},
        status,
        itemTable = [],
      } = this.getActivePathData(this.$route.path);
      this.utools.judgeNullObj(formData) && (this.ruleForm = formData);
      this.utools.judgeNullObj(itemTable) && (this.tableData = itemTable);
      this.jumpType = status;
      this.jumpType == "update" ? (this.isTabDisabled = false, this.tabActiveName = 'Hkimportinvoiceitem') : this.loadCode();
    },
    update () {
      if (this.currentRow && this.currentRow.itemCode) {
        this.tableBtnType = 'update';
        this.getHkimportinvoiceitem().then(data => {
          this.formEntity = { ...data, clientCode: this.ruleForm.delegete, entrustOrderNos: [data.entrustOrderNo] };
          this.editDialog = {
            billNo: this.ruleForm.billNo,
            itemCode: this.currentRow.itemCode,
            visible: true
          };
        });
      } else {
        this.$message({ type: "warning", message: "请选中您要修改的单据！" });
      }
    },
    remove () {
      if (this.currentRow && this.currentRow.itemCode) {
        this.$confirm("此操作将永久删除单据, 是否继续?", "提示", {
          type: "warning"
        })
          .then(() => {
            api
              .removeHkimportinvoiceitem(this.currentRow.itemCode)
              .then(data => {
                this.queryHkimportinvoiceitem();
                this.$message({ type: "success", message: "删除成功!" });
              });
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消删除" });
          });
      } else {
        this.$message({ type: "warning", message: "请选中您要删除的单据！" });
      }
    },
    editSuccsess () {
      this.editDialog = { visible: false };
      this.queryHkimportinvoiceitem();
    },
    //表格当前选中行改变事件
    currentTableChange (currentRow, oldCurrentRow) {
      console.log(currentRow);
      this.currentRow = currentRow;
    },
    //表格分页改变事件
    pageChange (page) {
      this.queryPage.pageIndex = page;
      this.queryHkimportinvoiceitem();
    },
    //表格分页大小改变事件
    sizeChange (size) {
      this.queryPage.pageSize = size;
      this.queryHkimportinvoiceitem();
    },
    saveForm () { // 保存子表
      this.saveSzreceivingitem().then(data => {
        if (data && data.status == 200) {
          this.formEntity = new HkimportinvoiceitemEntity();
          this.queryHkimportinvoiceitem();
          this.editDialog.visible = false;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "warning"
          });
        }
      });
    },
    saveSzreceivingitem () {
      this.formEntity.billNo = this.editDialog.billNo;
      console.log(this.formEntity.itemCode)
      if (this.formEntity.itemCode) {
        //修改
        return api.updateHkimportinvoiceitem(this.formEntity);
      } else {
        //添加
        return api.saveHkimportinvoiceitem(this.formEntity);
      }
    },
    closeDialog () {
      this.editDialog.visible = false;
    },
    async getHkimportinvoiceitem () {
      //没有itemCode说明是新增
      if (this.currentRow.itemCode) {
        let { data } = await api.getHkimportinvoiceitem(
          this.currentRow.itemCode
        );
        return data;
      } else {
        return new HkimportinvoiceitemEntity();
      }
    },
    handleRollback () {
      this.$router.push("M0506");
    }
  }
};
</script>
<style lang='less' scoped>
.form-layout {
  display: flex;
  flex-wrap: wrap;
  > div {
    flex-basis: 21vw;
  }
}
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.handleTableHeight {
  min-height: 48vh;
}

.block {
  border: 1px solid #eaeaea;
  margin: 10px 2px;
  border-radius: 10px;
  position: relative;
  .block-name {
    position: absolute;
    left: 12px;
    top: -12px;
    background: white;
    padding: 0 10px;
    color: #666;
  }
}
</style>