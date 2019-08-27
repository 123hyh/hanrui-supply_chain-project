<template>
  <el-dialog :visible.sync="isShow" @close="closeForm">
    <!-- 标题 -->
    <div slot="title">{{isUpdate ? '修改' : '新增'}}电子税单邮件发送日志</div>

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
      <el-form-item label="电子税单邮件发送日志编码" prop="mailSendLogCode">
        <el-input v-model="formEntity.mailSendLogCode"></el-input>
      </el-form-item>
      <el-form-item label="操作人" prop="operator">
        <el-input v-model="formEntity.operator"></el-input>
      </el-form-item>
      <el-form-item label="发送邮件地址" prop="sendAddress">
        <el-input v-model="formEntity.sendAddress"></el-input>
      </el-form-item>
      <el-form-item label="委托方" prop="entrust">
        <el-input v-model="formEntity.entrust"></el-input>
      </el-form-item>
      <el-form-item label="邮件发送时间" prop="sendTime">
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          type="date"
          v-model="formEntity.sendTime"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="商务员" prop="business">
        <el-input v-model="formEntity.business"></el-input>
      </el-form-item>
      <el-form-item label="接收邮件地址" prop="receiveAddress">
        <el-input v-model="formEntity.receiveAddress"></el-input>
      </el-form-item>
      <el-form-item label="是否发送成功" prop="sendSuccess">
        <el-select v-model="formEntity.sendSuccess"></el-select>
      </el-form-item>
      <el-form-item label="错误信息" prop="errorInfo">
        <el-input v-model="formEntity.errorInfo"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import MailSendLog from "@/domain/entities/basicdata/MailSendLog";
import appHelper from "@/assets/js/appHelper";

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
      handler(newVal) {
        this.isShow = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      formEntity: this.isUpdate ? this.curEntity : new MailSendLog(),

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
            .submitCreate("/mailsendlog/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
          this.formEntity = new MailSendLog();
          this.loadMailSendLogCode();
          this.popup = false;
        } else {
          // 修改
          appHelper
            .submitCreate("/mailsendlog/", self.formEntity)
            .then(function() {
              // 提交成功后...

              alert("保存成功！");
            });
        }
      });
    },
    //加载附件类型编码
    loadMailSendLogCode() {
      appHelper
        .get("/mailsendlog/mailSendLogCode")
        .then(result => (this.formEntity.mailSendLogCode = result.data));
    },
    // 点击取消
    closeForm() {
      this.$emit("closeform");
    }
  },

  created() {
    this.loadMailSendLogCode();
    // 监听事件
    this.formEvents.$on("openform", () => (this.popup = true));
  }
};
</script>

<style scoped lang='less'>
.form-layout {
  justify-content: space-around;
  > div {
    flex-basis: 48%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px
  }
  &::after {
    content: "";
    flex-basis: 48%;
  }
}
</style>
