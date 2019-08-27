<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}上货单计划核对信息</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="right" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="核对信息编码" prop="checkingInfoCode">
						<el-input v-model="formEntity.checkingInfoCode" :class="inputClass" ></el-input>
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
					<el-form-item :label-width="labelWidth" label="已截单" prop="cutOrder">
						<el-select v-model="formEntity.cutOrder" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="总单数" prop="totalOrders">
						<el-input v-model="formEntity.totalOrders" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="总重量" prop="totalWeight">
						<el-input v-model="formEntity.totalWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="总重量单位" prop="totalUnitName">
						<el-input v-model="formEntity.totalUnitName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="卡板总毛重" prop="totalNetWeight">
						<el-input v-model="formEntity.totalNetWeight" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="毛重单位" prop="netUnitName">
						<el-input v-model="formEntity.netUnitName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="总箱数" prop="boxCount">
						<el-input v-model="formEntity.boxCount" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="截单核对结果" prop="cutOrderResult">
						<el-select v-model="formEntity.cutOrderResult" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="截单核对时间" prop="cutOrderTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.cutOrderTime" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="截单核对人" prop="cutOrderUser">
						<el-input v-model="formEntity.cutOrderUser" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="截单核对差异" prop="cutDifference">
						<el-input v-model="formEntity.cutDifference" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="装车核对结果" prop="loadResult">
						<el-select v-model="formEntity.loadResult" :class="inputClass" ></el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="装车核对时间" prop="loadTime">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.loadTime" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="装车核对人" prop="loadUser">
						<el-input v-model="formEntity.loadUser" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="装车核对差异" prop="loadDifference">
						<el-input v-model="formEntity.loadDifference" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import SchedulCheckingInfo from "../../../domain/entities/logistics/SchedulCheckingInfo";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new SchedulCheckingInfo(),

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
            .submitCreate("/schedulcheckinginfo/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new SchedulCheckingInfo();
          this.loadSchedulCheckingInfoCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/schedulcheckinginfo/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载上货单计划核对信息编码
    loadSchedulCheckingInfoCode() {
      appHelper
        .get("/schedulcheckinginfo/checkingInfoCode")
        .then(result => (this.formEntity.checkingInfoCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadSchedulCheckingInfoCode();
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
