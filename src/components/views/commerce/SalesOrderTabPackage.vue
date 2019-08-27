<template>
  <div>
    <div v-show="+form.status <=1">
      <el-button
        class="margin-bottom"
        type="primary"
        @click="editPackage"
      >修改</el-button>
      <el-button
        class="margin-bottom"
        type="danger"
        @click="removePackage"
      >删除</el-button>
    </div>

    <table-page
      ref="packageTable"
      :isSubTable='true'
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
          @click="savePackage"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//组件
import TablePage from "@/components/common/TablePage.vue";
import FormPop from "@/components/common/FormWithPop.vue";
//表格配置
import salesPackageTableConfig from "@/domain/tableconfig/commerce/SalesPackage";
//表单配置
import formConfig from "@/domain/formconfig/commerce/SalesPackage";
import packageBind from "@/domain/entities/commerce/SalesPackage";
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
      ruleForm: new packageBind(), //装箱单存值对象
      formConfig,//装箱单表单配置
      tableHeader: salesPackageTableConfig,
      curRow: {},//当前选中行
      showPopForm: false,//显示弹窗
      propTableData: [],
      propCount: 0
    };
  },
  computed: {
    tableAjax () {
      return {
        api: "getSalesPackage",
        params: {
          salesOrderCode: this.salesOrderCodeNumber
        }
      }
    },
  },
  methods: {
    //表格数据改变
    tableChange: function (value) {
      this.propTableData = value.tableData
      this.propCount = value.propCount
    },
    //整理要存储的数据
    formatSaveDatas: function (datas) {
      let datasObj = {}
      for (let i = 0; i < datas.length; i++) {
        datasObj[datas[i]] = this[datas[i]]
      }
      return datasObj
    },
    //请求表格数据
    requestTable: function () {
      this.$refs.packageTable.requestTable();
    },
    //弹窗修改数据
    async editPackage () {
      if (JSON.stringify(this.curRow) == "{}") {
        this.$message.warning("请选择要修改的数据")
      } else {
        try {
          const { data } = await api.getSalesPackageOneData(this.curRow.itemCode)
          this.ruleForm = data
          this.showPopForm = true
        } catch (error) {
          console.log(error)
        }
      }
    },
    //保存装箱单
    async savePackage () {
      try {
        const { data } = await api.editSalesPackageData(this.ruleForm)
        this.$message.success("修改成功")
        this.showPopForm = false
        this.requestTable()
      } catch (error) {
        console.log(error)
      }
    },
    //删除装箱单
    async removePackage () {
      if (JSON.stringify(this.curRow) == "{}") {
        this.$message.warning("请选择要删除的数据")
      } else {
        try {
          const { data } = await api.deleteSalesPackageData(this.curRow.itemCode)
          this.$message.success("删除成功")
          this.requestTable()
        } catch (error) {
          console.log(error)
        }
      }
    },
  },
  watch: {
    ruleForm: {
      handler (newVal) {
        Object.assign(this.ruleForm, {
          sellerAmount: newVal["sellerPrice"] * newVal["quantity"],
          buyerPurchaseAmount: newVal["buyerPurchasePrice"] * newVal["quantity"],
          buyerTaxPrice: newVal["buyerPurchasePrice"] * newVal["tax"],
          buyerTaxAmount: newVal["buyerPurchasePrice"] * newVal["tax"] * newVal["quantity"]
        });
      },
      deep: true
    }
  },
  beforeDestroy () {
    var datas = ['propTableData', 'propCount']
    const dataObj = this.formatSaveDatas(datas)
    utools.setSession("salesOrderTabPackage", dataObj);
  },
  created () {
    const enterFromBtn = utools.getSession("salesOrderForm").enterFromBtn
    if (!enterFromBtn) {
      const pageState = utools.getSession("salesOrderTabPackage")
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