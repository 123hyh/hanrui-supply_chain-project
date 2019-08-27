<template>
  <el-dialog :visible.sync="popup">
    <!-- 标题 -->
    <div slot="title">{{btnType == 'update' ? '修改' : '新增'}}产地表</div>

    <!-- 按钮行 -->
    <div slot="footer">
      <el-button type="primary" @click="saveForm">保存</el-button>
      <el-button type="cancel" @click="closeForm">取消</el-button>
    </div>

    <!-- 表单 -->
    <el-form ref="form" :model="formEntity" 
        label-position="right"
        :inline="false"
        :rules="formRules">
			<el-row>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="名称" prop="originName">
						<el-input v-model="formEntity.originName" :style="inputStyle"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="简称" prop="originAbb">
						<el-input v-model="formEntity.originAbb" :style="inputStyle"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="对应海关编码" prop="customsCode">
						<el-input v-model="formEntity.customsCode" :style="inputStyle"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item :label-width="labelWidth" label="描述" prop="description">
						<el-input v-model="formEntity.description" :style="inputStyle"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

    </el-form>
  </el-dialog>
</template>

<script>
import api from '@/assets/js/appHelper.js'
import Origin from "../../../domain/entities/basicdata/Origin";
import utools from "@/domain/common/utools.js";

export default {
  inject: ["formEvents"],
  computed: {
    btnType() {
      if (this.$store.state.other.btnType == "create") {
        this.formEntity = new Origin();
      } else if (this.$store.state.other.btnType == "update") {
        this.formEntity = this.$store.state.other.curRowData;
      }
      if (this.$refs.form) {
            this.$refs.form.clearValidate();
          }
      return this.$store.state.other.btnType;
    }
  },
  data() {
    return {
      formEntity: new Origin(),
      // 控制弹出层显示
      popup: false,
      // 验证规则
      formRules: {
        originName: [api.validateRule.required("名称")],
        originAbb: [api.validateRule.required("简称")],
        customsCode: [api.validateRule.required("对应海关编码")],
        description: [api.validateRule.required("描述")]
      },
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",
      inputStyle: {
        width: "200px"
      }
    };
  },
  methods: {
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...
        if (self.btnType == "create") {
          // 新增
          api.addData("/origin", self.formEntity).then(function(res) {
            // 提交成功后...
            if (res) {
              self.$alert("新增成功", "新增", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false;
                  self.formEntity = new Origin()
                  self.$emit("newTableData", res.data);
                }
              });
            } else {
              self.$alert("新增失败");
            }
          });
        } else if (self.btnType == "update") {
          // 修改
          api.editData("/origin", self.formEntity).then(function(res) {
            if (res) {
              self.$alert("保存成功", "修改", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false;
                  self.formEntity = new Origin()
                  self.$emit("newTableData", res.data);
                }
              });
            } else {
              self.$alert("保存失败");
            }
          });
        }
      });
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },
  watch: {
    popup: {
      handler(n, o) {
        if (n) {
          if (this.$refs.form) {
            this.$refs.form.clearValidate();
          }
        }
      }
    }
  },
  created() {
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
