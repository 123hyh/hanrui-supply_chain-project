<template>
  <div>
    <el-button
      v-show='+form.status <=1'
      class="margin-bottom"
      type="primary"
      @click="copyEntrustGoods"
    >复制记录到装箱单页签</el-button>
    <table-page
      ref="goodsTable"
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
import entrustGoodsTableConfig from "@/domain/tableconfig/commerce/EntrustGoods";
//表单配置
import formConfig from "@/domain/formconfig/commerce/SalesPackage";
import packageBind from "@/domain/entities/commerce/SalesPackage";
//公用方法
import api from "@/assets/js/appHelper";
import utools from "@/domain/common/utools.js";

export default {
  components: { TablePage, FormPop },
  props: {
    trusteeCodeNumber: String, //委托单号
    salesOrderCodeNumber: String, //单据编号
    enterFromBtn: {
      type: Boolean,
      default: false
    },
    form: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      ruleForm: new packageBind(), //装箱单存值对象
      formConfig, //装箱单表单配置
      tableHeader: entrustGoodsTableConfig, //商品信息表头
      curRow: {}, //当前选中行
      showPopForm: false, //显示弹窗
      propTableData: [],
      propCount: 0
    };
  },
  computed: {
    //商品信息请求参数
    tableAjax () {
      return {
        api: "getEntrustGoods",
        params: {
          entrustOrderNo: this.trusteeCodeNumber
        }
      };
    }
  },
  methods: {
    //表格数据改变
    tableChange: function (value) {
      this.propTableData = value.tableData
      this.propCount = value.propCount
    },
    //复制记录到装箱单页签
    copyEntrustGoods: function () {
      if (JSON.stringify(this.curRow) == "{}") {
        this.$message.warning("请选择要复制的数据");
      } else {
        this.formatEntrustGoods(this.curRow);
        this.showPopForm = true;
      }
    },
    //数据名称转换
    formatEntrustGoods: function (row) {
      this.ruleForm = new packageBind()
      Object.assign(this.ruleForm, {
        entrustGoodsItemCode: row.itemCode,
        salesOrderCode: this.salesOrderCodeNumber,
        stockCode: row.arrivalGoodsCode,
        materialName: row.materialName,
        specificationType: row.arrivalGoodsModel,
        sourceArea: row.sourceArea,
        brand: row.brand,
        grossWeight: row.grossWeight,
        netWeight: row.netWeight,
        cusSpecificationType: row.arrivalGoodsModel,
        po: row.poNo,
        supplierInvoiceNo: row.supplierInvoiceNo,
        controlledGoods: row.controlledGoods,
        sellerPrice: row.sellerPrice,
        buyerPurchasePrice: row.buyerPrice,
        tax: row.vatTaxRate
      });
    },
    //保存装箱单
    async savePackage () {
      try {
        const { data } = await api.saveSalesPackageData(this.ruleForm);
        this.showPopForm = false;
        this.$message.success("复制成功");
        this.$emit("savePackageSuccess");
      } catch (error) {
        console.log(error);
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
  watch: {
    ruleForm: {
      handler (newVal) {
        Object.assign(this.ruleForm, {
          sellerAmount: newVal["sellerPrice"] * newVal["quantity"],
          buyerPurchaseAmount:
            newVal["buyerPurchasePrice"] * newVal["quantity"],
          buyerTaxPrice: newVal["buyerPurchasePrice"] * newVal["tax"],
          buyerTaxAmount:
            newVal["buyerPurchasePrice"] *
            newVal["tax"] *
            newVal["quantity"]
        });
      },
      deep: true
    },
    tableAjax: {
      handler (val) {
        this.$nextTick(() => {
          if (val.params.entrustOrderNo) {
            this.$refs.goodsTable.requestTable()
          }
        })
      },
      deep: true
    },
  },
  beforeDestroy () {
    var datas = ['propTableData', 'propCount']
    const dataObj = this.formatSaveDatas(datas)
    utools.setSession("salesOrderTabGoods", dataObj);
  },
  created () {
    const enterFromBtn = utools.getSession("salesOrderForm").enterFromBtn
    if (!enterFromBtn) {
      const pageState = utools.getSession("salesOrderTabGoods")
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