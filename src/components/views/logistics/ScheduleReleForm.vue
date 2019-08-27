<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}上货单计划相关信息 </div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="上货单相关信息编码" prop="scheduleReleCode">
						<el-input v-model="formEntity.scheduleReleCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="关联上货计划单基本信息编码" prop="scheduleBaseCode">
						<el-input v-model="formEntity.scheduleBaseCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="货物名称及规格" prop="goodsNameSpec">
						<el-input v-model="formEntity.goodsNameSpec" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="包装方式及数量1" prop="packaging1">
						<el-input v-model="formEntity.packaging1" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="包装方式及数量2" prop="packaging2">
						<el-input v-model="formEntity.packaging2" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="付货人名称及地址" prop="payerAddress">
						<el-input v-model="formEntity.payerAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="其他付货人名称及地址" prop="otherPayerAddress">
						<el-input v-model="formEntity.otherPayerAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="收货人名称及地址" prop="consigneeAddress">
						<el-input v-model="formEntity.consigneeAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="其他收货人名称及地址" prop="otherConsigneeAddress">
						<el-input v-model="formEntity.otherConsigneeAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="进/出口许可证编码" prop="licenseCode">
						<el-input v-model="formEntity.licenseCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="提单/空运托运单号编码" prop="shippingCode">
						<el-input v-model="formEntity.shippingCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="香港车牌" prop="plateNoHK">
						<el-input v-model="formEntity.plateNoHK" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="司机" prop="driver">
						<el-input v-model="formEntity.driver" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="大陆电话" prop="phoneNo">
						<el-input v-model="formEntity.phoneNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="香港电话" prop="phoneNoHK">
						<el-input v-model="formEntity.phoneNoHK" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="承运商的地址" prop="carrierAddress">
						<el-input v-model="formEntity.carrierAddress" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="监管方式" prop="regulateType">
						<el-input v-model="formEntity.regulateType" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="车辆海关编码" prop="carCustomsCode">
						<el-input v-model="formEntity.carCustomsCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="重量/净重" prop="netWeight">
						<el-input v-model="formEntity.netWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="内地车牌" prop="plateNo">
						<el-input v-model="formEntity.plateNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="重箱或者空箱标识" prop="boxIdentification">
						<el-input v-model="formEntity.boxIdentification" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="托架/拖挂车自重" prop="trailerWeight">
						<el-input v-model="formEntity.trailerWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="含车毛重" prop="grossWeight">
						<el-input v-model="formEntity.grossWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import ScheduleRele from "../../../domain/entities/logistics/ScheduleRele";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new ScheduleRele(),

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
            .submitCreate("/schedulerele/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new ScheduleRele();
          this.loadScheduleReleCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/schedulerele/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载上货单计划相关信息 编码
    loadScheduleReleCode() {
      appHelper
        .get("/schedulerele/scheduleReleCode")
        .then(result => (this.formEntity.scheduleReleCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadScheduleReleCode();
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
