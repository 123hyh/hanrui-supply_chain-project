<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup">
      <!-- 标题 -->
      <div slot="title">{{btnType == 'create'? '新增': '修改'}}用户</div>
      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">{{btnType == 'create'? '确定': '保存'}}</el-button>
        <el-button type="cancel" @click="closeForm">取消</el-button>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="formEntity" :inline-message="false" label-position="right" :inline="true" :rules="formRules" @submit.native.prevent >
        <el-row>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="用户姓名" prop="userName">
              <el-input v-model="formEntity.userName" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="性别" prop="gender">
              <el-select v-model="formEntity.gender" placeholder="请选择" :style="inputStyle">
                <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value" ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="部门" prop="department">
              <SelectTree v-model="formEntity.department" :style="inputStyle" :options="treeData" :defaultProps="defaultProps" :value="formEntity.department" @getValue="getValue($event)" ref="selectTree" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="职位" prop="position">
              <el-input v-model="formEntity.position" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="电话" prop="phone">
              <el-input v-model="formEntity.phone" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="邮箱" prop="email">
              <el-input v-model="formEntity.email" :style="inputStyle"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="生日" prop="birthday">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                v-model="formEntity.birthday"
                :style="inputStyle"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label-width="labelWidth" label="锁定" prop="locked">
              <el-checkbox v-model="formEntity.locked"></el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import validate from '@/domain/common/validate'
import User from "@/domain/entities/system/User";
import api from "@/assets/js/appHelper.js";
import SelectTree from "@/components/common/SelectTree.vue";

export default {
  inject: ["formEvents"], // formEvents == bus
  components: {
    SelectTree
  },
  props: {
    treeData: {
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
      formEntity: new User(),
      // 控制弹出层显示
      popup: false,
      // 设置 label 宽度
      labelWidth: "100px",
      // 设置 input 宽度
      inputStyle: {
        width: "200px"
      },
      // 验证规则
      formRules: {
        userName: [{ required: true, message: "必填" }],
        gender: [{ required: true, message: '请选择性别'}],
        department: [{ required: true, message: "必填" }],
        position: [{ required: true, message: "必填" }],
        phone: [{ required: true, message: "必填" },{validator: validate.validateTel,trigger: 'blur'}],
        email: [{ required: true, message: "必填" }],
        birthday: [{ required: true, message: "必填" }]
      },
      genderOptions: [
        {
          value: "male",
          label: "男"
        },
        {
          value: "female",
          label: "女"
        }
      ]
    };
  },
  computed: {
    btnType() {
      if (this.$store.state.other.btnType == "create") {
        this.formEntity = new User();
      } else {
        this.formEntity = this.$store.state.other.curRowData;
        console.log(this.formEntity,this.treeData)
      }
      return this.$store.state.other.btnType;
    }
  },
  methods: {
    // 获取所有部门
    async getDeptList() {
      var res = await api.queryAll("/department");
      this.treeData = this.getJson(res.data.list, "");
    },
    // 递归数据格式
    getJson(items, str) {
      var json = [];
      for (var item of items) {
        if (item.parentDepartment == str) {
          json.push(item);
          item.children = this.getJson(items, item.departmentCode);
        }
      }
      return json;
    },
    // 下拉回传
    getValue(value) {
      this.formEntity.department = value;
    },
    // 点击保存
    saveForm() {
      var self = this;
      this.$refs.form.validate().then(() => {
        // 表单验证通过后...
        if (self.btnType == "create") {
          // 新增
          api.addData("/user", self.formEntity).then(function(res) {
            // 提交成功后...
            if (res) {
                self.$message.success('新增成功!');
                  self.popup = false; //弹出层消失
                  self.formEntity = new User(); //表单重置
                  self.$emit("newTableData", res.data);
              // self.$alert("新增成功", "新增", {
              //   confirmButtonText: "确定",
              //   callback: action => {
              //     // 刷新列表
              //     self.popup = false; //弹出层消失
              //     self.formEntity = new User(); //表单重置
              //     // self.loadUserCode(); // 加载附件类型编码
              //     self.$emit("newTableData", res.data);
              //   }
              // });
            } else {
                self.$message.success('新增失败!');
              // self.$alert("新增失败");
            }
          });
        } else if (self.btnType == "update") {
          // 修改
          api.editData("/user", self.formEntity).then(function(res) {
            if (res) {
                self.$message.success('保存成功!');
                  self.popup = false; //弹出层消失
                  self.formEntity = new User(); //表单重置
                  // self.loadUserCode(); // 加载附件类型编码
                  self.$emit("newTableData", res.data);
              // self.$alert("保存成功", "修改", {
              //   confirmButtonText: "确定",
              //   callback: action => {
              //     // 刷新列表
              //     self.popup = false; //弹出层消失
              //     self.formEntity = new User(); //表单重置
              //     // self.loadUserCode(); // 加载附件类型编码
              //     self.$emit("newTableData", res.data);
              //   }
              // });
            } else {
              self.$message.success('保存失败!');
              // self.$alert("保存失败");
            }
          });
        }
      });
    },
    //加载附件类型编码
    // loadUserCode() {
    //   api
    //     .get("/user/id")
    //     .then(result => (this.formEntity.userCode = result.data));
    // },
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
