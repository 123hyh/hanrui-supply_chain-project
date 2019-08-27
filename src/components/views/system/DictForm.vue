<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup">
      <!-- 标题 -->
      <div slot="title">{{btnType == 'create'? '新增': '修改'}}字典表</div>

      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">确定</el-button>
        <el-button type="cancel" @click="closeForm">取消</el-button>
      </div>
      <div>
        <el-form
          :model="dictData"
          :rules="formRules"
          ref="dictData"
          label-width="150px"
          label-position="right"
          :inline-message="true"
          class="form-layout"
        >
          <el-form-item
            v-for="(elem,index) of dictForm"
            :key="index"
            :label="elem.name"
            :prop="elem.prop"
          >
            <!-- 输入字符串类型 -->
            <el-input
              v-if="elem.text && !elem.type"
              v-model="dictData[elem['key']]"
              style="width: 9vw"
              :disabled="elem.disabled"
              :placeholder="dictData[elem['key']]"
              :readonly="elem.readonly"
            >
              <el-button
                v-if="elem.btn"
                slot="append"
                icon="el-icon-search"
                @click="rousePopover(elem.key,elem.isShowPopover)"
              ></el-button>
            </el-input>
            <!--  输入数字类型 -->
            <el-input
              v-if="elem.text && elem.type"
              v-model.number="dictData[elem['key']]"
              style="width: 9vw"
              :disabled="elem.disabled"
              :placeholder="dictData[elem['key']]"
              :readonly="elem.readonly"
            >
              <el-button
                v-if="elem.btn"
                slot="append"
                icon="el-icon-search"
                @click="rousePopover(elem.key,elem.isShowPopover)"
              ></el-button>
            </el-input>
            <el-checkbox v-if="elem.checked" style="width: 9vw" v-model="dictData[elem['key']]"></el-checkbox>
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              type="date"
              v-model="dictData[elem['key']]"
              style="width: 9vw"
              v-if="elem.date"
            ></el-date-picker>
            <el-select
              v-if="elem.select"
              v-model="dictData[elem['key']]"
              style="width: 9vw"
              placeholder="请选择选项"
            >
              <el-option
                v-for="(option) in elem.selectOption"
                :key="option['itemValue']"
                :label="option['itemValue']"
                :value="option['itemKey']"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Dict from "@/domain/entities/system/Dict";
import DictFormConfig from "@/domain/formconfig/system/Dict";
import api from "@/assets/js/appHelper.js";

export default {
  inject: ["formEvents"], // formEvents == bus

  data() {
    return {
      dictData: new Dict(),
      dictForm: DictFormConfig,

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
  computed: {
    btnType() {
      if (this.$store.state.other.btnType == "create") {
        this.dictData = new Dict();
      } else {
        this.dictData = this.$store.state.other.curRowData;
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
          api.addData("/dict/", self.dictData).then(function(res) {
            if (res) {
              self.$alert("新增成功", "新增", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false; //弹出层消失
                  this.dictData = new Dict(); //表单重置
                  self.$emit("newTableData", res.data);
                }
              });
            } else {
              self.$alert("新增失败");
            }
          });
          this.popup = false; //弹出层消失
        } else if (self.btnType == "update") {
          // 修改
          api.editData("/dict", self.formEntity).then(function(res) {
            if (res) {
              self.$alert("保存成功", "修改", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false; //弹出层消失
                  this.dictData = new Dict(); //表单重置
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

  created() {
  }
};
</script>

<style scoped>
.input-item {
  width: 180px;
}
</style>
