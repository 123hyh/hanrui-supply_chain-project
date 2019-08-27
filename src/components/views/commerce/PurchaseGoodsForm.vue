<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}采购订单商品信息</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="表业务主键编号" prop="itemCode">
						<el-input v-model="formEntity.itemCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="采购订单编号" prop="purchaseOrderNo">
						<el-input v-model="formEntity.purchaseOrderNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="序号" prop="serialNo">
						<el-input v-model="formEntity.serialNo" :class="inputClass" ></el-input>
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
					<el-form-item :label-width="labelWidth" label="名称" prop="goodsName">
						<el-input v-model="formEntity.goodsName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="编码" prop="goodsCode">
						<el-input v-model="formEntity.goodsCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税号" prop="taxNo">
						<el-input v-model="formEntity.taxNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="附号" prop="attachNo">
						<el-input v-model="formEntity.attachNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="海关商品编码" prop="goodsCode_customs">
						<el-input v-model="formEntity.goodsCode_customs" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="海关商品名称" prop="goodsName_customs">
						<el-input v-model="formEntity.goodsName_customs" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="海关商品规格型号" prop="customsGoodsModel">
						<el-input v-model="formEntity.customsGoodsModel" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="订货数量" prop="quantity">
						<el-input v-model="formEntity.quantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="订货单价" prop="price">
						<el-input v-model="formEntity.price" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="订货币别" prop="currency">
						<el-input v-model="formEntity.currency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="订货金额" prop="amount">
						<el-input v-model="formEntity.amount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售-计量单位" prop="unit">
						<el-input v-model="formEntity.unit" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售-币别" prop="sellerCurrency">
						<el-input v-model="formEntity.sellerCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售-单价" prop="sellerPrice">
						<el-input v-model="formEntity.sellerPrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售-数量" prop="sellerQuantity">
						<el-input v-model="formEntity.sellerQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卖方销售-货价" prop="sellerGoodsValue">
						<el-input v-model="formEntity.sellerGoodsValue" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="报关-管制物品" prop="controlledGoods">
						<el-input v-model="formEntity.controlledGoods" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="报关-电讯许可证" prop="telecomLicence">
						<el-input v-model="formEntity.telecomLicence" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="报关-监管方式" prop="superviseMode">
						<el-input v-model="formEntity.superviseMode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="报关-海关征税汇率" prop="exchangeRate">
						<el-input v-model="formEntity.exchangeRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税/杂费-关税税率" prop="extrasTaxRate">
						<el-input v-model="formEntity.extrasTaxRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税/杂费-关税" prop="extrasTariff">
						<el-input v-model="formEntity.extrasTariff" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税/杂费-进口环节增值税" prop="extrasVat">
						<el-input v-model="formEntity.extrasVat" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运费费率" prop="freightRate">
						<el-input v-model="formEntity.freightRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="保费费率" prop="premiumRate">
						<el-input v-model="formEntity.premiumRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="杂费费率" prop="extrasRate">
						<el-input v-model="formEntity.extrasRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-货款汇率" prop="buyerExchangeRate">
						<el-input v-model="formEntity.buyerExchangeRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-币别" prop="buyerCurrency">
						<el-input v-model="formEntity.buyerCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-单价" prop="buyerPrice">
						<el-input v-model="formEntity.buyerPrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-货价" prop="buyerGoodsValue">
						<el-input v-model="formEntity.buyerGoodsValue" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-税种" prop="buyerTaxType">
						<el-input v-model="formEntity.buyerTaxType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-税率" prop="buyerTaxRate">
						<el-input v-model="formEntity.buyerTaxRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方采购-价税合计" prop="totalAmount">
						<el-input v-model="formEntity.totalAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="净重" prop="netWeight">
						<el-input v-model="formEntity.netWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="毛重" prop="grossWeight">
						<el-input v-model="formEntity.grossWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="体积" prop="volume">
						<el-input v-model="formEntity.volume" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="品牌" prop="brand">
						<el-input v-model="formEntity.brand" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="原产地" prop="sourceArea">
						<el-input v-model="formEntity.sourceArea" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计收货数量" prop="receiveQuantity">
						<el-input v-model="formEntity.receiveQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计入库" prop="inStorageQuantity">
						<el-input v-model="formEntity.inStorageQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方物料-编码" prop="buyerMaterialCode">
						<el-input v-model="formEntity.buyerMaterialCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方物料-名称" prop="buyerMaterialName">
						<el-input v-model="formEntity.buyerMaterialName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="买方物料-规格型号" prop="materialModel">
						<el-input v-model="formEntity.materialModel" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="改单前后税率" prop="taxRate">
						<el-input v-model="formEntity.taxRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="改单前后监管条件" prop="superviseTerm">
						<el-input v-model="formEntity.superviseTerm" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="改单前后管制品" prop="producerProduct">
						<el-input v-model="formEntity.producerProduct" :class="inputClass" ></el-input>
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
					<el-form-item :label-width="labelWidth" label="出/入口证号码" prop="passNo">
						<el-input v-model="formEntity.passNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="3C项目" prop="threecItem">
						<el-input v-model="formEntity.threecItem" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import PurchaseGoods from "../../../domain/entities/commerce/PurchaseGoods";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new PurchaseGoods(),

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
            .submitCreate("/purchasegoods/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new PurchaseGoods();
          this.loadPurchaseGoodsCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/purchasegoods/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载采购订单商品信息编码
    loadPurchaseGoodsCode() {
      appHelper
        .get("/purchasegoods/itemCode")
        .then(result => (this.formEntity.itemCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadPurchaseGoodsCode();
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
