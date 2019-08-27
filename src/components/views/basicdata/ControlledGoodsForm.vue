<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}管制品表</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" label-position="left" :inline="true" :rules="formRules">
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="单据编码" prop="controlledGoodsCode">
						<el-input v-model="formEntity.controlledGoodsCode" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="型号" prop="model">
						<el-input v-model="formEntity.model" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="管制类别" prop="controlledGoods">
						<el-input v-model="formEntity.controlledGoods" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="品牌" prop="brand">
						<el-input v-model="formEntity.brand" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="型号匹配" prop="modelMatching">
						<el-input v-model="formEntity.modelMatching" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="使用状态" prop="useStatus">
						<el-input v-model="formEntity.useStatus" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="控制类别" prop="controlCategory">
						<el-input v-model="formEntity.controlCategory" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="6">
					<el-form-item :label-width="labelWidth" label="描述" prop="description">
						<el-input v-model="formEntity.description" :class="inputClass" ></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import ControlledGoods from "../../../domain/entities/basicdata/ControlledGoods";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object
  },

  inject: ["formEvents"],

  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new ControlledGoods(),

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
            .submitCreate("/controlledgoods/", self.formEntity)
            .then(function() {
              // 提交成功后...
              
              alert("保存成功！");
            });
          this.formEntity = new ControlledGoods();
          this.loadControlledGoodsCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/controlledgoods/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载管制品表编码
    loadControlledGoodsCode() {
      appHelper
        .get("/controlledgoods/id")
        .then(result => (this.formEntity.id = result.data));
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },

  created() {
    this.loadControlledGoodsCode();
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
