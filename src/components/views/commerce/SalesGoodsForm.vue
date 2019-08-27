<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}销售订单商品信息</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="销售订单编号" prop="salesOrderCode">
						<el-input v-model="formEntity.salesOrderCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="存货编码" prop="stockCode">
						<el-input v-model="formEntity.stockCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="物料名称" prop="materialName">
						<el-input v-model="formEntity.materialName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="规格型号" prop="specificationType">
						<el-input v-model="formEntity.specificationType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="产地" prop="sourceArea">
						<el-input v-model="formEntity.sourceArea" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="品牌" prop="brand">
						<el-input v-model="formEntity.brand" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="入库时间" prop="warehouseTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.warehouseTime" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="仓库" prop="warehouse">
						<el-input v-model="formEntity.warehouse" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="库位" prop="storehouse">
						<el-input v-model="formEntity.storehouse" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="实际库位" prop="actualStorehouse">
						<el-input v-model="formEntity.actualStorehouse" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="管制物品" prop="controlledGoods">
						<el-input v-model="formEntity.controlledGoods" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="数量" prop="quantity">
						<el-input v-model="formEntity.quantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="计量单位" prop="measurement">
						<el-input v-model="formEntity.measurement" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="箱号" prop="boxNo">
						<el-input v-model="formEntity.boxNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卡板号" prop="cardNo">
						<el-input v-model="formEntity.cardNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售单价" prop="sellerPrice">
						<el-input v-model="formEntity.sellerPrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售币种" prop="sellerCurrency">
						<el-input v-model="formEntity.sellerCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售金额" prop="sellerAmount">
						<el-input v-model="formEntity.sellerAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购单价" prop="buyerPurchasePrice">
						<el-input v-model="formEntity.buyerPurchasePrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购币种" prop="buyerPurchaseCurrency">
						<el-input v-model="formEntity.buyerPurchaseCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购金额" prop="buyerPurchaseAmount">
						<el-input v-model="formEntity.buyerPurchaseAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税率" prop="tax">
						<el-input v-model="formEntity.tax" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方含税单价" prop="buyerTaxPrice">
						<el-input v-model="formEntity.buyerTaxPrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方含税金额" prop="buyerTaxAmount">
						<el-input v-model="formEntity.buyerTaxAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="备注" prop="remark">
						<el-input v-model="formEntity.remark" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="未发运数量" prop="unshippedQuantity">
						<el-input v-model="formEntity.unshippedQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="未关联数量" prop="uncorrelatedQuantity">
						<el-input v-model="formEntity.uncorrelatedQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计发运数量" prop="cuShipmentQuantity">
						<el-input v-model="formEntity.cuShipmentQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计出库数量" prop="cuOutputQuantity">
						<el-input v-model="formEntity.cuOutputQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计仓储出库数量" prop="cuStockOutputQuantity">
						<el-input v-model="formEntity.cuStockOutputQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="客户物料号" prop="customerMaterialNo">
						<el-input v-model="formEntity.customerMaterialNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="PO" prop="po">
						<el-input v-model="formEntity.po" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="供应商发票号" prop="supplierInvoiceNo">
						<el-input v-model="formEntity.supplierInvoiceNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="唛头" prop="mark">
						<el-input v-model="formEntity.mark" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="箱数" prop="box">
						<el-input v-model="formEntity.box" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="批次" prop="batch">
						<el-input v-model="formEntity.batch" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="DATECODE" prop="dateCode">
						<el-input v-model="formEntity.dateCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="CARTON" prop="cartonId">
						<el-input v-model="formEntity.cartonId" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="WMS仓库编码" prop="wmsCode">
						<el-input v-model="formEntity.wmsCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import SalesGoods from "../../../domain/entities/commerce/SalesGoods";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new SalesGoods(),

      // 控制弹出层显示
      popup: false,

      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",

      // 验证规则
      formRules: {
        //deptCode: [appHelper.validateRule.required("所属部门")],
      }
    };
  },
  methods: {
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...

        if (!this.isUpdate) {
          // 新增
          appHelper
            .submitCreate("/salesgoods/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new SalesGoods();
          this.loadSalesGoodsCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/salesgoods/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载销售订单商品信息编码
    loadSalesGoodsCode() {
      appHelper
        .get("/salesgoods/id")
        .then(result => (this.formEntity.id = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadSalesGoodsCode();
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
};
</script>

<style scoped>
.input-item {
  width: 180px;
}
</style>
