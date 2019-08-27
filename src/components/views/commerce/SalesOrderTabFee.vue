<template>
  <div>
    <div v-show="+form.status <=1">
      <el-button
        class="margin-bottom"
        type="primary"
        @click="addFee"
      >新增</el-button>
      <el-button
        class="margin-bottom"
        type="primary"
        @click="editFee"
      >修改</el-button>
      <el-button
        class="margin-bottom"
        type="danger"
        @click="removeFee"
      >删除</el-button>
    </div>

    <table-page
      :isSubTable='true'
      ref="feeTable"
      :tableHeader="tableHeader"
      :tableAjax="tableAjax"
      :propTableData="propTableData"
      :propCount="propCount"
      @rowClick="curRow=$event"
      @tableChange="tableChange"
    ></table-page>
    <!-- 弹窗表单 -->
    <el-dialog :visible.sync="showPopForm">
      <form-pop
        :formConfig="formConfig"
        :ruleForm="ruleForm"
      ></form-pop>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showPopForm = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveFee"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//组件
import TablePage from "@/components/common/TablePage.vue";
import FormPop from '@/components/common/FormWithPop.vue'
//表格配置
import salesFeeProjectTableConfig from "@/domain/tableconfig/commerce/SalesFeeProject";
//表单配置
import formConfig from "@/domain/formconfig/commerce/SalesFeeProject";
import feeBind from "@/domain/entities/commerce/SalesFeeProject";
//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

export default {
  components: { TablePage, FormPop },
  props: {
    salesOrderCodeNumber: String, //单据编号
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      ruleForm: new feeBind(),
      formConfig,
      tableHeader: salesFeeProjectTableConfig,
      curRow: {}, //当前选中行
      showPopForm: false,//显示弹窗
      popState: "add",//弹窗状态
      propTableData: [],
      propCount: 0
    };
  },
  computed: {
    tableAjax () {
      return {
        api: "getSalesFeeProject",
        params: {
          salesOrderCode: this.salesOrderCodeNumber
        }
      }
    },
  },
  methods: {
    //请求表格数据
    requestTable: function () {
      this.$refs.feeTable.requestTable();
    },
    //表格数据改变
    tableChange: function (value) {
      this.propTableData = value.tableData
      this.propCount = value.propCount
    },
    //新增弹窗
    addFee: function () {
      this.ruleForm = new feeBind()
      this.ruleForm.salesOrderCode = this.salesOrderCodeNumber
      this.showPopForm = true
      this.popState = "add"
    },
    //保存计费项目
    async saveFee () {
      try {
        if (this.popState == "add") {
          const { data } = await api.saveSalesfeeproject(this.ruleForm)
          this.$message.success("保存成功")
          this.showPopForm = false
          this.requestTable()
        } else {
          const { data } = await api.editSalesfeeproject(this.ruleForm)
          this.$message.success("修改成功")
          this.showPopForm = false
          this.requestTable()
        }
      } catch (error) {
        console.log(error)
      }
    },
    //修改弹窗
    async editFee () {
      if (JSON.stringify(this.curRow) == "{}") {
        this.$message.warning("请选择要修改的数据")
      } else {
        try {
          const { data } = await api.getSalesFeeOneData(this.curRow.itemCode)
          this.ruleForm = data
          this.showPopForm = true
          this.popState = "edit"
        } catch (error) {
          console.log(error)
        }
      }
    },
    //删除计费项目
    async removeFee () {
      if (JSON.stringify(this.curRow) == "{}") {
        this.$message.warning("请选择要删除的数据")
      } else {
        try {
          const { data } = await api.deleteSalesFeeOneData(this.curRow.id)
          this.$message.success("删除成功")
          this.requestTable()
        } catch (error) {
          console.log(error)
        }
      }
    },
    //整理要存储的数据
    formatSaveDatas: function (datas) {
      let datasObj = {}
      for (let i = 0; i < datas.length; i++) {
        datasObj[datas[i]] = this[datas[i]]
      }
      return datasObj
    },
  },
  beforeDestroy () {
    var datas = ['propTableData', 'propCount']
    const dataObj = this.formatSaveDatas(datas)
    utools.setSession("salesOrderTabFee", dataObj);
  },
  created () {
    const enterFromBtn = utools.getSession("salesOrderForm").enterFromBtn
    if (!enterFromBtn) {
      const pageState = utools.getSession("salesOrderTabFee")
      for (const key in pageState) {
        this[key] = pageState[key]
      }
    }
  }
};
</script>

<style lang='less' scoped>
.margin-bottom {
  margin-bottom: 10px;
}
</style>