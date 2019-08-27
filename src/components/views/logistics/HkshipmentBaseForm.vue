<template>
  <div class="Box hk-shipment-base-form">
    <!-- 保存 返回 按钮 -->
    <preserve-btn
      :form='ruleForm'
      @handlePreserve="handlePreserve"
      @handleRollback="handleRollback"
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
        parentModule="HkshipmentBase"
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
          name="HkshipmentMateriel"
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
            @handlePageChange='queryHkshipmentmateriel'
          ></table-component>

          <!-- <el-table
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
      parentModule="HkshipmentBase"
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
import TableComponent from '@/components/common/Table.Form.Dialog/TableComponent.vue'
// 主表
import HkshipmentBaseEntry from "@/domain/entities/logistics/HkshipmentBase";
import HkshipmentBaseForm from "@/domain/formconfig/logistics/HkshipmentBase";
// 子表
import HkshipmentMaterielEntity from "@/domain/entities/logistics/HkshipmentMateriel";
import HkshipmentMaterielForm from "@/domain/formconfig/logistics/HkshipmentMateriel";
import HkshipmentMaterielTable from "@/domain/tableconfig/logistics/HkshipmentMateriel";

import FormTemplate from "@/components/common/form/index";
import formModuleHead from "@/components/common/FormModuleHead.vue";
import api from "@/assets/js/appHelper";
import { mapMutations, mapGetters } from "vuex";
export default {
  components: {
    FormTemplate,
    formModuleHead,
    TableComponent
  },
  data () {
    return {
      isLoading: false,
      ruleForm: new HkshipmentBaseEntry(), // 表单输入
      configTable: HkshipmentBaseForm,
      formEntity: new HkshipmentMaterielEntity(),
      formConfig: this.blacklist(HkshipmentMaterielForm, [
        "shipmentBaseCode",
        "itemCode",
        "materialCode"
      ]),
      tableColumn: HkshipmentMaterielTable, // tab 表格数据
      rules: {}, // 表单验证规则
      tabActiveName: "",
      isTabDisabled: true,
      tableData: [],
      // 查询条件
      queryPage: { pageIndex: 1, pageSize: 10, total: 0 },
      // 修改弹出框表单
      editDialog: { shipmentBaseCode: "", itemCode: "", visible: false },
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
  },
  created () {
    api.initSelect(this.configTable);
    this.getHkshipmentbase();
    this.queryHkshipmentmateriel();
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
      if (target !== "feeBearName") {
        // 页签下的表格操作
        this.jumpType === "add" && (this.formEntity = { ...this.formEntity, ...obj })
      } else {
        // 切换源单据类型
        this.ruleForm = { ...this.ruleForm, ...obj };
      }
    },
    handlerTabClick () { },
    handlerAddCreditPawn () {
      this.tableBtnType = 'add';
      this.formEntity = new HkshipmentMaterielEntity();
      this.formEntity = { ...this.formEntity, shipmentBaseCode: this.ruleForm.shipmentBaseCode, clientCode: this.ruleForm.delegete }
      this.editDialog = { shipmentBaseCode: this.ruleForm.shipmentBaseCode, visible: true };
    },
    async handlePreserve () {
      this.isLoading = true;
      let sCode = 200;
      try {
        const { data } = await this.editSzinstore();
        this.ruleForm = { ...this.ruleForm, status: '1' }
        this.isLoading = false;
        this.isTabDisabled = false; this.tabActiveName = 'HkshipmentMateriel';
        this.queryHkshipmentmateriel();
      } catch (error) {
        sCode = 0;
        console.log(error)
      } finally {
        this.isLoading = false;
        this.$message({
          type: sCode ? 'success' : 'error',
          message: sCode ? '保存成功！' : '保存失败，请重试！'
        })
      }
    },
    async editSzinstore () {
      if (this.jumpType === 'add') {
        return api
          .saveHkshipmentbase({
            ...this.ruleForm,
            shipmentBaseCode: this.ruleForm.shipmentBaseCode
          })
          .then(data => {
            //修改url的shipmentBaseCode参数
            if (data && data.status == 200) {
              this.$router.push({
                query: { shipmentBaseCode: this.ruleForm.shipmentBaseCode }
              });
              this.ruleForm.shipmentBaseCode = this.ruleForm.shipmentBaseCode;
            }
            return data;
          });
      } else {
        return api.updateHkshipmentbase(this.ruleForm);
      }
    },
    //分页查询深圳入库子表
    queryHkshipmentmateriel ({ pageIndex, pageSize } = {}) {
      this.queryPage.pageSize = pageSize, this.queryPage.pageIndex = pageIndex;
      if (this.ruleForm.shipmentBaseCode) {
        api
          .queryHkshipmentmateriel({
            shipmentBaseCode: this.ruleForm.shipmentBaseCode,
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
      let res = await api.getCommonCodeNo("HKFY");
      this.ruleForm.shipmentBaseCode = res.data;
    },
    // 查询当条深圳入库主表
    getHkshipmentbase () {
      const {
        formData = {},
        status,
        itemTable = [],
      } = this.getActivePathData(this.$route.path);
      this.utools.judgeNullObj(formData) && (this.ruleForm = formData);
      this.utools.judgeNullObj(itemTable) && (this.tableData = itemTable);
      this.jumpType = status;
      this.jumpType == "update" ? (this.isTabDisabled = false, this.tabActiveName = 'HkshipmentMateriel')
        : this.loadCode()
    },
    update () {
      if (this.currentRow && this.currentRow.itemCode) {
        this.tableBtnType = 'update';
        this.getHkshipmentmateriel().then(data => {
          this.formEntity = { ...data, clientCode: this.ruleForm.delegete, entrustOrderNos: [data.delegeteBillNo] };
          this.editDialog = {
            shipmentBaseCode: this.ruleForm.shipmentBaseCode,
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
              .removeHkshipmentmateriel(this.currentRow.itemCode)
              .then(data => {
                this.queryHkshipmentmateriel();
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
      this.queryHkshipmentmateriel();
    },
    //表格当前选中行改变事件
    currentTableChange (currentRow, oldCurrentRow) {
      this.currentRow = currentRow;
    },
    //表格分页改变事件
    pageChange (page) {
      this.queryPage.pageIndex = page;
      this.queryHkshipmentmateriel();
    },
    //表格分页大小改变事件
    sizeChange (size) {
      this.queryPage.pageSize = size;
      this.queryHkshipmentmateriel();
    },
    saveForm () {
      this.saveSzreceivingitem().then(data => {
        if (data && data.status == 200) {
          this.formEntity = new HkshipmentMaterielEntity();
          this.queryHkshipmentmateriel();
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
      this.formEntity.shipmentBaseCode = this.editDialog.shipmentBaseCode;
      if (this.formEntity.itemCode) {
        //修改
        return api.updateHkshipmentmateriel(this.formEntity);
      } else {
        //添加
        return api.saveHkshipmentmateriel(this.formEntity);
      }
    },
    closeDialog () {
      this.editDialog.visible = false;
    },
    async getHkshipmentmateriel () {
      if (this.currentRow.itemCode) {
        let { data } = await api.getHkshipmentmateriel(
          this.currentRow.itemCode
        );
        return data;
      } else {
        return new HkshipmentMaterielItem();
      }
    },
    handleRollback () {
      this.$router.push("M0508");
    }
  }
};
</script>
<style lang='less'>
.hk-shipment-base-form,
.Box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .form-layout {
    display: flex;
    flex-wrap: wrap;
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
}
</style>