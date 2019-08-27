<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}融资授信担保单</div>

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
					<el-form-item :label-width="labelWidth" label="融资授信单号" prop="creditNo">
						<el-input v-model="formEntity.creditNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保单号" prop="ensureNo">
						<el-input v-model="formEntity.ensureNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="被担保单位编码" prop="securedUnitCode">
						<el-input v-model="formEntity.securedUnitCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="被担保单位名称" prop="securedUnitName">
						<el-input v-model="formEntity.securedUnitName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保单位编码" prop="ensureUnitCode">
						<el-input v-model="formEntity.ensureUnitCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保单位名称" prop="ensureUnitName">
						<el-input v-model="formEntity.ensureUnitName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="公司编码" prop="companyCode">
						<el-input v-model="formEntity.companyCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="公司名称" prop="companyName">
						<el-input v-model="formEntity.companyName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="币种" prop="currency">
						<el-input v-model="formEntity.currency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="汇率" prop="exchangeRate">
						<el-input v-model="formEntity.exchangeRate" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保金额" prop="ensureAmount">
						<el-input v-model="formEntity.ensureAmount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保金额本位币" prop="ensureCurrency">
						<el-input v-model="formEntity.ensureCurrency" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保保证金" prop="ensureDeposits">
						<el-input v-model="formEntity.ensureDeposits" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="开始日" prop="startDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.startDate" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="截止日" prop="endDate">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.endDate" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保期限" prop="ensureTimeLimit">
						<el-input v-model="formEntity.ensureTimeLimit" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="单据状态" prop="status">
						<el-input v-model="formEntity.status" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="撤保人" prop="repealPersonId">
						<el-input v-model="formEntity.repealPersonId" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="撤保时间" prop="repealTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.repealTime" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="撤保理由" prop="repealReason">
						<el-input v-model="formEntity.repealReason" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="备注" prop="remark">
						<el-input v-model="formEntity.remark" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="担保单位类型" prop="type_Ensure">
						<el-input v-model="formEntity.type_Ensure" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="审核人" prop="auditor">
						<el-input v-model="formEntity.auditor" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="审核时间" prop="auditTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.auditTime" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import CreditEnsure from "../../../domain/entities/risk/CreditEnsure";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new CreditEnsure(),

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
            .submitCreate("/creditensure/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new CreditEnsure();
          this.loadCreditEnsureCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/creditensure/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载融资授信担保单编码
    loadCreditEnsureCode() {
      appHelper
        .get("/creditensure/itemCode")
        .then(result => (this.formEntity.itemCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadCreditEnsureCode();
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
