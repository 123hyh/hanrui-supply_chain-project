<template>
  <el-dialog :visible.sync="isShow" @close="closeForm">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}关务海关单位转换表</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form
      ref="form"
      :model="formEntity"
      label-position="right"
      :inline="true"
      :rules="formRules"
      class="form-layout"
    >
      <el-form-item label="附件类型编码" prop="unitConvertCode">
        <el-input v-model="formEntity.unitConvertCode"></el-input>
      </el-form-item>
      <el-form-item label="原计量单位" prop="originalUnit">
        <el-input v-model="formEntity.originalUnit"></el-input>
      </el-form-item>
      <el-form-item label="目标计量单位" prop="targetUnit">
        <el-input v-model="formEntity.targetUnit"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formEntity.remark"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import UnitConvert from "../../../domain/entities/basicdata/UnitConvert";
import appHelper from "../../../assets/js/appHelper";

export default {
  props: {
    isUpdate: Boolean,
    curEntity: Object,
    show: {
      type: Boolean,
      default: false
    }
  },

  inject: ["formEvents"],
  watch: {
    show: {
      handler(newVal){
        this.isShow = newVal
      },
      deep: true
    }
  },
  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new UnitConvert(),

      // 控制弹出层显示
      popup: false,

      // 验证规则
      formRules: {
        //deptCode: [appHelper.validateRule.required("所属部门")],
      },
      isShow: false
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
            .submitCreate("/unitconvert/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
          this.formEntity = new UnitConvert();
          this.loadUnitConvertCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/unitconvert/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载附件类型编码
    loadUnitConvertCode() {
      appHelper
        .get("/unitconvert/unitConvertCode")
        .then(result => (this.formEntity.unitConvertCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.$emit("closeform");
    }
  },

  created() {
    this.loadUnitConvertCode();
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
};
</script>

<style scoped lang='less'>
.form-layout {
  > div {
    flex-basis: 48%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px
  }
}
</style>
