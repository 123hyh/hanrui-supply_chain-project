<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}发运单-运费承担方信息</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运费承担方编码" prop="shipmentFeeCode">
						<el-input v-model="formEntity.shipmentFeeCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="发运单基础信息编码" prop="shipmentBaseCode">
						<el-input v-model="formEntity.shipmentBaseCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运费承担方类型" prop="bearType">
						<el-input v-model="formEntity.bearType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运费承担方" prop="feeBear">
						<el-input v-model="formEntity.feeBear" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运费支付方式" prop="paymentType">
						<el-input v-model="formEntity.paymentType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="已发承运" prop="hasSend">
						<el-select v-model="formEntity.hasSend" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="收回经手人" prop="backBroker">
						<el-input v-model="formEntity.backBroker" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="计费对象" prop="feeTarget">
						<el-input v-model="formEntity.feeTarget" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="边境" prop="border">
						<el-select v-model="formEntity.border" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="是否已复审" prop="hasVerifi">
						<el-select v-model="formEntity.hasVerifi" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="配送方式" prop="shippingModel">
						<el-input v-model="formEntity.shippingModel" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="发运状态" prop="shipmentStatus">
						<el-input v-model="formEntity.shipmentStatus" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="生成出库单" prop="createOutOrder">
						<el-select v-model="formEntity.createOutOrder" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="收杂费" prop="otherFee">
						<el-select v-model="formEntity.otherFee" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="杂费类别" prop="otherFeeType">
						<el-input v-model="formEntity.otherFeeType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="现金金额" prop="cash">
						<el-input v-model="formEntity.cash" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="支票金额" prop="check">
						<el-input v-model="formEntity.check" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="杂费币种" prop="otherCurrency">
						<el-input v-model="formEntity.otherCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="发票号" prop="invoiceNo">
						<el-input v-model="formEntity.invoiceNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="发运区域" prop="shipmentArea">
						<el-input v-model="formEntity.shipmentArea" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="快递目的地" prop="expressDes">
						<el-input v-model="formEntity.expressDes" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="运保费币种" prop="shipCurrency">
						<el-input v-model="formEntity.shipCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="应收运费" prop="receiveFee">
						<el-input v-model="formEntity.receiveFee" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="应付运费" prop="payFee">
						<el-input v-model="formEntity.payFee" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="应付保费" prop="payPremium">
						<el-input v-model="formEntity.payPremium" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="自提地址" prop="selfAddress">
						<el-input v-model="formEntity.selfAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="寄件城市" prop="sendCity">
						<el-input v-model="formEntity.sendCity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="收件城市" prop="receiveCity">
						<el-input v-model="formEntity.receiveCity" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="是否随货开票" prop="withGoods">
						<el-input v-model="formEntity.withGoods" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="先收先发货" prop="firstSend">
						<el-input v-model="formEntity.firstSend" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="客户指定承运商" prop="appointCarrier">
						<el-input v-model="formEntity.appointCarrier" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="实际运费" prop="infactFee">
						<el-input v-model="formEntity.infactFee" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="顺丰回单号" prop="sfReceiptNo">
						<el-input v-model="formEntity.sfReceiptNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="毛重" prop="grossWeight">
						<el-input v-model="formEntity.grossWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="件数" prop="pieces">
						<el-input v-model="formEntity.pieces" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="摘要" prop="summary">
						<el-input v-model="formEntity.summary" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="推荐承运商" prop="recomCarrier">
						<el-input v-model="formEntity.recomCarrier" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="推荐运费" prop="recomFee">
						<el-input v-model="formEntity.recomFee" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="集团发票号" prop="groupInvoiceNo">
						<el-input v-model="formEntity.groupInvoiceNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="物料号" prop="materialNo">
						<el-input v-model="formEntity.materialNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="发货方" prop="shipper">
						<el-input v-model="formEntity.shipper" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import ShipmentFee from "../../../domain/entities/logistics/ShipmentFee";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new ShipmentFee(),

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
            .submitCreate("/shipmentfee/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new ShipmentFee();
          this.loadShipmentFeeCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/shipmentfee/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载发运单-运费承担方信息编码
    loadShipmentFeeCode() {
      appHelper
        .get("/shipmentfee/shipmentFeeCode")
        .then(result => (this.formEntity.shipmentFeeCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadShipmentFeeCode();
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
