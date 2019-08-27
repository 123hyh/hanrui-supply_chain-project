<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}第三方</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="left" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="编码" prop="billCode">
						<el-input v-model="formEntity.billCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="名称" prop="thirdGroupName">
						<el-input v-model="formEntity.thirdGroupName" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="企业税号" prop="enterpriseTaxNo">
						<el-input v-model="formEntity.enterpriseTaxNo" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="电话" prop="telephone">
						<el-input v-model="formEntity.telephone" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="传真" prop="fax">
						<el-input v-model="formEntity.fax" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="手机" prop="mobilephone">
						<el-input v-model="formEntity.mobilephone" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="地址" prop="address">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.address" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="描述" prop="description">
						<el-input v-model="formEntity.description" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="使用状态" prop="useStatus">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" type="date" v-model="formEntity.useStatus" :class="inputClass" ></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import ThirdGroup from "../../../domain/entities/basicdata/ThirdGroup";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new ThirdGroup(),

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
            .submitCreate("/thirdgroup/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new ThirdGroup();
          this.loadThirdGroupCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/thirdgroup/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载第三方编码
    loadThirdGroupCode() {
      appHelper
        .get("/thirdgroup/id")
        .then(result => (this.formEntity.id = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadThirdGroupCode();
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
