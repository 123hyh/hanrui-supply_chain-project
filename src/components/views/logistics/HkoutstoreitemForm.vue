<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}香港出库子表</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单据编号" prop="billNo">
						<el-input v-model="formEntity.billNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="子表业务主键" prop="itemCode">
						<el-input v-model="formEntity.itemCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="规格型号" prop="specificationType">
						<el-input v-model="formEntity.specificationType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="送货地址" prop="deliveryAddress">
						<el-input v-model="formEntity.deliveryAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单价" prop="price">
						<el-input v-model="formEntity.price" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="价税合计" prop="priceTax">
						<el-input v-model="formEntity.priceTax" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="金额本位币" prop="amountCurrency">
						<el-input v-model="formEntity.amountCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="存货编码" prop="inventoryCode">
						<el-input v-model="formEntity.inventoryCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="存货名称" prop="inventoryName">
						<el-input v-model="formEntity.inventoryName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="计量单位" prop="unit">
						<el-input v-model="formEntity.unit" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="数量" prop="quantity">
						<el-input v-model="formEntity.quantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税率%" prop="taxRate">
						<el-input v-model="formEntity.taxRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="含税单价" prop="priceContainTax">
						<el-input v-model="formEntity.priceContainTax" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="实际单价" prop="priceNet">
						<el-input v-model="formEntity.priceNet" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="金额" prop="amount">
						<el-input v-model="formEntity.amount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="税额本位币" prop="taxCurrency">
						<el-input v-model="formEntity.taxCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="价税合计本位币" prop="priceTaxCurrency">
						<el-input v-model="formEntity.priceTaxCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="核心单据号" prop="keyBillNo">
						<el-input v-model="formEntity.keyBillNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="核心单据行号" prop="keyBillRowNo">
						<el-input v-model="formEntity.keyBillRowNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="核心单据类型" prop="keyBillType">
						<el-input v-model="formEntity.keyBillType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="合同号" prop="contractNo">
						<el-input v-model="formEntity.contractNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="批次" prop="batchNo">
						<el-input v-model="formEntity.batchNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="基本计量单位" prop="baseUnit">
						<el-input v-model="formEntity.baseUnit" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单位实际成本" prop="unitActualCost">
						<el-input v-model="formEntity.unitActualCost" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="实际成本" prop="actualCost">
						<el-input v-model="formEntity.actualCost" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="唛头" prop="shippingMarks">
						<el-input v-model="formEntity.shippingMarks" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="起始箱号" prop="boxNoStart">
						<el-input v-model="formEntity.boxNoStart" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="结束箱号" prop="boxNoEnd">
						<el-input v-model="formEntity.boxNoEnd" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="箱数" prop="boxCount">
						<el-input v-model="formEntity.boxCount" :class="inputClass" ></el-input>
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
					<el-form-item :label-width="labelWidth" label="仓管员" prop="storekeeper">
						<el-input v-model="formEntity.storekeeper" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="辅助属性" prop="attachedAttribute">
						<el-input v-model="formEntity.attachedAttribute" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="供应商" prop="supplier">
						<el-input v-model="formEntity.supplier" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单位标准成本" prop="unitStandardCost">
						<el-input v-model="formEntity.unitStandardCost" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="标准成本" prop="standardCost">
						<el-input v-model="formEntity.standardCost" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="折扣方式" prop="discountType">
						<el-input v-model="formEntity.discountType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="折扣额" prop="discountAmount">
						<el-input v-model="formEntity.discountAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单位折扣" prop="unitDiscount">
						<el-input v-model="formEntity.unitDiscount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="实际含税单价" prop="ActualTaxPrice">
						<el-input v-model="formEntity.ActualTaxPrice" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="完全核销" prop="completeCancellation">
						<el-select v-model="formEntity.completeCancellation" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="已核销金额" prop="cancelledAmount">
						<el-input v-model="formEntity.cancelledAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="累计冲销数量" prop="writeOffQuantity">
						<el-input v-model="formEntity.writeOffQuantity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import Hkoutstoreitem from "../../../domain/entities/logistics/Hkoutstoreitem";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new Hkoutstoreitem(),

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
            .submitCreate("/hkoutstoreitem/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new Hkoutstoreitem();
          this.loadHkoutstoreitemCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/hkoutstoreitem/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载香港出库子表编码
    loadHkoutstoreitemCode() {
      appHelper
        .get("/hkoutstoreitem/itemCode")
        .then(result => (this.formEntity.itemCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadHkoutstoreitemCode();
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
