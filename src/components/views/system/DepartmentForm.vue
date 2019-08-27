<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup" width="50%">
      <!-- 标题 -->
      <div slot="title">{{btnType == 'create'? '新增': '修改'}}部门</div>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">确定</el-button>
        <el-button type="cancel" @click="closeForm">取消</el-button>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="department"
        label-position="right"
        :inline="true"
        :rules="formRules"
        @submit.native.prevent
      >
        <el-row>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="部门名称" prop="departmentName">
              <el-input v-model="department.departmentName" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="上级部门" prop="parentDepartment">
              <SelectTree
               :style="inputStyle"
                v-model="department.parentDepartment"
                :options="dept"
                :defaultProps="defaultProps"
                :value="department.parentDepartment"
                @getValue="getValue($event)"
                ref="selectTree"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="部门说明" prop="remark">
              <el-input v-model="department.remark" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/assets/js/appHelper.js";
import SelectTree from "@/components/common/SelectTree.vue";
import Department from "@/domain/entities/system/Department";

export default {
  inject: ["formEvents"], // formEvents == bus
  components: {
    SelectTree
  },
  props: {
    // ---树
    dept: {
      type: Array, // 必须是树形结构的对象数组
      default: () => {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          value: "id", // ID字段名
          label: "title", // 显示名称
          children: "children" // 子级字段名
        };
      }
    }
  },
  data() {
    return {
      // updept:[],
      // 控制弹出层显示
      popup: false,
      // 表单
      department: new Department(),
      // 验证规则
      formRules: {
        departmentName: [{ required: true, message: "必填" }],
        parentDepartment: [{ required: true, message: "必填" }]
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
  computed: {
    btnType() {
      if (this.$store.state.other.btnType == "create") {
        this.department = new Department();
      } else if (this.$store.state.other.btnType == "update") {
        this.department = this.$store.state.other.curRowData;
      }
      return this.$store.state.other.btnType;
    }
  },
  methods: {
    // 修改时部门列表
    getuserdeot() {
      this.updept = this.dept;
      this.updept.forEach(val => {
      });
    },
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...
        if (self.btnType == "create") {
          // 新增
          api.addData("/department", self.department).then(function(res) {
            // 提交成功后...
            if (res) {
                self.$message.success('新增成功!');
                  // 刷新列表
                  self.$emit("newTableData", res.data);
                  self.department = new Department();
            } else {
                self.$message.success('新增失败!');
            }
          });
          this.popup = false; //弹出层消失
        } else if (self.btnType == "update") {
          // 修改
          api.editData("/department", self.department).then(function(res) {
            // 提交成功后...
            if (res) {
                self.$message.success('修改成功!');
                  self.popup = false; //弹出层消失
                  self.department = new Department();
            } else {
                self.$message.success('修改失败!');
            }
          });
        }
      });
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    },
    // 下拉回传
    getValue(value) {
      this.department.parentDepartment = value;
    }
  },
  created() {
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
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
  }
};
</script>

<style scoped>
.input-item {
  width: 180px;
}
</style>
