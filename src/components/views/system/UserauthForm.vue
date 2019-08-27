<template>
  <div class="twoColumnt">
    <el-dialog :visible.sync="popup">
      <!-- 标题 -->
      <div slot="title">{{issel ? '查看' : '修改'}}用户权限</div>

      <!-- 按钮行 -->
      <div slot="footer">
        <el-button type="primary" @click="saveForm">确定</el-button>
        <el-button type="cancel" @click="closeForm" v-if="!issel">取消</el-button>
      </div>
      <!-- 表单 -->
      <el-form
        ref="form"
        :model="formEntity"
        label-position="right"
        :inline="true"
        @submit.native.prevent
      >
        <el-input v-model="filterText" placeholder="输入关键字进行过滤"></el-input>
        <el-tree
          :filter-node-method="filterNode"
          v-if="issel"
          :data="seletree"
          :props="defaultProps"
          node-key="menuCode"
          ref="tree"
          class="qxt"
        ></el-tree>
        <el-tree
          v-else
          :filter-node-method="filterNode"
          :data="allUserauth"
          node-key="menuCode"
          :props="defaultProps"
          show-checkbox
          ref="tree"
          class="qxt"
        ></el-tree>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Userauth from "../../../domain/entities/system/Userauth";
import api from "@/assets/js/appHelper.js";

export default {
  inject: ["formEvents"], // formEvents == bus
  props: {
    allUserauth: {
      type: Array,
      default: () => {
        return [];
      }
    },
    allAuth: {
      type: Array,
      default: () => {
        return [];
      }
    },
    userroleauth: {
      type: Array,
      default: () => {
        return [];
      }
    },
    seletree: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      filterText: "",
      defmenuCode: [],
      defaultProps: {
        children: "subs",
        label: "menuName"
      },
      formEntity: new Userauth(),

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
    issel() {
      if (this.$store.state.other.btnType == "select") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //权限英文换中文
    getCname(authe) {
      var authc = "";
      this.allAuth.forEach(e => {
        if (authe == e.functionCode) {
          authc = e.functionName;
        }
      });
      return authc;
    },
    // 点击保存
    saveForm() {
      if (this.issel) {
        this.popup = false;
        return;
      }
      var yt = this.$refs.tree.getCheckedNodes();
      var xt = [];
      yt.forEach(val => {
        if (val.fcode) {
          // 添加数组
          var idz = false;
          xt.forEach(val2 => {
            if (val2.menuCode == val.fcode) {
              idz = true;
            }
          });
          if (!idz) {
            var json = {
              userCode: this.$store.state.other.curRowData.userCode,
              menuCode: val.fcode,
              auth: ""
            };
            xt.push(json);
          }
          // 添加对象
          this.allAuth.forEach(e => {
            if (val.menuCode.indexOf(e.functionCode) !== -1) {
              xt.forEach(val2 => {
                if (val2.menuCode == val.fcode) {
                  val2.auth += e.functionCode + ";";
                }
              });
            }
          });
          // if (val.menuCode.indexOf("query;") !== -1) {
          //   xt.forEach(val2 => {
          //     if (val2.menuCode == val.fcode) {
          //       val2.auth += "query;";
          //     }
          //   });
          // }
          // if (val.menuCode.indexOf("insert;") !== -1) {
          //   xt.forEach(val2 => {
          //     if (val2.menuCode == val.fcode) {
          //       val2.auth += "insert;";
          //     }
          //   });
          // }
          // if (val.menuCode.indexOf("update;") !== -1) {
          //   xt.forEach(val2 => {
          //     if (val2.menuCode == val.fcode) {
          //       val2.auth += "update;";
          //     }
          //   });
          // }
          // if (val.menuCode.indexOf("delete;") !== -1) {
          //   xt.forEach(val2 => {
          //     if (val2.menuCode == val.fcode) {
          //       val2.auth += "delete;";
          //     }
          //   });
          // }
        } else {
          if (val.menuCode == "M00") {
            var json = {
              userCode: this.$store.state.other.curRowData.userCode,
              menuCode: val.menuCode,
              auth: ""
            };
            xt.push(json);
          }
        }
      });
      console.log(xt);
      var self = this;
      this.$refs.form.validate().then(() => {
        // 修改
        api
          .addData("/userauth/" + self.$store.state.other.curRowData.userCode, xt)
          .then(function(res) {
            if (res.status == "200") {
              // 提交成功后...
              self.$alert("保存成功", "修改", {
                confirmButtonText: "确定",
                callback: action => {
                  // 刷新列表
                  self.popup = false; //弹出层消失
                }
              });
            }
          });
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.menuName.indexOf(value) !== -1;
    },
    // 点击取消
    closeForm() {
      this.popup = false;
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    popup: {
      handler(n, o) {
        if (n && !this.issel) {
          this.defmenuCode = [];
          this.userroleauth.forEach(val => {
            if (val.auth) {
              var arr = val.auth.split(";");
              if (arr.length > 0) {
                arr.length--;
              }
              arr.forEach(authe => {
                var menuCode = val.menuCode + authe;
                this.defmenuCode.push(menuCode);
              });
              // if (val.auth.indexOf("query;") !== -1) {
              //   var menuCode = val.menuCode + "query;";
              //   this.defmenuCode.push(menuCode);
              // }
              // if (val.auth.indexOf("insert;") !== -1) {
              //   var menuCode = val.menuCode + "insert;";
              //   this.defmenuCode.push(menuCode);
              // }
              // if (val.auth.indexOf("update;") !== -1) {
              //   var menuCode = val.menuCode + "update;";
              //   this.defmenuCode.push(menuCode);
              // }
              // if (val.auth.indexOf("delete;") !== -1) {
              //   var menuCode = val.menuCode + "delete;";
              //   this.defmenuCode.push(menuCode);
              // }
            } else {
              this.defmenuCode.push(val.menuCode);
            }
          });
          this.$nextTick(function() {
            this.$refs.tree.setCheckedKeys([]);
            this.$refs.tree.setCheckedKeys(this.defmenuCode);
          });
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
.qxt {
  max-height: 50vh;
  overflow: auto;
}
</style>
