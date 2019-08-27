<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup" width="50%">
      <!-- 标题 -->
      <div slot="title">{{btnType == 'create'? '新增': '修改'}}角色</div>

      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">{{btnType == 'create'? '确定': '保存'}}</el-button>
        <el-button type="cancel" @click="closeForm">取消</el-button>
      </div>

      <!-- 表单 -->
      <el-form
        ref="form"
        :model="formEntity"
        label-position="right"
        :inline="true"
        :rules="formRules"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="24">
            <el-form-item :label-width="labelWidth" label="角色名称" prop="roleName">
              <el-input v-model="formEntity.roleName" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item :label-width="labelWidth" label="角色说明" prop="remark">
              <el-input v-model="formEntity.remark" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Role from "@/domain/entities/system/Role";
import api from "@/assets/js/appHelper.js";

export default {
  inject: ["formEvents"], // formEvents == bus

  data() {
    return {
      formEntity: new Role(),
      // 控制弹出层显示
      popup: false,
      // 设置 label 宽度
      labelWidth: "150px",
      // el-input 类名
      inputClass: "input-item",
      // 验证规则
      formRules: {
        roleCode: [api.validateRule.required("角色编码")],
        roleName: [api.validateRule.required("角色名称")]
      },
      inputStyle: {
        width: "200px"
      }
    };
  },
  computed: {
    btnType() {
      if (this.$store.state.other.btnType == "create") {
        this.formEntity = new Role();
      } else {
        this.formEntity = this.$store.state.other.curRowData;
      }
      return this.$store.state.other.btnType;
    }
  },
  methods: {
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...
        if (self.btnType == "create") {
          // 新增
          api.addData("/role", self.formEntity).then(function(res) {
            // 提交成功后...
            if (res) {
              self.$alert("新增成功", "新增", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false; //弹出层消失
                  self.formEntity = new Role(); //表单重置
                  self.$emit("newTableData", res.data);
                }
              });
            } else {
              self.$alert("新增失败");
            }
          });
        } else if (self.btnType == "update") {
          // 修改
          api.editData("/role", self.formEntity).then(function(res) {
            if (res) {
              self.$alert("保存成功", "修改", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false; //弹出层消失
                  self.formEntity = new Role(); //表单重置
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
          if(this.$refs.form){
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
